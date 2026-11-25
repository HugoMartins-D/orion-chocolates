// Detecta intenção de alergia/restrição e assuntos de humano no texto do cliente.
// Comparação insensível a acento e case, por substring — alvo é intenção, não match exato.
import { carregaConfig } from "../data/carregaConfig";

export type IntencaoEntrada = {
  modoAlergia: boolean;
  assuntoHumano: boolean;
};

export function detectaIntencao(texto: string): IntencaoEntrada {
  const { alergia } = carregaConfig();
  const norm = normaliza(texto);
  return {
    modoAlergia: alergia.gatilhos.some((g) => norm.includes(normaliza(g))),
    assuntoHumano: alergia.assuntos_humano.some((a) => norm.includes(normaliza(a))),
  };
}

function normaliza(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
