export function Sidebar({ activeLink }) {
  const sections = [
    {
      category: 'VEHÍCULOS',
      links: [
        'Todos los vehículos',
        'Compactos',
        'Sedanes',
        '4x4 / SUV',
        'Camionetas',
        'Motos'
      ]
    },
    {
      category: 'INFO ÚTIL',
      links: [
        'Guía de compra',
        'Mantenimiento',
        'Financiación',
        'Seguro',
        'Transferencias'
      ]
    }
  ];

  return (
    <aside className="w-[180px] flex-shrink-0 flex flex-col gap-5">
      {sections.map((section) => (
        <div
          key={section.category}
          className="bg-white border border-[#e2e2e2] rounded-[10px] overflow-hidden"
        >
          <div className="bg-[#1a1a1a] px-3 py-2">
            <span className="text-[#888] text-[10px] uppercase tracking-wider">
              {section.category}
            </span>
          </div>
          <div className="divide-y divide-[#e2e2e2]">
            {section.links.map((link) => {
              const isActive = activeLink === link;
              return (
                <a
                  key={link}
                  href="#"
                  className={`block px-3 py-2.5 text-[13px] transition-colors ${
                    isActive
                      ? 'text-[#cc0000] bg-[#fff0f0] border-l-[3px] border-l-[#cc0000]'
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
