import { useEffect, useRef, useState, type ReactNode } from "react";
import { X, Send, Sparkles, MessageCircle, ExternalLink, RotateCcw } from "lucide-react";
import { EASMark } from "./Logo";
import { getReply, WELCOME, type BotReply } from "../assistant/brain";

interface Message extends BotReply {
  id: number;
  from: "bot" | "user";
  time: string;
}

const now = () => new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

/** Formato simple: **negrita**, _cursiva_ y saltos de línea */
function renderText(text: string): ReactNode[] {
  return text.split("\n").map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((p, j) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={j} className="font-semibold text-espresso">{p.slice(2, -2)}</strong>;
      if (p.startsWith("_") && p.endsWith("_") && p.length > 2) return <em key={j} className="text-fawn">{p.slice(1, -1)}</em>;
      return <span key={j}>{p}</span>;
    });
    return (
      <span key={i}>
        {parts}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

function BotAvatar({ size = 32 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-brand"
      style={{ width: size, height: size }}
    >
      <EASMark color="#fff" className="h-[62%] w-auto" strokeWidth={6} />
    </span>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState<Message[]>([{ ...WELCOME, id: 0, from: "bot", time: now() }]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  // Mensaje de bienvenida flotante tras unos segundos
  useEffect(() => {
    const t = setTimeout(() => setShowTeaser(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setShowTeaser(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { id: idRef.current++, from: "user", text: clean, time: now() }]);
    setInput("");
    setTyping(true);

    const reply = getReply(clean);
    const delay = Math.min(1600, 500 + reply.text.length * 6);
    setTimeout(() => {
      setMessages((m) => [...m, { ...reply, id: idRef.current++, from: "bot", time: now() }]);
      setTyping(false);
    }, delay);
  };

  const reset = () => {
    setMessages([{ ...WELCOME, id: idRef.current++, from: "bot", time: now() }]);
  };

  const lastBot = [...messages].reverse().find((m) => m.from === "bot");

  return (
    <>
      {/* Mensaje de bienvenida flotante */}
      {showTeaser && !open && (
        <div className="fixed bottom-24 right-5 z-[60] max-w-[260px] animate-[fadeUp_0.4s_ease-out] sm:right-6">
          <div className="relative rounded-xl rounded-br-sm border border-linen bg-white p-4 pr-8 shadow-xl">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute right-2 top-2 rounded p-1 text-fawn hover:bg-cream hover:text-bark"
              aria-label="Cerrar mensaje"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setOpen(true)} className="text-left">
              <p className="text-[13px] font-semibold text-espresso">¡Hola! 👋 ¿Te ayudo?</p>
              <p className="mt-1 text-[12.5px] leading-snug text-mocha">
                Pregúntame por el horario, la carta o haz tu reserva.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-white shadow-[0_8px_30px_rgba(169,83,47,0.45)] transition-transform hover:scale-105 hover:bg-terracotta-dark sm:right-6"
        aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}
      >
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
        {!open && unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gold text-[11px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {/* Panel del chat */}
      {open && (
        <div
          className="fixed inset-x-3 bottom-24 top-20 z-[60] flex animate-[fadeUp_0.25s_ease-out] flex-col overflow-hidden rounded-2xl border border-linen bg-parchment shadow-[0_20px_60px_rgba(42,24,18,0.3)] sm:inset-x-auto sm:right-6 sm:top-auto sm:h-[600px] sm:max-h-[calc(100vh-8rem)] sm:w-[390px]"
          role="dialog"
          aria-label="Asistente virtual de El Antiguo Salón"
        >
          {/* Cabecera */}
          <div className="flex items-center gap-3 bg-olive px-4 py-3.5 text-white">
            <div className="relative">
              <BotAvatar size={42} />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-olive bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 font-serif text-[16px] font-bold leading-tight">
                Asistente del Salón
                <Sparkles className="h-3.5 w-3.5 text-gold-light" />
              </p>
              <p className="text-[12px] text-stone-300">Asistente virtual · Responde al instante</p>
            </div>
            <button
              onClick={reset}
              className="rounded-md p-2 text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Reiniciar conversación"
              title="Nueva conversación"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-cream px-4 py-5">
            <p className="text-center text-[11px] font-medium uppercase tracking-wider text-fawn">Hoy</p>
            {messages.map((m) =>
              m.from === "bot" ? (
                <div key={m.id} className="flex items-end gap-2">
                  <BotAvatar size={28} />
                  <div className="max-w-[82%]">
                    <div className="rounded-2xl rounded-bl-sm border border-linen bg-white px-4 py-3 text-[13.5px] leading-relaxed text-bark shadow-sm">
                      {renderText(m.text)}
                    </div>
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <a
                            key={a.label}
                            href={a.href}
                            target={a.external ? "_blank" : undefined}
                            rel={a.external ? "noreferrer" : undefined}
                            onClick={() => !a.external && a.href.startsWith("#") && window.innerWidth < 640 && setOpen(false)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-terracotta-dark"
                          >
                            {a.label}
                            {a.external && <ExternalLink className="h-3 w-3" />}
                          </a>
                        ))}
                      </div>
                    )}
                    <p className="mt-1 pl-1 text-[10.5px] text-fawn">{m.time}</p>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex flex-col items-end">
                  <div className="max-w-[82%] rounded-2xl rounded-br-sm bg-terracotta px-4 py-2.5 text-[13.5px] leading-relaxed text-white shadow-sm">
                    {m.text}
                  </div>
                  <p className="mt-1 pr-1 text-[10.5px] text-fawn">{m.time}</p>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-end gap-2">
                <BotAvatar size={28} />
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-linen bg-white px-4 py-3.5 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-fawn [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-fawn [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-fawn" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Sugerencias */}
          {!typing && lastBot?.suggestions && lastBot === messages[messages.length - 1] && (
            <div className="flex gap-2 overflow-x-auto border-t border-linen bg-parchment px-4 py-2.5">
              {lastBot.suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full border border-linen-dark bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-bark transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Entrada */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-linen bg-white px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              className="flex-1 rounded-full border border-linen-dark bg-cream px-4 py-2.5 text-[14px] text-espresso outline-none placeholder:text-fawn focus:border-terracotta focus:bg-white"
              maxLength={300}
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta text-white transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:bg-linen-dark"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
