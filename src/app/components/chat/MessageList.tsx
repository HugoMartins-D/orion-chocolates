// Lista rolável de mensagens. Auto-scroll para o fim quando novas mensagens
// chegam, usando um ref no último item.
import { useEffect, useRef } from "react";
import type { ChatAction, Message } from "./types";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, acoes }: { messages: Message[]; acoes: Record<string, ChatAction> }) {
  const fimRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white">
      {messages.map((m) => (
        <MessageBubble key={m.id} msg={m} acao={acoes[m.id]} />
      ))}
      <div ref={fimRef} />
    </div>
  );
}
