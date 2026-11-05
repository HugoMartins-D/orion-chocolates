// Lê e valida variáveis de ambiente obrigatórias no startup da função.
// Falhar aqui é melhor do que descobrir chave ausente no meio de uma conversa.
import { z } from "zod";

const EnvSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1),
  // Haiku 5.5 — modelo mais leve e barato da família atual, suficiente para
  // atendimento cotidiano (FAQ, lojas, produtos). Trocar só se a avaliação mostrar
  // necessidade real de um Sonnet.
  ANTHROPIC_MODEL: z.string().min(1).default("claude-haiku-5-5"),
  ALLOWED_ORIGIN: z.string().min(1).default("*"),
  WHATSAPP_NUMBER: z.string().min(1).default("5547996702584"),
});

export type Env = z.infer<typeof EnvSchema>;

let cached: Env | null = null;

export function env(): Env {
  if (cached) return cached;
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Env inválido: ${parsed.error.message}`);
  }
  cached = parsed.data;
  return cached;
}
