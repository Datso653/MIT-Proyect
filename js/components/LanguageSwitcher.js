// === LANGUAGE SWITCHER COMPONENT ===
function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 9999,
      display: 'flex',
      gap: '8px',
      backgroundColor: COLORS.surface,
      padding: '8px',
      borderRadius: '8px',
      border: `1px solid ${COLORS.border}`,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    }}>
      <button
        onClick={() => { console.log('Cambiando a ES'); setLanguage('es'); }}
        style={{
          padding: '8px 16px',
          backgroundColor: language === 'es' ? COLORS.primary : 'transparent',
          color: language === 'es' ? '#0a0a0a' : COLORS.textSecondary,
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: language === 'es' ? '600' : '400',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '0.03em'
        }}
        onMouseEnter={(e) => {
          if (language !== 'es') {
            e.target.style.backgroundColor = `${COLORS.primary}15`;
            e.target.style.color = COLORS.text;
          }
        }}
        onMouseLeave={(e) => {
          if (language !== 'es') {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = COLORS.textSecondary;
          }
        }}
      >
        ES
      </button>
      <button
        onClick={() => { console.log('Cambiando a EN'); setLanguage('en'); }}
        style={{
          padding: '8px 16px',
          backgroundColor: language === 'en' ? COLORS.primary : 'transparent',
          color: language === 'en' ? '#0a0a0a' : COLORS.textSecondary,
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: language === 'en' ? '600' : '400',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '0.03em'
        }}
        onMouseEnter={(e) => {
          if (language !== 'en') {
            e.target.style.backgroundColor = `${COLORS.primary}15`;
            e.target.style.color = COLORS.text;
          }
        }}
        onMouseLeave={(e) => {
          if (language !== 'en') {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = COLORS.textSecondary;
          }
        }}
      >
        EN
      </button>
    </div>
  );
}
