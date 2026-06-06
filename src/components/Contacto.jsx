import { useState } from 'react';

export function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="bg-white border border-[#e2e2e2] rounded-[16px] overflow-hidden">
        <div className="bg-[#1a1a1a] px-6 py-4">
          <h1 className="text-white text-[18px] font-semibold">Contacto</h1>
        </div>
        <div className="p-8 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#eaf3de] flex items-center justify-center text-[22px]">
            ✓
          </div>
          <p className="text-[14px] text-[#1a1a1a] font-semibold">¡Mensaje enviado!</p>
          <p className="text-[13px] text-[#9a9a9a]">Nos pondremos en contacto a la brevedad.</p>
          <button
            onClick={() => { setEnviado(false); setForm({ nombre: '', email: '', mensaje: '' }); }}
            className="mt-2 px-4 py-2 text-[12px] border border-[#e2e2e2] rounded-[10px] text-[#1a1a1a] hover:border-[#cc0000] transition-colors"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e2e2e2] rounded-[16px] overflow-hidden">
      <div className="bg-[#1a1a1a] px-6 py-4">
        <h1 className="text-white text-[18px] font-semibold">Contacto</h1>
      </div>
      <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4 max-w-[520px]">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] text-[#9a9a9a] uppercase tracking-wider">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className="px-3 py-2 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#cc0000] transition-colors placeholder:text-[#ccc]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] text-[#9a9a9a] uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            className="px-3 py-2 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#cc0000] transition-colors placeholder:text-[#ccc]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] text-[#9a9a9a] uppercase tracking-wider">
            Mensaje
          </label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
            rows={5}
            placeholder="¿En qué podemos ayudarte?"
            className="px-3 py-2 text-[13px] border border-[#e2e2e2] rounded-[8px] outline-none focus:border-[#cc0000] transition-colors resize-none placeholder:text-[#ccc]"
          />
        </div>

        <button
          type="submit"
          className="mt-1 px-5 py-2.5 bg-[#cc0000] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#aa0000] transition-colors self-start"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}
