export function Header({ activeNav, onNavChange }) {
  const navLinks = [
    'Vehículos',
    'Comparador',
    'Asesor IA',
    'Nosotros',
    'Contacto'
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-14 bg-[#1a1a1a] px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <span className="text-white text-[20px] font-semibold">App</span>
          <span className="text-[#cc0000] text-[20px] font-semibold">Car</span>
        </div>
        <span className="text-[#888] text-[10px] uppercase tracking-[1.5px] ml-2">
          Asesor automotriz
        </span>
      </div>
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavChange(link); }}
            className={`px-3 py-1.5 text-[12px] rounded-full transition-colors ${
              activeNav === link
                ? 'text-white bg-white/[0.07]'
                : 'text-[#aaa] hover:text-white'
            }`}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}
