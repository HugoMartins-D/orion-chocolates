import React from "react";
import { createRoot } from "react-dom/client";
import { ChatWidget } from "./components/chat";
import "./styles.css";

function DemoPage() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-amber-50 to-white p-10 font-sans text-neutral-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-amber-900">Orion Chatbot — página de teste</h1>
        <p className="mt-3 text-neutral-700">
          Página isolada só para validar o widget. O site real (fora desta pasta) permanece intocado.
          O balão aparece no canto inferior direito.
        </p>
        <ul className="mt-5 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>Sem <code>ANTHROPIC_API_KEY</code> no .env, a UI abre normalmente mas a chamada ao modelo falha.</li>
          <li>Com a key configurada, o endpoint <code>/api/chat</code> é servido por um middleware do Vite.</li>
          <li>Teste frases que ativam guardrails: "tem glúten?", "quero reembolso", "cupom?".</li>
        </ul>
      </div>
      <ChatWidget />
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<DemoPage />);
