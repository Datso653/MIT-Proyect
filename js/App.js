const { useState, useEffect } = React;

// ═══════════════════════════════════════════════════════════
// APP PRINCIPAL - Ensambla componentes de Part1 y Part2
// ═══════════════════════════════════════════════════════════

// Importar desde Part1
import { 
  TEAM_DATA, 
  COLORS,
  Navbar, 
  Hero, 
  ProjectIntro, 
  UniversidadesParticipantes,
  ResumenEjecutivo,
  Indicadores,
  AnalisisVisual
} from './App-Part1.js';

// Importar desde Part2
import {
  SeccionMachineLearning,
  SeccionAnalisis,
  Team,
  Mapa,
  Footer,
  calcularIndicadores,
  procesarDatosGraficos
} from './App-Part2.js';

// === COMPONENTE PRINCIPAL ===
export default function App() {
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
      minHeight: '100vh',
      width: '100%'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          overflow-x: hidden;
          background-color: #0a0a0a;
          width: 100%;
        }
        
        #root {
          background-color: #0a0a0a;
          width: 100%;
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
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
      `}</style>
      
      <Navbar />
      <Hero scrollY={scrollY} />
      <ProjectIntro />
      <UniversidadesParticipantes />
      {datos.length > 0 && <Mapa datos={datos} />}
      {indicadores && <ResumenEjecutivo indicadores={indicadores} />}
      {indicadores && <Indicadores data={indicadores} />}
      {datosGraficos && indicadores && <AnalisisVisual data={datosGraficos} indicadores={indicadores} datos={datos} />}
      <SeccionMachineLearning />
      <SeccionAnalisis />
      <Team />
      <Footer />
    </div>
  );
}
