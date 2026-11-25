// Input de texto. Enter envia, Shift+Enter quebra linha. Trim e limite de 500 no envio.
import { useState, type FormEvent, type KeyboardEvent } from "react";

const MAX = 500;

export default function ChatInput({ onEnviar, desativado }: { onEnviar: (texto: string) => void; desativado: boolean }) {
  const [valor, setValor] = useState("");

  function enviar(e: FormEvent | KeyboardEvent) {
    e.preventDefault();
    const t = valor.trim();
    if (!t || desativado) return;
    onEnviar(t.slice(0, MAX));
    setValor("");
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) enviar(e);
  }

  return (
    <form onSubmit={enviar} className="flex gap-2 border-t border-neutral-200 bg-white p-3">
      <textarea
        value={valor}
        onChange={(e) => setValor(e.target.value.slice(0, MAX))}
        onKeyDown={onKey}
        placeholder="Escreva sua dúvida…"
        rows={1}
        maxLength={MAX}
        aria-label="Mensagem para o assistente"
        className="flex-1 resize-none rounded-xl border border-amber-200 px-3 py-2 text-sm text-[#3d2226] outline-none focus:border-[#e29647]"
      />
      <button
        type="submit"
        disabled={desativado || !valor.trim()}
        className="rounded-xl bg-[#e29647] px-4 text-sm font-semibold text-[#532118] hover:bg-[#d58632] disabled:opacity-50"
      >
        Enviar
      </button>
    </form>
  );
}
