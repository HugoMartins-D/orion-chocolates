# CONTEXTO — Chatbot Orion

Data de referência desta documentação: 05/11/2026.

## Cliente

**Chocolates Orion Ltda.**, fabricante de chocolates finos em Blumenau/SC desde 1958. Fabricação própria. Vende no varejo (lojas físicas e delivery). Não vende no atacado. Atende empresas, festas e eventos mediante consulta prévia. Público principal: consumidor final.

Fontes oficiais: site `www.chocolatesorion.com.br` (o domínio vai mudar), Linktree `https://linktr.ee/chocolatesorion`, Instagram `@chocolatesorion`. O catálogo e os pedidos ficam no sistema de delivery da empresa (link ainda a confirmar).

## Origem das informações

Todo o conteúdo de negócio vem do **questionário respondido pelo cliente** ("Questionário — Chatbot Chocolates Orion", 42 perguntas em 8 blocos: empresa e atendimento, canais e limites, linguagem da marca, produtos e catálogo, pagamento/entrega/retirada, trocas e políticas, cancelamentos e condições especiais, encaminhamento humano). O resumo operacional está em `REGRAS-DE-NEGOCIO.md`. As lacunas e contradições do questionário estão em `PENDENCIAS.md`.

## Objetivo do chatbot

Esclarecer dúvidas sobre os produtos e facilitar o acesso às informações mais procuradas: características dos chocolates, ingredientes, alergênicos (sempre conforme rotulagem de cada produto), sazonais e personalizados, lojas, encomendas e formas de compra. Quando a solicitação exigir análise específica, decisão comercial ou informação fora da base, encaminhar ao atendimento humano.

## Escopo

**Fase 1 (atual):** chatbot no site, com encaminhamento ao WhatsApp por link `wa.me`. Sem API da Meta.

**Fora de escopo por ora:** chatbot dentro do WhatsApp, integração com Instagram, consulta de status de pedidos (depende de integração com o sistema de delivery), reservas, registro de compras.

Impacto da decisão sobre o questionário: a pergunta 6 lista WhatsApp e Instagram como canais possíveis, e a pergunta 9 prevê consulta de pedidos. Ambos ficam para fases futuras. Isso deve ser comunicado ao cliente por escrito.

## O site onde o chatbot entra

- URL: `https://orion-chocolates.vercel.app/`
- Repositório: `https://github.com/HugoMartins-D/orion-chocolates` (público, dono: outro desenvolvedor).
- Tecnologia: **React + Vite**, SPA sem servidor. Rotas `/`, `/produtos`, `/nossa-historia`, todas no mesmo app.
- Gerenciador de pacotes: **pnpm** (o README proíbe `npm install`).
- Usa TypeScript, Tailwind via PostCSS, componentes shadcn/Radix (`navbar`, `button`, `popover`) e um fundo em vídeo na hero.
- Estrutura relevante: `src/app/App.tsx`, `src/app/sections/`, `src/app/pages/`, `src/app/components/ui/`, `src/app/hooks/`, `src/assets/`, `src/styles/` (tema, cores e fontes).
- `vercel.json` hoje contém apenas: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.

**Particularidade crítica:** a home e a página de produtos são desenhadas num "canvas" de referência de 1440px com posicionamento absoluto, escalado com `transform: scale()`. Um elemento `position: fixed` dentro de um ancestral com `transform` deixa de ser fixo na janela. Por isso o widget do chat **não pode** ser renderizado dentro do canvas: deve ser montado fora dele (em `src/main.tsx`, ao lado do `<App />`, ou via portal em `document.body`), usando unidades reais de viewport. Ver `ARQUITETURA.md`.

Ainda não foram lidos: `src/styles` (tokens de cor e fonte) e `src/main.tsx`. Leia-os antes de montar o widget, para herdar o tema da marca.

## Perfil do desenvolvedor

Falante de português do Brasil. Tem boa familiaridade com Python e menos com TypeScript, por isso o projeto adota código TS simples, regras em arquivos de configuração e testes como principal forma de revisão (ver `CLAUDE.md`). Também importa controlar o gasto de tokens, tanto no desenvolvimento quanto em produção.

## Estado atual

- Questionário recebido e analisado.
- Viabilidade avaliada: CSV de produtos é suficiente; Streamlit permite customização visual razoável, mas **não** foi escolhido como interface de produção (ver `DECISOES.md`).
- Stack definida (opção B: tudo em TypeScript na Vercel).
- Pendente: respostas do cliente às lacunas (`PENDENCIAS.md`), CSV real de produtos, leitura do tema do site, implementação.
