import db from './db.json';

// Vite resuelve en build-time todos los assets de vehículos y arma un mapa
// "ruta tal cual aparece en la DB" → URL real servida por el bundler.
// Así, un imagen_url como "src/assets/vehicles/volkswagen/amarok/trendline.webp"
// se resuelve automáticamente sin tener que importar cada imagen a mano.
const assetModules = import.meta.glob('/src/assets/vehicles/**/*.{webp,png,avif}', {
  eager: true,
  import: 'default',
});

function resolveImage(path) {
  if (!path) return null;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return assetModules[normalized] || null;
}

// ─────────────────────────────────────────────────────────────────────────
// Adaptador de datos: convierte la DB real (modelos → versiones) en una
// lista plana de "vehículos" (una card por versión), con la forma que
// esperan los componentes de la UI.
//
// Si el día de mañana cambia la estructura de la DB, este es el único
// archivo que debería tocarse: el resto de la app consume el resultado
// de `vehicles`, `categories` y `marcas` de más abajo.
// ─────────────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Combustible → etiqueta corta para chips ─────────────────────────────
function combustibleLabel(motor) {
  if (!motor) return null;
  if (motor.electrico) return 'Eléctrico';
  if (motor.hibrido) return 'Híbrido';
  const c = (motor.combustible || '').toLowerCase();
  if (c.includes('dies')) return 'Diésel';
  if (c.includes('naft')) return 'Nafta';
  return motor.combustible || null;
}

// ── Transmisión → etiqueta corta para chips ─────────────────────────────
function transmisionLabel(transmision) {
  if (!transmision) return null;
  const t = (transmision.tipo || '').toLowerCase();
  if (t.includes('e-cvt')) return 'e-CVT';
  if (t.includes('cvt')) return 'CVT';
  if (t.includes('manual')) return 'Manual';
  if (t.includes('autom')) return 'Automática';
  return transmision.tipo || null;
}

// ── Tracción → etiqueta corta para chips ────────────────────────────────
function traccionLabel(traccion) {
  if (!traccion) return null;
  const t = traccion.toLowerCase();
  if (t.includes('4x4') || t.includes('4motion') || t.includes('4wd')) return '4x4';
  if (t.includes('4x2')) return '4x2';
  if (t.includes('delantera')) return 'Delantera';
  if (t.includes('trasera')) return 'Trasera';
  return traccion;
}

// ── Carrocería (DB) → categoría del Sidebar ─────────────────────────────
const CARROCERIA_TO_CATEGORY = {
  suv: '4x4 / SUV',
  pickup: 'Camionetas',
  'pick-up': 'Camionetas',
  sedan: 'Sedanes',
  hatchback: 'Compactos',
};

function mapCategory(carroceria) {
  const key = (carroceria || '').toLowerCase().replace(/[\u0300-\u036f]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return CARROCERIA_TO_CATEGORY[key] || carroceria;
}

// ── Tags de la versión → tags de "uso" que entiende el FilterBar ───────
// El FilterBar filtra por: Ciudad, Off-road, Familia, Ruta larga, Trabajo.
// Los tags de la DB son más descriptivos ("Trabajo y flotas", "Ciudad y
// uso diario", etc.), así que inferimos a qué "uso" corresponden.
function inferUsoTags(rawTags = []) {
  const joined = rawTags.join(' | ').toLowerCase();
  const uso = [];
  if (joined.includes('ciudad')) uso.push('Ciudad');
  if (joined.includes('familia')) uso.push('Familia');
  if (joined.includes('ruta') || joined.includes('viaje')) uso.push('Ruta larga');
  if (joined.includes('trabajo') || joined.includes('flotas')) uso.push('Trabajo');
  if (joined.includes('off-road')) uso.push('Off-road');
  return uso;
}

// ── Chips a mostrar en Card/Detail (máximo 4, para no saturar) ─────────
function buildDisplayTags({ motor, transmision, traccion, seguridad }, usoTags) {
  const chips = [];
  const comb = combustibleLabel(motor);
  const trans = transmisionLabel(transmision);
  const trac = traccionLabel(traccion);
  const hasADAS = seguridad && (seguridad.frenado_autonomo || seguridad.alerta_colision || seguridad.mantenimiento_carril);

  if (comb) chips.push(comb);
  if (trac) chips.push(trac);
  if (trans) chips.push(trans);
  if (hasADAS) chips.push('ADAS');
  if (usoTags[0] && !chips.includes(usoTags[0])) chips.push(usoTags[0]);

  return chips.slice(0, 4);
}

// ── datos_tecnicos_resumen → array "Label: valor" (formato que usa el
//    comparador para extraer números y resaltar el ganador) ────────────
function buildDatosTecnicos(resumen = {}) {
  const labelMap = {
    motor: 'Motor',
    potencia: 'Potencia',
    traccion: 'Tracción',
    consumo: 'Consumo',
  };
  return Object.entries(resumen)
    .filter(([key]) => labelMap[key])
    .map(([key, value]) => `${labelMap[key]}: ${value}`);
}

function buildVehicle(modeloInfo, version) {
  const { marca, modelo, segmento, carroceria } = modeloInfo;
  const usoTags = inferUsoTags(version.tags);

  return {
    id: slugify(`${marca}-${modelo}-${version.nombre}`),
    marca,
    modelo,
    nombre: version.nombre,
    segmento,
    carroceria,
    category: mapCategory(carroceria),

    name: `${marca} ${modelo}`,
    subtitle: [combustibleLabel(version.motor), transmisionLabel(version.transmision)]
      .filter(Boolean)
      .join(' · '),

    imagenUrl: resolveImage(version.imagen_url),
    imagenUrlRaw: version.imagen_url, // por si querés depurar rutas que no matchean
    description: version.descripcion,

    tags: usoTags, // usados por el FilterBar (misma lógica que antes)
    displayTags: buildDisplayTags(version, usoTags),
    rawTags: version.tags,

    ventajas: version.ventajas,
    desventajas: version.desventajas,

    datosTecnicos: buildDatosTecnicos(version.datos_tecnicos_resumen),
    datosTecnicosResumen: version.datos_tecnicos_resumen,

    // Specs completos, para la ficha técnica expandible y el comparador avanzado
    specs: {
      plazas: version.plazas,
      traccion: version.traccion,
      motor: version.motor,
      transmision: version.transmision,
      prestaciones: version.prestaciones,
      capacidad: version.capacidad,
      garantia: version.garantia,
      seguridad: version.seguridad,
      confort: version.confort,
      exterior: version.exterior,
    },
  };
}

export const vehicles = db.flatMap((modeloInfo) =>
  (modeloInfo.versiones || []).map((version) => buildVehicle(modeloInfo, version))
);

// Categorías realmente presentes en la data, en un orden prolijo fijo
const CATEGORY_ORDER = ['4x4 / SUV', 'Sedanes', 'Compactos', 'Camionetas', 'Motos'];
export const categories = CATEGORY_ORDER.filter((c) => vehicles.some((v) => v.category === c));

// Marcas presentes en la data, ordenadas alfabéticamente
export const marcas = [...new Set(vehicles.map((v) => v.marca))].sort();