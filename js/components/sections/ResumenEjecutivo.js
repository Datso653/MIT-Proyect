// === RESUMEN EJECUTIVO ===
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


