// === SOBRE LA PLATAFORMA ===
function SobrePlataforma({ language = 'es' }) {
  const t = (key) => getTranslation(language, key);
  
  return (
    <section id="sobre-plataforma" className="fade-up" style={{
      padding: '120px 60px',
      backgroundColor: COLORS.background,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`
    }}>
      <div style={{
        maxWidth: '1400px',
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
            {t('aboutSubtitle')}
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            {t('aboutTitle')}
          </h2>
          <p style={{
            fontSize: '16px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            {t('aboutDescription')}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '80px',
          maxWidth: '800px',
          margin: '0 auto 80px'
        }}>
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
                  {t('aboutDashboard')}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary
                }}>
                  {t('aboutViewOnline')}
                </div>
              </div>
            </div>
          </div>

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
                alt="QR GitHub"
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
                  {t('aboutGithub')}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: COLORS.textSecondary
                }}>
                  {t('aboutSourceCode')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección sobre el desarrollo técnico */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px',
          backgroundColor: COLORS.surface,
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`
        }}>
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '28px',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {t('aboutTechTitle')}
          </h3>

          <div style={{
            fontSize: '14px',
            color: COLORS.textSecondary,
            lineHeight: '1.8',
            marginBottom: '30px'
          }}>
            <p style={{ marginBottom: '16px' }}>
              {t('aboutTechIntro')}
            </p>
          </div>

          {/* Stack técnico */}
          <div style={{
            padding: '24px',
            backgroundColor: COLORS.background,
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.primary,
              marginBottom: '16px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {t('aboutTechStackTitle')}
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: '8px' }}>
                  {t('aboutTechFrontend')}
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textSecondary, lineHeight: '1.6' }}>
                  React 18, Babel Standalone, JSX
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: '8px' }}>
                  {t('aboutTechData')}
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textSecondary, lineHeight: '1.6' }}>
                  Python, Pandas, Scikit-learn
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: '8px' }}>
                  {t('aboutTechMaps')}
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textSecondary, lineHeight: '1.6' }}>
                  Leaflet.js, OpenStreetMap
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: '8px' }}>
                  {t('aboutTechML')}
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textSecondary, lineHeight: '1.6' }}>
                  Random Forest, Statistical Tests
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: '8px' }}>
                  {t('aboutTechDeployment')}
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textSecondary, lineHeight: '1.6' }}>
                  Vercel con integración continua
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: '8px' }}>
                  {t('aboutTechVersionControl')}
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textSecondary, lineHeight: '1.6' }}>
                  GitHub
                </div>
              </div>
            </div>
          </div>

          {/* Formación Académica */}
          <div style={{
            padding: '24px',
            backgroundColor: `${COLORS.accent}08`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.accent}`,
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.accent,
              marginBottom: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {t('aboutAcademicTitle')}
            </h4>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.7',
              margin: 0
            }}>
              {t('aboutAcademicText')}
            </p>
          </div>

          {/* Metodología de desarrollo */}
          <div style={{
            padding: '24px',
            backgroundColor: `${COLORS.primary}08`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.primary}`
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.primary,
              marginBottom: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {t('aboutTechMethodTitle')}
            </h4>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.7',
              marginBottom: '12px'
            }}>
              {t('aboutTechMethodText')}
            </p>
            <div style={{
              fontSize: '12px',
              color: COLORS.textTertiary,
              fontStyle: 'italic'
            }}>
              {t('aboutTechMethodNote')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
