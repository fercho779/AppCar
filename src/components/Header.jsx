export function Header({ activeNav, onNavChange, onLogoClick }) {
  const navLinks = ['Vehículos', 'Comparador', 'Asesor IA', 'Nosotros', 'Contacto'];

  return (
    <header className="sticky top-0 z-50 w-full h-14 bg-[#111111] px-6 flex items-center justify-between">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        <span className="text-white text-[22px] font-black tracking-tight">App</span>
        <span className="text-[#e63946] text-[22px] font-black tracking-tight">Car</span>
      </button>

      <nav className="flex items-center gap-1">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavChange(link); }}
            className={`px-3 py-1.5 text-[12px] rounded-full transition-colors ${
              activeNav === link
                ? 'text-white bg-white/10 font-medium'
                : 'text-[#999] hover:text-white'
            }`}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}
