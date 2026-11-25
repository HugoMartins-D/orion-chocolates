# Orion Chatbot — Fase 1

Subprojeto auto-contido do chatbot da Chocolates Orion. Foi mantido em pasta separada (`orionchabot/`) **para não alterar a estrutura do site**. Nada em `/src`, `/api`, `/public` ou `vercel.json` do site foi tocado nesta etapa.

## Conteúdo

```
orionchabot/
├── .claude/skills/graft/SKILL.md     # skill importada de trailhq/Trail-Code
├── docs/                             # briefing completo (CLAUDE.md, CONTEXTO, REGRAS, etc.)
├── config/                           # YAMLs: config, mensagens, alergia, termos proibidos
├── knowledge/                        # textos oficiais por tema (markdown)
├── data/
│   └── produtos.csv                  # schema com 2 linhas de exemplo (substituir pelo real)
├── api/
│   ├── chat.ts                       # Vercel Function POST /api/chat (SSE)
│   └── _lib/
│       ├── env.ts
│       ├── schemas.ts                # zod (request + Produto do CSV)
│       ├── agent/                    # systemPrompt, tools, runAgent
│       ├── guardrails/               # alergia, saída, horário, limites
│       ├── data/                     # carregaProdutos, buscaProdutos, carregaConfig
│       └── handoff/                  # geraLinkWhatsapp
├── src/components/chat/              # widget React (ChatWidget, hooks, etc.)
├── package.json
├── tsconfig.json
└── .env.example
```

## Como integrar ao site (passo final — fora deste commit)

Quando a equipe quiser plugar o widget no site:

1. Copiar `api/` para a raiz do repo do site.
2. Copiar `config/`, `knowledge/`, `data/` para a raiz do repo do site.
3. Copiar `src/components/chat/` para `src/app/components/chat/`.
4. Em `src/main.tsx`, montar `<ChatWidget />` **ao lado** de `<App />`, fora do canvas escalado (ver `docs/ARQUITETURA.md`).
5. Em `vercel.json`, trocar o rewrite para `"source": "/((?!api/).*)"` e adicionar `includeFiles` para `{data,knowledge,config}/**` em `api/chat.ts`.
6. Adicionar as deps `@anthropic-ai/sdk`, `js-yaml`, `zod` ao `package.json` do site (pnpm add).
7. Configurar variáveis de ambiente na Vercel (ver `.env.example`).

Enquanto isso não acontece, o chatbot funciona isoladamente aqui para desenvolvimento/testes.

## Scripts

```bash
pnpm install
pnpm typecheck
pnpm test
```

## Regras invioláveis

Resumidas em `docs/CLAUDE.md` seção 68-76. Nunca contornar.

## Skill graft

A skill `.claude/skills/graft/SKILL.md` foi importada do repo público `trailhq/Trail-Code` (MIT). É uma ferramenta de contexto para agentes; o uso completo requer a CLI `graft` do Trail-Code — ver instruções no próprio arquivo.
