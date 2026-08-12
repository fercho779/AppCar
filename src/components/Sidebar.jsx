export function Sidebar({
  activeLink,
  onVehicleCategoryChange,
  onInfoLinkChange,
  categories = [],
  activeMarca,
  onMarcaChange,
  marcas = [],
}) {
  const sections = [
    {
      category: 'VEHÍCULOS',
      links: ['Todos los vehículos', ...categories],
      onClick: onVehicleCategoryChange,
      isActive: (link) => activeLink === link,
    },
    ...(marcas.length > 0
      ? [
          {
            category: 'MARCA',
            links: ['Todas las marcas', ...marcas],
            onClick: onMarcaChange,
            isActive: (link) => activeMarca === link,
          },
        ]
      : []),
    {
      category: 'INFO ÚTIL',
      links: ['Guía de compra'],
      onClick: onInfoLinkChange,
      isActive: (link) => activeLink === link,
    },
  ];

  return (
    <aside className="flex-shrink-0 md:w-[180px]">

      {/* ── Mobile: filas horizontales scrolleables ── */}
      <div className="flex flex-col gap-2 md:hidden">
        {sections.map((section) => (
          <div key={section.category} className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="flex-shrink-0 px-2.5 py-1 bg-[#111111] text-white text-[10px] uppercase tracking-wider font-semibold rounded-md whitespace-nowrap">
              {section.category}
            </span>
            {section.links.map((link) => {
              const isActive = section.isActive(link);
              return (
                <button
                  key={link}
                  onClick={() => section.onClick?.(link)}
                  className={`flex-shrink-0 px-3 py-1 text-[12px] rounded-full border transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0d9488] text-white border-[#0d9488]'
                      : 'bg-white text-[#1a1a1a] border-[#e2e2e2]'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Desktop: cards verticales ── */}
      <div className="hidden md:flex flex-col gap-5">
        {sections.map((section) => (
          <div
            key={section.category}
            className="bg-white border border-[#e2e2e2] rounded-[10px] overflow-hidden"
          >
            <div className="px-3 py-2 bg-[#111111]">
              <span className="text-white text-[10px] uppercase tracking-wider font-semibold">
                {section.category}
              </span>
            </div>
            <div className="divide-y divide-[#e2e2e2]">
              {section.links.map((link) => {
                const isActive = section.isActive(link);
                return (
                  <a
                    key={link}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      section.onClick?.(link);
                    }}
                    className={`block px-3 py-2.5 text-[13px] transition-colors ${
                      isActive
                        ? 'text-[#0d9488] bg-[#f0fdfa] border-l-[3px] border-l-[#0d9488]'
                        : 'text-[#1a1a1a] hover:bg-[#f8f8f8]'
                    }`}
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
