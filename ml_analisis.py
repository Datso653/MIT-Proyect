import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import json
import sys

def analizar_comercios_ml(csv_path):
    """
    Análisis de Machine Learning para comercios
    Clustering K-Means y análisis predictivo
    """
    
    # Cargar datos
    df = pd.read_csv(csv_path)
    
    print(f"📊 Datos cargados: {len(df)} comercios")
    print(f"📋 Columnas disponibles: {df.columns.tolist()}\n")
    
    # ==========================================
    # 1. PREPARACIÓN DE DATOS
    # ==========================================
    
    # Seleccionar features para clustering
    features_numericas = []
    
    # Cantidad de trabajadores
    if 'cantidad_trabajadores' in df.columns:
        df['trabajadores_clean'] = pd.to_numeric(df['cantidad_trabajadores'], errors='coerce')
        features_numericas.append('trabajadores_clean')
    
    # Horas de operación
    if 'hs_apertura' in df.columns and 'hs_cierre' in df.columns:
        df['apertura_clean'] = pd.to_numeric(df['hs_apertura'], errors='coerce')
        df['cierre_clean'] = pd.to_numeric(df['hs_cierre'], errors='coerce')
        df['horas_operacion'] = df['cierre_clean'] - df['apertura_clean']
        features_numericas.append('horas_operacion')
    
    # Acceso a crédito (binario)
    if 'credito_formal' in df.columns:
        df['tiene_credito'] = df['credito_formal'].apply(
            lambda x: 1 if str(x).lower() in ['sí', 'si', '1', 'true'] else 0
        )
        features_numericas.append('tiene_credito')
    
    # Filtrar datos válidos
    df_ml = df[features_numericas].dropna()
    
    print(f"✅ Comercios con datos completos: {len(df_ml)}")
    print(f"📊 Features utilizadas: {features_numericas}\n")
    
    if len(df_ml) < 10:
        print("❌ Error: No hay suficientes datos para el análisis ML")
        return None
    
    # ==========================================
    # 2. CLUSTERING K-MEANS
    # ==========================================
    
    # Normalizar datos
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(df_ml)
    
    # Aplicar K-Means con 3 clusters
    n_clusters = 3
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    df_ml['cluster'] = kmeans.fit_predict(X_scaled)
    
    print("🤖 K-Means Clustering completado")
    print(f"   Número de clusters: {n_clusters}")
    print(f"   Inercia: {kmeans.inertia_:.2f}\n")
    
    # ==========================================
    # 3. ANÁLISIS DE CLUSTERS
    # ==========================================
    
    cluster_labels = ['Pequeños', 'Medianos', 'Grandes']
    cluster_info = []
    
    for i in range(n_clusters):
        cluster_data = df_ml[df_ml['cluster'] == i]
        
        info = {
            'cluster_id': int(i),
            'label': cluster_labels[i],
            'count': int(len(cluster_data)),
            'porcentaje': round(len(cluster_data) / len(df_ml) * 100, 1)
        }
        
        # Estadísticas por feature
        if 'trabajadores_clean' in features_numericas:
            info['trabajadores_promedio'] = round(cluster_data['trabajadores_clean'].mean(), 1)
            info['trabajadores_mediana'] = round(cluster_data['trabajadores_clean'].median(), 1)
        
        if 'horas_operacion' in features_numericas:
            info['horas_promedio'] = round(cluster_data['horas_operacion'].mean(), 1)
            info['horas_mediana'] = round(cluster_data['horas_operacion'].median(), 1)
        
        if 'tiene_credito' in features_numericas:
            info['porcentaje_credito'] = round(cluster_data['tiene_credito'].mean() * 100, 1)
        
        cluster_info.append(info)
        
        print(f"📌 Cluster {i} - {cluster_labels[i]}:")
        print(f"   Comercios: {info['count']} ({info['porcentaje']}%)")
        if 'trabajadores_promedio' in info:
            print(f"   Trabajadores: {info['trabajadores_promedio']} (promedio)")
        if 'horas_promedio' in info:
            print(f"   Horas operación: {info['horas_promedio']}h (promedio)")
        if 'porcentaje_credito' in info:
            print(f"   Con crédito: {info['porcentaje_credito']}%")
        print()
    
    # ==========================================
    # 4. PCA PARA VISUALIZACIÓN 2D
    # ==========================================
    
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)
    
    pca_data = []
    for idx, row in enumerate(X_pca):
        pca_data.append({
            'x': float(row[0]),
            'y': float(row[1]),
            'cluster': int(df_ml.iloc[idx]['cluster'])
        })
    
    print(f"📈 PCA completado")
    print(f"   Varianza explicada: {sum(pca.explained_variance_ratio_) * 100:.1f}%\n")
    
    # ==========================================
    # 5. ANÁLISIS DE EXPECTATIVAS (PREDICTIVO)
    # ==========================================
    
    expectativas_analisis = None
    
    if all(col in df.columns for col in ['exp_ventas_3mes', 'exp_inventario_3mes', 'exp_precios_3mes']):
        # Función para clasificar expectativas
        def clasificar_expectativa(texto):
            if pd.isna(texto):
                return 0
            texto = str(texto).lower()
            palabras_positivas = ['aument', 'crec', 'mejor', 'más', 'subir', 'mayor']
            return 1 if any(palabra in texto for palabra in palabras_positivas) else 0
        
        df['exp_ventas_positiva'] = df['exp_ventas_3mes'].apply(clasificar_expectativa)
        df['exp_inventario_positiva'] = df['exp_inventario_3mes'].apply(clasificar_expectativa)
        df['exp_precios_positiva'] = df['exp_precios_3mes'].apply(clasificar_expectativa)
        
        # Score de expectativa (promedio de las 3)
        df['expectativa_score'] = (df['exp_ventas_positiva'] + 
                                    df['exp_inventario_positiva'] + 
                                    df['exp_precios_positiva']) / 3
        
        expectativas_analisis = {
            'ventas_positivas': int(df['exp_ventas_positiva'].sum()),
            'inventario_positivo': int(df['exp_inventario_positiva'].sum()),
            'precios_positivos': int(df['exp_precios_positiva'].sum()),
            'score_promedio': round(df['expectativa_score'].mean(), 2),
            'total_analizados': int(df['expectativa_score'].notna().sum())
        }
        
        print("🔮 Análisis de Expectativas:")
        print(f"   Expectativas positivas en ventas: {expectativas_analisis['ventas_positivas']}")
        print(f"   Expectativas positivas en inventario: {expectativas_analisis['inventario_positivo']}")
        print(f"   Expectativas positivas en precios: {expectativas_analisis['precios_positivos']}")
        print(f"   Score promedio: {expectativas_analisis['score_promedio']}\n")
    
    # ==========================================
    # 6. CORRELACIONES
    # ==========================================
    
    correlaciones = {}
    if len(features_numericas) > 1:
        corr_matrix = df_ml[features_numericas].corr()
        
        for i, col1 in enumerate(features_numericas):
            for col2 in features_numericas[i+1:]:
                key = f"{col1}_vs_{col2}"
                correlaciones[key] = round(corr_matrix.loc[col1, col2], 3)
        
        print("🔗 Correlaciones encontradas:")
        for key, value in correlaciones.items():
            print(f"   {key}: {value}")
        print()
    
    # ==========================================
    # 7. PREPARAR RESULTADO JSON
    # ==========================================
    
    resultado = {
        'metadata': {
            'total_comercios': int(len(df)),
            'comercios_analizados': int(len(df_ml)),
            'features_utilizadas': features_numericas,
            'fecha_analisis': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')
        },
        'clustering': {
            'n_clusters': n_clusters,
            'inercia': float(kmeans.inertia_),
            'clusters': cluster_info,
            'distribucion': [int(len(df_ml[df_ml['cluster'] == i])) for i in range(n_clusters)]
        },
        'pca': {
            'varianza_explicada': [float(x) for x in pca.explained_variance_ratio_],
            'datos': pca_data[:100]  # Limitar para tamaño del JSON
        },
        'expectativas': expectativas_analisis,
        'correlaciones': correlaciones
    }
    
    return resultado


def main():
    if len(sys.argv) < 2:
        print("❌ Error: Debes proporcionar la ruta del archivo CSV")
        print("   Uso: python ml_analysis.py ruta/al/archivo.csv")
        sys.exit(1)
    
    csv_path = sys.argv[1]
    
    print("="*60)
    print("🤖 ANÁLISIS DE MACHINE LEARNING - COMERCIOS")
    print("="*60)
    print()
    
    resultado = analizar_comercios_ml(csv_path)
    
    if resultado:
        # Guardar resultado en JSON
        output_path = 'ml_results.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(resultado, f, indent=2, ensure_ascii=False)
        
        print("="*60)
        print(f"✅ Análisis completado exitosamente")
        print(f"📁 Resultados guardados en: {output_path}")
        print("="*60)
    else:
        print("❌ El análisis no pudo completarse")
        sys.exit(1)


if __name__ == "__main__":
    main()