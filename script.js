const { useState, useEffect, useRef } = React;

// Iconos SVG
const StoreIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const DollarSignIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const UploadIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

// Componente de gráfico usando Chart.js
const ChartComponent = ({ type, data, options }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Destruir el gráfico anterior si existe
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: type,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          ...options
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, options]);

  return <canvas ref={canvasRef}></canvas>;
};

const AnalisisComerciosApp = () => {
  const [seccionActiva, setSeccionActiva] = useState('resumen');
  const [datos, setDatos] = useState(null);
  const [analisis, setAnalisis] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mlResultados, setMlResultados] = useState(null);
  const [error, setError] = useState(null);

  // Cargar datos automáticamente al iniciar
  useEffect(() => {
    cargarDatosAutomaticamente();
  }, []);

  // Cargar resultados de ML
  useEffect(() => {
    fetch('ml_results.json')
      .then(res => res.json())
      .then(data => {
        console.log('📊 Resultados ML cargados:', data);
        setMlResultados(data);
      })
      .catch(err => console.log('ℹ️ No se encontró ml_results.json'));
  }, []);

  const cargarDatosAutomaticamente = async () => {
    try {
      setCargando(true);
      setError(null);
      
      console.log('📊 Intentando cargar datos...');
      
      // Primero intentar JSON (más rápido y confiable)
      try {
        const jsonResponse = await fetch('datos_comercios.json', {
          cache: 'no-store'
        });
        
        if (jsonResponse.ok) {
          const datosJSON = await jsonResponse.json();
          console.log('✅ Datos JSON cargados:', datosJSON.length, 'registros');
          
          const datosValidos = datosJSON.filter(row => row && (row.tipo_comercio || row.fecha));
          console.log('✅ Datos válidos:', datosValidos.length);
          
          setDatos(datosValidos);
          const nuevoAnalisis = generarAnalisis(datosValidos);
          setAnalisis(nuevoAnalisis);
          setCargando(false);
          console.log('🎉 Datos JSON procesados exitosamente');
          return;
        }
      } catch (jsonErr) {
        console.log('ℹ️ JSON no disponible, intentando CSV...');
      }
      
      // Fallback a CSV con múltiples intentos
      const posiblesRutas = [
        'datos_comercios.csv',
        'base_de_datos.csv', 
        'comercios.csv',
        'data.csv'
      ];

      let archivoEncontrado = false;
      
      for (const ruta of posiblesRutas) {
        try {
          const response = await fetch(ruta, { cache: 'no-store' });
          if (response.ok) {
            const texto = await response.text();
            console.log(`✅ CSV cargado desde: ${ruta}`);
            procesarCSVTexto(texto);
            archivoEncontrado = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!archivoEncontrado) {
        throw new Error('No se encontró el archivo de datos (JSON o CSV)');
      }
      
    } catch (err) {
      console.error('❌ Error cargando datos:', err);
      setError(err.message);
      setCargando(false);
    }
  };

  const procesarCSVTexto = (textoCSV) => {
    Papa.parse(textoCSV, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (resultado) => {
        const datos = resultado.data;
        const analisisGenerado = generarAnalisis(datos);
        setDatos(datos);
        setAnalisis(analisisGenerado);
        setCargando(false);
      },
      error: (error) => {
        setError('Error al procesar el archivo: ' + error.message);
        setCargando(false);
      }
    });
  };

  const procesarCSV = (archivo) => {
    setCargando(true);
    Papa.parse(archivo, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (resultado) => {
        const datos = resultado.data;
        const analisisGenerado = generarAnalisis(datos);
        setDatos(datos);
        setAnalisis(analisisGenerado);
        setCargando(false);
        setSeccionActiva('resumen');
      },
      error: (error) => {
        alert('Error al procesar el archivo: ' + error.message);
        setCargando(false);
      }
    });
  };

  const generarAnalisis = (datos) => {
    // 1. Conteo de tipos de comercio
    const tiposComercio = {};
    datos.forEach(row => {
      const tipo = row.tipo_comercio || 'No especificado';
      tiposComercio[tipo] = (tiposComercio[tipo] || 0) + 1;
    });
    const tiposComercioArray = Object.entries(tiposComercio).map(([name, value]) => ({
      name,
      value
    }));

    // 2. Tendencia de ventas
    const ventasTendencia = {};
    datos.forEach(row => {
      const tendencia = row.venta_vs_mesantes || row.venta_vs_mesinantes || 'No especificado';
      ventasTendencia[tendencia] = (ventasTendencia[tendencia] || 0) + 1;
    });
    const tendenciaVentas = Object.entries(ventasTendencia).map(([categoria, cantidad]) => ({
      categoria,
      cantidad,
      porcentaje: ((cantidad / datos.length) * 100).toFixed(1)
    }));

    // 3. Promedio de trabajadores por tipo
    const trabajadoresPorTipo = {};
    const countPorTipo = {};
    datos.forEach(row => {
      const tipo = row.tipo_comercio || 'No especificado';
      const trabajadores = parseFloat(row.cantidad_trabajadores) || 0;
      if (trabajadores > 0) {
        trabajadoresPorTipo[tipo] = (trabajadoresPorTipo[tipo] || 0) + trabajadores;
        countPorTipo[tipo] = (countPorTipo[tipo] || 0) + 1;
      }
    });
    const trabajadoresArray = Object.entries(trabajadoresPorTipo).map(([tipo, total]) => ({
      tipo,
      promedio: parseFloat((total / countPorTipo[tipo]).toFixed(1))
    }));

    // 4. Acceso a crédito
    const creditoData = {
      'Sin crédito': 0,
      'Crédito formal': 0,
      'Crédito informal': 0,
      'Ambos': 0
    };
    datos.forEach(row => {
      const formal = row.credito_formal === 'Sí' || row.credito_formal === 'Si' || row.credito_formal === 1;
      const informal = row.credito_bancos === 'Sí' || row.credito_cooperador === 'Sí' || 
                       row.credito_famiilia === 'Sí' || row.credito_privado === 'Sí';
      
      if (formal && informal) creditoData['Ambos']++;
      else if (formal) creditoData['Crédito formal']++;
      else if (informal) creditoData['Crédito informal']++;
      else creditoData['Sin crédito']++;
    });
    const accesoCredito = Object.entries(creditoData).map(([tipo, value]) => ({
      tipo,
      value
    }));

    // 5. Estadísticas generales
    const totalComercios = datos.length;
    const promedioTrabajadores = datos.reduce((sum, row) => {
      return sum + (parseFloat(row.cantidad_trabajadores) || 0);
    }, 0) / datos.filter(row => row.cantidad_trabajadores).length;

    // 6. Cálculo de expectativas positivas
    let comerciosConExpectativasPositivas = 0;
    datos.forEach(row => {
      let puntajePositivo = 0;
      let variablesValidas = 0;

      const expVentas = String(row.exp_ventas_3mes || '').toLowerCase();
      if (expVentas) {
        variablesValidas++;
        if (expVentas.includes('aument') || expVentas.includes('crec') || 
            expVentas.includes('mejor') || expVentas.includes('más') ||
            expVentas.includes('subir') || expVentas.includes('mayor')) {
          puntajePositivo++;
        }
      }

      const expInventario = String(row.exp_inventario_3mes || '').toLowerCase();
      if (expInventario) {
        variablesValidas++;
        if (expInventario.includes('aument') || expInventario.includes('crec') || 
            expInventario.includes('mejor') || expInventario.includes('más') ||
            expInventario.includes('subir') || expInventario.includes('mayor')) {
          puntajePositivo++;
        }
      }

      const expPrecios = String(row.exp_precios_3mes || '').toLowerCase();
      if (expPrecios) {
        variablesValidas++;
        if (expPrecios.includes('aument') || expPrecios.includes('crec') || 
            expPrecios.includes('mejor') || expPrecios.includes('más') ||
            expPrecios.includes('subir') || expPrecios.includes('mayor')) {
          puntajePositivo++;
        }
      }

      if (variablesValidas > 0 && (puntajePositivo / variablesValidas) >= 0.5) {
        comerciosConExpectativasPositivas++;
      }
    });

    // 7. Análisis de horarios
    const horariosConteo = {};
    datos.forEach(row => {
      if (row.hs_apertura && row.hs_cierre) {
        const apertura = row.hs_apertura;
        const cierre = row.hs_cierre;
        const horario = `${apertura} - ${cierre}`;
        horariosConteo[horario] = (horariosConteo[horario] || 0) + 1;
      }
    });
    
    let horarioMasComun = 'N/A';
    let maxCount = 0;
    Object.entries(horariosConteo).forEach(([horario, count]) => {
      if (count > maxCount) {
        maxCount = count;
        horarioMasComun = horario;
      }
    });

    const horasOperacion = datos.filter(row => row.hs_apertura && row.hs_cierre).map(row => {
      const apertura = parseFloat(row.hs_apertura) || 0;
      const cierre = parseFloat(row.hs_cierre) || 0;
      return cierre - apertura;
    });
    const promedioHoras = horasOperacion.length > 0 
      ? (horasOperacion.reduce((a, b) => a + b, 0) / horasOperacion.length).toFixed(1)
      : 0;

    return {
      tiposComercio: tiposComercioArray,
      tendenciaVentas,
      trabajadoresPorTipo: trabajadoresArray,
      accesoCredito,
      estadisticas: {
        totalComercios,
        promedioTrabajadores: promedioTrabajadores.toFixed(1),
        expectativasPositivas: ((comerciosConExpectativasPositivas / totalComercios) * 100).toFixed(1),
        promedioHoras,
        horarioMasComun
      }
    };
  };

  const manejarArchivo = (evento) => {
    const archivo = evento.target.files[0];
    if (archivo) {
      if (archivo.name.endsWith('.csv')) {
        procesarCSV(archivo);
      } else {
        alert('Por favor, selecciona un archivo CSV');
      }
    }
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];

  const Estadistica = ({ icono: Icono, titulo, valor, subtitulo, color }) => (
    <div className="estadistica-card" style={{ borderColor: color }}>
      <div className="estadistica-content">
        <div>
          <p className="estadistica-titulo">{titulo}</p>
          <p className="estadistica-valor" style={{ color }}>{valor}</p>
          <p className="estadistica-subtitulo">{subtitulo}</p>
        </div>
        <div className="estadistica-icono">
          <div style={{ color }}>
            <Icono />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">Análisis de Comercios</h1>
          <p className="header-subtitle">Proyecto MIT - Informe Preliminar de Datos</p>
        </div>
      </div>

      {analisis && (
        <div className="nav-container">
          <div className="nav-content">
            {[
              { id: 'resumen', label: 'Resumen Ejecutivo' },
              { id: 'comercios', label: 'Tipos de Comercio' },
              { id: 'ventas', label: 'Análisis de Ventas' },
              { id: 'laboral', label: 'Datos Laborales' },
              { id: 'credito', label: 'Acceso a Crédito' },
              { id: 'ml', label: '🤖 Machine Learning' }
            ].map(seccion => (
              <button
                key={seccion.id}
                onClick={() => setSeccionActiva(seccion.id)}
                className={`nav-button ${seccionActiva === seccion.id ? 'active' : ''}`}
              >
                {seccion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="main-content">
        {seccionActiva === 'carga' && !analisis && (
          <div className="upload-container">
            <div className="upload-content">
              <div className="upload-icon">
                <UploadIcon />
              </div>
              <h2 className="upload-title">Carga tu Base de Datos</h2>
              <p className="upload-description">
                Sube tu archivo CSV de comercios para generar el análisis automáticamente
              </p>
              
              <label className="upload-label">
                <input
                  type="file"
                  accept=".csv"
                  onChange={manejarArchivo}
                  className="upload-input"
                  disabled={cargando}
                />
                <div className={`upload-button ${cargando ? 'disabled' : ''}`}>
                  <FileTextIcon />
                  <span>{cargando ? 'Procesando...' : 'Seleccionar archivo CSV'}</span>
                </div>
              </label>

              <div className="upload-requirements">
                <h3 className="requirements-title">Requisitos del archivo:</h3>
                <ul className="requirements-list">
                  <li>✓ Formato: CSV (separado por comas)</li>
                  <li>✓ Debe incluir las columnas del dataset de comercios</li>
                  <li>✓ Primera fila con nombres de columnas</li>
                  <li>✓ Codificación: UTF-8</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'resumen' && analisis && (
          <div className="section-content">
            <div className="stats-grid">
              <Estadistica
                icono={StoreIcon}
                titulo="Comercios Encuestados"
                valor={analisis.estadisticas.totalComercios}
                subtitulo="Muestra total"
                color="#3b82f6"
              />
              <Estadistica
                icono={UsersIcon}
                titulo="Trabajadores Promedio"
                valor={analisis.estadisticas.promedioTrabajadores}
                subtitulo="Por comercio"
                color="#8b5cf6"
              />
              <Estadistica
                icono={TrendingUpIcon}
                titulo="Expectativa Positiva"
                valor={`${analisis.estadisticas.expectativasPositivas}%`}
                subtitulo="Esperan crecimiento"
                color="#10b981"
              />
              <Estadistica
                icono={DollarSignIcon}
                titulo="Horario Más Común"
                valor={analisis.estadisticas.horarioMasComun}
                subtitulo={`${analisis.estadisticas.promedioHoras}h promedio`}
                color="#f59e0b"
              />
            </div>

            <div className="card">
              <h2 className="card-title">Hallazgos Principales</h2>
              <div className="findings-grid">
                <div className="finding-item" style={{ borderColor: '#3b82f6' }}>
                  <h3 className="finding-title">📊 Distribución de Comercios</h3>
                  <p className="finding-text">
                    Se analizaron {analisis.estadisticas.totalComercios} comercios distribuidos en {analisis.tiposComercio.length} categorías diferentes.
                  </p>
                </div>
                <div className="finding-item" style={{ borderColor: '#8b5cf6' }}>
                  <h3 className="finding-title">📈 Tendencia de Ventas</h3>
                  <p className="finding-text">
                    {analisis.tendenciaVentas[0]?.porcentaje}% de los comercios reportó {analisis.tendenciaVentas[0]?.categoria.toLowerCase()} en ventas.
                  </p>
                </div>
                <div className="finding-item" style={{ borderColor: '#ec4899' }}>
                  <h3 className="finding-title">💰 Acceso a Financiamiento</h3>
                  <p className="finding-text">
                    Análisis detallado del acceso a crédito formal e informal de los comercios encuestados.
                  </p>
                </div>
                <div className="finding-item" style={{ borderColor: '#10b981' }}>
                  <h3 className="finding-title">⏰ Horarios de Operación</h3>
                  <p className="finding-text">
                    Horario más común: {analisis.estadisticas.horarioMasComun}, con un promedio de {analisis.estadisticas.promedioHoras} horas diarias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'comercios' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Distribución por Tipo de Comercio</h2>
              <div style={{ height: '400px', position: 'relative' }}>
                <ChartComponent
                  type="pie"
                  data={{
                    labels: analisis.tiposComercio.map(t => t.name),
                    datasets: [{
                      data: analisis.tiposComercio.map(t => t.value),
                      backgroundColor: COLORS,
                      borderWidth: 2,
                      borderColor: '#fff'
                    }]
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
              <div className="types-grid">
                {analisis.tiposComercio.map((tipo, index) => (
                  <div key={tipo.name} className="type-item">
                    <div
                      className="type-color"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <p className="type-name">{tipo.name}</p>
                    <p className="type-count">{tipo.value} comercios</p>
                    <p className="type-percent">
                      {((tipo.value / analisis.estadisticas.totalComercios) * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'ventas' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Tendencia de Ventas vs. Mes Anterior</h2>
              <div style={{ height: '400px' }}>
                <ChartComponent
                  type="bar"
                  data={{
                    labels: analisis.tendenciaVentas.map(t => t.categoria),
                    datasets: [{
                      label: 'Cantidad de comercios',
                      data: analisis.tendenciaVentas.map(t => t.cantidad),
                      backgroundColor: '#3b82f6',
                      borderColor: '#2563eb',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </div>
              <div className="sales-grid">
                {analisis.tendenciaVentas.slice(0, 3).map(item => (
                  <div key={item.categoria} className="sales-item">
                    <p className="sales-percent">{item.porcentaje}%</p>
                    <p className="sales-category">{item.categoria}</p>
                    <p className="sales-count">{item.cantidad} comercios</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'laboral' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Promedio de Trabajadores por Tipo</h2>
              <div style={{ height: '400px' }}>
                <ChartComponent
                  type="bar"
                  data={{
                    labels: analisis.trabajadoresPorTipo.map(t => t.tipo),
                    datasets: [{
                      label: 'Trabajadores promedio',
                      data: analisis.trabajadoresPorTipo.map(t => t.promedio),
                      backgroundColor: '#8b5cf6',
                      borderColor: '#7c3aed',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </div>
              <div className="observation-box">
                <p className="observation-text">
                  <strong>Observación:</strong> El análisis muestra la distribución de empleados por tipo de comercio, 
                  identificando los sectores con mayor intensidad laboral.
                </p>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'credito' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Acceso a Financiamiento</h2>
              <div style={{ height: '400px', position: 'relative' }}>
                <ChartComponent
                  type="doughnut"
                  data={{
                    labels: analisis.accesoCredito.map(c => c.tipo),
                    datasets: [{
                      data: analisis.accesoCredito.map(c => c.value),
                      backgroundColor: COLORS,
                      borderWidth: 2,
                      borderColor: '#fff'
                    }]
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
              <div className="credit-grid">
                {analisis.accesoCredito.map((item, index) => (
                  <div key={item.tipo} className="credit-item">
                    <div
                      className="credit-color"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <p className="credit-type">{item.tipo}</p>
                    <p className="credit-value">{item.value}</p>
                    <p className="credit-percent">
                      {((item.value / analisis.estadisticas.totalComercios) * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
              <div className="key-finding">
                <p className="key-finding-text">
                  <strong>Hallazgo clave:</strong> El análisis del acceso a financiamiento revela oportunidades 
                  significativas para programas de microfinanzas y apoyo al comercio local.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Machine Learning Section */}
        {seccionActiva === 'ml' && mlResultados && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">🤖 Análisis con Machine Learning (Python)</h2>
              <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Clustering K-Means usando scikit-learn para segmentación avanzada de comercios
              </p>

              {/* Metadata */}
              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '1rem', border: '2px solid rgba(59, 130, 246, 0.2)' }}>
                <h3 style={{ fontWeight: '700', color: '#1e3a8a', marginBottom: '1rem' }}>
                  📋 Información del Análisis
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Comercios Totales</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#3b82f6' }}>{mlResultados.metadata.total_comercios}</p>
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Analizados con ML</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#10b981' }}>{mlResultados.metadata.comercios_analizados}</p>
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Features Utilizadas</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#8b5cf6' }}>{mlResultados.metadata.features_utilizadas.length}</p>
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Clusters Generados</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#f59e0b' }}>{mlResultados.clustering.n_clusters}</p>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    <strong>Variables analizadas:</strong> {mlResultados.metadata.features_utilizadas.join(', ')}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    <strong>Fecha:</strong> {mlResultados.metadata.fecha_analisis}
                  </p>
                </div>
              </div>
              
              {/* Distribución de Clusters */}
              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)', borderRadius: '1rem', border: '2px solid rgba(59, 130, 246, 0.2)' }}>
                <h3 style={{ fontWeight: '700', color: '#1e3a8a', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  📊 Distribución de Clusters
                </h3>
                <div style={{ height: '350px' }}>
                  <ChartComponent
                    type="bar"
                    data={{
                      labels: mlResultados.clustering.clusters.map(c => c.label),
                      datasets: [{
                        label: 'Cantidad de comercios',
                        data: mlResultados.clustering.distribucion,
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'],
                        borderWidth: 2,
                        borderColor: '#fff'
                      }]
                    }}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Número de Comercios'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Detalles de cada Cluster */}
              <div className="findings-grid" style={{ marginTop: '2rem' }}>
                {mlResultados.clustering.clusters.map((cluster, idx) => (
                  <div key={cluster.cluster_id} className="finding-item" style={{ 
                    borderColor: ['#3b82f6', '#8b5cf6', '#10b981'][idx],
                    background: `linear-gradient(to right, ${['rgba(59, 130, 246, 0.08)', 'rgba(139, 92, 246, 0.08)', 'rgba(16, 185, 129, 0.08)'][idx]}, transparent)`
                  }}>
                    <h3 className="finding-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                      Cluster {cluster.cluster_id}: {cluster.label}
                    </h3>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Comercios en este cluster</p>
                        <p style={{ fontSize: '1.75rem', fontWeight: '800', color: ['#3b82f6', '#8b5cf6', '#10b981'][idx] }}>
                          {cluster.count}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                          {cluster.porcentaje}% del total
                        </p>
                      </div>
                      {cluster.trabajadores_promedio && (
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Trabajadores</p>
                          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                            {cluster.trabajadores_promedio} <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>(promedio)</span>
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                            Mediana: {cluster.trabajadores_mediana}
                          </p>
                        </div>
                      )}
                      {cluster.horas_promedio && (
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Horas de operación</p>
                          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                            {cluster.horas_promedio}h <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>(promedio)</span>
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                            Mediana: {cluster.horas_mediana}h
                          </p>
                        </div>
                      )}
                      {cluster.porcentaje_credito !== undefined && (
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Con acceso a crédito</p>
                          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                            {cluster.porcentaje_credito}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Visualización PCA */}
              {mlResultados.pca && mlResultados.pca.datos && mlResultados.pca.datos.length > 0 && (
                <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'white', borderRadius: '1rem', border: '2px solid rgba(139, 92, 246, 0.2)' }}>
                  <h3 style={{ fontWeight: '700', color: '#7c3aed', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    📈 Visualización PCA (Reducción Dimensional)
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1rem' }}>
                    Varianza explicada: {(mlResultados.pca.varianza_explicada.reduce((a, b) => a + b, 0) * 100).toFixed(1)}%
                  </p>
                  <div style={{ height: '400px' }}>
                    <ChartComponent
                      type="scatter"
                      data={{
                        datasets: [
                          {
                            label: 'Pequeños',
                            data: mlResultados.pca.datos.filter(d => d.cluster === 0).map(d => ({ x: d.x, y: d.y })),
                            backgroundColor: '#3b82f6',
                            pointRadius: 5
                          },
                          {
                            label: 'Medianos',
                            data: mlResultados.pca.datos.filter(d => d.cluster === 1).map(d => ({ x: d.x, y: d.y })),
                            backgroundColor: '#8b5cf6',
                            pointRadius: 5
                          },
                          {
                            label: 'Grandes',
                            data: mlResultados.pca.datos.filter(d => d.cluster === 2).map(d => ({ x: d.x, y: d.y })),
                            backgroundColor: '#10b981',
                            pointRadius: 5
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: 'Componente Principal 1'
                            }
                          },
                          y: {
                            title: {
                              display: true,
                              text: 'Componente Principal 2'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Expectativas Predictivas */}
              {mlResultados.expectativas && (
                <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderRadius: '1rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
                  <h3 style={{ fontWeight: '800', color: '#065f46', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                    🔮 Análisis Predictivo de Expectativas
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                      <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Expectativas Positivas en Ventas</p>
                      <p style={{ fontSize: '2rem', fontWeight: '900', color: '#10b981' }}>{mlResultados.expectativas.ventas_positivas}</p>
                    </div>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                      <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Expectativas Positivas en Inventario</p>
                      <p style={{ fontSize: '2rem', fontWeight: '900', color: '#3b82f6' }}>{mlResultados.expectativas.inventario_positivo}</p>
                    </div>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                      <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Expectativas Positivas en Precios</p>
                      <p style={{ fontSize: '2rem', fontWeight: '900', color: '#f59e0b' }}>{mlResultados.expectativas.precios_positivos}</p>
                    </div>
                  </div>
                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem' }}>
                    <p style={{ fontSize: '0.95rem', color: '#1f2937', marginBottom: '0.5rem' }}>
                      <strong>Score Promedio de Expectativa:</strong> {mlResultados.expectativas.score_promedio}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                      Basado en {mlResultados.expectativas.total_analizados} comercios analizados
                    </p>
                  </div>
                </div>
              )}

              {/* Correlaciones */}
              {mlResultados.correlaciones && Object.keys(mlResultados.correlaciones).length > 0 && (
                <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'white', borderRadius: '1rem', border: '2px solid rgba(236, 72, 153, 0.2)' }}>
                  <h3 style={{ fontWeight: '800', color: '#be185d', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                    🔗 Correlaciones Encontradas
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {Object.entries(mlResultados.correlaciones).map(([key, value]) => {
                      const absValue = Math.abs(value);
                      const color = absValue > 0.7 ? '#10b981' : absValue > 0.4 ? '#f59e0b' : '#6b7280';
                      return (
                        <div key={key} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', borderLeft: `4px solid ${color}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontSize: '0.95rem', color: '#1f2937', fontWeight: '600' }}>
                              {key.replace(/_/g, ' ').replace('clean', '')}
                            </p>
                            <p style={{ fontSize: '1.25rem', fontWeight: '800', color }}>
                              {value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Insights Finales */}
              <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '1rem', borderLeft: '5px solid #f59e0b' }}>
                <h3 style={{ fontWeight: '800', color: '#92400e', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  🎯 Insights del Modelo ML
                </h3>
                <div style={{ color: '#1f2937', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>✓ Algoritmo utilizado:</strong> K-Means Clustering con normalización StandardScaler y reducción dimensional PCA.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>✓ Calidad del modelo:</strong> Inercia de {mlResultados.clustering.inercia.toFixed(2)}, indicando la cohesión de los clusters.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>✓ Variables consideradas:</strong> {mlResultados.metadata.features_utilizadas.join(', ')}.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>✓ Aplicación práctica:</strong> Esta segmentación permite diseñar políticas diferenciadas de apoyo según el tamaño y características de cada grupo.
                  </p>
                  <p>
                    <strong>✓ Cobertura:</strong> {mlResultados.metadata.comercios_analizados} de {mlResultados.metadata.total_comercios} comercios analizados con datos completos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje si no hay resultados ML */}
        {seccionActiva === 'ml' && !mlResultados && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">🤖 Machine Learning con Python</h2>
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🐍</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
                  Ejecuta el script de Python para generar el análisis ML
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.05rem' }}>
                  Los resultados del análisis de Machine Learning aparecerán aquí una vez que ejecutes el script de Python.
                </p>
                <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '1rem', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>📝 Instrucciones:</h4>
                  <ol style={{ color: '#4b5563', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                    <li>Instala las dependencias: <code style={{ background: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>pip install -r requirements.txt</code></li>
                    <li>Ejecuta el script: <code style={{ background: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>python ml_analysis.py tu_archivo.csv</code></li>
                    <li>El script generará <code style={{ background: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>ml_results.json</code></li>
                    <li>Recarga esta página para ver los resultados</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {analisis && (
        <div className="footer-container">
          <div className="footer-card">
            <h3 className="footer-title">Recomendaciones para el Informe MIT</h3>
            <div className="recommendations">
              <p>✓ <strong>Enfoque en impacto:</strong> Destaca cómo estos datos pueden informar políticas de apoyo al comercio local</p>
              <p>✓ <strong>Análisis comparativo:</strong> Compara resultados entre tipos de comercio y ubicaciones</p>
              <p>✓ <strong>Correlaciones:</strong> Analiza relación entre acceso a crédito y expectativas de crecimiento</p>
              <p>✓ <strong>Visualización geoespacial:</strong> Utiliza lat/long para mapeo de densidad comercial</p>
              <p>✓ <strong>Machine Learning:</strong> Considera modelos predictivos para identificar comercios con alto potencial</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AnalisisComerciosApp />);