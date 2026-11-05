// Renderiza o texto de uma mensagem como React: parseia markdown-links
// `[texto](url)`, URLs cruas, **negrito** e quebras de linha.
// Objetivo: mesmo que o modelo escorregue e mande um URL direto, o widget
// mostra como link clicável em vez de texto cru.
import { type ReactNode } from "react";

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

export function renderText(texto: string): ReactNode[] {
  const linhas = texto.split("\n");
  const out: ReactNode[] = [];
  linhas.forEach((linha, i) => {
    if (i > 0) out.push(<br key={`br-${i}`} />);
    renderComLinks(linha, `l${i}`, out);
  });
  return out;
}

function renderComLinks(linha: string, prefixo: string, out: ReactNode[]) {
  let ultimo = 0;
  let idx = 0;
  for (const m of linha.matchAll(LINK_RE)) {
    const inicio = m.index ?? 0;
    if (inicio > ultimo) pushInline(linha.slice(ultimo, inicio), `${prefixo}-t${idx++}`, out);
    const label = m[1] ?? m[3] ?? "";
    const url = m[2] ?? m[3] ?? "";
    out.push(<LinkInline key={`${prefixo}-a${idx++}`} url={url} label={label} />);
    ultimo = inicio + m[0].length;
  }
  if (ultimo < linha.length) pushInline(linha.slice(ultimo), `${prefixo}-t${idx++}`, out);
}

function pushInline(trecho: string, key: string, out: ReactNode[]) {
  let ultimo = 0;
  let i = 0;
  for (const m of trecho.matchAll(BOLD_RE)) {
    const inicio = m.index ?? 0;
    if (inicio > ultimo) out.push(<span key={`${key}-s${i++}`}>{trecho.slice(ultimo, inicio)}</span>);
    out.push(<strong key={`${key}-b${i++}`} className="font-semibold">{m[1]}</strong>);
    ultimo = inicio + m[0].length;
  }
  if (ultimo < trecho.length) out.push(<span key={`${key}-s${i++}`}>{trecho.slice(ultimo)}</span>);
}

function LinkInline({ url, label }: { url: string; label: string }) {
  const ehMapa = /maps\.google|google\.com\/maps|maps\.app\.goo\.gl/.test(url);
  const ehWhats = /wa\.me|whatsapp\.com/.test(url);
  const texto = ehMapa && label === url ? "Ver no mapa" : label;
  const classe = ehMapa
    ? "inline-flex items-center gap-1 text-amber-800 underline decoration-amber-700/60 hover:text-amber-900"
    : ehWhats
    ? "inline-flex items-center gap-1 text-emerald-700 underline hover:text-emerald-800"
    : "text-amber-700 underline hover:text-amber-800";
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={classe}>
      {ehMapa ? <PinIcon /> : null}
      {texto}
    </a>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
