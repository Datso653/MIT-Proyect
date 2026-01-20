const { useState, useEffect, useRef } = React;

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
        
        /* ANIMACIONES */
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
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
        
        /* === MOBILE RESPONSIVE === */
        @media (max-width: 768px) {
          /* Hero */
          section[data-section="hero"] {
            padding: 80px 20px 60px !important;
            min-height: 90vh !important;
          }
          
          section[data-section="hero"] h1 {
            font-size: 36px !important;
            line-height: 1.2 !important;
          }
          
          section[data-section="hero"] p {
            font-size: 16px !important;
          }
          
          /* Secciones generales */
          section {
            padding: 60px 20px !important;
          }
          
          /* Títulos */
          h2 {
            font-size: 32px !important;
            line-height: 1.2 !important;
          }
          
          h3 {
            font-size: 20px !important;
          }
          
          /* Footer grid */
          footer > div > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          footer > div > div > div {
            flex-direction: column !important;
            text-align: center !important;
          }
          
          /* Navbar */
          nav {
            padding: 16px 20px !important;
          }
          
          /* Botones */
          button {
            font-size: 13px !important;
            padding: 12px 20px !important;
          }
          
          /* Mapa */
          #mapa > div:last-of-type {
            height: 400px !important;
          }
          
          /* === SECCIÓN MACHINE LEARNING === */
          #machine-learning {
            padding: 60px 20px !important;
          }
          
          /* Grid de modelos ML a 1 columna */
          #machine-learning > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          /* Tarjetas de modelos ML */
          #machine-learning div[style*="borderRadius: '8px'"] {
            padding: 20px !important;
          }
          
          /* Métricas dentro de ML (Accuracy, Precision, etc) */
          #machine-learning div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          
          /* Título de modelos ML */
          #machine-learning h3 {
            font-size: 20px !important;
          }
          
          /* === GRÁFICO DE BARRAS TRABAJADORES === */
          #analisis-visual {
            padding: 60px 20px !important;
          }
          
          /* Grid de gráficos a 1 columna */
          #analisis-visual > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          /* Contenedor del gráfico de barras - permitir scroll horizontal */
          #analisis-visual div[style*="overflowX: 'auto'"] {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          /* SVG de barras más pequeño pero scrolleable */
          #analisis-visual svg {
            min-width: 500px !important;
            max-width: none !important;
            height: auto !important;
          }
          
          /* Tarjetas de gráficos */
          #analisis-visual > div > div > div {
            padding: 20px !important;
          }
        }
        
        /* === SMARTPHONE === */
        @media (max-width: 480px) {
          section[data-section="hero"] {
            padding: 70px 16px 50px !important;
          }
          
          section[data-section="hero"] h1 {
            font-size: 28px !important;
          }
          
          section {
            padding: 50px 16px !important;
          }
          
          h2 {
            font-size: 26px !important;
          }
          
          h3 {
            font-size: 18px !important;
          }
          
          button {
            font-size: 12px !important;
            padding: 10px 16px !important;
          }
          
          #mapa > div:last-of-type {
            height: 350px !important;
          }
          
          /* ML más compacto en smartphone */
          #machine-learning,
          #analisis-visual {
            padding: 50px 16px !important;
          }
          
          #machine-learning div[style*="borderRadius: '8px'"],
          #analisis-visual > div > div > div {
            padding: 16px !important;
          }
          
          /* SVG barras aún más compacto */
          #analisis-visual svg {
            min-width: 400px !important;
          }
        }
        
        /* === LANDSCAPE === */
        @media (max-width: 768px) and (orientation: landscape) {
          section[data-section="hero"] {
            min-height: auto !important;
            padding: 60px 20px !important;
          }
        }
      `}</style>
      <Navbar />
      <Hero scrollY={scrollY} />
      <ProjectIntro />
      <UniversidadesParticipantes />
      {datos.length > 0 && <Mapa datos={datos} />}
      {indicadores && <ResumenEjecutivo indicadores={indicadores} />}
      {indicadores && <Indicadores data={indicadores} />}
      {datosGraficos && indicadores && <AnalisisVisual data={datosGraficos} indicadores={indicadores} datos={datos} />}
      <SeccionMachineLearning />
      <SeccionAnalisis />
      <Team />
      <Footer />
    </div>
  );
}

// === HERO SECTION ===
// === NAVBAR CON MENÚ DESPLEGABLE ===
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', label: 'Inicio' },
    { id: 'intro', label: 'Introducción' },
    { id: 'mapa', label: 'Mapa' },
    { id: 'resumen', label: 'Hipótesis y Primeras Impresiones' },
    { id: 'indicadores', label: 'Indicadores' },
    { id: 'analisis-visual', label: 'Análisis Visual' },
    { id: 'machine-learning', label: 'Machine Learning' },
    { id: 'analisis', label: 'Conclusiones' },
    { id: 'equipo', label: '¿Quiénes somos?' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: isScrolled ? `${COLORS.background}f5` : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? `1px solid ${COLORS.border}` : 'none',
      transition: 'all 0.3s ease',
      padding: '20px 40px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        {/* Botón hamburguesa */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              padding: '14px 16px',
              backgroundColor: 'transparent',
              color: COLORS.text,
              border: `2px solid ${COLORS.primary}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${COLORS.primary}20`;
              e.currentTarget.style.borderColor = COLORS.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = COLORS.primary;
            }}
          >
            {/* 3 líneas hamburguesa */}
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: COLORS.primary,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(45deg) translateY(9px)' : 'rotate(0)'
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: COLORS.primary,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 0 : 1
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: COLORS.primary,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'rotate(0)'
            }} />
          </button>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              minWidth: '250px',
              overflow: 'hidden',
              animation: 'slideDown 0.3s ease'
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
              
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    borderBottom: index < sections.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = `${COLORS.primary}15`;
                    e.target.style.paddingLeft = '24px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.paddingLeft = '20px';
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    fontWeight: '500'
                  }}>
                    {section.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function Hero({ scrollY }) {
  const parallaxOffset = scrollY * 0.5;
  
  return (
    <section 
      id="hero"
      data-section="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 60px'
      }}>
      {/* Imagen de fondo - Obelisco Buenos Aires */}
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
      
      {/* Overlay gradient oscuro */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}85 0%, ${COLORS.background}60 50%, ${COLORS.background}85 100%)`,
        zIndex: 1
      }} />
      
      {/* Elementos decorativos flotantes */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${COLORS.primary}15 0%, transparent 70%)`,
        borderRadius: '50%',
        transform: `translateY(${parallaxOffset}px)`,
        pointerEvents: 'none',
        zIndex: 2
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${COLORS.accent}15 0%, transparent 70%)`,
        borderRadius: '50%',
        transform: `translateY(${-parallaxOffset * 0.3}px)`,
        pointerEvents: 'none',
        zIndex: 2
      }} />

      <div style={{
        maxWidth: '1400px',
        width: '100%',
        zIndex: 3,
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
          MIT LIFT Lab — Buenos Aires
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
    <section id="intro" style={{
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

// === UNIVERSIDADES PARTICIPANTES ===
function UniversidadesParticipantes() {
  const universidades = [
    { 
      nombre: 'MIT', 
      fullName: 'Massachusetts Institute of Technology',
      logo: './img/mit.png'
    },
    { 
      nombre: 'UBA', 
      fullName: 'Universidad de Buenos Aires',
      logo: './img/uba.jpg'
    },
    { 
      nombre: 'UNSAM', 
      fullName: 'Universidad Nacional de San Martín',
      logo: './img/unsam.jpg'
    },
    { 
      nombre: 'UP', 
      fullName: 'Universidad de Palermo',
      logo: './img/up.png'
    },
    { 
      nombre: 'ITBA', 
      fullName: 'Instituto Tecnológico de Buenos Aires',
      logo: './img/itba.jpg'
    },
    { 
      nombre: 'UNICEN', 
      fullName: 'Universidad Nacional del Centro',
      logo: './img/tandil.jpg'
    }
  ];

  const universidadesDuplicadas = [...universidades, ...universidades];

  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <div style={{
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: COLORS.primary,
          marginBottom: '16px',
          fontWeight: '500'
        }}>
          Instituciones Participantes
        </div>
        <h3 style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: '32px',
          fontWeight: '400',
          color: COLORS.text
        }}>
          Colaboración Interinstitucional
        </h3>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logos-container {
          animation: scroll 15s linear infinite;
        }
        .logos-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '60px'
      }} className="logos-container">
        {universidadesDuplicadas.map((uni, idx) => (
          <div
            key={idx}
            style={{
              minWidth: '260px',
              height: '200px',
              padding: '40px',
              backgroundColor: COLORS.background,
              borderRadius: '12px',
              border: `1px solid ${COLORS.border}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.primary;
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(79, 195, 247, 0.25)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img 
              src={uni.logo}
              alt={uni.nombre}
              style={{
                maxWidth: '140px',
                maxHeight: '100px',
                objectFit: 'contain',
                marginBottom: '20px'
              }}
            />
            <div style={{
              fontSize: '11px',
              color: COLORS.textSecondary,
              lineHeight: '1.4',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {uni.fullName}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// === INDICADORES CON GRÁFICOS CIRCULARES ===
// === RESUMEN EJECUTIVO PARA COMERCIANTES (MODIFICADO) ===
function ResumenEjecutivo({ indicadores }) {
  if (!indicadores) return null;
  
  return (
    <section id="resumen" style={{
      padding: '140px 60px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: COLORS.background
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
        opacity: 0.45,
        filter: 'grayscale(30%) brightness(0.6)',
        zIndex: 0
      }} />
      
      {/* Overlay con gradiente */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}95 0%, ${COLORS.background}75 50%, ${COLORS.background}95 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <AnimatedModelCard delay={0}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: COLORS.accent,
            marginBottom: '24px',
            fontWeight: '700'
          }}>
            Hipótesis y Primeras Impresiones
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(42px, 5.5vw, 64px)',
            fontWeight: '300',
            color: COLORS.text,
            marginBottom: '30px',
            lineHeight: '1.15',
            letterSpacing: '-0.02em'
          }}>
            Lo que aprendimos de <span style={{ 
              color: COLORS.primary,
              fontWeight: '600'
            }}>{indicadores.total}</span> comercios
          </h2>
          <p style={{
            fontSize: '19px',
            color: COLORS.textSecondary,
            lineHeight: '1.8',
            maxWidth: '750px',
            margin: '0 auto',
            fontWeight: '300'
          }}>
            Un análisis profundo del ecosistema comercial del Área Metropolitana de Buenos Aires
          </p>
        </div>
        </AnimatedModelCard>

        {/* Cards con diseño moderno */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          marginBottom: '60px'
        }}>
          <AnimatedModelCard delay={100}>
          {/* Hallazgo 1 */}
          <div style={{
            padding: '50px',
            background: `linear-gradient(135deg, ${COLORS.surface}f8 0%, ${COLORS.surface}e5 100%)`,
            borderRadius: '20px',
            border: `1px solid ${COLORS.primary}30`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 8px 32px ${COLORS.primary}15`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = `0 20px 60px ${COLORS.primary}25`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 32px ${COLORS.primary}15`;
          }}>
            {/* Barra de color superior */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '30px'
            }}>
              <div style={{
                minWidth: '80px',
                height: '80px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${COLORS.primary}25, ${COLORS.primaryDark}40)`,
                border: `2px solid ${COLORS.primary}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: '700',
                color: COLORS.primary,
                fontFamily: '"Crimson Pro", serif',
                flexShrink: 0
              }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: '"Crimson Pro", serif',
                  fontSize: '28px',
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: '16px',
                  lineHeight: '1.3'
                }}>
                  El comercio de cercanía mantiene su vitalidad
                </h3>
                <p style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  color: COLORS.textSecondary,
                  margin: 0,
                  fontWeight: '300'
                }}>
                  A pesar de los desafíos económicos, los comercios del AMBA demuestran una notable resiliencia. 
                  La mayoría de los comerciantes mantiene expectativas positivas y deseo de crecimiento, 
                  evidenciando el rol fundamental que juegan en la economía local.
                </p>
              </div>
            </div>
          </div>

          </AnimatedModelCard>
          <AnimatedModelCard delay={200}>
          {/* Hallazgo 2 */}
          <div style={{
            padding: '50px',
            background: `linear-gradient(135deg, ${COLORS.surface}f8 0%, ${COLORS.surface}e5 100%)`,
            borderRadius: '20px',
            border: `1px solid ${COLORS.accent}30`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 8px 32px ${COLORS.accent}15`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = `0 20px 60px ${COLORS.accent}25`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 32px ${COLORS.accent}15`;
          }}>
            {/* Barra de color superior */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '30px'
            }}>
              <div style={{
                minWidth: '80px',
                height: '80px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${COLORS.accent}25, ${COLORS.accentDark}40)`,
                border: `2px solid ${COLORS.accent}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: '700',
                color: COLORS.accent,
                fontFamily: '"Crimson Pro", serif',
                flexShrink: 0
              }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: '"Crimson Pro", serif',
                  fontSize: '28px',
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: '16px',
                  lineHeight: '1.3'
                }}>
                  La digitalización es una oportunidad latente
                </h3>
                <p style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  color: COLORS.textSecondary,
                  margin: 0,
                  fontWeight: '300'
                }}>
                  Existe una brecha significativa en la adopción de tecnología. Los comercios que implementan 
                  herramientas digitales muestran mejores indicadores de gestión, señalando un camino claro 
                  para la modernización del sector.
                </p>
              </div>
            </div>
          </div>

          </AnimatedModelCard>
          <AnimatedModelCard delay={300}>
          {/* Hallazgo 3 */}
          <div style={{
            padding: '50px',
            background: `linear-gradient(135deg, ${COLORS.surface}f8 0%, ${COLORS.surface}e5 100%)`,
            borderRadius: '20px',
            border: `1px solid ${COLORS.primaryLight}30`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 8px 32px ${COLORS.primaryLight}15`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = `0 20px 60px ${COLORS.primaryLight}25`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 32px ${COLORS.primaryLight}15`;
          }}>
            {/* Barra de color superior */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${COLORS.primaryLight}, ${COLORS.primary})`
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '30px'
            }}>
              <div style={{
                minWidth: '80px',
                height: '80px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${COLORS.primaryLight}25, ${COLORS.primary}40)`,
                border: `2px solid ${COLORS.primaryLight}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: '700',
                color: COLORS.primaryLight,
                fontFamily: '"Crimson Pro", serif',
                flexShrink: 0
              }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: '"Crimson Pro", serif',
                  fontSize: '28px',
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: '16px',
                  lineHeight: '1.3'
                }}>
                  El acceso a financiamiento sigue siendo un desafío
                </h3>
                <p style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  color: COLORS.textSecondary,
                  margin: 0,
                  fontWeight: '300'
                }}>
                  La limitada disponibilidad de crédito formal impacta directamente en las posibilidades de 
                  expansión. Los comerciantes recurren principalmente a redes informales, destacando la 
                  necesidad de políticas que faciliten el acceso a capital de trabajo.
                </p>
              </div>
            </div>
          </div>
          </AnimatedModelCard>
        </div>

        {/* CTA final */}
        <div style={{
          textAlign: 'center',
          padding: '50px 60px',
          background: `linear-gradient(135deg, ${COLORS.primary}12 0%, ${COLORS.accent}08 100%)`,
          borderRadius: '20px',
          border: `1px solid ${COLORS.primary}40`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 8px 32px rgba(0,0,0,0.3)`
        }}>
          <p style={{
            fontSize: '19px',
            color: COLORS.text,
            margin: 0,
            lineHeight: '1.8',
            fontWeight: '300'
          }}>
            <strong style={{ 
              color: COLORS.accent,
              fontWeight: '600' 
            }}>Para los comerciantes:</strong> Este estudio refleja 
            la realidad de tu sector. Los datos completos y herramientas de análisis están disponibles 
            más abajo para ayudarte a tomar mejores decisiones.
          </p>
        </div>

        <AnimatedModelCard delay={400}>
          <div>
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '24px',
            fontWeight: '600',
            color: COLORS.accent,
            marginTop: '50px',
            marginBottom: '20px'
          }}>
            Hipótesis geoespaciales
          </h3>
          
          <p style={{ marginBottom: '20px', color: COLORS.textSecondary }}>
            El análisis de los mapas de calor de percepción de crimen y acceso a crédito revela patrones 
            espaciales que sugieren correlaciones significativas entre factores geográficos y el desarrollo 
            comercial. Proponemos las siguientes hipótesis a explorar:
          </p>

          <div style={{
            display: 'grid',
            gap: '20px',
            marginTop: '30px'
          }}>
            {/* Hipótesis 1 - SOLO PLANTEAMIENTO */}
            <div style={{
              padding: '30px',
              backgroundColor: COLORS.background,
              borderRadius: '12px',
              border: `1px solid #ffa50040`,
              borderLeft: `4px solid #ffa500`,
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 165, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ffa500',
                  boxShadow: '0 0 12px #ffa500'
                }} />
                <h4 style={{
                  fontSize: '19px',
                  fontWeight: '600',
                  color: '#ffa500',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}>
                  H1: Crimen alto + Sin crédito → ¿Menor expectativa de crecimiento?
                </h4>
              </div>
              <p style={{ 
                fontSize: '15px',
                color: COLORS.textSecondary,
                lineHeight: '1.8',
                paddingLeft: '20px',
                margin: 0
              }}>
                Los comercios ubicados en zonas con alta percepción de crimen Y sin acceso a crédito 
                presentan menores expectativas de crecimiento comparados con el resto de comercios.
              </p>
            </div>

            {/* Hipótesis 2 - SOLO PLANTEAMIENTO */}
            <div style={{
  padding: '30px',
  backgroundColor: COLORS.background,
  borderRadius: '12px',
  border: `1px solid #FF444440`,
  borderLeft: `4px solid #FF4444`,
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default'
            }}
            onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)';
  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 68, 68, 0.3)';
            }}
            onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
      backgroundColor: '#FF4444',
      boxShadow: '0 0 12px #FF4444'
                }} />
                <h4 style={{
                  fontSize: '19px',
                  fontWeight: '600',
                  color: '#FF4444',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}>
                  H2: Crimen bajo + Con crédito → ¿Mayor inversión tecnológica?
                </h4>
              </div>
              <p style={{ 
                fontSize: '15px',
                color: COLORS.textSecondary,
                lineHeight: '1.8',
                paddingLeft: '20px',
                margin: 0
              }}>
                Los comercios en zonas con baja percepción de crimen Y con acceso a crédito 
                presentan mayor adopción de tecnología comparados con el resto de comercios.
              </p>
            </div>
          </div>

{/* Hipótesis 3 - SOLO PLANTEAMIENTO */}
<div style={{
  padding: '30px',
  backgroundColor: COLORS.background,
  borderRadius: '12px',
  border: `1px solid #20B2AA40`,
  borderLeft: `4px solid #20B2AA`,
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default'
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)';
  e.currentTarget.style.boxShadow = '0 8px 24px rgba(50, 205, 50, 0.3)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
}}
>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  }}>
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#32CD32',
      boxShadow: '0 0 12px #32CD32'
    }} />
    <h4 style={{
      fontSize: '19px',
      fontWeight: '600',
      color: '#32CD32',
      margin: 0,
      letterSpacing: '-0.01em'
    }}>
      H3: Alta demanda + Acceso a crédito + Baja competencia → ¿Mayor intención de expansión?
    </h4>
  </div>
  <p style={{ 
    fontSize: '15px',
    color: COLORS.textSecondary,
    lineHeight: '1.8',
    paddingLeft: '20px',
    margin: 0
  }}>
    Los comercios ubicados en zonas con alta demanda potencial, acceso a crédito y baja presión competitiva presentan una mayor intención de expandirse (apertura de nuevas sucursales, ampliación de capacidad o incremento de inversión) en comparación con el resto de los comercios.
  </p>
