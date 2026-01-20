// === SOBRE LA PLATAFORMA ===
function SobrePlataforma() {
  return (
    <section id="sobre-plataforma" style={{
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
            Accede a la plataforma
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Escanea el código QR para explorar el dashboard interactivo desde tu dispositivo
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          
          {/* QR Code */}
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
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="img/CodigoQRPAG.png" 
                alt="QR Code" 
                style={{
                  width: '250px',
                  height: '250px',
                  display: 'block'
                }}
              />
              <div style={{
                marginTop: '20px',
                textAlign: 'center',
                fontSize: '13px',
                color: COLORS.textSecondary
              }}>
                Escanea para acceder
              </div>
            </div>
          </div>

          {/* Información técnica */}
          <div>
            <h3 style={{
              fontFamily: '"Crimson Pro", serif',
              fontSize: '28px',
              fontWeight: '500',
              color: COLORS.text,
              marginBottom: '24px'
            }}>
              Cómo construimos esta plataforma
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
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
                  <strong style={{ color: COLORS.text }}>Deployment:</strong> Vercel con integración continua<br/>
                  <strong style={{ color: COLORS.text }}>Control de versiones:</strong> GitHub
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
