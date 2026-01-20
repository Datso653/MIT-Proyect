// === MAPA GEOGRÁFICO ===
function Mapa({ datos }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const heatLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [viewMode, setViewMode] = useState('general'); // 'general', 'crimen', 'credito'

  useEffect(() => {
    if (!window.L || mapInstanceRef.current) return;

    const comerciosConCoords = datos.filter(c => 
      c.lat && c.long && 
      !isNaN(c.lat) && !isNaN(c.long) &&
      c.lat !== 0 && c.long !== 0
    );

    if (comerciosConCoords.length === 0) return;

    // Crear mapa
    const map = window.L.map(mapRef.current).setView([-34.6037, -58.3816], 12);

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap, © CartoDB',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [datos]);

  // Actualizar vista cuando cambia el modo
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    
    // Limpiar capas anteriores
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }
    if (markersLayerRef.current) {
      map.removeLayer(markersLayerRef.current);
      markersLayerRef.current = null;
    }

    const comerciosConCoords = datos.filter(c => 
      c.lat && c.long && 
      !isNaN(c.lat) && !isNaN(c.long) &&
      c.lat !== 0 && c.long !== 0
    );

    if (viewMode === 'general') {
      // Vista general con marcadores
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      const icon = window.L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 12px;
          height: 12px;
          background: ${COLORS.primary};
          border: 2px solid ${COLORS.background};
          border-radius: 50%;
          box-shadow: 0 0 10px ${COLORS.primary}80;
        "></div>`,
        iconSize: [12, 12]
      });

      comerciosConCoords.forEach(comercio => {
        try {
          const marker = window.L.marker([comercio.lat, comercio.long], { icon });
          marker.bindPopup(`
            <div style="
              font-family: 'Inter', sans-serif;
              background: ${COLORS.surface};
              color: ${COLORS.text};
              padding: 12px;
              border-radius: 4px;
            ">
              <strong style="color: ${COLORS.primary}; display: block; margin-bottom: 8px;">
                ${comercio.comercio || 'Sin nombre'}
              </strong>
              <div style="font-size: 13px; color: ${COLORS.textSecondary};">
                Tipo: ${comercio.tipo_comercio || 'N/A'}<br>
                Trabajadores: ${comercio.cantidad_trabajadores || 'N/A'}
              </div>
            </div>
          `);
          markersLayerRef.current.addLayer(marker);
        } catch (error) {
          console.error('Error al agregar marcador:', error);
        }
      });

    } else if (viewMode === 'crimen') {
      // Vista de calor de percepción de crimen
      const crimenToIntensity = {
        'Mucho': 1.0,
        'Moderado': 0.7,
        'Algo': 0.5,
        'Poco': 0.25,
        'Nada': 0.05
      };

      const heatPoints = comerciosConCoords
        .filter(c => c.afect_crimen && crimenToIntensity[c.afect_crimen] !== undefined)
        .map(c => [
          parseFloat(c.lat),
          parseFloat(c.long),
          crimenToIntensity[c.afect_crimen]
        ]);

      if (window.L.heatLayer && heatPoints.length > 0) {
        heatLayerRef.current = window.L.heatLayer(heatPoints, {
          radius: 25,
          blur: 20,
          maxZoom: 17,
          max: 1.0,
          gradient: {
            0.0: '#00ff00',
            0.3: '#ffff00',
            0.6: '#ff9900',
            0.8: '#ff4400',
            1.0: '#ff0000'
          }
        }).addTo(map);
      }

      // Agregar marcadores con color según percepción
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      comerciosConCoords.forEach(comercio => {
        if (!comercio.afect_crimen) return;

        const intensityColor = {
          'Mucho': '#ff0000',
          'Moderado': '#ff9900',
          'Algo': '#ffff00',
          'Poco': '#90EE90',
          'Nada': '#00ff00'
        }[comercio.afect_crimen] || COLORS.primary;

        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: 10px;
            height: 10px;
            background: ${intensityColor};
            border: 2px solid ${COLORS.background};
            border-radius: 50%;
            box-shadow: 0 0 8px ${intensityColor}80;
          "></div>`,
          iconSize: [10, 10]
        });

        const marker = window.L.marker([comercio.lat, comercio.long], { icon });
        marker.bindPopup(`
          <div style="
            font-family: 'Inter', sans-serif;
            background: ${COLORS.surface};
            color: ${COLORS.text};
            padding: 12px;
            border-radius: 4px;
          ">
            <strong style="color: ${intensityColor}; display: block; margin-bottom: 8px;">
              Percepción: ${comercio.afect_crimen}
            </strong>
            <div style="font-size: 13px; color: ${COLORS.textSecondary};">
              Tipo: ${comercio.tipo_comercio || 'N/A'}<br>
              ${comercio.reja ? 'Con rejas de seguridad' : ''}
            </div>
          </div>
        `);
        markersLayerRef.current.addLayer(marker);
      });

    } else if (viewMode === 'credito') {
      // Vista de acceso a crédito
      const contarFuentes = (c) => {
        let count = 0;
        if (parseFloat(c.credits_bancos) > 0) count++;
        if (parseFloat(c.credits_proveedor) > 0) count++;
        if (parseFloat(c.credits_familia) > 0) count++;
        if (parseFloat(c.credits_gobierno) > 0) count++;
        if (parseFloat(c.credits_privado) > 0) count++;
        return count;
      };

      // Heatmap basado en cantidad de fuentes
      const heatPoints = comerciosConCoords
        .map(c => {
          const numFuentes = contarFuentes(c);
          if (numFuentes === 0) return null;
          return [
            parseFloat(c.lat),
            parseFloat(c.long),
            numFuentes / 5 // Normalizar entre 0-1 (máximo 5 fuentes)
          ];
        })
        .filter(p => p !== null);

      if (window.L.heatLayer && heatPoints.length > 0) {
        heatLayerRef.current = window.L.heatLayer(heatPoints, {
          radius: 25,
          blur: 20,
          maxZoom: 17,
          max: 1.0,
          gradient: {
            0.0: '#ff0000',    // Sin acceso = rojo
            0.2: '#ff9900',    // 1 fuente = naranja
            0.4: '#ffff00',    // 2 fuentes = amarillo
            0.6: '#90EE90',    // 3 fuentes = verde claro
            1.0: '#00ff00'     // 5 fuentes = verde
          }
        }).addTo(map);
      }

      // Marcadores con color según acceso
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      comerciosConCoords.forEach(comercio => {
        const numFuentes = contarFuentes(comercio);
        
        const colorByFuentes = {
          0: '#ff0000',
          1: '#ff9900',
          2: '#ffff00',
          3: '#90EE90',
          4: '#00cc00',
          5: '#00ff00'
        };

        const color = colorByFuentes[numFuentes] || '#666666';
        const size = numFuentes === 0 ? 8 : 10;

        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border: 2px solid ${COLORS.background};
            border-radius: 50%;
            box-shadow: 0 0 8px ${color}80;
          "></div>`,
          iconSize: [size, size]
        });

        const fuentes = [];
        if (parseFloat(comercio.credits_bancos) > 0) fuentes.push('Bancos');
        if (parseFloat(comercio.credits_proveedor) > 0) fuentes.push('Proveedores');
        if (parseFloat(comercio.credits_familia) > 0) fuentes.push('Familia');
        if (parseFloat(comercio.credits_gobierno) > 0) fuentes.push('Gobierno');
        if (parseFloat(comercio.credits_privado) > 0) fuentes.push('Privado');

        const marker = window.L.marker([comercio.lat, comercio.long], { icon });
        marker.bindPopup(`
          <div style="
            font-family: 'Inter', sans-serif;
            background: ${COLORS.surface};
            color: ${COLORS.text};
            padding: 12px;
            border-radius: 4px;
          ">
            <strong style="color: ${color}; display: block; margin-bottom: 8px;">
              ${numFuentes === 0 ? 'Sin acceso a crédito' : `${numFuentes} fuente${numFuentes > 1 ? 's' : ''} de crédito`}
            </strong>
            <div style="font-size: 13px; color: ${COLORS.textSecondary};">
              Tipo: ${comercio.tipo_comercio || 'N/A'}<br>
              ${fuentes.length > 0 ? `Fuentes: ${fuentes.join(', ')}` : 'Sin financiamiento'}
            </div>
          </div>
        `);
        markersLayerRef.current.addLayer(marker);
      });
    }
  }, [viewMode, datos]);

  // Calcular estadísticas de crimen
  const statscrimen = React.useMemo(() => {
    const comerciosConCrimen = datos.filter(c => c.afect_crimen);
    const total = comerciosConCrimen.length;
    
    const distribucion = {
      'Mucho': comerciosConCrimen.filter(c => c.afect_crimen === 'Mucho').length,
      'Moderado': comerciosConCrimen.filter(c => c.afect_crimen === 'Moderado').length,
      'Algo': comerciosConCrimen.filter(c => c.afect_crimen === 'Algo').length,
      'Poco': comerciosConCrimen.filter(c => c.afect_crimen === 'Poco').length,
      'Nada': comerciosConCrimen.filter(c => c.afect_crimen === 'Nada').length
    };

    const afectados = distribucion['Mucho'] + distribucion['Moderado'] + distribucion['Algo'];
    const pctAfectados = total > 0 ? ((afectados / total) * 100).toFixed(1) : 0;

    return { distribucion, total, pctAfectados };
  }, [datos]);

  // Calcular estadísticas de crédito
  const statscredito = React.useMemo(() => {
    const contarFuentes = (c) => {
      let count = 0;
      if (parseFloat(c.credits_bancos) > 0) count++;
      if (parseFloat(c.credits_proveedor) > 0) count++;
      if (parseFloat(c.credits_familia) > 0) count++;
      if (parseFloat(c.credits_gobierno) > 0) count++;
      if (parseFloat(c.credits_privado) > 0) count++;
      return count;
    };

    const distribucion = {
      0: datos.filter(c => contarFuentes(c) === 0).length,
      1: datos.filter(c => contarFuentes(c) === 1).length,
      2: datos.filter(c => contarFuentes(c) === 2).length,
      3: datos.filter(c => contarFuentes(c) === 3).length,
      4: datos.filter(c => contarFuentes(c) === 4).length,
      5: datos.filter(c => contarFuentes(c) === 5).length
    };

    const conCredito = datos.length - distribucion[0];
    const pctConCredito = ((conCredito / datos.length) * 100).toFixed(1);

    return { distribucion, total: datos.length, pctConCredito, conCredito };
  }, [datos]);

  return (
    <section id="mapa" className="fade-up" style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: COLORS.primary,
          marginBottom: '20px',
          fontWeight: '500'
        }}>
          Distribución geográfica
        </div>
        <h2 style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: '400',
          color: COLORS.text,
          marginBottom: '20px'
        }}>
          Mapa interactivo
        </h2>
        <p style={{
          fontSize: '16px',
          color: COLORS.textSecondary,
          maxWidth: '800px',
          margin: '0 auto 30px',
          lineHeight: '1.6'
        }}>
          Explora la ubicación de los comercios, percepción de seguridad y acceso a crédito en el AMBA
        </p>

        {/* Toggle de vista con 3 opciones */}
        <div style={{
          display: 'inline-flex',
          gap: '12px',
          backgroundColor: COLORS.surface,
          padding: '8px',
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`,
          flexWrap: 'wrap',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <button aria-label="Ver mapa general"
            onClick={() => setViewMode('general')}
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: viewMode === 'general' ? COLORS.primary : 'transparent',
              color: viewMode === 'general' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.05em',
              boxShadow: viewMode === 'general' ? `0 4px 12px ${COLORS.primary}40` : 'none',
              transform: viewMode === 'general' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'general') {
                e.currentTarget.style.backgroundColor = `${COLORS.primary}20`;
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'general') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            UBICACIONES
          </button>
          <button aria-label="Ver mapa de impacto del crimen"
            onClick={() => setViewMode('crimen')}
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: viewMode === 'crimen' ? '#ff4400' : 'transparent',
              color: viewMode === 'crimen' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.05em',
              boxShadow: viewMode === 'crimen' ? '0 4px 12px #ff440040' : 'none',
              transform: viewMode === 'crimen' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'crimen') {
                e.currentTarget.style.backgroundColor = '#ff440020';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'crimen') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            PERCEPCIÓN DE CRIMEN
          </button>
          <button aria-label="Ver mapa de acceso a crédito"
            onClick={() => setViewMode('credito')}
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: viewMode === 'credito' ? '#00cc00' : 'transparent',
              color: viewMode === 'credito' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.05em',
              boxShadow: viewMode === 'credito' ? '0 4px 12px #00cc0040' : 'none',
              transform: viewMode === 'credito' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'credito') {
                e.currentTarget.style.backgroundColor = '#00cc0020';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'credito') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            ACCESO A CRÉDITO
          </button>
        </div>
      </div>

      {/* Estadísticas de crimen cuando está en modo crimen */}
      {viewMode === 'crimen' && (
        <div style={{
          marginBottom: '30px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff0000', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Mucho']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Mucho</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff9900', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Moderado']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Moderado</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Algo']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Algo</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#90EE90', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Poco']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Poco</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#00ff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Nada']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Nada</div>
            </div>
          </div>
          
          <div style={{
            padding: '16px',
            backgroundColor: `${COLORS.accent}15`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.accent}`,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '14px', color: COLORS.text }}>
              <strong style={{ fontSize: '20px', color: COLORS.accent }}>{statscrimen.pctAfectados}%</strong> de los comercios 
              reportan afectación significativa por crimen (Algo/Moderado/Mucho)
            </div>
          </div>
        </div>
      )}
      
      {/* Estadísticas de crédito cuando está en modo crédito */}
      {viewMode === 'credito' && (
        <div style={{
          marginBottom: '30px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff0000', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[0]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Sin acceso</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff9900', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[1]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>1 fuente</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[2]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>2 fuentes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#90EE90', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[3]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>3 fuentes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#00cc00', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[4]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>4 fuentes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#00ff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[5]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>5 fuentes</div>
            </div>
          </div>
          
          <div style={{
            padding: '16px',
            backgroundColor: '#00cc0015',
            borderRadius: '8px',
            borderLeft: '4px solid #00cc00',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '14px', color: COLORS.text }}>
              <strong style={{ fontSize: '20px', color: '#00cc00' }}>{statscredito.pctConCredito}%</strong> de los comercios 
              tienen acceso a al menos una fuente de crédito ({statscredito.conCredito} comercios)
            </div>
          </div>
        </div>
      )}
      
      <div
        ref={mapRef}
        style={{
          height: '600px',
          width: '100%',
          borderRadius: '2px',
          border: `1px solid ${COLORS.border}`,
          overflow: 'hidden',
          boxShadow: `0 20px 60px rgba(0,0,0,0.4)`
        }}
      />

      {/* Leyenda para mapa de calor */}
      {viewMode === 'crimen' && (
        <div style={{
          marginTop: '20px',
          padding: '16px 24px',
          backgroundColor: COLORS.surface,
          borderRadius: '8px',
          border: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.textSecondary }}>
            INTENSIDAD DEL CALOR:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#00ff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Nada</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ffff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Poco/Algo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff9900', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Moderado</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff0000', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Mucho</span>
          </div>
        </div>
      )}

      {/* Leyenda para mapa de crédito */}
      {viewMode === 'credito' && (
        <div style={{
          marginTop: '20px',
          padding: '16px 24px',
          backgroundColor: COLORS.surface,
          borderRadius: '8px',
          border: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.textSecondary }}>
            ACCESO A CRÉDITO:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff0000', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Sin acceso</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff9900', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>1 fuente</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ffff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>2 fuentes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#90EE90', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>3 fuentes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#00cc00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>4 fuentes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#00ff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>5 fuentes</span>
          </div>
        </div>
      )}
    </section>
  );
}

