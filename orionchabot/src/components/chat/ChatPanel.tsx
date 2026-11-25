// Painel aberto do chat (header, lista, atalhos e input).
// Fica num container `fixed` isolado — não herda transform do site.
import { useEffect } from "react";
import { useChat } from "./useChat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import QuickMenu from "./QuickMenu";

const BOAS_VINDAS = `Olá! Sou o assistente virtual da Chocolates Orion. Como posso ajudar? 🍫

1 – Produtos
2 – Contatos
3 – Endereços
4 – Pedidos`;

export default function ChatPanel({ onFechar }: { onFechar: () => void }) {
  const { messages, acoes, carregando, enviar, resetar } = useChat();

  // Semeia a mensagem de boas-vindas na primeira abertura.
  useEffect(() => {
    if (messages.length === 0) {
      // Injeção direta no estado via mensagem síntetica — renderiza como assistant,
      // sem passar pelo modelo.
      const id = (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random())) as string;
      // Hack: usamos enviar via estado interno; o useChat não expõe push direto,
      // então mostramos a mensagem localmente aqui como texto fixo no header.
      // (Simplificação consciente: boas_vindas é visual, não vai ao histórico.)
      void id;
    }
  }, [messages.length]);

  return (
    <div
      role="dialog"
      aria-label="Assistente da Chocolates Orion"
      className="fixed bottom-24 right-4 z-[9999] flex h-[560px] max-h-[80dvh] w-[360px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
    >
      <header className="flex items-center justify-between bg-gradient-to-r from-[#532118] to-[#8c3a24] px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={resetar}
              aria-label="Voltar ao menu inicial"
              title="Voltar ao menu"
              className="rounded-full p-1 hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
          ) : null}
          <div>
            <p className="text-sm font-semibold leading-tight">Chocolates Orion</p>
            <p className="text-[11px] opacity-90">Assistente virtual</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar chat"
          className="rounded-full p-1 hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>

      {messages.length === 0 ? (
        <div className="px-4 pt-3 pb-1 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{BOAS_VINDAS}</div>
      ) : null}

      <MessageList messages={messages} acoes={acoes} />

      {messages.length === 0 ? <QuickMenu onEscolher={enviar} desativado={carregando} /> : null}

      <ChatInput onEnviar={enviar} desativado={carregando} />
    </div>
  );
}
