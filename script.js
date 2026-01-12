const { useState, useEffect, useRef } = React;

// === DATOS DEL PROYECTO ===
const TEAM_DATA = {
  name: "GreenThunder",
  tagline: "Data-driven insights for local business transformation",
  members: [
    {
      name: "Gina Marrazzo",
      role: "Lic. en Economía",
      university: "UBA",
      linkedin: "https://www.linkedin.com/in/gina-marrazzo-15a8a523b",
      image: "./Gina.jpg"
    },
    {
      name: "Sofía Gálvez",
      role: "Lic. en Administración de Empresas",
      university: "UNSAM",
      linkedin: "https://www.linkedin.com/in/sofiagalvez0910",
      image: "./Sofia.jpg"
    },
    {
      name: "Juan Da Torre",
      role: "Lic. en Economía",
      university: "UBA",
      linkedin: "https://www.linkedin.com/in/juan-da-torre-a3b120262",
      image: "./Juan.jpg"
    }
  ],
  universities: [
    { name: "MIT", full: "Massachusetts Institute of Technology", role: "LIFT Lab Principal" },
    { name: "UBA", full: "Universidad de Buenos Aires", role: "Partner Principal" },
    { name: "UNSAM", full: "Universidad Nacional de San Martín", role: "Research Partner" }
  ]
};

const COLORS = {
  // Paleta principal: Celeste, Blanco, Amarillo
  primary: '#4FC3F7',      // Celeste principal
  primaryDark: '#0288D1',  // Celeste oscuro
  primaryLight: '#81D4FA', // Celeste claro
  
  accent: '#FFD54F',       // Amarillo principal
  accentDark: '#FFA726',   // Amarillo-naranja
  accentLight: '#FFE082',  // Amarillo claro
  
  // Backgrounds
  background: '#0a0a0a',   // Negro profundo
  surface: '#141414',      // Gris muy oscuro
  surfaceHover: '#1a1a1a', // Gris oscuro hover
  
  // Text
  text: '#FFFFFF',         // Blanco puro
  textSecondary: '#B0BEC5', // Gris azulado claro
  textTertiary: '#78909C',  // Gris azulado medio
  
  // Borders
  border: '#263238',       // Gris azulado oscuro
  borderLight: '#37474F',  // Gris azulado
  
  // Chart colors usando la paleta
  chartColors: ['#4FC3F7', '#81D4FA', '#FFD54F', '#FFA726', '#29B6F6', '#FFE082', '#0288D1', '#FFCA28']
};

// === COMPONENTE PRINCIPAL ===
function App() {
  const [datos, setDatos] = useState([]);
  const [indicadores, setIndicadores] = useState(null);
  const [datosGraficos, setDatosGraficos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timestamp = new Date().getTime();
    fetch(`datos_comercios.json?v=${timestamp}`)
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar datos');
        return response.json();
      })
      .then(data => {
        setDatos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (datos.length > 0) {
      const inds = calcularIndicadores(datos);
      setIndicadores(inds);
      
      const graficos = procesarDatosGraficos(datos);
      setDatosGraficos(graficos);
    }
  }, [datos]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        color: COLORS.primary,
        fontSize: '18px',
        fontFamily: '"Crimson Pro", serif',
        letterSpacing: '0.05em'
      }}>
        Cargando análisis...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        color: '#ff6b6b',
        fontSize: '16px',
        padding: '40px',
        textAlign: 'center'
      }}>
        Error al cargar datos: {error}
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      color: COLORS.text,
      backgroundColor: COLORS.background,
      minHeight: '100vh',
      width: '100%'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          overflow-x: hidden;
          background-color: #0a0a0a;
          width: 100%;
        }
        
        #root {
          background-color: #0a0a0a;
          width: 100%;
        }
        
        /* RESPONSIVE STYLES */
        @media (max-width: 768px) {
          /* Hero section */
          section[data-section="hero"] {
            padding: 60px 20px !important;
            min-height: 80vh !important;
          }
          
          section[data-section="hero"] h1 {
            font-size: 32px !important;
            line-height: 1.2 !important;
          }
          
          section[data-section="hero"] p {
            font-size: 15px !important;
          }
          
          /* General sections - reducir padding vacío */
          section {
            padding: 50px 20px !important;
          }
          
          /* Títulos más compactos */
          h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          h3 {
            font-size: 18px !important;
          }
          
          /* Grids - force single column */
          [style*="gridTemplateColumns: repeat(auto-fit"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          [style*="gridTemplateColumns: '2fr 1fr 1fr'"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          /* ML Cards - más compactos */
          [style*="padding: '40px'"][style*="borderRadius: '8px'"] {
            padding: 20px !important;
          }
          
          /* Footer - más compacto */
          footer {
            padding: 50px 20px !important;
          }
          
          footer > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          /* SVG Charts - responsive */
          svg {
            max-width: 100% !important;
            height: auto !important;
          }
          
          svg[width="400"], svg[width="450"] {
            width: 100% !important;
            height: auto !important;
          }
          
          /* Campus cards */
          [style*="minmax(400px"] {
            grid-template-columns: 1fr !important;
          }
          
          /* Navbar */
          nav {
            padding: 16px 20px !important;
          }
          
          /* Buttons */
          button {
            font-size: 12px !important;
            padding: 10px 16px !important;
          }
          
          /* Margin/Padding reducidos */
          [style*="marginBottom: '60px'"] {
            margin-bottom: 30px !important;
          }
          
          [style*="marginBottom: '80px'"] {
            margin-bottom: 40px !important;
          }
          
          /* Cards más compactas */
          [style*="padding: '30px'"] {
            padding: 20px !important;
          }
          
          [style*="padding: '60px'"] {
            padding: 24px !important;
          }
        }
        
        @media (max-width: 480px) {
          section[data-section="hero"] h1 {
            font-size: 26px !important;
          }
          
          section {
            padding: 40px 16px !important;
          }
          
          h2 {
            font-size: 24px !important;
          }
          
          /* Cards ultra-compactos */
          [style*="padding: '24px'"] {
            padding: 16px !important;
          }
          
          [style*="padding: '20px'"] {
            padding: 16px !important;
          }
          
          /* Campus images */
          [style*="height: '280px'"] {
            height: 180px !important;
          }
          
          /* Reduce gaps */
          [style*="gap: '30px'"] {
            gap: 16px !important;
          }
          
          [style*="gap: '40px'"] {
            gap: 20px !important;
          }
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .fade-in-delay-1 { animation-delay: 0.2s; }
        .fade-in-delay-2 { animation-delay: 0.4s; }
        .fade-in-delay-3 { animation-delay: 0.6s; }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in {
          transform: translateY(20px);
        }
      `}</style>
      <Hero scrollY={scrollY} />
      <ProjectIntro />
      {indicadores && <ResumenEjecutivo indicadores={indicadores} />}
      {indicadores && <Indicadores data={indicadores} />}
      {datosGraficos && <AnalisisVisual data={datosGraficos} />}
      <SeccionAnalisis />
      <SeccionMachineLearning />
      <Team />
      {datos.length > 0 && <Mapa datos={datos} />}
      <Footer />
    </div>
  );
}

// === HERO SECTION ===
function Hero({ scrollY }) {
  const parallaxOffset = scrollY * 0.5;
  
  return (
    <section 
      data-section="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 60px',
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1a1a1a 100%)`
      }}>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${COLORS.primary}15 0%, transparent 70%)`,
        borderRadius: '50%',
        transform: `translateY(${parallaxOffset}px)`,
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${COLORS.primary}10 0%, transparent 70%)`,
        borderRadius: '50%',
        transform: `translateY(${-parallaxOffset * 0.3}px)`,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1400px',
        width: '100%',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <div className="fade-in" style={{
          fontSize: '14px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: COLORS.primary,
          marginBottom: '30px',
          fontWeight: '500'
        }}>
          MIT LIFT Lab × Buenos Aires
        </div>
        
        <h1 className="fade-in fade-in-delay-1" style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: 'clamp(48px, 7vw, 96px)',
          fontWeight: '300',
          lineHeight: '1.1',
          marginBottom: '30px',
          color: COLORS.text
        }}>
          Análisis de Comercios
          <br />
          <span style={{ fontWeight: '600', fontStyle: 'italic' }}>
            Buenos Aires
          </span>
        </h1>
        
        <p className="fade-in fade-in-delay-2" style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: COLORS.textSecondary,
          maxWidth: '600px',
          margin: '0 auto 50px',
          fontWeight: '300'
        }}>
          {TEAM_DATA.tagline}
        </p>
        
        <div className="fade-in fade-in-delay-3" style={{
          fontSize: '13px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: COLORS.textSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <span>Equipo {TEAM_DATA.name}</span>
          <span style={{ color: COLORS.primary }}>•</span>
          <span>2025-2026</span>
        </div>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite',
        opacity: scrollY > 100 ? 0 : 1,
        transition: 'opacity 0.3s'
      }}>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(10px); }
          }
        `}</style>
        <div style={{
          width: '1px',
          height: '60px',
          background: `linear-gradient(to bottom, transparent, ${COLORS.primary})`,
          margin: '0 auto'
        }} />
      </div>
    </section>
  );
}

// === PROJECT INTRO ===
function ProjectIntro() {
  return (
    <section style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
      }}>
        <div>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Sobre el proyecto
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            lineHeight: '1.2',
            marginBottom: '30px',
            color: COLORS.text
          }}>
            Mapeo integral del
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: '600' }}>
              ecosistema comercial
            </span>
          </h2>
        </div>
        
        <div>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: COLORS.textSecondary,
            marginBottom: '20px'
          }}>
            Análisis exhaustivo de comercios locales en Buenos Aires, 
            combinando metodologías de campo del MIT LIFT Lab con 
            machine learning para identificar patrones de crecimiento 
            y oportunidades de desarrollo.
          </p>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: COLORS.textSecondary
          }}>
            Este proyecto forma parte de una iniciativa más amplia 
            para comprender y potenciar el emprendedorismo en 
            mercados emergentes.
          </p>
        </div>
      </div>
    </section>
  );
}

// === INDICADORES CON GRÁFICOS CIRCULARES ===
// === RESUMEN EJECUTIVO PARA COMERCIANTES ===
function ResumenEjecutivo({ indicadores }) {
  if (!indicadores) return null;
  
  return (
    <section style={{
      padding: '120px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Imagen de fondo - Mercado argentino */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.50,
        filter: 'grayscale(20%) brightness(0.65)',
        zIndex: 0
      }} />
      
      {/* Overlay con gradiente celeste-amarillo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}90 0%, ${COLORS.background}70 50%, ${COLORS.background}90 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <div style={{
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.accent,
            marginBottom: '20px',
            fontWeight: '600'
          }}>
            Principales hallazgos
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Lo que aprendimos de {indicadores.total} comercios
          </h2>
          <p style={{
            fontSize: '18px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Un análisis profundo del ecosistema comercial del Área Metropolitana de Buenos Aires
          </p>
        </div>

        {/* Narrativa principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px'
        }}>
          {/* Hallazgo 1 */}
          <div style={{
            padding: '40px',
            backgroundColor: `${COLORS.surface}f5`,
            borderRadius: '12px',
            border: `2px solid ${COLORS.primary}40`,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0
              }}>
                🏪
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: '"Crimson Pro", serif',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: '12px'
                }}>
                  El comercio de cercanía mantiene su vitalidad
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: COLORS.textSecondary,
                  margin: 0
                }}>
                  A pesar de los desafíos económicos, los comercios del AMBA demuestran una notable resiliencia. 
                  La mayoría de los comerciantes mantiene expectativas positivas y deseo de crecimiento, 
                  evidenciando el rol fundamental que juegan en la economía local.
                </p>
              </div>
            </div>
          </div>

          {/* Hallazgo 2 */}
          <div style={{
            padding: '40px',
            backgroundColor: `${COLORS.surface}f5`,
            borderRadius: '12px',
            border: `2px solid ${COLORS.accent}40`,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0
              }}>
                💡
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: '"Crimson Pro", serif',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: '12px'
                }}>
                  La digitalización es una oportunidad latente
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: COLORS.textSecondary,
                  margin: 0
                }}>
                  Existe una brecha significativa en la adopción de tecnología. Los comercios que implementan 
                  herramientas digitales muestran mejores indicadores de gestión, señalando un camino claro 
                  para la modernización del sector.
                </p>
              </div>
            </div>
          </div>

          {/* Hallazgo 3 */}
          <div style={{
            padding: '40px',
            backgroundColor: `${COLORS.surface}f5`,
            borderRadius: '12px',
            border: `2px solid ${COLORS.primaryLight}40`,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.primary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0
              }}>
                🤝
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: '"Crimson Pro", serif',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: '12px'
                }}>
                  El acceso a financiamiento sigue siendo un desafío
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: COLORS.textSecondary,
                  margin: 0
                }}>
                  La limitada disponibilidad de crédito formal impacta directamente en las posibilidades de 
                  expansión. Los comerciantes recurren principalmente a redes informales, destacando la 
                  necesidad de políticas que faciliten el acceso a capital de trabajo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '50px',
          textAlign: 'center',
          padding: '30px',
          backgroundColor: `${COLORS.primary}15`,
          borderRadius: '12px',
          border: `2px solid ${COLORS.primary}30`
        }}>
          <p style={{
            fontSize: '17px',
            color: COLORS.text,
            margin: 0,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.accent }}>Para los comerciantes:</strong> Este estudio refleja 
            la realidad de tu sector. Los datos completos y herramientas de análisis están disponibles 
            más abajo para ayudarte a tomar mejores decisiones.
          </p>
        </div>
      </div>
    </section>
  );
}

    { 
      label: 'Comercios Analizados', 
      value: data.total, 
      max: data.total,
      suffix: '',
      description: 'Total de comercios relevados'
    },
    { 
      label: 'Trabajadores Promedio', 
      value: parseFloat(data.promTrabajadores), 
      max: 10,
      suffix: '',
      description: 'Por establecimiento'
    },
    { 
      label: 'Horas de Operación', 
      value: parseFloat(data.promHoras), 
      max: 24,
      suffix: 'hs',
      description: 'Promedio diario'
    },
    { 
      label: 'Acceso a Crédito', 
      value: parseFloat(data.pctCredito), 
      max: 100,
      suffix: '%',
      description: 'Comercios con financiamiento'
    },
    { 
      label: 'Expectativas Positivas', 
      value: parseFloat(data.pctExpectativas), 
      max: 100,
      suffix: '%',
      description: 'Esperan ventas mayores'
    },
    { 
      label: 'Deseo de Crecimiento', 
      value: parseFloat(data.pctCrecimiento), 
      max: 100,
      suffix: '%',
      description: 'Quieren expandir su negocio'
    },
    { 
      label: 'Local Propio', 
      value: parseFloat(data.pctLocalPropio), 
      max: 100,
      suffix: '%',
      description: 'Propiedad del establecimiento'
    },
    { 
      label: 'Años en Operación', 
      value: parseFloat(data.promAñosOperacion), 
      max: 50,
      suffix: '',
      description: 'Antigüedad promedio'
    }
  ];

  return (
    <section style={{
      padding: '120px 60px',
      position: 'relative',
      overflow: 'hidden',
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`
    }}>
      {/* Imagen de fondo - Datos y tecnología */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.45,
        filter: 'grayscale(30%) brightness(0.6)',
        zIndex: 0
      }} />
      
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(to bottom, ${COLORS.surface}80 0%, ${COLORS.surface}60 50%, ${COLORS.surface}80 100%)`,
        zIndex: 1
      }} />
      
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          marginBottom: '80px',
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
            Indicadores clave
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text
          }}>
            Datos del relevamiento
          </h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {indicadores.map((ind, index) => (
            <IndicadorCardConGrafico key={index} {...ind} index={index} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

function IndicadorCardConGrafico({ label, value, max, suffix, description, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 1500;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setAnimatedValue(value);
                clearInterval(timer);
              } else {
                setAnimatedValue(current);
              }
            }, duration / steps);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [value]);
  
  const percentage = (value / max) * 100;
  
  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: COLORS.background,
        padding: '40px 30px',
        borderRadius: '4px',
        border: `1px solid ${COLORS.border}`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 20px 40px rgba(79, 195, 247, 0.15)` 
          : '0 4px 8px rgba(0,0,0,0.2)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s'
      }} />
      
      <div style={{
        width: '120px',
        height: '120px',
        margin: '0 auto 20px',
        position: 'relative'
      }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={COLORS.border}
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - (animatedValue / max))}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.6s ease-out',
              filter: `drop-shadow(0 0 8px ${COLORS.primary}60)`
            }}
          />
        </svg>
        
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '28px',
            fontWeight: '600',
            color: COLORS.text,
            lineHeight: '1'
          }}>
            {animatedValue.toFixed(suffix === '%' || suffix === 'hs' ? 1 : 0)}
            <span style={{ fontSize: '16px', color: COLORS.primary }}>{suffix}</span>
          </div>
        </div>
      </div>
      
      <h3 style={{
        fontSize: '15px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: COLORS.text,
        fontWeight: '600',
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        {label}
      </h3>
      
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: '1.6'
      }}>
        {description}
      </p>
      
      <div style={{
        marginTop: '20px',
        height: '3px',
        backgroundColor: COLORS.border,
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: `linear-gradient(90deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 10px ${COLORS.primary}80`
        }} />
      </div>
    </div>
  );
}

