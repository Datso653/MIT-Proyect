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
  background: '#0a0a0a',
  surface: '#1a1a1a',
  surfaceHover: '#242424',
  primary: '#4FC3F7',
  primaryDark: '#29B6F6',
  primaryLight: '#81D4FA',
  text: '#f5f5f5',
  textSecondary: '#a8a8a8',
  border: '#2a2a2a',
  chartColors: ['#4FC3F7', '#29B6F6', '#81D4FA', '#0288D1', '#03A9F4', '#00BCD4', '#26C6DA', '#00ACC1']
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
      {datosGraficos && <AnalisisVisual data={datosGraficos} />}
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
          <span>2024</span>
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
      description: 'Proyecciones de crecimiento'
    },
    { 
      label: 'Adopción Tecnológica', 
      value: parseFloat(data.pctTecnologia), 
      max: 100,
      suffix: '%',
      description: 'Uso de tecnología digital'
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
  
  const maxValue = Math.max(...data.map(d => d.promedio));
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
            const x = idx * (barWidth + gap);
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
  
  const tierColors = {
    'Alto': '#00E676',      // Verde brillante
    'Moderado': COLORS.primary,  // Celeste
    'Básico': '#FFB74D'     // Naranja
  };
  
  const tierLabels = {
    'Alto': 'S Tier',
    'Moderado': 'A Tier',
    'Básico': 'B Tier'
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
        marginBottom: '40px'
      }}>
        Clasificación de comercios según nivel de digitalización
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orderedData.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          const tierColor = tierColors[item.nivel];
          
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                padding: '30px',
                backgroundColor: COLORS.background,
                border: `2px solid ${isHovered ? tierColor : COLORS.border}`,
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
                
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  fontFamily: '"Crimson Pro", serif',
                  color: tierColor
                }}>
                  {item.porcentaje}%
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
        marginBottom: '30px'
      }}>
        Rango salarial que los comerciantes están dispuestos a ofrecer
      </p>
      
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

  // Salario mínimo dispuesto a pagar
  const salarios = datos
    .map(c => parseFloat(c.min_salario))
    .filter(s => !isNaN(s) && s > 0);
  
  const promedioSalario = salarios.length > 0 
    ? salarios.reduce((acc, s) => acc + s, 0) / salarios.length 
    : 0;

  const minSalario = salarios.length > 0 ? Math.min(...salarios) : 0;
  const maxSalario = salarios.length > 0 ? Math.max(...salarios) : 0;
  
  // Distribución de salarios en rangos
  const rangos = [
    { min: 0, max: 200000, label: '< $200k' },
    { min: 200000, max: 300000, label: '$200k - $300k' },
    { min: 300000, max: 400000, label: '$300k - $400k' },
    { min: 400000, max: 500000, label: '$400k - $500k' },
    { min: 500000, max: Infinity, label: '> $500k' }
  ];

  const distribucionSalarios = rangos.map(rango => {
    const cantidad = salarios.filter(s => s >= rango.min && s < rango.max).length;
    return {
      rango: rango.label,
      cantidad,
      porcentaje: parseFloat(((cantidad / salarios.length) * 100).toFixed(1))
    };
  });

  return {
    distribucionComercios,
    trabajadoresPorTipo: trabajadoresData,
    creditoPorFuente,
    adopcionTecnologica,
    salarioData: {
      promedio: parseFloat(promedioSalario.toFixed(0)),
      minimo: minSalario,
      maximo: maxSalario,
      distribucion: distribucionSalarios
    }
  };
}

// === RENDERIZAR ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);