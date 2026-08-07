export function Header({ activeNav, onNavChange }) {
  const navLinks = ['Vehículos', 'Comparador', 'Asesor IA', 'Nosotros', 'Contacto'];

  return (
    <header className="sticky top-0 z-50 w-full h-14 bg-[#111111] border-b border-white/[0.06] px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#e63946] rounded-[8px] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[11px] font-black tracking-tight">AC</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white text-[16px] font-bold tracking-tight">AppCar</span>
          <span className="text-[#666] text-[9px] uppercase tracking-[1.5px]">Asesor automotriz</span>
        </div>
      </div>

      <nav className="flex items-center gap-1">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavChange(link); }}
            className={`px-3 py-1.5 text-[12px] rounded-full transition-colors ${
              activeNav === link
                ? 'text-white bg-white/[0.10] font-medium'
                : 'text-[#aaa] hover:text-white'
            } ${link === 'Asesor IA' && activeNav !== link ? 'text-[#e63946] hover:text-[#ff6b7a]' : ''}`}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}
