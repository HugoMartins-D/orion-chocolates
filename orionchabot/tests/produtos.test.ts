import { describe, expect, it } from "vitest";
import { buscaProdutos, detalharProduto } from "../api/_lib/data/buscaProdutos";

describe("buscaProdutos", () => {
  it("acha pão de mel mesmo sem acento", () => {
    const r = buscaProdutos("pao de mel");
    expect(r.length).toBeGreaterThan(0);
    expect(r[0].nome.toLowerCase()).toContain("pão de mel");
  });

  it("filtra por categoria", () => {
    const r = buscaProdutos("chocolate", "tablete");
    for (const item of r) expect(item.categoria).toBe("tablete");
  });

  it("devolve ficha completa via sku", () => {
    const p = detalharProduto("EXEMPLO-001");
    expect(p).not.toBeNull();
    expect(p?.contem_gluten).toBe(true);
  });
});
