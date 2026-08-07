export function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    'Todos',
    'Ciudad',
    'Off-road',
    'Familia',
    'Ruta larga',
    'Trabajo'
  ];

  return (
    <div className="bg-white border border-[#e2e2e2] rounded-[10px] p-3.5">
      <div className="text-[#9a9a9a] text-[11px] uppercase tracking-wider mb-2.5">
        ¿PARA QUÉ LO VAS A USAR?
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-1.5 text-[12px] rounded-[20px] border transition-colors ${
                isActive
                  ? 'bg-[#e63946] text-white border-[#e63946]'
                  : 'bg-[#f5f5f5] text-[#1a1a1a] border-[#e2e2e2] hover:border-[#e63946]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}