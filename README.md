# Fluxo — Painel de Operações Acadêmicas

**No ar:** https://loocawtech-bot.github.io/fluxo-operacoes/

Painel de tarefas, rotinas, prazos e manual de operações para uma analista de operações
acadêmicas. Um arquivo HTML, sem build, sem dependências, sem servidor e sem login — os
dados ficam no navegador de quem usa (`localStorage`).

📖 **Guia de uso completo:** [LEIA-ME.md](LEIA-ME.md)

## O que tem

- Quadro em 5 colunas com arrastar (Pointer Events — funciona no mouse e no toque)
- Prazos, estimativa, tempo trabalhado com cronômetro e carga do dia vs. capacidade
- Rotinas recorrentes que viram tarefa sozinhas no dia certo
- Avisos de atraso, vencimento e lembretes marcados, com resumo diário
- Manual de operações com dois modos de leitura: *rápido* (checklist) e *passo a passo*
  (com explicação, para quem está começando)
- Recursos opcionais de IA (chave da API Anthropic, informada pela usuária no próprio painel)
- Tema claro/escuro, responsivo, instalável como app no celular

## Rodando local

Abra `index.html` no navegador. Não precisa de servidor.

## Testes

```bash
node testes.mjs
```

70 testes cobrindo datas, ordenação, movimentação entre colunas, rotinas, priorização,
avisos e o manual. O harness extrai o `<script>` do HTML e roda num DOM simulado.

## Privacidade

Nenhum dado sai do navegador. Não há backend, banco, analytics ou telemetria. A chave da
API, se configurada, fica só no `localStorage` e é usada apenas em chamadas diretas à API
da Anthropic.

O logo PUCPR / Grupo Marista é usado para identificação visual de uma ferramenta interna de
trabalho; não é um produto oficial da universidade.
