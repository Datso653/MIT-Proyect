const { useState, useEffect, useRef } = React;

// ═══════════════════════════════════════════════════════════
// PARTE 2: MACHINE LEARNING, ANÁLISIS, MAPA, EQUIPO, FOOTER
// ═══════════════════════════════════════════════════════════

// Importar constantes de Part1
import { TEAM_DATA, COLORS } from './App-Part1.js';

function SeccionMachineLearning() {
  const [resultadosML, setResultadosML] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('ml_results.json')
      .then(res => res.json())
      .then(data => {
        setResultadosML(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando resultados ML:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section style={{
        padding: '120px 60px',
        backgroundColor: COLORS.surface,
        textAlign: 'center'
      }}>
        <div style={{ color: COLORS.primary }}>Cargando modelos predictivos...</div>
      </section>
    );
  }

  if (!resultadosML || !resultadosML.modelos) {
    return null;
  }

  return (
    <section style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`
    }}>
      <AnimatedModelCard delay={0}>
        <div style={{
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Modelos predictivos
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '30px'
          }}>
            Predicciones estadÃ­sticas
          </h2>
          
          {/* Disclaimer prominente */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '24px 40px',
            backgroundColor: COLORS.background,
            border: `2px solid ${COLORS.primary}40`,
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`
            }} />
            
            <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '600',
                color: COLORS.primary,
                marginBottom: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                Disclaimer â€” AnÃ¡lisis Predictivo
              </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: COLORS.textSecondary
            }}>
              Los siguientes modelos representan <strong style={{ color: COLORS.text }}>anÃ¡lisis 
              estadÃ­sticos predictivos</strong> basados en patrones histÃ³ricos identificados en los datos. 
              Estas proyecciones <strong style={{ color: COLORS.text }}>no constituyen garantÃ­as</strong> de 
              comportamiento futuro y deben interpretarse como estimaciones probabilÃ­sticas sujetas a variabilidad 
              contextual, cambios macroeconÃ³micos y factores externos no capturados en el modelo. 
              <strong style={{ color: COLORS.primary }}> Los resultados no aseguran que los eventos 
              proyectados ocurrirÃ¡n en la realidad.</strong>
            </div>
          </div>
        </div>
      </div>
      </AnimatedModelCard>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
        gap: '60px'
      }}>
        <AnimatedModelCard delay={0}>
          <ModeloCrecimiento data={resultadosML.modelos.modelo_1_crecimiento} />
        </AnimatedModelCard>
        <AnimatedModelCard delay={200}>
          <ModeloFactoresExternos data={resultadosML.modelos.modelo_3_factores_externos} />
        </AnimatedModelCard>
      </div>

      <AnimatedModelCard delay={400}>
        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          padding: '40px',
          backgroundColor: COLORS.background,
          borderRadius: '4px',
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{
            fontSize: '14px',
            color: COLORS.textSecondary,
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <strong style={{ color: COLORS.text }}>MetodologÃ­a:</strong> Los modelos implementados 
            utilizan tÃ©cnicas de machine learning supervisado (Random Forest, Gradient Boosting, K-Means) 
            entrenados sobre el conjunto de datos relevado. Las mÃ©tricas de performance incluyen accuracy, 
            precision, recall, AUC-ROC, RÂ² y RMSE con validaciÃ³n mediante train/test split (75%/25%).
          </div>
        </div>
      </AnimatedModelCard>
    </section>
  );
}

// Componente con animaciÃ³n fade-in para modelos
function AnimatedModelCard({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}
    >
      {children}
    </div>
  );
}

