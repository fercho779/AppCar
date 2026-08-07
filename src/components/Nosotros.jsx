const features = [
  {
    icon: '🔍',
    title: 'Asesoramiento imparcial',
    desc: 'No vendemos autos. Nuestra única prioridad es darte información honesta y sin conflictos de interés para que tomes la mejor decisión.',
  },
  {
    icon: '📊',
    title: 'Comparación técnica',
    desc: 'Analizamos cada modelo con datos reales: consumo, mantenimiento, reventa, seguridad y adecuación a tu estilo de vida.',
  },
  {
    icon: '🛡️',
    title: 'Guía de compra segura',
    desc: 'Te acompañamos en cada etapa del proceso: desde la elección del vehículo hasta la verificación documental y la transferencia.',
  },
];

const stats = [
  { value: '200+', label: 'Modelos analizados' },
  { value: '6', label: 'Categorías de vehículos' },
  { value: '100%', label: 'Contenido independiente' },
];

export function Nosotros({ onBack }) {
  return (
    <div className="flex flex-col gap-5">

      <button
        onClick={onBack}
        className="self-start px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#e63946] transition-colors"
      >
        ← Volver al catálogo
      </button>

      {/* Hero banner */}
      <div className="bg-[#111111] rounded-[16px] px-8 py-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-white text-[26px] font-semibold">App</span>
          <span className="text-[#e63946] text-[26px] font-semibold">Car</span>
          <span className="text-[#555] text-[11px] uppercase tracking-[2px] ml-1 mt-1">
            Asesor automotriz
          </span>
        </div>
        <p className="text-[#aaa] text-[14px] leading-relaxed max-w-[600px]">
          Una plataforma independiente para ayudarte a elegir el vehículo que mejor
          se adapta a tu vida, con información técnica, comparativas honestas y guías
          prácticas de compra.
        </p>
        {/* Stats row */}
        <div className="flex gap-6 mt-2 pt-4 border-t border-[#2a2a2a]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-[#e63946] text-[20px] font-semibold">{s.value}</span>
              <span className="text-[#666] text-[11px]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quiénes somos */}
      <div className="bg-white border border-[#e2e2e2] rounded-[12px] overflow-hidden">
        <div className="border-b border-[#e2e2e2] px-6 py-3.5">
          <h2 className="text-[14px] font-semibold text-[#1a1a1a]">¿Quiénes somos?</h2>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4 text-[13px] text-[#5a5a5a] leading-relaxed">
          <p>
            AppCar nació de una necesidad concreta: el mercado automotor argentino es complejo,
            con una enorme variedad de modelos, versiones y precios que pueden abrumar a cualquier
            comprador. Muchos terminan eligiendo un vehículo que no se adapta a sus necesidades
            reales, influenciados por la publicidad o por consejos de vendedores con intereses propios.
          </p>
          <p>
            Somos un equipo de apasionados del mundo automotriz y la tecnología que decidimos
            construir una herramienta diferente: un asesor digital que no vende, sino que
            <strong className="text-[#1a1a1a]"> informa</strong>. Cada análisis que publicamos está
            basado en datos técnicos verificados, opiniones reales de propietarios y experiencia
            de manejo en diversas condiciones.
          </p>
          <p>
            Creemos que una buena decisión de compra empieza por conocer tu propio perfil de
            conductor: ¿cuántos kilómetros hacés por mes? ¿Usás el auto en ciudad, en ruta o
            en caminos de tierra? ¿Cuántas personas viajan habitualmente? ¿Cuánto podés destinar
            al mantenimiento anual? Estas preguntas, que pocas veces se hacen en una concesionaria,
            son el corazón de nuestro asesoramiento.
          </p>
        </div>
      </div>

      {/* Nuestra misión */}
      <div
        className="rounded-[12px] px-6 py-5 border-l-4 border-[#e63946] bg-white border border-[#e2e2e2]"
      >
        <h2 className="text-[13px] font-semibold text-[#e63946] uppercase tracking-wider mb-2">
          Nuestra misión
        </h2>
        <p className="text-[13px] text-[#5a5a5a] leading-relaxed">
          Democratizar el acceso a información automotriz de calidad. Queremos que cualquier
          persona, independientemente de su experiencia con los autos, pueda llegar a una compra
          segura, informada y alineada con su presupuesto y estilo de vida.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-[#e2e2e2] rounded-[12px] px-5 py-5 flex flex-col gap-2.5"
          >
            <span className="text-[26px]">{f.icon}</span>
            <h3 className="text-[13px] font-semibold text-[#1a1a1a]">{f.title}</h3>
            <p className="text-[12.5px] text-[#5a5a5a] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Cómo trabajamos */}
      <div className="bg-white border border-[#e2e2e2] rounded-[12px] overflow-hidden">
        <div className="border-b border-[#e2e2e2] px-6 py-3.5">
          <h2 className="text-[14px] font-semibold text-[#1a1a1a]">¿Cómo trabajamos?</h2>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4 text-[13px] text-[#5a5a5a] leading-relaxed">
          <p>
            Cada vehículo que aparece en AppCar pasa por un proceso de análisis estructurado.
            Relevamos ficha técnica oficial, consumo real en ciudad y ruta, historial de
            confiabilidad según estadísticas de talleres, costo promedio de mantenimiento por
            kilómetro y valor de reventa proyectado a 3 y 5 años.
          </p>
          <p>
            Nuestro sistema de <strong className="text-[#1a1a1a]">adecuación porcentual</strong> cruza
            las características del vehículo con el perfil de uso del usuario. No existe el
            "mejor auto" en abstracto: existe el mejor auto <em>para vos</em>, y ese es nuestro
            trabajo encontrarlo.
          </p>
          <p>
            Actualizamos el catálogo periódicamente para reflejar cambios de precio, nuevas
            versiones y variaciones en el mercado de usados. Si encontrás información desactualizada
            o querés sugerirnos un modelo, podés escribirnos desde la sección Contacto.
          </p>
        </div>
      </div>

    </div>
  );
}
