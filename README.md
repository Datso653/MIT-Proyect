# 🏢 Análisis de Comercios AMBA - MIT LIFT Lab

<div align="center">

![MIT LIFT Lab](https://img.shields.io/badge/MIT-LIFT%20Lab-A31F34?style=for-the-badge&logo=mit)
![UBA](https://img.shields.io/badge/UBA-Partner-0033A0?style=for-the-badge)
![UNSAM](https://img.shields.io/badge/UNSAM-Research-00A859?style=for-the-badge)
![UNLZ](https://img.shields.io/badge/UNLZ-Research-006837?style=for-the-badge)

Dashboard interactivo académico para análisis profundo del ecosistema comercial del Área Metropolitana de Buenos Aires con Machine Learning y validación estadística.

[**🚀 Ver Demo**](https://mit-proyect.vercel.app) · [**📊 Análisis ML**](notebooks/) · [**📈 Dataset**](datos/)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características](#-características-principales)
- [Conclusiones Preliminares](#-conclusiones-preliminares)
- [Hallazgos Clave](#-hallazgos-clave)
- [Hipótesis Validadas](#-hipótesis-validadas)
- [Tecnologías](#️-stack-tecnológico)
- [Instalación](#-instalación-rápida)
- [Estructura](#-estructura-del-proyecto)
- [Metodología](#-metodología-científica)
- [Equipo](#-equipo-greenthunder)

---

## 🎓 Sobre el Proyecto

**Colaboración Académica Multinstitucional**

Este proyecto representa una colaboración entre instituciones líderes en investigación y educación superior:

- **MIT LIFT Lab** - Laboratory for Innovation Science and Policy
- **Universidad de Buenos Aires (UBA)** - Partner Principal
- **Universidad Nacional de San Martín (UNSAM)** - Research Partner
- **Universidad Nacional de Lomas de Zamora (UNLZ)** - Research Partner
- **Universidad de Palermo (UP)** - Research Partner
- **Instituto Tecnológico de Buenos Aires (ITBA)** - Research Partner
- **Universidad Nacional del Centro (UNICEN)** - Research Partner

**Objetivo:** Análisis de pequeños comercios locales en Buenos Aires, utilizando herramientas de análisis de datos y machine learning para comprender los factores que impactan el crecimiento económico y la supervivencia de los pequeños comercios. Este proyecto parte de una iniciativa amplia para comprender el funcionamiento de los nano-stores en mercados emergentes.

**Alcance:**
- 📊 **923 comercios** relevados en AMBA
- 🗺️ **44 variables** por establecimiento
- 📍 **Cobertura geoespacial** completa del Área Metropolitana
- 🕐 **Período:** 2025-2026

---

## ✨ Características Principales

### 🎨 Dashboard Interactivo
- **React 18 + JavaScript puro** sin frameworks pesados
- **Visualizaciones SVG nativas** de alto rendimiento
- **Responsive design** optimizado para mobile
- **Animaciones CSS** suaves y profesionales
- **Mapas interactivos** con Leaflet.js y heatmaps
- **Componentes modulares** organizados por responsabilidad

### 🤖 Machine Learning
- **Random Forest** - Modelos predictivos de expectativas de crecimiento
  - Modelo 1: Predicción de intención de expandirse (Accuracy 77.3%, Recall 97.6%)
  - Modelo 2: Predicción de factores que afectan ventas
- **Feature Importance** - Identificación de variables clave
- **Análisis de correlación** y patrones de comportamiento comercial

### 📊 Análisis Estadístico Riguroso
- **Chi-cuadrado** - Pruebas de independencia para variables categóricas
- **Mann-Whitney U** - Comparaciones no paramétricas para datos ordinales
- **Intervalos de confianza** al 95%
- **Validación de hipótesis** con α = 0.05
- **Interpretaciones alternativas** considerando múltiples factores

### 🗺️ Visualización Geoespacial
- Mapa de **ubicaciones** de comercios
- Heatmap de **percepción de crimen**
- Heatmap de **acceso a crédito**
- **Leyendas dinámicas** con conteo de comercios por categoría
- Clustering geográfico interactivo

### 🌐 Soporte Bilingüe
- **Español / English** con switch instantáneo
- Sistema de traducciones centralizado
- Contenido académico completo en ambos idiomas

---

## 📊 Conclusiones Preliminares

Basándonos en el análisis de más de 900 comercios en el Área Metropolitana de Buenos Aires, presentamos las principales conclusiones derivadas de nuestro estudio:

### 01 · Expectativas de crecimiento vs. condiciones adversas

Los resultados del análisis estadístico muestran que las expectativas de crecimiento de los comerciantes **no están fuertemente determinadas** por las condiciones adversas (crimen alto + sin acceso a crédito). Esto sugiere que factores como la **resiliencia personal**, la **experiencia empresarial** y las **redes de apoyo informal** pueden ser más determinantes que las condiciones del entorno inmediato.

### 02 · Inversión tecnológica y condiciones favorables

Si bien existe una relación entre condiciones favorables (bajo crimen + acceso a crédito) e inversión tecnológica, esta **no es tan clara** como se planteó inicialmente. El análisis sugiere que otros factores, particularmente el **nivel de competencia en la zona**, pueden ser drivers más importantes de la adopción tecnológica que las condiciones de seguridad o acceso a financiamiento.

### 03 · Factores de impacto en ventas

El análisis de factores externos revela que **los precios y la inflación** son el principal determinante del desempeño en ventas, superando ampliamente el impacto de la competencia, el acceso a crédito y la percepción de inseguridad. Esto destaca la vulnerabilidad de los pequeños comercios frente a **variables macroeconómicas** fuera de su control.

### 04 · Perfil de comercios con intención de expansión

Los comercios que aspiran a crecer se caracterizan principalmente por tener:
- **Mayor antigüedad** en el mercado
- **Equipos de trabajo más estables**
- **Expectativas positivas** sobre la evolución de sus ventas

La experiencia acumulada y la estabilidad organizacional parecen ser más relevantes que el acceso a recursos financieros formales.

> **Nota importante:** Estas conclusiones son preliminares y están basadas en un análisis transversal de los datos. Estudios longitudinales futuros permitirán validar estos hallazgos y captar dinámicas temporales del ecosistema comercial.

---

## 🔍 Hallazgos Clave

### 💡 Insights Principales

**Factor #1 que impacta ventas:** Precios e inflación, no competencia
```
Percepción de factores externos por comerciantes:
┌─────────────────────┬──────────┐
│ Precios/Inflación   │ ████████ │ Principal
│ Competencia         │ ███      │ Secundaria
│ Acceso a Crédito    │ ██       │ Menor impacto
│ Percepción Crimen   │ █        │ Mínimo
└─────────────────────┴──────────┘
```

### 📈 Expectativas Comerciales

- **78%** desea expandir su negocio en próximos 12 meses
- **63.3%** mantiene expectativas **positivas** de ventas
- **Alto optimismo** incluso en condiciones adversas (crimen alto + sin crédito)
- La resiliencia es independiente del contexto inmediato

### 👥 Estructura Laboral
```
Distribución de Trabajadores:
┌─────────────────────┬──────────┐
│ Microempresas (1-2) │ 68.5%    │
│ Pequeñas (3-5)      │ 24.2%    │
│ Medianas (6+)       │  7.3%    │
└─────────────────────┴──────────┘

Promedio AMBA: 2.8 trabajadores/comercio
Antigüedad promedio: 7.8 años
Horas operación: 10.2 horas/día
```

### 💳 Acceso a Financiamiento

| Fuente | Penetración | Observación |
|--------|------------|-------------|
| **Sin crédito** | **39.6%** | Mayor segmento |
| Proveedores | 35% | Principal fuente |
| Bancos | 22% | Crédito formal |
| Familia | 18% | Red informal |

**Hallazgo clave:** Las fuentes informales de crédito (proveedores, familia) superan al sistema bancario formal.

### 🖥️ Adopción Tecnológica

**Distribución por nivel:**
- **Nivel Básico (28%):** Solo teléfono, efectivo, registro manual
- **Nivel Moderado (52%):** WhatsApp Business, QR, transferencias
- **Nivel Alto (20%):** E-commerce, redes sociales, software de gestión

**Insight:** La mayoría se encuentra en digitalización moderada, con oportunidades significativas en herramientas avanzadas.

### 💰 Salario Mínimo a Percibir

Pregunta: _"¿Cuál es el salario mínimo que estaría dispuesto a recibir por cerrar el local?"_

- Rango analizado: $100k - $5M ARS
- Promedio general tras filtrado de outliers
- Variación significativa según tipo de comercio
- **Top 10 tipos** muestran diferencias sustanciales en valoración del negocio

---

## 🧪 Hipótesis Validadas

### H1: Crimen alto + Sin crédito → ¿Menor expectativa de crecimiento?

**Fuente de datos:** Pregunta directa en encuesta _"¿Quiere que su comercio crezca?"_ (Sí=1 / No=0)

**Prueba:** Chi-cuadrado de independencia
**Resultado:** **NO CONFIRMADA** (diferencia no significativa)

```
Grupo adverso (alto crimen + sin crédito):  76.5% quiere crecer
Grupo comparación (otras condiciones):       78.4% quiere crecer
Diferencia: -1.9 puntos porcentuales (no significativa)
```

**Interpretación:** Los datos muestran que los comercios en condiciones adversas **no tienen menores expectativas** de crecimiento comparados con otros comercios.

**Explicaciones alternativas:**
- La resiliencia y optimismo de los comerciantes puede ser independiente de las condiciones adversas
- Otros factores como antigüedad del negocio, experiencia del comerciante, tipo de comercio o redes de apoyo familiar pueden ser más determinantes
- El crimen o el acceso a crédito formal no son predictores significativos de aspiraciones de crecimiento

---

### H2: Crimen bajo + Con crédito → ¿Mayor inversión tecnológica?

**Fuente de datos:** Clasificación del nivel tecnológico según herramientas utilizadas (Básico/Moderado/Alto)

**Niveles tecnológicos:**
- **Básico:** Teléfono, efectivo, registro manual
- **Moderado:** WhatsApp Business, QR, transferencias
- **Alto:** E-commerce, redes sociales, software de gestión

**Prueba:** Mann-Whitney U (no paramétrica)
**Resultado:** **NO CONFIRMADA** (diferencia no significativa)

```
Grupo favorable (bajo crimen + con crédito): 20.8% tecnología alta
Grupo comparación (otras condiciones):       18.9% tecnología alta
Diferencia: +1.9 puntos porcentuales (no significativa)
```

**Interpretación:** Las condiciones favorables **no predicen significativamente** mayor adopción tecnológica.

**Explicaciones alternativas:**
- La inversión en tecnología puede estar más relacionada con el **nivel de competencia** en la zona que con la percepción de crimen
- En áreas de bajo crimen, la competencia puede ser menor, reduciendo la necesidad de digitalización
- Zonas de alta competencia (sin importar el nivel de crimen) pueden impulsar mayor adopción tecnológica para diferenciarse

> **Complejidad del fenómeno:** La ausencia de confirmación de una hipótesis no implica que sea falsa, sino que la relación es más compleja de lo planteado inicialmente. Múltiples factores interactúan simultáneamente en el ecosistema comercial.

---

## 🛠️ Stack Tecnológico

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?logo=css3)

**Componentes clave:**
- Sistema de traducciones bilingüe (ES/EN)
- Arquitectura modular por secciones
- CSS-in-JS con constantes de color centralizadas
- Responsive design con media queries

### Análisis de Datos
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2.0-150458?logo=pandas)
![NumPy](https://img.shields.io/badge/NumPy-1.24-013243?logo=numpy)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3-F7931E?logo=scikit-learn&logoColor=white)

**Notebooks:**
- `Test_Hipotesis.ipynb` - Validación estadística
- `ML_Analisis_Comercios.ipynb` - Análisis exploratorio
- `ML_Predicciones_Comercios.ipynb` - Modelos predictivos

### Visualización
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chart.js)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)
![Recharts](https://img.shields.io/badge/Recharts-2.10-8884D8)

**Características:**
- Gráficos SVG interactivos
- Mapas con heatmaps personalizados
- Tooltips dinámicos
- Animaciones suaves

### Deploy & DevOps
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git&logoColor=white)

**Optimizaciones:**
- Cache busting con versiones
- Lazy loading de imágenes
- Minificación de assets
- CDN para librerías externas

---

## 🚀 Instalación Rápida

### Deploy en Vercel (Recomendado)
```bash
# 1. Clonar repositorio
git clone https://github.com/Datso653/MIT-PROYECT.git
cd MIT-PROYECT

# 2. Deploy automático
vercel deploy
```

### Desarrollo Local
```bash
# Opción 1: Python HTTP Server
python -m http.server 8000

# Opción 2: Node.js
npx http-server -p 8000

# Opción 3: VS Code Live Server
# Instalar extensión "Live Server" y hacer clic derecho en index.html

# Abrir navegador
open http://localhost:8000
```

### Análisis de Machine Learning
```bash
# 1. Crear entorno virtual
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Ejecutar notebooks
jupyter notebook

# Notebooks disponibles:
# - Test_Hipotesis.ipynb              → Validación Chi²/Mann-Whitney
# - ML_Analisis_Comercios.ipynb       → EDA + Feature Engineering
# - ML_Predicciones_Comercios.ipynb   → Random Forest + Importance
```

---

## 📁 Estructura del Proyecto

```
MIT-PROYECT/
│
├── 📱 Frontend
│   ├── index.html                  # Entrada principal
│   ├── styles.css                  # Estilos globales
│   ├── script.js                   # App React principal
│   │
│   └── js/
│       ├── config.js               # TEAM_DATA, COLORS, universidades
│       ├── translations.js         # Sistema bilingüe ES/EN
│       ├── utils.js                # Helpers y utilidades
│       │
│       └── components/
│           ├── Footer.js                    # Footer institucional
│           ├── LanguageSwitcher.js          # Toggle ES/EN
│           │
│           └── sections/
│               ├── ResumenEjecutivo.js      # Hipótesis + Metodología
│               ├── HallazgosPrincipales.js  # KPIs destacados
│               ├── AnalisisVisual.js        # Gráficos distribución
│               ├── SeccionMachineLearning.js # Modelos ML + Hipótesis
│               ├── Mapa.js                  # Visualización geoespacial
│               └── SobrePlataforma.js       # Info del proyecto
│
├── 📊 Datos
│   ├── datos/
│   │   ├── datos_comercios.csv            # Dataset principal (923 × 44)
│   │   ├── datos_comercios.json           # Versión JSON optimizada
│   │   ├── ml_results.json                # Resultados modelos ML
│   │   └── resultados_hipotesis.json      # Pruebas estadísticas
│   │
│   └── notebooks/
│       ├── Test_Hipotesis.ipynb           # Chi², Mann-Whitney U
│       ├── ML_Analisis_Comercios.ipynb    # EDA + Feature Engineering
│       └── ML_Predicciones_Comercios.ipynb # Random Forest predictivo
│
├── 🖼️ Assets
│   └── img/
│       ├── Gina.jpg, Sofia.jpg, Juan.jpg  # Equipo GreenThunder
│       ├── mit.png, uba.jpg, unsam.jpg    # Logos institucionales
│       ├── UNLZ.png, up.png, itba.jpg     # Más universidades
│       ├── CodigoQRPAG.png, QRREPO.png    # QR codes
│       └── favicon-*.png                  # PWA icons
│
├── ⚙️ Configuración
│   ├── vercel.json                # Config deploy
│   ├── requirements.txt           # Dependencias Python
│   └── README.md                  # Este archivo
│
└── 🔧 Ambiente
    └── .venv/                     # Virtual environment Python
```

**Optimizaciones implementadas:**
- ✅ Código modularizado en componentes separados
- ✅ Sistema de traducciones centralizado
- ✅ Cache busting con versiones (?v=timestamp)
- ✅ Lazy loading de imágenes
- ✅ Organización clara por responsabilidades

---

## 🔬 Metodología Científica

### Machine Learning Pipeline

```python
# Modelo 1: Expectativas de Crecimiento
from sklearn.ensemble import RandomForestClassifier

# Features seleccionadas (importancia detectada)
features_crecimiento = [
    'antiguedad_años',           # Importancia: 0.28
    'cantidad_trabajadores',     # Importancia: 0.22
    'expectativas_ventas',       # Importancia: 0.19
    'acceso_credito',            # Importancia: 0.15
    'nivel_tecnologico'          # Importancia: 0.12
]

# Entrenamiento
rf_crecimiento = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)
rf_crecimiento.fit(X_train, y_train)

# Métricas
"""
Accuracy:  77.3%
Precision: 78.9%
Recall:    97.6%  ← Detecta casi todos los que quieren crecer
F1-Score:  87.3%
"""
```

```python
# Modelo 2: Factores que Afectan Ventas
# Clasificación multiclase: Aumento / Igual / Disminución

features_factores = [
    'percepcion_precios',        # Importancia: 0.42 ⚠️ Factor #1
    'percepcion_competencia',    # Importancia: 0.28
    'acceso_credito',            # Importancia: 0.18
    'percepcion_crimen'          # Importancia: 0.12
]

# Hallazgo principal
"""
Los PRECIOS/INFLACIÓN son el factor dominante que impacta
las ventas, superando ampliamente a competencia, crédito y crimen.
"""
```

### Validación Estadística

```python
# H1: Chi-cuadrado de Independencia
from scipy.stats import chi2_contingency

# Tabla de contingencia 2x2
tabla = pd.crosstab(
    df['grupo_adverso'],    # Crimen alto + sin crédito
    df['quiere_crecer']     # Sí / No
)

chi2, p_valor, dof, expected = chi2_contingency(tabla)

# Resultado
"""
χ² = 0.002
p-valor = 0.964 > 0.05
Conclusión: NO se rechaza H0
→ No hay evidencia de que condiciones adversas
  reduzcan expectativas de crecimiento
"""
```

```python
# H2: Mann-Whitney U (No Paramétrica)
from scipy.stats import mannwhitneyu

# Nivel tecnológico: Básico=1, Moderado=2, Alto=3
grupo_favorable = df[df['favorable']]['nivel_tech']
grupo_comparacion = df[~df['favorable']]['nivel_tech']

statistic, p_valor = mannwhitneyu(
    grupo_favorable,
    grupo_comparacion,
    alternative='greater'
)

# Resultado
"""
U-statistic = 58,234
p-valor = 0.758 > 0.05
Conclusión: NO se rechaza H0
→ Condiciones favorables no predicen
  significativamente mayor tecnología
"""
```

---

## 📊 Visualizaciones del Dashboard

### 1. Hero Section
- Imagen de fondo de Buenos Aires con overlay
- Animaciones scroll reveal
- Título con tipografía Crimson Pro
- Identificador del equipo GreenThunder

### 2. Sobre la Plataforma
- QR codes para dashboard y GitHub
- Stack tecnológico con badges
- Metodología "vibe coding" + AI-assisted development
- Formación académica del equipo

### 3. Introducción al Proyecto
- Objetivo y alcance del estudio
- Contexto de nano-stores en mercados emergentes
- Colaboración multinstitucional

### 4. Universidades Participantes
- Carrusel infinito con auto-scroll
- 7 instituciones colaboradoras
- Logos optimizados con hover effects

### 5. Indicadores Clave
```
┌────────────────────────────────────┐
│ 923 Comercios Analizados           │
│ 2.8 Trabajadores Promedio          │
│ 10.2 Horas de Operación            │
│ 39.6% Sin Acceso a Crédito         │
│ 63.3% Expectativas Positivas       │
│ 78% Deseo de Crecimiento           │
│ 34.4% Local Propio                 │
│ 7.8 Años en Operación              │
└────────────────────────────────────┘
```

### 6. Mapas Interactivos
- **3 vistas con tabs:** Ubicaciones, Percepción de Crimen, Acceso a Crédito
- **Heatmaps** con gradientes de densidad
- **Leyendas dinámicas** con conteo por categoría
- **Tooltips** con información detallada por comercio

### 7. Resumen Ejecutivo (Hipótesis)
- Metodología de análisis explicada
- 2 hipótesis principales presentadas
- Curiosidades adicionales (Machine Learning)
- Nota sobre resultados completos

### 8. Análisis Visual
- **Top 8 tipos de comercio** con distribución porcentual
- **Top 10 trabajadores promedio** por sector
- **Fuentes de financiamiento** con porcentajes múltiples
- **Adopción tecnológica** en 3 niveles con detalles expandibles
- **Salario mínimo a percibir** por tipo de comercio

### 9. Hallazgos Principales
- 3 insights clave con iconos
- Resiliencia, brecha digital, desafío financiero
- Diseño limpio con tarjetas destacadas

### 10. Análisis de Hipótesis & Machine Learning
- **Hipótesis 1 y 2** con resultados estadísticos completos
- **Fuente de datos** destacada con badges
- **Interpretación de resultados** con porcentajes
- **Explicaciones alternativas** con consideraciones
- **Nota sobre complejidad** del fenómeno
- **Modelos ML:**
  - ¿Qué comercios tienen intención de expandirse?
  - ¿Qué afecta más las ventas?
- **Feature importance** con gráficos horizontales
- **Explicación académica y en términos simples**

### 11. Conclusiones Preliminares
- 4 conclusiones principales numeradas
- Diseño en grid responsive
- Alternancia de colores (primary/accent)
- Nota final sobre naturaleza transversal del estudio
- Hover effects con elevación

### 12. Próximos Pasos
- 3 objetivos para Q2-Q3 2026
- Validación cruzada institucional
- Análisis longitudinal
- Continuidad del relevamiento

### 13. Equipo GreenThunder
- 3 miembros con fotos, roles y universidades
- Enlaces a LinkedIn
- Diseño en tarjetas con bordes

### 14. Footer
- Descripción MIT LIFT Lab
- Listado de equipo
- Listado de instituciones (7 universidades)
- Contactos (3 emails)
- Copyright 2025-2026

---

## 🎨 Componentes UI Destacados

### Sistema de Traducciones
```javascript
// Centralizado en js/translations.js
const TRANSLATIONS = {
  es: { /* 250+ claves */ },
  en: { /* 250+ claves */ }
};

// Uso en componentes
const t = (key) => getTranslation(language, key);
<h1>{t('heroTitle')}</h1>
```

### UniversidadesParticipantes
```javascript
// Carrusel infinito con auto-scroll
- 7 universidades: MIT, UBA, UNSAM, UNLZ, UP, ITBA, UNICEN
- Scroll automático suave
- Hover para pausar animación
- Duplicación del array para loop continuo
```

### Mapa Interactivo
```javascript
// Leaflet.js con 3 capas
1. Ubicaciones → Markers agrupados
2. Percepción Crimen → Heatmap con gradiente rojo
3. Acceso a Crédito → Heatmap con gradiente verde

// Leyendas dinámicas
- Conteo automático por categoría
- Actualización on-the-fly al cambiar vista
```

### Sección Machine Learning
```javascript
// Análisis de hipótesis con estructura completa
- Título y pregunta
- Fuente de datos (badge destacado)
- Resultados del análisis (grupos comparados)
- Interpretación básica (porcentajes)
- Explicaciones alternativas (💡 con border)
- Nota sobre complejidad (cursiva)
```

---

## 🐛 Troubleshooting Común

### Problema: UNLZ no aparece en el footer
```javascript
// Solución: Limpiar caché del navegador
// Windows: Ctrl + Shift + R o Ctrl + F5
// Mac: Cmd + Shift + R

// Verificar que config.js tenga ?v=timestamp
<script src="js/config.js?v=20250122b"></script>
```

### Problema: Mapas no cargan
```html
<!-- Verificar que Leaflet CSS y JS estén cargados -->
<link rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">
</script>
<script
  src="https://cdn.jsdelivr.net/npm/leaflet.heat@0.2.0/dist/leaflet-heat.min.js">
</script>
```

### Problema: Traducciones no cambian
```javascript
// Verificar que translations.js tenga cache buster
<script src="js/translations.js?v=20250122b"></script>

// Verificar que el idioma se guarde en localStorage
localStorage.setItem('language', 'en'); // o 'es'
```

### Problema: Gráficos no se renderizan
```javascript
// Verificar que Chart.js esté cargado
console.log(typeof Chart); // debe retornar 'function'

// Verificar que el canvas tenga contexto 2D
const ctx = document.getElementById('myChart').getContext('2d');
```

---

## 📦 Dependencias Detalladas

### Python (requirements.txt)
```txt
# Análisis de Datos
pandas==2.0.3
numpy==1.24.4

# Machine Learning
scikit-learn==1.3.0
scipy==1.11.1

# Visualización
matplotlib==3.7.2
seaborn==0.12.2

# Notebooks
jupyter==1.0.0
ipykernel==6.25.0
```

### JavaScript (CDNs en index.html)
```html
<!-- React Core -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Data Processing -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>

<!-- Visualización -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script src="https://unpkg.com/recharts@2.10.3/dist/Recharts.js"></script>

<!-- Mapas -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/leaflet.heat@0.2.0/dist/leaflet-heat.min.js"></script>

<!-- JSX Transform -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

---

## 🔄 Roadmap

### Fase 2 (Q2 2026)
- [ ] Análisis temporal longitudinal (recolección Q1, Q2, Q3)
- [ ] Validación cruzada con métricas institucionales (ICC Di Tella, INDEC)
- [ ] Mejoras en UI/UX mobile-first
- [ ] Integración de datos en tiempo real

### Fase 3 (Q3 2026)
- [ ] Análisis de causalidad con variables instrumentales
- [ ] Comparación con otras regiones metropolitanas
- [ ] Panel de control para comerciantes (self-service)
- [ ] Publicación de paper académico

### Investigación Futura
- [ ] Impacto de políticas públicas de apoyo a PYMES
- [ ] Redes de proveedores y cadenas de valor locales
- [ ] Sostenibilidad ambiental y economía circular
- [ ] Adopción de tecnologías emergentes (IA, blockchain)

---

## 👥 Equipo GreenThunder

<div align="center">

| Miembro | Rol | Universidad | Contacto |
|---------|-----|-------------|----------|
| **Juan Ignacio da Torre** | Lic. en Economía | UBA | [LinkedIn](https://www.linkedin.com/in/juan-da-torre-a3b120262) · [Email](mailto:Juandatorre.eco@gmail.com) |
| **Sofía Gálvez** | Lic. en Administración de Empresas | UNSAM | [LinkedIn](https://www.linkedin.com/in/sofiagalvez0910) · [Email](mailto:sofialg9194@gmail.com) |
| **Gina Marrazzo** | Lic. en Economía | UBA | [LinkedIn](https://www.linkedin.com/in/gina-marrazzo-15a8a523b) · [Email](mailto:ginamarrazzo20@gmail.com) |

</div>

---

## 📝 Citar este Trabajo

```bibtex
@misc{greenthunder2025amba,
  title={Análisis del Ecosistema Comercial del Área Metropolitana de Buenos Aires:
         Un Enfoque de Machine Learning y Validación Estadística},
  author={da Torre, Juan Ignacio and Gálvez, Sofía and Marrazzo, Gina},
  year={2025-2026},
  institution={MIT LIFT Lab, Universidad de Buenos Aires, Universidad Nacional de San Martín,
               Universidad Nacional de Lomas de Zamora},
  url={https://mit-proyect.vercel.app},
  note={Dashboard interactivo disponible en: https://github.com/Datso653/MIT-PROYECT}
}
```

---

## 📄 Licencia

Proyecto académico bajo colaboración:
- **MIT LIFT Lab** (Laboratory for Innovation Science and Policy)
- **Universidad de Buenos Aires (UBA)**
- **Universidad Nacional de San Martín (UNSAM)**
- **Universidad Nacional de Lomas de Zamora (UNLZ)**
- **Universidad de Palermo (UP)**
- **Instituto Tecnológico de Buenos Aires (ITBA)**
- **Universidad Nacional del Centro (UNICEN)**

© 2025-2026 Equipo GreenThunder. Todos los derechos reservados.

Este proyecto se proporciona con fines educativos y de investigación. El uso comercial requiere autorización explícita de las instituciones participantes.

---

<div align="center">

**🔗 Links Importantes**

[Dashboard en Vivo](https://mit-proyect.vercel.app) ·
[Repositorio GitHub](https://github.com/Datso653/MIT-PROYECT) ·
[MIT LIFT Lab](https://lift.mit.edu) ·
[UBA](https://www.uba.ar) ·
[UNSAM](https://www.unsam.edu.ar) ·
[UNLZ](https://www.unlz.edu.ar)

---

**Desarrollado con ❤️ en Buenos Aires**

_"Análisis de pequeños comercios locales para comprender los factores que impactan el crecimiento económico y la supervivencia de los nano-stores en mercados emergentes."_

</div>