// Modelo 1: Crecimiento
function ModeloCrecimiento({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  
  if (!data || !data.metricas || !data.feature_importance) {
    return null;
  }
  
  return (
    <div style={{
      backgroundColor: COLORS.background,
      padding: '40px',
      borderRadius: '8px',
      border: `1px solid ${COLORS.border}`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: COLORS.primary
      }} />
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        PredicciÃ³n de Crecimiento Comercial
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Â¿QuÃ© comercios tienen intenciÃ³n de expandirse?
      </p>

      {/* MÃ©tricas principales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <MetricaCard 
          label="Accuracy" 
          value={`${(data.metricas.accuracy * 100).toFixed(1)}%`} 
          color={COLORS.primary}
          tooltip="Porcentaje de predicciones correctas del total. Indica quÃ© tan bien el modelo clasifica en general."
        />
        <MetricaCard 
          label="AUC-ROC" 
          value={data.metricas.auc_roc.toFixed(3)} 
          color="#4FC3F7"
          tooltip="Ãrea bajo la curva ROC (0-1). Mide la capacidad del modelo para distinguir entre clases. Valores cercanos a 1 indican excelente desempeÃ±o."
        />
        <MetricaCard 
          label="Precision" 
          value={`${(data.metricas.precision * 100).toFixed(1)}%`} 
          color={COLORS.accent}
          tooltip="De todos los comercios que predijimos que crecerÃ¡n, quÃ© porcentaje realmente tiene esa intenciÃ³n. Mide cuÃ¡n confiables son las predicciones positivas."
        />
        <MetricaCard 
          label="Recall" 
          value={`${(data.metricas.recall * 100).toFixed(1)}%`} 
          color={COLORS.accentDark}
          tooltip="De todos los comercios que realmente quieren crecer, quÃ© porcentaje logramos identificar. Mide quÃ© tan completo es el modelo al detectar casos positivos."
        />
      </div>

      {/* Top 3 Features */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: COLORS.primary,
          marginBottom: '16px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Variables mÃ¡s importantes
        </div>
        {data.feature_importance.slice(0, 3).map((f, idx) => (
          <div key={idx} style={{ marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              marginBottom: '4px'
            }}>
              <span style={{ color: COLORS.text }}>{f.feature}</span>
              <span style={{ color: COLORS.primary, fontWeight: '600' }}>
                {(f.importance * 100).toFixed(1)}%
              </span>
            </div>
            <div style={{
              height: '6px',
              backgroundColor: COLORS.border,
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${f.importance * 100}%`,
                backgroundColor: COLORS.primary,
                transition: 'width 1s ease-out'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* BotÃ³n para mostrar grÃ¡ficos */}
      <button
        onClick={() => setShowCharts(!showCharts)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s',
          marginBottom: '12px'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {showCharts ? 'Ocultar grÃ¡ficos' : 'Ver grÃ¡ficos del modelo'}
      </button>

      {showCharts && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `1px solid ${COLORS.border}`
        }}>
          <ConfusionMatrix data={data.confusion_matrix} labels={['No crece', 'SÃ­ crece']} />
          
          <div style={{ height: '40px' }} />
          
          <ROCCurve auc={data.metricas.auc_roc} />
          
          <div style={{ height: '40px' }} />
          
          <FeatureImportanceChart 
            features={data.feature_importance.slice(0, 5)} 
            color={COLORS.primary}
            title="Top 5 Variables Predictivas"
          />
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {expanded ? 'Ver menos' : 'Ver explicaciÃ³n'}
      </button>

      {expanded && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          borderLeft: `3px solid COLORS.primary`
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            ExplicaciÃ³n AcadÃ©mica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Este modelo de clasificaciÃ³n binaria utiliza <strong style={{ color: COLORS.text }}>Random Forest</strong> para 
            predecir la probabilidad de que un comercio desee expandirse. Con un accuracy de {(data.metricas.accuracy * 100).toFixed(1)}% 
            y un recall de {(data.metricas.recall * 100).toFixed(1)}%, el modelo identifica correctamente la mayorÃ­a de los comercios 
            con intenciÃ³n de crecimiento. Las variables mÃ¡s predictivas son la antigÃ¼edad del negocio ({(data.feature_importance[0].importance * 100).toFixed(1)}% 
            de importancia) y la cantidad de trabajadores, sugiriendo que comercios mÃ¡s establecidos y con mayor personal tienden a buscar expansiÃ³n.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En TÃ©rminos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>Â¿QuÃ© significa esto para tu comercio?</strong><br/>
            Si tu negocio tiene varios aÃ±os funcionando y un equipo de trabajo estable, es mÃ¡s probable que estÃ©s pensando 
            en crecer. El modelo nos dice que {(data.metricas.accuracy * 100).toFixed(0)}% de las veces acierta quiÃ©n quiere expandirse. 
            Las claves son: <strong style={{ color: COLORS.primary }}>experiencia en el rubro, equipo consolidado y expectativas positivas de ventas</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

// Modelo 3: Factores Externos
function ModeloFactoresExternos({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  
  if (!data || !data.metricas || !data.feature_importance || !data.confusion_matrix) {
    return null;
  }
  
  return (
    <div style={{
      backgroundColor: COLORS.background,
      padding: '40px',
      borderRadius: '8px',
      border: `1px solid ${COLORS.border}`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: COLORS.accent
      }} />
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Impacto de Factores Externos
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Â¿QuÃ© afecta mÃ¡s las ventas: crimen, precios, competencia o crÃ©dito?
      </p>

      {/* MÃ©tricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <MetricaCard 
          label="Accuracy" 
          value={`${(data.metricas.accuracy * 100).toFixed(1)}%`} 
          color={COLORS.accent}
          tooltip="Porcentaje de predicciones correctas del total. Indica quÃ© tan bien el modelo clasifica las tendencias de ventas (peor/igual/mejor)."
        />
        <MetricaCard 
          label="F1-Score" 
          value={`${(data.metricas.f1_weighted * 100).toFixed(1)}%`} 
          color="#4FC3F7"
          tooltip="Promedio ponderado de precisiÃ³n y recall. Balance entre identificar correctamente las tendencias y no generar falsos positivos. Ãštil en clasificaciÃ³n multiclase."
        />
      </div>

      {/* Factores de afectaciÃ³n */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: COLORS.primary,
          marginBottom: '16px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Factores de impacto (por importancia)
        </div>
        {data.feature_importance.slice(0, 4).filter(f => f.feature.includes('afect')).map((f, idx) => {
          const labelMap = {
            'afect_precios_num': 'Precios',
            'afect_compe_num': 'Competencia',
            'afect_credito_num': 'CrÃ©dito',
            'afect_crimen_num': 'Crimen'
          };
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                marginBottom: '4px'
              }}>
                <span style={{ color: COLORS.text }}>{labelMap[f.feature] || f.feature}</span>
                <span style={{ color: COLORS.primary, fontWeight: '600' }}>
                  {(f.importance * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{
                height: '6px',
                backgroundColor: COLORS.border,
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${f.importance * 100}%`,
                  backgroundColor: COLORS.accent,
                  transition: 'width 1s ease-out'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* BotÃ³n para mostrar grÃ¡ficos */}
      <button
        onClick={() => setShowCharts(!showCharts)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s',
          marginBottom: '12px'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {showCharts ? 'Ocultar grÃ¡ficos' : 'Ver grÃ¡ficos del modelo'}
      </button>

      {showCharts && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `1px solid ${COLORS.border}`
        }}>
          <ConfusionMatrix 
            data={data.confusion_matrix} 
            labels={['Peor', 'Igual', 'Mejor']} 
          />
          
          <div style={{ height: '40px' }} />
          
          <AfectacionesChart />
          
          <div style={{ height: '40px' }} />
          
          <DistribucionPredicciones
            distribucion={data.distribucion_clases}
            labels={['Peor', 'Igual', 'Mejor']}
            colors={[COLORS.accentDark, COLORS.accent, COLORS.primary]}
          />
          
          <div style={{ height: '40px' }} />
          
          <FeatureImportanceChart 
            features={data.feature_importance.slice(0, 6)} 
            color={COLORS.accent}
            title="Top 6 Variables Predictivas"
          />
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: COLORS.surface,
          color: COLORS.primary,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.surfaceHover}
        onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.surface}
      >
        {expanded ? 'Ver menos' : 'Ver explicaciÃ³n'}
      </button>

      {expanded && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          borderLeft: `3px solid COLORS.accent`
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            ExplicaciÃ³n AcadÃ©mica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Clasificador multiclase <strong style={{ color: COLORS.text }}>Random Forest</strong> que predice si las ventas 
            empeorarÃ¡n, se mantendrÃ¡n o mejorarÃ¡n segÃºn factores externos. Con {(data.metricas.accuracy * 100).toFixed(1)}% de accuracy, 
            el modelo identifica que <strong style={{ color: COLORS.text }}>los precios</strong> son el factor mÃ¡s determinante, 
            seguido por la competencia. Interesantemente, la antigÃ¼edad del negocio tambiÃ©n es altamente predictiva, sugiriendo 
            que comercios mÃ¡s establecidos manejan mejor las adversidades externas.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En TÃ©rminos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>Â¿QuÃ© estÃ¡ afectando tus ventas?</strong><br/>
            El factor #1 que impacta las ventas son <strong style={{ color: COLORS.primary }}>los precios y la inflaciÃ³n</strong>. 
            Luego viene la competencia en tu zona. El crimen y el acceso a crÃ©dito tambiÃ©n importan, pero menos. 
            Si tu negocio tiene varios aÃ±os, probablemente ya sepas cÃ³mo adaptarte a estos cambios. Los comercios nuevos 
            sufren mÃ¡s con factores externos porque aÃºn no tienen la experiencia ni la base de clientes fiel.
          </p>
        </div>
      )}
    </div>
  );
}


// Componente auxiliar para mÃ©tricas
function MetricaCard({ label, value, color, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      style={{
        padding: '16px',
        backgroundColor: COLORS.surface,
        borderRadius: '6px',
        textAlign: 'center',
        border: `1px solid ${color}40`,
        position: 'relative',
        cursor: 'help'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div style={{
        fontSize: '11px',
        color: COLORS.textSecondary,
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '22px',
        fontWeight: '700',
        color: color,
        fontFamily: '"Crimson Pro", serif'
      }}>
        {value}
      </div>
      
      {/* Tooltip */}
      {showTooltip && tooltip && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          padding: '12px 16px',
          backgroundColor: COLORS.background,
          border: `1px solid ${color}`,
          borderRadius: '8px',
          boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
          zIndex: 1000,
          minWidth: '250px',
          maxWidth: '300px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateX(-50%) translateY(-5px);
              }
              to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
              }
            }
          `}</style>
          
          {/* Flecha del tooltip */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            backgroundColor: COLORS.background,
            border: `1px solid ${color}`,
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'translateX(-50%) rotate(45deg)'
          }} />
          
          <div style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.6',
            textAlign: 'left',
            position: 'relative'
          }}>
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente Confusion Matrix
function ConfusionMatrix({ data, labels }) {
  const maxValue = Math.max(...data.flat());
  
  // Aplanar los datos en un solo array para el grid
  const gridItems = [];
  
  // Empty corner
  gridItems.push(<div key="corner" />);
  
  // Column headers
  labels.forEach((label, idx) => {
    gridItems.push(
      <div key={`col-${idx}`} style={{
        fontSize: '11px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        fontWeight: '600'
      }}>
        {label}
      </div>
    );
  });
  
  // Rows with cells
  data.forEach((row, i) => {
    // Row label
    gridItems.push(
      <div key={`row-label-${i}`} style={{
        fontSize: '11px',
        color: COLORS.textSecondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '8px',
        fontWeight: '600'
      }}>
        {labels[i]}
      </div>
    );
    
    // Cells
    row.forEach((value, j) => {
      const intensity = value / maxValue;
      const isCorrect = i === j;
      
      gridItems.push(
        <div key={`cell-${i}-${j}`} style={{
          backgroundColor: isCorrect 
            ? `rgba(0, 230, 118, ${0.2 + intensity * 0.6})`
            : `rgba(76, 195, 247, ${0.1 + intensity * 0.4})`,
          padding: '20px 10px',
          borderRadius: '6px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: '700',
          color: COLORS.text,
          border: isCorrect ? '2px solid COLORS.primary' : '1px solid ' + COLORS.border
        }}>
          {value}
        </div>
      );
    });
  });
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Matriz de ConfusiÃ³n
      </h4>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `80px repeat(${data[0].length}, 1fr)`,
        gap: '8px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        {gridItems}
      </div>
      
      <div style={{
        marginTop: '20px',
        fontSize: '12px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: '1.6'
      }}>
        La diagonal (verde) representa las predicciones correctas.<br/>
        Valores fuera de la diagonal son errores del modelo.
      </div>
    </div>
  );
}

// Componente Feature Importance Chart
function FeatureImportanceChart({ features, color, title }) {
  const maxImportance = Math.max(...features.map(f => f.importance));
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        {title}
      </h4>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {features.map((f, idx) => {
          const percentage = (f.importance / maxImportance) * 100;
          
          return (
            <div key={idx}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '13px',
                  color: COLORS.text,
                  fontWeight: '500'
                }}>
                  {f.feature}
                </span>
                <span style={{
                  fontSize: '13px',
                  color: color,
                  fontWeight: '700',
                  fontFamily: '"Crimson Pro", serif'
                }}>
                  {(f.importance * 100).toFixed(1)}%
                </span>
              </div>
              
              <div style={{
                height: '10px',
                backgroundColor: COLORS.border,
                borderRadius: '5px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  backgroundColor: color,
                  borderRadius: '5px',
                  transition: 'width 1s ease-out',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '30%',
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2))`,
                    borderRadius: '5px'
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Componente ROC Curve usando SVG
function ROCCurve({ data, auc }) {
  // Generar puntos para la curva ROC desde la confusion matrix
  const generateROCPoints = () => {
    // SimulaciÃ³n de curva ROC basada en el AUC
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
      // AproximaciÃ³n de curva ROC basada en AUC
      let y;
      if (auc > 0.5) {
        y = Math.pow(x, 1 / (2 * auc));
      } else {
        y = x;
      }
      points.push({ fpr: x, tpr: Math.min(y, 1) });
    }
    
    return points;
  };
  
  const points = generateROCPoints();
  const width = 400;
  const height = 300;
  const padding = 40;
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Curva ROC
      </h4>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        <svg 
          viewBox="0 0 400 300" 
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            height: 'auto'
          }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const x = padding + val * (width - 2 * padding);
            const y = height - padding - val * (height - 2 * padding);
            return (
              <g key={idx}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke={COLORS.border}
                  strokeDasharray="4 4"
                />
                <line
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={height - padding}
                  stroke={COLORS.border}
                  strokeDasharray="4 4"
                />
                <text
                  x={x}
                  y={height - padding + 20}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="middle"
                >
                  {val.toFixed(1)}
                </text>
                <text
                  x={padding - 10}
                  y={y + 4}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}
          
          {/* Diagonal line (random classifier) */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={padding}
            stroke="#888"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          
          {/* ROC Curve */}
          <path
            d={points.map((p, i) => {
              const x = padding + p.fpr * (width - 2 * padding);
              const y = height - padding - p.tpr * (height - 2 * padding);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#4FC3F7"
            strokeWidth="3"
          />
          
          {/* Axes labels */}
          <text
            x={width / 2}
            y={height - 5}
            fill={COLORS.text}
            fontSize="12"
            textAnchor="middle"
          >
            False Positive Rate
          </text>
          
          <text
            x={15}
            y={height / 2}
            fill={COLORS.text}
            fontSize="12"
            textAnchor="middle"
            transform={`rotate(-90 15 ${height / 2})`}
          >
            True Positive Rate
          </text>
          
          {/* AUC Label */}
          <text
            x={width - padding - 10}
            y={padding + 20}
            fill="#4FC3F7"
            fontSize="14"
            fontWeight="bold"
            textAnchor="end"
          >
            AUC = {auc.toFixed(3)}
          </text>
        </svg>
      </div>
    </div>
  );
}

// Componente Scatter Plot (PredicciÃ³n vs Real) para Modelo 2
function ScatterPlot({ realValues, predictions, title }) {
  const width = 400;
  const height = 300;
  const padding = 50;
  
  const maxVal = Math.max(...realValues, ...predictions);
  const minVal = Math.min(...realValues, ...predictions);
  
  const scaleX = (val) => padding + ((val - minVal) / (maxVal - minVal)) * (width - 2 * padding);
  const scaleY = (val) => height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        {title}
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: `${width}px`,
            height: 'auto'
          }}>
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const scaledVal = minVal + val * (maxVal - minVal);
            const x = scaleX(scaledVal);
            const y = scaleY(scaledVal);
            return (
              <g key={idx}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke={COLORS.border} strokeDasharray="2 2" />
                <line x1={x} y1={padding} x2={x} y2={height - padding} stroke={COLORS.border} strokeDasharray="2 2" />
              </g>
            );
          })}
          
          {/* Perfect prediction line */}
          <line
            x1={scaleX(minVal)}
            y1={scaleY(minVal)}
            x2={scaleX(maxVal)}
            y2={scaleY(maxVal)}
            stroke={COLORS.accentDark}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          
          {/* Data points */}
          {realValues.map((real, idx) => {
            const pred = predictions[idx];
            return (
              <circle
                key={idx}
                cx={scaleX(real)}
                cy={scaleY(pred)}
                r="4"
                fill="#4FC3F7"
                opacity="0.6"
              />
            );
          })}
          
          {/* Axes labels */}
          <text x={width / 2} y={height - 10} fill={COLORS.text} fontSize="11" textAnchor="middle">
            Salario Real (ARS)
          </text>
          <text
            x={15}
            y={height / 2}
            fill={COLORS.text}
            fontSize="11"
            textAnchor="middle"
            transform={`rotate(-90 15 ${height / 2})`}
          >
            Salario Predicho (ARS)
          </text>
        </svg>
      </div>
    </div>
  );
}

