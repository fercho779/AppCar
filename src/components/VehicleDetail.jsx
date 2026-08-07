import { useState } from 'react';
import { getTagStyle } from './tagStyles';
import { VehicleImage } from './VehicleImage';
import { SPEC_SECTIONS, getSpecValue } from '../data/specSections';

function SpecValue({ field, specs }) {
  const value = getSpecValue(specs, field.path);

  if (field.type === 'bool') {
    return value ? (
      <span className="inline-flex items-center gap-1 text-[12px] text-[#27500a] font-medium">
        <span aria-hidden>✓</span> Sí
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-[12px] text-[#b0b0b0]">
        <span aria-hidden>–</span> No
      </span>
    );
  }

  if (value === undefined || value === null || value === '') {
    return <span className="text-[12px] text-[#c8c8c8]">—</span>;
  }

  if (field.type === 'number') {
    return <span className="text-[12px] text-[#1a1a1a] font-mono">{value}{field.unit}</span>;
  }

  return <span className="text-[12px] text-[#1a1a1a]">{value}</span>;
}

export function VehicleDetail({ vehicle, onBack, onCompare }) {
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const resumen = vehicle.datosTecnicosResumen || {};

  const resumenItems = [
    resumen.motor && `Motor: ${resumen.motor}`,
    resumen.potencia && `Potencia: ${resumen.potencia}`,
    resumen.traccion && `Tracción: ${resumen.traccion}`,
    resumen.consumo && `Consumo: ${resumen.consumo}`,
  ].filter(Boolean);

  return (
    <div>
      {/* Barra de acciones superior */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#0d9488] transition-colors"
        >
          ← Volver al catálogo
        </button>

        <button
          onClick={onCompare}
          className="flex items-center gap-2 px-5 py-2 bg-[#0d9488] text-white text-[13px] font-medium rounded-[10px] hover:bg-[#0f766e] transition-colors"
        >
          <span className="text-[15px] leading-none">⇄</span>
          Comparar vehículo
        </button>
      </div>

      <div className="bg-white border border-[#e2e2e2] rounded-[16px] overflow-hidden">
        <div className="flex flex-col md:flex-row gap-0">
          <div className="md:w-[260px] h-[200px] md:h-auto bg-[#f8f8f8] relative">
            <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-[#111111] text-white text-[10px] rounded-full uppercase tracking-wider">
              {vehicle.marca}
            </span>
            <VehicleImage
              src={vehicle.imagenUrl}
              alt={vehicle.name}
              iconSize={{ width: 180, height: 120 }}
            />
          </div>
          <div className="flex-1 p-6">
            <h1 className="text-[20px] font-semibold text-[#1a1a1a] mb-1">
              {vehicle.name}
            </h1>
            <div className="text-[12px] text-[#9a9a9a] mb-4">
              <span className="font-mono">{vehicle.nombre}</span>
              <span className="mx-1.5">·</span>
              <span>{vehicle.segmento}</span>
            </div>
            <p className="text-[13px] text-[#5a5a5a] leading-relaxed mb-4">
              {vehicle.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {vehicle.displayTags.map((tag) => {
                const style = getTagStyle(tag);
                return (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] rounded-full"
                    style={{ color: style.color, backgroundColor: style.bg }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#e2e2e2]">
          <div className="p-6 border-r border-[#e2e2e2]">
            <h3 className="text-[14px] font-semibold text-[#27500a] mb-3">
              Ventajas
            </h3>
            <ul className="space-y-2">
              {vehicle.ventajas.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-[#5a5a5a]">
                  <span className="text-[#27500a] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 border-r border-[#e2e2e2]">
            <h3 className="text-[14px] font-semibold text-[#0d9488] mb-3">
              Desventajas
            </h3>
            <ul className="space-y-2">
              {vehicle.desventajas.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-[#5a5a5a]">
                  <span className="text-[#0d9488] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-[#0c447c] mb-3">
              Datos técnicos
            </h3>
            <ul className="space-y-2">
              {resumenItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-[#5a5a5a]">
                  <span className="text-[#0c447c] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ficha técnica completa: colapsada por defecto para no saturar */}
        <div className="border-t border-[#e2e2e2]">
          <button
            onClick={() => setShowFullSpecs((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-[13px] font-medium text-[#1a1a1a] hover:bg-[#fafafa] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-[#0d9488]">☰</span>
              Ver ficha técnica completa
            </span>
            <span className={`text-[11px] text-[#9a9a9a] transition-transform ${showFullSpecs ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>

          {showFullSpecs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
              {SPEC_SECTIONS.map((section) => (
                <div key={section.id} className="border border-[#e2e2e2] rounded-[10px] overflow-hidden">
                  <div className="bg-[#111111] px-4 py-2">
                    <span className="text-[10px] text-[#888] uppercase tracking-[2px] font-medium">
                      {section.title}
                    </span>
                  </div>
                  <ul className="divide-y divide-[#f0f0f0]">
                    {section.fields.map((field) => (
                      <li key={field.path} className="flex items-center justify-between px-4 py-2">
                        <span className="text-[12px] text-[#9a9a9a]">{field.label}</span>
                        <SpecValue field={field} specs={vehicle.specs} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}