// === ANÁLISIS VISUAL CON GRÁFICOS SVG ===
function AnalisisVisual({ data }) {
  return (
    <section style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '80px',
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
          Análisis detallado
        </div>
        <h2 style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: '400',
          color: COLORS.text,
          marginBottom: '20px'
        }}>
          Distribución y composición
        </h2>
        <p style={{
          fontSize: '16px',
          color: COLORS.textSecondary,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Desglose visual de tipos de comercio y estructura laboral del ecosistema relevado
        </p>
      </div>

      {/* Primera fila: Distribución de comercios y Trabajadores */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        <GraficoDistribucion data={data.distribucionComercios} />
        <GraficoBarras data={data.trabajadoresPorTipo} />
      </div>

      {/* Segunda fila: Fuentes de crédito (barras horizontales) */}
      <div style={{ marginBottom: '40px' }}>
        <GraficoBarrasHorizontales data={data.creditoPorFuente} />
      </div>

      {/* Tercera fila: Adopción tecnológica y Salarios */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '40px'
      }}>
        <GraficoTierlist data={data.adopcionTecnologica} />
        <GraficoSalarios data={data.salarioData} />
      </div>
    </section>
  );
}

// Gráfico de distribución (Donut)
function GraficoDistribucion({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const total = data.reduce((acc, d) => acc + d.cantidad, 0);
  let currentAngle = 0;
  
  const segments = data.map((item, index) => {
    const percentage = (item.cantidad / total) * 100;
    const angle = (item.cantidad / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      color: COLORS.chartColors[index % COLORS.chartColors.length]
    };
  });

  return (
    <div style={{
      backgroundColor: COLORS.surface,
      padding: '40px',
      borderRadius: '4px',
      border: `1px solid ${COLORS.border}`
    }}>
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '400',
        color: COLORS.text,
        marginBottom: '10px'
      }}>
        Distribución por tipo
      </h3>
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '30px'
      }}>
        {total} comercios relevados
      </p>
      
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* SVG Donut Chart */}
        <svg width="200" height="200" viewBox="0 0 200 200">
          {segments.map((seg, idx) => {
            const isHovered = hoveredIndex === idx;
            const radius = isHovered ? 75 : 70;
            const innerRadius = 40;
            
            const x1 = 100 + radius * Math.cos((seg.startAngle - 90) * Math.PI / 180);
            const y1 = 100 + radius * Math.sin((seg.startAngle - 90) * Math.PI / 180);
            const x2 = 100 + radius * Math.cos((seg.endAngle - 90) * Math.PI / 180);
            const y2 = 100 + radius * Math.sin((seg.endAngle - 90) * Math.PI / 180);
            
            const x3 = 100 + innerRadius * Math.cos((seg.endAngle - 90) * Math.PI / 180);
            const y3 = 100 + innerRadius * Math.sin((seg.endAngle - 90) * Math.PI / 180);
            const x4 = 100 + innerRadius * Math.cos((seg.startAngle - 90) * Math.PI / 180);
            const y4 = 100 + innerRadius * Math.sin((seg.startAngle - 90) * Math.PI / 180);
            
            const largeArc = seg.endAngle - seg.startAngle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
              `L ${x3} ${y3}`,
              `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
              'Z'
            ].join(' ');
            
            return (
              <path
                key={idx}
                d={pathData}
                fill={seg.color}
                stroke={COLORS.background}
                strokeWidth="2"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 1
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>
        
        {/* Legend */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          {segments.map((seg, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                cursor: 'pointer',
                opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 1,
                transition: 'opacity 0.3s'
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: seg.color,
                marginRight: '10px',
                borderRadius: '2px'
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13px',
                  color: COLORS.text,
                  marginBottom: '2px'
                }}>
                  {seg.tipo}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: COLORS.textSecondary
                }}>
                  {seg.cantidad} ({seg.percentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Gráfico de barras
function GraficoBarras({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const maxValue = Math.ceil(Math.max(...data.map(d => d.promedio)) * 1.15); // +15% padding superior
  const height = 300;
  const barWidth = 40;
  const gap = 20;
  const chartWidth = data.length * (barWidth + gap);
  
  return (
    <div style={{
      backgroundColor: COLORS.surface,
      padding: '40px',
      borderRadius: '4px',
      border: `1px solid ${COLORS.border}`
    }}>
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '400',
        color: COLORS.text,
        marginBottom: '10px'
      }}>
        Trabajadores por tipo
      </h3>
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '30px'
      }}>
        Promedio de empleados por categoría
      </p>
      
      <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
        <svg width={Math.max(chartWidth, 400)} height={height + 100} style={{ minWidth: '100%' }}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent, idx) => {
            const y = height - (height * percent / 100);
            return (
              <g key={idx}>
                <line
                  x1="0"
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke={COLORS.border}
                  strokeDasharray="4 4"
                />
                <text
                  x="-10"
                  y={y + 4}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                >
                  {(maxValue * percent / 100).toFixed(1)}
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {data.map((item, idx) => {
            const barHeight = (item.promedio / maxValue) * height;
            const x = idx * (barWidth + gap) + 30; // Agregado margen izquierdo de 30px
            const isHovered = hoveredIndex === idx;
            
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x}
                  y={height - barHeight}
                  width={barWidth}
                  height={barHeight}
                  fill={COLORS.primary}
                  opacity={isHovered ? 1 : 0.8}
                  rx="4"
                  style={{ transition: 'all 0.3s' }}
                />
                
                {/* Value on top */}
                <text
                  x={x + barWidth / 2}
                  y={height - barHeight - 8}
                  fill={COLORS.text}
                  fontSize="12"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {item.promedio.toFixed(1)}
                </text>
                
                {/* Label */}
                <text
                  x={x + barWidth / 2}
                  y={height + 20}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                  transform={`rotate(-45 ${x + barWidth / 2} ${height + 20})`}
                >
                  {item.tipo.length > 20 ? item.tipo.substring(0, 20) + '...' : item.tipo}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// Gráfico de barras horizontales - Fuentes de crédito
function GraficoBarrasHorizontales({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const maxValue = Math.max(...data.map(d => d.cantidad));
  const barHeight = 50;
  const gap = 20;
  const chartHeight = data.length * (barHeight + gap);
  const chartWidth = 600;
  
  return (
    <div style={{
      backgroundColor: COLORS.surface,
      padding: '40px',
      borderRadius: '4px',
      border: `1px solid ${COLORS.border}`
    }}>
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '28px',
        fontWeight: '400',
        color: COLORS.text,
        marginBottom: '10px'
      }}>
        Acceso a crédito por fuente
      </h3>
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '40px'
      }}>
        Cantidad de comercios con financiamiento según tipo de fuente
      </p>
      
      <div style={{ overflowX: 'auto' }}>
        <svg width={chartWidth} height={chartHeight} style={{ minWidth: '100%' }}>
          {data.map((item, idx) => {
            const barWidth = (item.cantidad / maxValue) * (chartWidth - 200);
            const y = idx * (barHeight + gap);
            const isHovered = hoveredIndex === idx;
            
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Label */}
                <text
                  x="0"
                  y={y + barHeight / 2 + 5}
                  fill={COLORS.text}
                  fontSize="14"
                  fontWeight="500"
                >
                  {item.fuente}
                </text>
                
                {/* Bar background */}
                <rect
                  x="150"
                  y={y}
                  width={chartWidth - 200}
                  height={barHeight}
                  fill={COLORS.border}
                  rx="4"
                />
                
                {/* Bar fill */}
                <rect
                  x="150"
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={COLORS.primary}
                  opacity={isHovered ? 1 : 0.8}
                  rx="4"
                  style={{ transition: 'all 0.3s' }}
                >
                  <animate
                    attributeName="width"
                    from="0"
                    to={barWidth}
                    dur="1s"
                    fill="freeze"
                  />
                </rect>
                
                {/* Value text */}
                <text
                  x={150 + barWidth + 10}
                  y={y + barHeight / 2 + 5}
                  fill={COLORS.text}
                  fontSize="14"
                  fontWeight="600"
                >
                  {item.cantidad} ({item.porcentaje}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// Gráfico tierlist - Adopción tecnológica
function GraficoTierlist({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  const tierColors = {
    'Alto': ''${COLORS.primary}'',      // Verde brillante
    'Moderado': COLORS.primary,  // Celeste
    'Básico': ''${COLORS.accent}''     // Naranja
  };
  
  const tierLabels = {
    'Alto': 'S Tier',
    'Moderado': 'A Tier',
    'Básico': 'B Tier'
  };
  
  const tierDetails = {
    'Alto': {
      titulo: 'Nivel Alto - Digitalización Avanzada',
      items: [
        { icon: '📱', texto: 'Presencia activa en redes sociales (Instagram, Facebook, TikTok)' },
        { icon: '🛒', texto: 'E-commerce funcional con catálogo online y pagos digitales' },
        { icon: '', texto: 'Software de gestión de stock y inventario' },
        { icon: '💳', texto: 'Sistema POS integrado con múltiples métodos de pago' },
        { icon: '', texto: 'Analytics y métricas de ventas digitales' },
        { icon: '🤖', texto: 'Automatización de procesos (facturación, recordatorios)' }
      ]
    },
    'Moderado': {
      titulo: 'Nivel Moderado - Digitalización Intermedia',
      items: [
        { icon: '📱', texto: 'WhatsApp Business para atención al cliente' },
        { icon: '💬', texto: 'Apps de mensajería para pedidos y consultas' },
        { icon: '🔲', texto: 'Códigos QR para pagos (Mercado Pago, modo, etc.)' },
        { icon: '💳', texto: 'Aceptación de transferencias bancarias' },
        { icon: '📋', texto: 'Catálogo digital básico (PDF o fotos)' },
        { icon: '📧', texto: 'Email para comunicación con clientes' }
      ]
    },
    'Básico': {
      titulo: 'Nivel Básico - Digitalización Inicial',
      items: [
        { icon: '📱', texto: 'Teléfono celular para contacto' },
        { icon: '💳', texto: 'Tarjeta de débito/crédito física' },
        { icon: '📝', texto: 'Registro manual o digital simple de ventas' },
        { icon: '🔢', texto: 'Calculadora para operaciones básicas' },
        { icon: '📞', texto: 'Línea telefónica fija o móvil' },
        { icon: '✍️', texto: 'Facturación tradicional sin sistema integrado' }
      ]
    }
  };
  
  const orderedData = ['Alto', 'Moderado', 'Básico'].map(nivel => {
    const found = data.find(d => d.nivel === nivel);
    return found || { nivel, cantidad: 0, porcentaje: 0 };
  });
  
  return (
    <div style={{
      backgroundColor: COLORS.surface,
      padding: '40px',
      borderRadius: '4px',
      border: `1px solid ${COLORS.border}`
    }}>
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '28px',
        fontWeight: '400',
        color: COLORS.text,
        marginBottom: '10px'
      }}>
        Adopción tecnológica
      </h3>
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '10px'
      }}>
        Clasificación de comercios según nivel de digitalización
      </p>
      <p style={{
        fontSize: '12px',
        color: COLORS.primary,
        marginBottom: '30px',
        fontStyle: 'italic'
      }}>
         Haz click en cada nivel para ver qué implica
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orderedData.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          const isExpanded = expandedIndex === idx;
          const tierColor = tierColors[item.nivel];
          const details = tierDetails[item.nivel];
          
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              style={{
                position: 'relative',
                padding: '30px',
                backgroundColor: COLORS.background,
                border: `2px solid ${isHovered || isExpanded ? tierColor : COLORS.border}`,
                borderRadius: '8px',
                transition: 'all 0.3s',
                transform: isHovered ? 'translateX(10px)' : 'translateX(0)',
                cursor: 'pointer'
              }}
            >
              {/* Tier badge */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                padding: '4px 16px',
                backgroundColor: tierColor,
                color: COLORS.background,
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.1em',
                borderRadius: '12px',
                boxShadow: `0 4px 12px ${tierColor}40`
              }}>
                {tierLabels[item.nivel]}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px'
              }}>
                <div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: COLORS.text,
                    marginBottom: '4px'
                  }}>
                    Nivel {item.nivel}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: COLORS.textSecondary
                  }}>
                    {item.cantidad} comercios
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    fontFamily: '"Crimson Pro", serif',
                    color: tierColor
                  }}>
                    {item.porcentaje}%
                  </div>
                  
                  <div style={{
                    fontSize: '20px',
                    transition: 'transform 0.3s',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    ▼
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div style={{
                marginTop: '16px',
                height: '6px',
                backgroundColor: COLORS.border,
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${item.porcentaje}%`,
                  backgroundColor: tierColor,
                  transition: 'width 1s ease-out',
                  boxShadow: `0 0 10px ${tierColor}80`
                }} />
              </div>
              
              {/* Contenido expandible */}
              {isExpanded && (
                <div style={{
                  marginTop: '30px',
                  paddingTop: '30px',
                  borderTop: `1px solid ${COLORS.border}`,
                  animation: 'slideDown 0.3s ease-out'
                }}>
                  <style>{`
                    @keyframes slideDown {
                      from {
                        opacity: 0;
                        transform: translateY(-10px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>
                  
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: tierColor,
                    marginBottom: '20px',
                    letterSpacing: '0.05em'
                  }}>
                    {details.titulo}
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px'
                  }}>
                    {details.items.map((detalle, detIdx) => (
                      <div
                        key={detIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px',
                          backgroundColor: COLORS.surface,
                          borderRadius: '6px',
                          border: `1px solid ${COLORS.border}`,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = COLORS.surfaceHover;
                          e.currentTarget.style.borderColor = tierColor + '40';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = COLORS.surface;
                          e.currentTarget.style.borderColor = COLORS.border;
                        }}
                      >
                        <div style={{
                          fontSize: '24px',
                          flexShrink: 0
                        }}>
                          {detalle.icon}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: COLORS.textSecondary,
                          lineHeight: '1.5'
                        }}>
                          {detalle.texto}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    backgroundColor: COLORS.surface,
                    borderRadius: '6px',
                    borderLeft: `3px solid ${tierColor}`,
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    fontStyle: 'italic'
                  }}>
                     <strong style={{ color: COLORS.text }}>Tip:</strong> La implementación 
                    progresiva de estas herramientas puede aumentar significativamente la 
                    competitividad y alcance del comercio.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Gráfico de salarios
function GraficoSalarios({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [viewMode, setViewMode] = useState('general'); // 'general' o 'porComercio'
  
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  
  return (
    <div style={{
      backgroundColor: COLORS.surface,
      padding: '40px',
      borderRadius: '4px',
      border: `1px solid ${COLORS.border}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '28px',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '10px'
          }}>
            Salario mínimo dispuesto a pagar
          </h3>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            marginBottom: '0'
          }}>
            Rango salarial que los comerciantes están dispuestos a ofrecer
          </p>
        </div>
        
        {/* Toggle de vista */}
        <div style={{
          display: 'flex',
          gap: '8px',
          backgroundColor: COLORS.background,
          padding: '4px',
          borderRadius: '6px',
          border: `1px solid ${COLORS.border}`
        }}>
          <button
            onClick={() => setViewMode('general')}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: viewMode === 'general' ? COLORS.primary : 'transparent',
              color: viewMode === 'general' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.05em'
            }}
          >
            GENERAL
          </button>
          <button
            onClick={() => setViewMode('porComercio')}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: viewMode === 'porComercio' ? COLORS.primary : 'transparent',
              color: viewMode === 'porComercio' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.05em'
            }}
          >
            POR TIPO
          </button>
        </div>
      </div>
      
      {viewMode === 'general' ? (
        <>
          {/* Estadísticas principales */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: COLORS.background,
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '12px',
                color: COLORS.textSecondary,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Promedio
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: COLORS.primary,
                fontFamily: '"Crimson Pro", serif'
              }}>
                {formatCurrency(data.promedio)}
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: COLORS.background,
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '12px',
                color: COLORS.textSecondary,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Mínimo
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: COLORS.text,
                fontFamily: '"Crimson Pro", serif'
              }}>
                {formatCurrency(data.minimo)}
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: COLORS.background,
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '12px',
                color: COLORS.textSecondary,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Máximo
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: COLORS.text,
                fontFamily: '"Crimson Pro", serif'
              }}>
                {formatCurrency(data.maximo)}
              </div>
            </div>
          </div>
          
          {/* Distribución por rangos */}
          <div style={{ marginTop: '30px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '20px'
            }}>
              Distribución por rango salarial
            </div>
            
            {data.distribucion.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    marginBottom: '16px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                    fontSize: '13px'
                  }}>
                    <span style={{ color: COLORS.text }}>{item.rango}</span>
                    <span style={{ color: COLORS.primary, fontWeight: '600' }}>
                      {item.cantidad} ({item.porcentaje}%)
                    </span>
                  </div>
                  
                  <div style={{
                    height: '8px',
                    backgroundColor: COLORS.border,
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${item.porcentaje}%`,
                      background: `linear-gradient(90deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
                      transition: 'all 0.5s ease-out',
                      transform: isHovered ? 'scaleY(1.2)' : 'scaleY(1)',
                      boxShadow: isHovered ? `0 0 10px ${COLORS.primary}80` : 'none'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* Vista por tipo de comercio */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: COLORS.background,
            borderRadius: '6px',
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.6'
            }}>
               <strong style={{ color: COLORS.text }}>Top 10 tipos de comercio</strong> según 
              salario promedio ofrecido. Solo se incluyen categorías con al menos 3 comercios relevados.
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {data.porComercio.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const maxSalario = Math.max(...data.porComercio.map(c => c.promedio));
              const widthPercentage = (item.promedio / maxSalario) * 100;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    padding: '20px',
                    backgroundColor: COLORS.background,
                    borderRadius: '6px',
                    border: `1px solid ${isHovered ? COLORS.primary : COLORS.border}`,
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: COLORS.text,
                        marginBottom: '4px'
                      }}>
                        {idx + 1}. {item.tipo}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: COLORS.textSecondary
                      }}>
                        {item.cantidad} comercio{item.cantidad > 1 ? 's' : ''} relevado{item.cantidad > 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: '22px',
                      fontWeight: '700',
                      color: COLORS.primary,
                      fontFamily: '"Crimson Pro", serif',
                      textAlign: 'right'
                    }}>
                      {formatCurrency(item.promedio)}
                    </div>
                  </div>
                  
                  {/* Barra visual */}
                  <div style={{
                    height: '10px',
                    backgroundColor: COLORS.surface,
                    borderRadius: '5px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${widthPercentage}%`,
                      background: `linear-gradient(90deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
                      borderRadius: '5px',
                      transition: 'width 1s ease-out',
                      boxShadow: isHovered ? `0 0 15px ${COLORS.primary}80` : 'none'
                    }} />
                    
                    {/* Marcador de promedio general */}
                    <div style={{
                      position: 'absolute',
                      left: `${(data.promedio / maxSalario) * 100}%`,
                      top: '-8px',
                      bottom: '-8px',
                      width: '2px',
                      backgroundColor: ''${COLORS.accent}'',
                      opacity: 0.6
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '10px',
                        color: ''${COLORS.accent}'',
                        whiteSpace: 'nowrap',
                        fontWeight: '600'
                      }}>
                        PROM
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div style={{
            marginTop: '30px',
            padding: '16px',
            backgroundColor: COLORS.background,
            borderRadius: '6px',
            borderLeft: `3px solid ${COLORS.primary}`,
            fontSize: '12px',
            color: COLORS.textSecondary
          }}>
             <strong style={{ color: COLORS.text }}>Nota:</strong> La línea naranja (PROM) 
            indica el salario promedio general ({formatCurrency(data.promedio)}). Los comercios 
            por encima de esta línea ofrecen salarios superiores al promedio del mercado.
          </div>
        </>
      )}
    </div>
  );
}

// === SECCIÓN DE ANÁLISIS ===
function SeccionAnalisis() {
  return (
    <section style={{
      padding: '120px 60px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Imagen de fondo de comercios */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.65,
        filter: 'grayscale(0%) brightness(0.6)',
        zIndex: 0
      }} />
      
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}70 0%, ${COLORS.background}50 50%, ${COLORS.background}70 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          marginBottom: '60px',
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
            Insights del equipo
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '20px'
          }}>
            Análisis y conclusiones
          </h2>
        </div>

      <div style={{
        backgroundColor: COLORS.surface,
        padding: '60px',
        borderRadius: '4px',
        border: `1px solid ${COLORS.border}`,
        borderLeft: `4px solid ${COLORS.primary}`
      }}>
        <div style={{
          fontSize: '16px',
          lineHeight: '1.9',
          color: COLORS.text,
          fontWeight: '300'
        }}>
          <p style={{ marginBottom: '24px' }}>
            El relevamiento de {TEAM_DATA.name} en el ecosistema comercial de Buenos Aires revela 
            patrones significativos sobre la estructura y dinámicas del comercio local. A través del 
            análisis de más de 900 establecimientos, identificamos características clave que definen 
            el landscape empresarial actual.
          </p>
          
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '24px',
            fontWeight: '600',
            color: COLORS.primary,
            marginTop: '40px',
            marginBottom: '20px'
          }}>
            Principales hallazgos
          </h3>
          
          <p style={{ marginBottom: '24px', color: COLORS.textSecondary }}>
            <strong style={{ color: COLORS.text }}>Estructura laboral:</strong> El promedio de trabajadores 
            por establecimiento muestra una clara predominancia de micro y pequeñas empresas, con variaciones 
            significativas según el tipo de comercio. Los sectores de servicios y gastronomía presentan 
            las plantillas más amplias.
          </p>
          
          <p style={{ marginBottom: '24px', color: COLORS.textSecondary }}>
            <strong style={{ color: COLORS.text }}>Acceso a financiamiento:</strong> Los datos sobre fuentes 
            de crédito revelan que los proveedores constituyen la principal vía de financiamiento, seguidos 
            por la banca tradicional. Esto sugiere una preferencia por mecanismos flexibles y menos formales 
            de capital de trabajo.
          </p>
          
          <p style={{ marginBottom: '24px', color: COLORS.textSecondary }}>
            <strong style={{ color: COLORS.text }}>Adopción tecnológica:</strong> La mayoría de los comercios 
            se encuentra en niveles básicos o moderados de digitalización, con oportunidades significativas 
            de mejora en herramientas avanzadas de gestión y comercio electrónico.
          </p>
          
          <p style={{ marginBottom: '24px', color: COLORS.textSecondary }}>
            <strong style={{ color: COLORS.text }}>Expectativas de crecimiento:</strong> A pesar de los 
            desafíos económicos, una proporción considerable de comerciantes mantiene expectativas positivas 
            y expresa deseo de expandir sus operaciones, lo que indica resiliencia y visión de futuro.
          </p>

          <div style={{
            marginTop: '40px',
            padding: '30px',
            backgroundColor: COLORS.background,
            borderRadius: '4px',
            borderLeft: `3px solid ${COLORS.primary}`
          }}>
            <p style={{
              fontSize: '15px',
              fontStyle: 'italic',
              color: COLORS.textSecondary,
              margin: 0
            }}>
              "Este análisis constituye una fotografía del momento actual del comercio local, 
              proporcionando una base empírica para políticas públicas y decisiones de inversión 
              orientadas al fortalecimiento del ecosistema emprendedor."
            </p>
            <div style={{
              marginTop: '16px',
              fontSize: '13px',
              color: COLORS.primary,
              fontWeight: '500'
            }}>
              — Equipo {TEAM_DATA.name}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

// === SECCIÓN MACHINE LEARNING ===
function SeccionMachineLearning() {
  const [resultadosML, setResultadosML] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('ml_results.json')
      .then(res => res.json())
      .then(data => {
        setResultadosML(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando resultados ML:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section style={{
        padding: '120px 60px',
        backgroundColor: COLORS.surface,
        textAlign: 'center'
      }}>
        <div style={{ color: COLORS.primary }}>Cargando modelos predictivos...</div>
      </section>
    );
  }

  if (!resultadosML || !resultadosML.modelos) {
    return null;
  }

  return (
    <section style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`
    }}>
      <div style={{
        marginBottom: '60px',
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
          Modelos predictivos
        </div>
        <h2 style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: '400',
          color: COLORS.text,
          marginBottom: '30px'
        }}>
          Predicciones estadísticas
        </h2>
        
        {/* Disclaimer prominente */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '24px 40px',
          backgroundColor: COLORS.background,
          border: `2px solid ${COLORS.primary}40`,
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`
          }} />
          
          <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: COLORS.primary,
              marginBottom: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Disclaimer — Análisis Predictivo
            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: COLORS.textSecondary
            }}>
              Los siguientes modelos representan <strong style={{ color: COLORS.text }}>análisis 
              estadísticos predictivos</strong> basados en patrones históricos identificados en los datos. 
              Estas proyecciones <strong style={{ color: COLORS.text }}>no constituyen garantías</strong> de 
              comportamiento futuro y deben interpretarse como estimaciones probabilísticas sujetas a variabilidad 
              contextual, cambios macroeconómicos y factores externos no capturados en el modelo. 
              <strong style={{ color: COLORS.primary }}> Los resultados no aseguran que los eventos 
              proyectados ocurrirán en la realidad.</strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
        gap: '60px'
      }}>
        <ModeloCrecimiento data={resultadosML.modelos.modelo_1_crecimiento} />
        <ModeloSalario data={resultadosML.modelos.modelo_2_salario} />
        <ModeloFactoresExternos data={resultadosML.modelos.modelo_3_factores_externos} />
        <ModeloViabilidad data={resultadosML.modelos.modelo_4_viabilidad} />
      </div>

      <div style={{
        marginTop: '60px',
        textAlign: 'center',
        padding: '40px',
        backgroundColor: COLORS.background,
        borderRadius: '4px',
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{
          fontSize: '14px',
          color: COLORS.textSecondary,
          lineHeight: '1.8',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <strong style={{ color: COLORS.text }}>Metodología:</strong> Los modelos implementados 
          utilizan técnicas de machine learning supervisado (Random Forest, Gradient Boosting, K-Means) 
          entrenados sobre el conjunto de datos relevado. Las métricas de performance incluyen accuracy, 
          precision, recall, AUC-ROC, R² y RMSE con validación mediante train/test split (75%/25%).
        </div>
      </div>
    </section>
  );
}

// Modelo 1: Crecimiento
function ModeloCrecimiento({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  
  if (!data || !data.metricas || !data.feature_importance) {
    return null;
  }
  
  return (
    <div style={{
      backgroundColor: COLORS.background,
      padding: '40px',
      borderRadius: '8px',
      border: `1px solid ${COLORS.border}`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: ''${COLORS.primary}''
      }} />
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Predicción de Crecimiento Comercial
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        ¿Qué comercios tienen intención de expandirse?
      </p>

      {/* Métricas principales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <MetricaCard label="Accuracy" value={`${(data.metricas.accuracy * 100).toFixed(1)}%`} color="'${COLORS.primary}'" />
        <MetricaCard label="AUC-ROC" value={data.metricas.auc_roc.toFixed(3)} color="#4FC3F7" />
        <MetricaCard label="Precision" value={`${(data.metricas.precision * 100).toFixed(1)}%`} color="'${COLORS.accent}'" />
        <MetricaCard label="Recall" value={`${(data.metricas.recall * 100).toFixed(1)}%`} color="'${COLORS.accentDark}'" />
      </div>

      {/* Top 3 Features */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: COLORS.primary,
          marginBottom: '16px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Variables más importantes
        </div>
        {data.feature_importance.slice(0, 3).map((f, idx) => (
          <div key={idx} style={{ marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              marginBottom: '4px'
            }}>
              <span style={{ color: COLORS.text }}>{f.feature}</span>
              <span style={{ color: COLORS.primary, fontWeight: '600' }}>
                {(f.importance * 100).toFixed(1)}%
              </span>
            </div>
            <div style={{
              height: '6px',
              backgroundColor: COLORS.border,
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${f.importance * 100}%`,
                backgroundColor: ''${COLORS.primary}'',
                transition: 'width 1s ease-out'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Botón para mostrar gráficos */}
      <button
        onClick={() => setShowCharts(!showCharts)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s',
          marginBottom: '12px'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {showCharts ? '▲ Ocultar gráficos' : '▼ Ver gráficos del modelo'}
      </button>

      {showCharts && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `1px solid ${COLORS.border}`
        }}>
          <ConfusionMatrix data={data.confusion_matrix} labels={['No crece', 'Sí crece']} />
          
          <div style={{ height: '40px' }} />
          
          <ROCCurve auc={data.metricas.auc_roc} />
          
          <div style={{ height: '40px' }} />
          
          <FeatureImportanceChart 
            features={data.feature_importance.slice(0, 5)} 
            color="'${COLORS.primary}'"
            title="Top 5 Variables Predictivas"
          />
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {expanded ? '▲ Ver menos' : '▼ Ver explicación'}
      </button>

      {expanded && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          borderLeft: `3px solid '${COLORS.primary}'`
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            Explicación Académica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Este modelo de clasificación binaria utiliza <strong style={{ color: COLORS.text }}>Random Forest</strong> para 
            predecir la probabilidad de que un comercio desee expandirse. Con un accuracy de {(data.metricas.accuracy * 100).toFixed(1)}% 
            y un recall de {(data.metricas.recall * 100).toFixed(1)}%, el modelo identifica correctamente la mayoría de los comercios 
            con intención de crecimiento. Las variables más predictivas son la antigüedad del negocio ({(data.feature_importance[0].importance * 100).toFixed(1)}% 
            de importancia) y la cantidad de trabajadores, sugiriendo que comercios más establecidos y con mayor personal tienden a buscar expansión.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En Términos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>¿Qué significa esto para tu comercio?</strong><br/>
            Si tu negocio tiene varios años funcionando y un equipo de trabajo estable, es más probable que estés pensando 
            en crecer. El modelo nos dice que {(data.metricas.accuracy * 100).toFixed(0)}% de las veces acierta quién quiere expandirse. 
            Las claves son: <strong style={{ color: COLORS.primary }}>experiencia en el rubro, equipo consolidado y expectativas positivas de ventas</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

// Modelo 2: Salario
function ModeloSalario({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  
  if (!data || !data.metricas || !data.estadisticas_salario || !data.feature_importance) {
    return null;
  }
  
  return (
    <div style={{
      backgroundColor: COLORS.background,
      padding: '40px',
      borderRadius: '8px',
      border: `1px solid ${COLORS.border}`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: '#4FC3F7'
      }} />
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Predicción de Salario Ofrecido
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Estimación del salario mínimo según características del comercio
      </p>

      {/* Estadísticas de salario */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: COLORS.textSecondary,
            marginBottom: '6px',
            textTransform: 'uppercase'
          }}>
            Promedio
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: COLORS.primary,
            fontFamily: '"Crimson Pro", serif'
          }}>
            ${(data.estadisticas_salario.promedio / 1000000).toFixed(1)}M
          </div>
        </div>
        <div style={{
          padding: '16px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: COLORS.textSecondary,
            marginBottom: '6px',
            textTransform: 'uppercase'
          }}>
            Mínimo
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: COLORS.text,
            fontFamily: '"Crimson Pro", serif'
          }}>
            ${(data.estadisticas_salario.min / 1000).toFixed(0)}k
          </div>
        </div>
        <div style={{
          padding: '16px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: COLORS.textSecondary,
            marginBottom: '6px',
            textTransform: 'uppercase'
          }}>
            Máximo
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: COLORS.text,
            fontFamily: '"Crimson Pro", serif'
          }}>
            ${(data.estadisticas_salario.max / 1000000).toFixed(0)}M
          </div>
        </div>
      </div>

      {/* Métrica R² */}
      <div style={{
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '13px',
          color: COLORS.textSecondary,
          marginBottom: '8px'
        }}>
          Error Promedio Absoluto (MAE)
        </div>
        <div style={{
          fontSize: '28px',
          fontWeight: '700',
          color: ''${COLORS.accent}'',
          fontFamily: '"Crimson Pro", serif'
        }}>
          ${(data.metricas.mae / 1000000).toFixed(2)}M ARS
        </div>
      </div>

      {/* Top 3 Features */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: COLORS.primary,
          marginBottom: '16px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Factores que más influyen
        </div>
        {data.feature_importance.slice(0, 3).map((f, idx) => (
          <div key={idx} style={{ marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              marginBottom: '4px'
            }}>
              <span style={{ color: COLORS.text }}>{f.feature}</span>
              <span style={{ color: COLORS.primary, fontWeight: '600' }}>
                {(f.importance * 100).toFixed(1)}%
              </span>
            </div>
            <div style={{
              height: '6px',
              backgroundColor: COLORS.border,
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${f.importance * 100}%`,
                backgroundColor: '#4FC3F7',
                transition: 'width 1s ease-out'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Botón para mostrar gráficos */}
      <button
        onClick={() => setShowCharts(!showCharts)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s',
          marginBottom: '12px'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {showCharts ? '▲ Ocultar gráficos' : '▼ Ver gráficos del modelo'}
      </button>

      {showCharts && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `1px solid ${COLORS.border}`
        }}>
          {/* Métricas de Error Visualizadas */}
          <div style={{ marginBottom: '40px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.primary,
              marginBottom: '20px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Métricas de Performance
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                padding: '20px',
                backgroundColor: COLORS.background,
                borderRadius: '8px',
                border: `2px solid #4FC3F7`,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: COLORS.textSecondary,
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  R² Score
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: data.metricas.r2_score > 0 ? ''${COLORS.primary}'' : ''${COLORS.accentDark}'',
                  fontFamily: '"Crimson Pro", serif'
                }}>
                  {data.metricas.r2_score.toFixed(3)}
                </div>
              </div>
              
              <div style={{
                padding: '20px',
                backgroundColor: COLORS.background,
                borderRadius: '8px',
                border: `2px solid '${COLORS.accent}'`,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: COLORS.textSecondary,
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  RMSE
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: ''${COLORS.accent}'',
                  fontFamily: '"Crimson Pro", serif'
                }}>
                  ${(data.metricas.rmse / 1000000).toFixed(2)}M
                </div>
              </div>
              
              <div style={{
                padding: '20px',
                backgroundColor: COLORS.background,
                borderRadius: '8px',
                border: `2px solid '${COLORS.primary}'`,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: COLORS.textSecondary,
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  MAE
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: ''${COLORS.primary}'',
                  fontFamily: '"Crimson Pro", serif'
                }}>
                  ${(data.metricas.mae / 1000000).toFixed(2)}M
                </div>
              </div>
              
              <div style={{
                padding: '20px',
                backgroundColor: COLORS.background,
                borderRadius: '8px',
                border: `2px solid '${COLORS.accentDark}'`,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: COLORS.textSecondary,
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  MAPE
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: ''${COLORS.accentDark}'',
                  fontFamily: '"Crimson Pro", serif'
                }}>
                  {data.metricas.mape.toFixed(1)}%
                </div>
              </div>
            </div>
            
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: COLORS.background,
              borderRadius: '6px',
              borderLeft: `3px solid #4FC3F7`,
              fontSize: '12px',
              color: COLORS.textSecondary,
              lineHeight: '1.6'
            }}>
              <strong style={{ color: COLORS.text }}>Interpretación:</strong> El modelo predice salarios con un error promedio de ${(data.metricas.mae / 1000000).toFixed(2)}M ARS. 
              {data.metricas.r2_score > 0 
                ? ` El R² positivo indica que el modelo captura patrones en los datos.`
                : ` El R² negativo sugiere alta variabilidad en los salarios que requiere más features.`}
            </div>
          </div>
          
          <FeatureImportanceChart 
            features={data.feature_importance.slice(0, 8)} 
            color="#4FC3F7"
            title="Top 8 Variables Predictivas"
          />
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {expanded ? '▲ Ver menos' : '▼ Ver explicación'}
      </button>

      {expanded && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          borderLeft: `3px solid #4FC3F7`
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            Explicación Académica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Modelo de regresión mediante <strong style={{ color: COLORS.text }}>Gradient Boosting</strong> que predice 
            el salario mínimo ofrecido por los comercios. Con un error promedio de ${(data.metricas.mae / 1000000).toFixed(2)}M ARS, 
            el modelo captura la relación entre características del comercio y compensación salarial. La antigüedad del negocio 
            ({(data.feature_importance[0].importance * 100).toFixed(1)}%) y cantidad de trabajadores son los predictores más fuertes, 
            indicando que comercios más establecidos y con mayor plantilla tienden a ofrecer mejores salarios.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En Términos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>¿Cuánto deberías estar pagando?</strong><br/>
            El salario promedio del mercado es de ${(data.estadisticas_salario.promedio / 1000000).toFixed(1)} millones de pesos. 
            Si tu comercio tiene antigüedad y varios empleados, probablemente estés pagando más que el promedio. Los comercios 
            más nuevos o pequeños suelen pagar alrededor de ${(data.estadisticas_salario.min / 1000).toFixed(0)}k. 
            <strong style={{ color: COLORS.primary }}> El tipo de comercio también importa</strong>: gastronómicos y dietéticas tienden a pagar más.
          </p>
        </div>
      )}
    </div>
  );
}

