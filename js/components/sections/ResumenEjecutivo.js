// === HIPÓTESIS GEOESPACIALES ===
function ResumenEjecutivo({ indicadores }) {
  if (!indicadores) return null;
  
  return (
    <section id="hipotesis" className="fade-up" style={{
      padding: '120px 60px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: COLORS.background,
      borderTop: `1px solid ${COLORS.border}`
    }}>
      {/* Imagen de fondo - Análisis geoespacial */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.75,
        filter: 'grayscale(10%) brightness(1.0)',
        zIndex: 0
      }} />
      
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${COLORS.background}f8 0%, ${COLORS.background}ea 50%, ${COLORS.background}f8 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.accent,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Validación Estadística
          </div>
          
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(32px, 3.5vw, 44px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '24px'
          }}>
            Hipótesis Geoespaciales
          </h2>
          
          <p style={{
            fontSize: '14px',
            lineHeight: '1.7',
            color: COLORS.textSecondary,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Análisis riguroso de cuatro hipótesis sobre el ecosistema comercial de AMBA mediante pruebas estadísticas y modelos de Machine Learning.
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
              Hipótesis 1
            </div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              Crimen alto + Sin crédito → ¿Menor expectativa de crecimiento?
            </h4>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.6',
              margin: 0
            }}>
              Comercios en zonas con alta percepción de crimen y sin acceso a crédito.
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
              Hipótesis 2
            </div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              Crimen bajo + Con crédito → ¿Mayor inversión tecnológica?
            </h4>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.6',
              margin: 0
            }}>
              Comercios en zonas favorables con acceso a financiamiento.
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
            <strong style={{ color: COLORS.text }}>Nota:</strong> Los resultados detallados del análisis estadístico se presentan en las secciones expandibles a continuación, con métricas de validación y visualizaciones interactivas.
          </p>
        </div>
      </div>
    </section>
  );
}
