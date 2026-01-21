// === HALLAZGOS PRINCIPALES ===
function HallazgosPrincipales({ indicadores, language = 'es' }) {
  if (!indicadores) return null;
  
  const t = (key) => getTranslation(language, key);
  const titleText = t('findingsTitle').replace('{count}', indicadores.total);

  return (
    <section id="hallazgos" className="fade-up" style={{
      padding: '120px 60px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: COLORS.background,
      borderTop: `1px solid ${COLORS.border}`
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.75,
        filter: 'grayscale(10%) brightness(1.0)',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}f5 0%, ${COLORS.background}e8 50%, ${COLORS.background}f5 100%)`,
        zIndex: 1
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            {t('findingsSubtitle')}
          </div>

          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            {titleText}
          </h2>

          <p style={{
            fontSize: '16px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {t('findingsDescription')}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          <div style={{
            padding: '32px',
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.primary}`
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.primary,
              marginBottom: '12px',
              letterSpacing: '0.05em'
            }}>
              01
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              {t('finding1Title')}
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: COLORS.textSecondary,
              margin: 0
            }}>
              {t('finding1Text')}
            </p>
          </div>

          <div style={{
            padding: '32px',
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.accent}`
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.accent,
              marginBottom: '12px',
              letterSpacing: '0.05em'
            }}>
              02
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              {t('finding2Title')}
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: COLORS.textSecondary,
              margin: 0
            }}>
              {t('finding2Text')}
            </p>
          </div>

          <div style={{
            padding: '32px',
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.primaryLight}`
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.primaryLight,
              marginBottom: '12px',
              letterSpacing: '0.05em'
            }}>
              03
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              {t('finding3Title')}
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: COLORS.textSecondary,
              margin: 0
            }}>
              {t('finding3Text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
