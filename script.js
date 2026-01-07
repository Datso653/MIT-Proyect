const { useState, useEffect, useRef } = React;

// === DATOS DEL PROYECTO ===
const TEAM_DATA = {
  name: "GreenThunder",
  members: [
    {
      name: "Gina Marrazzo",
      role: "Data Analyst & Developer",
      university: "UBA",
      linkedin: "https://www.linkedin.com/in/gina-marrazzo-15a8a523b",
      image: "./gina.jpg"
    },
    {
      name: "Sofía Gálvez",
      role: "Research & Analysis",
      university: "UNSAM",
      linkedin: "https://www.linkedin.com/in/sofiagalvez0910",
      image: "./sofia.jpg"
    },
    {
      name: "Juan Da Torre",
      role: "ML Engineer & Developer",
      university: "UBA",
      linkedin: "https://www.linkedin.com/in/juan-da-torre-a3b120262",
      image: "./juan.jpg"
    }
  ],
  universities: [
    { name: "MIT", full: "Massachusetts Institute of Technology", role: "LIFT Lab Principal" },
    { name: "UBA", full: "Universidad de Buenos Aires", role: "Partner Principal" },
    { name: "UNSAM", full: "Universidad Nacional de San Martín", role: "Research Partner" }
  ]
};

const PROJECT_INFO = {
  title: "Transformación Digital de Nanostores",
  subtitle: "Análisis del Ecosistema de Micro-Retail en Buenos Aires",
  mission: "El MIT LIFT Lab busca transformar el ecosistema de micro-retail y aliviar la pobreza en América Latina mediante investigación aplicada, tecnología innovadora y análisis de datos para empoderar a comerciantes de bajos ingresos.",
  objectives: [
    "Analizar factores que impulsan crecimiento y supervivencia de nanostores",
    "Implementar LIFT Digitization and Performance Index",
    "Evaluar adopción tecnológica y su impacto en rendimiento",
    "Mapear 300+ comercios en 5 zonas económicas de Buenos Aires"
  ]
};

// === ICONOS SVG ===
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
  </svg>
);

const TeamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const AnalysisIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
    <path d="M19 10a7 7 0 0 1-14 0"></path>
  </svg>
);

// Función helper para formatear números de forma segura
const formatearNumero = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return Number(num).toFixed(num % 1 === 0 ? 0 : 1);
};

