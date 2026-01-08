
const { useState, useEffect, useRef } = React;

// === DATOS DEL PROYECTO ===
const TEAM_DATA = {
  name: "GreenThunder",
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
  background: '#0a0a0a',
  surface: '#1a1a1a',
  surfaceHover: '#242424',
  primary: '#d4af37',
  primaryDark: '#b8963c',
  text: '#f5f5f5',
  textSecondary: '#a8a8a8',
  border: '#2a2a2a'
};

// === COMPONENTE PRINCIPAL ===
function App() {
  const [datos, setDatos] = useState([]);
  const [indicadores, setIndicadores] = useState(null);
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
      minHeight: '100vh'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
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
      {indicadores && <Indicadores data={indicadores} />}
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
    <section style={{
      height: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${COLORS.background} 0%, #1a1a1a 100%)`
    }}>
      {/* Decorative elements */}
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
        padding: '0 60px',
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
            Valle de Uco
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
          <span>2024</span>
        </div>
      </div>
      
      {/* Scroll indicator */}
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

// === INDICADORES ===
function Indicadores({ data }) {
  const indicadores = [
    { label: 'Comercios Analizados', value: data.total, suffix: '' },
    { label: 'Trabajadores Promedio', value: data.promTrabajadores, suffix: '' },
    { label: 'Horas de Operación', value: data.promHoras, suffix: 'hs' },
    { label: 'Acceso a Crédito', value: data.pctCredito, suffix: '%' },
    { label: 'Expectativas Positivas', value: data.pctExpectativas, suffix: '%' },
    { label: 'Adopción Tecnológica', value: data.pctTecnologia, suffix: '%' },
    { label: 'Local Propio', value: data.pctLocalPropio, suffix: '%' },
    { label: 'Años en Operación', value: data.promAñosOperacion, suffix: '' }
  ];

  return (
    <section style={{
      padding: '120px 60px',
      backgroundColor: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
          gap: '1px',
          background: COLORS.border
        }}>
          {indicadores.map((ind, index) => (
            <IndicadorCard key={index} {...ind} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndicadorCard({ label, value, suffix, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: COLORS.surface,
        padding: '50px 30px',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hover gradient */}
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
        fontFamily: '"Crimson Pro", serif',
        fontSize: 'clamp(42px, 5vw, 56px)',
        fontWeight: '300',
        color: COLORS.text,
        marginBottom: '12px',
        letterSpacing: '-0.02em'
      }}>
        {value}<span style={{ fontSize: '0.6em', color: COLORS.primary }}>{suffix}</span>
      </div>
      
      <div style={{
        fontSize: '13px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: COLORS.textSecondary,
        fontWeight: '500'
      }}>
        {label}
      </div>
    </div>
  );
}

// === TEAM ===
function Team() {
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
      {/* Image container */}
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
        
        {/* Overlay gradient */}
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
      
      {/* Info */}
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
      backgroundColor: COLORS.surface
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
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
            Contacto
          </h4>
          <div style={{
            fontSize: '14px',
            color: COLORS.textSecondary,
            lineHeight: '2'
          }}>
            Buenos Aires, Argentina
            <br />
            2024
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
          © 2024 MIT LIFT Lab · Equipo {TEAM_DATA.name}
        </div>
        <div style={{
          display: 'flex',
          gap: '30px'
        }}>
          <span>Proyecto académico</span>
          <span>Universidad de Buenos Aires</span>
        </div>
      </div>
    </footer>
  );
}

// === FUNCIONES AUXILIARES ===
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
    c.exp_ventas_3mes === 'Aumentarán' || 
    c.exp_ventas_3mes === 'aumentarán'
  ).length;
  const pctExpectativas = total > 0 ? (expPositivas / total) * 100 : 0;

  const usanTecnologia = datos.filter(c => 
    c.tecnologia === 'Sí' || c.tecnologia === 'sí'
  ).length;
  const pctTecnologia = total > 0 ? (usanTecnologia / total) * 100 : 0;

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
    pctTecnologia: formatearNumero(pctTecnologia),
    pctLocalPropio: formatearNumero(pctLocalPropio),
    promAñosOperacion: formatearNumero(promAñosOperacion)
  };
}

// === RENDERIZAR ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);