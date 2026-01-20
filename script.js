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
    fetch(`datos/datos_comercios.json?v=${timestamp}`)
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
          
          /* === SOBRE PLATAFORMA (QR CODES) === */
          #sobre-plataforma {
            padding: 60px 20px !important;
          }
          
          #sobre-plataforma > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          /* === PROJECT INTRO === */
          #intro {
            padding: 60px 20px !important;
          }
          
          #intro > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          /* === INDICADORES === */
          #indicadores {
            padding: 60px 20px !important;
          }
          
          #indicadores > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          /* === UNIVERSIDADES PARTICIPANTES === */
          .logos-container {
            animation: none !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            scroll-behavior: smooth !important;
            padding: 0 20px !important;
          }
          
          .logos-container::-webkit-scrollbar {
            display: none;
          }
          
          .logos-container > div {
            min-width: 200px !important;
            height: 160px !important;
            padding: 24px !important;
          }
          
          .logos-container > div img {
            max-width: 100px !important;
            max-height: 70px !important;
          }
          
          /* === TEAM === */
          #equipo {
            padding: 60px 20px !important;
          }
          
          #equipo > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          /* === SECCIÓN MACHINE LEARNING === */
          #machine-learning {
            padding: 60px 20px !important;
          }
          
          #machine-learning > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          #machine-learning div[style*="borderRadius: '8px'"] {
            padding: 20px !important;
          }
          
          #machine-learning div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          
          #machine-learning h3 {
            font-size: 20px !important;
          }
          
          /* === ANÁLISIS VISUAL === */
          #analisis-visual {
            padding: 60px 20px !important;
          }
          
          #analisis-visual > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          #analisis-visual div[style*="overflowX: 'auto'"] {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          #analisis-visual svg {
            min-width: 500px !important;
            max-width: none !important;
            height: auto !important;
          }
          
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
          
          #machine-learning,
          #analisis-visual {
            padding: 50px 16px !important;
          }
          
          #machine-learning div[style*="borderRadius: '8px'"],
          #analisis-visual > div > div > div {
            padding: 16px !important;
          }
          
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
      <SobrePlataforma />
      <ProjectIntro />
      <UniversidadesParticipantes />
      {indicadores && <Indicadores data={indicadores} />}
      {datos.length > 0 && <Mapa datos={datos} />}
      {indicadores && <ResumenEjecutivo indicadores={indicadores} />}
      {datosGraficos && indicadores && <AnalisisVisual data={datosGraficos} indicadores={indicadores} datos={datos} />}
      {indicadores && <HallazgosPrincipales indicadores={indicadores} />}
      <SeccionMachineLearning datos={datos} />
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
    { id: 'sobre-plataforma', label: 'Accede a la plataforma' },
    { id: 'intro', label: 'Introducción' },
    { id: 'universidades', label: 'Universidades Participantes' },
    { id: 'mapa', label: 'Mapa' },
    { id: 'indicadores', label: 'Indicadores' },
    { id: 'hipotesis', label: 'Hipótesis Geoespaciales' },
    { id: 'analisis-visual', label: 'Análisis Visual' },
    { id: 'hallazgos', label: 'Hallazgos Principales' },
    { id: 'machine-learning', label: 'Análisis de Hipótesis Geoespaciales' },
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
    <section id="universidades" style={{
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

// === FOOTER ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
