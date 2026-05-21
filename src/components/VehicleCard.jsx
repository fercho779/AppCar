const tagStyles = {
  Ciudad: { color: '#0c447c', bg: '#e6f1fb' },
  'Off-road': { color: '#27500a', bg: '#eaf3de' },
  Familia: { color: '#3c3489', bg: '#eeedfe' },
  Ruta: { color: '#633806', bg: '#faeeda' },
  Trabajo: { color: '#444441', bg: '#f1efe8' }
};

export function VehicleCard({ vehicle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#e2e2e2] rounded-[10px] overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:border-[#cc0000] transition-all"
    >
      <div className="h-[120px] bg-[#f8f8f8] flex items-center justify-center">
        <svg
          width="100"
          height="60"
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
      <div className="p-3">
        <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-0.5">
          {vehicle.name}
        </h3>
        <div className="text-[11px] text-[#9a9a9a] mb-2 font-mono">
          {vehicle.subtitle}
        </div>
        <div className="flex flex-wrap gap-1 mb-2.5">
          {vehicle.tags.map((tag) => {
            const style = tagStyles[tag] || { color: '#444441', bg: '#f1efe8' };
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
        <div>
          <div className="text-[10px] text-[#9a9a9a] mb-1">Adecuación</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-[#e2e2e2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#cc0000] rounded-full"
                style={{ width: `${vehicle.fit}%` }}
              />
            </div>
            <span className="text-[11px] text-[#1a1a1a] font-mono">
              {vehicle.fit}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
