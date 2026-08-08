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
    <aside className="w-[180px] flex-shrink-0 flex flex-col gap-5">
      {sections.map((section) => (
        <div
          key={section.category}
          className="bg-[#111111] rounded-[10px] overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-white/10">
            <span className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">
              {section.category}
            </span>
          </div>
          <div className="divide-y divide-white/10">
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
                      ? 'text-[#0d9488] bg-white/5 border-l-[3px] border-l-[#0d9488]'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link}
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}