# Fluxo — Painel de Operações Acadêmicas

Painel de tarefas e rotinas feito para a Gabriela. Não precisa instalar nada e não tem login.

## Como abrir

**No ar (recomendado):** https://loocawtech-bot.github.io/fluxo-operacoes/

Abre no computador e no celular. Vale a pena **favoritar** e, no computador, deixar a aba
fixada (botão direito na aba → *Fixar*).

**No celular, dá para instalar como aplicativo:** abra o endereço no Chrome, toque no menu
`⋮` e escolha *Adicionar à tela inicial* / *Instalar app*. Ele passa a abrir em tela cheia,
com ícone próprio, como qualquer outro app.

**Sem internet:** o arquivo `index.html` também funciona sozinho — dois cliques e pronto.
Só que aí o navegador **não deixa** mostrar os avisos na área de trabalho (essa permissão
só existe em endereços seguros, `https://`). Para ter os avisos, use o endereço acima.

---

## Onde ficam os dados

Tudo fica salvo **no seu próprio navegador** — nada sai dali. Não existe servidor, banco de
dados nem login por trás: o site publicado é só o arquivo, e quem abrir o endereço vê um
painel vazio, não o seu.

Isso quer dizer três coisas:

- Se você limpar os dados do navegador, o painel volta do zero.
- **Cada aparelho tem seus próprios dados.** O que você fizer no computador não aparece no
  celular, e vice-versa. Escolha um como principal.
- Abrir pelo endereço `https://` e abrir o arquivo local são, para o navegador, dois lugares
  diferentes — cada um com seus dados.

Por isso, de vez em quando use **⚙ → Exportar backup**. Sai um arquivo `.json` que você
guarda onde quiser; para restaurar (ou levar para outro aparelho), é **Importar backup**.

---

## O básico

**As cinco colunas**

| Coluna | Para que serve |
|---|---|
| Entrada | Tudo que chegou e ainda não foi decidido |
| Hoje | O que você se comprometeu a fazer hoje |
| Em execução | O que está na sua mão agora |
| Aguardando | Parado esperando terceiros (coordenação, aluno, outro setor) |
| Concluído | Feito |

**No celular**, as colunas aparecem uma de cada vez: deslize para o lado para trocar. Os
botões do topo ficam no menu **☰**.

**Mexendo nas tarefas**

- **Arrastar**: segure o cartão e leve para outra coluna ou outra posição. No celular ou
  tablet, toque e segure um instante antes de arrastar (assim não confunde com rolar a tela).
- **Criar rápido**: escreva no "+ nova tarefa" no rodapé da coluna e aperte Enter.
- **Renomear sem abrir nada**: dois cliques no título do cartão.
- **Abrir os detalhes**: um clique no cartão.

**Atalhos de teclado**

| Tecla | Faz |
|---|---|
| `/` | Vai para a busca |
| `n` | Nova tarefa em "Hoje" |
| `m` | Abre o Manual de operações |
| `p` | Priorizar meu dia |
| `f` | Encerra o cronômetro de foco |
| `Esc` | Fecha o que estiver aberto |

---

## Prazos e tempo

- **Barra de carga do dia**: soma as estimativas do que está em "Hoje" e "Em execução" e
  compara com a sua capacidade (padrão 6h, ajustável em ⚙). Quando passa, a barra fica laranja —
  é o sinal de que o dia está prometido demais.
- **Faixa da semana**: os próximos 7 dias com quantas tarefas vencem em cada um. Clique num
  dia para filtrar só o que vence nele.
- **Foco**: o botão ▶ no canto do cartão liga um cronômetro. Ao parar, o tempo é somado ao
  "tempo trabalhado" da tarefa — útil para descobrir quanto as coisas realmente levam.

---

## Avisos e lembretes 🔔

O sino no topo junta tudo que precisa da sua atenção:

- tarefas **atrasadas**;
- o que **vence hoje** (e com quantos dias de antecedência você quiser — ⚙);
- **lembretes** que você mesma marcou;
- um **resumo do dia** no horário que você escolher (padrão 8h30).

Dentro de cada tarefa há o campo **"Lembrar-me em"**, com atalhos: *Hoje 17h*, *Amanhã 9h*,
*Véspera do prazo 9h*, *No dia do prazo 8h*.

**Para receber os avisos na área de trabalho** (a caixinha do Windows, mesmo com o painel
minimizado): vá em **⚙ → Ativar avisos na área de trabalho** e autorize quando o navegador
perguntar. Isso só funciona pelo endereço `https://` — abrindo o arquivo local, o navegador
não oferece a permissão.

> ⚠️ **Importante:** os avisos só chegam **com o painel aberto** — ele pode estar minimizado
> ou numa aba de fundo, mas precisa estar aberto. Não existe aviso com o navegador fechado,
> porque não há servidor nenhum por trás.
> A recomendação é **fixar a aba** (botão direito na aba → *Fixar*) e deixar lá o dia todo.
>
> Se o navegador bloquear os avisos, o sino aqui dentro continua funcionando normalmente.

