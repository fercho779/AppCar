import { useState } from 'react';

export function Landing({ onEnter }) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-[#080c10]">
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/85" />

      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#e11d48] rounded-[8px] flex items-center justify-center">
            <span className="text-white text-[11px] font-black tracking-tight">AC</span>
          </div>
          <span className="text-white text-[17px] font-bold tracking-tight">AppCar</span>
        </div>
        <button
          onClick={() => onEnter('vehicles')}
          className="px-5 py-2 bg-white/10 border border-white/25 text-white text-[13px] font-medium rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          Ver catálogo →
        </button>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <span className="text-white/50 text-[11px] uppercase tracking-[3px] font-semibold mb-5">
          Asesor automotriz con inteligencia artificial
        </span>

        <h1 className="text-white text-[48px] md:text-[62px] font-bold leading-[1.1] mb-6 max-w-[680px]">
          Tu próximo auto,<br />
          <span className="text-white">inteligentemente</span> elegido
        </h1>

        <p className="text-white/65 text-[16px] leading-relaxed mb-10 max-w-[480px]">
          Comparamos modelos, analizamos tus necesidades y te recomendamos el vehículo ideal. Sin vendedores, sin presión.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => onEnter('vehicles')}
            className="px-8 py-3.5 bg-[#e11d48] text-white text-[15px] font-semibold rounded-full hover:bg-[#be123c] transition-colors shadow-lg shadow-red-900/40"
          >
            Ver catálogo
          </button>
          <button
            onClick={() => onEnter('asesor')}
            className="px-8 py-3.5 bg-white text-[#0f172a] text-[15px] font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg"
          >
            Hablar con IA ✦
          </button>
        </div>

        <div className="flex gap-14 mt-16 text-center">
          {[['20+', 'Modelos'], ['5', 'Marcas'], ['100%', 'Independiente']].map(([num, label]) => (
            <div key={label}>
              <div className="text-[#e11d48] text-[30px] font-bold leading-none">{num}</div>
              <div className="text-white/45 text-[11px] uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QR — esquina inferior derecha, solo desktop/TV */}
      <div className="absolute bottom-7 right-8 z-20 hidden md:flex flex-col items-center gap-2">
        <div className="bg-white p-3 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <img src="/qr-code.png" alt="QR AppCar" className="w-[148px] h-[148px] block" />
        </div>
        <div className="text-center">
          <p className="text-white text-[13px] font-semibold leading-tight">Escaneá el código</p>
          <p className="text-white/55 text-[11px]">y visitá AppCar</p>
        </div>
      </div>
    </div>
  );
}
