# 🏢 Análisis de Comercios AMBA - MIT LIFT Lab × UNSAM × UBA

Dashboard interactivo académico para análisis profundo del ecosistema comercial del Área Metropolitana de Buenos Aires, con Machine Learning y validación estadística de hipótesis geoespaciales.

## 🎓 Proyecto Académico

**Colaboración:** MIT LIFT Lab - Buenos Aires, UNSAM, UBA, Universidad de Palermo, ITBA, UNICEN  
**Equipo:** Greenthunder  
**Período:** 2025-2026  
**Dataset:** 923 comercios, 44 variables

## 📋 Características Principales

### Análisis Estadístico
- ✅ **Dashboard interactivo** con React + JavaScript puro
- ✅ **923 comercios analizados** en AMBA
- ✅ **Visualizaciones avanzadas** con gráficos SVG nativos
- ✅ **Mapas de calor geoespaciales** (crimen, crédito, ubicaciones)
- ✅ **Sistema de carrusel** de universidades participantes

### Machine Learning
- ✅ **K-Means Clustering** (3 clusters: Pequeño 50.4%, Mediano 39.5%, Grande 10.1%)
- ✅ **PCA (Análisis de Componentes Principales)** para visualización 2D
- ✅ **Modelos predictivos** con Random Forest:
  - Expectativas de crecimiento comercial (Accuracy: 67.3%)
  - Factores externos más impactantes (Accuracy: 81.2%)

### Validación de Hipótesis
- ✅ **Pruebas estadísticas rigurosas** (Chi-cuadrado, Mann-Whitney U)
- ✅ **Hipótesis geoespaciales validadas** con análisis inferencial
- ✅ **Notebook Jupyter** con metodología completa
- ✅ **Exportación JSON** de resultados estadísticos

## 🧪 Hipótesis Validadas

### H1: Crimen alto + Sin crédito → ¿Menor expectativa de crecimiento?
**Resultado:** NO RECHAZADA (p=0.96)
- Grupo adverso (n=34): 76.5% quiere crecer
- Grupo comparación (n=676): 78.4% quiere crecer
- **Conclusión:** Sin evidencia estadística significativa

### H2: Crimen bajo + Con crédito → ¿Mayor inversión tecnológica?
**Resultado:** NO RECHAZADA (p=0.76)
- Grupo favorable (n=289): 20.8% tecnología alta
- Grupo comparación (n=413): 18.9% tecnología alta
- **Conclusión:** Sin evidencia estadística significativa

## 🚀 Instalación y Uso

### Deploy en Vercel (Recomendado)

El proyecto está configurado para deploy automático:

```bash
git clone https://github.com/Datso653/MIT-PROYECT.git
cd MIT-PROYECT
vercel deploy
```

### Desarrollo Local

```bash
# Servir con cualquier servidor HTTP
python -m http.server 8000
# o
npx http-server
```

### Análisis de Machine Learning

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar análisis completo
jupyter notebook ML_Analisis_Comercios.ipynb

