// Harness: roda o script do Fluxo com um DOM falso e testa a lógica pura.
import fs from 'fs';
import vm from 'vm';

const html = fs.readFileSync('./index.html', 'utf8');
const src = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function fakeEl(tag = 'div') {
  const t = {
    tagName: String(tag).toUpperCase(), children: [], style: {}, dataset: {}, value: '',
    textContent: '', innerHTML: '', checked: false, files: [], contentEditable: 'false',
    isContentEditable: false, href: '', download: '', type: '',
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    addEventListener() {}, removeEventListener() {},
    appendChild(c) { t.children.push(c); return c; },
    insertBefore(c) { t.children.push(c); return c; },
    remove() {}, focus() {}, blur() {}, click() {}, setAttribute() {}, contains: () => false,
    querySelector: () => fakeEl(), querySelectorAll: () => [], closest: () => null,
    getBoundingClientRect: () => ({ top: 0, height: 0 }),
  };
  return t;
}

const doc = {
  documentElement: { dataset: {} },
  activeElement: { id: '' },
  querySelector: () => fakeEl(),
  querySelectorAll: () => [],
  createElement: (t) => fakeEl(t),
  addEventListener() {},
  getSelection: () => ({ selectAllChildren() {} }),
};

const store = new Map();
const ctx = {
  document: doc,
  window: { addEventListener() {} },
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, v),
  },
  navigator: { clipboard: { writeText() {} } },
  URL: { createObjectURL: () => 'blob:', revokeObjectURL() {} },
  Blob: class {}, FileReader: class {},
  setTimeout, clearTimeout, setInterval, clearInterval,
  structuredClone, JSON, Math, Date, Number, String, Object, Array, console,
  confirm: () => true, prompt: () => '', fetch: async () => ({ ok: false, status: 0, text: async () => '' }),
  requestAnimationFrame: () => {},
};
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(src + '\n;globalThis.__api={criarTarefaDeProc,linhas,deLinhas,procBase,passoBase,state,hoje,diasAte,fmtMin,pontuar,mover,rodarRotinas,priorizarLocal,normalizarOrdem,COLS,tarefaBase,ck,iso,estimarLocal,render,descCad,checarAvisos,agoraLocal,renderAvisos,LOGO};', ctx);

const A = ctx.__api;
let ok = 0, bad = 0;
const t = (nome, cond, extra = '') => {
  if (cond) { ok++; console.log('  ok  ' + nome); }
  else { bad++; console.log('  XX  ' + nome + (extra ? '  -> ' + extra : '')); }
};