// === COMPONENTE PRINCIPAL ===
const App = () => {
  const [seccion, setSeccion] = useState('inicio');
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [indicadores, setIndicadores] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      console.log('🔄 Cargando datos...');
      
      const response = await fetch('datos_comercios.json');
      if (!response.ok) {
        throw new Error('Error cargando archivo: ' + response.status);
      }
      
      const data = await response.json();
      console.log('✅ Datos cargados:', data.length, 'registros');
      
      setDatos(data);
      calcularIndicadores(data);
      setCargando(false);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message);
      setCargando(false);
    }
  };

  const calcularIndicadores = (data) => {
    try {
      console.log('📊 Calculando indicadores...');
      
      const total = data.length;
      
      // Promedio trabajadores
      const trabajadoresData = data.filter(c => {
        const val = parseFloat(c.cantidad_trabajadores);
        return !isNaN(val) && val > 0;
      });
      const promTrabajadores = trabajadoresData.length > 0 
        ? trabajadoresData.reduce((sum, c) => sum + parseFloat(c.cantidad_trabajadores), 0) / trabajadoresData.length
        : 0;
      
      // Tipos de comercio
      const tipos = {};
      data.forEach(c => {
        const tipo = c.tipo_comercio || 'No especificado';
        tipos[tipo] = (tipos[tipo] || 0) + 1;
      });
      const cantidadTipos = Object.keys(tipos).length;
      
      // Horas de operación
      const conHorarios = data.filter(c => {
        const apertura = parseFloat(c.hs_apertura);
        const cierre = parseFloat(c.hs_cierre);
        return !isNaN(apertura) && !isNaN(cierre) && cierre > apertura;
      });
      const promHoras = conHorarios.length > 0
        ? conHorarios.reduce((sum, c) => 
            sum + (parseFloat(c.hs_cierre) - parseFloat(c.hs_apertura)), 0
          ) / conHorarios.length
        : 0;
      
      // Acceso a crédito
      const conCredito = data.filter(c => {
        const bancos = parseFloat(c.credits_bancos) || 0;
        const proveedor = parseFloat(c.credits_proveedor) || 0;
        const familia = parseFloat(c.credits_familia) || 0;
        return bancos > 0 || proveedor > 0 || familia > 0;
      }).length;
      
      // Expectativas positivas
      let expectativasPositivas = 0;
      data.forEach(row => {
        const expVentas = String(row.exp_ventas_3mes || '').toLowerCase();
        if (expVentas.includes('aument') || expVentas.includes('crec') || 
            expVentas.includes('mejor') || expVentas.includes('más') ||
            expVentas.includes('mas')) {
          expectativasPositivas++;
        }
      });
      
      // Con tecnología
      const conTecnologia = data.filter(c => {
        const tec = String(c.tecnologia || '').toLowerCase();
        return tec === 'sí' || tec === 'si' || tec === 'yes';
      }).length;
      
      // Años promedio de operación
      const añoActual = new Date().getFullYear();
      const conAño = data.filter(c => {
        const año = parseFloat(c.año_apertura);
        return !isNaN(año) && año > 1900 && año <= añoActual;
      });
      const promAñosOperacion = conAño.length > 0
        ? conAño.reduce((sum, c) => 
            sum + (añoActual - parseFloat(c.año_apertura)), 0
          ) / conAño.length
        : 0;
      
      // Con local propio
      const conLocalPropio = data.filter(c => 
        String(c.local || '').toLowerCase().includes('propio')
      ).length;
      
      const indicadoresCalculados = {
        total: total,
        promTrabajadores: formatearNumero(promTrabajadores),
        cantidadTipos: cantidadTipos,
        promHoras: formatearNumero(promHoras),
        conCredito: conCredito,
        pctCredito: formatearNumero((conCredito/total)*100),
        expectativasPositivas: expectativasPositivas,
        pctExpectativas: formatearNumero((expectativasPositivas/total)*100),
        conTecnologia: conTecnologia,
        pctTecnologia: formatearNumero((conTecnologia/total)*100),
        promAñosOperacion: formatearNumero(promAñosOperacion),
        conLocalPropio: conLocalPropio,
        pctLocalPropio: formatearNumero((conLocalPropio/total)*100)
      };
      
      console.log('✅ Indicadores:', indicadoresCalculados);
      setIndicadores(indicadoresCalculados);
    } catch (err) {
      console.error('❌ Error calculando:', err);
      setError('Error calculando indicadores: ' + err.message);
    }
  };

  const nav = [
    { id: 'inicio', label: 'Inicio', icon: HomeIcon },
    { id: 'equipo', label: 'Equipo', icon: TeamIcon },
    { id: 'indicadores', label: 'Indicadores', icon: ChartIcon },
    { id: 'mapa', label: 'Mapa', icon: MapIcon },
    { id: 'analisis', label: 'Análisis', icon: AnalysisIcon },
    { id: 'ml', label: 'Machine Learning', icon: BrainIcon }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <header style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white',
        padding: '3rem 2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            MIT LIFT Lab | GreenThunder
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            {PROJECT_INFO.title}
          </p>
        </div>
      </header>

      <nav style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1.5rem 2rem 0'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '0.75rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          {nav.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSeccion(item.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  background: seccion === item.id ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                  color: seccion === item.id ? 'white' : '#4b5563',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Icon />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '2px solid #fca5a5' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {cargando && (
          <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>⏳ Cargando datos...</p>
          </div>
        )}
        
        {!cargando && !error && datos && (
          <>
            {seccion === 'inicio' && <SeccionInicio />}
            {seccion === 'equipo' && <SeccionEquipo />}
            {seccion === 'indicadores' && indicadores && <SeccionIndicadores indicadores={indicadores} />}
            {seccion === 'mapa' && <SeccionMapa datos={datos} />}
            {seccion === 'analisis' && <SeccionAnalisis datos={datos} />}
            {seccion === 'ml' && <SeccionML />}
          </>
        )}
      </main>
    </div>
  );
};

// === SECCIONES ===
const SeccionInicio = () => (
  <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '1rem' }}>
        {PROJECT_INFO.title}
      </h2>
      <p style={{ fontSize: '1.3rem', color: '#3b82f6', fontWeight: '600', marginBottom: '2rem' }}>
        {PROJECT_INFO.subtitle}
      </p>
      <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
        {PROJECT_INFO.mission}
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
      <StatCard number="923" label="Comercios Encuestados" color="#3b82f6" />
      <StatCard number="95%" label="MiPyMEs en LATAM" color="#8b5cf6" />
      <StatCard number="72%" label="Usan papel" color="#ec4899" />
      <StatCard number="5" label="Zonas Económicas" color="#10b981" />
    </div>

    <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '1rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1e3a8a' }}>
        🎯 Objetivos del Proyecto
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {PROJECT_INFO.objectives.map((obj, i) => (
          <li key={i} style={{ padding: '0.75rem 0', borderBottom: i < PROJECT_INFO.objectives.length - 1 ? '1px solid #d1d5db' : 'none' }}>
            <span style={{ color: '#3b82f6', fontWeight: '700', marginRight: '0.5rem' }}>✓</span>
            {obj}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const StatCard = ({ number, label, color }) => (
  <div style={{
    background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
    border: `2px solid ${color}40`,
    borderRadius: '1rem',
    padding: '2rem',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '3rem', fontWeight: '900', color, marginBottom: '0.5rem' }}>
      {number}
    </div>
    <div style={{ fontSize: '1rem', color: '#6b7280', fontWeight: '600' }}>
      {label}
    </div>
  </div>
);

const SeccionEquipo = () => (
  <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '1rem', textAlign: 'center' }}>
      Equipo {TEAM_DATA.name} ⚡
    </h2>
    <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem', fontSize: '1.1rem' }}>
      Estudiantes de UBA y UNSAM trabajando en colaboración con MIT LIFT Lab
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
      {TEAM_DATA.members.map((member, i) => (
        <div key={i} style={{
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <img
            src={member.image}
            alt={member.name}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '1.5rem',
              border: '4px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          />
          <div style={{
            display: 'none',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: '#3b82f6',
            color: 'white',
            fontSize: '4rem',
            fontWeight: '700',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '4px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            {member.name.charAt(0)}
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            {member.name}
          </h3>
          <p style={{ color: '#3b82f6', fontWeight: '600', marginBottom: '0.5rem' }}>
            {member.role}
          </p>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            {member.university}
          </p>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: '#0077b5',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'background 0.3s'
            }}
          >
            LinkedIn →
          </a>
        </div>
      ))}
    </div>

    <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '1rem' }}>
      <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', color: '#1e3a8a', textAlign: 'center' }}>
        🎓 Instituciones Colaboradoras
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {TEAM_DATA.universities.map((uni, i) => (
          <div key={i} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6', marginBottom: '0.5rem' }}>
              {uni.name}
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#1f2937', fontWeight: '600', marginBottom: '0.25rem' }}>
              {uni.full}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {uni.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SeccionIndicadores = ({ indicadores }) => (
  <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '2rem', textAlign: 'center' }}>
      📊 Indicadores Clave del Relevamiento
    </h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
      <IndicadorCard titulo="Total Comercios" valor={indicadores.total} subtitulo="Encuestas completadas" color="#3b82f6" icono="🏪" />
      <IndicadorCard titulo="Tipos de Comercio" valor={indicadores.cantidadTipos} subtitulo="Categorías diferentes" color="#8b5cf6" icono="📋" />
      <IndicadorCard titulo="Promedio Trabajadores" valor={indicadores.promTrabajadores} subtitulo="Por comercio" color="#ec4899" icono="👥" />
      <IndicadorCard titulo="Horas Operación" valor={indicadores.promHoras + 'h'} subtitulo="Promedio diario" color="#10b981" icono="⏰" />
      <IndicadorCard titulo="Años en Operación" valor={indicadores.promAñosOperacion} subtitulo="Antigüedad promedio" color="#f59e0b" icono="📅" />
      <IndicadorCard titulo="Con Acceso a Crédito" valor={indicadores.conCredito} subtitulo={indicadores.pctCredito + '% del total'} color="#06b6d4" icono="💳" />
      <IndicadorCard titulo="Expectativas Positivas" valor={indicadores.expectativasPositivas} subtitulo={indicadores.pctExpectativas + '% esperan crecer'} color="#84cc16" icono="📈" />
      <IndicadorCard titulo="Usan Tecnología" valor={indicadores.conTecnologia} subtitulo={indicadores.pctTecnologia + '% del total'} color="#a855f7" icono="💻" />
      <IndicadorCard titulo="Local Propio" valor={indicadores.conLocalPropio} subtitulo={indicadores.pctLocalPropio + '% del total'} color="#ef4444" icono="🏠" />
    </div>

    <div style={{ marginTop: '3rem', background: '#f0f9ff', padding: '2rem', borderRadius: '1rem', border: '2px solid #3b82f6' }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e3a8a', marginBottom: '1rem' }}>
        💡 Insights Principales
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, color: '#1f2937' }}>
        <li style={{ padding: '0.5rem 0' }}>
          <strong>• Digitalización:</strong> Solo {indicadores.pctTecnologia}% usa sistemas tecnológicos
        </li>
        <li style={{ padding: '0.5rem 0' }}>
          <strong>• Acceso financiero:</strong> {indicadores.pctCredito}% tiene acceso a crédito
        </li>
        <li style={{ padding: '0.5rem 0' }}>
          <strong>• Optimismo:</strong> {indicadores.pctExpectativas}% tiene expectativas positivas
        </li>
        <li style={{ padding: '0.5rem 0' }}>
          <strong>• Diversidad:</strong> {indicadores.cantidadTipos} tipos diferentes de comercio
        </li>
      </ul>
    </div>
  </div>
);

const IndicadorCard = ({ titulo, valor, subtitulo, color, icono }) => (
  <div style={{
    background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
    border: `2px solid ${color}40`,
    borderRadius: '1rem',
    padding: '1.5rem',
    transition: 'transform 0.3s',
    cursor: 'pointer'
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '600', margin: 0, flex: 1 }}>
        {titulo}
      </h3>
      <span style={{ fontSize: '1.5rem' }}>{icono}</span>
    </div>
    <div style={{ fontSize: '2.5rem', fontWeight: '900', color, marginBottom: '0.5rem' }}>
      {valor}
    </div>
    <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
      {subtitulo}
    </p>
  </div>
);

const SeccionMapa = ({ datos }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  
  useEffect(() => {
    if (!mapRef.current || mapInstance.current || typeof L === 'undefined') return;
    
    try {
      const map = L.map(mapRef.current).setView([-34.6037, -58.3816], 11);
      mapInstance.current = map;
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
      }).addTo(map);
      
      const comerciosValidos = datos.filter(d => {
        const lat = parseFloat(d.lat);
        const long = parseFloat(d.long);
        return !isNaN(lat) && !isNaN(long) && lat !== 0 && long !== 0 &&
               lat < -34.0 && lat > -35.0 && long < -58.0 && long > -59.0;
      });
      
      console.log('📍 Marcadores:', comerciosValidos.length);
      
      comerciosValidos.forEach((c, i) => {
        L.marker([parseFloat(c.lat), parseFloat(c.long)])
          .bindPopup('<strong>' + (c.comercio || 'Comercio ' + (i+1)) + '</strong><br/>' + (c.tipo_comercio || 'N/A'))
          .addTo(map);
      });
    } catch (err) {
      console.error('Error mapa:', err);
    }
    
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [datos]);
  
  return (
    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '1rem', textAlign: 'center' }}>
        🗺️ Mapa de Comercios - Buenos Aires
      </h2>
      <div ref={mapRef} style={{ height: '600px', borderRadius: '1rem', border: '2px solid #e5e7eb' }}></div>
    </div>
  );
};

const SeccionAnalisis = () => (
  <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}>
    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '1rem' }}>
      📈 Análisis de Datos
    </h2>
    <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Próximamente gráficos avanzados</p>
  </div>
);

const SeccionML = () => (
  <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}>
    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '1rem' }}>
      🤖 Machine Learning
    </h2>
    <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Sección en pausa</p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);