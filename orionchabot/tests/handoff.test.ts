import { describe, expect, it, beforeAll } from "vitest";
import { geraLinkWhatsapp } from "../api/_lib/handoff/geraLinkWhatsapp";

beforeAll(() => {
  process.env.ANTHROPIC_API_KEY = "test-key";
});

describe("geraLinkWhatsapp", () => {
  it("monta URL wa.me com texto codificado", () => {
    const r = geraLinkWhatsapp({ motivo: "Troca", resumo: "produto derretido" });
    expect(r.url).toMatch(/^https:\/\/wa\.me\/5547996702584\?text=/);
    expect(decodeURIComponent(r.url.split("text=")[1])).toContain("Assunto: Troca");
    expect(decodeURIComponent(r.url.split("text=")[1])).toContain("Resumo: produto derretido");
  });

  it("inclui produto e pedido quando fornecidos", () => {
    const r = geraLinkWhatsapp({
      motivo: "Dúvida",
      resumo: "x",
      produto: "Pão de mel",
      numeroPedido: "123",
    });
    const texto = decodeURIComponent(r.url.split("text=")[1]);
    expect(texto).toContain("Produto: Pão de mel");
    expect(texto).toContain("Pedido: 123");
  });
});