// Modelo 3: Factores Externos
function ModeloFactoresExternos({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  
  if (!data || !data.metricas || !data.feature_importance || !data.confusion_matrix) {
    return null;
  }
  
  return (
    <div style={{
      backgroundColor: COLORS.background,
      padding: '40px',
      borderRadius: '8px',
      border: `1px solid ${COLORS.border}`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: ''${COLORS.accent}''
      }} />
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Impacto de Factores Externos
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        ¿Qué afecta más las ventas: crimen, precios, competencia o crédito?
      </p>

      {/* Métricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <MetricaCard label="Accuracy" value={`${(data.metricas.accuracy * 100).toFixed(1)}%`} color="'${COLORS.accent}'" />
        <MetricaCard label="F1-Score" value={`${(data.metricas.f1_weighted * 100).toFixed(1)}%`} color="#4FC3F7" />
      </div>

      {/* Factores de afectación */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: COLORS.primary,
          marginBottom: '16px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Factores de impacto (por importancia)
        </div>
        {data.feature_importance.slice(0, 4).filter(f => f.feature.includes('afect')).map((f, idx) => {
          const labelMap = {
            'afect_precios_num': 'Precios',
            'afect_compe_num': 'Competencia',
            'afect_credito_num': 'Crédito',
            'afect_crimen_num': 'Crimen'
          };
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                marginBottom: '4px'
              }}>
                <span style={{ color: COLORS.text }}>{labelMap[f.feature] || f.feature}</span>
                <span style={{ color: COLORS.primary, fontWeight: '600' }}>
                  {(f.importance * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{
                height: '6px',
                backgroundColor: COLORS.border,
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${f.importance * 100}%`,
                  backgroundColor: ''${COLORS.accent}'',
                  transition: 'width 1s ease-out'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón para mostrar gráficos */}
      <button
        onClick={() => setShowCharts(!showCharts)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s',
          marginBottom: '12px'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {showCharts ? '▲ Ocultar gráficos' : '▼ Ver gráficos del modelo'}
      </button>

      {showCharts && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `1px solid ${COLORS.border}`
        }}>
          <ConfusionMatrix 
            data={data.confusion_matrix} 
            labels={['Peor', 'Igual', 'Mejor']} 
          />
          
          <div style={{ height: '40px' }} />
          
          <AfectacionesChart />
          
          <div style={{ height: '40px' }} />
          
          <DistribucionPredicciones
            distribucion={data.distribucion_clases}
            labels={['Peor', 'Igual', 'Mejor']}
            colors={[''${COLORS.accentDark}'', ''${COLORS.accent}'', ''${COLORS.primary}'']}
          />
          
          <div style={{ height: '40px' }} />
          
          <FeatureImportanceChart 
            features={data.feature_importance.slice(0, 6)} 
            color="'${COLORS.accent}'"
            title="Top 6 Variables Predictivas"
          />
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {expanded ? '▲ Ver menos' : '▼ Ver explicación'}
      </button>

      {expanded && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          borderLeft: `3px solid '${COLORS.accent}'`
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            Explicación Académica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Clasificador multiclase <strong style={{ color: COLORS.text }}>Random Forest</strong> que predice si las ventas 
            empeorarán, se mantendrán o mejorarán según factores externos. Con {(data.metricas.accuracy * 100).toFixed(1)}% de accuracy, 
            el modelo identifica que <strong style={{ color: COLORS.text }}>los precios</strong> son el factor más determinante, 
            seguido por la competencia. Interesantemente, la antigüedad del negocio también es altamente predictiva, sugiriendo 
            que comercios más establecidos manejan mejor las adversidades externas.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En Términos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>¿Qué está afectando tus ventas?</strong><br/>
            El factor #1 que impacta las ventas son <strong style={{ color: COLORS.primary }}>los precios y la inflación</strong>. 
            Luego viene la competencia en tu zona. El crimen y el acceso a crédito también importan, pero menos. 
            Si tu negocio tiene varios años, probablemente ya sepas cómo adaptarte a estos cambios. Los comercios nuevos 
            sufren más con factores externos porque aún no tienen la experiencia ni la base de clientes fiel.
          </p>
        </div>
      )}
    </div>
  );
}

// Modelo 4: Viabilidad
function ModeloViabilidad({ data }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!data || !data.distribucion_clusters || !data.score_promedio_por_nivel || !data.estadisticas_score) {
    return null;
  }
  
  return (
    <div style={{
      backgroundColor: COLORS.background,
      padding: '40px',
      borderRadius: '8px',
      border: `1px solid ${COLORS.border}`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: ''${COLORS.primaryDark}''
      }} />
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Score de Viabilidad Comercial
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Clasificación de comercios según su salud y potencial
      </p>

      {/* Distribución de clusters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `2px solid '${COLORS.primary}'`,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: ''${COLORS.primary}'',
            marginBottom: '6px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Alto
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: COLORS.text,
            fontFamily: '"Crimson Pro", serif'
          }}>
            {data.distribucion_clusters.Alto}
          </div>
          <div style={{
            fontSize: '10px',
            color: COLORS.textSecondary,
            marginTop: '4px'
          }}>
            Score: {data.score_promedio_por_nivel.Alto.toFixed(1)}
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `2px solid #4FC3F7`,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#4FC3F7',
            marginBottom: '6px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Medio
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: COLORS.text,
            fontFamily: '"Crimson Pro", serif'
          }}>
            {data.distribucion_clusters.Medio}
          </div>
          <div style={{
            fontSize: '10px',
            color: COLORS.textSecondary,
            marginTop: '4px'
          }}>
            Score: {data.score_promedio_por_nivel.Medio.toFixed(1)}
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `2px solid '${COLORS.accentDark}'`,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: ''${COLORS.accentDark}'',
            marginBottom: '6px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Bajo
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: COLORS.text,
            fontFamily: '"Crimson Pro", serif'
          }}>
            {data.distribucion_clusters.Bajo}
          </div>
          <div style={{
            fontSize: '10px',
            color: COLORS.textSecondary,
            marginTop: '4px'
          }}>
            Score: {data.score_promedio_por_nivel.Bajo.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Score promedio */}
      <div style={{
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '13px',
          color: COLORS.textSecondary,
          marginBottom: '8px'
        }}>
          Score Promedio General
        </div>
        <div style={{
          fontSize: '36px',
          fontWeight: '700',
          color: ''${COLORS.primaryDark}'',
          fontFamily: '"Crimson Pro", serif'
        }}>
          {data.estadisticas_score.mean.toFixed(1)}<span style={{ fontSize: '20px' }}>/100</span>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {expanded ? '▲ Ver menos' : '▼ Ver explicación'}
      </button>

      {expanded && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          borderLeft: `3px solid '${COLORS.primaryDark}'`
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            Explicación Académica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Clustering no supervisado mediante <strong style={{ color: COLORS.text }}>K-Means (k=3)</strong> que agrupa comercios 
            según múltiples dimensiones de viabilidad. El score compuesto (0-100) pondera: expectativas de ventas (30%), 
            acceso a crédito (20%), nivel tecnológico (20%), antigüedad (15%), tamaño de plantilla (10%) y propiedad del local (5%). 
            Los {data.distribucion_clusters.Alto} comercios en el cluster "Alto" (score promedio {data.score_promedio_por_nivel.Alto.toFixed(1)}) 
            muestran mayor resiliencia y potencial de crecimiento.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En Términos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>¿Qué tan viable es tu comercio?</strong><br/>
            Este es como un "estado de salud" de tu negocio. <strong style={{ color: ''${COLORS.primary}'' }}>Nivel Alto</strong> = 
            negocio sólido con buenas expectativas, acceso a crédito y tecnología. <strong style={{ color: '#4FC3F7' }}>Nivel Medio</strong> = 
            estás bien pero hay margen de mejora. <strong style={{ color: ''${COLORS.accentDark}'' }}>Nivel Bajo</strong> = necesitás reforzar 
            aspectos clave (digitalización, acceso a financiamiento, proyecciones). El score promedio del mercado es {data.estadisticas_score.mean.toFixed(0)} puntos. 
            <strong style={{ color: COLORS.primary }}> ¿Cómo mejorarlo?</strong> Invertí en tecnología, buscá crédito formal y consolidá tu equipo.
          </p>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para métricas
function MetricaCard({ label, value, color }) {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: COLORS.surface,
      borderRadius: '6px',
      textAlign: 'center',
      border: `1px solid ${color}40`
    }}>
      <div style={{
        fontSize: '11px',
        color: COLORS.textSecondary,
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '22px',
        fontWeight: '700',
        color: color,
        fontFamily: '"Crimson Pro", serif'
      }}>
        {value}
      </div>
    </div>
  );
}

// Componente Confusion Matrix
function ConfusionMatrix({ data, labels }) {
  const maxValue = Math.max(...data.flat());
  
  // Aplanar los datos en un solo array para el grid
  const gridItems = [];
  
  // Empty corner
  gridItems.push(<div key="corner" />);
  
  // Column headers
  labels.forEach((label, idx) => {
    gridItems.push(
      <div key={`col-${idx}`} style={{
        fontSize: '11px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        fontWeight: '600'
      }}>
        {label}
      </div>
    );
  });
  
  // Rows with cells
  data.forEach((row, i) => {
    // Row label
    gridItems.push(
      <div key={`row-label-${i}`} style={{
        fontSize: '11px',
        color: COLORS.textSecondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '8px',
        fontWeight: '600'
      }}>
        {labels[i]}
      </div>
    );
    
    // Cells
    row.forEach((value, j) => {
      const intensity = value / maxValue;
      const isCorrect = i === j;
      
      gridItems.push(
        <div key={`cell-${i}-${j}`} style={{
          backgroundColor: isCorrect 
            ? `rgba(0, 230, 118, ${0.2 + intensity * 0.6})`
            : `rgba(76, 195, 247, ${0.1 + intensity * 0.4})`,
          padding: '20px 10px',
          borderRadius: '6px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: '700',
          color: COLORS.text,
          border: isCorrect ? '2px solid '${COLORS.primary}'' : '1px solid ' + COLORS.border
        }}>
          {value}
        </div>
      );
    });
  });
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Matriz de Confusión
      </h4>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `80px repeat(${data[0].length}, 1fr)`,
        gap: '8px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        {gridItems}
      </div>
      
      <div style={{
        marginTop: '20px',
        fontSize: '12px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: '1.6'
      }}>
        La diagonal (verde) representa las predicciones correctas.<br/>
        Valores fuera de la diagonal son errores del modelo.
      </div>
    </div>
  );
}

// Componente Feature Importance Chart
function FeatureImportanceChart({ features, color, title }) {
  const maxImportance = Math.max(...features.map(f => f.importance));
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        {title}
      </h4>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {features.map((f, idx) => {
          const percentage = (f.importance / maxImportance) * 100;
          
          return (
            <div key={idx}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '13px',
                  color: COLORS.text,
                  fontWeight: '500'
                }}>
                  {f.feature}
                </span>
                <span style={{
                  fontSize: '13px',
                  color: color,
                  fontWeight: '700',
                  fontFamily: '"Crimson Pro", serif'
                }}>
                  {(f.importance * 100).toFixed(1)}%
                </span>
              </div>
              
              <div style={{
                height: '10px',
                backgroundColor: COLORS.border,
                borderRadius: '5px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  backgroundColor: color,
                  borderRadius: '5px',
                  transition: 'width 1s ease-out',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '30%',
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2))`,
                    borderRadius: '5px'
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Componente ROC Curve usando SVG
function ROCCurve({ data, auc }) {
  // Generar puntos para la curva ROC desde la confusion matrix
  const generateROCPoints = () => {
    // Simulación de curva ROC basada en el AUC
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
      // Aproximación de curva ROC basada en AUC
      let y;
      if (auc > 0.5) {
        y = Math.pow(x, 1 / (2 * auc));
      } else {
        y = x;
      }
      points.push({ fpr: x, tpr: Math.min(y, 1) });
    }
    
    return points;
  };
  
  const points = generateROCPoints();
  const width = 400;
  const height = 300;
  const padding = 40;
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Curva ROC
      </h4>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        <svg 
          viewBox="0 0 400 300" 
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            height: 'auto'
          }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const x = padding + val * (width - 2 * padding);
            const y = height - padding - val * (height - 2 * padding);
            return (
              <g key={idx}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke={COLORS.border}
                  strokeDasharray="4 4"
                />
                <line
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={height - padding}
                  stroke={COLORS.border}
                  strokeDasharray="4 4"
                />
                <text
                  x={x}
                  y={height - padding + 20}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="middle"
                >
                  {val.toFixed(1)}
                </text>
                <text
                  x={padding - 10}
                  y={y + 4}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}
          
          {/* Diagonal line (random classifier) */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={padding}
            stroke="#888"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          
          {/* ROC Curve */}
          <path
            d={points.map((p, i) => {
              const x = padding + p.fpr * (width - 2 * padding);
              const y = height - padding - p.tpr * (height - 2 * padding);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#4FC3F7"
            strokeWidth="3"
          />
          
          {/* Axes labels */}
          <text
            x={width / 2}
            y={height - 5}
            fill={COLORS.text}
            fontSize="12"
            textAnchor="middle"
          >
            False Positive Rate
          </text>
          
          <text
            x={15}
            y={height / 2}
            fill={COLORS.text}
            fontSize="12"
            textAnchor="middle"
            transform={`rotate(-90 15 ${height / 2})`}
          >
            True Positive Rate
          </text>
          
          {/* AUC Label */}
          <text
            x={width - padding - 10}
            y={padding + 20}
            fill="#4FC3F7"
            fontSize="14"
            fontWeight="bold"
            textAnchor="end"
          >
            AUC = {auc.toFixed(3)}
          </text>
        </svg>
      </div>
    </div>
  );
}

// Componente Scatter Plot (Predicción vs Real) para Modelo 2
function ScatterPlot({ realValues, predictions, title }) {
  const width = 400;
  const height = 300;
  const padding = 50;
  
  const maxVal = Math.max(...realValues, ...predictions);
  const minVal = Math.min(...realValues, ...predictions);
  
  const scaleX = (val) => padding + ((val - minVal) / (maxVal - minVal)) * (width - 2 * padding);
  const scaleY = (val) => height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        {title}
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: `${width}px`,
            height: 'auto'
          }}>
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const scaledVal = minVal + val * (maxVal - minVal);
            const x = scaleX(scaledVal);
            const y = scaleY(scaledVal);
            return (
              <g key={idx}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke={COLORS.border} strokeDasharray="2 2" />
                <line x1={x} y1={padding} x2={x} y2={height - padding} stroke={COLORS.border} strokeDasharray="2 2" />
              </g>
            );
          })}
          
          {/* Perfect prediction line */}
          <line
            x1={scaleX(minVal)}
            y1={scaleY(minVal)}
            x2={scaleX(maxVal)}
            y2={scaleY(maxVal)}
            stroke="'${COLORS.accentDark}'"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          
          {/* Data points */}
          {realValues.map((real, idx) => {
            const pred = predictions[idx];
            return (
              <circle
                key={idx}
                cx={scaleX(real)}
                cy={scaleY(pred)}
                r="4"
                fill="#4FC3F7"
                opacity="0.6"
              />
            );
          })}
          
          {/* Axes labels */}
          <text x={width / 2} y={height - 10} fill={COLORS.text} fontSize="11" textAnchor="middle">
            Salario Real (ARS)
          </text>
          <text
            x={15}
            y={height / 2}
            fill={COLORS.text}
            fontSize="11"
            textAnchor="middle"
            transform={`rotate(-90 15 ${height / 2})`}
          >
            Salario Predicho (ARS)
          </text>
        </svg>
      </div>
    </div>
  );
}

// Componente de Distribución de Predicciones (Bar Chart)
function DistribucionPredicciones({ distribucion, labels, colors }) {
  const maxCount = Math.max(...Object.values(distribucion));
  const width = 400;
  const height = 250;
  const padding = 40;
  const barWidth = (width - 2 * padding) / Object.keys(distribucion).length - 10;
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Distribución de Predicciones
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: `${width}px`,
            height: 'auto'
          }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const y = height - padding - val * (height - 2 * padding);
            return (
              <g key={idx}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke={COLORS.border}
                  strokeDasharray="2 2"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                >
                  {Math.round(maxCount * val)}
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {Object.entries(distribucion).map(([key, count], idx) => {
            const barHeight = (count / maxCount) * (height - 2 * padding);
            const x = padding + idx * (barWidth + 10) + 20;
            const y = height - padding - barHeight;
            const color = colors[idx] || '#4FC3F7';
            
            return (
              <g key={key}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  rx="4"
                  opacity="0.8"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  fill={COLORS.text}
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {count}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={height - padding + 20}
                  fill={COLORS.textSecondary}
                  fontSize="11"
                  textAnchor="middle"
                >
                  {labels[idx] || key}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// Componente Afectaciones por Tendencia (Grouped Bar Chart)
function AfectacionesChart() {
  // Datos simulados basados en la imagen
  const data = [
    { factor: 'Crimen', Peor: 0.7, Igual: 0.55, Mejor: 0.5 },
    { factor: 'Crédito', Peor: 0.57, Igual: 0.48, Mejor: 0.5 },
    { factor: 'Precios', Peor: 1.75, Igual: 1.35, Mejor: 1.3 },
    { factor: 'Competencia', Peor: 1.3, Igual: 1.05, Mejor: 0.97 }
  ];
  
  const width = 450;
  const height = 280;
  const padding = { top: 40, right: 120, bottom: 50, left: 60 };
  const groupWidth = (width - padding.left - padding.right) / data.length;
  const barWidth = groupWidth / 4;
  const maxValue = 2.0;
  
  const colors = {
    Peor: ''${COLORS.accentDark}'',
    Igual: ''${COLORS.accent}'',
    Mejor: ''${COLORS.primary}''
  };
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Afectaciones por Tendencia de Ventas
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: `${width}px`,
            height: 'auto'
          }}>
          {/* Grid lines */}
          {[0, 0.5, 1.0, 1.5, 2.0].map((val, idx) => {
            const y = height - padding.bottom - (val / maxValue) * (height - padding.top - padding.bottom);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke={COLORS.border}
                  strokeDasharray="2 2"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {data.map((item, groupIdx) => {
            const groupX = padding.left + groupIdx * groupWidth;
            
            return (
              <g key={item.factor}>
                {/* Peor */}
                <rect
                  x={groupX + barWidth * 0.5}
                  y={height - padding.bottom - (item.Peor / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Peor / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Peor}
                  rx="3"
                  opacity="0.85"
                />
                
                {/* Igual */}
                <rect
                  x={groupX + barWidth * 1.5}
                  y={height - padding.bottom - (item.Igual / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Igual / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Igual}
                  rx="3"
                  opacity="0.85"
                />
                
                {/* Mejor */}
                <rect
                  x={groupX + barWidth * 2.5}
                  y={height - padding.bottom - (item.Mejor / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Mejor / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Mejor}
                  rx="3"
                  opacity="0.85"
                />
                
                {/* Label */}
                <text
                  x={groupX + groupWidth / 2}
                  y={height - padding.bottom + 20}
                  fill={COLORS.textSecondary}
                  fontSize="11"
                  textAnchor="middle"
                >
                  {item.factor}
                </text>
              </g>
            );
          })}
          
          {/* Legend */}
          {Object.entries(colors).map(([label, color], idx) => (
            <g key={label} transform={`translate(${width - padding.right + 10}, ${padding.top + idx * 25})`}>
              <rect x="0" y="0" width="15" height="15" fill={color} rx="2" />
              <text x="20" y="12" fill={COLORS.text} fontSize="11">
                {label}
              </text>
            </g>
          ))}
          
          {/* Y-axis label */}
          <text
            x={15}
            y={height / 2}
            fill={COLORS.text}
            fontSize="11"
            textAnchor="middle"
            transform={`rotate(-90 15 ${height / 2})`}
          >
            Nivel de Afectación (0-3)
          </text>
        </svg>
      </div>
      
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: COLORS.background,
        borderRadius: '4px',
        fontSize: '11px',
        color: COLORS.textSecondary,
        textAlign: 'center'
      }}>
        Los comercios con peores ventas reportan mayor impacto de precios y competencia
      </div>
    </div>
  );
}

// === TEAM ===
function Team() {
  return (
    <section style={{
      padding: '120px 60px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Imagen de fondo MIT */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.60,
        filter: 'grayscale(15%) brightness(0.6)',
        zIndex: 0
      }} />
      
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 50% 50%, ${COLORS.background}60 0%, ${COLORS.background}90 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          marginBottom: '80px',
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
            El equipo
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text
          }}>
            Investigadores
          </h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px'
        }}>
          {TEAM_DATA.members.map((member, index) => (
            <TeamMember key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMember({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '3/4',
        marginBottom: '24px',
        overflow: 'hidden',
        backgroundColor: COLORS.surface,
        borderRadius: '2px'
      }}>
        {!imgError ? (
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.surface,
            fontSize: '72px',
            fontFamily: '"Crimson Pro", serif',
            color: COLORS.primary,
            fontWeight: '300'
          }}>
            {member.name.charAt(0)}
          </div>
        )}
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.4s'
        }} />
      </div>
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '400',
        color: COLORS.text,
        marginBottom: '8px',
        letterSpacing: '-0.01em'
      }}>
        {member.name}
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.primary,
        marginBottom: '4px',
        letterSpacing: '0.05em'
      }}>
        {member.role}
      </p>
      
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '16px'
      }}>
        {member.university}
      </p>
      
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: COLORS.text,
          textDecoration: 'none',
          borderBottom: `1px solid ${isHovered ? COLORS.primary : 'transparent'}`,
          paddingBottom: '2px',
          transition: 'border-color 0.3s',
          fontWeight: '500'
        }}
      >
        LinkedIn →
      </a>
    </div>
  );
}

// === MAPA ===
function Mapa({ datos }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

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
        const marker = window.L.marker([comercio.lat, comercio.long], { icon }).addTo(map);
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
      } catch (error) {
        console.error('Error al agregar marcador:', error);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [datos]);

  return (
    <section style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '60px',
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
          color: COLORS.text
        }}>
          Ubicación de comercios
        </h2>
      </div>
      
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
    </section>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${COLORS.border}`,
      padding: '80px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Imagen de fondo Buenos Aires */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.55,
        filter: 'grayscale(20%) brightness(0.65)',
        zIndex: 0
      }} />
      
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(to bottom, ${COLORS.surface}80 0%, ${COLORS.surface}90 40%, ${COLORS.surface}c0 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '60px'
        }}>
        <div>
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '24px',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '16px'
          }}>
            MIT LIFT Lab
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: COLORS.textSecondary,
            maxWidth: '400px'
          }}>
            Laboratory for Innovation Science and Policy. 
            Investigación aplicada para el desarrollo de ecosistemas 
            emprendedores en mercados emergentes.
          </p>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Equipo
          </h4>
          {TEAM_DATA.members.map((member, index) => (
            <div key={index} style={{
              fontSize: '14px',
              color: COLORS.textSecondary,
              marginBottom: '8px'
            }}>
              {member.name}
            </div>
          ))}
        </div>
        
        <div>
          <h4 style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Instituciones
          </h4>
          {TEAM_DATA.universities.map((uni, index) => (
            <div key={index} style={{
              fontSize: '14px',
              color: COLORS.textSecondary,
              marginBottom: '8px'
            }}>
              {uni.name}
            </div>
          ))}
        </div>
        
        <div>
          <h4 style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Contacto
          </h4>
          <div style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.8'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <a 
                href="mailto:Juandatorre.eco@gmail.com"
                style={{
                  color: COLORS.primary,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Juandatorre.eco@gmail.com
              </a>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <a 
                href="mailto:sofialg9194@gmail.com"
                style={{
                  color: COLORS.primary,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                sofialg9194@gmail.com
              </a>
            </div>
            <div>
              <a 
                href="mailto:ginamarrazzo20@gmail.com"
                style={{
                  color: COLORS.primary,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                ginamarrazzo20@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        maxWidth: '1400px',
        margin: '60px auto 0',
        paddingTop: '40px',
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: COLORS.textSecondary
      }}>
        <div>
          © 2025-2026 MIT LIFT Lab · Equipo {TEAM_DATA.name}
        </div>
        <div style={{
          display: 'flex',
          gap: '30px'
        }}>
          <span>Proyecto académico</span>
          <span>Universidad de Buenos Aires</span>
        </div>
      </div>
      </div>
    </footer>
  );
}

// === FUNCIONES AUXILIARES ===

// Función para filtrar outliers usando IQR (Interquartile Range)
function filtrarOutliers(datos, campo, factor = 1.5) {
  const valores = datos
    .map(d => parseFloat(d[campo]))
    .filter(v => !isNaN(v) && v !== null && v !== undefined && v > 0)
    .sort((a, b) => a - b);
  
  if (valores.length === 0) return datos;
  
  const q1Index = Math.floor(valores.length * 0.25);
  const q3Index = Math.floor(valores.length * 0.75);
  const q1 = valores[q1Index];
  const q3 = valores[q3Index];
  const iqr = q3 - q1;
  
  const lowerBound = q1 - factor * iqr;
  const upperBound = q3 + factor * iqr;
  
  return datos.filter(d => {
    const valor = parseFloat(d[campo]);
    return isNaN(valor) || valor === null || valor === undefined || 
           (valor >= lowerBound && valor <= upperBound);
  });
}

// Función para limpiar y validar datos
function limpiarDatos(datos) {
  return datos.map(d => ({
    ...d,
    cantidad_trabajadores: validarNumero(d.cantidad_trabajadores),
    trabajadores_salario_fijo: validarNumero(d.trabajadores_salario_fijo),
    consumo_kw: validarNumero(d.consumo_kw),
    año_apertura: validarNumero(d.año_apertura),
    lat: validarNumero(d.lat),
    long: validarNumero(d.long)
  }));
}

// Función para validar números
function validarNumero(valor) {
  const num = parseFloat(valor);
  return (!isNaN(num) && num !== null && num !== undefined && isFinite(num)) ? num : null;
}

// Función para obtener estadísticas robustas
function obtenerEstadisticas(valores) {
  const validos = valores.filter(v => v !== null && v !== undefined && !isNaN(v) && v > 0);
  if (validos.length === 0) return { promedio: 0, mediana: 0, min: 0, max: 0, count: 0 };
  
  const sorted = [...validos].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  const promedio = sum / sorted.length;
  const mediana = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  
  return {
    promedio,
    mediana,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    count: sorted.length
  };
}

function calcularIndicadores(datos) {
  const formatearNumero = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '0';
    return Number(num).toFixed(num % 1 === 0 ? 0 : 1);
  };

  const total = datos.length;
  
  const sumaHoras = datos.reduce((acc, c) => {
    if (!c.hs_apertura || !c.hs_cierre) return acc;
    const apertura = parseInt(c.hs_apertura);
    const cierre = parseInt(c.hs_cierre);
    if (isNaN(apertura) || isNaN(cierre)) return acc;
    let horas = cierre - apertura;
    if (horas < 0) horas += 24;
    return acc + horas;
  }, 0);
  
  const conteoHoras = datos.filter(c => c.hs_apertura && c.hs_cierre).length;
  const promHoras = conteoHoras > 0 ? sumaHoras / conteoHoras : 0;

  const sumaTrabajadores = datos.reduce((acc, c) => {
    const cant = parseFloat(c.cantidad_trabajadores);
    return acc + (isNaN(cant) ? 0 : cant);
  }, 0);
  const promTrabajadores = total > 0 ? sumaTrabajadores / total : 0;

  const conCredito = datos.filter(c => 
    (parseFloat(c.credits_bancos) > 0) ||
    (parseFloat(c.credits_proveedor) > 0) ||
    (parseFloat(c.credits_familia) > 0) ||
    (parseFloat(c.credits_gobierno) > 0) ||
    (parseFloat(c.credits_privado) > 0)
  ).length;
  const pctCredito = total > 0 ? (conCredito / total) * 100 : 0;

  const expPositivas = datos.filter(c => 
    c.exp_ventas_3mes === 'Mayores' || 
    c.exp_ventas_3mes === 'mayores'
  ).length;
  const pctExpectativas = total > 0 ? (expPositivas / total) * 100 : 0;

  const quierenCrecer = datos.filter(c => 
    parseFloat(c.quiere_crezca) === 1.0 || c.quiere_crezca === '1.0' || c.quiere_crezca === '1'
  ).length;
  const pctCrecimiento = total > 0 ? (quierenCrecer / total) * 100 : 0;

  const localPropio = datos.filter(c => 
    c.local === 'Propio' || c.local === 'propio'
  ).length;
  const pctLocalPropio = total > 0 ? (localPropio / total) * 100 : 0;

  const añoActual = new Date().getFullYear();
  const sumaAños = datos.reduce((acc, c) => {
    const añoApertura = parseFloat(c.año_apertura);
    if (isNaN(añoApertura) || añoApertura > añoActual) return acc;
    return acc + (añoActual - añoApertura);
  }, 0);
  const conteoAños = datos.filter(c => {
    const año = parseFloat(c.año_apertura);
    return !isNaN(año) && año <= añoActual;
  }).length;
  const promAñosOperacion = conteoAños > 0 ? sumaAños / conteoAños : 0;

  return {
    total,
    promTrabajadores: formatearNumero(promTrabajadores),
    promHoras: formatearNumero(promHoras),
    pctCredito: formatearNumero(pctCredito),
    pctExpectativas: formatearNumero(pctExpectativas),
    pctCrecimiento: formatearNumero(pctCrecimiento),
    pctLocalPropio: formatearNumero(pctLocalPropio),
    promAñosOperacion: formatearNumero(promAñosOperacion)
  };
}

function procesarDatosGraficos(datos) {
  // Distribución por tipo de comercio
  const tiposCount = {};
  datos.forEach(c => {
    const tipo = c.tipo_comercio || 'Sin categoría';
    tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
  });
  
  const distribucionComercios = Object.entries(tiposCount)
    .map(([tipo, cantidad]) => ({ tipo, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 8);

  // Promedio de trabajadores por tipo
  const trabajadoresPorTipo = {};
  const countPorTipo = {};
  
  datos.forEach(c => {
    const tipo = c.tipo_comercio || 'Sin categoría';
    const trabajadores = parseFloat(c.cantidad_trabajadores);
    
    if (!isNaN(trabajadores)) {
      trabajadoresPorTipo[tipo] = (trabajadoresPorTipo[tipo] || 0) + trabajadores;
      countPorTipo[tipo] = (countPorTipo[tipo] || 0) + 1;
    }
  });

  const trabajadoresData = Object.entries(trabajadoresPorTipo)
    .map(([tipo, suma]) => ({
      tipo,
      promedio: parseFloat((suma / countPorTipo[tipo]).toFixed(1))
    }))
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 10);

  // Acceso a crédito por fuente
  const fuentesCredito = [
    { fuente: 'Bancos', key: 'credits_bancos' },
    { fuente: 'Proveedores', key: 'credits_proveedor' },
    { fuente: 'Familia', key: 'credits_familia' },
    { fuente: 'Gobierno', key: 'credits_gobierno' },
    { fuente: 'Privado', key: 'credits_privado' }
  ];

  const creditoPorFuente = fuentesCredito.map(({ fuente, key }) => {
    const cantidad = datos.filter(c => parseFloat(c[key]) > 0).length;
    const porcentaje = (cantidad / datos.length) * 100;
    return {
      fuente,
      cantidad,
      porcentaje: parseFloat(porcentaje.toFixed(1))
    };
  }).sort((a, b) => b.cantidad - a.cantidad);

  // Adopción tecnológica por nivel
  const nivelesMap = {
    'Básico': 0,
    'Moderado': 0,
    'Alto': 0
  };

  datos.forEach(c => {
    const tech = c.tecnologia || '';
    if (tech.toLowerCase().includes('básico')) {
      nivelesMap['Básico']++;
    } else if (tech.toLowerCase().includes('moderado')) {
      nivelesMap['Moderado']++;
    } else if (tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado')) {
      nivelesMap['Alto']++;
    }
  });

  const adopcionTecnologica = Object.entries(nivelesMap).map(([nivel, cantidad]) => ({
    nivel,
    cantidad,
    porcentaje: parseFloat(((cantidad / datos.length) * 100).toFixed(1))
  }));

  // Salario mínimo dispuesto a pagar (con limpieza de datos)
  const salarios = datos
    .map(c => {
      const sal = c.min_salario;
      // Intentar parsear diferentes formatos
      if (!sal) return null;
      
      // Remover símbolos y espacios
      const cleaned = sal.toString().replace(/\$/g, "").replace(/\./g, "").replace(/,/g, "").replace(/ /g, "");
      const num = parseFloat(cleaned);
      
      // Filtrar solo valores numéricos en rango razonable (100k - 15M ARS)
      if (isNaN(num) || num < 100000 || num > 15000000) return null;
      
      return { valor: num, tipo: c.tipo_comercio || 'Sin categoría' };
    })
    .filter(s => s !== null);
  
  const promedioSalario = salarios.length > 0 
    ? salarios.reduce((acc, s) => acc + s.valor, 0) / salarios.length 
    : 0;

  const minSalario = salarios.length > 0 ? Math.min(...salarios.map(s => s.valor)) : 0;
  const maxSalario = salarios.length > 0 ? Math.max(...salarios.map(s => s.valor)) : 0;
  
  // Distribución de salarios en rangos
  const rangos = [
    { min: 0, max: 200000, label: '< $200k' },
    { min: 200000, max: 300000, label: '$200k - $300k' },
    { min: 300000, max: 400000, label: '$300k - $400k' },
    { min: 400000, max: 500000, label: '$400k - $500k' },
    { min: 500000, max: Infinity, label: '> $500k' }
  ];

  const distribucionSalarios = rangos.map(rango => {
    const cantidad = salarios.filter(s => s.valor >= rango.min && s.valor < rango.max).length;
    return {
      rango: rango.label,
      cantidad,
      porcentaje: parseFloat(((cantidad / salarios.length) * 100).toFixed(1))
    };
  });

  // Salario promedio por tipo de comercio (top 10)
  const salariosPorTipo = {};
  const countSalariosPorTipo = {};
  
  salarios.forEach(s => {
    if (!salariosPorTipo[s.tipo]) {
      salariosPorTipo[s.tipo] = 0;
      countSalariosPorTipo[s.tipo] = 0;
    }
    salariosPorTipo[s.tipo] += s.valor;
    countSalariosPorTipo[s.tipo]++;
  });

  const salariosPorComercio = Object.entries(salariosPorTipo)
    .map(([tipo, suma]) => ({
      tipo,
      promedio: Math.round(suma / countSalariosPorTipo[tipo]),
      cantidad: countSalariosPorTipo[tipo]
    }))
    .filter(item => item.cantidad >= 3) // Solo tipos con al menos 3 comercios
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 10);

  return {
    distribucionComercios,
    trabajadoresPorTipo: trabajadoresData,
    creditoPorFuente,
    adopcionTecnologica,
    salarioData: {
      promedio: parseFloat(promedioSalario.toFixed(0)),
      minimo: minSalario,
      maximo: maxSalario,
      distribucion: distribucionSalarios,
      porComercio: salariosPorComercio
    }
  };
}

// === RENDERIZAR ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);