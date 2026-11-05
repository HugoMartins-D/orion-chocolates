# ARQUITETURA — Chatbot Orion (Fase 1)

## Visão geral

```
Cliente → Site (React/Vite, na Vercel)
            └─ ChatWidget (fora do canvas escalado)
                  │  POST /api/chat  (streaming SSE)
                  ▼
        Vercel Function  api/chat.ts
            1. valida entrada (zod, tamanho, rate limit)
            2. guardrails de entrada (detectaAlergia, assuntos de humano)
            3. agente (Claude API, tool use, prompt caching)
                  ├─ buscarProdutos / detalharProduto  → data/produtos.csv
                  ├─ infoLojas / consultarPolitica     → knowledge/ + config/
                  └─ gerarHandoff                      → link wa.me
            4. guardrails de saída (filtraSaida, aviso fixo de alergia)
            5. devolve texto + ações (botão WhatsApp)
```

Não há servidor Node separado nem API em Python na Fase 1 (ver `DECISOES.md`, D-03). Não há Streamlit em produção.

## Estrutura de pastas

Dentro do repositório do site (`orion-chocolates`), em branch/fork. Itens marcados `(existente)` já existem.

```
orion-chocolates/
├── CLAUDE.md
├── docs/
│   ├── CONTEXTO.md
│   ├── REGRAS-DE-NEGOCIO.md
│   ├── ARQUITETURA.md
│   ├── SCHEMA-PRODUTOS.md
│   ├── DECISOES.md
│   ├── PENDENCIAS.md
│   └── TESTES.md
├── api/                              # Vercel Functions
│   ├── chat.ts                       # handler POST /api/chat (streaming)
│   └── _lib/                         # "_" evita que a Vercel exponha como rota
│       ├── env.ts                    # lê e valida variáveis de ambiente
│       ├── schemas.ts                # zod: request, resposta, produto
│       ├── agent/
│       │   ├── runAgent.ts           # loop do modelo + tool use
│       │   ├── systemPrompt.ts       # monta o prompt a partir de config/knowledge
│       │   └── tools.ts              # definição e execução das ferramentas
│       ├── guardrails/
│       │   ├── detectaAlergia.ts     # intenção de alergia/restrição → modo alergia
│       │   ├── avisoAlergia.ts       # texto fixo de contaminação cruzada
│       │   ├── filtraSaida.ts        # termos proibidos e promessas indevidas
│       │   ├── estaAberto.ts         # horário humano (America/Sao_Paulo)
│       │   └── limites.ts            # rate limit, tamanho e corte de histórico
│       ├── data/
│       │   ├── carregaProdutos.ts    # lê e valida data/produtos.csv
│       │   ├── buscaProdutos.ts      # busca tolerante a acento e erro de digitação
│       │   └── carregaConfig.ts      # lê config/*.yaml e knowledge/*
│       └── handoff/
│           └── geraLinkWhatsapp.ts   # monta o link wa.me com o resumo
├── data/
│   └── produtos.csv                  # fornecido pelo cliente (ver SCHEMA-PRODUTOS.md)
├── knowledge/                        # um arquivo por tema, texto oficial
│   ├── lojas.md
│   ├── pagamento.md
│   ├── entrega-retirada.md
│   ├── trocas.md
│   ├── conservacao.md
│   ├── sazonais-encomendas.md
│   └── fidelidade.md
├── config/
│   ├── config.yaml                   # telefones, endereços, horários
│   ├── mensagens.yaml                # mensagens fixas aprovadas pelo cliente
│   ├── alergia.yaml                  # gatilhos de alergia/restrição
│   └── termos-proibidos.yaml         # termos e promessas bloqueados
├── src/                              # (existente) front do site
│   ├── main.tsx                      # (existente) montar <ChatWidget /> aqui
│   └── app/components/chat/
│       ├── ChatWidget.tsx            # balão + abrir/fechar
│       ├── ChatPanel.tsx             # painel de conversa
│       ├── MessageList.tsx
│       ├── MessageBubble.tsx
│       ├── ChatInput.tsx
│       ├── QuickMenu.tsx             # 1 Produtos, 2 Contatos, 3 Endereços, 4 Pedidos
│       ├── WhatsappButton.tsx        # abre wa.me em nova aba
│       ├── useChat.ts                # estado e consumo do streaming
│       ├── chatApi.ts                # fetch para /api/chat
│       └── types.ts
├── tests/
│   ├── guardrails.test.ts
│   ├── produtos.test.ts
│   ├── handoff.test.ts
│   └── eval/
│       ├── perguntas.yaml            # conjunto de avaliação (ver TESTES.md)
│       └── eval.test.ts
├── vercel.json                       # (existente) ajustar rewrite e includeFiles
├── .env.example
└── package.json                      # (existente) pnpm
```

## Pontos de atenção específicos da Vercel e do site

1. **Widget fora do canvas.** Montar em `src/main.tsx` ao lado de `<App />` (ou via portal em `document.body`). Usar `position: fixed` com unidades reais (`vw`, `dvh`, `rem`); nada de herdar a escala de 1440px. O widget deve ficar fora de `<Routes>` para persistir ao navegar entre `/`, `/produtos` e `/nossa-historia`.
2. **Rewrite do SPA.** O `vercel.json` atual manda tudo para `/index.html`. Trocar para algo como `"source": "/((?!api/).*)"` para que `/api/*` não seja capturado.
3. **Arquivos de dados dentro da função.** A função lê `data/`, `knowledge/` e `config/` em tempo de execução. Garantir que sejam empacotados, por exemplo com `"functions": { "api/chat.ts": { "includeFiles": "{data,knowledge,config}/**" } }` no `vercel.json`. Confirmar na documentação da Vercel e testar com `vercel dev` e num deploy de preview.
4. **Pastas com `_`** em `api/` não viram rotas. Colocar todos os módulos auxiliares em `api/_lib/`.
5. **Dev local.** `pnpm dev` (Vite) não serve `/api`. Usar `pnpm dlx vercel dev`.
6. **Segredos.** Variáveis de ambiente do projeto na Vercel. Nunca no repositório (que é público).
7. **Streaming.** Respostas por SSE; confirmar limites de duração de função do plano da Vercel.

