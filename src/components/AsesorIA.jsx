import { useState, useRef, useEffect } from 'react';

const SUGERENCIAS = [
  '¿Qué auto me recomendás para la ciudad?',
  'Busco algo para viajes largos con familia',
  '¿Cuál es mejor para el campo?',
  'Quiero algo económico en combustible',
];

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-[11px] font-bold">IA</span>
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-[14px] text-[13px] leading-relaxed ${
          isUser
            ? 'bg-[#cc0000] text-white rounded-tr-[4px]'
            : 'bg-white border border-[#e2e2e2] text-[#1a1a1a] rounded-tl-[4px]'
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export function AsesorIA({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || data.error },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'No pude conectarme. Revisá tu conexión e intentá de nuevo.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">

      <button
        onClick={onBack}
        className="self-start px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#cc0000] transition-colors"
      >
        ← Volver al catálogo
      </button>

      {/* Hero */}
      <div className="bg-[#1a1a1a] rounded-[16px] px-8 py-7 flex flex-col gap-2">
        <span className="text-[#cc0000] text-[11px] uppercase tracking-[2px] font-medium">
          Inteligencia Artificial
        </span>
        <h1 className="text-white text-[22px] font-semibold">Asesor IA</h1>
        <p className="text-[#888] text-[13px] leading-relaxed">
          Contame qué necesitás y te recomiendo el vehículo ideal para vos.
        </p>
      </div>

      {/* Chat */}
      <div className="bg-white border border-[#e2e2e2] rounded-[16px] overflow-hidden flex flex-col" style={{ height: '520px' }}>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <div className="w-14 h-14 rounded-full bg-[#fff0f0] flex items-center justify-center">
                <span className="text-[#cc0000] text-[24px]">🤖</span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#1a1a1a] mb-1">
                  ¡Hola! Soy tu asesor automotriz
                </p>
                <p className="text-[12px] text-[#9a9a9a]">
                  Preguntame lo que quieras sobre vehículos
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGERENCIAS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-3 py-1.5 text-[12px] bg-[#f5f5f5] border border-[#e2e2e2] rounded-full text-[#1a1a1a] hover:border-[#cc0000] hover:text-[#cc0000] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[11px] font-bold">IA</span>
              </div>
              <div className="bg-white border border-[#e2e2e2] rounded-[14px] rounded-tl-[4px] px-4 py-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-[#9a9a9a] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#9a9a9a] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#9a9a9a] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#e2e2e2] p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Escribí tu consulta..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-[13px] bg-[#f5f5f5] border border-[#e2e2e2] rounded-[10px] outline-none focus:border-[#cc0000] disabled:opacity-50 transition-colors"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 bg-[#cc0000] text-white text-[13px] font-medium rounded-[10px] hover:bg-[#aa0000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
