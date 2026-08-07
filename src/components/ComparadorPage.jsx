import { useState } from 'react';
import { VehicleCard } from './VehicleCard';
import { VehicleComparator } from './VehicleComparator';

export function ComparadorPage({ vehicles, onBack }) {
  const [vehicleA, setVehicleA] = useState(null);
  const [vehicleB, setVehicleB] = useState(null);

  // ── Paso 1: elegir vehículo A ──────────────────────────────────────────────
  if (!vehicleA) {
    return (
      <div className="flex flex-col gap-5">

        <button
          onClick={onBack}
          className="self-start px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#0d9488] transition-colors"
        >
          ← Volver al catálogo
        </button>

        {/* Hero */}
        <div className="bg-[#111111] rounded-[16px] px-8 py-7 flex flex-col gap-2">
          <span className="text-[#0d9488] text-[11px] uppercase tracking-[2px] font-medium">
            Comparador
          </span>
          <h1 className="text-white text-[22px] font-semibold">
            Elegí el vehículo base
          </h1>
          <p className="text-[#888] text-[13px] leading-relaxed">
            Seleccioná el primer vehículo y después elegís con cuál compararlo.
          </p>
        </div>

        {/* Grid de vehículos */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          {vehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onClick={() => { setVehicleA(v); setVehicleB(null); }}
            />
          ))}
        </div>

      </div>
    );
  }

  // ── Pasos 2 y 3: comparador (VehicleComparator maneja el modal de B) ────────
  return (
    <div className="flex flex-col gap-0">

      {/* Botonera superior */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#0d9488] transition-colors"
        >
          ← Volver al catálogo
        </button>
        <button
          onClick={() => { setVehicleA(null); setVehicleB(null); }}
          className="px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#0d9488] transition-colors"
        >
          ↺ Cambiar vehículo base
        </button>
      </div>

      {/* Barra del vehículo A */}
      <div className="bg-[#111111] rounded-[16px] px-6 py-4 flex items-center gap-3 mb-0">
        <span className="text-[#0d9488] text-[13px]">⇄</span>
        <div>
          <span className="text-[#888] text-[10px] uppercase tracking-wider block">
            Vehículo base seleccionado
          </span>
          <span className="text-white text-[14px] font-semibold">
            {vehicleA.name}
          </span>
        </div>
      </div>

      {/* Comparador: maneja modal de búsqueda de B internamente */}
      <VehicleComparator
        vehicleA={vehicleA}
        vehicleB={vehicleB}
        vehicles={vehicles}
        onClose={() => { setVehicleA(null); setVehicleB(null); }}
        onChangeB={(v) => setVehicleB(v)}
      />

    </div>
  );
}