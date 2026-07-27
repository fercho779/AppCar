import { getTagStyle } from './tagStyles';
import { VehicleImage } from './VehicleImage';

export function VehicleCard({ vehicle, onClick }) {
  const resumen = vehicle.datosTecnicosResumen || {};

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#e2e2e2] rounded-[10px] overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:border-[#cc0000] transition-all flex flex-col"
    >
      <div className="relative h-[120px] bg-[#f8f8f8]">
        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[#1a1a1a] text-white text-[10px] rounded-full uppercase tracking-wider">
          {vehicle.marca}
        </span>
        <VehicleImage src={vehicle.imagenUrl} alt={vehicle.name} />
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-0.5 leading-tight">
          {vehicle.name}
        </h3>
        <div className="text-[11px] text-[#9a9a9a] mb-2 leading-tight truncate" title={vehicle.nombre}>
          {vehicle.nombre}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {vehicle.displayTags.map((tag) => {
            const style = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full"
                style={{ color: style.color, backgroundColor: style.bg }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Ficha rápida: solo lo esencial, para decidir de un vistazo */}
        <div className="mt-auto pt-2 border-t border-[#f0f0f0] grid grid-cols-3 gap-1 text-center">
          <div>
            <div className="text-[11px] font-semibold text-[#1a1a1a] font-mono">
              {resumen.potencia || '—'}
            </div>
            <div className="text-[9px] text-[#9a9a9a] uppercase tracking-wide">Potencia</div>
          </div>
          <div className="border-l border-r border-[#f0f0f0]">
            <div className="text-[11px] font-semibold text-[#1a1a1a] font-mono">
              {resumen.consumo || '—'}
            </div>
            <div className="text-[9px] text-[#9a9a9a] uppercase tracking-wide">Consumo</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#1a1a1a] font-mono">
              {vehicle.specs.plazas ? `${vehicle.specs.plazas}` : '—'}
            </div>
            <div className="text-[9px] text-[#9a9a9a] uppercase tracking-wide">Plazas</div>
          </div>
        </div>
      </div>
    </div>
  );
}