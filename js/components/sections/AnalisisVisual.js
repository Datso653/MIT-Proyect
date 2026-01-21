// === ANÁLISIS VISUAL ===
function AnalisisVisual({ data, indicadores, datos, language = 'es' }) {
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
    <section id="analisis-visual" className="fade-up" ref={sectionRef} style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Imagen de fondo - Análisis de datos */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.12,
        filter: 'grayscale(50%) brightness(0.7)',
        zIndex: 0
      }} />
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}fa 0%, ${COLORS.background}f0 50%, ${COLORS.background}fa 100%)`,
        zIndex: 1
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
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
          {getTranslation(language, 'analysisSubtitle')}
        </div>
        <h2 style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: '400',
          color: COLORS.text,
          marginBottom: '20px'
        }}>
          {getTranslation(language, 'analysisTitle')}
        </h2>
        <p style={{
          fontSize: '16px',
          color: COLORS.textSecondary,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {getTranslation(language, 'analysisDescription')}
        </p>
      </div>

      {/* Primera fila: Distribución de comercios y Trabajadores */}
      <div 
        data-index="0"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
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
          <GraficoDistribucion data={data.distribucionComercios} language={language} />
        </div>
        <div style={{
          opacity: visibleItems.has('0') ? 1 : 0,
          transform: visibleItems.has('0') ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
        }}>
          <GraficoBarras data={data.trabajadoresPorTipo} language={language} />
        </div>
      </div>
      {/* Tercera fila: Adopción tecnológica y Salarios */}
      <div 
        data-index="2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
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
          <GraficoTierlist data={data.adopcionTecnologica} language={language} />
        </div>
        <div style={{
          opacity: visibleItems.has('2') ? 1 : 0,
          transform: visibleItems.has('2') ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
        }}>
          <GraficoSalarios data={data.salarioData} language={language} />
        </div>
      </div>
      {/* Segunda fila: Fuentes de crédito (barras horizontales) */}
      <div
        data-index="1"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '60px',
          opacity: visibleItems.has('1') ? 1 : 0,
          transform: visibleItems.has('1') ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <GraficoBarrasHorizontales data={data.creditoPorFuente} pctCredito={indicadores?.pctCredito || 0} language={language} />
        </div>
      </div>
      </div>
    </section>
  );
}


function GraficoDistribucion({ data, language = 'es' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const t = (key) => getTranslation(language, key);

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
        {t('analysisDistribution')}
      </h3>
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '30px'
      }}>
        {t('analysisDistributionSub').replace('{count}', total)}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* SVG Donut Chart */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg width="280" height="280" viewBox="0 0 280 280" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'opacity 1s ease-out, transform 1s ease-out'
          }}>
            {segments.map((seg, idx) => {
              const isHovered = hoveredIndex === idx;
              const radius = isHovered ? 110 : 105;
              const innerRadius = 60;
              const x1 = 140 + radius * Math.cos((seg.startAngle - 90) * Math.PI / 180);
              const y1 = 140 + radius * Math.sin((seg.startAngle - 90) * Math.PI / 180);
              const x2 = 140 + radius * Math.cos((seg.endAngle - 90) * Math.PI / 180);
              const y2 = 140 + radius * Math.sin((seg.endAngle - 90) * Math.PI / 180);
              const x3 = 140 + innerRadius * Math.cos((seg.endAngle - 90) * Math.PI / 180);
              const y3 = 140 + innerRadius * Math.sin((seg.endAngle - 90) * Math.PI / 180);
              const x4 = 140 + innerRadius * Math.cos((seg.startAngle - 90) * Math.PI / 180);
              const y4 = 140 + innerRadius * Math.sin((seg.startAngle - 90) * Math.PI / 180);
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
                  strokeWidth="3"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isVisible ? (hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 1) : 0,
                    transformOrigin: '140px 140px',
                    animationDelay: `${idx * 0.1}s`,
                    animation: isVisible ? `segmentFadeIn 0.6s ease-out forwards ${idx * 0.1}s` : 'none'
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>
        </div>
        {/* Legend */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {segments.map((seg, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 1,
                transition: 'opacity 0.3s'
              }}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: seg.color, marginRight: '10px', borderRadius: '2px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '2px' }}>
                  {seg.tipo}
                </div>
                <div style={{ fontSize: '11px', color: COLORS.textSecondary }}>
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
function GraficoBarras({ data, language = 'es' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const t = (key) => getTranslation(language, key);

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

  const maxValor = Math.max(...trabajadoresData.map(item => item.promedio));

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
        {t('analysisWorkers')}
      </h3>
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '30px'
      }}>
        {t('analysisWorkersSub')}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {trabajadoresData.map((item, idx) => {
          const porcentaje = (item.promedio / maxValor) * 100;
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateX(8px)' : 'translateX(0)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: isHovered ? COLORS.primary : COLORS.text, fontWeight: '500', fontSize: '13px', transition: 'color 0.3s' }}>
                  {item.tipo}
                </span>
                <span style={{ color: isHovered ? COLORS.accent : COLORS.primary, fontWeight: '600', fontSize: '15px', fontFamily: '"Crimson Pro", serif', transition: 'all 0.3s' }}>
                  {item.promedio.toFixed(1)}
                </span>
              </div>
              <div style={{ position: 'relative', height: '8px', backgroundColor: COLORS.border, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${porcentaje}%`, backgroundColor: COLORS.primary, borderRadius: '4px', transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// Gráfico de barras horizontales - Fuentes de crédito
