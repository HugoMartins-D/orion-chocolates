# DECISÕES — Chatbot Orion

Registro das decisões tomadas durante o planejamento, com o motivo e as alternativas descartadas. Se for mudar uma decisão, atualize este arquivo.

## D-01 — Fase 1 é só o site, com encaminhamento por link `wa.me`
- **Decisão:** o chatbot vive no site; para falar com humano, o bot gera um link `wa.me` com mensagem pré-preenchida. Sem API do WhatsApp/Meta e sem Instagram por enquanto.
- **Motivo:** evita verificação de empresa na Meta, aprovação de templates e custo por conversa; reduz dados pessoais trafegando no bot; mais simples para começar.
- **Impacto no questionário:** P6 (canais WhatsApp/Instagram) e P40 (mensagem fora do horário, que pressupõe o bot no WhatsApp) ficam parcialmente atendidas. Comunicar ao cliente por escrito.
- **Limitações assumidas:** o cliente pode editar a mensagem; não sabemos se ele enviou; a conversa não continua no WhatsApp; o atendente recebe só o resumo.
- **Futuro:** WhatsApp nativo entra depois como nova camada sobre o mesmo núcleo.

## D-02 — Chatbot baseado em LLM com ferramentas, regras críticas em código
- **Decisão:** Claude API com tool use sobre CSV e base de conhecimento. Regras de segurança (alergia, termos proibidos, promessas, horário) em código e arquivos de configuração, não só no prompt.
- **Motivo:** o cliente exige que o bot nunca afirme segurança alimentar nem prometa trocas/descontos. Prompt sozinho não garante isso; código determinístico e testes garantem.

## D-03 — Cérebro em TypeScript numa Vercel Function (opção B)
- **Contexto:** o site é um React + Vite SPA na Vercel, sem servidor. A ideia original era API Python (FastAPI) + Node (BFF).
- **Opções avaliadas:**
  - **A. Python separado:** FastAPI em Railway/Render/Fly, Vercel Function só como proxy. Prós: lógica crítica em Python (linguagem em que o desenvolvedor é mais forte) e API reaproveitável para WhatsApp nativo depois. Contras: dois deploys e um servidor extra.
  - **B. Tudo em TypeScript:** `/api/chat.ts` na própria Vercel, SDK da Anthropic em TS, CSV e conhecimento no repositório. Prós: um deploy, sem servidor extra, menos custo e pontos de falha. Contras: lógica crítica em TS, onde o desenvolvedor tem menos experiência.
- **Decisão:** **B**, por ser a mais simples para uma Fase 1 que só atende o site.
- **Ressalva registrada:** o risco de revisar código TS sem experiência foi levantado. Mitigações: TS simples, funções pequenas e puras, regras em YAML, testes como forma de revisão, checklist de revisão e `tsc --noEmit` no CI (ver `CLAUDE.md`). Se isso se mostrar insuficiente, migrar o núcleo para Python (opção A) é viável porque as regras são independentes de linguagem.
- **Descartado:** rodar FastAPI dentro da Vercel (funções serverless têm tempo limite e não mantêm processo ativo; ruim para streaming e para carregar dados a cada chamada).

## D-04 — Streamlit não é a interface de produção
- **Avaliação:** o Streamlit permite tema (cores e fonte via `config.toml`), fontes próprias, CSS injetado e embed por iframe com `?embed=true` e `embed_options`. Mas não tem balão flutuante nativo (isso teria que ser feito no React), o CSS injetado depende de classes internas que podem mudar, cada sessão roda um processo com reexecução do script, há carregamento inicial perceptível e há problemas de altura/teclado no celular.
- **Decisão:** o chat do cliente é um componente React nativo, com o tema do site. Streamlit, se usado, é só ferramenta interna (validar CSV, testar conversas), hospedada fora da Vercel e protegida.

## D-05 — CSV como fonte de produtos; sem preço/estoque
- **Decisão:** `data/produtos.csv` com schema próprio (`SCHEMA-PRODUTOS.md`). Preço e estoque ficam no delivery; o bot direciona ao link do produto.
- **Motivo:** o cliente atualiza estoque e preços manualmente; um CSV defasado levaria o bot a informar dados errados. Catálogo pequeno dispensa banco vetorial; carga em memória e busca simples bastam.
- **Revisar se:** o catálogo passar de poucas centenas de itens ou o cliente exigir preço no bot.

## D-06 — Widget fora do canvas escalado do site
- **Motivo:** home e produtos usam um canvas de 1440px escalado com `transform: scale()`. `position: fixed` dentro de ancestral transformado quebra. Montar o widget em `main.tsx` (ou portal em `document.body`), fora das rotas, com unidades reais de viewport.

## D-07 — Regras de marca como dados
- **Decisão:** gatilhos de alergia, termos proibidos, mensagens aprovadas, horários e telefones em `config/*.yaml`; conteúdo oficial em `knowledge/`. Assim o cliente e o desenvolvedor revisam texto em português, não código.

## D-08 — Controle de custo
- Modelo pequeno (Haiku) configurável por variável de ambiente, `max_tokens` baixo, histórico limitado, prompt caching, ferramentas que devolvem o mínimo, log de tokens com alerta de gasto. No desenvolvimento: respostas curtas do agente, sem repetir código no chat (ver `CLAUDE.md`).

## D-09 — Consulta de pedidos fica para depois
- **Motivo:** exige integração com o sistema de delivery (nome e existência de API ainda desconhecidos) e validação de identidade (LGPD). Na Fase 1, o bot orienta a acompanhar pelo site de delivery e a chamar o WhatsApp em caso de problema.

## D-10 — Trabalhar em branch/fork do repositório do site
- O repositório pertence a outro desenvolvedor (HugoMartins-D) e é público. Alterações mínimas em arquivos existentes (`src/main.tsx`, `vercel.json`); segredos só em variáveis de ambiente; nada confidencial no repositório.

## Ideias avaliadas e não adotadas agora
- API oficial do WhatsApp (Meta) e integração com Instagram: fase futura.
- Banco vetorial/RAG: desnecessário para o tamanho do catálogo.
- Chatbot sem LLM (fluxo por menus): não atende perguntas livres sobre produtos e alergênicos como o cliente pediu; o menu 1–4 existe só como atalho.