</div>

{/* Hipótesis 4 - SOLO PLANTEAMIENTO */}
<div style={{
  padding: '30px',
  backgroundColor: COLORS.background,
  borderRadius: '12px',
  border: `1px solid #9370DB40`,
  borderLeft: `4px solid #9370DB`,
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  marginTop: '20px'
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)';
  e.currentTarget.style.boxShadow = '0 8px 24px rgba(147, 112, 219, 0.3)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
}}
>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  }}>
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#9370DB',
      boxShadow: '0 0 12px #9370DB'
    }} />
    <h4 style={{
      fontSize: '19px',
      fontWeight: '600',
      color: '#9370DB',
      margin: 0,
      letterSpacing: '-0.01em'
    }}>
      H4: Crimen, precios, competencia y crédito → ¿Qué factor explica mayor caída en ventas?
    </h4>
  </div>
  <p style={{ 
    fontSize: '15px',
    color: COLORS.textSecondary,
    lineHeight: '1.8',
    paddingLeft: '20px',
    margin: 0
  }}>
    Las variaciones en las ventas de los comercios están significativamente asociadas a factores externos, siendo el crimen percibido, los precios relativos, la intensidad de la competencia y el acceso al crédito determinantes clave, con impactos diferenciados según la zona geográfica.
  </p>
  <div style={{ 
    fontSize: '14px',
    color: '#aaa',
    fontStyle: 'italic',
    lineHeight: '1.6',
    paddingLeft: '20px',
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px dashed rgba(147, 112, 219, 0.3)'
  }}>
    <strong>Nota:</strong> Esta hipótesis se puede contrastar comparando elasticidades o efectos marginales entre factores.
  </div>
