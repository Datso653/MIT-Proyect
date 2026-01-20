// === SOBRE LA PLATAFORMA ===
function SobrePlataforma() {
  return (
    <section id="sobre-plataforma" className="fade-up" style={{
      padding: '120px 60px',
      backgroundColor: COLORS.background,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Plataforma Interactiva
          </div>
          
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Acerca de la página
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Escanea los códigos QR para acceder al dashboard o explorar el código fuente
          </p>
        </div>

        {/* Grid de 2 QR Codes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '80px',
          maxWidth: '800px',
          margin: '0 auto 80px'
        }}>
          
          {/* QR Plataforma */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              padding: '30px',
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img loading="lazy" 
                src="img/CodigoQRPAG.png" 
                alt="QR Dashboard"
                style={{
                  width: '220px',
                  height: '220px',
                  display: 'block'
                }}
              />
              <div style={{
                marginTop: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: COLORS.primary,
                  marginBottom: '4px'
                }}>
                  Dashboard Interactivo
                </div>
                <div style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary
                }}>
                  Explorar análisis
                </div>
              </div>
            </div>
          </div>

          {/* QR Repositorio */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              padding: '30px',
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img loading="lazy" 
                src="img/QRREPO.png" 
                alt="QR Repositorio"
                style={{
                  width: '220px',
                  height: '220px',
                  display: 'block'
                }}
              />
              <div style={{
                marginTop: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: COLORS.accent,
                  marginBottom: '4px'
                }}>
                  Repositorio GitHub
                </div>
                <div style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary
                }}>
                  Ver código fuente
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sección: Cómo construimos esta plataforma */}
        <div>
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '28px',
            fontWeight: '500',
            color: COLORS.text,
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Cómo construimos esta plataforma
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>

            
            {/* Vibecoding */}
            <div style={{
              padding: '20px',
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderLeft: `4px solid ${COLORS.primary}`,
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: COLORS.primary,
                marginBottom: '8px'
              }}>
                Vibecoding & Learning by Doing
              </div>
              <div style={{
                fontSize: '13px',
                color: COLORS.textSecondary,
                lineHeight: '1.6'
              }}>
                Desarrollo iterativo y aprendizaje continuo mediante la práctica directa con tecnologías web modernas.
              </div>
            </div>

            {/* Formación académica */}
            <div style={{
              padding: '20px',
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderLeft: `4px solid ${COLORS.accent}`,
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: COLORS.accent,
                marginBottom: '8px'
              }}>
                Formación Académica
              </div>
              <div style={{
                fontSize: '13px',
                color: COLORS.textSecondary,
                lineHeight: '1.6'
              }}>
                Cursos y metodologías de MIT, UBA, UNSAM fundamentales para el análisis de datos y visualización.
              </div>
            </div>

            {/* Stack tecnológico */}
            <div style={{
              padding: '20px',
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderLeft: `4px solid ${COLORS.primaryLight}`,
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: COLORS.primaryLight,
                marginBottom: '8px'
              }}>
                Stack Tecnológico
              </div>
              <div style={{
                fontSize: '13px',
                color: COLORS.textSecondary,
                lineHeight: '1.6'
              }}>
                <strong style={{ color: COLORS.text }}>Frontend:</strong> React, JavaScript, HTML/CSS<br/>
                <strong style={{ color: COLORS.text }}>Análisis de datos:</strong> Python<br/>
                <strong style={{ color: COLORS.text }}>Deployment:</strong> Vercel con integración continua<br/>
                <strong style={{ color: COLORS.text }}>Control de versiones:</strong> GitHub
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