---

## Rotinas

Coisas que se repetem não deveriam ser digitadas de novo toda vez. Em **Rotinas** você cadastra
uma vez e o painel cria a tarefa sozinho no dia certo — todo dia útil, em dias específicos da
semana, ou num dia fixo do mês.

Já vêm dois exemplos cadastrados; apague ou troque à vontade.

---

## Manual de operações 📖

O botão **📖 Manual** (ou a tecla `m`) abre o manual dos processos: como se faz cada coisa,
escrito uma vez e consultável sempre.

**A mesma página serve para dois públicos**, é só trocar o botão no topo:

- **Modo rápido** — só o checklist numerado. Para quem já faz e só quer conferir se não
  pulou nada.
- **Passo a passo** — o mesmo procedimento com a explicação de cada passo, o que conferir
  antes de começar, os sistemas usados, os erros comuns e quem procurar. É o que você
  entrega para alguém no primeiro dia.

**Do manual para o quadro:** o botão **▸ Criar tarefa a partir daqui** transforma o
procedimento numa tarefa no "Hoje", já com todos os passos virando checklist. Enquanto ela
executa, vai marcando; e o botão **📖 Manual** dentro da tarefa volta para o procedimento
se bater alguma dúvida.

**Já vêm três esboços prontos:** Prêmio Marcelino Champagnat, Ajuste acadêmico e
Formatura / colação de grau. A estrutura está montada e os passos estão lá, mas tudo que
aparece **[entre colchetes]** é conteúdo que só quem conhece o processo pode escrever —
por isso eles aparecem marcados como **esboço**, com um aviso amarelo no topo. Quando
terminar de preencher, desmarque "ainda é um esboço" e o aviso some.

**Para criar ou editar:** *+ Novo procedimento*, ou *✎ Editar* dentro de qualquer um. Os
campos de lista (antes de começar, sistemas, erros comuns, quem procurar) são um item por
linha. Nos passos dá para reordenar com ↑ ↓ e remover com ✕.

**Com a IA ligada**, dois atalhos ajudam a povoar o manual:

- **✦ Gerar com IA** — cole anotações soltas (um e-mail, um bilhete, um passo a passo mal
  escrito) e ele devolve o procedimento estruturado, já como esboço.
- **✦ Explicar para quem está começando** — preenche a explicação dos passos que ainda
  estão vazios.

Nos dois casos, o que faltar de informação vem marcado entre colchetes em vez de inventado —
e nada entra sem você aprovar.

---

## O que a IA faz

Os recursos de IA são **opcionais**. Sem configurar nada, "Priorizar meu dia" e "Estimar tempo"
já funcionam com regras locais (prazo + prioridade + o que já está em andamento).

Para ligar a IA de verdade, cole uma chave da API Anthropic em **⚙ → Chave da API**. Aí ficam
disponíveis:

| Recurso | Onde | O que faz |
|---|---|---|
| **Priorizar meu dia** | topo | Escolhe o que entra no dia sem estourar a capacidade e explica cada escolha |
| **Resumo** | topo | Escreve um status report em três blocos (entregue / em andamento / precisa de decisão), pronto para enviar |
| **Quebrar em passos** | dentro da tarefa | Vira um checklist de 3 a 7 passos |
| **Estimar tempo** | dentro da tarefa | Sugere quantos minutos aquilo leva |
| **Clarear texto** | dentro da tarefa | Reescreve o título e descreve o que é "pronto" |
| **Rascunhar e-mail** | dentro da tarefa | Monta o e-mail para coordenação, aluno ou setor |

Nada é aplicado automaticamente: a IA sempre mostra a sugestão e você decide se aceita.

**Sobre a chave:** ela fica guardada só neste navegador e é enviada apenas para a API da
Anthropic. Ainda assim, é uma chave — não use este arquivo em computador compartilhado com
a chave configurada, e prefira uma chave com limite de gasto.

---

## Exportar

- **⚙ → Exportar backup** — arquivo `.json` completo (para restaurar depois).
- **⚙ → Exportar CSV** — abre no Excel, com título, coluna, área, prioridade, prazo,
  estimativa, tempo gasto e progresso. Serve para juntar com relatório.

---

## Detalhes de construção

- HTML, CSS e JavaScript puros. Sem dependências, sem build, sem servidor.
- Cor institucional `#8A0538`, amostrada do logo oficial PUCPR / Grupo Marista
  (que está embutido no arquivo, por isso ele funciona sozinho).
- Arrastar feito com Pointer Events, não com a API de drag-and-drop do HTML5 — assim
  funciona igual em mouse, caneta e toque.
- 50 testes automatizados cobrindo datas, ordenação, movimentação entre colunas, rotinas,
  priorização e a lógica dos avisos.