## Contrato da API

`POST /api/chat`

Request (validado com zod):
```json
{
  "messages": [{ "role": "user", "content": "tem pão de mel sem glúten?" }],
  "sessionId": "uuid-gerado-no-front"
}
```
Limites: máximo de mensagens enviadas (ex.: últimas 10), tamanho máximo por mensagem (ex.: 500 caracteres), rejeitar roles inválidos.

Resposta: `text/event-stream` com eventos:
- `delta`: `{ "text": "..." }` trecho de texto.
- `action`: `{ "type": "whatsapp", "url": "https://wa.me/...", "label": "Falar com a equipe" }` botão de encaminhamento.
- `done`: `{}` fim.
- `error`: `{ "message": "<mensagem de falha aprovada>" }`.

## Ferramentas do agente

| Ferramenta | Função |
|---|---|
| `buscar_produtos(consulta, categoria?, filtros?)` | Busca no CSV; devolve poucos campos por item (sku, nome, categoria, resumo) |
| `detalhar_produto(sku)` | Devolve os campos completos (ingredientes, alergênicos, peso, conservação, link) |
| `info_lojas()` | Endereços, telefones e horários vindos de `config.yaml` |
| `consultar_politica(tema)` | Texto de `knowledge/` para pagamento, entrega, retirada, trocas, conservação, sazonais, fidelidade |
| `gerar_handoff(motivo, resumo, dados?)` | Devolve o link `wa.me` com a mensagem pré-preenchida |

Convenção: ferramentas devolvem o mínimo necessário, para economizar tokens.

## Guardrails (código, não prompt)

Ordem de execução em cada mensagem:

1. **Entrada:** validar com zod, cortar histórico, aplicar rate limit.
2. **`detectaAlergia`:** se a mensagem tratar de alergia, intolerância, glúten, lactose, celíaco, diabetes, vestígios ou alérgenos, entra em **modo alergia**. Nesse modo o modelo só pode citar campos do CSV; o código **sempre** anexa o aviso fixo (`avisoAlergia`) e oferece o botão de WhatsApp. Se a informação do produto não estiver clara no CSV, a resposta é a mensagem de informação ausente + handoff.
3. **Assuntos de humano:** reclamação, troca, reembolso, cancelamento, grande volume, reserva, desconto, personalização fora do padrão → handoff direto, sem promessa.
4. **Saída (`filtraSaida`):** bloquear/reescrever "artesanal", "caseiro", "nozes" genérico, "querida", "com amor"; bloquear afirmações como "seguro", "pode comer", "sem risco", "100%" no contexto de restrição; bloquear promessas de troca, reembolso, desconto, prazo de resposta e disponibilidade de estoque. Se algo for bloqueado, usar a mensagem padrão de informação ausente.
5. **Horário:** `estaAberto(agora)` decide se a mensagem de fora do horário (P40) acompanha o handoff.
6. **Falha:** qualquer erro da API ou do modelo devolve a mensagem de falha aprovada (P42), sem detalhes técnicos.

## Handoff por `wa.me`

URL: `https://wa.me/5547996702584?text=<texto codificado com encodeURIComponent>`. Modelo da mensagem:

```
Olá! Vim pelo site da Orion e preciso de ajuda.
Assunto: <motivo>
Produto: <produto, se houver>
Pedido: <número, se houver>
Resumo: <resumo curto>
```
Não incluir dados sensíveis de saúde ligados a nome. Incluir só o que o cliente informou na conversa.

## Controle de custo e desempenho

- Modelo definido em `ANTHROPIC_MODEL`; começar com modelo pequeno (família Haiku) e subir só se a avaliação exigir.
- `max_tokens` baixo na resposta; histórico limitado às últimas mensagens.
- **Prompt caching** para o system prompt e o conteúdo estável (regras, política, catálogo compacto). Se o catálogo crescer muito, usar só as ferramentas de busca.
- Registrar tokens por conversa (sem dados pessoais) e configurar alerta de gasto na conta da Anthropic.
- Rate limit por IP e, se necessário, Cloudflare Turnstile no widget.

## Variáveis de ambiente (`.env.example`)

```
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=            # ex.: um modelo Haiku atual; confirmar o nome na documentação
ALLOWED_ORIGIN=             # domínio do site (muda quando o domínio oficial entrar)
WHATSAPP_NUMBER=5547996702584
SENTRY_DSN=
```

## Segurança e LGPD

- Aviso de privacidade no widget antes de coletar nome ou número de pedido.
- Retenção de logs com prazo definido (sugestão: 30 a 90 dias) e sem dados pessoais nem de saúde.
- Proteção básica contra injeção de prompt: o bot não revela instruções, não muda de papel, não executa comandos do usuário sobre as próprias regras.
- O repositório é **público**: nada confidencial no CSV ou em `knowledge/` além do que o cliente já publica.

## Ferramenta interna opcional (Streamlit)

Não faz parte da Fase 1 de produção. Se for útil depois: painel interno protegido para validar o CSV e testar conversas, hospedado fora da Vercel. Não deve ser a interface do cliente.

## Testes

`vitest` para guardrails, busca de produtos e handoff; conjunto de avaliação em `tests/eval/` (ver `TESTES.md`). `pnpm exec tsc --noEmit` e `pnpm build` no CI (GitHub Actions).
