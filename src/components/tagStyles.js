// ─────────────────────────────────────────────────────────────────────────
// Paleta de colores para "chips" (tags) en toda la app.
// Se centraliza acá para que VehicleCard, VehicleDetail y VehicleComparator
// pinten siempre los mismos tags con el mismo color.
// ─────────────────────────────────────────────────────────────────────────

// Estilos fijos para los tags más comunes / importantes
export const tagStyles = {
  // Uso (los mismos que filtra el FilterBar)
  Ciudad: { color: '#0c447c', bg: '#e6f1fb' },
  'Off-road': { color: '#27500a', bg: '#eaf3de' },
  Familia: { color: '#3c3489', bg: '#eeedfe' },
  Ruta: { color: '#633806', bg: '#faeeda' },
  'Ruta larga': { color: '#633806', bg: '#faeeda' },
  Trabajo: { color: '#444441', bg: '#f1efe8' },

  // Combustible
  Nafta: { color: '#8a5a00', bg: '#fdf1dc' },
  Diésel: { color: '#1f4d3d', bg: '#e2f3ec' },
  Diesel: { color: '#1f4d3d', bg: '#e2f3ec' },
  Híbrido: { color: '#0d5c4f', bg: '#def5f0' },
  Eléctrico: { color: '#0d5c4f', bg: '#def5f0' },

  // Transmisión
  Manual: { color: '#5a5a5a', bg: '#f0f0f0' },
  Automática: { color: '#5a5a5a', bg: '#f0f0f0' },
  CVT: { color: '#5a5a5a', bg: '#f0f0f0' },
  'e-CVT': { color: '#5a5a5a', bg: '#f0f0f0' },

  // Tracción
  '4x4': { color: '#7a1f1f', bg: '#fbe9e9' },
  '4x2': { color: '#7a1f1f', bg: '#fbe9e9' },
  Delantera: { color: '#7a1f1f', bg: '#fbe9e9' },

  // Tecnología / gama
  ADAS: { color: '#8a3fa0', bg: '#f6ebfa' },
  Premium: { color: '#8a3fa0', bg: '#f6ebfa' },
  Deportivo: { color: '#a0243f', bg: '#fbe9ee' },
  Turbo: { color: '#a0243f', bg: '#fbe9ee' },
};

const FALLBACK_PALETTE = [
  { color: '#0c447c', bg: '#e6f1fb' },
  { color: '#27500a', bg: '#eaf3de' },
  { color: '#3c3489', bg: '#eeedfe' },
  { color: '#633806', bg: '#faeeda' },
  { color: '#444441', bg: '#f1efe8' },
  { color: '#8a3fa0', bg: '#f6ebfa' },
  { color: '#1f4d3d', bg: '#e2f3ec' },
  { color: '#7a1f1f', bg: '#fbe9e9' },
];

// Para cualquier tag que no esté en el mapa fijo, generamos un color
// consistente (siempre el mismo para el mismo texto) en vez de un gris
// genérico, así la UI se siente prolija incluso con tags nuevos de la DB.
export function getTagStyle(tag) {
  if (tagStyles[tag]) return tagStyles[tag];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_PALETTE[hash % FALLBACK_PALETTE.length];
}