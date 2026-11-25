# Deploy standalone na Vercel (ambiente de teste)

O subprojeto `orionchabot/` roda como projeto Vercel **separado** do site. Zero
impacto no repositório/URL do site principal. Objetivo: ter uma URL de teste
tipo `https://orion-chatbot-dev.vercel.app` para validação do cliente antes de
integrar ao site.

## Pré-requisitos

- Conta Vercel.
- `ANTHROPIC_API_KEY` com billing ativo.
- CLI Vercel (opcional): `npm i -g vercel`.

## Passos — via CLI (mais rápido)

```bash
cd orionchabot/

# 1. Login (uma vez só)
vercel login

# 2. Primeiro deploy — cria o projeto na Vercel
vercel

# Responder:
#   Set up and deploy? → Y
#   Which scope? → sua conta
#   Link to existing project? → N
#   Project name? → orion-chatbot-dev
#   Directory? → ./
#   Override settings? → N (vercel.json já define tudo)

# 3. Configurar variáveis de ambiente na Vercel (uma vez só)
vercel env add ANTHROPIC_API_KEY production
vercel env add ANTHROPIC_MODEL production      # claude-haiku-5-5
vercel env add WHATSAPP_NUMBER production      # 5547996702584
vercel env add ALLOWED_ORIGIN production       # https://orion-chatbot-dev.vercel.app

# 4. Deploy de produção
vercel --prod
```

URL volta no final: algo como `https://orion-chatbot-dev-xxxx.vercel.app`.

## Passos — via dashboard Vercel

1. vercel.com → **Add New Project** → importar o repo.
2. **Root Directory** → `orionchabot/` (importante: NÃO a raiz do site).
3. Framework Preset: Vite (detectado automaticamente).
4. Environment Variables → adicionar as 4 do passo 3 acima.
5. Deploy.

## Checagens pós-deploy

```bash
# 1. Página abre e renderiza o widget
curl -I https://<sua-url>/

# 2. API responde
curl -X POST https://<sua-url>/api/chat \
  -H "content-type: application/json" \
  -d '{"messages":[{"role":"user","content":"ola"}],"sessionId":"550e8400-e29b-41d4-a716-446655440000"}'

# 3. Guardrail dispara para assunto humano
curl -X POST https://<sua-url>/api/chat \
  -H "content-type: application/json" \
  -d '{"messages":[{"role":"user","content":"quero reembolso"}],"sessionId":"550e8400-e29b-41d4-a716-446655440000"}'

# 4. Probe real (com modelo)
CHAT_URL=https://<sua-url>/api/chat npm run probe:injection
```

## Depois dos testes

Quando o cliente aprovar e for integrar ao site:
- Seguir `README.md` seção "Como integrar ao site".
- O projeto Vercel de teste pode ser apagado (ou mantido como staging).

## Notas

- Logs: `vercel logs <deployment-url>` ou no dashboard.
- Rollback: Vercel mantém histórico; qualquer deploy anterior pode ser
  promovido a produção com um clique.
- Custo: cada conversa real chama a Anthropic. Haiku 5.5 é barato, mas
  configure alerta de gasto na conta da Anthropic.
- Rate limit: o `limites.ts` é em memória, por instância. Em produção com
  várias regiões/instâncias isso afrouxa — considerar Upstash/KV depois.
