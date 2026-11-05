// Calcula no fuso America/Sao_Paulo se o atendimento humano está aberto agora.
// O modelo NÃO decide isso: o horário vem do código.
import { carregaConfig } from "../data/carregaConfig";

export function estaAberto(agora: Date = new Date()): boolean {
  const { config } = carregaConfig();
  const partes = partesFuso(agora, config.atendimento_humano.timezone);
  const minutos = partes.h * 60 + partes.m;

  let janela: { inicio: string; fim: string } | null = null;
  if (partes.dow >= 1 && partes.dow <= 5) janela = config.atendimento_humano.seg_sex;
  else if (partes.dow === 6) janela = config.atendimento_humano.sab;
  else janela = config.atendimento_humano.dom;

  if (!janela) return false;
  const [iniH, iniM] = janela.inicio.split(":").map(Number);
  const [fimH, fimM] = janela.fim.split(":").map(Number);
  return minutos >= iniH * 60 + iniM && minutos < fimH * 60 + fimM;
}

// Extrai hora, minuto e dia-da-semana (0=dom..6=sáb) no timezone pedido,
// usando Intl em vez de dep externa. Menos preciso que luxon, mas suficiente.
function partesFuso(data: Date, tz: string) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const partes = fmt.formatToParts(data);
  const wd = partes.find((p) => p.type === "weekday")?.value ?? "Sun";
  const h = Number(partes.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(partes.find((p) => p.type === "minute")?.value ?? 0);
  const dow = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd] ?? 0;
  return { h: h === 24 ? 0 : h, m, dow };
}