function GraficoBarrasHorizontales({ data, pctCredito, language = 'es' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const t = (key) => getTranslation(language, key);

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
        {t('analysisFinancing')}
      </h3>
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        marginBottom: '16px',
        lineHeight: '1.6'
      }}>
        {t('analysisFinancingDescription').replace('{pct}', pctCredito)}
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
              {t('analysisFinancingNote')}
            </div>
            <div style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.6'
            }}>
              {t('analysisFinancingNoteText')}
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
                  {item.cantidad} {t('analysisFinancingCommerces')}
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
function GraficoTierlist({ data, language = 'es' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const t = (key) => getTranslation(language, key);

  const tierConfig = {
    'Alto': {
      color: COLORS.primary,
      gradient: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
      label: t('analysisTechLevelAdvanced'),
      badge: t('analysisTechBadgeHigh')
    },
    'Moderado': {
      color: COLORS.accent,
      gradient: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
      label: t('analysisTechLevelIntermediate'),
      badge: t('analysisTechBadgeMod')
    },
    'Básico': {
      color: COLORS.primaryLight,
      gradient: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.primary})`,
      label: t('analysisTechLevelInitial'),
      badge: t('analysisTechBadgeBasic')
    }
  };
  
  const tierDetails = {
    'Alto': {
      titulo: t('analysisTechAdvancedTitle'),
      items: [
        { texto: t('techAdvancedItem1') },
        { texto: t('techAdvancedItem2') },
        { texto: t('techAdvancedItem3') },
        { texto: t('techAdvancedItem4') },
        { texto: t('techAdvancedItem5') },
        { texto: t('techAdvancedItem6') }
      ]
    },
    'Moderado': {
      titulo: t('analysisTechIntermediateTitle'),
      items: [
        { texto: t('techModerateItem1') },
        { texto: t('techModerateItem2') },
        { texto: t('techModerateItem3') },
        { texto: t('techModerateItem4') },
        { texto: t('techModerateItem5') },
        { texto: t('techModerateItem6') }
      ]
    },
    'Básico': {
      titulo: t('analysisTechBasicTitle'),
      items: [
        { texto: t('techBasicItem1') },
        { texto: t('techBasicItem2') },
        { texto: t('techBasicItem3') },
        { texto: t('techBasicItem4') },
        { texto: t('techBasicItem5') },
        { texto: t('techBasicItem6') }
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
        {t('analysisTech')}
      </h3>
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        marginBottom: '40px',
        lineHeight: '1.6'
      }}>
        {t('analysisTechDescription')}
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
                  {isExpanded ? t('analysisTechHideDetails') : t('analysisTechViewDetails')}
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
function GraficoSalarios({ data, language = 'es' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [viewMode, setViewMode] = useState('general'); // 'general' o 'porComercio'
  const t = (key) => getTranslation(language, key);

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
            {t('analysisSalary')}
          </h3>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            marginBottom: '16px'
          }}>
            {t('analysisSalaryDescription')}
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
          <button aria-label="Ver vista general"
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
          <button aria-label="Ver por tipo de comercio"
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
