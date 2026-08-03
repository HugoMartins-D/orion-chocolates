# ORION Chocolates

Site institucional da ORION Chocolates (Blumenau, SC) — React + Vite, com todas as páginas (`/`, `/produtos`, `/nossa-historia`) servidas por um único app.

## Rodando o projeto

Este projeto usa **pnpm** — não use `npm install`, isso corrompe a estrutura de `node_modules`.

```bash
pnpm install
pnpm dev
```

## Estrutura

```
src/
  app/
    App.tsx              # página inicial — canvas + composição das seções
    sections/             # uma seção por arquivo (Hero, History, Products, B2B, StoreLocator, Contact)
    pages/                 # as outras rotas (Produtos.tsx, NossaHistoria.tsx)
    components/
      ui/                  # componentes shadcn/radix realmente usados (navbar, button, popover)
      three/               # vídeo de fundo da hero
    hooks/                 # useNavScale — escala o canvas de 1440px pro viewport
  assets/                  # imagens, vídeos e fontes estáticas
  styles/                  # tema (cores/tokens) e fontes
```

A home e a página de produtos usam a mesma técnica: um "canvas" de referência de 1440px de largura, desenhado com posicionamento absoluto (herdado do design original no Figma) e escalado via `transform: scale()` para caber em qualquer largura de tela.
