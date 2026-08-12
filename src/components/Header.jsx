import { useState } from 'react';

export function Header({ activeNav, onNavChange, onLogoClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['Vehículos', 'Comparador', 'Asesor IA', 'Nosotros', 'Contacto'];

  function handleNav(link) {
    onNavChange(link);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111111]">
      <div className="h-14 px-6 flex items-center justify-between">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <span className="text-white text-[22px] font-black tracking-tight">App</span>
          <span className="text-white text-[22px] font-black tracking-tight">Car</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* Mobile: hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`block w-5 h-[2px] bg-white rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-white rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-white rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNav(link); }}
              className={`flex items-center px-3 py-3 text-[15px] rounded-lg transition-colors ${
                activeNav === link
                  ? 'text-white bg-white/10 font-medium'
                  : 'text-[#aaa] hover:text-white hover:bg-white/5'
              }`}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
