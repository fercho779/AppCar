export function FilterBar({ activeFilter, onFilterChange }) {
  const filters = ['Todos', 'Ciudad', 'Off-road', 'Familia', 'Ruta larga', 'Trabajo'];

  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#0d3330] rounded-[14px] px-5 py-4">
      <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-semibold">
        Filtrar por uso
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-1.5 text-[12px] rounded-full font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#0d9488] text-white shadow-[0_0_14px_rgba(13,148,136,0.45)]'
                  : 'bg-white/10 text-white/65 hover:bg-white/20 hover:text-white'
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
