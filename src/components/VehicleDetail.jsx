import { useState } from 'react';

const tagStyles = {
  Ciudad: { color: '#0c447c', bg: '#e6f1fb' },
  'Off-road': { color: '#27500a', bg: '#eaf3de' },
  Familia: { color: '#3c3489', bg: '#eeedfe' },
  Ruta: { color: '#633806', bg: '#faeeda' },
  Trabajo: { color: '#444441', bg: '#f1efe8' }
};

export function VehicleDetail({ vehicle, onBack, onCompare }) {
  return (
    <div>
      {/* Barra de acciones superior */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#cc0000] transition-colors"
        >
          ← Volver al catálogo
        </button>

        <button
          onClick={onCompare}
          className="flex items-center gap-2 px-5 py-2 bg-[#cc0000] text-white text-[13px] font-medium rounded-[10px] hover:bg-[#aa0000] transition-colors"
        >
          <span className="text-[15px] leading-none">⇄</span>
          Comparar vehículo
        </button>
      </div>

      <div className="bg-white border border-[#e2e2e2] rounded-[16px] overflow-hidden">
        <div className="flex flex-col md:flex-row gap-0">
          <div className="md:w-[260px] bg-[#f8f8f8] flex items-center justify-center p-8">
            <svg
              width="180"
              height="120"
              viewBox="0 0 100 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 35h70M20 35c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5zm60 0c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5zM25 35V25l10-5h20l15 10v5M30 20h25"
                stroke="#d0d0d0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 p-6">
            <h1 className="text-[20px] font-semibold text-[#1a1a1a] mb-1">
              {vehicle.name}
            </h1>
            <div className="text-[12px] text-[#9a9a9a] mb-4 font-mono">
              {vehicle.subtitle}
            </div>
            <p className="text-[13px] text-[#5a5a5a] leading-relaxed mb-4">
              {vehicle.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {vehicle.tags.map((tag) => {
                const style = tagStyles[tag] || { color: '#444441', bg: '#f1efe8' };
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
            <h3 className="text-[14px] font-semibold text-[#cc0000] mb-3">
              Desventajas
            </h3>
            <ul className="space-y-2">
              {vehicle.desventajas.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-[#5a5a5a]">
                  <span className="text-[#cc0000] mt-1">•</span>
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
              {vehicle.datosTecnicos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-[#5a5a5a]">
                  <span className="text-[#0c447c] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
