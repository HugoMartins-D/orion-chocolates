// Cliente SSE do /api/chat. Lê o stream com um ReadableStream direto do fetch
// (sem EventSource — EventSource não suporta POST com corpo).
import type { Message, StreamEvent } from "./types";

type Payload = { messages: Array<{ role: "user" | "assistant"; content: string }>; sessionId: string };

export async function* streamChat(messages: Message[], sessionId: string, signal?: AbortSignal): AsyncGenerator<StreamEvent> {
  const payload: Payload = {
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    sessionId,
  };
  const resp = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!resp.ok || !resp.body) throw new Error(`chat falhou: ${resp.status}`);

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n\n")) !== -1) {
      const bloco = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      const parsed = parseBlocoSSE(bloco);
      if (parsed) yield parsed;
    }
  }
}

function parseBlocoSSE(bloco: string): StreamEvent | null {
  let event = "";
  let data = "";
  for (const linha of bloco.split("\n")) {
    if (linha.startsWith("event:")) event = linha.slice(6).trim();
    else if (linha.startsWith("data:")) data += linha.slice(5).trim();
  }
  if (!event) return null;
  try {
    return { event, data: JSON.parse(data || "{}") } as StreamEvent;
  } catch {
    return null;
  }
}
