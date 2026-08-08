import { getTagStyle } from './tagStyles';
import { VehicleImage } from './VehicleImage';

const MARCA_GRADIENT = {
  Toyota:     'from-[#dbeafe] to-[#eff6ff]',
  Ford:       'from-[#bae6fd] to-[#f0f9ff]',
  Volkswagen: 'from-[#e0e7ff] to-[#eef2ff]',
  Peugeot:    'from-[#fde68a] to-[#fffbeb]',
  Fiat:       'from-[#fecaca] to-[#fff5f5]',
};

export function VehicleCard({ vehicle, onClick }) {
  const resumen = vehicle.datosTecnicosResumen || {};
  const gradient = MARCA_GRADIENT[vehicle.marca] || 'from-[#ccfbf1] to-[#f0fdfa]';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[14px] overflow-hidden cursor-pointer flex flex-col
        shadow-[0_2px_10px_rgba(0,0,0,0.07)]
        hover:shadow-[0_10px_32px_rgba(13,148,136,0.20)]
        hover:-translate-y-1.5
        transition-all duration-200"
    >
      <div className={`relative h-[132px] bg-gradient-to-br ${gradient}`}>
        <span className="absolute top-2 left-2 z-10 px-2.5 py-0.5 bg-[#0d9488] text-white text-[10px] rounded-full uppercase tracking-wider font-semibold shadow-sm">
          {vehicle.marca}
        </span>
        <VehicleImage src={vehicle.imagenUrl} alt={vehicle.name} />
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="text-[13.5px] font-bold text-[#0f172a] mb-0.5 leading-tight">
          {vehicle.name}
        </h3>
        <div className="text-[11px] text-[#9a9a9a] mb-2.5 leading-tight truncate" title={vehicle.nombre}>
          {vehicle.nombre}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {vehicle.displayTags.map((tag) => {
            const style = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full font-medium"
                style={{ color: style.color, backgroundColor: style.bg }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <div className="mt-auto pt-2.5 border-t border-[#f0f0f0] grid grid-cols-3 gap-1 text-center">
          <div>
            <div className="text-[11px] font-bold text-[#0d9488] font-mono">
              {resumen.potencia || '—'}
            </div>
            <div className="text-[9px] text-[#b0b0b0] uppercase tracking-wide">Potencia</div>
          </div>
          <div className="border-l border-r border-[#f0f0f0]">
            <div className="text-[11px] font-bold text-[#0d9488] font-mono">
              {resumen.consumo || '—'}
            </div>
            <div className="text-[9px] text-[#b0b0b0] uppercase tracking-wide">Consumo</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#0d9488] font-mono">
              {vehicle.specs.plazas ? `${vehicle.specs.plazas}` : '—'}
            </div>
            <div className="text-[9px] text-[#b0b0b0] uppercase tracking-wide">Plazas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