</div>

          <p style={{ 
            marginTop: '30px',
            marginBottom: '24px', 
            color: COLORS.textSecondary,
            fontSize: '14px',
            fontStyle: 'italic'
          }}>
            <strong>Nota:</strong> Los resultados del análisis estadístico de estas hipótesis se presentan en la sección de Análisis Visual, 
            donde se puede observar la comparación detallada entre grupos y las métricas de validación.
          </p>
        </div>
          </AnimatedModelCard>
      </div>
    </section>
  );
}


function Indicadores({ data }) {
  const indicadores = [
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
      value: parseFloat(data.promAniosOperacion), 
      max: 50,
      suffix: '',
      description: 'Antigüedad promedio'
    }
  ];

  return (
    <section id="indicadores" style={{
      padding: '120px 60px',
      backgroundColor: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`
    }}>
      <div style={{ 
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

// === ANÁLISIS VISUAL CON GRÁFICOS SVG (MODIFICADO) ===
function AnalisisVisual({ data, indicadores, datos }) {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-index]');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="analisis-visual" ref={sectionRef} style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '80px',
        textAlign: 'center',
        opacity: 0,
        animation: 'fadeInUp 0.8s ease-out forwards'
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
      <div 
        data-index="0"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
          opacity: visibleItems.has('0') ? 1 : 0,
          transform: visibleItems.has('0') ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}>
        <div style={{
          opacity: visibleItems.has('0') ? 1 : 0,
          transform: visibleItems.has('0') ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
        }}>
          <GraficoDistribucion data={data.distribucionComercios} />
        </div>
        <div style={{
          opacity: visibleItems.has('0') ? 1 : 0,
          transform: visibleItems.has('0') ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
        }}>
          <GraficoBarras data={data.trabajadoresPorTipo} />
        </div>
      </div>

      {/* Segunda fila: Fuentes de crédito (barras horizontales) */}
      <div 
        data-index="1"
        style={{ 
          marginBottom: '40px',
          opacity: visibleItems.has('1') ? 1 : 0,
          transform: visibleItems.has('1') ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}>
        <GraficoBarrasHorizontales data={data.creditoPorFuente} pctCredito={indicadores?.pctCredito || 0} />
      </div>

      {/* Tercera fila: Adopción tecnológica y Salarios */}
      <div 
        data-index="2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '40px',
          marginBottom: '60px',
          opacity: visibleItems.has('2') ? 1 : 0,
          transform: visibleItems.has('2') ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}>
        <div style={{
          opacity: visibleItems.has('2') ? 1 : 0,
          transform: visibleItems.has('2') ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
        }}>
          <GraficoTierlist data={data.adopcionTecnologica} />
        </div>
        <div style={{
          opacity: visibleItems.has('2') ? 1 : 0,
          transform: visibleItems.has('2') ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
        }}>
          <GraficoSalarios data={data.salarioData} />
        </div>
      </div>

      {/* NUEVA SECCIÓN: Validación de Hipótesis Geoespaciales */}
      <div 
        data-index="3"
        style={{
          marginTop: '80px',
          opacity: visibleItems.has('3') ? 1 : 0,
          transform: visibleItems.has('3') ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}>
        
        <div style={{
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.accent,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Validación Estadística
          </div>
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(32px, 3.5vw, 42px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '20px'
          }}>
            Análisis de Hipótesis Geoespaciales
          </h3>
          <p style={{
            fontSize: '15px',
            color: COLORS.textSecondary,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Resultados del análisis estadístico de las hipótesis planteadas sobre la relación entre 
            factores geográficos y comportamiento comercial
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '30px'
        }}>
          {/* Hipótesis 1 con gráficos */}
          {datos && datos.length > 0 ? (
            <HipotesisConGraficos 
              numero={1}
              titulo="Crimen alto + Sin crédito → ¿Menor expectativa de crecimiento?"
              datos={datos}
              tipo="crecimiento"
            />
          ) : (
            <div style={{ color: COLORS.textSecondary, textAlign: 'center', padding: '20px' }}>
              Cargando datos para el análisis...
            </div>
          )}

          {/* Hipótesis 2 con gráficos */}
          {datos && datos.length > 0 ? (
            <HipotesisConGraficos 
              numero={2}
              titulo="Crimen bajo + Con crédito → ¿Mayor inversión tecnológica?"
              datos={datos}
              tipo="tecnologia"
            />
          ) : (
            <div style={{ color: COLORS.textSecondary, textAlign: 'center', padding: '20px' }}>
              Cargando datos para el análisis...
            </div>
          )}

{/* Hipótesis 3 con gráficos */}
{datos && datos.length > 0 ? (
  <HipotesisConGraficos 
    numero={3}
    titulo="Alta demanda + Acceso a crédito + Baja competencia → ¿Mayor intención de expansión?"
    datos={datos}
    tipo="expansion"
  />
) : (
  <div style={{ color: COLORS.textSecondary, textAlign: 'center', padding: '20px' }}>
    Cargando datos para el análisis...
  </div>
)}

{/* Hipótesis 4 con gráficos */}
{datos && datos.length > 0 ? (
  <HipotesisConGraficos 
    numero={4}
    titulo="Crimen, precios, competencia y crédito → ¿Qué factor explica mayor caída en ventas?"
    subtitulo="Las variaciones en las ventas de los comercios están significativamente asociadas a factores externos, con impactos diferenciados según la zona geográfica."
    datos={datos}
    tipo="ventas"
  />
) : (
  <div style={{ color: COLORS.textSecondary, textAlign: 'center', padding: '20px' }}>
    Cargando datos para el análisis...
  </div>
)}

        </div>
      </div>
    </section>
  );
}

// Nuevo componente para mostrar las hipótesis con sus gráficos
function HipotesisConGraficos({ numero, titulo, datos, tipo }) {
  const [expanded, setExpanded] = useState(false);

  console.log('Datos recibidos en HipotesisConGraficos:', datos); // Para debug

  if (!datos || datos.length === 0) {
    return (
      <div style={{ 
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '8px',
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{ color: COLORS.accent, fontSize: '14px', fontWeight: '600' }}>
          HIPÓTESIS {numero}: {titulo}
        </div>
        <div style={{ color: COLORS.textSecondary, fontSize: '13px', marginTop: '10px' }}>
          No hay datos disponibles para el análisis. Verifica que los datos hayan cargado correctamente.
        </div>
      </div>
    );
  }

  // Análisis real para Hipótesis 1
  const analizarHipotesis1 = () => {
    console.log('Analizando hipótesis 1 con', datos.length, 'registros');
    
    const grupoAdverso = datos.filter(c => {
      const crimenAlto = c.afect_crimen === 'Mucho';
      const sinCredito = !(parseFloat(c.credits_bancos) > 0 || 
                         parseFloat(c.credits_proveedor) > 0 || 
                         parseFloat(c.credits_familia) > 0 || 
                         parseFloat(c.credits_gobierno) > 0 || 
                         parseFloat(c.credits_privado) > 0);
      return crimenAlto && sinCredito;
    });
    
    const grupoComparacion = datos.filter(c => {
      const crimenAlto = c.afect_crimen === 'Mucho';
      const sinCredito = !(parseFloat(c.credits_bancos) > 0 || 
                         parseFloat(c.credits_proveedor) > 0 || 
                         parseFloat(c.credits_familia) > 0 || 
                         parseFloat(c.credits_gobierno) > 0 || 
                         parseFloat(c.credits_privado) > 0);
      return !(crimenAlto && sinCredito);
    });

    console.log('Grupo adverso:', grupoAdverso.length);
    console.log('Grupo comparación:', grupoComparacion.length);

    const adversoQuiereCrecer = grupoAdverso.filter(c => {
      const quiereCrecer = parseFloat(c.quiere_crezca) === 1.0 || 
                          c.quiere_crezca === '1.0' || 
                          c.quiere_crezca === '1';
      return quiereCrecer;
    }).length;
    
    const comparacionQuiereCrecer = grupoComparacion.filter(c => {
      const quiereCrecer = parseFloat(c.quiere_crezca) === 1.0 || 
                          c.quiere_crezca === '1.0' || 
                          c.quiere_crezca === '1';
      return quiereCrecer;
    }).length;

    const totalAdverso = grupoAdverso.length;
    const totalComparacion = grupoComparacion.length;
    
    return {
      grupoAdverso: totalAdverso,
      grupoComparacion: totalComparacion,
      adversoQuiereCrecer,
      comparacionQuiereCrecer,
      pctAdverso: totalAdverso > 0 ? (adversoQuiereCrecer / totalAdverso) * 100 : 0,
      pctComparacion: totalComparacion > 0 ? (comparacionQuiereCrecer / totalComparacion) * 100 : 0,
      datosGrupoAdverso: grupoAdverso,
      datosGrupoComparacion: grupoComparacion
    };
  };

  // Análisis real para Hipótesis 2
  const analizarHipotesis2 = () => {
    console.log('Analizando hipótesis 2 con', datos.length, 'registros');
    
    const grupoAdverso = datos.filter(c => {
      const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
      const conCredito = (parseFloat(c.credits_bancos) > 0 || 
                         parseFloat(c.credits_proveedor) > 0 || 
                         parseFloat(c.credits_familia) > 0 || 
                         parseFloat(c.credits_gobierno) > 0 || 
                         parseFloat(c.credits_privado) > 0);
      return crimenBajo && conCredito;
    });
    
    const grupoComparacion = datos.filter(c => {
      const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
      const conCredito = (parseFloat(c.credits_bancos) > 0 || 
                         parseFloat(c.credits_proveedor) > 0 || 
                         parseFloat(c.credits_familia) > 0 || 
                         parseFloat(c.credits_gobierno) > 0 || 
                         parseFloat(c.credits_privado) > 0);
      return !(crimenBajo && conCredito);
    });

    console.log('Grupo adverso (H2):', grupoAdverso.length);
    console.log('Grupo comparación (H2):', grupoComparacion.length);

    const adversoInvierteTecnologia = grupoAdverso.filter(c => {
      const invierte = parseFloat(c.invierte_tecnologia) === 1.0 || 
                      c.invierte_tecnologia === '1.0' || 
                      c.invierte_tecnologia === '1';
      return invierte;
    }).length;
    
    const comparacionInvierteTecnologia = grupoComparacion.filter(c => {
      const invierte = parseFloat(c.invierte_tecnologia) === 1.0 || 
                      c.invierte_tecnologia === '1.0' || 
                      c.invierte_tecnologia === '1';
      return invierte;
    }).length;

    const totalAdverso = grupoAdverso.length;
    const totalComparacion = grupoComparacion.length;
    
    return {
      grupoAdverso: totalAdverso,
      grupoComparacion: totalComparacion,
      adversoInvierteTecnologia,
      comparacionInvierteTecnologia,
      pctAdverso: totalAdverso > 0 ? (adversoInvierteTecnologia / totalAdverso) * 100 : 0,
      pctComparacion: totalComparacion > 0 ? (comparacionInvierteTecnologia / totalComparacion) * 100 : 0,
      datosGrupoAdverso: grupoAdverso,
      datosGrupoComparacion: grupoComparacion
    };
  };

  // Seleccionar análisis según el tipo
  const analisis = tipo === 'crecimiento' ? analizarHipotesis1() : analizarHipotesis2();
  
  // Si no hay datos en algún grupo, mostrar mensaje
  if (analisis.grupoAdverso === 0 || analisis.grupoComparacion === 0) {
    return (
      <div style={{ 
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '8px',
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{ color: COLORS.accent, fontSize: '14px', fontWeight: '600' }}>
          HIPÓTESIS {numero}: {titulo}
        </div>
        <div style={{ color: COLORS.textSecondary, fontSize: '13px', marginTop: '10px' }}>
          No hay suficientes datos para analizar esta hipótesis:
          <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
            <li>Grupo de análisis: {analisis.grupoAdverso} comercios</li>
            <li>Grupo de comparación: {analisis.grupoComparacion} comercios</li>
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ 
      marginBottom: '40px',
      border: `1px solid ${COLORS.border}`,
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Encabezado de la hipótesis */}
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '20px 30px',
          backgroundColor: COLORS.surface,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '13px', color: COLORS.primary, fontWeight: '600', marginBottom: '4px' }}>
            HIPÓTESIS {numero}
          </div>
          <div style={{ fontSize: '18px', color: COLORS.text, fontWeight: '500' }}>
            {titulo}
          </div>
        </div>
        <div style={{ fontSize: '20px', color: COLORS.primary }}>
          {expanded ? '−' : '+'}
        </div>
      </div>
      
      {expanded && (
        <div style={{ padding: '30px', backgroundColor: COLORS.background }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: COLORS.text, marginBottom: '15px' }}>
              Resultados del análisis
            </h4>
            
            {/* Gráfico de barras comparativo */}
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              marginBottom: '30px',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h5 style={{ color: COLORS.textSecondary, marginBottom: '10px' }}>
                  Grupo de análisis
                </h5>
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: COLORS.surface, 
                  borderRadius: '8px',
                  borderLeft: `4px solid ${COLORS.primary}`
                }}>
                  <div style={{ fontSize: '24px', color: COLORS.primary, fontWeight: 'bold' }}>
                    {analisis.pctAdverso.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>
                    de {analisis.grupoAdverso} comercios
                  </div>
                  <div style={{ fontSize: '12px', color: COLORS.textTertiary, marginTop: '8px' }}>
                    ({analisis[tipo === 'crecimiento' ? 'adversoQuiereCrecer' : 'adversoInvierteTecnologia']} comercios)
                  </div>
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h5 style={{ color: COLORS.textSecondary, marginBottom: '10px' }}>
                  Grupo de comparación
                </h5>
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: COLORS.surface, 
                  borderRadius: '8px',
                  borderLeft: `4px solid ${COLORS.accent}`
                }}>
                  <div style={{ fontSize: '24px', color: COLORS.accent, fontWeight: 'bold' }}>
                    {analisis.pctComparacion.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>
                    de {analisis.grupoComparacion} comercios
                  </div>
                  <div style={{ fontSize: '12px', color: COLORS.textTertiary, marginTop: '8px' }}>
                    ({analisis[tipo === 'crecimiento' ? 'comparacionQuiereCrecer' : 'comparacionInvierteTecnologia']} comercios)
                  </div>
                </div>
              </div>
            </div>
            
            {/* Diferencia porcentual */}
            <div style={{ 
              padding: '15px', 
              backgroundColor: `${COLORS.primary}10`,
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: COLORS.text, fontWeight: '500' }}>
                Diferencia: <span style={{ color: COLORS.primary, fontWeight: 'bold' }}>
                  {(analisis.pctAdverso - analisis.pctComparacion).toFixed(1)} puntos porcentuales
                </span>
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '5px' }}>
                {analisis.pctAdverso > analisis.pctComparacion 
                  ? 'El grupo de análisis presenta un mayor porcentaje que el grupo de comparación'
                  : 'El grupo de análisis presenta un menor porcentaje que el grupo de comparación'}
              </div>
            </div>
            
            {/* Conclusión */}
            <div style={{ 
              padding: '20px', 
              backgroundColor: `${analisis.pctAdverso > analisis.pctComparacion ? COLORS.primary : COLORS.accent}15`,
              borderRadius: '8px',
              borderLeft: `4px solid ${analisis.pctAdverso > analisis.pctComparacion ? COLORS.primary : COLORS.accent}`
            }}>
              <div style={{ fontSize: '14px', color: COLORS.text, fontWeight: '500', marginBottom: '8px' }}>
                Conclusión:
              </div>
              <div style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                {analisis.pctAdverso > analisis.pctComparacion 
                  ? '✅ La hipótesis se sustenta en los datos analizados. Los comercios en zonas con alta percepción de crimen y sin acceso a crédito presentan efectivamente menores expectativas de crecimiento.'
                  : '❌ Los datos no respaldan completamente la hipótesis planteada. No se observa una diferencia significativa entre los grupos analizados.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Gráfico de distribución (Donut)
function GraficoDistribucion({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
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
      border: `1px solid ${COLORS.border}`,
      transition: 'all 0.3s ease'
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
        <svg width="200" height="200" viewBox="0 0 200 200" style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}>
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
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isVisible ? (hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 1) : 0,
                  transformOrigin: '100px 100px',
                  animationDelay: `${idx * 0.1}s`,
                  animation: isVisible ? `segmentFadeIn 0.6s ease-out forwards ${idx * 0.1}s` : 'none'
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

// Gráfico de barras - Trabajadores por tipo
function GraficoBarras({ data }) {
  // Mapear los datos del gráfico a los valores específicos que proporcionaste
  const trabajadoresData = [
    { tipo: "BARES Y PEQUEÑOS RESTAURANTES", promedio: 5.3 },
    { tipo: "CONFITERÍA O PANADERÍA", promedio: 4.6 },
    { tipo: "CAFETERÍAS", promedio: 4.4 },
    { tipo: "OTROS", promedio: 3.7 },
    { tipo: "FIAMBRERÍA", promedio: 3.0 },
    { tipo: "ALMACÉN", promedio: 2.9 },
    { tipo: "DIETÉTICAS", promedio: 2.7 },
    { tipo: "CARNICERÍA", promedio: 2.7 },
    { tipo: "GRANJA", promedio: 2.7 },
    { tipo: "KIOSKO", promedio: 2.4 }
  ];

  // Encontrar el valor máximo para calcular porcentajes
  const maxValor = Math.max(...trabajadoresData.map(item => item.promedio));
  
  return (
    <div style={{
      backgroundColor: COLORS.surface,
      padding: '40px',
      borderRadius: '4px',
      border: `1px solid ${COLORS.border}`,
      position: 'relative',
      transition: 'all 0.3s ease'
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
        Promedio de empleados por categoría • Pasa el mouse sobre las barras
      </p>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {trabajadoresData.map((item, idx) => {
          const porcentaje = (item.promedio / maxValor) * 100;
          const [isHovered, setIsHovered] = useState(false);
          
          return (
            <div 
              key={idx}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateX(8px)' : 'translateX(0)'
              }}
            >
              {/* Etiqueta del tipo */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  color: COLORS.text, 
                  fontWeight: '500',
                  fontSize: '13px',
                  transition: 'color 0.3s',
                  color: isHovered ? COLORS.primary : COLORS.text
                }}>
                  {item.tipo}
                </span>
                <span style={{
                  color: isHovered ? COLORS.accent : COLORS.primary,
                  fontWeight: '600',
                  fontSize: '15px',
                  fontFamily: '"Crimson Pro", serif',
                  transition: 'all 0.3s'
                }}>
                  {item.promedio.toFixed(1)}
                </span>
              </div>
              
              {/* Barra de progreso */}
              <div style={{
                position: 'relative',
                height: '8px',
                backgroundColor: COLORS.border,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                {/* Barra de fondo completa */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: `${COLORS.border}40`
                }} />
                
                {/* Barra de progreso con gradiente */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${porcentaje}%`,
                  height: '100%',
                  background: isHovered 
                    ? `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`
                    : `linear-gradient(90deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
                  borderRadius: '4px',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isHovered 
                    ? `0 0 12px ${COLORS.primary}60` 
                    : 'none',
                  transformOrigin: 'left center',
                  transform: isHovered ? 'scaleY(1.2)' : 'scaleY(1)'
                }}>
                  {/* Efecto de brillo en la barra */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '30%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))',
                    borderRadius: '4px'
                  }} />
                </div>
                
                {/* Marcadores de valores */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '0%',
                  fontSize: '10px',
                  color: COLORS.textSecondary,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s'
                }}>
                  0
                </div>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '100%',
                  transform: 'translateX(-100%)',
                  fontSize: '10px',
                  color: COLORS.textSecondary,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s'
                }}>
                  {maxValor.toFixed(1)}
                </div>
              </div>
              
              {/* Indicador de porcentaje */}
              <div style={{
                position: 'absolute',
                right: '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '11px',
                fontWeight: '600',
                color: COLORS.primary,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s',
                backgroundColor: `${COLORS.primary}15`,
                padding: '2px 6px',
                borderRadius: '3px'
              }}>
                {porcentaje.toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Leyenda */}
      <div style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: COLORS.textSecondary
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '4px',
            background: `linear-gradient(90deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
            borderRadius: '2px'
          }} />
          <span>Menos trabajadores</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '4px',
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            borderRadius: '2px'
          }} />
          <span>Más trabajadores</span>
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        paddingTop: '15px',
        borderTop: `1px dashed ${COLORS.border}`,
        fontSize: '12px',
        color: COLORS.textSecondary,
        textAlign: 'center'
      }}>
        Fuente: Encuesta de comercios locales • {trabajadoresData.length} tipos de comercio
      </div>
    </div>
  );
}

