import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const SUGERENCIAS = [
  '¿Qué auto me recomiendan para la ciudad?',
  'Busco algo para viajes largos con familia',
  '¿Cuál es mejor para el campo?',
  'Quiero algo económico en combustible',
];

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#0d9488] flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white text-[10px] font-black tracking-tight">AC</span>
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3.5 text-[13.5px] leading-[1.75] shadow-sm ${
          isUser
            ? 'bg-[#0d9488] text-white rounded-[18px] rounded-br-[4px]'
            : 'bg-white border border-[#ebebeb] text-[#1a1a1a] rounded-[18px] rounded-bl-[4px]'
        }`}
      >
        {isUser ? (
          <span>{msg.content}</span>
        ) : (
          <div className="[&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:pl-4 [&_ul]:mb-2 [&_ul_li]:mb-1 [&_ol]:pl-4 [&_ol]:mb-2 [&_strong]:font-semibold [&_h3]:font-semibold [&_h3]:mb-1">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
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
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
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
        { role: 'assistant', content: 'No pude conectarme. Revisa tu conexión e intenta de nuevo.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={onBack}
        className="self-start px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#0d9488] transition-colors"
      >
        ← Volver al catálogo
      </button>

      <div className="bg-[#111111] rounded-[16px] px-8 py-7 flex flex-col gap-2">
        <span className="text-[#0d9488] text-[11px] uppercase tracking-[2px] font-semibold">
          Inteligencia Artificial
        </span>
        <h1 className="text-white text-[22px] font-semibold">Asesor IA</h1>
        <p className="text-[#888] text-[13px] leading-relaxed">
          Contame qué necesitas y te recomiendo el vehículo ideal para ti.
        </p>
      </div>

      <div className="bg-[#f9f9f9] border border-[#e8e8e8] rounded-[20px] overflow-hidden flex flex-col shadow-sm" style={{ height: '540px' }}>

        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0d9488] flex items-center justify-center shadow-lg">
                <span className="text-white text-[26px]">🚗</span>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#111] mb-1">
                  ¡Hola! Soy tu asesor automotriz
                </p>
                <p className="text-[13px] text-[#9a9a9a]">
                  Pregúntame lo que quieras sobre vehículos
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-[420px]">
                {SUGERENCIAS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-4 py-2 text-[12px] bg-white border border-[#e2e2e2] rounded-full text-[#444] hover:border-[#0d9488] hover:text-[#0d9488] transition-colors shadow-sm"
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
            <div className="flex gap-3 items-end">
              <div className="w-8 h-8 rounded-full bg-[#0d9488] flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white text-[10px] font-black">AC</span>
              </div>
              <div className="bg-white border border-[#ebebeb] rounded-[18px] rounded-bl-[4px] px-5 py-4 flex gap-1.5 items-center shadow-sm">
                <span className="w-2 h-2 bg-[#d0d0d0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#d0d0d0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#d0d0d0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-[#e8e8e8] bg-white px-4 py-3.5 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Escribe tu consulta..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-[13px] bg-[#f5f5f5] border border-[#e8e8e8] rounded-full outline-none focus:border-[#0d9488] focus:bg-white disabled:opacity-50 transition-all"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-10 h-10 bg-[#0d9488] text-white rounded-full flex items-center justify-center hover:bg-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
