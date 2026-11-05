// Monta o link wa.me com uma mensagem padronizada já codificada.
// Nunca inclui dados sensíveis de saúde vinculados ao nome do cliente.
import { env } from "../env";

export type DadosHandoff = {
  motivo: string;
  resumo: string;
  produto?: string;
  numeroPedido?: string;
  nome?: string;
};

export function geraLinkWhatsapp(d: DadosHandoff): { url: string; label: string } {
  const numero = env().WHATSAPP_NUMBER;
  const linhas = [
    "Olá! Vim pelo site da Orion e preciso de ajuda.",
    `Assunto: ${d.motivo}`,
  ];
  if (d.produto) linhas.push(`Produto: ${d.produto}`);
  if (d.numeroPedido) linhas.push(`Pedido: ${d.numeroPedido}`);
  if (d.nome) linhas.push(`Nome: ${d.nome}`);
  linhas.push(`Resumo: ${d.resumo}`);
  const texto = encodeURIComponent(linhas.join("\n"));
  return {
    url: `https://wa.me/${numero}?text=${texto}`,
    label: "Falar com a equipe no WhatsApp",
  };
}
