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
          className="bg-white border border-[#e2e2e2] rounded-[10px] overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-[#efefef]">
            <span className="text-[#b0b0b0] text-[10px] uppercase tracking-wider font-semibold">
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
    </aside>
  );
}