// Gráfico de barras horizontales - Fuentes de crédito
function GraficoBarrasHorizontales({ data, pctCredito }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const maxValue = Math.max(...data.map(d => d.cantidad));
  const barHeight = 45;
  const gap = 16;
  const chartHeight = data.length * (barHeight + gap) + 20;
  const maxBarWidth = 500;
  
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
        Fuentes de financiamiento
      </h3>
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        marginBottom: '16px',
        lineHeight: '1.6'
      }}>
        Del <strong style={{ color: COLORS.accent, fontSize: '16px' }}>{pctCredito}%</strong> de comercios que acceden a crédito, 
        estas son sus fuentes de financiamiento
      </p>
      
      {/* Aclaración destacada */}
      <div style={{
        marginBottom: '30px',
        padding: '16px 20px',
        backgroundColor: `${COLORS.accent}15`,
        borderRadius: '8px',
        border: `2px solid ${COLORS.accent}50`,
        borderLeft: `4px solid ${COLORS.accent}`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{
            minWidth: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '700',
            color: COLORS.background,
            marginTop: '2px'
          }}>
            i
          </div>
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '6px'
            }}>
              Múltiples fuentes simultáneas
            </div>
            <div style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.6'
            }}>
              Los porcentajes suman más de 100% porque <strong style={{ color: COLORS.text }}>un mismo comercio 
              puede acceder a varias fuentes de crédito al mismo tiempo</strong>. Por ejemplo, un comercio puede 
              tener crédito de proveedores y también préstamos familiares simultáneamente.
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ maxWidth: '700px' }}>
        {data.map((item, idx) => {
          const percentage = (item.cantidad / maxValue) * 100;
          const barWidth = (percentage / 100) * maxBarWidth;
          const isHovered = hoveredIndex === idx;
          
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                marginBottom: gap,
                transition: 'all 0.3s ease'
              }}
            >
              {/* Label de la fuente */}
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: COLORS.text,
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{item.fuente}</span>
                <span style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary,
                  fontWeight: '400'
                }}>
                  {item.cantidad} comercios
                </span>
              </div>
              
              {/* Barra */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: barHeight,
                backgroundColor: `${COLORS.border}40`,
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                {/* Barra de progreso con gradiente */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${percentage}%`,
                  background: isHovered 
                    ? `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`
                    : `linear-gradient(90deg, ${COLORS.primary}e0, ${COLORS.primary}a0)`,
                  borderRadius: '8px',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isHovered ? `0 4px 12px ${COLORS.primary}40` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '12px'
                }}>
                  {/* Porcentaje dentro de la barra */}
                  {percentage > 15 && (
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: COLORS.background,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      {item.porcentaje}%
                    </span>
                  )}
                </div>
                
                {/* Porcentaje fuera de la barra si es muy pequeña */}
                {percentage <= 15 && (
                  <div style={{
                    position: 'absolute',
                    right: '-50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: COLORS.primary
                  }}>
                    {item.porcentaje}%
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Gráfico tierlist - Adopción tecnológica
function GraficoTierlist({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  const tierConfig = {
    'Alto': {
      color: COLORS.primary,
      gradient: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
      label: 'Nivel Avanzado',
      badge: 'Alto'
    },
    'Moderado': {
      color: COLORS.accent,
      gradient: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
      label: 'Nivel Intermedio',
      badge: 'Moderado'
    },
    'Básico': {
      color: COLORS.primaryLight,
      gradient: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.primary})`,
      label: 'Nivel Inicial',
      badge: 'Básico'
    }
  };
  
  const tierDetails = {
    'Alto': {
      titulo: 'Digitalización Avanzada',
      items: [
        { texto: 'Presencia activa en redes sociales (Instagram, Facebook, TikTok)' },
        { texto: 'E-commerce funcional con catálogo online y pagos digitales' },
        { texto: 'Software de gestión de stock y inventario' },
        { texto: 'Sistema POS integrado con múltiples métodos de pago' },
        { texto: 'Analytics y métricas de ventas digitales' },
        { texto: 'Automatización de procesos (facturación, recordatorios)' }
      ]
    },
    'Moderado': {
      titulo: 'Digitalización Intermedia',
      items: [
        { texto: 'WhatsApp Business para atención al cliente' },
        { texto: 'Apps de mensajería para pedidos y consultas' },
        { texto: 'Códigos QR para pagos (Mercado Pago, Modo, etc.)' },
        { texto: 'Aceptación de transferencias bancarias' },
        { texto: 'Catálogo digital básico (PDF o fotos)' },
        { texto: 'Email para comunicación con clientes' }
      ]
    },
    'Básico': {
      titulo: 'Digitalización Inicial',
      items: [
        { texto: 'Teléfono celular para contacto' },
        { texto: 'Tarjeta de débito/crédito física' },
        { texto: 'Registro manual o digital simple de ventas' },
        { texto: 'Calculadora para operaciones básicas' },
        { texto: 'Línea telefónica fija o móvil' },
        { texto: 'Facturación tradicional sin sistema integrado' }
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
        fontSize: '14px',
        color: COLORS.textSecondary,
        marginBottom: '40px',
        lineHeight: '1.6'
      }}>
        Clasificación de comercios según nivel de digitalización • Click para ver detalles
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {orderedData.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          const isExpanded = expandedIndex === idx;
          const config = tierConfig[item.nivel];
          const details = tierDetails[item.nivel];
          
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              style={{
                position: 'relative',
                padding: '0',
                backgroundColor: COLORS.background,
                border: `2px solid ${isHovered || isExpanded ? config.color : COLORS.border}`,
                borderRadius: '16px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                cursor: 'pointer',
                boxShadow: isHovered || isExpanded 
                  ? `0 12px 32px ${config.color}30` 
                  : '0 4px 12px rgba(0,0,0,0.2)',
                overflow: 'hidden'
              }}
            >
              {/* Header con gradiente */}
              <div style={{
                background: config.gradient,
                padding: '28px 32px',
                position: 'relative'
              }}>
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '32px',
                  padding: '6px 14px',
                  backgroundColor: `${COLORS.background}90`,
                  backdropFilter: 'blur(8px)',
                  color: COLORS.text,
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  borderRadius: '20px',
                  textTransform: 'uppercase'
                }}>
                  {config.badge}
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}>
                  <div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: COLORS.background,
                      marginBottom: '8px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {config.label}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: `${COLORS.background}d0`,
                      fontWeight: '500'
                    }}>
                      {item.cantidad} comercios
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '6px'
                  }}>
                    <div style={{
                      fontSize: '56px',
                      fontWeight: '300',
                      fontFamily: '"Crimson Pro", serif',
                      color: COLORS.background,
                      lineHeight: '1',
                      textShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}>
                      {item.porcentaje}
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: `${COLORS.background}c0`,
                      marginBottom: '8px'
                    }}>
                      %
                    </div>
                  </div>
                </div>
                
                {/* Barra de progreso integrada */}
                <div style={{
                  marginTop: '20px',
                  height: '8px',
                  backgroundColor: `${COLORS.background}40`,
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${item.porcentaje}%`,
                    backgroundColor: COLORS.background,
                    transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 0 16px rgba(255,255,255,0.5)'
                  }} />
                </div>
              </div>
              
              {/* Footer con indicador expandible */}
              <div style={{
                padding: '16px 32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: isExpanded ? `${config.color}10` : 'transparent',
                transition: 'all 0.3s'
              }}>
                <span style={{
                  fontSize: '13px',
                  color: config.color,
                  fontWeight: '600'
                }}>
                  {isExpanded ? 'Ocultar detalles' : 'Ver qué incluye'}
                </span>
                <div style={{
                  fontSize: '12px',
                  transition: 'transform 0.3s',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: config.color
                }}>
                  ▼
                </div>
              </div>
              
              {/* Contenido expandible */}
              {isExpanded && (
                <div style={{
                  padding: '0 32px 32px',
                  animation: 'slideDown 0.4s ease-out'
                }}>
                  <style>{`
                    @keyframes slideDown {
                      from {
                        opacity: 0;
                        transform: translateY(-20px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>
                  
                  <div style={{
                    padding: '24px',
                    backgroundColor: `${config.color}08`,
                    borderRadius: '12px',
                    border: `1px solid ${config.color}20`
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: COLORS.text,
                      marginBottom: '20px'
                    }}>
                      {details.titulo}
                    </h4>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '12px'
                    }}>
                      {details.items.map((detail, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            fontSize: '13px',
                            color: COLORS.textSecondary,
                            lineHeight: '1.6'
                          }}
                        >
                          <div style={{
                            minWidth: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: config.color,
                            marginTop: '6px'
                          }} />
                          <span>{detail.texto}</span>
                        </div>
                      ))}
                    </div>
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
            Salario mínimo a percibir
          </h3>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            marginBottom: '16px'
          }}>
            Rango salarial que los comerciantes están dispuestos a ofrecer (100k - 5M ARS)
          </p>
          
          {/* Disclaimer de calidad de datos */}
          <div style={{
            marginBottom: '20px',
            padding: '14px 18px',
            backgroundColor: `${COLORS.accent}12`,
            borderRadius: '8px',
            border: `1px solid ${COLORS.accent}40`,
            borderLeft: `4px solid ${COLORS.accent}`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <div style={{
                fontSize: '16px',
                color: COLORS.accent,
                marginTop: '2px'
              }}>
                ⚠
              </div>
              <div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Nota sobre los datos
                </div>
                <div style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary,
                  lineHeight: '1.6'
                }}>
                  Esta pregunta tuvo <strong style={{ color: COLORS.text }}>{data.totalRespuestas || 'pocas'} respuestas válidas</strong>. 
                  Se detectaron outliers extremos y datos inconsistentes que fueron filtrados (rango: $100k-$1.3M). 
                  Los valores presentados deben interpretarse con cautela debido al tamaño limitado de la muestra.
                </div>
              </div>
            </div>
          </div>
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
          {/* Estadísticas principales - Solo promedio */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              padding: '30px 60px',
              backgroundColor: COLORS.background,
              borderRadius: '8px',
              textAlign: 'center',
              border: `2px solid ${COLORS.primary}40`,
              boxShadow: `0 4px 16px ${COLORS.primary}20`
            }}>
              <div style={{
                fontSize: '13px',
                color: COLORS.textSecondary,
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: '600'
              }}>
                Promedio
              </div>
              <div style={{
                fontSize: '36px',
                fontWeight: '700',
                color: COLORS.primary,
                fontFamily: '"Crimson Pro", serif'
              }}>
                {formatCurrency(data.promedio)}
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
                      backgroundColor: COLORS.accent,
                      opacity: 0.6
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '10px',
                        color: COLORS.accent,
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

// === SECCIÁ“N DE ANÁLISIS ===
function SeccionAnalisis() {
  return (
    <section id="analisis" style={{
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
        <AnimatedModelCard delay={0}>
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

        </AnimatedModelCard>
      <AnimatedModelCard delay={200}>
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
      </AnimatedModelCard>
      </div>
    </section>
  );
}

// === SECCIÁ“N MACHINE LEARNING ===
function Team() {
  return (
    <section id="equipo" style={{
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
            Sobre nosotros
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text
          }}>
            ¿Quiénes somos?
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
  const [isVisible, setIsVisible] = useState(false);
  const memberRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100); // Delay más corto
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (memberRef.current) {
      observer.observe(memberRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={memberRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.6s ease-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(15px)' // Menos movimiento
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
              objectPosition: 'center 25%',
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
    <section id="mapa" style={{
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
          <button
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
          <button
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
          <button
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

// === FOOTER ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
