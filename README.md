# 🏢 Análisis de Comercios AMBA - MIT LIFT Lab

<div align="center">

![MIT LIFT Lab](https://img.shields.io/badge/MIT-LIFT%20Lab-A31F34?style=for-the-badge&logo=mit)
![UBA](https://img.shields.io/badge/UBA-Partner-0033A0?style=for-the-badge)
![UNSAM](https://img.shields.io/badge/UNSAM-Research-00A859?style=for-the-badge)

Dashboard interactivo académico para análisis profundo del ecosistema comercial del Área Metropolitana de Buenos Aires con Machine Learning y validación estadística.

[**🚀 Ver Demo**](https://mit-proyect.vercel.app) · [**📊 Análisis ML**](notebooks/) · [**📈 Dataset**](datos/)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características-principales)
- [Hallazgos Clave](#-hallazgos-clave)
- [Tecnologías](#️-stack-tecnológico)
- [Instalación](#-instalación-rápida)
- [Estructura](#-estructura-del-proyecto)
- [Metodología](#-metodología-científica)
- [Hipótesis Validadas](#-hipótesis-validadas)
- [Equipo](#-equipo-greenthunder)

---

## 🎓 Sobre el Proyecto

**Colaboración Académica Multinstitucional**

Este proyecto representa una colaboración entre instituciones líderes en investigación y educación superior:

- **MIT LIFT Lab** - Laboratory for Innovation Science and Policy
- **Universidad de Buenos Aires (UBA)** - Partner Principal
- **Universidad Nacional de San Martín (UNSAM)** - Research Partner
- **Universidad de Palermo**, **ITBA**, **UNICEN** - Partners Colaboradores

**Objetivo:** Comprender la dinámica del ecosistema comercial de AMBA a través de análisis cuantitativo riguroso, identificando barreras al crecimiento y patrones de desarrollo empresarial.

**Alcance:**
- 📊 **923 comercios** relevados
- 🗺️ **44 variables** por establecimiento
- 📍 **Cobertura geoespacial** completa AMBA
- 🕐 **Período:** 2025-2026

---

## ✨ Características Principales

### 🎨 Dashboard Interactivo
- **React + JavaScript puro** sin frameworks pesados
- **Visualizaciones SVG nativas** de alto rendimiento
- **Responsive design** optimizado para mobile
- **Animaciones CSS** suaves y profesionales
- **Mapas de calor** con Leaflet.js

### 🤖 Machine Learning
- **K-Means Clustering** - Segmentación de comercios en 3 perfiles
- **PCA** - Reducción dimensional para visualización
- **Random Forest** - Modelos predictivos de crecimiento
- **Feature Importance** - Identificación de variables clave

### 📊 Análisis Estadístico Riguroso
- **Chi-cuadrado** - Pruebas de independencia
- **Mann-Whitney U** - Comparaciones no paramétricas  
- **Intervalos de confianza** al 95%
- **Validación de hipótesis** con α = 0.05

### 🗺️ Visualización Geoespacial
- Mapa de **ubicaciones** de comercios
- Heatmap de **percepción de crimen**
- Heatmap de **acceso a crédito**
- Clustering geográfico interactivo

---

## 🔍 Hallazgos Clave

### 💡 Insights Contraintuitivos

> **Hallazgo Principal:** La competencia no es el factor limitante que tradicionalmente se asume.
```
Barreras percibidas por los comerciantes:
┌─────────────────────┬──────────┐
│ Acceso a Crédito    │ 45%      │
│ Precios Insumos     │ 32%      │
│ Competencia         │ 22% ⚠️   │
└─────────────────────┴──────────┘
```

### 📈 Expectativas Comerciales

- **63.3%** de comercios con expectativas **positivas** de ventas
- **78%** desea expandir su negocio en próximos 12 meses
- **Alto optimismo** a pesar de barreras financieras

### 👥 Estructura Laboral
```python
Distribución de Trabajadores:
- Microempresas (1-2):    68.5%
- Pequeñas (3-5):         24.2%
- Medianas (6+):           7.3%

Promedio AMBA: 2.8 trabajadores
Máximo (San Miguel): 5.3 trabajadores
```

### 💳 Acceso a Financiamiento

| Fuente | Penetración | Uso Relativo |
|--------|------------|--------------|
| Proveedores | 35% | Principal |
| Bancos | 22% | Secundaria |
| Familia | 18% | Emergencia |
| Sin crédito | **39.6%** | - |

### 🖥️ Adopción Tecnológica

- **Nivel Moderado:** 52% (POS, redes sociales básicas)
- **Nivel Alto:** 20% (sistemas ERP, e-commerce)
- **Nivel Básico:** 28% (solo registros manuales)

---

## 🧪 Hipótesis Validadas

### H1: Crimen + Sin Crédito → Menor Expectativa de Crecimiento

**Prueba:** Chi-cuadrado de independencia  
**Resultado:** **NO RECHAZADA** (p = 0.96)
```
Grupo adverso (n=34):      76.5% quiere crecer
Grupo comparación (n=676): 78.4% quiere crecer
Diferencia: -1.9pp (no significativa)
```

**Conclusión:** Sin evidencia estadística de que la combinación crimen alto + sin crédito reduzca expectativas de crecimiento. Los comerciantes mantienen optimismo incluso en condiciones adversas.

---

### H2: Crimen Bajo + Con Crédito → Mayor Tecnología

**Prueba:** Mann-Whitney U (no paramétrica)  
**Resultado:** **NO RECHAZADA** (p = 0.76)
```
Grupo favorable (n=289):    20.8% tecnología alta
Grupo comparación (n=413):  18.9% tecnología alta
Diferencia: +1.9pp (no significativa)
```

**Conclusión:** Las condiciones favorables no predicen significativamente mayor adopción tecnológica. Otros factores (sector, tamaño, antigüedad) pueden ser más relevantes.

---

## 🛠️ Stack Tecnológico

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?logo=css3)

### Análisis de Datos
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2.0-150458?logo=pandas)
![NumPy](https://img.shields.io/badge/NumPy-1.24-013243?logo=numpy)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3-F7931E?logo=scikit-learn&logoColor=white)

### Visualización
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chart.js)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)
![D3.js](https://img.shields.io/badge/D3.js-SVG-F9A03C?logo=d3.js)

### Deploy & DevOps
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git&logoColor=white)

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

# Abrir navegador
open http://localhost:8000
```

### Análisis de Machine Learning
```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Ejecutar notebooks
jupyter notebook

# Notebooks disponibles:
# - ML_Analisis_Comercios.ipynb       → Clustering y PCA
# - ML_Predicciones_Comercios.ipynb   → Random Forest
# - Test_Hipotesis.ipynb              → Validación estadística
```

---

## 📁 Estructura del Proyecto
```
MIT-PROYECT/
│
├── 📱 Frontend
│   ├── index.html                  # Entrada principal
│   ├── styles.css                  # Estilos globales
│   ├── script.js                   # App React principal (1511 líneas)
│   │
│   └── js/
│       ├── config.js               # Configuración (TEAM_DATA, COLORS)
│       ├── utils.js                # Funciones helper
│       │
│       └── components/
│           ├── Footer.js           # Componente footer
│           │
│           └── sections/
│               ├── ResumenEjecutivo.js         # Indicadores clave
│               ├── AnalisisVisual.js           # Gráficos distribución
│               ├── SeccionMachineLearning.js   # Modelos ML
│               └── Mapa.js                     # Visualización geoespacial
│
├── 📊 Datos
│   ├── datos/
│   │   ├── datos_comercios.csv     # Dataset principal (923 × 44)
│   │   ├── datos_comercios.json    # Versión JSON
│   │   ├── ml_results.json         # Resultados clustering/PCA
│   │   └── resultados_hipotesis.json  # Resultados pruebas estadísticas
│   │
│   └── notebooks/
│       ├── ML_Analisis_Comercios.ipynb       # Análisis exploratorio + clustering
│       ├── ML_Predicciones_Comercios.ipynb   # Random Forest predictivo
│       └── Test_Hipotesis.ipynb              # Validación Chi²/Mann-Whitney
│
├── 🖼️ Assets
│   └── img/
│       ├── Gina.jpg, Sofia.jpg, Juan.jpg     # Fotos equipo
│       ├── mit.png, uba.jpg, unsam.jpg       # Logos universidades
│       └── favicon-*.png                      # Iconos PWA
│
├── ⚙️ Configuración
│   ├── vercel.json                 # Config deploy Vercel
│   ├── requirements.txt            # Dependencias Python
│   └── README.md                   # Este archivo
│
└── 🔧 Ambiente
    └── .venv/                      # Virtual environment Python
```

**Refactorización Completa:**
- ✅ Script.js reducido de **6697 → 1511 líneas** (77% menos)
- ✅ Código modularizado en **9 archivos** separados
- ✅ Componentes reutilizables y mantenibles
- ✅ Organización clara por responsabilidades

---

## 🔬 Metodología Científica

### Machine Learning Pipeline
```python
# 1. CLUSTERING - K-Means
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Features seleccionadas
features = [
    'cantidad_trabajadores',
    'antiguedad_años', 
    'acceso_credito_binario',
    'horas_operacion'
]

# Normalización Z-score
scaler = StandardScaler()
X_scaled = scaler.fit_transform(datos[features])

# Clustering con k=3 (método del codo)
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
clusters = kmeans.fit_predict(X_scaled)

# Resultados
"""
Cluster 0 (Pequeño):  465 comercios (50.4%)
Cluster 1 (Mediano):  364 comercios (39.5%)
Cluster 2 (Grande):    94 comercios (10.1%)
"""
```
```python
# 2. PCA - Reducción Dimensional
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# Varianza explicada: ~75%
# PC1: 45% (tamaño/recursos)
# PC2: 30% (antigüedad/estabilidad)
```
```python
# 3. RANDOM FOREST - Predicción
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Modelo 1: Expectativas de Crecimiento
rf_crecimiento = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)

# Modelo 2: Factores Externos
rf_factores = RandomForestClassifier(
    n_estimators=100,
    max_depth=8,
    random_state=42
)

# Métricas
"""
Crecimiento:   Accuracy 67.3%, AUC 0.71
Factores Ext:  Accuracy 81.2%, AUC 0.85
"""
```

### Validación Estadística
```python
# H1: Chi-cuadrado de Independencia
from scipy.stats import chi2_contingency

# Tabla de contingencia 2x2
tabla = pd.crosstab(
    df['grupo_adverso'],
    df['quiere_crecer']
)

chi2, p_valor, dof, expected = chi2_contingency(tabla)

# Resultado: p = 0.96 > 0.05 → No rechazo H0
```
```python
# H2: Mann-Whitney U (No Paramétrica)
from scipy.stats import mannwhitneyu

grupo_favorable = df[df['favorable'] == True]['nivel_tech']
grupo_comparacion = df[df['favorable'] == False]['nivel_tech']

statistic, p_valor = mannwhitneyu(
    grupo_favorable, 
    grupo_comparacion,
    alternative='greater'
)

# Resultado: p = 0.76 > 0.05 → No rechazo H0
```

---

## 📊 Visualizaciones del Dashboard

### 1. Hero Section
- Obelisco de Buenos Aires con overlay
- Scroll reveal animations
- Título dinámico con gradientes

### 2. Indicadores Clave (KPIs)
- **7.8 años** promedio de antigüedad
- **2.8 trabajadores** por comercio
- **10.2 horas** operación diaria promedio
- **39.6%** sin acceso a crédito

### 3. Análisis Visual
- **Distribución por tipo** de comercio (Top 8)
- **Trabajadores promedio** por sector (Top 10)
- **Tier list tecnológica** (3 niveles)
- **Salarios mínimos** por tipo de negocio

### 4. Machine Learning
- **Scatter plot** clustering 3D → 2D (PCA)
- **Feature importance** horizontal bars
- **Confusion matrices** para ambos modelos
- **ROC curves** (AUC 0.71 y 0.85)

### 5. Mapas Interactivos
- **3 vistas** con tabs: Ubicaciones, Crimen, Crédito
- **Heatmaps** con gradientes de densidad
- **Estadísticas** dinámicas por vista
- **Tooltips** con información detallada

---

## 🎨 Componentes UI Destacados

### UniversidadesParticipantes
```javascript
// Carrusel infinito con scroll automático
- Auto-scroll suave cada 3s
- Hover para pausar
- 6 universidades en loop continuo
- Logos SVG optimizados
```

### GraficoTierlist
```javascript
// Clasificación tecnológica visual
- 3 niveles con gradientes personalizados
- Alto: Verde (#4CAF50)
- Moderado: Amarillo (#FFD54F) 
- Básico: Rojo (#EF5350)
- Animaciones de entrada escalonadas
```

### MapaInteractivo
```javascript
// Leaflet.js con heatmap plugin
- Base: OpenStreetMap
- 3 capas: markers, heatmap crimen, heatmap crédito
- Toggle dinámico con tabs
- Estadísticas calculadas on-the-fly
```

---

## 🐛 Troubleshooting Común

### Problema: Caracteres con encoding incorrecto
```bash
# Síntoma: "CrÃ©dito" en lugar de "Crédito"
# Solución: Convertir archivo a UTF-8

# Linux/Mac
iconv -f ISO-8859-1 -t UTF-8 datos/datos_comercios.csv > temp.csv
mv temp.csv datos/datos_comercios.csv

# Windows PowerShell
Get-Content datos/datos_comercios.csv -Encoding Latin1 | 
  Set-Content temp.csv -Encoding UTF8
```

### Problema: CSV no carga en navegador
```javascript
// Síntoma: Error 404 o datos vacíos
// Solución: Cache-busting timestamp

const timestamp = new Date().getTime();
fetch(`datos/datos_comercios.json?v=${timestamp}`)
  .then(response => response.json())
  .then(data => console.log('Datos cargados:', data.length));
```

### Problema: Errores JSX en script.js
```javascript
// ❌ Incorrecto
<div style={{color: "COLORS.primary"}}>

// ✅ Correcto  
<div style={{color: COLORS.primary}}>

// ❌ Incorrecto
{datos.map(d => <div>{d.nombre}</div>}

// ✅ Correcto
{datos.map(d => <div key={d.id}>{d.nombre}</div>)}
```

### Problema: Leaflet markers no aparecen
```html
<!-- Verificar que los CSS estén cargados -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<!-- Verificar scripts en orden correcto -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/leaflet.heat@0.2.0/dist/leaflet-heat.min.js"></script>
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
- [ ] Dashboard mobile-first refactorizado
- [ ] Integración API datos INDEC en tiempo real
- [ ] Modelos ARIMA para predicción de series temporales

### Fase 3 (Q3 2026)
- [ ] Análisis de causalidad con variables instrumentales
- [ ] Comparación con otras regiones (Rosario, Córdoba)
- [ ] Panel de control para comerciantes (self-service)
- [ ] Publicación paper académico en revista indexada

### Investigación Futura
- [ ] Impacto de políticas públicas (créditos subsidiados)
- [ ] Redes de proveedores y cadenas de valor
- [ ] Adopción de IA generativa en comercios
- [ ] Sostenibilidad ambiental y economía circular

---

## 👥 Equipo Greenthunder

<div align="center">

| Miembro | Rol | Universidad | Contacto |
|---------|-----|-------------|----------|
| **Juan Ignacio da Torre** | Lic. en Economía | UBA | [LinkedIn](https://www.linkedin.com/in/juan-da-torre-a3b120262) · [Email](mailto:Juandatorre.eco@gmail.com) |
| **Sofía Gálvez** | Lic. en Administración | UNSAM | [LinkedIn](https://www.linkedin.com/in/sofiagalvez0910) · [Email](mailto:sofialg9194@gmail.com) |
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
  institution={MIT LIFT Lab, Universidad de Buenos Aires, Universidad Nacional de San Martín},
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

© 2025-2026 Equipo Greenthunder. Todos los derechos reservados.

Este proyecto se proporciona con fines educativos y de investigación. El uso comercial requiere autorización explícita de las instituciones participantes.

---

<div align="center">

**🔗 Links Importantes**

[Dashboard en Vivo](https://mit-proyect.vercel.app) · 
[Repositorio GitHub](https://github.com/Datso653/MIT-PROYECT) · 
[MIT LIFT Lab](https://lift.mit.edu) · 
[UBA](https://www.uba.ar) · 
[UNSAM](https://www.unsam.edu.ar)

---

**Hecho con ❤️ en Buenos Aires**

</div>
```

**Nombre del commit:**
```
docs: enhance README with complete project documentation, new structure, and technical details