# Validar hipótesis
jupyter notebook Test_Hipotesis.ipynb
```

## 📊 Hallazgos Principales

### Estructura Comercial
- **63.3%** de comercios con expectativas positivas de ventas
- **78%** no percibe competencia como factor limitante
- **Crédito y precios** son barreras más significativas que competencia

### Patrones Laborales
- **Predominancia de microempresas** (1-4 trabajadores)
- Variación significativa por tipo de comercio
- San Miguel muestra 5.3 trabajadores promedio

### Acceso a Financiamiento
- **Proveedores** como fuente principal (superposición en datos permite >100%)
- **Banca tradicional** en segundo lugar
- **39.6%** sin acceso a crédito formal

### Tecnología
- **52%** nivel moderado de adopción
- **20%** tecnología alta (sistemas integrados)
- **28%** nivel básico

## 📁 Estructura del Proyecto

```
MIT-PROYECT/
├── index.html                          # Dashboard principal
├── script.js                          # Lógica completa React
├── styles.css                         # Estilos globales
├── vercel.json                        # Configuración Vercel
│
├── datos_comercios.csv                # Dataset principal (923 comercios)
│
├── ML_Analisis_Comercios.ipynb       # Notebook análisis ML
├── ML_Predicciones_Comercios.ipynb   # Modelos predictivos
├── Test_Hipotesis.ipynb              # Validación estadística
│
├── ml_results.json                    # Resultados clustering/PCA
├── resultados_hipotesis.json         # Resultados pruebas estadísticas
│
├── requirements.txt                   # Dependencias Python
└── README.md                          # Este archivo
```

## 🔬 Metodología Técnica

### Machine Learning
```python
# K-Means Clustering
- Features: trabajadores, antigüedad, acceso_credito, horas_operacion
- Normalización: StandardScaler
- n_clusters: 3 (método del codo)
- Métricas: Silhouette Score, Inertia

# PCA
- n_components: 2
- Varianza explicada: ~75%

# Random Forest
- n_estimators: 100
- max_depth: 10
- train_test_split: 80/20
```

### Validación Estadística
```python
# H1: Chi-cuadrado de independencia
scipy.stats.chi2_contingency()
α = 0.05

# H2: Mann-Whitney U (no paramétrica)
scipy.stats.mannwhitneyu(alternative='greater')
α = 0.05
```

## 📈 Visualizaciones Disponibles

1. **Hero Section** - Obelisco Buenos Aires con overlay
2. **Universidades Participantes** - Carrusel animado con logos
3. **Hipótesis y Primeras Impresiones** - Cards con resultados estadísticos
4. **Indicadores Clave** - Gráficos circulares interactivos
5. **Análisis Visual** - Tier lists tecnología, barras horizontales trabajadores
6. **Machine Learning** - Clustering scatter, PCA, feature importance
7. **Mapas Interactivos** - 3 vistas (ubicaciones, crimen, crédito)
8. **Equipo** - Fade-in animado con fotos B&N

## 🎨 Componentes UI Destacados

- **UniversidadesParticipantes**: Scroll infinito, hover effects
- **GraficoBarrasHorizontales**: Tooltips, gradientes
- **TierListTecnologia**: Gradientes personalizados por nivel
- **MapaInteractivo**: 3 tabs, heatmaps, estadísticas dinámicas
- **TeamMember**: IntersectionObserver, transiciones suaves

## 🐛 Troubleshooting

### Caracteres raros en textos
```bash
# Reemplazar encodings
sed -i 's/Á/ó/g; s/CRÁ‰/CRÉ/g' script.js
```

### Errores JSX
- Verificar balance de `<div>` abiertos/cerrados
- Revisar comillas en props: `color={COLORS.primary}` no `color="COLORS.primary"`

### CSV no carga
- Encoding: UTF-8
- Cache-busting: agregar `?v=timestamp` a URL
- Headers CORS correctos en Vercel

## 📦 Dependencias Python

```txt
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
scipy>=1.11.0
matplotlib>=3.7.0
seaborn>=0.12.0
```

## 🔄 Próximos Pasos

- [ ] Análisis temporal longitudinal
- [ ] Modelos de causalidad con variables instrumentales
- [ ] Dashboard mobile-responsive completo
- [ ] Integración con datos gubernamentales INDEC

## 👥 Equipo Greenthunder

**Juan Ignacio da Torre** - UBA
**Sofía Gálvez** - UNSAM  
**Gina Marrazzo** - UBA

## 📄 Licencia

Proyecto académico bajo colaboración MIT LIFT Lab × UNSAM × UBA  
© 2025-2026 Equipo Greenthunder

---

**URL Dashboard:** https://mit-proyect.vercel.app  
**Repositorio:** https://github.com/Datso653/MIT-PROYECT