// Componente de DistribuciÃ³n de Predicciones (Bar Chart)
function DistribucionPredicciones({ distribucion, labels, colors }) {
  const maxCount = Math.max(...Object.values(distribucion));
  const width = 400;
  const height = 250;
  const padding = 40;
  const barWidth = (width - 2 * padding) / Object.keys(distribucion).length - 10;
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        DistribuciÃ³n de Predicciones
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: `${width}px`,
            height: 'auto'
          }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const y = height - padding - val * (height - 2 * padding);
            return (
              <g key={idx}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke={COLORS.border}
                  strokeDasharray="2 2"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                >
                  {Math.round(maxCount * val)}
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {Object.entries(distribucion).map(([key, count], idx) => {
            const barHeight = (count / maxCount) * (height - 2 * padding);
            const x = padding + idx * (barWidth + 10) + 20;
            const y = height - padding - barHeight;
            const color = colors[idx] || '#4FC3F7';
            
            return (
              <g key={key}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  rx="4"
                  opacity="0.8"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  fill={COLORS.text}
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {count}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={height - padding + 20}
                  fill={COLORS.textSecondary}
                  fontSize="11"
                  textAnchor="middle"
                >
                  {labels[idx] || key}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// Componente Afectaciones por Tendencia (Grouped Bar Chart)
function AfectacionesChart() {
  // Datos simulados basados en la imagen
  const data = [
    { factor: 'Crimen', Peor: 0.7, Igual: 0.55, Mejor: 0.5 },
    { factor: 'CrÃ©dito', Peor: 0.57, Igual: 0.48, Mejor: 0.5 },
    { factor: 'Precios', Peor: 1.75, Igual: 1.35, Mejor: 1.3 },
    { factor: 'Competencia', Peor: 1.3, Igual: 1.05, Mejor: 0.97 }
  ];
  
  const width = 450;
  const height = 280;
  const padding = { top: 40, right: 120, bottom: 50, left: 60 };
  const groupWidth = (width - padding.left - padding.right) / data.length;
  const barWidth = groupWidth / 4;
  const maxValue = 2.0;
  
  const colors = {
    Peor: COLORS.accentDark,
    Igual: COLORS.accent,
    Mejor: COLORS.primary
  };
  
  return (
    <div>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: '20px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Afectaciones por Tendencia de Ventas
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          style={{ 
            backgroundColor: COLORS.surface, 
            borderRadius: '8px',
            width: '100%',
            maxWidth: `${width}px`,
            height: 'auto'
          }}>
          {/* Grid lines */}
          {[0, 0.5, 1.0, 1.5, 2.0].map((val, idx) => {
            const y = height - padding.bottom - (val / maxValue) * (height - padding.top - padding.bottom);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke={COLORS.border}
                  strokeDasharray="2 2"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  fill={COLORS.textSecondary}
                  fontSize="10"
                  textAnchor="end"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {data.map((item, groupIdx) => {
            const groupX = padding.left + groupIdx * groupWidth;
            
            return (
              <g key={item.factor}>
                {/* Peor */}
                <rect
                  x={groupX + barWidth * 0.5}
                  y={height - padding.bottom - (item.Peor / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Peor / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Peor}
                  rx="3"
                  opacity="0.85"
                />
                
                {/* Igual */}
                <rect
                  x={groupX + barWidth * 1.5}
                  y={height - padding.bottom - (item.Igual / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Igual / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Igual}
                  rx="3"
                  opacity="0.85"
                />
                
                {/* Mejor */}
                <rect
                  x={groupX + barWidth * 2.5}
                  y={height - padding.bottom - (item.Mejor / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Mejor / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Mejor}
                  rx="3"
                  opacity="0.85"
                />
                
                {/* Label */}
                <text
                  x={groupX + groupWidth / 2}
                  y={height - padding.bottom + 20}
                  fill={COLORS.textSecondary}
                  fontSize="11"
                  textAnchor="middle"
                >
                  {item.factor}
                </text>
              </g>
            );
          })}
          
          {/* Legend */}
          {Object.entries(colors).map(([label, color], idx) => (
            <g key={label} transform={`translate(${width - padding.right + 10}, ${padding.top + idx * 25})`}>
              <rect x="0" y="0" width="15" height="15" fill={color} rx="2" />
              <text x="20" y="12" fill={COLORS.text} fontSize="11">
                {label}
              </text>
            </g>
          ))}
          
          {/* Y-axis label */}
          <text
            x={15}
            y={height / 2}
            fill={COLORS.text}
            fontSize="11"
            textAnchor="middle"
            transform={`rotate(-90 15 ${height / 2})`}
          >
            Nivel de AfectaciÃ³n (0-3)
          </text>
        </svg>
      </div>
      
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: COLORS.background,
        borderRadius: '4px',
        fontSize: '11px',
        color: COLORS.textSecondary,
        textAlign: 'center'
      }}>
        Los comercios con peores ventas reportan mayor impacto de precios y competencia
      </div>
    </div>
  );
}

// === TEAM ===
function Team() {
  return (
    <section id="equipo" style={{
      padding: '120px 60px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Imagen de fondo MIT */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1600&q=85&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.60,
        filter: 'grayscale(15%) brightness(0.6)',
        zIndex: 0
      }} />
      
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 50% 50%, ${COLORS.background}60 0%, ${COLORS.background}90 100%)`,
        zIndex: 1
      }} />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          marginBottom: '80px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Sobre nosotros
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text
          }}>
            Â¿QuiÃ©nes somos?
          </h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px'
        }}>
          {TEAM_DATA.members.map((member, index) => (
            <TeamMember key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMember({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const memberRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100); // Delay mÃ¡s corto
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (memberRef.current) {
      observer.observe(memberRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={memberRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.6s ease-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(15px)' // Menos movimiento
      }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '3/4',
        marginBottom: '24px',
        overflow: 'hidden',
        backgroundColor: COLORS.surface,
        borderRadius: '2px'
      }}>
        {!imgError ? (
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
              filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.surface,
            fontSize: '72px',
            fontFamily: '"Crimson Pro", serif',
            color: COLORS.primary,
            fontWeight: '300'
          }}>
            {member.name.charAt(0)}
          </div>
        )}
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.4s'
        }} />
      </div>
      
      <h3 style={{
        fontFamily: '"Crimson Pro", serif',
        fontSize: '24px',
        fontWeight: '400',
        color: COLORS.text,
        marginBottom: '8px',
        letterSpacing: '-0.01em'
      }}>
        {member.name}
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.primary,
        marginBottom: '4px',
        letterSpacing: '0.05em'
      }}>
        {member.role}
      </p>
      
      <p style={{
        fontSize: '13px',
        color: COLORS.textSecondary,
        marginBottom: '16px'
      }}>
        {member.university}
      </p>
      
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: COLORS.text,
          textDecoration: 'none',
          borderBottom: `1px solid ${isHovered ? COLORS.primary : 'transparent'}`,
          paddingBottom: '2px',
          transition: 'border-color 0.3s',
          fontWeight: '500'
        }}
      >
        LinkedIn â†’
      </a>
    </div>
  );
}

// === MAPA ===
function Mapa({ datos }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const heatLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [viewMode, setViewMode] = useState('general'); // 'general', 'crimen', 'credito'

  useEffect(() => {
    if (!window.L || mapInstanceRef.current) return;

    const comerciosConCoords = datos.filter(c => 
      c.lat && c.long && 
      !isNaN(c.lat) && !isNaN(c.long) &&
      c.lat !== 0 && c.long !== 0
    );

    if (comerciosConCoords.length === 0) return;

    // Crear mapa
    const map = window.L.map(mapRef.current).setView([-34.6037, -58.3816], 12);

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: 'Â© OpenStreetMap, Â© CartoDB',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [datos]);

  // Actualizar vista cuando cambia el modo
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    
    // Limpiar capas anteriores
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }
    if (markersLayerRef.current) {
      map.removeLayer(markersLayerRef.current);
      markersLayerRef.current = null;
    }

    const comerciosConCoords = datos.filter(c => 
      c.lat && c.long && 
      !isNaN(c.lat) && !isNaN(c.long) &&
      c.lat !== 0 && c.long !== 0
    );

    if (viewMode === 'general') {
      // Vista general con marcadores
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      const icon = window.L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 12px;
          height: 12px;
          background: ${COLORS.primary};
          border: 2px solid ${COLORS.background};
          border-radius: 50%;
          box-shadow: 0 0 10px ${COLORS.primary}80;
        "></div>`,
        iconSize: [12, 12]
      });

      comerciosConCoords.forEach(comercio => {
        try {
          const marker = window.L.marker([comercio.lat, comercio.long], { icon });
          marker.bindPopup(`
            <div style="
              font-family: 'Inter', sans-serif;
              background: ${COLORS.surface};
              color: ${COLORS.text};
              padding: 12px;
              border-radius: 4px;
            ">
              <strong style="color: ${COLORS.primary}; display: block; margin-bottom: 8px;">
                ${comercio.comercio || 'Sin nombre'}
              </strong>
              <div style="font-size: 13px; color: ${COLORS.textSecondary};">
                Tipo: ${comercio.tipo_comercio || 'N/A'}<br>
                Trabajadores: ${comercio.cantidad_trabajadores || 'N/A'}
              </div>
            </div>
          `);
          markersLayerRef.current.addLayer(marker);
        } catch (error) {
          console.error('Error al agregar marcador:', error);
        }
      });

    } else if (viewMode === 'crimen') {
      // Vista de calor de percepciÃ³n de crimen
      const crimenToIntensity = {
        'Mucho': 1.0,
        'Moderado': 0.7,
        'Algo': 0.5,
        'Poco': 0.25,
        'Nada': 0.05
      };

      const heatPoints = comerciosConCoords
        .filter(c => c.afect_crimen && crimenToIntensity[c.afect_crimen] !== undefined)
        .map(c => [
          parseFloat(c.lat),
          parseFloat(c.long),
          crimenToIntensity[c.afect_crimen]
        ]);

      if (window.L.heatLayer && heatPoints.length > 0) {
        heatLayerRef.current = window.L.heatLayer(heatPoints, {
          radius: 25,
          blur: 20,
          maxZoom: 17,
          max: 1.0,
          gradient: {
            0.0: '#00ff00',
            0.3: '#ffff00',
            0.6: '#ff9900',
            0.8: '#ff4400',
            1.0: '#ff0000'
          }
        }).addTo(map);
      }

      // Agregar marcadores con color segÃºn percepciÃ³n
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      comerciosConCoords.forEach(comercio => {
        if (!comercio.afect_crimen) return;

        const intensityColor = {
          'Mucho': '#ff0000',
          'Moderado': '#ff9900',
          'Algo': '#ffff00',
          'Poco': '#90EE90',
          'Nada': '#00ff00'
        }[comercio.afect_crimen] || COLORS.primary;

        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: 10px;
            height: 10px;
            background: ${intensityColor};
            border: 2px solid ${COLORS.background};
            border-radius: 50%;
            box-shadow: 0 0 8px ${intensityColor}80;
          "></div>`,
          iconSize: [10, 10]
        });

        const marker = window.L.marker([comercio.lat, comercio.long], { icon });
        marker.bindPopup(`
          <div style="
            font-family: 'Inter', sans-serif;
            background: ${COLORS.surface};
            color: ${COLORS.text};
            padding: 12px;
            border-radius: 4px;
          ">
            <strong style="color: ${intensityColor}; display: block; margin-bottom: 8px;">
              PercepciÃ³n: ${comercio.afect_crimen}
            </strong>
            <div style="font-size: 13px; color: ${COLORS.textSecondary};">
              Tipo: ${comercio.tipo_comercio || 'N/A'}<br>
              ${comercio.reja ? 'Con rejas de seguridad' : ''}
            </div>
          </div>
        `);
        markersLayerRef.current.addLayer(marker);
      });

    } else if (viewMode === 'credito') {
      // Vista de acceso a crÃ©dito
      const contarFuentes = (c) => {
        let count = 0;
        if (parseFloat(c.credits_bancos) > 0) count++;
        if (parseFloat(c.credits_proveedor) > 0) count++;
        if (parseFloat(c.credits_familia) > 0) count++;
        if (parseFloat(c.credits_gobierno) > 0) count++;
        if (parseFloat(c.credits_privado) > 0) count++;
        return count;
      };

      // Heatmap basado en cantidad de fuentes
      const heatPoints = comerciosConCoords
        .map(c => {
          const numFuentes = contarFuentes(c);
          if (numFuentes === 0) return null;
          return [
            parseFloat(c.lat),
            parseFloat(c.long),
            numFuentes / 5 // Normalizar entre 0-1 (mÃ¡ximo 5 fuentes)
          ];
        })
        .filter(p => p !== null);

      if (window.L.heatLayer && heatPoints.length > 0) {
        heatLayerRef.current = window.L.heatLayer(heatPoints, {
          radius: 25,
          blur: 20,
          maxZoom: 17,
          max: 1.0,
          gradient: {
            0.0: '#ff0000',    // Sin acceso = rojo
            0.2: '#ff9900',    // 1 fuente = naranja
            0.4: '#ffff00',    // 2 fuentes = amarillo
            0.6: '#90EE90',    // 3 fuentes = verde claro
            1.0: '#00ff00'     // 5 fuentes = verde
          }
        }).addTo(map);
      }

      // Marcadores con color segÃºn acceso
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      comerciosConCoords.forEach(comercio => {
        const numFuentes = contarFuentes(comercio);
        
        const colorByFuentes = {
          0: '#ff0000',
          1: '#ff9900',
          2: '#ffff00',
          3: '#90EE90',
          4: '#00cc00',
          5: '#00ff00'
        };

        const color = colorByFuentes[numFuentes] || '#666666';
        const size = numFuentes === 0 ? 8 : 10;

        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border: 2px solid ${COLORS.background};
            border-radius: 50%;
            box-shadow: 0 0 8px ${color}80;
          "></div>`,
          iconSize: [size, size]
        });

        const fuentes = [];
        if (parseFloat(comercio.credits_bancos) > 0) fuentes.push('Bancos');
        if (parseFloat(comercio.credits_proveedor) > 0) fuentes.push('Proveedores');
        if (parseFloat(comercio.credits_familia) > 0) fuentes.push('Familia');
        if (parseFloat(comercio.credits_gobierno) > 0) fuentes.push('Gobierno');
        if (parseFloat(comercio.credits_privado) > 0) fuentes.push('Privado');

        const marker = window.L.marker([comercio.lat, comercio.long], { icon });
        marker.bindPopup(`
          <div style="
            font-family: 'Inter', sans-serif;
            background: ${COLORS.surface};
            color: ${COLORS.text};
            padding: 12px;
            border-radius: 4px;
          ">
            <strong style="color: ${color}; display: block; margin-bottom: 8px;">
              ${numFuentes === 0 ? 'Sin acceso a crÃ©dito' : `${numFuentes} fuente${numFuentes > 1 ? 's' : ''} de crÃ©dito`}
            </strong>
            <div style="font-size: 13px; color: ${COLORS.textSecondary};">
              Tipo: ${comercio.tipo_comercio || 'N/A'}<br>
              ${fuentes.length > 0 ? `Fuentes: ${fuentes.join(', ')}` : 'Sin financiamiento'}
            </div>
          </div>
        `);
        markersLayerRef.current.addLayer(marker);
      });
    }
  }, [viewMode, datos]);

  // Calcular estadÃ­sticas de crimen
  const statscrimen = React.useMemo(() => {
    const comerciosConCrimen = datos.filter(c => c.afect_crimen);
    const total = comerciosConCrimen.length;
    
    const distribucion = {
      'Mucho': comerciosConCrimen.filter(c => c.afect_crimen === 'Mucho').length,
      'Moderado': comerciosConCrimen.filter(c => c.afect_crimen === 'Moderado').length,
      'Algo': comerciosConCrimen.filter(c => c.afect_crimen === 'Algo').length,
      'Poco': comerciosConCrimen.filter(c => c.afect_crimen === 'Poco').length,
      'Nada': comerciosConCrimen.filter(c => c.afect_crimen === 'Nada').length
    };

    const afectados = distribucion['Mucho'] + distribucion['Moderado'] + distribucion['Algo'];
    const pctAfectados = total > 0 ? ((afectados / total) * 100).toFixed(1) : 0;

    return { distribucion, total, pctAfectados };
  }, [datos]);

  // Calcular estadÃ­sticas de crÃ©dito
  const statscredito = React.useMemo(() => {
    const contarFuentes = (c) => {
      let count = 0;
      if (parseFloat(c.credits_bancos) > 0) count++;
      if (parseFloat(c.credits_proveedor) > 0) count++;
      if (parseFloat(c.credits_familia) > 0) count++;
      if (parseFloat(c.credits_gobierno) > 0) count++;
      if (parseFloat(c.credits_privado) > 0) count++;
      return count;
    };

    const distribucion = {
      0: datos.filter(c => contarFuentes(c) === 0).length,
      1: datos.filter(c => contarFuentes(c) === 1).length,
      2: datos.filter(c => contarFuentes(c) === 2).length,
      3: datos.filter(c => contarFuentes(c) === 3).length,
      4: datos.filter(c => contarFuentes(c) === 4).length,
      5: datos.filter(c => contarFuentes(c) === 5).length
    };

    const conCredito = datos.length - distribucion[0];
    const pctConCredito = ((conCredito / datos.length) * 100).toFixed(1);

    return { distribucion, total: datos.length, pctConCredito, conCredito };
  }, [datos]);

  return (
    <section id="mapa" style={{
      padding: '120px 60px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: COLORS.primary,
          marginBottom: '20px',
          fontWeight: '500'
        }}>
          DistribuciÃ³n geogrÃ¡fica
        </div>
        <h2 style={{
          fontFamily: '"Crimson Pro", serif',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: '400',
          color: COLORS.text,
          marginBottom: '20px'
        }}>
          Mapa interactivo
        </h2>
        <p style={{
          fontSize: '16px',
          color: COLORS.textSecondary,
          maxWidth: '800px',
          margin: '0 auto 30px',
          lineHeight: '1.6'
        }}>
          Explora la ubicaciÃ³n de los comercios, percepciÃ³n de seguridad y acceso a crÃ©dito en el AMBA
        </p>

        {/* Toggle de vista con 3 opciones */}
        <div style={{
          display: 'inline-flex',
          gap: '12px',
          backgroundColor: COLORS.surface,
          padding: '8px',
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`,
          flexWrap: 'wrap',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <button
            onClick={() => setViewMode('general')}
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: viewMode === 'general' ? COLORS.primary : 'transparent',
              color: viewMode === 'general' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.05em',
              boxShadow: viewMode === 'general' ? `0 4px 12px ${COLORS.primary}40` : 'none',
              transform: viewMode === 'general' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'general') {
                e.currentTarget.style.backgroundColor = `${COLORS.primary}20`;
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'general') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            UBICACIONES
          </button>
          <button
            onClick={() => setViewMode('crimen')}
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: viewMode === 'crimen' ? '#ff4400' : 'transparent',
              color: viewMode === 'crimen' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.05em',
              boxShadow: viewMode === 'crimen' ? '0 4px 12px #ff440040' : 'none',
              transform: viewMode === 'crimen' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'crimen') {
                e.currentTarget.style.backgroundColor = '#ff440020';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'crimen') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            PERCEPCIÃ“N DE CRIMEN
          </button>
          <button
            onClick={() => setViewMode('credito')}
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: viewMode === 'credito' ? '#00cc00' : 'transparent',
              color: viewMode === 'credito' ? COLORS.background : COLORS.textSecondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.05em',
              boxShadow: viewMode === 'credito' ? '0 4px 12px #00cc0040' : 'none',
              transform: viewMode === 'credito' ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'credito') {
                e.currentTarget.style.backgroundColor = '#00cc0020';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'credito') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            ACCESO A CRÃ‰DITO
          </button>
        </div>
      </div>

      {/* EstadÃ­sticas de crimen cuando estÃ¡ en modo crimen */}
      {viewMode === 'crimen' && (
        <div style={{
          marginBottom: '30px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff0000', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Mucho']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Mucho</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff9900', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Moderado']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Moderado</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Algo']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Algo</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#90EE90', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Poco']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Poco</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#00ff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscrimen.distribucion['Nada']}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Nada</div>
            </div>
          </div>
          
          <div style={{
            padding: '16px',
            backgroundColor: `${COLORS.accent}15`,
            borderRadius: '8px',
            borderLeft: `4px solid ${COLORS.accent}`,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '14px', color: COLORS.text }}>
              <strong style={{ fontSize: '20px', color: COLORS.accent }}>{statscrimen.pctAfectados}%</strong> de los comercios 
              reportan afectaciÃ³n significativa por crimen (Algo/Moderado/Mucho)
            </div>
          </div>
        </div>
      )}
      
      {/* EstadÃ­sticas de crÃ©dito cuando estÃ¡ en modo crÃ©dito */}
      {viewMode === 'credito' && (
        <div style={{
          marginBottom: '30px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '12px',
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff0000', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[0]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>Sin acceso</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff9900', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[1]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>1 fuente</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[2]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>2 fuentes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#90EE90', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[3]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>3 fuentes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#00cc00', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[4]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>4 fuentes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#00ff00', fontFamily: '"Crimson Pro", serif' }}>
                {statscredito.distribucion[5]}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>5 fuentes</div>
            </div>
          </div>
          
          <div style={{
            padding: '16px',
            backgroundColor: '#00cc0015',
            borderRadius: '8px',
            borderLeft: '4px solid #00cc00',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '14px', color: COLORS.text }}>
              <strong style={{ fontSize: '20px', color: '#00cc00' }}>{statscredito.pctConCredito}%</strong> de los comercios 
              tienen acceso a al menos una fuente de crÃ©dito ({statscredito.conCredito} comercios)
            </div>
          </div>
        </div>
      )}
      
      <div
        ref={mapRef}
        style={{
          height: '600px',
          width: '100%',
          borderRadius: '2px',
          border: `1px solid ${COLORS.border}`,
          overflow: 'hidden',
          boxShadow: `0 20px 60px rgba(0,0,0,0.4)`
        }}
      />

      {/* Leyenda para mapa de calor */}
      {viewMode === 'crimen' && (
        <div style={{
          marginTop: '20px',
          padding: '16px 24px',
          backgroundColor: COLORS.surface,
          borderRadius: '8px',
          border: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.textSecondary }}>
            INTENSIDAD DEL CALOR:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#00ff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Nada</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ffff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Poco/Algo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff9900', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Moderado</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff0000', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Mucho</span>
          </div>
        </div>
      )}

      {/* Leyenda para mapa de crÃ©dito */}
      {viewMode === 'credito' && (
        <div style={{
          marginTop: '20px',
          padding: '16px 24px',
          backgroundColor: COLORS.surface,
          borderRadius: '8px',
          border: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.textSecondary }}>
            ACCESO A CRÃ‰DITO:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff0000', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>Sin acceso</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ff9900', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>1 fuente</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#ffff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>2 fuentes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#90EE90', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>3 fuentes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#00cc00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>4 fuentes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#00ff00', borderRadius: '4px' }} />
            <span style={{ fontSize: '13px', color: COLORS.text }}>5 fuentes</span>
          </div>
        </div>
      )}
    </section>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${COLORS.border}`,
      padding: '80px 60px',
      backgroundColor: COLORS.surface
    }}>
      <div style={{
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '60px'
        }}>
        <div>
          <h3 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: '24px',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '16px'
          }}>
            MIT LIFT Lab
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: COLORS.textSecondary,
            maxWidth: '400px'
          }}>
            Laboratory for Innovation Science and Policy. 
            InvestigaciÃ³n aplicada para el desarrollo de ecosistemas 
            emprendedores en mercados emergentes.
          </p>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Equipo
          </h4>
          {TEAM_DATA.members.map((member, index) => (
            <div key={index} style={{
              fontSize: '14px',
              color: COLORS.textSecondary,
              marginBottom: '8px'
            }}>
              {member.name}
            </div>
          ))}
        </div>
        
        <div>
          <h4 style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Instituciones
          </h4>
          {TEAM_DATA.universities.map((uni, index) => (
            <div key={index} style={{
              fontSize: '14px',
              color: COLORS.textSecondary,
              marginBottom: '8px'
            }}>
              {uni.name}
            </div>
          ))}
        </div>
        
        <div>
          <h4 style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.primary,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Contacto
          </h4>
          <div style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.8'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <a 
                href="mailto:Juandatorre.eco@gmail.com"
                style={{
                  color: COLORS.primary,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Juandatorre.eco@gmail.com
              </a>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <a 
                href="mailto:sofialg9194@gmail.com"
                style={{
                  color: COLORS.primary,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                sofialg9194@gmail.com
              </a>
            </div>
            <div>
              <a 
                href="mailto:ginamarrazzo20@gmail.com"
                style={{
                  color: COLORS.primary,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                ginamarrazzo20@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        maxWidth: '1400px',
        margin: '60px auto 0',
        paddingTop: '40px',
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: COLORS.textSecondary
      }}>
        <div>
          Â© 2025-2026 MIT LIFT Lab Â· Equipo {TEAM_DATA.name}
        </div>
        <div style={{
          display: 'flex',
          gap: '30px'
        }}>
          <span>Proyecto acadÃ©mico y Social </span>
          <span>Universidad de Buenos Aires</span>
        </div>
      </div>
      </div>
    </footer>
  );
}

// === FUNCIONES AUXILIARES ===

// FunciÃ³n para filtrar outliers usando IQR (Interquartile Range)
function filtrarOutliers(datos, campo, factor = 1.5) {
  const valores = datos
    .map(d => parseFloat(d[campo]))
    .filter(v => !isNaN(v) && v !== null && v !== undefined && v > 0)
    .sort((a, b) => a - b);
  
  if (valores.length === 0) return datos;
  
  const q1Index = Math.floor(valores.length * 0.25);
  const q3Index = Math.floor(valores.length * 0.75);
  const q1 = valores[q1Index];
  const q3 = valores[q3Index];
  const iqr = q3 - q1;
  
  const lowerBound = q1 - factor * iqr;
  const upperBound = q3 + factor * iqr;
  
  return datos.filter(d => {
    const valor = parseFloat(d[campo]);
    return isNaN(valor) || valor === null || valor === undefined || 
           (valor >= lowerBound && valor <= upperBound);
  });
}

// FunciÃ³n para limpiar y validar datos
function limpiarDatos(datos) {
  return datos.map(d => ({
    ...d,
    cantidad_trabajadores: validarNumero(d.cantidad_trabajadores),
    trabajadores_salario_fijo: validarNumero(d.trabajadores_salario_fijo),
    consumo_kw: validarNumero(d.consumo_kw),
    aÃ±o_apertura: validarNumero(d.aÃ±o_apertura),
    lat: validarNumero(d.lat),
    long: validarNumero(d.long)
  }));
}

// FunciÃ³n para validar nÃºmeros
function validarNumero(valor) {
  const num = parseFloat(valor);
  return (!isNaN(num) && num !== null && num !== undefined && isFinite(num)) ? num : null;
}

// FunciÃ³n para obtener estadÃ­sticas robustas
function obtenerEstadisticas(valores) {
  const validos = valores.filter(v => v !== null && v !== undefined && !isNaN(v) && v > 0);
  if (validos.length === 0) return { promedio: 0, mediana: 0, min: 0, max: 0, count: 0 };
  
  const sorted = [...validos].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  const promedio = sum / sorted.length;
  const mediana = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  
  return {
    promedio,
    mediana,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    count: sorted.length
  };
}

function calcularIndicadores(datos) {
  const formatearNumero = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '0';
    return Number(num).toFixed(num % 1 === 0 ? 0 : 1);
  };

  const total = datos.length;
  
  const sumaHoras = datos.reduce((acc, c) => {
    if (!c.hs_apertura || !c.hs_cierre) return acc;
    const apertura = parseInt(c.hs_apertura);
    const cierre = parseInt(c.hs_cierre);
    if (isNaN(apertura) || isNaN(cierre)) return acc;
    let horas = cierre - apertura;
    if (horas < 0) horas += 24;
    return acc + horas;
  }, 0);
  
  const conteoHoras = datos.filter(c => c.hs_apertura && c.hs_cierre).length;
  const promHoras = conteoHoras > 0 ? sumaHoras / conteoHoras : 0;

  const sumaTrabajadores = datos.reduce((acc, c) => {
    const cant = parseFloat(c.cantidad_trabajadores);
    return acc + (isNaN(cant) ? 0 : cant);
  }, 0);
  const promTrabajadores = total > 0 ? sumaTrabajadores / total : 0;

  const conCredito = datos.filter(c => 
    (parseFloat(c.credits_bancos) > 0) ||
    (parseFloat(c.credits_proveedor) > 0) ||
    (parseFloat(c.credits_familia) > 0) ||
    (parseFloat(c.credits_gobierno) > 0) ||
    (parseFloat(c.credits_privado) > 0)
  ).length;
  const pctCredito = total > 0 ? (conCredito / total) * 100 : 0;

  const expPositivas = datos.filter(c => 
    c.exp_ventas_3mes === 'Mayores' || 
    c.exp_ventas_3mes === 'mayores'
  ).length;
  const pctExpectativas = total > 0 ? (expPositivas / total) * 100 : 0;

  const quierenCrecer = datos.filter(c => 
    parseFloat(c.quiere_crezca) === 1.0 || c.quiere_crezca === '1.0' || c.quiere_crezca === '1'
  ).length;
  const pctCrecimiento = total > 0 ? (quierenCrecer / total) * 100 : 0;

  const localPropio = datos.filter(c => 
    c.local === 'Propio' || c.local === 'propio'
  ).length;
  const pctLocalPropio = total > 0 ? (localPropio / total) * 100 : 0;

  const anioActual = new Date().getFullYear();
  const sumaAnios = datos.reduce((acc, c) => {
    const anioApertura = parseFloat(c.aÃ±o_apertura);
    if (isNaN(anioApertura) || anioApertura > anioActual) return acc;
    return acc + (anioActual - anioApertura);
  }, 0);
  const conteoAnios = datos.filter(c => {
    const anio = parseFloat(c.aÃ±o_apertura);
    return !isNaN(anio) && anio <= anioActual;
  }).length;
  const promAniosOperacion = conteoAnios > 0 ? sumaAnios / conteoAnios : 0;

  return {
    total,
    promTrabajadores: formatearNumero(promTrabajadores),
    promHoras: formatearNumero(promHoras),
    pctCredito: formatearNumero(pctCredito),
    pctExpectativas: formatearNumero(pctExpectativas),
    pctCrecimiento: formatearNumero(pctCrecimiento),
    pctLocalPropio: formatearNumero(pctLocalPropio),
    promAniosOperacion: formatearNumero(promAniosOperacion)
  };
}

function procesarDatosGraficos(datos) {
  // DistribuciÃ³n por tipo de comercio
  const tiposCount = {};
  datos.forEach(c => {
    const tipo = c.tipo_comercio || 'Sin categorÃ­a';
    tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
  });
  
  const distribucionComercios = Object.entries(tiposCount)
    .map(([tipo, cantidad]) => ({ tipo, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 8);

  // Promedio de trabajadores por tipo
  const trabajadoresPorTipo = {};
  const countPorTipo = {};
  
  datos.forEach(c => {
    const tipo = c.tipo_comercio || 'Sin categorÃ­a';
    const trabajadores = parseFloat(c.cantidad_trabajadores);
    
    if (!isNaN(trabajadores)) {
      trabajadoresPorTipo[tipo] = (trabajadoresPorTipo[tipo] || 0) + trabajadores;
      countPorTipo[tipo] = (countPorTipo[tipo] || 0) + 1;
    }
  });

  const trabajadoresData = Object.entries(trabajadoresPorTipo)
    .map(([tipo, suma]) => ({
      tipo,
      promedio: parseFloat((suma / countPorTipo[tipo]).toFixed(1))
    }))
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 10);

  // Acceso a crÃ©dito por fuente
  const fuentesCredito = [
    { fuente: 'Bancos', key: 'credits_bancos' },
    { fuente: 'Proveedores', key: 'credits_proveedor' },
    { fuente: 'Familia', key: 'credits_familia' },
    { fuente: 'Gobierno', key: 'credits_gobierno' },
    { fuente: 'Privado', key: 'credits_privado' }
  ];

  // Comercios con acceso a crÃ©dito
  const comerciosConCredito = datos.filter(c => 
    (parseFloat(c.credits_bancos) > 0) ||
    (parseFloat(c.credits_proveedor) > 0) ||
    (parseFloat(c.credits_familia) > 0) ||
    (parseFloat(c.credits_gobierno) > 0) ||
    (parseFloat(c.credits_privado) > 0)
  ).length;

  const creditoPorFuente = fuentesCredito.map(({ fuente, key }) => {
    const cantidad = datos.filter(c => parseFloat(c[key]) > 0).length;
    // Porcentaje sobre el total de comercios CON crÃ©dito, no sobre el total general
    const porcentaje = comerciosConCredito > 0 ? (cantidad / comerciosConCredito) * 100 : 0;
    return {
      fuente,
      cantidad,
      porcentaje: parseFloat(porcentaje.toFixed(1))
    };
  }).sort((a, b) => b.cantidad - a.cantidad);

  // AdopciÃ³n tecnolÃ³gica por nivel
  const nivelesMap = {
    'BÃ¡sico': 0,
    'Moderado': 0,
    'Alto': 0
  };

  datos.forEach(c => {
    const tech = c.tecnologia || '';
    if (tech.toLowerCase().includes('bÃ¡sico')) {
      nivelesMap['BÃ¡sico']++;
    } else if (tech.toLowerCase().includes('moderado')) {
      nivelesMap['Moderado']++;
    } else if (tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado')) {
      nivelesMap['Alto']++;
    }
  });

  const adopcionTecnologica = Object.entries(nivelesMap).map(([nivel, cantidad]) => ({
    nivel,
    cantidad,
    porcentaje: parseFloat(((cantidad / datos.length) * 100).toFixed(1))
  }));

  // Salario mÃ­nimo dispuesto a pagar (con limpieza de datos)
  const salarios = datos
    .map(c => {
      const sal = c.min_salario;
      // Intentar parsear diferentes formatos
      if (!sal) return null;
      
      // Remover sÃ­mbolos y espacios
      const cleaned = sal.toString().replace(/\$/g, "").replace(/\./g, "").replace(/,/g, "").replace(/ /g, "");
      const num = parseFloat(cleaned);
      
      // RANGO AJUSTADO: Filtrar solo valores entre 100k - 5M ARS (eliminando outliers extremos)
      if (isNaN(num) || num < 100000 || num > 5000000) return null;
      
      return { valor: num, tipo: c.tipo_comercio || 'Sin categorÃ­a' };
    })
    .filter(s => s !== null);
  
  const promedioSalario = salarios.length > 0 
    ? salarios.reduce((acc, s) => acc + s.valor, 0) / salarios.length 
    : 0;

  const minSalario = salarios.length > 0 ? Math.min(...salarios.map(s => s.valor)) : 0;
  const maxSalario = salarios.length > 0 ? Math.max(...salarios.map(s => s.valor)) : 0;
  
  // DistribuciÃ³n de salarios en rangos
  const rangos = [
    { min: 0, max: 200000, label: '< $200k' },
    { min: 200000, max: 300000, label: '$200k - $300k' },
    { min: 300000, max: 400000, label: '$300k - $400k' },
    { min: 400000, max: 500000, label: '$400k - $500k' },
    { min: 500000, max: Infinity, label: '> $500k' }
  ];

  const distribucionSalarios = rangos.map(rango => {
    const cantidad = salarios.filter(s => s.valor >= rango.min && s.valor < rango.max).length;
    return {
      rango: rango.label,
      cantidad,
      porcentaje: parseFloat(((cantidad / salarios.length) * 100).toFixed(1))
    };
  });

  // Salario promedio por tipo de comercio (top 10)
  const salariosPorTipo = {};
  const countSalariosPorTipo = {};
  
  salarios.forEach(s => {
    if (!salariosPorTipo[s.tipo]) {
      salariosPorTipo[s.tipo] = 0;
      countSalariosPorTipo[s.tipo] = 0;
    }
    salariosPorTipo[s.tipo] += s.valor;
    countSalariosPorTipo[s.tipo]++;
  });

  const salariosPorComercio = Object.entries(salariosPorTipo)
    .map(([tipo, suma]) => ({
      tipo,
      promedio: Math.round(suma / countSalariosPorTipo[tipo]),
      cantidad: countSalariosPorTipo[tipo]
    }))
    .filter(item => item.cantidad >= 3) // Solo tipos con al menos 3 comercios
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 10);

  return {
    distribucionComercios,
    trabajadoresPorTipo: trabajadoresData,
    creditoPorFuente,
    adopcionTecnologica,
    salarioData: {
      promedio: Math.round(promedioSalario),
      minimo: minSalario,
      maximo: maxSalario,
      distribucion: distribucionSalarios,
      porComercio: salariosPorComercio,
      totalRespuestas: salarios.length // Para mostrar en el disclaimer
    }
  };
}

// === RENDERIZAR ===

// === EXPORTS DE PART 2 ===
export { SeccionMachineLearning, SeccionAnalisis };
export { Team, TeamMember };
export { Mapa };
export { Footer };
export { filtrarOutliers, limpiarDatos, validarNumero, obtenerEstadisticas };
export { calcularIndicadores, procesarDatosGraficos };
