// === HIPÓTESIS ===
function ResumenEjecutivo({ indicadores, language = 'es' }) {
  if (!indicadores) return null;
  
  const t = (key) => getTranslation(language, key);
  console.log("ResumenEjecutivo render - language:", language);
  
  return (
    <section id="hipotesis" className="fade-up" style={{
      padding: '120px 60px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: COLORS.background,
      borderTop: `1px solid ${COLORS.border}`
    }}>
      {/* Imagen de fondo - Mapa de Argentina */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        filter: 'grayscale(0%) brightness(1.15)',
        zIndex: 0
      }} />

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}b0 0%, ${COLORS.background}70 50%, ${COLORS.background}b0 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(32px, 3.5vw, 44px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '24px'
          }}>
            {t('hypothesesTitle')}
          </h2>

          <p style={{
            fontSize: '14px',
            lineHeight: '1.7',
            color: COLORS.textSecondary,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {t('hypothesesDescription')}
          </p>
        </div>

        {/* Grid de Hipótesis - Minimalista */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          
          {/* H1 */}
          <div style={{
            padding: '24px',
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.primary}`
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: COLORS.primary,
              marginBottom: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {t('hypothesis1Title')}
            </div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              {t('hypothesis1Question')}
            </h4>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.6',
              margin: 0
            }}>
              {t('hypothesis1Description')}
            </p>
          </div>

          {/* H2 */}
          <div style={{
            padding: '24px',
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.accent}`
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: COLORS.accent,
              marginBottom: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {t('hypothesis2Title')}
            </div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              {t('hypothesis2Question')}
            </h4>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.6',
              margin: 0
            }}>
              {t('hypothesis2Description')}
            </p>
          </div>

          </div>

        {/* Nota informativa */}
        <div style={{
          marginTop: '40px',
          padding: '20px 24px',
          backgroundColor: `${COLORS.primary}10`,
          border: `1px solid ${COLORS.primary}30`,
          borderRadius: '6px'
        }}>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            margin: 0,
            textAlign: 'center'
          }}>
            <strong style={{ color: COLORS.text }}>{t('noteLabel')}</strong> {t('noteText')}
          </p>
        </div>
      </div>
    </section>
  );
}
