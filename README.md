# 🤖 Análisis de Comercios - Proyecto MIT

Dashboard interactivo para análisis de datos de comercios con Machine Learning integrado.

## 📋 Características

- ✅ **Dashboard interactivo** con visualizaciones de datos
- ✅ **Análisis estadístico** automático
- ✅ **Machine Learning** con Python (K-Means Clustering)
- ✅ **Visualización PCA** para reducción dimensional
- ✅ **Análisis predictivo** de expectativas
- ✅ **Diseño moderno** con gradientes y animaciones

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/MIT-PROYECT.git
cd MIT-PROYECT
```

### 2. Instalar dependencias de Python

```bash
pip install -r requirements.txt
```

**Dependencias:**
- pandas
- numpy
- scikit-learn

## 📊 Uso

### Paso 1: Ejecutar el análisis de Machine Learning

Ejecuta el script de Python con tu archivo CSV:

```bash
python ml_analysis.py tu_archivo.csv
```

Este comando:
- ✅ Analiza los datos del CSV
- ✅ Aplica K-Means clustering
- ✅ Realiza reducción dimensional con PCA
- ✅ Calcula correlaciones entre variables
- ✅ Genera análisis predictivo de expectativas
- ✅ Guarda los resultados en `ml_results.json`

**Ejemplo de salida:**

```
============================================================
🤖 ANÁLISIS DE MACHINE LEARNING - COMERCIOS
============================================================

📊 Datos cargados: 923 comercios
✅ Comercios con datos completos: 850

🤖 K-Means Clustering completado
   Número de clusters: 3
   Inercia: 234.56

📌 Cluster 0 - Pequeños:
   Comercios: 320 (37.6%)
   Trabajadores: 1.8 (promedio)
   Horas operación: 9.2h (promedio)
   Con crédito: 15.3%

...

============================================================
✅ Análisis completado exitosamente
📁 Resultados guardados en: ml_results.json
============================================================
```

### Paso 2: Ver los resultados en el dashboard

1. Abre `index.html` en tu navegador (o accede via Vercel)
2. Carga tu archivo CSV en la interfaz
3. Navega a la sección **"🤖 Machine Learning"**
4. Visualiza los resultados del análisis

## 📁 Estructura del Proyecto

```
MIT-PROYECT/
├── index.html              # Página principal
├── script.js               # Lógica del dashboard
├── styles.css              # Estilos
├── ml_analysis.py          # Script de Machine Learning
├── requirements.txt        # Dependencias Python
├── ml_results.json         # Resultados del análisis ML (generado)
└── README.md              # Este archivo
```

## 🔬 Análisis de Machine Learning

### Algoritmos utilizados:

1. **K-Means Clustering**
   - Segmenta comercios en 3 grupos
   - Variables: trabajadores, horas de operación, acceso a crédito
   - Normalización con StandardScaler

2. **PCA (Principal Component Analysis)**
   - Reducción dimensional a 2D para visualización
   - Mantiene la mayor varianza posible

3. **Análisis Predictivo**
   - Clasificación de expectativas positivas/negativas
   - Score combinado de ventas, inventario y precios

### Variables analizadas:

- `cantidad_trabajadores` - Número de empleados
- `hs_apertura` / `hs_cierre` - Horarios de operación
- `credito_formal` - Acceso a financiamiento formal
- `exp_ventas_3mes` - Expectativas de ventas
- `exp_inventario_3mes` - Expectativas de inventario
- `exp_precios_3mes` - Expectativas de precios

## 📊 Visualizaciones disponibles

### En el Dashboard:

1. **Resumen Ejecutivo** - Métricas clave y hallazgos
2. **Tipos de Comercio** - Distribución por categoría
3. **Análisis de Ventas** - Tendencias temporales
4. **Datos Laborales** - Empleados por tipo de comercio
5. **Acceso a Crédito** - Análisis de financiamiento
6. **Machine Learning** - Clustering, PCA, correlaciones

## 🎨 Personalización

### Modificar el número de clusters:

En `ml_analysis.py`, línea 96:

```python
n_clusters = 3  # Cambiar a 4, 5, etc.
```

### Agregar nuevas variables:

En `ml_analysis.py`, sección "PREPARACIÓN DE DATOS":

```python
# Agregar tu nueva variable
if 'tu_variable' in df.columns:
    df['tu_variable_clean'] = pd.to_numeric(df['tu_variable'], errors='coerce')
    features_numericas.append('tu_variable_clean')
```

## 🚀 Deploy en Vercel

1. Conecta tu repositorio de GitHub con Vercel
2. Los cambios se deployarán automáticamente con cada push
3. **Importante:** Ejecuta `ml_analysis.py` localmente y commitea `ml_results.json`

```bash
python ml_analysis.py datos.csv
git add ml_results.json
git commit -m "Update ML results"
git push
```

## 📝 Formato del CSV

El CSV debe incluir estas columnas (mínimo):

- `tipo_comercio` - Categoría del comercio
- `cantidad_trabajadores` - Número de empleados
- `hs_apertura` - Hora de apertura
- `hs_cierre` - Hora de cierre
- `credito_formal` - Acceso a crédito (Sí/No)
- `venta_vs_mesinantes` - Tendencia de ventas
- `exp_ventas_3mes` - Expectativas de ventas
- `exp_inventario_3mes` - Expectativas de inventario
- `exp_precios_3mes` - Expectativas de precios

## 🐛 Solución de Problemas

### El script de Python no funciona

```bash
# Verifica que las dependencias estén instaladas
pip list | grep -E "pandas|numpy|scikit"

# Reinstala si es necesario
pip install --upgrade -r requirements.txt
```

### Los resultados ML no aparecen en el dashboard

1. Verifica que `ml_results.json` exista en el directorio raíz
2. Abre la consola del navegador (F12) para ver errores
3. Asegúrate de que el archivo sea JSON válido:

```bash
python -m json.tool ml_results.json
```

### Errores con el CSV

- Verifica la codificación: debe ser UTF-8
- Asegúrate de que la primera fila contiene los nombres de columnas
- Revisa que los números no tengan caracteres especiales

## 📈 Próximas Mejoras

- [ ] Análisis de regresión para predicciones