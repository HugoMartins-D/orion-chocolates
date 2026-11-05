// Balão de uma mensagem. Mantém estilos locais (classes Tailwind) para não
// depender de nada do canvas escalado do site.
import type { Message, ChatAction } from "./types";
import WhatsappButton from "./WhatsappButton";
import { renderText } from "./renderText";

export default function MessageBubble({ msg, acao }: { msg: Message; acao?: ChatAction }) {
  const ehUsuario = msg.role === "user";
  return (
    <div className={`flex ${ehUsuario ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          ehUsuario ? "bg-[#532118] text-white" : "bg-[#fdf1e3] text-[#3d2226] border border-amber-100"
        }`}
      >
        <div className="break-words">
          {msg.content ? renderText(msg.content) : (ehUsuario ? "" : "…")}
        </div>
        {acao ? (
          <div className="mt-3">
            <WhatsappButton url={acao.url} label={acao.label} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
