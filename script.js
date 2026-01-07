// Componente principal de la aplicación
const AnalisisComerciosApp = () => {
    const { useState, useEffect } = React;
    
    // Verificar si Recharts está disponible
    if (!window.Recharts) {
        console.error('Recharts no está cargado');
        return React.createElement('div', { 
            style: { 
                padding: '20px', 
                textAlign: 'center',
                color: 'red'
            } 
        }, 'Error: Recharts no se cargó correctamente. Recarga la página.');
    }
    
    const { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;
    const lucideReact = window.lucideReact;
    
    // Si lucideReact no está disponible, usar íconos de texto
    const Iconos = lucideReact || {
        TrendingUp: () => '📈',
        Store: () => '🏪',
        Users: () => '👥',
        DollarSign: () => '💰',
        Upload: () => '📤',
        FileText: () => '📄',
        Download: () => '📥'
    };
    
    const [seccionActiva, setSeccionActiva] = useState('carga');
    const [datos, setDatos] = useState(null);
    const [analisis, setAnalisis] = useState(null);
    const [cargando, setCargando] = useState(false);
    
    // Datos de ejemplo
    const generarDatosEjemplo = () => {
        return [
            { tipo_comercio: "Restaurante", venta_vs_mesinantes: "Aumentó", cantidad_trabajadores: 5 },
            { tipo_comercio: "Tienda", venta_vs_mesinantes: "Se mantuvo", cantidad_trabajadores: 2 },
            { tipo_comercio: "Supermercado", venta_vs_mesinantes: "Aumentó", cantidad_trabajadores: 15 },
            { tipo_comercio: "Farmacia", venta_vs_mesinantes: "Disminuyó", cantidad_trabajadores: 4 },
            { tipo_comercio: "Panadería", venta_vs_mesinantes: "Aumentó", cantidad_trabajadores: 3 }
        ];
    };
    
    // Función para generar análisis
    const generarAnalisis = (datos) => {
        const tiposComercio = {};
        datos.forEach(row => {
            const tipo = row.tipo_comercio || 'No especificado';
            tiposComercio[tipo] = (tiposComercio[tipo] || 0) + 1;
        });
        
        const tiposComercioArray = Object.entries(tiposComercio)
            .map(([name, value]) => ({ name, value }));
        
        const tendenciaVentas = [
            { categoria: 'Aumentó', cantidad: datos.filter(d => d.venta_vs_mesinantes === 'Aumentó').length },
            { categoria: 'Se mantuvo', cantidad: datos.filter(d => d.venta_vs_mesinantes === 'Se mantuvo').length },
            { categoria: 'Disminuyó', cantidad: datos.filter(d => d.venta_vs_mesinantes === 'Disminuyó').length }
        ];
        
        const totalComercios = datos.length;
        const promedioTrabajadores = (datos.reduce((sum, row) => sum + (parseFloat(row.cantidad_trabajadores) || 0), 0) / totalComercios).toFixed(1);
        
        return {
            tiposComercio: tiposComercioArray,
            tendenciaVentas,
            estadisticas: {
                totalComercios,
                promedioTrabajadores
            }
        };
    };
    
    // Cargar datos de ejemplo
    const cargarDatosEjemplo = () => {
        setCargando(true);
        setTimeout(() => {
            const datosEjemplo = generarDatosEjemplo();
            const analisisGenerado = generarAnalisis(datosEjemplo);
            setDatos(datosEjemplo);
            setAnalisis(analisisGenerado);
            setCargando(false);
            setSeccionActiva('resumen');
        }, 500);
    };
    
    // Componente de estadística
    const Estadistica = ({ icono: Icono, titulo, valor, subtitulo, color }) => {
        const IconComponent = Iconos[Icono] || Icono;
        return React.createElement('div', {
            className: "bg-white rounded-lg shadow-md p-6 border-l-4",
            style: { borderColor: color }
        }, 
            React.createElement('div', { className: "flex items-center justify-between" },
                React.createElement('div', null,
                    React.createElement('p', { className: "text-gray-500 text-sm font-medium" }, titulo),
                    React.createElement('p', { className: "text-3xl font-bold mt-2", style: { color } }, valor),
                    React.createElement('p', { className: "text-gray-400 text-xs mt-1" }, subtitulo)
                ),
                React.createElement('div', { className: "bg-gray-50 p-3 rounded-full" },
                    React.createElement(IconComponent, { size: 32, style: { color } })
                )
            )
        );
    };
    
    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
    
    // Cargar datos al inicio
    useEffect(() => {
        cargarDatosEjemplo();
    }, []);
    
    // Pantalla de carga
    if (seccionActiva === 'carga' && !analisis) {
        return React.createElement('div', { className: "bg-white rounded-lg shadow-md p-12" },
            React.createElement('div', { className: "max-w-2xl mx-auto text-center" },
                React.createElement(Iconos.Upload, { size: 64, className: "mx-auto text-blue-600 mb-6" }),
                React.createElement('h2', { className: "text-2xl font-bold text-gray-800 mb-4" }, "Carga tu Base de Datos"),
                React.createElement('p', { className: "text-gray-600 mb-8" }, "Sistema de análisis de comercios"),
                
                cargando && React.createElement('div', { className: "my-8" },
                    React.createElement('div', { className: "loading-spinner mx-auto" }),
                    React.createElement('p', { className: "text-gray-600 mt-4" }, "Cargando datos de ejemplo...")
                )
            )
        );
    }
    
    // Resumen Ejecutivo
    if (seccionActiva === 'resumen' && analisis) {
        return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" },
            // Header
            React.createElement('header', { className: "bg-white shadow-lg" },
                React.createElement('div', { className: "max-w-7xl mx-auto px-6 py-6" },
                    React.createElement('h1', { className: "text-3xl font-bold text-gray-800" }, "Análisis de Comercios"),
                    React.createElement('p', { className: "text-gray-600 mt-2" }, "Proyecto MIT - Informe Preliminar")
                )
            ),
            
            // Navegación
            React.createElement('div', { className: "max-w-7xl mx-auto px-6 py-4" },
                React.createElement('div', { className: "bg-white rounded-lg shadow-md p-2 flex gap-2 overflow-x-auto" },
                    ['resumen', 'comercios', 'ventas'].map(seccion => 
                        React.createElement('button', {
                            key: seccion,
                            onClick: () => setSeccionActiva(seccion),
                            className: `px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                                seccionActiva === seccion
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`
                        }, 
                            seccion === 'resumen' ? 'Resumen' :
                            seccion === 'comercios' ? 'Tipos de Comercio' : 'Ventas'
                        )
                    )
                )
            ),
            
            // Contenido
            React.createElement('main', { className: "max-w-7xl mx-auto px-6 py-6" },
                React.createElement('div', { className: "space-y-6" },
                    // Estadísticas
                    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
                        React.createElement(Estadistica, {
                            icono: "Store",
                            titulo: "Comercios Analizados",
                            valor: analisis.estadisticas.totalComercios,
                            subtitulo: "Muestra total",
                            color: "#3b82f6"
                        }),
                        React.createElement(Estadistica, {
                            icono: "Users",
                            titulo: "Trabajadores Promedio",
                            valor: analisis.estadisticas.promedioTrabajadores,
                            subtitulo: "Por comercio",
                            color: "#8b5cf6"
                        }),
                        React.createElement(Estadistica, {
                            icono: "TrendingUp",
                            titulo: "Tendencia Positiva",
                            valor: `${((analisis.tendenciaVentas[0]?.cantidad / analisis.estadisticas.totalComercios) * 100).toFixed(0)}%`,
                            subtitulo: "Comercios con ventas en aumento",
                            color: "#10b981"
                        })
                    ),
                    
                    // Gráfico de tipos de comercio
                    seccionActiva === 'comercios' && React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
                        React.createElement('h2', { className: "text-xl font-bold text-gray-800 mb-4" }, "Distribución por Tipo de Comercio"),
                        React.createElement('div', { className: "chart-container", style: { height: '400px' } },
                            React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                                React.createElement(PieChart, null,
                                    React.createElement(Pie,
                                        {
                                            data: analisis.tiposComercio,
                                            cx: "50%",
                                            cy: "50%",
                                            labelLine: false,
                                            label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`,
                                            outerRadius: 120,
                                            fill: "#8884d8",
                                            dataKey: "value"
                                        },
                                        analisis.tiposComercio.map((entry, index) =>
                                            React.createElement(Cell, { key: `cell-${index}`, fill: COLORS[index % COLORS.length] })
                                        )
                                    ),
                                    React.createElement(Tooltip, null)
                                )
                            )
                        )
                    ),
                    
                    // Gráfico de ventas
                    seccionActiva === 'ventas' && React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
                        React.createElement('h2', { className: "text-xl font-bold text-gray-800 mb-4" }, "Tendencia de Ventas"),
                        React.createElement('div', { className: "chart-container", style: { height: '400px' } },
                            React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                                React.createElement(BarChart, { data: analisis.tendenciaVentas },
                                    React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
                                    React.createElement(XAxis, { dataKey: "categoria" }),
                                    React.createElement(YAxis, null),
                                    React.createElement(Tooltip, null),
                                    React.createElement(Bar, { dataKey: "cantidad", fill: "#3b82f6", name: "Cantidad de comercios" })
                                )
                            )
                        )
                    ),
                    
                    // Resumen general (sección activa por defecto)
                    seccionActiva === 'resumen' && React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
                        React.createElement('h2', { className: "text-xl font-bold text-gray-800 mb-4" }, "Resumen Ejecutivo"),
                        React.createElement('div', { className: "space-y-4" },
                            React.createElement('p', { className: "text-gray-600" },
                                `Se analizaron ${analisis.estadisticas.totalComercios} comercios con un promedio de ${analisis.estadisticas.promedioTrabajadores} trabajadores por establecimiento.`
                            ),
                            React.createElement('p', { className: "text-gray-600" },
                                `El ${((analisis.tendenciaVentas[0]?.cantidad / analisis.estadisticas.totalComercios) * 100).toFixed(0)}% de los comercios reportó aumento en ventas.`
                            ),
                            React.createElement('div', { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" },
                                React.createElement('div', { className: "border-l-4 border-blue-500 pl-4" },
                                    React.createElement('h3', { className: "font-semibold text-gray-800" }, "📊 Distribución"),
                                    React.createElement('p', { className: "text-gray-600 text-sm mt-1" },
                                        `${analisis.tiposComercio.length} categorías diferentes identificadas.`
                                    )
                                ),
                                React.createElement('div', { className: "border-l-4 border-purple-500 pl-4" },
                                    React.createElement('h3', { className: "font-semibold text-gray-800" }, "📈 Tendencia"),
                                    React.createElement('p', { className: "text-gray-600 text-sm mt-1" },
                                        `${analisis.tendenciaVentas[1]?.cantidad || 0} comercios mantuvieron sus ventas.`
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            
            // Footer
            React.createElement('footer', { className: "max-w-7xl mx-auto px-6 py-6" },
                React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
                    React.createElement('h3', { className: "text-lg font-bold text-gray-800 mb-3" }, "Recomendaciones para el Informe MIT"),
                    React.createElement('div', { className: "space-y-2 text-sm text-gray-600" },
                        React.createElement('p', null, "✓ Análisis de impacto en políticas comerciales"),
                        React.createElement('p', null, "✓ Comparativa entre tipos de comercio"),
                        React.createElement('p', null, "✓ Estudio de acceso a financiamiento")
                    )
                )
            )
        );
    }
    
    // Fallback si algo sale mal
    return React.createElement('div', { className: "p-8 text-center" },
        React.createElement('p', { className: "text-red-500" }, "Error al cargar la aplicación")
    );
};

// Renderizar la aplicación
ReactDOM.render(React.createElement(AnalisisComerciosApp), document.getElementById('root'));