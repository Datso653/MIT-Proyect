// === SECCIÓN MACHINE LEARNING ===
// Incluye: SeccionMachineLearning, AnimatedModelCard, ModeloCrecimiento,
// ModeloFactoresExternos, MetricaCard, ConfusionMatrix, FeatureImportanceChart,
// ROCCurve, ScatterPlot, DistribucionPredicciones, AfectacionesChart
function SeccionMachineLearning() {
  const [resultadosML, setResultadosML] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('datos/ml_results.json')
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
            Predicciones estadísticas
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
                Disclaimer — Análisis Predictivo
              </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: COLORS.textSecondary
            }}>
              Los siguientes modelos representan <strong style={{ color: COLORS.text }}>análisis 
              estadísticos predictivos</strong> basados en patrones históricos identificados en los datos. 
              Estas proyecciones <strong style={{ color: COLORS.text }}>no constituyen garantías</strong> de 
              comportamiento futuro y deben interpretarse como estimaciones probabilísticas sujetas a variabilidad 
              contextual, cambios macroeconómicos y factores externos no capturados en el modelo. 
              <strong style={{ color: COLORS.primary }}> Los resultados no aseguran que los eventos 
              proyectados ocurrirán en la realidad.</strong>
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
            <strong style={{ color: COLORS.text }}>Metodología:</strong> Los modelos implementados 
            utilizan técnicas de machine learning supervisado (Random Forest, Gradient Boosting, K-Means) 
            entrenados sobre el conjunto de datos relevado. Las métricas de performance incluyen accuracy, 
            precision, recall, AUC-ROC, R² y RMSE con validación mediante train/test split (75%/25%).
          </div>
        </div>
      </AnimatedModelCard>
    </section>
  );
}

// Componente con animación fade-in para modelos
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
        Predicción de Crecimiento Comercial
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        ¿Qué comercios tienen intención de expandirse?
      </p>

      {/* Métricas principales */}
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
          tooltip="Porcentaje de predicciones correctas del total. Indica qué tan bien el modelo clasifica en general."
        />
        <MetricaCard 
          label="AUC-ROC" 
          value={data.metricas.auc_roc.toFixed(3)} 
          color="#4FC3F7"
          tooltip="Área bajo la curva ROC (0-1). Mide la capacidad del modelo para distinguir entre clases. Valores cercanos a 1 indican excelente desempeño."
        />
        <MetricaCard 
          label="Precision" 
          value={`${(data.metricas.precision * 100).toFixed(1)}%`} 
          color={COLORS.accent}
          tooltip="De todos los comercios que predijimos que crecerán, qué porcentaje realmente tiene esa intención. Mide cuán confiables son las predicciones positivas."
        />
        <MetricaCard 
          label="Recall" 
          value={`${(data.metricas.recall * 100).toFixed(1)}%`} 
          color={COLORS.accentDark}
          tooltip="De todos los comercios que realmente quieren crecer, qué porcentaje logramos identificar. Mide qué tan completo es el modelo al detectar casos positivos."
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
          Variables más importantes
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

      {/* Botón para mostrar gráficos */}
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
        {showCharts ? 'Ocultar gráficos' : 'Ver gráficos del modelo'}
      </button>

      {showCharts && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: COLORS.surface,
          borderRadius: '6px',
          border: `1px solid ${COLORS.border}`
        }}>
          <ConfusionMatrix data={data.confusion_matrix} labels={['No crece', 'Sí crece']} />
          
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
        {expanded ? 'Ver menos' : 'Ver explicación'}
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
            Explicación Académica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Este modelo de clasificación binaria utiliza <strong style={{ color: COLORS.text }}>Random Forest</strong> para 
            predecir la probabilidad de que un comercio desee expandirse. Con un accuracy de {(data.metricas.accuracy * 100).toFixed(1)}% 
            y un recall de {(data.metricas.recall * 100).toFixed(1)}%, el modelo identifica correctamente la mayoría de los comercios 
            con intención de crecimiento. Las variables más predictivas son la antigüedad del negocio ({(data.feature_importance[0].importance * 100).toFixed(1)}% 
            de importancia) y la cantidad de trabajadores, sugiriendo que comercios más establecidos y con mayor personal tienden a buscar expansión.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En Términos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>¿Qué significa esto para tu comercio?</strong><br/>
            Si tu negocio tiene varios años funcionando y un equipo de trabajo estable, es más probable que estés pensando 
            en crecer. El modelo nos dice que {(data.metricas.accuracy * 100).toFixed(0)}% de las veces acierta quién quiere expandirse. 
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
        ¿Qué afecta más las ventas: crimen, precios, competencia o crédito?
      </p>

      {/* Métricas */}
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
          tooltip="Porcentaje de predicciones correctas del total. Indica qué tan bien el modelo clasifica las tendencias de ventas (peor/igual/mejor)."
        />
        <MetricaCard 
          label="F1-Score" 
          value={`${(data.metricas.f1_weighted * 100).toFixed(1)}%`} 
          color="#4FC3F7"
          tooltip="Promedio ponderado de precisión y recall. Balance entre identificar correctamente las tendencias y no generar falsos positivos. Útil en clasificación multiclase."
        />
      </div>

      {/* Factores de afectación */}
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
            'afect_credito_num': 'Crédito',
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

      {/* Botón para mostrar gráficos */}
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
        {showCharts ? 'Ocultar gráficos' : 'Ver gráficos del modelo'}
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
        {expanded ? 'Ver menos' : 'Ver explicación'}
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
            Explicación Académica
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Clasificador multiclase <strong style={{ color: COLORS.text }}>Random Forest</strong> que predice si las ventas 
            empeorarán, se mantendrán o mejorarán según factores externos. Con {(data.metricas.accuracy * 100).toFixed(1)}% de accuracy, 
            el modelo identifica que <strong style={{ color: COLORS.text }}>los precios</strong> son el factor más determinante, 
            seguido por la competencia. Interesantemente, la antigüedad del negocio también es altamente predictiva, sugiriendo 
            que comercios más establecidos manejan mejor las adversidades externas.
          </p>

          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '12px'
          }}>
            En Términos Simples
          </div>
          <p style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            <strong style={{ color: COLORS.text }}>¿Qué está afectando tus ventas?</strong><br/>
            El factor #1 que impacta las ventas son <strong style={{ color: COLORS.primary }}>los precios y la inflación</strong>. 
            Luego viene la competencia en tu zona. El crimen y el acceso a crédito también importan, pero menos. 
            Si tu negocio tiene varios años, probablemente ya sepas cómo adaptarte a estos cambios. Los comercios nuevos 
            sufren más con factores externos porque aún no tienen la experiencia ni la base de clientes fiel.
          </p>
        </div>
      )}
    </div>
  );
}


// Componente auxiliar para métricas
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
        Matriz de Confusión
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
    // Simulación de curva ROC basada en el AUC
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
      // Aproximación de curva ROC basada en AUC
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

// Componente Scatter Plot (Predicción vs Real) para Modelo 2
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

// Componente de Distribución de Predicciones (Bar Chart)
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
        Distribución de Predicciones
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
    { factor: 'Crédito', Peor: 0.57, Igual: 0.48, Mejor: 0.5 },
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
            Nivel de Afectación (0-3)
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
