// === SECCIÓN ANÁLISIS DE HIPÓTESIS ===
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

    // Calcular niveles de tecnología para grupo de análisis
    const adversoTechAlta = grupoAdverso.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
    }).length;
    const adversoTechModerada = grupoAdverso.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('moderado') || tech.toLowerCase().includes('medio');
    }).length;
    const adversoTechBaja = grupoAdverso.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('bajo') || tech.toLowerCase().includes('básico') || tech.toLowerCase().includes('basico');
    }).length;

    // Calcular niveles de tecnología para grupo de comparación
    const comparacionTechAlta = grupoComparacion.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
    }).length;
    const comparacionTechModerada = grupoComparacion.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('moderado') || tech.toLowerCase().includes('medio');
    }).length;
    const comparacionTechBaja = grupoComparacion.filter(c => {
      const tech = c.tecnologia || '';
      return tech.toLowerCase().includes('bajo') || tech.toLowerCase().includes('básico') || tech.toLowerCase().includes('basico');
    }).length;

    const totalAdverso = grupoAdverso.length;
    const totalComparacion = grupoComparacion.length;

    return {
      grupoAdverso: totalAdverso,
      grupoComparacion: totalComparacion,
      adversoInvierteTecnologia: adversoTechAlta,
      comparacionInvierteTecnologia: comparacionTechAlta,
      pctAdverso: totalAdverso > 0 ? (adversoTechAlta / totalAdverso) * 100 : 0,
      pctComparacion: totalComparacion > 0 ? (comparacionTechAlta / totalComparacion) * 100 : 0,
      // Agregar desglose de niveles
      adversoTechAlta,
      adversoTechModerada,
      adversoTechBaja,
      comparacionTechAlta,
      comparacionTechModerada,
      comparacionTechBaja,
      pctAdversoAlta: totalAdverso > 0 ? (adversoTechAlta / totalAdverso) * 100 : 0,
      pctAdversoModerada: totalAdverso > 0 ? (adversoTechModerada / totalAdverso) * 100 : 0,
      pctAdversoBaja: totalAdverso > 0 ? (adversoTechBaja / totalAdverso) * 100 : 0,
      pctComparacionAlta: totalComparacion > 0 ? (comparacionTechAlta / totalComparacion) * 100 : 0,
      pctComparacionModerada: totalComparacion > 0 ? (comparacionTechModerada / totalComparacion) * 100 : 0,
      pctComparacionBaja: totalComparacion > 0 ? (comparacionTechBaja / totalComparacion) * 100 : 0,
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

            {/* Gráficos de comparación visual */}
            <div style={{ marginBottom: '30px' }}>
              <h5 style={{ color: COLORS.text, marginBottom: '20px', fontSize: '15px', fontWeight: '600' }}>
                {language === 'es' ? 'Comparación Visual' : 'Visual Comparison'}
              </h5>

              {/* Gráfico de barras comparativo */}
              <div style={{
                backgroundColor: COLORS.surface,
                borderRadius: '8px',
                padding: '25px',
                border: `1px solid ${COLORS.border}`
              }}>
                <div style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                      {t('mlAnalysisGroup')}
                    </span>
                    <span style={{ fontSize: '14px', color: COLORS.primary, fontWeight: '600' }}>
                      {analisis.pctAdverso.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: `${COLORS.primary}20`,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${analisis.pctAdverso}%`,
                      height: '100%',
                      backgroundColor: COLORS.primary,
                      transition: 'width 1s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '10px'
                    }}>
                      <span style={{ fontSize: '12px', color: COLORS.background, fontWeight: '600' }}>
                        {analisis[tipo === 'crecimiento' ? 'adversoQuiereCrecer' : 'adversoInvierteTecnologia']}/{analisis.grupoAdverso}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                      {t('mlComparisonGroup')}
                    </span>
                    <span style={{ fontSize: '14px', color: COLORS.accent, fontWeight: '600' }}>
                      {analisis.pctComparacion.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: `${COLORS.accent}20`,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${analisis.pctComparacion}%`,
                      height: '100%',
                      backgroundColor: COLORS.accent,
                      transition: 'width 1s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '10px'
                    }}>
                      <span style={{ fontSize: '12px', color: COLORS.background, fontWeight: '600' }}>
                        {analisis[tipo === 'crecimiento' ? 'comparacionQuiereCrecer' : 'comparacionInvierteTecnologia']}/{analisis.grupoComparacion}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico de distribución por condiciones */}
              <div style={{
                backgroundColor: COLORS.surface,
                borderRadius: '8px',
                padding: '25px',
                border: `1px solid ${COLORS.border}`,
                marginTop: '20px'
              }}>
                <h6 style={{
                  fontSize: '13px',
                  color: COLORS.text,
                  marginBottom: '20px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {tipo === 'crecimiento'
                    ? (language === 'es' ? 'Distribución: Expectativas de Crecimiento' : 'Distribution: Growth Expectations')
                    : (language === 'es' ? 'Distribución por Nivel de Tecnología' : 'Distribution by Technology Level')}
                </h6>

                {tipo === 'crecimiento' ? (
                  // Para Hipótesis 1: Mostrar Sí/No
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Grupo de análisis */}
                    <div>
                      <div style={{ fontSize: '12px', color: COLORS.primary, fontWeight: '600', marginBottom: '10px' }}>
                        {language === 'es' ? 'Crimen Alto + Sin Crédito' : 'High Crime + No Credit'}
                      </div>
                      <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                        <div style={{
                          flex: analisis.pctAdverso,
                          height: '40px',
                          backgroundColor: COLORS.primary,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          color: COLORS.background,
                          fontWeight: '600'
                        }}>
                          {language === 'es' ? 'Sí' : 'Yes'}
                        </div>
                        <div style={{
                          flex: 100 - analisis.pctAdverso,
                          height: '40px',
                          backgroundColor: `${COLORS.primary}30`,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          color: COLORS.text,
                          fontWeight: '600'
                        }}>
                          {language === 'es' ? 'No' : 'No'}
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: COLORS.textSecondary, textAlign: 'center' }}>
                        {analisis.pctAdverso.toFixed(1)}% vs {(100 - analisis.pctAdverso).toFixed(1)}%
                      </div>
                    </div>

                    {/* Grupo de comparación */}
                    <div>
                      <div style={{ fontSize: '12px', color: COLORS.accent, fontWeight: '600', marginBottom: '10px' }}>
                        {language === 'es' ? 'Otras Condiciones' : 'Other Conditions'}
                      </div>
                      <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                        <div style={{
                          flex: analisis.pctComparacion,
                          height: '40px',
                          backgroundColor: COLORS.accent,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          color: COLORS.background,
                          fontWeight: '600'
                        }}>
                          {language === 'es' ? 'Sí' : 'Yes'}
                        </div>
                        <div style={{
                          flex: 100 - analisis.pctComparacion,
                          height: '40px',
                          backgroundColor: `${COLORS.accent}30`,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          color: COLORS.text,
                          fontWeight: '600'
                        }}>
                          {language === 'es' ? 'No' : 'No'}
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: COLORS.textSecondary, textAlign: 'center' }}>
                        {analisis.pctComparacion.toFixed(1)}% vs {(100 - analisis.pctComparacion).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ) : (
                  // Para Hipótesis 2: Mostrar niveles de tecnología
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Grupo de análisis */}
                    <div>
                      <div style={{ fontSize: '12px', color: COLORS.primary, fontWeight: '600', marginBottom: '10px' }}>
                        {language === 'es' ? 'Crimen Bajo + Con Crédito' : 'Low Crime + With Credit'}
                      </div>
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '8px', flexDirection: 'column' }}>
                        {/* Alta */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{
                            flex: analisis.pctAdversoAlta || 0,
                            minWidth: analisis.pctAdversoAlta > 0 ? '30px' : '0',
                            height: '25px',
                            backgroundColor: '#00d084',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: COLORS.background,
                            fontWeight: '600'
                          }}>
                            {analisis.pctAdversoAlta > 5 ? `${analisis.pctAdversoAlta.toFixed(1)}%` : ''}
                          </div>
                          <span style={{ fontSize: '10px', color: COLORS.textSecondary, minWidth: '80px' }}>
                            {language === 'es' ? 'Alta' : 'High'}: {analisis.adversoTechAlta || 0} ({(analisis.pctAdversoAlta || 0).toFixed(1)}%)
                          </span>
                        </div>
                        {/* Moderada */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{
                            flex: analisis.pctAdversoModerada || 0,
                            minWidth: analisis.pctAdversoModerada > 0 ? '30px' : '0',
                            height: '25px',
                            backgroundColor: '#ffa500',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: COLORS.background,
                            fontWeight: '600'
                          }}>
                            {analisis.pctAdversoModerada > 5 ? `${analisis.pctAdversoModerada.toFixed(1)}%` : ''}
                          </div>
                          <span style={{ fontSize: '10px', color: COLORS.textSecondary, minWidth: '80px' }}>
                            {language === 'es' ? 'Moderada' : 'Moderate'}: {analisis.adversoTechModerada || 0} ({(analisis.pctAdversoModerada || 0).toFixed(1)}%)
                          </span>
                        </div>
                        {/* Baja */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{
                            flex: analisis.pctAdversoBaja || 0,
                            minWidth: analisis.pctAdversoBaja > 0 ? '30px' : '0',
                            height: '25px',
                            backgroundColor: `${COLORS.primary}50`,
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: COLORS.text,
                            fontWeight: '600'
                          }}>
                            {analisis.pctAdversoBaja > 5 ? `${analisis.pctAdversoBaja.toFixed(1)}%` : ''}
                          </div>
                          <span style={{ fontSize: '10px', color: COLORS.textSecondary, minWidth: '80px' }}>
                            {language === 'es' ? 'Baja' : 'Low'}: {analisis.adversoTechBaja || 0} ({(analisis.pctAdversoBaja || 0).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Grupo de comparación */}
                    <div>
                      <div style={{ fontSize: '12px', color: COLORS.accent, fontWeight: '600', marginBottom: '10px' }}>
                        {language === 'es' ? 'Otras Condiciones' : 'Other Conditions'}
                      </div>
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '8px', flexDirection: 'column' }}>
                        {/* Alta */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{
                            flex: analisis.pctComparacionAlta || 0,
                            minWidth: analisis.pctComparacionAlta > 0 ? '30px' : '0',
                            height: '25px',
                            backgroundColor: '#00d084',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: COLORS.background,
                            fontWeight: '600'
                          }}>
                            {analisis.pctComparacionAlta > 5 ? `${analisis.pctComparacionAlta.toFixed(1)}%` : ''}
                          </div>
                          <span style={{ fontSize: '10px', color: COLORS.textSecondary, minWidth: '80px' }}>
                            {language === 'es' ? 'Alta' : 'High'}: {analisis.comparacionTechAlta || 0} ({(analisis.pctComparacionAlta || 0).toFixed(1)}%)
                          </span>
                        </div>
                        {/* Moderada */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{
                            flex: analisis.pctComparacionModerada || 0,
                            minWidth: analisis.pctComparacionModerada > 0 ? '30px' : '0',
                            height: '25px',
                            backgroundColor: '#ffa500',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: COLORS.background,
                            fontWeight: '600'
                          }}>
                            {analisis.pctComparacionModerada > 5 ? `${analisis.pctComparacionModerada.toFixed(1)}%` : ''}
                          </div>
                          <span style={{ fontSize: '10px', color: COLORS.textSecondary, minWidth: '80px' }}>
                            {language === 'es' ? 'Moderada' : 'Moderate'}: {analisis.comparacionTechModerada || 0} ({(analisis.pctComparacionModerada || 0).toFixed(1)}%)
                          </span>
                        </div>
                        {/* Baja */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{
                            flex: analisis.pctComparacionBaja || 0,
                            minWidth: analisis.pctComparacionBaja > 0 ? '30px' : '0',
                            height: '25px',
                            backgroundColor: `${COLORS.accent}50`,
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: COLORS.text,
                            fontWeight: '600'
                          }}>
                            {analisis.pctComparacionBaja > 5 ? `${analisis.pctComparacionBaja.toFixed(1)}%` : ''}
                          </div>
                          <span style={{ fontSize: '10px', color: COLORS.textSecondary, minWidth: '80px' }}>
                            {language === 'es' ? 'Baja' : 'Low'}: {analisis.comparacionTechBaja || 0} ({(analisis.pctComparacionBaja || 0).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Nuevo gráfico analítico: Matriz de cruce de datos */}
            <div style={{ marginTop: '30px' }}>
              <h5 style={{ color: COLORS.text, marginBottom: '20px', fontSize: '15px', fontWeight: '600' }}>
                {language === 'es' ? 'Análisis Cruzado de Variables' : 'Cross-Variable Analysis'}
              </h5>

              {tipo === 'crecimiento' ? (
                // Hipótesis 1: Matriz Crimen x Crédito → Expectativas
                <div style={{
                  backgroundColor: COLORS.surface,
                  borderRadius: '8px',
                  padding: '25px',
                  border: `1px solid ${COLORS.border}`
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <h6 style={{ fontSize: '13px', color: COLORS.textSecondary, marginBottom: '20px' }}>
                      {language === 'es'
                        ? 'Expectativas de crecimiento según nivel de crimen y acceso a crédito'
                        : 'Growth expectations by crime level and credit access'}
                    </h6>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 1fr',
                    gap: '10px',
                    fontSize: '12px'
                  }}>
                    {/* Encabezado */}
                    <div></div>
                    <div style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: COLORS.accent,
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Con Crédito' : 'With Credit'}
                    </div>
                    <div style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: COLORS.primary,
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Sin Crédito' : 'No Credit'}
                    </div>

                    {/* Crimen Alto */}
                    <div style={{
                      fontWeight: '600',
                      color: COLORS.text,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Crimen Alto' : 'High Crime'}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.accent}15`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `1px solid ${COLORS.accent}30`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenAlto = c.afect_crimen === 'Mucho';
                          const conCredito = parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                           parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                           parseFloat(c.credits_privado) > 0;
                          return crimenAlto && conCredito;
                        });
                        const quierenCrecer = grupo.filter(c => parseFloat(c.quiere_crezca) === 1.0).length;
                        const pct = grupo.length > 0 ? (quierenCrecer / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.accent }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {quierenCrecer}/{grupo.length} {language === 'es' ? 'comercios' : 'businesses'}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.primary}15`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `2px solid ${COLORS.primary}`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenAlto = c.afect_crimen === 'Mucho';
                          const sinCredito = !(parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                             parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                             parseFloat(c.credits_privado) > 0);
                          return crimenAlto && sinCredito;
                        });
                        const quierenCrecer = grupo.filter(c => parseFloat(c.quiere_crezca) === 1.0).length;
                        const pct = grupo.length > 0 ? (quierenCrecer / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.primary }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {quierenCrecer}/{grupo.length} {language === 'es' ? 'comercios' : 'businesses'}
                            </div>
                            <div style={{
                              fontSize: '10px',
                              color: COLORS.primary,
                              marginTop: '8px',
                              fontWeight: '600',
                              padding: '4px 8px',
                              backgroundColor: COLORS.background,
                              borderRadius: '4px'
                            }}>
                              {language === 'es' ? 'Grupo Análisis' : 'Analysis Group'}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Crimen Bajo */}
                    <div style={{
                      fontWeight: '600',
                      color: COLORS.text,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Crimen Bajo' : 'Low Crime'}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.accent}15`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `1px solid ${COLORS.accent}30`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
                          const conCredito = parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                           parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                           parseFloat(c.credits_privado) > 0;
                          return crimenBajo && conCredito;
                        });
                        const quierenCrecer = grupo.filter(c => parseFloat(c.quiere_crezca) === 1.0).length;
                        const pct = grupo.length > 0 ? (quierenCrecer / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.accent }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {quierenCrecer}/{grupo.length} {language === 'es' ? 'comercios' : 'businesses'}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.primary}08`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `1px solid ${COLORS.border}`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
                          const sinCredito = !(parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                             parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                             parseFloat(c.credits_privado) > 0);
                          return crimenBajo && sinCredito;
                        });
                        const quierenCrecer = grupo.filter(c => parseFloat(c.quiere_crezca) === 1.0).length;
                        const pct = grupo.length > 0 ? (quierenCrecer / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.text }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {quierenCrecer}/{grupo.length} {language === 'es' ? 'comercios' : 'businesses'}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    backgroundColor: `${COLORS.primary}08`,
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: COLORS.textSecondary,
                    lineHeight: '1.6'
                  }}>
                    <strong style={{ color: COLORS.text }}>
                      {language === 'es' ? 'Observación:' : 'Observation:'}
                    </strong>{' '}
                    {language === 'es'
                      ? 'La celda resaltada representa el grupo de análisis principal (Crimen Alto + Sin Crédito). Compárela con las demás celdas para identificar patrones.'
                      : 'The highlighted cell represents the main analysis group (High Crime + No Credit). Compare it with other cells to identify patterns.'}
                  </div>
                </div>
              ) : (
                // Hipótesis 2: Matriz Crimen x Crédito → Nivel Tecnología
                <div style={{
                  backgroundColor: COLORS.surface,
                  borderRadius: '8px',
                  padding: '25px',
                  border: `1px solid ${COLORS.border}`
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <h6 style={{ fontSize: '13px', color: COLORS.textSecondary, marginBottom: '20px' }}>
                      {language === 'es'
                        ? 'Porcentaje con tecnología alta según crimen y acceso a crédito'
                        : 'High technology percentage by crime and credit access'}
                    </h6>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 1fr',
                    gap: '10px',
                    fontSize: '12px'
                  }}>
                    {/* Encabezado */}
                    <div></div>
                    <div style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: COLORS.accent,
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Con Crédito' : 'With Credit'}
                    </div>
                    <div style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: COLORS.text,
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Sin Crédito' : 'No Credit'}
                    </div>

                    {/* Crimen Bajo */}
                    <div style={{
                      fontWeight: '600',
                      color: COLORS.text,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Crimen Bajo' : 'Low Crime'}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.accent}15`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `2px solid ${COLORS.accent}`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
                          const conCredito = parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                           parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                           parseFloat(c.credits_privado) > 0;
                          return crimenBajo && conCredito;
                        });
                        const techAlta = grupo.filter(c => {
                          const tech = c.tecnologia || '';
                          return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
                        }).length;
                        const pct = grupo.length > 0 ? (techAlta / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.accent }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {techAlta}/{grupo.length} {language === 'es' ? 'alta tech' : 'high tech'}
                            </div>
                            <div style={{
                              fontSize: '10px',
                              color: COLORS.accent,
                              marginTop: '8px',
                              fontWeight: '600',
                              padding: '4px 8px',
                              backgroundColor: COLORS.background,
                              borderRadius: '4px'
                            }}>
                              {language === 'es' ? 'Grupo Análisis' : 'Analysis Group'}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.primary}08`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `1px solid ${COLORS.border}`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenBajo = c.afect_crimen === 'Poco' || c.afect_crimen === 'Nada';
                          const sinCredito = !(parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                             parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                             parseFloat(c.credits_privado) > 0);
                          return crimenBajo && sinCredito;
                        });
                        const techAlta = grupo.filter(c => {
                          const tech = c.tecnologia || '';
                          return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
                        }).length;
                        const pct = grupo.length > 0 ? (techAlta / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.text }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {techAlta}/{grupo.length} {language === 'es' ? 'alta tech' : 'high tech'}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Crimen Alto */}
                    <div style={{
                      fontWeight: '600',
                      color: COLORS.text,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px'
                    }}>
                      {language === 'es' ? 'Crimen Alto' : 'High Crime'}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.accent}08`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `1px solid ${COLORS.border}`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenAlto = c.afect_crimen === 'Mucho';
                          const conCredito = parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                           parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                           parseFloat(c.credits_privado) > 0;
                          return crimenAlto && conCredito;
                        });
                        const techAlta = grupo.filter(c => {
                          const tech = c.tecnologia || '';
                          return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
                        }).length;
                        const pct = grupo.length > 0 ? (techAlta / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.text }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {techAlta}/{grupo.length} {language === 'es' ? 'alta tech' : 'high tech'}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div style={{
                      backgroundColor: `${COLORS.primary}08`,
                      padding: '15px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: `1px solid ${COLORS.border}`
                    }}>
                      {(() => {
                        const grupo = datos.filter(c => {
                          const crimenAlto = c.afect_crimen === 'Mucho';
                          const sinCredito = !(parseFloat(c.credits_bancos) > 0 || parseFloat(c.credits_proveedor) > 0 ||
                                             parseFloat(c.credits_familia) > 0 || parseFloat(c.credits_gobierno) > 0 ||
                                             parseFloat(c.credits_privado) > 0);
                          return crimenAlto && sinCredito;
                        });
                        const techAlta = grupo.filter(c => {
                          const tech = c.tecnologia || '';
                          return tech.toLowerCase().includes('alto') || tech.toLowerCase().includes('avanzado');
                        }).length;
                        const pct = grupo.length > 0 ? (techAlta / grupo.length * 100).toFixed(1) : 0;
                        return (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.text }}>{pct}%</div>
                            <div style={{ fontSize: '11px', color: COLORS.textSecondary, marginTop: '5px' }}>
                              {techAlta}/{grupo.length} {language === 'es' ? 'alta tech' : 'high tech'}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    backgroundColor: `${COLORS.accent}08`,
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: COLORS.textSecondary,
                    lineHeight: '1.6'
                  }}>
                    <strong style={{ color: COLORS.text }}>
                      {language === 'es' ? 'Observación:' : 'Observation:'}
                    </strong>{' '}
                    {language === 'es'
                      ? 'La celda resaltada representa el grupo de análisis (Crimen Bajo + Con Crédito). Los porcentajes muestran qué proporción tiene inversión tecnológica alta en cada cuadrante.'
                      : 'The highlighted cell represents the analysis group (Low Crime + With Credit). Percentages show what proportion has high technology investment in each quadrant.'}
                  </div>
                </div>
              )}
            </div>

            {/* Interpretación de Resultados */}
            <div style={{
              padding: '20px',
              backgroundColor: `${COLORS.primary}08`,
              borderRadius: '8px',
              borderLeft: `4px solid ${COLORS.primary}`
            }}>
              <div style={{ fontSize: '14px', color: COLORS.text, fontWeight: '600', marginBottom: '12px' }}>
                {t('mlInterpretationTitle')}
              </div>

              {/* Fuente de datos */}
              <div style={{
                fontSize: '12px',
                color: COLORS.accent,
                marginBottom: '12px',
                padding: '8px 12px',
                backgroundColor: `${COLORS.accent}10`,
                borderRadius: '4px',
                fontWeight: '500'
              }}>
                {tipo === 'crecimiento' ? t('mlH1DataSource') : t('mlH2DataSource')}
              </div>

              {/* Interpretación básica */}
              <div style={{
                fontSize: '13px',
                color: COLORS.textSecondary,
                lineHeight: '1.7',
                marginBottom: '16px'
              }}>
                {tipo === 'crecimiento' ? (
                  language === 'es'
                    ? `Los datos muestran que el ${analisis.pctAdverso.toFixed(1)}% de los comercios en condiciones adversas (crimen alto + sin crédito) tienen expectativas de crecimiento, comparado con el ${analisis.pctComparacion.toFixed(1)}% en otras condiciones. La diferencia de ${Math.abs(analisis.pctAdverso - analisis.pctComparacion).toFixed(1)} puntos porcentuales ${analisis.pctAdverso > analisis.pctComparacion ? 'sugiere que las condiciones adversas no están asociadas con menores expectativas de crecimiento' : 'indica una relación entre las condiciones adversas y menores expectativas'}.`
                    : `The data shows that ${analisis.pctAdverso.toFixed(1)}% of businesses in adverse conditions (high crime + no credit) have growth expectations, compared to ${analisis.pctComparacion.toFixed(1)}% in other conditions. The ${Math.abs(analisis.pctAdverso - analisis.pctComparacion).toFixed(1)} percentage point difference ${analisis.pctAdverso > analisis.pctComparacion ? 'suggests that adverse conditions are not associated with lower growth expectations' : 'indicates a relationship between adverse conditions and lower expectations'}.`
                ) : (
                  language === 'es'
                    ? `El ${analisis.pctAdverso.toFixed(1)}% de los comercios en condiciones favorables (crimen bajo + con crédito) tiene inversión tecnológica alta, en comparación con el ${analisis.pctComparacion.toFixed(1)}% en otras condiciones. Esta diferencia de ${Math.abs(analisis.pctAdverso - analisis.pctComparacion).toFixed(1)} puntos porcentuales ${analisis.pctAdverso > analisis.pctComparacion ? 'sugiere una asociación positiva entre condiciones favorables e inversión en tecnología' : 'no confirma que las condiciones favorables resulten en mayor inversión tecnológica'}.`
                    : `${analisis.pctAdverso.toFixed(1)}% of businesses in favorable conditions (low crime + with credit) have high technology investment, compared to ${analisis.pctComparacion.toFixed(1)}% in other conditions. This ${Math.abs(analisis.pctAdverso - analisis.pctComparacion).toFixed(1)} percentage point difference ${analisis.pctAdverso > analisis.pctComparacion ? 'suggests a positive association between favorable conditions and technology investment' : 'does not confirm that favorable conditions result in higher technology investment'}.`
                )}
              </div>

              {/* Explicaciones alternativas */}
              <div style={{
                fontSize: '12px',
                color: COLORS.textSecondary,
                lineHeight: '1.6',
                padding: '12px',
                backgroundColor: `${COLORS.background}80`,
                borderRadius: '6px',
                borderLeft: `3px solid ${COLORS.accent}`,
                marginBottom: '12px'
              }}>
                <strong style={{ color: COLORS.text }}>
                  {language === 'es' ? '💡 Explicaciones alternativas:' : '💡 Alternative explanations:'}
                </strong>
                <br />
                {tipo === 'crecimiento' ? t('mlH1AlternativeExplanation') : t('mlH2AlternativeExplanation')}
              </div>

              {/* Nota sobre complejidad */}
              <div style={{
                fontSize: '11px',
                color: COLORS.textSecondary,
                fontStyle: 'italic',
                lineHeight: '1.5'
              }}>
                {t('mlComplexityNote')}
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