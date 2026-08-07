import { useState } from 'react';

const contactInfo = [
  { icon: '✉', label: 'Email', value: 'hola@appcar.com.ar' },
  { icon: '📞', label: 'Teléfono', value: '+54 11 4000-0000' },
  { icon: '📍', label: 'Ubicación', value: 'Buenos Aires, Argentina' },
];

const motivos = [
  'Consulta sobre un vehículo',
  'Sugerir un modelo para el catálogo',
  'Reportar información incorrecta',
  'Prensa / colaboraciones',
  'Otro',
];

export function Contacto({ onBack }) {
  const [form, setForm] = useState({ nombre: '', email: '', motivo: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <div className="flex flex-col gap-5">

      <button
        onClick={onBack}
        className="self-start px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#0d9488] transition-colors"
      >
        ← Volver al catálogo
      </button>

      {/* Header banner */}
      <div className="bg-[#111111] rounded-[16px] px-8 py-6 flex flex-col gap-2">
        <span className="text-[#0d9488] text-[11px] uppercase tracking-[2px] font-medium">
          Contacto
        </span>
        <h1 className="text-white text-[22px] font-semibold">
          ¿Tenés alguna consulta?
        </h1>
        <p className="text-[#888] text-[13px] leading-relaxed max-w-[520px]">
          Escribinos y te respondemos a la brevedad. También podés sugerir vehículos,
          reportar errores o proponer colaboraciones.
        </p>
      </div>

      {/* Dos columnas: info + form */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Panel izquierdo: info de contacto */}
        <div className="md:w-[220px] flex-shrink-0 flex flex-col gap-3">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="bg-white border border-[#e2e2e2] rounded-[12px] px-4 py-4 flex items-start gap-3"
            >
              <span className="text-[20px] leading-none mt-0.5">{item.icon}</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-[13px] text-[#1a1a1a] font-medium">
                  {item.value}
                </span>
              </div>
            </div>
          ))}

          <div className="bg-[#f0fdfa] border border-[#f5c6c6] rounded-[12px] px-4 py-4">
            <p className="text-[12px] text-[#7a0c0c] leading-relaxed">
              Tiempo de respuesta habitual: <strong>24–48 hs</strong> en días hábiles.
            </p>
          </div>
        </div>

        {/* Panel derecho: formulario o confirmación */}
        <div className="flex-1 bg-white border border-[#e2e2e2] rounded-[12px] overflow-hidden">
          {enviado ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center h-full">
              <div className="w-14 h-14 rounded-full bg-[#eaf3de] border-2 border-[#b8dda0] flex items-center justify-center text-[22px]">
                ✓
              </div>
              <div>
                <p className="text-[16px] font-semibold text-[#1a1a1a] mb-1">
                  ¡Mensaje enviado!
                </p>
                <p className="text-[13px] text-[#9a9a9a]">
                  Recibimos tu consulta y te responderemos a <strong>{form.email}</strong> a la brevedad.
                </p>
              </div>
              <button
                onClick={() => { setEnviado(false); setForm({ nombre: '', email: '', motivo: '', mensaje: '' }); }}
                className="mt-1 px-5 py-2 text-[12px] border border-[#e2e2e2] rounded-[8px] text-[#1a1a1a] hover:border-[#0d9488] transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">

              {/* Nombre + Email */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                    className="px-3 py-2.5 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#0d9488] transition-colors placeholder:text-[#d0d0d0] bg-[#fafafa] focus:bg-white"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="px-3 py-2.5 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#0d9488] transition-colors placeholder:text-[#d0d0d0] bg-[#fafafa] focus:bg-white"
                  />
                </div>
              </div>

              {/* Motivo */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">
                  Motivo de contacto
                </label>
                <select
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  className="px-3 py-2.5 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#0d9488] transition-colors bg-[#fafafa] focus:bg-white text-[#5a5a5a]"
                >
                  <option value="">Seleccioná un motivo...</option>
                  {motivos.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Contanos tu consulta con el mayor detalle posible..."
                  className="px-3 py-2.5 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#0d9488] transition-colors resize-none placeholder:text-[#d0d0d0] bg-[#fafafa] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#bbb]">* Campos obligatorios</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0d9488] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#0f766e] transition-colors"
                >
                  Enviar mensaje →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