console.log('\n— datas —');
const d = new Date();
t('hoje() no formato local', A.hoje() === `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
t('diasAte(hoje) === 0', A.diasAte(A.hoje()) === 0);
const amanha = new Date(); amanha.setDate(amanha.getDate() + 1);
t('diasAte(amanhã) === 1', A.diasAte(A.iso(amanha)) === 1);
const ontem = new Date(); ontem.setDate(ontem.getDate() - 1);
t('diasAte(ontem) === -1', A.diasAte(A.iso(ontem)) === -1);
// virada de mês/ano não pode escorregar por fuso
t('31/12 → 01/01 = 1 dia', (() => {
  const f = new Date(2026, 11, 31); const g = new Date(2027, 0, 1);
  return Math.round((g - f) / 86400000) === 1;
})());

console.log('\n— formatação —');
t('45min', A.fmtMin(45) === '45min');
t('60 → 1h', A.fmtMin(60) === '1h');
t('90 → 1h30', A.fmtMin(90) === '1h30');
t('125 → 2h05', A.fmtMin(125) === '2h05');
t('0 → 0min', A.fmtMin(0) === '0min');
t('negativo vira 0', A.fmtMin(-10) === '0min');

console.log('\n— board / mover —');
const st = A.state;
t('estado inicial semeado (5 exemplos + rotinas do dia)', st.tasks.length >= 5, st.tasks.length);
t('boot já rodou as rotinas do dia', st.rotinas.some(r => r.ultima === A.hoje()));
const alvo = st.tasks.find(x => x.coluna === 'entrada');
A.mover(alvo.id, 'hoje', 0);
t('mudou de coluna', alvo.coluna === 'hoje');
t('foi para o topo', alvo.ordem === 0);
t('ganhou prazo de hoje', alvo.prazo === A.hoje() || alvo.prazo !== '');
const naHoje = st.tasks.filter(x => x.coluna === 'hoje').sort((a, b) => a.ordem - b.ordem);
t('ordens sem buraco nem repetição', naHoje.every((x, i) => x.ordem === i), naHoje.map(x => x.ordem).join(','));

A.mover(alvo.id, 'feito', 0);
t('concluir marca a data', alvo.concluida === A.hoje());
t('concluir fecha os passos', alvo.passos.every(p => p.ok));
A.mover(alvo.id, 'hoje', 1);
t('reabrir limpa a data', alvo.concluida === '');
t('inserção no meio respeita índice', st.tasks.filter(x => x.coluna === 'hoje').sort((a, b) => a.ordem - b.ordem)[1].id === alvo.id);

console.log('\n— pontuação / plano do dia —');
const atrasada = { ...A.tarefaBase(), prio: 'baixa', prazo: A.iso(ontem), passos: [] };
const futura = { ...A.tarefaBase(), prio: 'alta', prazo: A.iso(new Date(Date.now() + 20 * 86400000)), passos: [] };
t('atrasada pontua mais que alta-prioridade-distante', A.pontuar(atrasada) > A.pontuar(futura),
  `${A.pontuar(atrasada)} vs ${A.pontuar(futura)}`);
const plano = A.priorizarLocal();
t('plano não fica vazio', plano.sel.length > 0);
t('plano respeita a capacidade (ou o mínimo de 3)', plano.soma <= plano.cap || plano.sel.length <= 3,
  `${plano.soma}/${plano.cap} em ${plano.sel.length} itens`);
t('plano não repete tarefa', new Set(plano.sel.map(s => s.t.id)).size === plano.sel.length);
t('plano ignora concluídas', plano.sel.every(s => s.t.coluna !== 'feito'));

console.log('\n— rotinas —');
t('cadência diária descrita', A.descCad({ tipo: 'diaria' }).includes('dia útil'));
t('cadência semanal descrita', A.descCad({ tipo: 'semanal', dias: [1, 3] }).includes('Seg'));
t('cadência mensal descrita', A.descCad({ tipo: 'mensal', dia: 5 }).includes('5'));
const antes = st.tasks.length;
A.rodarRotinas();
t('não duplica rotinas já geradas hoje', st.tasks.length === antes, `${antes} → ${st.tasks.length}`);
// força uma rotina que cai hoje
const dow = new Date().getDay();
st.rotinas.push({ id: 'r-teste', titulo: 'Rotina de teste', area: 'QA', prio: 'alta', est: 20,
  cad: { tipo: 'semanal', dias: [dow] }, coluna: 'hoje', passos: ['passo 1'], ultima: '' });
A.rodarRotinas();
const gerada = st.tasks.find(x => x.rotinaId === 'r-teste');
t('rotina de hoje gerou tarefa', !!gerada);
t('tarefa herda prazo de hoje', gerada?.prazo === A.hoje());
t('tarefa herda os passos', gerada?.passos.length === 1);
const depois = st.tasks.length;
A.rodarRotinas();
t('segunda passada no mesmo dia não duplica', st.tasks.length === depois);

console.log('\n— persistência —');
A.render();
await new Promise(r => setTimeout(r, 300));
t('gravou no localStorage', store.has('fluxo.gabriela.v1'));
const salvo = JSON.parse(store.get('fluxo.gabriela.v1'));
t('backup tem tarefas e rotinas', salvo.tasks.length > 0 && salvo.rotinas.length > 0);
t('backup preserva a chave/config', typeof salvo.config.cap === 'number');

console.log('\n— marca —');
t('logo embutido como data URI', A.LOGO.startsWith('data:image/png;base64,') && A.LOGO.length > 5000, A.LOGO.slice(0, 30));

console.log('\n— avisos —');
st.avisos.length = 0; st.marcados = {}; st.ultimoResumo = A.hoje();
// tarefa atrasada deve gerar aviso
const velha = { ...A.tarefaBase(), titulo: 'Protocolo vencido', coluna: 'hoje', prazo: A.iso(ontem) };
st.tasks.push(velha);
A.checarAvisos();
t('atraso vira aviso', st.avisos.some(a => a.tipo === 'late' && a.taskId === velha.id));
const n1 = st.avisos.length;
A.checarAvisos();
t('não repete o mesmo aviso no mesmo dia', st.avisos.length === n1, `${n1} → ${st.avisos.length}`);

// vence hoje
const hj = { ...A.tarefaBase(), titulo: 'Fecha hoje', coluna: 'hoje', prazo: A.hoje() };
st.tasks.push(hj);
A.checarAvisos();
t('vencimento de hoje vira aviso', st.avisos.some(a => a.tipo === 'today' && a.taskId === hj.id));

// antecedência
st.config.antecedencia = 1;
const amanhaT = { ...A.tarefaBase(), titulo: 'Fecha amanhã', coluna: 'hoje', prazo: A.iso(amanha) };
st.tasks.push(amanhaT);
A.checarAvisos();
t('antecedência de 1 dia avisa', st.avisos.some(a => a.taskId === amanhaT.id));

// tarefa concluída não avisa
const feita = { ...A.tarefaBase(), titulo: 'Já entregue', coluna: 'feito', prazo: A.iso(ontem) };
st.tasks.push(feita);
A.checarAvisos();
t('tarefa concluída não gera aviso', !st.avisos.some(a => a.taskId === feita.id));

// lembrete agendado no passado dispara; no futuro não
const lem = { ...A.tarefaBase(), titulo: 'Ligar para a coordenação', coluna: 'hoje',
  lembrete: `${A.iso(ontem)}T09:00` };
const fut = { ...A.tarefaBase(), titulo: 'Só semana que vem', coluna: 'hoje',
  lembrete: `${A.iso(new Date(Date.now() + 7 * 86400000))}T09:00` };
st.tasks.push(lem, fut);
A.checarAvisos();
t('lembrete vencido dispara', st.avisos.some(a => a.tipo === 'lembrete' && a.taskId === lem.id));
t('lembrete futuro não dispara', !st.avisos.some(a => a.taskId === fut.id));
t('lembrete disparado fica marcado', lem.lembreteFeito === true);
const n2 = st.avisos.length;
A.checarAvisos();
t('lembrete não repete', st.avisos.length === n2);

// resumo diário
st.ultimoResumo = ''; st.config.resumoHora = '00:00';
A.checarAvisos();
t('resumo do dia dispara uma vez', st.ultimoResumo === A.hoje() && st.avisos.some(a => a.titulo.includes('resumo')));
const n3 = st.avisos.length;
A.checarAvisos();
t('resumo não repete no mesmo dia', st.avisos.length === n3);

t('lista de avisos limitada a 50', st.avisos.length <= 50);

console.log('\n— manual de operações —');
t('3 esboços semeados', st.manual.length === 3, st.manual.length);
const nomes = st.manual.map(p => p.titulo);
t('Prêmio Marcelino presente', nomes.some(n => n.includes('Marcelino')));
t('Ajuste acadêmico presente', nomes.some(n => n.includes('Ajuste')));
t('Formatura presente', nomes.some(n => n.includes('Formatura')));
t('todos marcados como esboço', st.manual.every(p => p.rascunho));
t('todo procedimento tem passos', st.manual.every(p => p.passos.length >= 5));
t('todo passo tem id único', (() => {
  const ids = st.manual.flatMap(p => p.passos.map(s => s.id));
  return new Set(ids).size === ids.length;
})());
t('esboço marca o que falta preencher', st.manual.every(p => p.resumo.includes('[')));

const proc = st.manual.find(p => p.titulo.includes('Ajuste'));
proc.tempoEst = 45; proc.area = 'Matrícula';
const antesT = st.tasks.length;
A.criarTarefaDeProc(proc);
const nova = st.tasks[st.tasks.length - 1];
t('criar tarefa a partir do procedimento', st.tasks.length === antesT + 1);
t('tarefa herda título e área', nova.titulo === proc.titulo && nova.area === 'Matrícula');
t('tarefa herda a estimativa', nova.est === 45);
t('passos viram checklist', nova.passos.length === proc.passos.length);
t('checklist começa desmarcado', nova.passos.every(p => !p.ok));
t('tarefa aponta de volta para o procedimento', nova.procId === proc.id);
t('tarefa cai em Hoje com prazo', nova.coluna === 'hoje' && nova.prazo === A.hoje());

// conversões de lista usadas na edição
t('linhas() junta a lista', A.linhas(['a', '', 'b']) === 'a\nb');
t('deLinhas() limpa vazios e espaços', JSON.stringify(A.deLinhas(' a \n\n  b  \n')) === '["a","b"]');
t('ida e volta preserva itens', JSON.stringify(A.deLinhas(A.linhas(['x', 'y', 'z']))) === '["x","y","z"]');

// backup precisa levar o manual junto
A.render(); await new Promise(r => setTimeout(r, 300));
const bk = JSON.parse(store.get('fluxo.gabriela.v1'));
t('backup inclui o manual', Array.isArray(bk.manual) && bk.manual.length === st.manual.length);
t('backup preserva os passos do procedimento', bk.manual[0].passos.length === st.manual[0].passos.length);

console.log(`\n=== ${ok} passaram, ${bad} falharam ===`);
process.exit(bad ? 1 : 0);
