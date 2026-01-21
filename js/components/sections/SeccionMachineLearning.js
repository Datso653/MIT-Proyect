// === SECCIÓN ANÁLISIS DE HIPÓTESIS GEOESPACIALES ===
// Incluye: SeccionMachineLearning, HipotesisConGraficos, AnimatedModelCard, ModeloCrecimiento,
// ModeloFactoresExternos, MetricaCard, ConfusionMatrix, FeatureImportanceChart,
// ROCCurve, ScatterPlot, DistribucionPredicciones, AfectacionesChart

function SeccionMachineLearning({ datos, language = 'es' }) {
  const [resultadosML, setResultadosML] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = (key) => getTranslation(language, key);

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
      <section id="machine-learning" className="fade-up" style={{
        padding: '120px 60px',
        backgroundColor: COLORS.surface,
        textAlign: 'center'
      }}>
        <div style={{ color: COLORS.primary }}>{t('mlLoading')}</div>
      </section>
    );
  }

  if (!resultadosML || !resultadosML.modelos) {
    return null;
  }

  return (
    <section id="machine-learning" className="fade-up" style={{
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
            color: COLORS.accent,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            {t('mlSubtitle')}
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '30px'
          }}>
            {t('mlTitle')}
          </h2>

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
                {t('mlMethodology')}
              </div>
              <div style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: COLORS.textSecondary
              }}>
                {t('mlMethodologyText')}
              </div>
            </div>
          </div>
        </div>
      </AnimatedModelCard>

      {/* HIPÓTESIS 1 Y 2 - Análisis Estadístico */}
      <div style={{ marginBottom: '60px' }}>
        {datos && datos.length > 0 && (
          <>
            <AnimatedModelCard delay={100}>
              <HipotesisConGraficos
                numero={1}
                titulo={t('mlH1Question')}
                datos={datos}
                tipo="crecimiento"
                language={language}
              />
            </AnimatedModelCard>

            <AnimatedModelCard delay={200}>
              <HipotesisConGraficos
                numero={2}
                titulo={t('mlH2Question')}
                datos={datos}
                tipo="tecnologia"
                language={language}
              />
            </AnimatedModelCard>
          </>
        )}
      </div>


      {/* Título Hallazgos Adicionales */}
      <AnimatedModelCard delay={250}>
        <div style={{
          marginTop: '80px',
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.accent,
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            {t('mlAdditionalTitle')}
          </div>
          <h2 style={{
            fontFamily: '"Crimson Pro", serif',
            fontSize: 'clamp(32px, 3.5vw, 44px)',
            fontWeight: '400',
            color: COLORS.text,
            marginBottom: '20px'
          }}>
            {t('mlAdditionalSubtitle')}
          </h2>
          <p style={{
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '15px',
            color: COLORS.textSecondary,
            lineHeight: '1.7'
          }}>
            {t('mlAdditionalDescription')}
          </p>
        </div>
      </AnimatedModelCard>
      {/* CURIOSIDADES - Modelos Predictivos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
        gap: '60px'
      }}>
        <AnimatedModelCard delay={300}>
          <ModeloCrecimiento data={resultadosML.modelos.modelo_1_crecimiento} language={language} />
        </AnimatedModelCard>
        <AnimatedModelCard delay={400}>
          <ModeloFactoresExternos data={resultadosML.modelos.modelo_3_factores_externos} language={language} />
        </AnimatedModelCard>
      </div>

    </section>
  );
}

// Componente HipotesisConGraficos (H1 y H2)
function HipotesisConGraficos({ numero, titulo, datos, tipo, language = 'es' }) {
  const [expanded, setExpanded] = useState(false);
  const t = (key) => getTranslation(language, key);

  if (!datos || datos.length === 0) {
    return (
      <div style={{
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '8px',
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{ color: COLORS.accent, fontSize: '14px', fontWeight: '600' }}>
          HIPÓTESIS {numero}: {titulo}
        </div>
        <div style={{ color: COLORS.textSecondary, fontSize: '13px', marginTop: '10px' }}>
          {t('mlNoData')}
        </div>
      </div>
    );
  }

  // Análisis real para Hipótesis 1
  const analizarHipotesis1 = () => {
    const grupoAdverso = datos.filter(c => {
      const crimenAlto = c.afect_crimen === 'Mucho';
      const sinCredito = !(parseFloat(c.credits_bancos) > 0 ||
                         parseFloat(c.credits_proveedor) > 0 ||
                         parseFloat(c.credits_familia) > 0 ||
                         parseFloat(c.credits_gobierno) > 0 ||
                         parseFloat(c.credits_privado) > 0);
      return crimenAlto && sinCredito;
    });

    const grupoComparacion = datos.filter(c => {
      const crimenAlto = c.afect_crimen === 'Mucho';
      const sinCredito = !(parseFloat(c.credits_bancos) > 0 ||
                         parseFloat(c.credits_proveedor) > 0 ||
                         parseFloat(c.credits_familia) > 0 ||
                         parseFloat(c.credits_gobierno) > 0 ||
                         parseFloat(c.credits_privado) > 0);
      return !(crimenAlto && sinCredito);
    });

    const adversoQuiereCrecer = grupoAdverso.filter(c => {
      const quiereCrecer = parseFloat(c.quiere_crezca) === 1.0 ||
                          c.quiere_crezca === '1.0' ||
                          c.quiere_crezca === '1';
      return quiereCrecer;
    }).length;

    const comparacionQuiereCrecer = grupoComparacion.filter(c => {
      const quiereCrecer = parseFloat(c.quiere_crezca) === 1.0 ||
                          c.quiere_crezca === '1.0' ||
                          c.quiere_crezca === '1';
      return quiereCrecer;
    }).length;

    const totalAdverso = grupoAdverso.length;
    const totalComparacion = grupoComparacion.length;

    return {
      grupoAdverso: totalAdverso,
      grupoComparacion: totalComparacion,
      adversoQuiereCrecer,
      comparacionQuiereCrecer,
      pctAdverso: totalAdverso > 0 ? (adversoQuiereCrecer / totalAdverso) * 100 : 0,
      pctComparacion: totalComparacion > 0 ? (comparacionQuiereCrecer / totalComparacion) * 100 : 0,
      datosGrupoAdverso: grupoAdverso,
      datosGrupoComparacion: grupoComparacion
    };
  };

  // Análisis real para Hipótesis 2
  const analizarHipotesis2 = () => {
    const grupoAdverso = datos.filter(c => {
      const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
      const conCredito = (parseFloat(c.credits_bancos) > 0 ||
                         parseFloat(c.credits_proveedor) > 0 ||
                         parseFloat(c.credits_familia) > 0 ||
                         parseFloat(c.credits_gobierno) > 0 ||
                         parseFloat(c.credits_privado) > 0);
      return crimenBajo && conCredito;
    });

    const grupoComparacion = datos.filter(c => {
      const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
      const conCredito = (parseFloat(c.credits_bancos) > 0 ||
                         parseFloat(c.credits_proveedor) > 0 ||
                         parseFloat(c.credits_familia) > 0 ||
                         parseFloat(c.credits_gobierno) > 0 ||
                         parseFloat(c.credits_privado) > 0);
      return !(crimenBajo && conCredito);
    });

    const adversoInvierteTecnologia = grupoAdverso.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
    }).length;

    const comparacionInvierteTecnologia = grupoComparacion.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
    }).length;

    const totalAdverso = grupoAdverso.length;
    const totalComparacion = grupoComparacion.length;

    return {
      grupoAdverso: totalAdverso,
      grupoComparacion: totalComparacion,
      adversoInvierteTecnologia,
      comparacionInvierteTecnologia,
      pctAdverso: totalAdverso > 0 ? (adversoInvierteTecnologia / totalAdverso) * 100 : 0,
      pctComparacion: totalComparacion > 0 ? (comparacionInvierteTecnologia / totalComparacion) * 100 : 0,
      datosGrupoAdverso: grupoAdverso,
      datosGrupoComparacion: grupoComparacion
    };
  };

  // Seleccionar análisis según el tipo
  const analisis = tipo === 'crecimiento' ? analizarHipotesis1() : analizarHipotesis2();

  // Si no hay datos en algún grupo, mostrar mensaje
  if (analisis.grupoAdverso === 0 || analisis.grupoComparacion === 0) {
    return (
      <div style={{
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: COLORS.surface,
        borderRadius: '8px',
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{ color: COLORS.accent, fontSize: '14px', fontWeight: '600' }}>
          HIPÓTESIS {numero}: {titulo}
        </div>
        <div style={{ color: COLORS.textSecondary, fontSize: '13px', marginTop: '10px' }}>
          {t('mlInsufficientData')}
          <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
            <li>{t('mlAnalysisGroup')}: {analisis.grupoAdverso} {t('mlBusinesses')}</li>
            <li>{t('mlComparisonGroup')}: {analisis.grupoComparacion} {t('mlBusinesses')}</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      marginBottom: '40px',
      border: `1px solid ${COLORS.border}`,
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Encabezado de la hipótesis */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '20px 30px',
          backgroundColor: COLORS.surface,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderLeft: `4px solid ${numero === 1 ? COLORS.primary : COLORS.accent}`
        }}
      >
        <div>
          <div style={{ fontSize: '13px', color: COLORS.primary, fontWeight: '600', marginBottom: '4px' }}>
            HIPÓTESIS {numero}
          </div>
          <div style={{ fontSize: '18px', color: COLORS.text, fontWeight: '500' }}>
            {titulo}
          </div>
        </div>
        <div style={{ fontSize: '20px', color: COLORS.primary }}>
          {expanded ? '−' : '+'}
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '30px', backgroundColor: COLORS.background }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: COLORS.text, marginBottom: '15px' }}>
              {t('mlHypothesisResults')}
            </h4>

            {/* Gráfico de barras comparativo */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h5 style={{ color: COLORS.textSecondary, marginBottom: '10px' }}>
                  {t('mlAnalysisGroup')}
                </h5>
                <div style={{
                  padding: '15px',
                  backgroundColor: COLORS.surface,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${COLORS.primary}`
                }}>
                  <div style={{ fontSize: '24px', color: COLORS.primary, fontWeight: 'bold' }}>
                    {analisis.pctAdverso.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>
                    de {analisis.grupoAdverso} {t('mlBusinesses')}
                  </div>
                  <div style={{ fontSize: '12px', color: COLORS.textTertiary, marginTop: '8px' }}>
                    ({analisis[tipo === 'crecimiento' ? 'adversoQuiereCrecer' : 'adversoInvierteTecnologia']} {t('mlBusinesses')})
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: '300px' }}>
                <h5 style={{ color: COLORS.textSecondary, marginBottom: '10px' }}>
                  {t('mlComparisonGroup')}
                </h5>
                <div style={{
                  padding: '15px',
                  backgroundColor: COLORS.surface,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${COLORS.accent}`
                }}>
                  <div style={{ fontSize: '24px', color: COLORS.accent, fontWeight: 'bold' }}>
                    {analisis.pctComparacion.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>
                    de {analisis.grupoComparacion} {t('mlBusinesses')}
                  </div>
                  <div style={{ fontSize: '12px', color: COLORS.textTertiary, marginTop: '8px' }}>
                    ({analisis[tipo === 'crecimiento' ? 'comparacionQuiereCrecer' : 'comparacionInvierteTecnologia']} {t('mlBusinesses')})
                  </div>
                </div>
              </div>
            </div>

            {/* Diferencia porcentual */}
            <div style={{
              padding: '15px',
              backgroundColor: `${COLORS.primary}10`,
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: COLORS.text, fontWeight: '500' }}>
                {t('mlDifference')} <span style={{ color: COLORS.primary, fontWeight: 'bold' }}>
                  {(analisis.pctAdverso - analisis.pctComparacion).toFixed(1)} {t('mlPercentagePoints')}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '5px' }}>
                {analisis.pctAdverso > analisis.pctComparacion
                  ? t('mlAnalysisHigher')
                  : t('mlAnalysisLower')}
              </div>
            </div>

            {/* Conclusión */}
            <div style={{
              padding: '20px',
              backgroundColor: `${analisis.pctAdverso > analisis.pctComparacion ? COLORS.primary : COLORS.accent}15`,
              borderRadius: '8px',
              borderLeft: `4px solid ${analisis.pctAdverso > analisis.pctComparacion ? COLORS.primary : COLORS.accent}`
            }}>
              <div style={{ fontSize: '14px', color: COLORS.text, fontWeight: '500', marginBottom: '8px' }}>
                {t('mlConclusion')}
              </div>
              <div style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                {analisis.pctAdverso > analisis.pctComparacion
                  ? '❌ ' + t('mlConclusionNotSupported')
                  : '✅ ' + t('mlConclusionSupported')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente con animación fade-in
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

// Hipótesis 3: Modelo de Crecimiento
function ModeloCrecimiento({ data, language = 'es' }) {
  const [expanded, setExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const t = (key) => getTranslation(language, key);

  if (!data || !data.metricas || !data.feature_importance) {
    return null;
  }
  
  return (
    <div style={{
      border: `1px solid ${COLORS.border}`,
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Header clickeable */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '20px 30px',
          backgroundColor: COLORS.surface,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderLeft: `4px solid ${COLORS.primary}`
        }}
      >
          <div>
            <div style={{
              fontSize: '13px',
              color: COLORS.primary,
              marginBottom: '4px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              CURIOSIDAD 1
            </div>
            <div style={{ fontSize: '18px', color: COLORS.text, fontWeight: '500' }}>
              {t('mlCuriosity1Question')}
            </div>
          </div>
          <div style={{ fontSize: '20px', color: COLORS.primary }}>
            {expanded ? '−' : '+'}
          </div>
        </div>
  
        {expanded && (
          <div style={{
            padding: '40px',
            backgroundColor: COLORS.background
          }}>
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
              tooltip="Porcentaje de predicciones correctas del total."
            />
            <MetricaCard 
              label="AUC-ROC" 
              value={data.metricas.auc_roc.toFixed(3)} 
              color="#4FC3F7"
              tooltip="Área bajo la curva ROC. Valores cercanos a 1 indican excelente desempeño."
            />
            <MetricaCard 
              label="Precision" 
              value={`${(data.metricas.precision * 100).toFixed(1)}%`} 
              color={COLORS.accent}
              tooltip="De todos los comercios que predijimos que crecerán, qué porcentaje realmente tiene esa intención."
            />
            <MetricaCard 
              label="Recall" 
              value={`${(data.metricas.recall * 100).toFixed(1)}%`} 
              color={COLORS.accentDark}
              tooltip="De todos los comercios que realmente quieren crecer, qué porcentaje logramos identificar."
            />
          </div>

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
              {t('mlTopVariables')}
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCharts(!showCharts);
            }}
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
            {showCharts ? t('mlHideCharts') : t('mlViewCharts')}
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

          <div style={{
            marginTop: '20px',
            padding: '24px',
            backgroundColor: COLORS.surface,
            borderRadius: '6px',
            borderLeft: `3px solid ${COLORS.primary}`
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px'
            }}>
              {t('mlAcademicExplanation')}
            </div>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              {t('mlModelGrowthAcademic')}
            </p>

            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px'
            }}>
              {t('mlSimpleTerms')}
            </div>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.7'
            }}>
              {t('mlModelGrowthSimple')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Hipótesis 4: Modelo de Factores Externos
function ModeloFactoresExternos({ data, language = 'es' }) {
  const [expanded, setExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const t = (key) => getTranslation(language, key);

  if (!data || !data.metricas || !data.feature_importance || !data.confusion_matrix) {
    return null;
  }
  
  return (
    <div style={{
      border: `1px solid ${COLORS.border}`,
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Header clickeable */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '20px 30px',
          backgroundColor: COLORS.surface,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderLeft: `4px solid ${COLORS.accent}`
        }}
      >
        <div>
          <div style={{
            fontSize: '13px',
            color: COLORS.primary,
            marginBottom: '4px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            CURIOSIDAD 2
          </div>
          <div style={{ fontSize: '18px', color: COLORS.text, fontWeight: '500' }}>
            {t('mlCuriosity2Question')}
          </div>
        </div>
        <div style={{ fontSize: '20px', color: COLORS.primary }}>
          {expanded ? '−' : '+'}
        </div>
      </div>

      {/* Contenido expandible */}
      {expanded && (
        <div style={{
          padding: '40px',
          backgroundColor: COLORS.background
        }}>
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
              tooltip="Porcentaje de predicciones correctas del total."
            />
            <MetricaCard 
              label="F1-Score" 
              value={`${(data.metricas.f1_weighted * 100).toFixed(1)}%`} 
              color="#4FC3F7"
              tooltip="Balance entre precisión y recall. Útil en clasificación multiclase."
            />
          </div>

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
              {t('mlImpactFactors')}
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCharts(!showCharts);
            }}
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
            {showCharts ? t('mlHideCharts') : t('mlViewCharts')}
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

          <div style={{
            marginTop: '20px',
            padding: '24px',
            backgroundColor: COLORS.surface,
            borderRadius: '6px',
            borderLeft: `3px solid ${COLORS.accent}`
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px'
            }}>
              {t('mlAcademicExplanation')}
            </div>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              {t('mlModelFactorsAcademic')}
            </p>

            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: '12px'
            }}>
              {t('mlSimpleTerms')}
            </div>
            <p style={{
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: '1.7'
            }}>
              {t('mlModelFactorsSimple')}
            </p>
          </div>
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
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          zIndex: 1000,
          minWidth: '250px',
          maxWidth: '300px'
        }}>
          <div style={{
            fontSize: '13px',
            color: COLORS.textSecondary,
            lineHeight: '1.6',
            textAlign: 'left'
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
  
  const gridItems = [];
  
  gridItems.push(<div key="corner" />);
  
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
  
  data.forEach((row, i) => {
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
          border: isCorrect ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`
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
        La diagonal (verde) representa las predicciones correctas.
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
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  backgroundColor: color,
                  borderRadius: '5px',
                  transition: 'width 1s ease-out'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// CONTINÚA EN PARTE 3...

// Componente ROC Curve
function ROCCurve({ auc }) {
  const generateROCPoints = () => {
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
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
          
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={padding}
            stroke="#888"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          
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

// Componente de Distribución de Predicciones
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

// Componente Afectaciones por Tendencia
function AfectacionesChart() {
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
          
          {data.map((item, groupIdx) => {
            const groupX = padding.left + groupIdx * groupWidth;
            
            return (
              <g key={item.factor}>
                <rect
                  x={groupX + barWidth * 0.5}
                  y={height - padding.bottom - (item.Peor / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Peor / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Peor}
                  rx="3"
                  opacity="0.85"
                />
                
                <rect
                  x={groupX + barWidth * 1.5}
                  y={height - padding.bottom - (item.Igual / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Igual / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Igual}
                  rx="3"
                  opacity="0.85"
                />
                
                <rect
                  x={groupX + barWidth * 2.5}
                  y={height - padding.bottom - (item.Mejor / maxValue) * (height - padding.top - padding.bottom)}
                  width={barWidth}
                  height={(item.Mejor / maxValue) * (height - padding.top - padding.bottom)}
                  fill={colors.Mejor}
                  rx="3"
                  opacity="0.85"
                />
                
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
          
          {Object.entries(colors).map(([label, color], idx) => (
            <g key={label} transform={`translate(${width - padding.right + 10}, ${padding.top + idx * 25})`}>
              <rect x="0" y="0" width="15" height="15" fill={color} rx="2" />
              <text x="20" y="12" fill={COLORS.text} fontSize="11">
                {label}
              </text>
            </g>
          ))}
          
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