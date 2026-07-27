// ─────────────────────────────────────────────────────────────────────────
// Define cómo se traduce cada campo técnico "crudo" de la DB a algo
// legible en pantalla. Se usa tanto en la ficha técnica expandible de
// VehicleDetail como en la comparación avanzada de VehicleComparator,
// para que ambos lugares muestren siempre lo mismo.
// ─────────────────────────────────────────────────────────────────────────

function get(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export function getSpecValue(specs, path) {
  return get(specs, path);
}

// type: 'bool' | 'number' | 'text'
export const SPEC_SECTIONS = [
  {
    id: 'seguridad',
    title: 'Seguridad',
    fields: [
      { path: 'seguridad.airbags', label: 'Airbags', type: 'number', unit: '' },
      { path: 'seguridad.abs', label: 'ABS', type: 'bool' },
      { path: 'seguridad.control_estabilidad', label: 'Control de estabilidad', type: 'bool' },
      { path: 'seguridad.control_traccion', label: 'Control de tracción', type: 'bool' },
      { path: 'seguridad.asistente_arranque_pendiente', label: 'Asistente de arranque en pendiente', type: 'bool' },
      { path: 'seguridad.isofix', label: 'Anclajes ISOFIX', type: 'bool' },
      { path: 'seguridad.camara_retroceso', label: 'Cámara de retroceso', type: 'bool' },
      { path: 'seguridad.sensores_estacionamiento', label: 'Sensores de estacionamiento', type: 'bool' },
      { path: 'seguridad.control_crucero', label: 'Control de crucero', type: 'bool' },
      { path: 'seguridad.alerta_colision', label: 'Alerta de colisión', type: 'bool' },
      { path: 'seguridad.frenado_autonomo', label: 'Frenado autónomo de emergencia', type: 'bool' },
      { path: 'seguridad.mantenimiento_carril', label: 'Mantenimiento de carril', type: 'bool' },
    ],
  },
  {
    id: 'confort',
    title: 'Confort y tecnología',
    fields: [
      { path: 'confort.pantalla_pulgadas', label: 'Pantalla multimedia', type: 'number', unit: '"' },
      { path: 'confort.apple_carplay_android_auto', label: 'Apple CarPlay / Android Auto', type: 'bool' },
      { path: 'confort.climatizador', label: 'Climatizador', type: 'text' },
      { path: 'confort.acceso_sin_llave', label: 'Acceso sin llave', type: 'bool' },
      { path: 'confort.arranque_boton', label: 'Arranque por botón', type: 'bool' },
      { path: 'confort.cargador_inalambrico', label: 'Cargador inalámbrico', type: 'bool' },
      { path: 'confort.techo_panoramico', label: 'Techo panorámico', type: 'bool' },
      { path: 'exterior.faros_led', label: 'Faros LED', type: 'bool' },
      { path: 'exterior.llantas', label: 'Llantas', type: 'text' },
    ],
  },
  {
    id: 'motor',
    title: 'Motor y transmisión',
    fields: [
      { path: 'motor.combustible', label: 'Combustible', type: 'text' },
      { path: 'motor.turbo', label: 'Turbo', type: 'bool' },
      { path: 'motor.hibrido', label: 'Híbrido', type: 'bool' },
      { path: 'motor.electrico', label: 'Eléctrico', type: 'bool' },
      { path: 'transmision.tipo', label: 'Transmisión', type: 'text' },
      { path: 'transmision.marchas', label: 'Marchas', type: 'number', unit: '' },
      { path: 'prestaciones.velocidad_max_kmh', label: 'Velocidad máxima', type: 'number', unit: ' km/h' },
      { path: 'traccion', label: 'Tracción', type: 'text' },
    ],
  },
  {
    id: 'capacidad',
    title: 'Capacidad y garantía',
    fields: [
      { path: 'plazas', label: 'Plazas', type: 'number', unit: '' },
      { path: 'capacidad.baul_l', label: 'Baúl', type: 'number', unit: ' L' },
      { path: 'capacidad.tanque_combustible_l', label: 'Tanque de combustible', type: 'number', unit: ' L' },
      { path: 'garantia.anos', label: 'Garantía', type: 'number', unit: ' años' },
      { path: 'garantia.km', label: 'Garantía (km)', type: 'number', unit: ' km' },
    ],
  },
];