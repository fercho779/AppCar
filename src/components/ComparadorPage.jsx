import { useState } from 'react';
import { VehicleCard } from './VehicleCard';
import { VehicleComparator } from './VehicleComparator';

export function ComparadorPage({ vehicles }) {
  const [vehicleA, setVehicleA] = useState(null);
  const [vehicleB, setVehicleB] = useState(null);

  // ── Paso 1: elegir vehículo A ──────────────────────────────────────────────
  if (!vehicleA) {
    return (
      <div className="flex flex-col gap-5">

        {/* Hero */}
        <div className="bg-[#1a1a1a] rounded-[16px] px-8 py-7 flex flex-col gap-2">
          <span className="text-[#cc0000] text-[11px] uppercase tracking-[2px] font-medium">
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

      {/* Barra superior con vehículo seleccionado y opción de cambiar */}
      <div className="bg-[#1a1a1a] rounded-[16px] px-6 py-4 flex items-center justify-between mb-0">
        <div className="flex items-center gap-3">
          <span className="text-[#cc0000] text-[13px]">⇄</span>
          <div>
            <span className="text-[#888] text-[10px] uppercase tracking-wider block">
              Vehículo base seleccionado
            </span>
            <span className="text-white text-[14px] font-semibold">
              {vehicleA.name}
            </span>
          </div>
        </div>
        <button
          onClick={() => { setVehicleA(null); setVehicleB(null); }}
          className="text-[#666] hover:text-white text-[12px] transition-colors"
        >
          ← Cambiar vehículo base
        </button>
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
