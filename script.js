const { useState } = React;
const { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

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

const AnalisisComerciosApp = () => {
  const [seccionActiva, setSeccionActiva] = useState('carga');
  const [datos, setDatos] = useState(null);
  const [analisis, setAnalisis] = useState(null);
  const [cargando, setCargando] = useState(false);

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
      const tendencia = row.venta_vs_mesinantes || 'No especificado';
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
      promedio: (total / countPorTipo[tipo]).toFixed(1)
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

    // 6. Cálculo de expectativas positivas (promedio de 3 variables)
    let comerciosConExpectativasPositivas = 0;
    datos.forEach(row => {
      let puntajePositivo = 0;
      let variablesValidas = 0;

      // Analizar exp_ventas_3mes
      const expVentas = String(row.exp_ventas_3mes || '').toLowerCase();
      if (expVentas) {
        variablesValidas++;
        if (expVentas.includes('aument') || expVentas.includes('crec') || 
            expVentas.includes('mejor') || expVentas.includes('más') ||
            expVentas.includes('subir') || expVentas.includes('mayor')) {
          puntajePositivo++;
        }
      }

      // Analizar exp_inventario_3mes
      const expInventario = String(row.exp_inventario_3mes || '').toLowerCase();
      if (expInventario) {
        variablesValidas++;
        if (expInventario.includes('aument') || expInventario.includes('crec') || 
            expInventario.includes('mejor') || expInventario.includes('más') ||
            expInventario.includes('subir') || expInventario.includes('mayor')) {
          puntajePositivo++;
        }
      }

      // Analizar exp_precios_3mes
      const expPrecios = String(row.exp_precios_3mes || '').toLowerCase();
      if (expPrecios) {
        variablesValidas++;
        if (expPrecios.includes('aument') || expPrecios.includes('crec') || 
            expPrecios.includes('mejor') || expPrecios.includes('más') ||
            expPrecios.includes('subir') || expPrecios.includes('mayor')) {
          puntajePositivo++;
        }
      }

      // Si el promedio de las 3 variables es positivo (>= 50%), cuenta como expectativa positiva
      if (variablesValidas > 0 && (puntajePositivo / variablesValidas) >= 0.5) {
        comerciosConExpectativasPositivas++;
      }
    });

    // 7. Análisis de horarios más comunes
    const horariosConteo = {};
    datos.forEach(row => {
      if (row.hs_apertura && row.hs_cierre) {
        const apertura = row.hs_apertura;
        const cierre = row.hs_cierre;
        const horario = `${apertura} - ${cierre}`;
        horariosConteo[horario] = (horariosConteo[horario] || 0) + 1;
      }
    });
    
    // Encontrar el horario más común
    let horarioMasComun = 'N/A';
    let maxCount = 0;
    Object.entries(horariosConteo).forEach(([horario, count]) => {
      if (count > maxCount) {
        maxCount = count;
        horarioMasComun = horario;
      }
    });

    // Calcular promedio de horas de operación
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
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">Análisis de Comercios</h1>
          <p className="header-subtitle">Proyecto MIT - Informe Preliminar de Datos</p>
        </div>
      </div>

      {/* Navegación */}
      {analisis && (
        <div className="nav-container">
          <div className="nav-content">
            {[
              { id: 'resumen', label: 'Resumen Ejecutivo' },
              { id: 'comercios', label: 'Tipos de Comercio' },
              { id: 'ventas', label: 'Análisis de Ventas' },
              { id: 'laboral', label: 'Datos Laborales' },
              { id: 'credito', label: 'Acceso a Crédito' }
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

      {/* Contenido */}
      <div className="main-content">
        {/* Pantalla de Carga */}
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

        {/* Resumen Ejecutivo */}
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

        {/* Tipos de Comercio */}
        {seccionActiva === 'comercios' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Distribución por Tipo de Comercio</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={analisis.tiposComercio}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analisis.tiposComercio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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

        {/* Análisis de Ventas */}
        {seccionActiva === 'ventas' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Tendencia de Ventas vs. Mes Anterior</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analisis.tendenciaVentas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cantidad" fill="#3b82f6" name="Cantidad de comercios" />
                </BarChart>
              </ResponsiveContainer>
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

        {/* Datos Laborales */}
        {seccionActiva === 'laboral' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Promedio de Trabajadores por Tipo</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analisis.trabajadoresPorTipo}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tipo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="promedio" fill="#8b5cf6" name="Trabajadores promedio" />
                </BarChart>
              </ResponsiveContainer>
              <div className="observation-box">
                <p className="observation-text">
                  <strong>Observación:</strong> El análisis muestra la distribución de empleados por tipo de comercio, 
                  identificando los sectores con mayor intensidad laboral.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Acceso a Crédito */}
        {seccionActiva === 'credito' && analisis && (
          <div className="section-content">
            <div className="card">
              <h2 className="card-title">Acceso a Financiamiento</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={analisis.accesoCredito}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ tipo, value }) => `${tipo}: ${value}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analisis.accesoCredito.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
      </div>

      {/* Footer con instrucciones */}
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

ReactDOM.render(<AnalisisComerciosApp />, document.getElementById('root'));
