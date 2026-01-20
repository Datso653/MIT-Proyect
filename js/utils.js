// === FUNCIONES UTILITARIAS ===

// Filtrar outliers usando IQR
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

// Limpiar y validar datos
function limpiarDatos(datos) {
  return datos.map(d => ({
    ...d,
    cantidad_trabajadores: validarNumero(d.cantidad_trabajadores),
    trabajadores_salario_fijo: validarNumero(d.trabajadores_salario_fijo),
    consumo_kw: validarNumero(d.consumo_kw),
    año_apertura: validarNumero(d.año_apertura),
    lat: validarNumero(d.lat),
    long: validarNumero(d.long)
  }));
}

// Validar números
function validarNumero(valor) {
  const num = parseFloat(valor);
  return (!isNaN(num) && num !== null && num !== undefined && isFinite(num)) ? num : null;
}

// Obtener estadísticas robustas
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

// Calcular indicadores clave
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
    const anioApertura = parseFloat(c.año_apertura);
    if (isNaN(anioApertura) || anioApertura > anioActual) return acc;
    return acc + (anioActual - anioApertura);
  }, 0);
  const conteoAnios = datos.filter(c => {
    const anio = parseFloat(c.año_apertura);
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

// Procesar datos para gráficos
function procesarDatosGraficos(datos) {
  // Distribución por tipo de comercio
  const tiposCount = {};
  datos.forEach(c => {
    const tipo = c.tipo_comercio || 'Sin categoría';
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
    const tipo = c.tipo_comercio || 'Sin categoría';
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

  // Acceso a crédito por fuente
  const fuentesCredito = [
    { fuente: 'Bancos', key: 'credits_bancos' },
    { fuente: 'Proveedores', key: 'credits_proveedor' },
    { fuente: 'Familia', key: 'credits_familia' },
    { fuente: 'Gobierno', key: 'credits_gobierno' },
    { fuente: 'Privado', key: 'credits_privado' }
  ];

  const comerciosConCredito = datos.filter(c =>
    (parseFloat(c.credits_bancos) > 0) ||
    (parseFloat(c.credits_proveedor) > 0) ||
    (parseFloat(c.credits_familia) > 0) ||
    (parseFloat(c.credits_gobierno) > 0) ||
    (parseFloat(c.credits_privado) > 0)
  ).length;

  const creditoPorFuente = fuentesCredito.map(({ fuente, key }) => {
    const cantidad = datos.filter(c => parseFloat(c[key]) > 0).length;
    const porcentaje = comerciosConCredito > 0 ? (cantidad / comerciosConCredito) * 100 : 0;
    return {
      fuente,
      cantidad,
      porcentaje: parseFloat(porcentaje.toFixed(1))
    };
  }).sort((a, b) => b.cantidad - a.cantidad);

  // Adopción tecnológica por nivel
  const nivelesMap = {
    'Básico': 0,
    'Moderado': 0,
    'Alto': 0
  };

  datos.forEach(c => {
    const tech = c.tecnologia || '';
    if (tech.toLowerCase().includes('básico')) {
      nivelesMap['Básico']++;
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

  // Salario mínimo con limpieza de datos
  const salarios = datos
    .map(c => {
      const sal = c.min_salario;
      if (!sal) return null;
      
      const cleaned = sal.toString().replace(/\$/g, "").replace(/\./g, "").replace(/,/g, "").replace(/ /g, "");
      const num = parseFloat(cleaned);

      if (isNaN(num) || num < 100000 || num > 5000000) return null;

      return { valor: num, tipo: c.tipo_comercio || 'Sin categoría' };
    })
    .filter(s => s !== null);

  const promedioSalario = salarios.length > 0
    ? salarios.reduce((acc, s) => acc + s.valor, 0) / salarios.length
    : 0;

  const minSalario = salarios.length > 0 ? Math.min(...salarios.map(s => s.valor)) : 0;
  const maxSalario = salarios.length > 0 ? Math.max(...salarios.map(s => s.valor)) : 0;

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
    .filter(item => item.cantidad >= 3)
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
      totalRespuestas: salarios.length
    }
  };
}