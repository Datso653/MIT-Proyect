// === MAPA GEOGRÁFICO ===
function Mapa({ datos, language = 'es' }) {
  const t = (key) => getTranslation(language, key);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const heatLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [viewMode, setViewMode] = useState('general');

  useEffect(() => {
    if (!window.L || mapInstanceRef.current) return;

    const comerciosConCoords = datos.filter(c =>
      c.lat && c.long &&
      !isNaN(c.lat) && !isNaN(c.long) &&
      c.lat !== 0 && c.long !== 0
    );

    if (comerciosConCoords.length === 0) return;

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

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

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
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      const icon = window.L.divIcon({
        className: 'custom-marker',
        html: '<div style="width: 12px; height: 12px; background: ' + COLORS.primary + '; border: 2px solid ' + COLORS.background + '; border-radius: 50%; box-shadow: 0 0 10px ' + COLORS.primary + '80;"></div>',
        iconSize: [12, 12]
      });

      comerciosConCoords.forEach(comercio => {
        try {
          const marker = window.L.marker([comercio.lat, comercio.long], { icon });
          marker.bindPopup('<div style="font-family: Inter, sans-serif; background: ' + COLORS.surface + '; color: ' + COLORS.text + '; padding: 12px; border-radius: 4px;"><strong style="color: ' + COLORS.primary + '; display: block; margin-bottom: 8px;">' + (comercio.comercio || 'Sin nombre') + '</strong><div style="font-size: 13px; color: ' + COLORS.textSecondary + ';">Tipo: ' + (comercio.tipo_comercio || 'N/A') + '<br>Trabajadores: ' + (comercio.cantidad_trabajadores || 'N/A') + '</div></div>');
          markersLayerRef.current.addLayer(marker);
        } catch (error) {
          console.error('Error al agregar marcador:', error);
        }
      });

    } else if (viewMode === 'crimen') {
      const crimenToIntensity = {
        'Mucho': 1.0,
        'Moderado': 0.7,
        'Algo': 0.5,
        'Poco': 0.25,
        'Nada': 0.05
      };

      const heatPoints = comerciosConCoords
        .filter(c => c.afect_crimen && crimenToIntensity[c.afect_crimen] !== undefined)
        .map(c => [parseFloat(c.lat), parseFloat(c.long), crimenToIntensity[c.afect_crimen]]);

      if (window.L.heatLayer && heatPoints.length > 0) {
        heatLayerRef.current = window.L.heatLayer(heatPoints, {
          radius: 25,
          blur: 20,
          maxZoom: 17,
          max: 1.0,
          gradient: { 0.0: '#00ff00', 0.3: '#ffff00', 0.6: '#ff9900', 0.8: '#ff4400', 1.0: '#ff0000' }
        }).addTo(map);
      }

      markersLayerRef.current = window.L.layerGroup().addTo(map);
      comerciosConCoords.forEach(comercio => {
        if (!comercio.afect_crimen) return;
        const intensityColor = {
          'Mucho': '#ff0000', 'Moderado': '#ff9900', 'Algo': '#ffff00',
          'Poco': '#90EE90', 'Nada': '#00ff00'
        }[comercio.afect_crimen] || COLORS.primary;

        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: '<div style="width: 10px; height: 10px; background: ' + intensityColor + '; border: 2px solid ' + COLORS.background + '; border-radius: 50%; box-shadow: 0 0 8px ' + intensityColor + '80;"></div>',
          iconSize: [10, 10]
        });

        try {
          const marker = window.L.marker([comercio.lat, comercio.long], { icon });
          marker.bindPopup('<div style="font-family: Inter, sans-serif; background: ' + COLORS.surface + '; color: ' + COLORS.text + '; padding: 12px; border-radius: 4px;"><strong style="color: ' + intensityColor + '; display: block; margin-bottom: 8px;">' + (comercio.comercio || 'Sin nombre') + '</strong><div style="font-size: 13px; color: ' + COLORS.textSecondary + ';">Percepción de crimen: <strong>' + comercio.afect_crimen + '</strong></div></div>');
          markersLayerRef.current.addLayer(marker);
        } catch (error) {
          console.error('Error al agregar marcador:', error);
        }
      });

    } else if (viewMode === 'credito') {
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      comerciosConCoords.forEach(comercio => {
        const tieneCredito = parseFloat(comercio.credits_bancos) > 0 ||
          parseFloat(comercio.credits_proveedor) > 0 ||
          parseFloat(comercio.credits_familia) > 0 ||
          parseFloat(comercio.credits_gobierno) > 0 ||
          parseFloat(comercio.credits_privado) > 0;

        const color = tieneCredito ? COLORS.accent : COLORS.primaryLight;

        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: '<div style="width: 10px; height: 10px; background: ' + color + '; border: 2px solid ' + COLORS.background + '; border-radius: 50%; box-shadow: 0 0 8px ' + color + '80;"></div>',
          iconSize: [10, 10]
        });

        try {
          const marker = window.L.marker([comercio.lat, comercio.long], { icon });
          marker.bindPopup('<div style="font-family: Inter, sans-serif; background: ' + COLORS.surface + '; color: ' + COLORS.text + '; padding: 12px; border-radius: 4px;"><strong style="color: ' + color + '; display: block; margin-bottom: 8px;">' + (comercio.comercio || 'Sin nombre') + '</strong><div style="font-size: 13px; color: ' + COLORS.textSecondary + ';">Acceso a crédito: <strong>' + (tieneCredito ? 'Sí' : 'No') + '</strong></div></div>');
          markersLayerRef.current.addLayer(marker);
        } catch (error) {
          console.error('Error al agregar marcador:', error);
        }
      });
    }
  }, [viewMode, datos]);

  // Calcular conteos para las leyendas
  const comerciosConCoords = datos.filter(c =>
    c.lat && c.long &&
    !isNaN(c.lat) && !isNaN(c.long) &&
    c.lat !== 0 && c.long !== 0
  );

  const crimenCounts = {
    'Mucho': comerciosConCoords.filter(c => c.afect_crimen === 'Mucho').length,
    'Moderado': comerciosConCoords.filter(c => c.afect_crimen === 'Moderado').length,
    'Algo': comerciosConCoords.filter(c => c.afect_crimen === 'Algo').length,
    'Poco': comerciosConCoords.filter(c => c.afect_crimen === 'Poco').length,
    'Nada': comerciosConCoords.filter(c => c.afect_crimen === 'Nada').length
  };

  const creditoCounts = {
    'Con crédito': comerciosConCoords.filter(c =>
      parseFloat(c.credits_bancos) > 0 ||
      parseFloat(c.credits_proveedor) > 0 ||
      parseFloat(c.credits_familia) > 0 ||
      parseFloat(c.credits_gobierno) > 0 ||
      parseFloat(c.credits_privado) > 0
    ).length,
    'Sin crédito': comerciosConCoords.filter(c =>
      !(parseFloat(c.credits_bancos) > 0 ||
        parseFloat(c.credits_proveedor) > 0 ||
        parseFloat(c.credits_familia) > 0 ||
        parseFloat(c.credits_gobierno) > 0 ||
        parseFloat(c.credits_privado) > 0)
    ).length
  };

  return (
    <section id="mapa" className="fade-up" style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: COLORS.accent,
          marginBottom: '20px',
          fontWeight: '500'
        }}>
          {t('mapSubtitle')}
        </div>
        <h2 style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: '400',
          color: COLORS.text,
          marginBottom: '20px'
        }}>
          {t('mapTitle')}
        </h2>
        <p style={{
          fontSize: '16px',
          color: COLORS.textSecondary,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {t('mapDescription')}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {[
          { mode: 'general', label: t('mapTab1') },
          { mode: 'crimen', label: t('mapTab2') },
          { mode: 'credito', label: t('mapTab3') }
        ].map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              padding: '14px 28px',
              backgroundColor: viewMode === mode ? COLORS.primary : COLORS.surface,
              color: viewMode === mode ? COLORS.background : COLORS.text,
              border: '1px solid ' + (viewMode === mode ? COLORS.primary : COLORS.border),
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: viewMode === mode ? '600' : '400',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== mode) {
                e.target.style.backgroundColor = COLORS.primary + '15';
                e.target.style.borderColor = COLORS.primary;
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== mode) {
                e.target.style.backgroundColor = COLORS.surface;
                e.target.style.borderColor = COLORS.border;
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        ref={mapRef}
        style={{
          height: '600px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid ' + COLORS.border,
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}
      />

      {/* Leyenda de colores */}
      {viewMode === 'crimen' && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: COLORS.surface,
          borderRadius: '8px',
          border: '1px solid ' + COLORS.border
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {language === 'es' ? 'Percepción de Afectación por Crimen' : 'Crime Impact Perception'}
          </div>
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {[
              { label: language === 'es' ? 'Mucho' : 'High', key: 'Mucho', color: '#ff0000' },
              { label: language === 'es' ? 'Moderado' : 'Moderate', key: 'Moderado', color: '#ff9900' },
              { label: language === 'es' ? 'Algo' : 'Some', key: 'Algo', color: '#ffff00' },
              { label: language === 'es' ? 'Poco' : 'Low', key: 'Poco', color: '#90EE90' },
              { label: language === 'es' ? 'Nada' : 'None', key: 'Nada', color: '#00ff00' }
            ].map(({ label, key, color }) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '2px solid ' + COLORS.background,
                  boxShadow: '0 0 8px ' + color + '80'
                }} />
                <span style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary
                }}>
                  {label} <strong style={{ color: COLORS.text }}>({crimenCounts[key]})</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'credito' && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: COLORS.surface,
          borderRadius: '8px',
          border: '1px solid ' + COLORS.border
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {language === 'es' ? 'Acceso a Crédito' : 'Credit Access'}
          </div>
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {[
              { label: language === 'es' ? 'Con crédito' : 'With credit', key: 'Con crédito', color: COLORS.accent },
              { label: language === 'es' ? 'Sin crédito' : 'Without credit', key: 'Sin crédito', color: COLORS.primaryLight }
            ].map(({ label, key, color }) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '2px solid ' + COLORS.background,
                  boxShadow: '0 0 8px ' + color + '80'
                }} />
                <span style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary
                }}>
                  {label} <strong style={{ color: COLORS.text }}>({creditoCounts[key]})</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
