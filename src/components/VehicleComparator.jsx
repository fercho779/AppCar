import { useState, Fragment } from 'react';
import { getTagStyle } from './tagStyles';
import { VehicleImage } from './VehicleImage';
import { SPEC_SECTIONS, getSpecValue } from '../data/specSections';

// Extrae el valor numérico del consumo para comparar (ej: "8.5L/100km" → 8.5)
function parseConsumo(datosTecnicos) {
  const entry = datosTecnicos.find((d) => d.toLowerCase().includes('consumo'));
  if (!entry) return null;
  const match = entry.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

// Extrae potencia numérica (ej: "150 CV" → 150)
function parsePotencia(datosTecnicos) {
  const entry = datosTecnicos.find((d) => d.toLowerCase().includes('potencia'));
  if (!entry) return null;
  const match = entry.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

// Modal buscador de vehículo
function VehicleSearchModal({ vehicles, excludeId, onSelect, onClose }) {
  const [query, setQuery] = useState('');

  const q = query.toLowerCase();
  const results = vehicles.filter(
    (v) =>
      v.id !== excludeId &&
      (v.name.toLowerCase().includes(q) ||
        v.nombre.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[16px] w-full max-w-[480px] mx-4 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header modal */}
        <div className="bg-[#111111] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-white text-[14px] font-semibold">Elegí un vehículo para comparar</p>
            <p className="text-[#888] text-[11px] mt-0.5">Buscá por nombre o categoría</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#666] hover:text-white transition-colors text-[18px] leading-none"
          >
            ✕
          </button>
        </div>

        {/* Buscador */}
        <div className="px-4 py-3 border-b border-[#e2e2e2]">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Toyota, Hilux, SUV..."
            className="w-full px-3 py-2.5 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#0d9488] transition-colors bg-[#fafafa] focus:bg-white placeholder:text-[#ccc]"
          />
        </div>

        {/* Resultados */}
        <div className="max-h-[320px] overflow-y-auto divide-y divide-[#f0f0f0]">
          {results.length === 0 ? (
            <div className="px-5 py-10 text-center text-[13px] text-[#9a9a9a]">
              No se encontraron vehículos
            </div>
          ) : (
            results.map((v) => (
              <button
                key={v.id}
                onClick={() => onSelect(v)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fff5f5] transition-colors text-left"
              >
                {/* Miniatura del vehículo */}
                <div className="w-10 h-10 bg-[#f5f5f5] rounded-[8px] overflow-hidden flex-shrink-0">
                  <VehicleImage src={v.imagenUrl} alt={v.name} iconSize={{ width: 28, height: 18 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1a1a1a] truncate">{v.name}</p>
                  <p className="text-[11px] text-[#9a9a9a] truncate">{v.nombre}</p>
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {v.displayTags.slice(0, 2).map((tag) => {
                    const s = getTagStyle(tag);
                    return (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] rounded-full"
                        style={{ color: s.color, backgroundColor: s.bg }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Fila de la tabla de comparación
function CompareRow({ label, valueA, valueB, highlight, winA, winB }) {
  return (
    <tr className={highlight ? 'bg-[#fafafa]' : 'bg-white'}>
      <td className="px-4 py-3 text-[12px] text-[#9a9a9a] uppercase tracking-wider font-medium border-r border-[#e2e2e2] w-[160px]">
        {label}
      </td>
      <td
        className={`px-4 py-3 text-[13px] border-r border-[#e2e2e2] text-center ${
          winA ? 'text-[#27500a] font-semibold bg-[#f0f9e8]' : 'text-[#1a1a1a]'
        }`}
      >
        {valueA}
      </td>
      <td
        className={`px-4 py-3 text-[13px] text-center ${
          winB ? 'text-[#27500a] font-semibold bg-[#f0f9e8]' : 'text-[#1a1a1a]'
        }`}
      >
        {valueB}
      </td>
    </tr>
  );
}

function formatSpecValue(field, specs) {
  const value = getSpecValue(specs, field.path);
  if (field.type === 'bool') return value ? 'Sí' : 'No';
  if (value === undefined || value === null || value === '') return '—';
  if (field.type === 'number') return `${value}${field.unit}`;
  return value;
}

// Tabla principal de comparación
export function VehicleComparator({ vehicleA, vehicleB, onClose, vehicles, onChangeB, openSearchImmediately }) {
  const [showSearch, setShowSearch] = useState(openSearchImmediately ?? false);
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  // Si no hay vehículo B elegido aún, solo mostramos el modal
  if (!vehicleB) {
    return (
      <VehicleSearchModal
        vehicles={vehicles}
        excludeId={vehicleA.id}
        onSelect={(v) => { onChangeB(v); setShowSearch(false); }}
        onClose={onClose}
      />
    );
  }

  const consumoA = parseConsumo(vehicleA.datosTecnicos);
  const consumoB = parseConsumo(vehicleB.datosTecnicos);
  const potenciaA = parsePotencia(vehicleA.datosTecnicos);
  const potenciaB = parsePotencia(vehicleB.datosTecnicos);

  // Menor consumo gana
  const consumoWinA = consumoA !== null && consumoB !== null && consumoA < consumoB;
  const consumoWinB = consumoA !== null && consumoB !== null && consumoB < consumoA;

  // Mayor potencia gana
  const potWinA = potenciaA !== null && potenciaB !== null && potenciaA > potenciaB;
  const potWinB = potenciaA !== null && potenciaB !== null && potenciaB > potenciaA;

  return (
    <>
      {showSearch && (
        <VehicleSearchModal
          vehicles={vehicles}
          excludeId={vehicleA.id}
          onSelect={(v) => { onChangeB(v); setShowSearch(false); }}
          onClose={() => setShowSearch(false)}
        />
      )}

      <div className="mt-6">
        {/* Header del comparador */}
        <div className="bg-[#111111] rounded-t-[16px] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#0d9488] text-[13px]">⇄</span>
            <span className="text-white text-[14px] font-semibold">Comparación de vehículos</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#666] hover:text-white text-[13px] transition-colors flex items-center gap-1.5"
          >
            <span className="text-[16px] leading-none">✕</span>
            <span>Cerrar</span>
          </button>
        </div>

        {/* Cabeceras de los dos autos */}
        <div className="overflow-x-auto">
        <div className="min-w-[500px]">
        <div className="bg-white border-x border-[#e2e2e2]">
          <div className="grid grid-cols-[160px_1fr_1fr]">
            <div className="bg-[#fafafa] border-r border-[#e2e2e2]" />

            {/* Auto A */}
            <div className="p-5 border-r border-[#e2e2e2]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-[#111111] text-white px-2 py-0.5 rounded-full font-mono">A</span>
                <span className="text-[11px] text-[#9a9a9a] uppercase tracking-wider">Vehículo base</span>
              </div>
              <p className="text-[15px] font-semibold text-[#1a1a1a]">{vehicleA.name}</p>
              <p className="text-[11px] text-[#9a9a9a] mb-2">{vehicleA.nombre}</p>
              <div className="flex flex-wrap gap-1">
                {vehicleA.displayTags.map((tag) => {
                  const s = getTagStyle(tag);
                  return (
                    <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full" style={{ color: s.color, backgroundColor: s.bg }}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Auto B */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-[#0d9488] text-white px-2 py-0.5 rounded-full font-mono">B</span>
                  <span className="text-[11px] text-[#9a9a9a] uppercase tracking-wider">Comparar con</span>
                </div>
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-[11px] text-[#0d9488] hover:underline"
                >
                  Cambiar →
                </button>
              </div>
              <p className="text-[15px] font-semibold text-[#1a1a1a]">{vehicleB.name}</p>
              <p className="text-[11px] text-[#9a9a9a] mb-2">{vehicleB.nombre}</p>
              <div className="flex flex-wrap gap-1">
                {vehicleB.displayTags.map((tag) => {
                  const s = getTagStyle(tag);
                  return (
                    <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full" style={{ color: s.color, backgroundColor: s.bg }}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de comparación (lo esencial, sin saturar) */}
        <div className="border border-[#e2e2e2] rounded-b-[16px] overflow-hidden">
          <table className="w-full min-w-[500px] border-collapse">
            <tbody className="divide-y divide-[#e2e2e2]">

              {/* ── Sección: General ─────────────────────────── */}
              <tr className="bg-[#111111]">
                <td colSpan={3} className="px-4 py-2">
                  <span className="text-[10px] text-[#888] uppercase tracking-[2px] font-medium">
                    General
                  </span>
                </td>
              </tr>

              <CompareRow
                label="Segmento"
                valueA={vehicleA.segmento}
                valueB={vehicleB.segmento}
                highlight
              />
              <CompareRow
                label="Categoría"
                valueA={vehicleA.category}
                valueB={vehicleB.category}
              />

              {/* ── Sección: Datos técnicos ───────────────────── */}
              <tr className="bg-[#111111]">
                <td colSpan={3} className="px-4 py-2">
                  <span className="text-[10px] text-[#888] uppercase tracking-[2px] font-medium">
                    Datos técnicos
                  </span>
                </td>
              </tr>

              {/* Renderizamos fila por cada dato técnico de A, emparejando con B */}
              {vehicleA.datosTecnicos.map((datoA, i) => {
                const label = datoA.split(':')[0].trim();
                const datoB = vehicleB.datosTecnicos[i] ?? '—';

                const isConsumo = label.toLowerCase() === 'consumo';
                const isPotencia = label.toLowerCase() === 'potencia';

                return (
                  <CompareRow
                    key={i}
                    label={label}
                    valueA={datoA.includes(':') ? datoA.split(':').slice(1).join(':').trim() : datoA}
                    valueB={datoB.includes(':') ? datoB.split(':').slice(1).join(':').trim() : datoB}
                    highlight={i % 2 === 0}
                    winA={(isConsumo && consumoWinA) || (isPotencia && potWinA)}
                    winB={(isConsumo && consumoWinB) || (isPotencia && potWinB)}
                  />
                );
              })}

              {/* ── Sección: Ventajas ─────────────────────────── */}
              <tr className="bg-[#111111]">
                <td colSpan={3} className="px-4 py-2">
                  <span className="text-[10px] text-[#888] uppercase tracking-[2px] font-medium">
                    Ventajas
                  </span>
                </td>
              </tr>

              <tr className="bg-white">
                <td className="px-4 py-3 text-[12px] text-[#9a9a9a] uppercase tracking-wider font-medium border-r border-[#e2e2e2] align-top">
                  Destacado
                </td>
                <td className="px-4 py-3 border-r border-[#e2e2e2] align-top">
                  <ul className="flex flex-col gap-1.5">
                    {vehicleA.ventajas.map((v, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#5a5a5a]">
                        <span className="text-[#27500a] mt-0.5 flex-shrink-0">✓</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 align-top">
                  <ul className="flex flex-col gap-1.5">
                    {vehicleB.ventajas.map((v, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#5a5a5a]">
                        <span className="text-[#27500a] mt-0.5 flex-shrink-0">✓</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>

              {/* ── Sección: Desventajas ──────────────────────── */}
              <tr className="bg-[#111111]">
                <td colSpan={3} className="px-4 py-2">
                  <span className="text-[10px] text-[#888] uppercase tracking-[2px] font-medium">
                    Desventajas
                  </span>
                </td>
              </tr>

              <tr className="bg-[#fafafa]">
                <td className="px-4 py-3 text-[12px] text-[#9a9a9a] uppercase tracking-wider font-medium border-r border-[#e2e2e2] align-top">
                  A tener en cuenta
                </td>
                <td className="px-4 py-3 border-r border-[#e2e2e2] align-top">
                  <ul className="flex flex-col gap-1.5">
                    {vehicleA.desventajas.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#5a5a5a]">
                        <span className="text-[#0d9488] mt-0.5 flex-shrink-0">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 align-top">
                  <ul className="flex flex-col gap-1.5">
                    {vehicleB.desventajas.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#5a5a5a]">
                        <span className="text-[#0d9488] mt-0.5 flex-shrink-0">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        </div>
        </div>

        {/* Leyenda ganadores */}
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#f0f9e8] border border-[#b8dda0] inline-block" />
            <span className="text-[11px] text-[#9a9a9a]">
              Verde = mejor valor en esa categoría
            </span>
          </div>
          <button
            onClick={() => setShowFullSpecs((v) => !v)}
            className="text-[12px] text-[#0d9488] font-medium hover:underline flex items-center gap-1"
          >
            {showFullSpecs ? 'Ocultar especificaciones completas' : 'Ver especificaciones completas'}
            <span className={`text-[10px] transition-transform ${showFullSpecs ? 'rotate-180' : ''}`}>▾</span>
          </button>
        </div>

        {/* Comparación avanzada: colapsada por defecto para no abrumar */}
        {showFullSpecs && (
          <div className="mt-3 overflow-x-auto">
            <div className="min-w-[500px] border border-[#e2e2e2] rounded-[16px] overflow-hidden">
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-[#e2e2e2]">
                  {SPEC_SECTIONS.map((section) => (
                    <Fragment key={section.id}>
                      <tr className="bg-[#111111]">
                        <td colSpan={3} className="px-4 py-2">
                          <span className="text-[10px] text-[#888] uppercase tracking-[2px] font-medium">
                            {section.title}
                          </span>
                        </td>
                      </tr>
                      {section.fields.map((field, i) => {
                        const valueA = getSpecValue(vehicleA.specs, field.path);
                        const valueB = getSpecValue(vehicleB.specs, field.path);
                        let winA = false;
                        let winB = false;
                        if (field.type === 'bool') {
                          winA = !!valueA && !valueB;
                          winB = !!valueB && !valueA;
                        } else if (field.type === 'number') {
                          winA = typeof valueA === 'number' && typeof valueB === 'number' && valueA > valueB;
                          winB = typeof valueA === 'number' && typeof valueB === 'number' && valueB > valueA;
                        }
                        return (
                          <CompareRow
                            key={field.path}
                            label={field.label}
                            valueA={formatSpecValue(field, vehicleA.specs)}
                            valueB={formatSpecValue(field, vehicleB.specs)}
                            highlight={i % 2 === 0}
                            winA={winA}
                            winB={winB}
                          />
                        );
                      })}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}