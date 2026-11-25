// Retorna o texto fixo de contaminação cruzada aprovado pelo cliente.
// Sempre anexado por código quando o modo alergia estiver ativo.
import { carregaConfig } from "../data/carregaConfig";

export function avisoAlergia(): string {
  return carregaConfig().mensagens.aviso_alergia.trim();
}
