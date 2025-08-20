document.getElementById("seltab").style.display = "none";
document.getElementById("seltab").focus();

function mostrarSeltab() {
  const seltab = document.getElementById("seltab");
  seltab.style.display = "block";
  seltab.classList.remove("zoom-in");
  void seltab.offsetWidth; // reinicia animação
  seltab.classList.add("zoom-in");
    seltab.setAttribute("tabindex", "-1");
  seltab.focus();
}

let promptCallback = null;

async function showPrompt(pergunta) {
  return new Promise(resolve => {
    const modal = new bootstrap.Modal(document.getElementById("promptModal"));
    const perguntaEl = document.getElementById("promptQuestion");
    const inputEl = document.getElementById("promptInput");
    const botaoConfirmar = document.querySelector("#promptModal .btn-primary");

    // Resetar input e botão
    inputEl.style.display = "block";
    inputEl.value = "";
    perguntaEl.innerHTML = pergunta;
    botaoConfirmar.textContent = "Confirmar";

    // Remover qualquer evento anterior
    botaoConfirmar.onclick = null;

    // Adicionar novo evento
    botaoConfirmar.onclick = () => {
      const resposta = inputEl.value.trim();
      modal.hide();
      resolve(resposta);
    };

    modal.show();
    function atribuirEventosRemocao() {
  const removerBtns = document.querySelectorAll(".btn-remover");
  removerBtns.forEach(btn => {
    btn.onclick = () => {
      const index = parseInt(btn.getAttribute("data-index"));
      const removido = lista.splice(index, 1)[0];

      // Atualiza o conteúdo do modal
      document.getElementById("promptQuestion").innerHTML = gerarListaHTML();

      // Reatribui os eventos após atualizar o HTML
      atribuirEventosRemocao();
    };
  });
}
    // Aguarda o modal abrir e então atribui os eventos
setTimeout(() => {
  atribuirEventosRemocao();
}, 300); // Delay pequeno para garantir que os elementos estejam no DOM

  });
}

function submitPrompt() {
  const value = document.getElementById("promptInput").value;
  if (promptCallback) promptCallback(value);
  const modalEl = document.getElementById("promptModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}

function fecharCadastro() {
  const seltab = document.getElementById("seltab");
  seltab.style.display = "none";
}

function cancelarCadastro() {
  const seltab = document.getElementById("seltab");
  seltab.innerHTML = `<p class="text-warning fw-bold">⚠️ Cadastro cancelado pelo usuário.</p>`;
  localStorage.removeItem("seltab");
}

function verificarCancelamento(resposta) {
  const valor = resposta.trim().toLowerCase();
  return valor === "x" || valor === "cancelar";
}

function mostrarCadastro() {
  const seltab = document.getElementById("seltab");
  const cadastroSalvo = localStorage.getItem("seltab");

  const estiloAtual = window.getComputedStyle(seltab).display;

  if (estiloAtual === "none") {
    mostrarSeltab();
    seltab.innerHTML = cadastroSalvo || "<p>Nenhum cadastro salvo.</p>";
  } else {
    seltab.style.display = "none";
  }
}


//#7DaysOfCode - Lógica JS 2/7: 👩🏽‍💻 Variáveis

async function cadastro() {
  const seltab = document.getElementById("seltab");
  mostrarSeltab();

  let resumo = "";

  // 🔁 Validação do nome (não pode ser número ou vazio)
  let nome = "";
  while (true) {
    nome = await showPrompt("Qual o seu nome? (Digite 'x' para cancelar)");
    if (verificarCancelamento(nome)) return cancelarCadastro();
    if (nome.trim() !== "" && isNaN(nome)) break;

    seltab.innerHTML += `<p class="text-danger fw-bold">❌ Nome inválido. Digite um nome com letras.</p>`;
  }
  resumo += `<p>👤 Nome: <strong>${nome}</strong></p>`;
  seltab.innerHTML = resumo;

  // 🔁 Validação da idade (deve ser número positivo)
  let idade = "";
  while (true) {
    idade = await showPrompt("Quantos anos você tem? (Digite 'x' para cancelar)");
    if (verificarCancelamento(idade)) return cancelarCadastro();
    const idadeNum = Number(idade);
    if (!isNaN(idadeNum) && idadeNum > 0) {
      idade = idadeNum;
      break;
    }

    seltab.innerHTML += `<p class="text-danger fw-bold">❌ Idade inválida. Digite um número maior que zero.</p>`;
  }
  resumo += `<p>🎂 Idade: <strong>${idade}</strong></p>`;
  seltab.innerHTML = resumo;

  // 🔁 Validação da linguagem (não pode ser vazio)
  let linguagem = "";
  while (true) {
    linguagem = await showPrompt("Qual linguagem de programação você está estudando? (Digite 'x' para cancelar)");
    if (verificarCancelamento(linguagem)) return cancelarCadastro();
    if (linguagem.trim() !== "") break;

    seltab.innerHTML += `<p class="text-danger fw-bold">❌ Linguagem inválida. Digite um nome válido.</p>`;
  }
  resumo += `<p>💻 Estudando: <strong>${linguagem}</strong></p>`;
  seltab.innerHTML = resumo;

  // 🔁 Validação de resposta Sim ou Não
  let reply = "";
  while (true) {
    reply = await showPrompt(`Você gosta de estudar ${linguagem}? (Digite 'x' para cancelar)`);
    if (verificarCancelamento(reply)) return cancelarCadastro();
    const resposta = reply.trim().toLowerCase();
    if (resposta === "sim" || resposta === "não") break;

    seltab.innerHTML += `<p class="text-danger fw-bold">❌ Resposta inválida. Digite "Sim" ou "Não".</p>`;
  }

  if (reply.toLowerCase() === 'sim') {
    resumo += `<p>✅ Muito bom! Continue estudando e você terá muito sucesso.</p>`;
  } else {
    resumo += `<p>😕 Ahh que pena... Em breve você encontrará algo que goste!</p>`;
  }
  seltab.innerHTML = resumo;

  // Continua com as funções já validadas
  const resultadoDecisao = await decisao(linguagem, seltab);
  if (verificarCancelamento(resultadoDecisao)) return cancelarCadastro();
  resumo += resultadoDecisao;

  const resultadoEspecialidade = await especialidade(nome, seltab);
  if (verificarCancelamento(resultadoEspecialidade)) return cancelarCadastro();
  resumo += resultadoEspecialidade;

  seltab.innerHTML = resumo;
  localStorage.setItem("seltab", resumo);
}

//#7DaysOfCode - Lógica JS 3/7: Fluxo de decisão

async function decisao(linguagem, seltab) {
  let resultado = "";
  let msg = "";

  // 🔁 Loop até resposta válida
  while (true) {
    msg = await showPrompt(`Você que estuda ${linguagem}, quer seguir para qual área?\nFront-end (1) ou Back-end (2)\n(Digite 'x' para cancelar)`);
    if (verificarCancelamento(msg)) return "x";
    if (msg === '1' || msg === '2') break;

    seltab.innerHTML += `<p class="text-danger fw-bold">❌ Resposta inválida. Digite "1" para Front-end ou "2" para Back-end.</p>`;
  }

  resultado += `<p>🧭 Escolha de área: ${msg === '1' ? 'Front-end' : 'Back-end'}</p>`;
  seltab.innerHTML += resultado;

  let reply2 = "";

  if (msg === '1') {
    while (true) {
      reply2 = await showPrompt(`Além de seu foco em front-end, qual linguagem você quer aprender?\nReact (1) ou Vue (2)\n(Digite 'x' para cancelar)`);
      if (verificarCancelamento(reply2)) return "x";
      if (reply2 === '1' || reply2 === '2') break;

      seltab.innerHTML += `<p class="text-danger fw-bold">❌ Resposta inválida. Digite "1" para React ou "2" para Vue.</p>`;
    }

    resultado += reply2 === '1'
      ? `<p>⚛️ React é uma ótima escolha para front-end.</p>`
      : `<p>🖼️ Vue é uma ótima escolha para front-end.</p>`;
  }

  if (msg === '2') {
    while (true) {
      reply2 = await showPrompt(`Além de seu foco em back-end, qual linguagem você quer aprender?\nC# (1) ou Java (2)\n(Digite 'x' para cancelar)`);
      if (verificarCancelamento(reply2)) return "x";
      if (reply2 === '1' || reply2 === '2') break;

      seltab.innerHTML += `<p class="text-danger fw-bold">❌ Resposta inválida. Digite "1" para C# ou "2" para Java.</p>`;
    }

    resultado += reply2 === '1'
      ? `<p>🔧 C# é uma ótima escolha para back-end.</p>`
      : `<p>☕ Java é uma ótima escolha para back-end.</p>`;
  }

  seltab.innerHTML += resultado;
  return resultado;
}

async function especialidade(nome, seltab) {
  let resultado = "";
  let msg2 = "";

  // 🔁 Validação da escolha de especialização
  while (true) {
    msg2 = await showPrompt(`E você ${nome}, gostaria de seguir se especializando na área escolhida ou se tornar Fullstack?\nÁrea escolhida (1) ou Full-stack (2)\n(Digite 'x' para cancelar)`);
    if (verificarCancelamento(msg2)) return "x";
    if (msg2 === '1' || msg2 === '2') break;

    seltab.innerHTML += `<p class="text-danger fw-bold">❌ Resposta inválida. Digite "1" para Área escolhida ou "2" para Full-stack.</p>`;
  }

  const area = msg2 === '1' ? "Área escolhida" : "Full-stack";
  resultado += `<p>🎯 Especialização: <strong>${area}</strong></p>`;
  seltab.innerHTML += resultado;

  let quantidadeStr = "";
  let quantidade = 0;

  // 🔁 Validação da quantidade de tecnologias
  while (true) {
    quantidadeStr = await showPrompt(`Quantas tecnologias são essenciais para ${area}?\n(Digite 'x' para cancelar)`);
    if (verificarCancelamento(quantidadeStr)) return "x";

    quantidade = Number(quantidadeStr);
    if (!isNaN(quantidade) && quantidade > 0) break;

    seltab.innerHTML += `<p class="text-danger fw-bold">❌ Resposta inválida. Digite um número válido maior que zero.</p>`;
  }

  resultado += `<p>📊 Quantidade de tecnologias: ${quantidade}</p>`;
  seltab.innerHTML += resultado;

  let tecnologias = [];

  // 🔁 Validação de cada tecnologia
  for (let i = 0; i < quantidade; i++) {
    let msg3 = "";

    while (true) {
      msg3 = await showPrompt(`Quais tecnologias? (${i + 1} de ${quantidade})\n(Digite 'x' para cancelar)`);
      if (verificarCancelamento(msg3)) return "x";
      if (msg3.trim() !== "") break;

      seltab.innerHTML += `<p class="text-danger fw-bold">❌ Resposta inválida. Digite o nome da tecnologia.</p>`;
    }

    tecnologias.push(msg3);
    resultado += `<p>🔹 Tecnologia ${i + 1}: ${msg3}</p>`;
    seltab.innerHTML += `<p>🔹 Tecnologia ${i + 1}: ${msg3}</p>`;
  }

  resultado += `<p>🧠 Tecnologias essenciais para <strong>${area}</strong>: ${tecnologias.join(", ")}.</p>`;
  seltab.innerHTML += resultado;

  return resultado;
}
//#7DaysOfCode - Lógica JS 5/7: Arrays e coleções

async function obterRespostaSimOuNao(pergunta) {
  const mensagem = document.getElementById("seltab");
  let resposta = "";

  while (true) {
    resposta = await showPrompt(pergunta);
    const respostaNormalizada = resposta.trim().toLowerCase();

    if (respostaNormalizada === "sim" || respostaNormalizada === "não") {
      mensagem.innerHTML = ""; // Limpa mensagem de erro anterior
      return respostaNormalizada;
    }

    mensagem.innerHTML = `<p class="text-danger fw-bold">❌ Opção inválida. Por favor, responda "Sim" ou "Não".</p>`;
    localStorage.setItem("seltab", resumo);
  }
}

let listaVisivel = false;

async function produtos() {
  const mensagem = document.getElementById("seltab");
  const listaContainer = document.getElementById("seltab");
  mostrarSeltab();

  let lista = JSON.parse(localStorage.getItem("listaProdutos")) || [];

  function salvarLista() {
    localStorage.setItem("listaProdutos", JSON.stringify(lista));
  }


 const gerarListaHTML = () => {
  if (lista.length === 0) {
    return `
      <h5 class="fw-bold text-primary mb-3">🛍️ Lista Final de produtos</h5>
      <p class="text-muted">📭 Lista vazia. Adicione itens com o botão abaixo.</p>
      <button class="btn btn-sm btn-success mt-2" id="btnAdicionarItem">➕ Adicionar item</button>
    `;
  }

  return `
    <h5 class="fw-bold text-primary mb-3">🛍️ Lista Final de produtos</h5>
    <ul class="list-group">
      ${lista.map((item, index) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div class="text-start">
            <span class="fw-semibold text-dark">${index + 1}. ${item.nome}</span><br>
            <small class="text-muted">${item.categoria}</small>
          </div>
          <button class="btn btn-sm btn-outline-danger btn-remover" data-index="${index}">🗑️</button>
        </li>
      `).join("")}
    </ul>
    <button class="btn btn-sm btn-success mt-3" id="btnAdicionarItem">➕ Adicionar item</button>
  `;
};

function atribuirEventoAdicionarItem() {
  const btnAdicionar = document.getElementById("btnAdicionarItem");
  if (btnAdicionar) {
    btnAdicionar.onclick = async () => {
      const nome = await showPrompt("Qual produto deseja adicionar?");
      const categoria = await showPrompt("Qual anotação? Ex: Quantidade, Kilos, Tipo, etc...");
      lista.push({ nome, categoria });
      salvarLista();
      imprimirLista(); // Atualiza a lista após adicionar
    };
  }
}


  function imprimirLista() {
    if (listaVisivel) {
      listaContainer.innerHTML = gerarListaHTML();
      atribuirEventosRemocao();
      atribuirEventoAdicionarItem();
    } else {
      document.getElementById("seltab").style.display = "none"; // Esconde a lista
    }
  }

  function atribuirEventosRemocao() {
    const removerBtns = document.querySelectorAll(".btn-remover");
    removerBtns.forEach(btn => {
      btn.onclick = () => {
        const index = parseInt(btn.getAttribute("data-index"));
        const removido = lista.splice(index, 1)[0];
        salvarLista();
        mensagem.innerHTML = `<p class="text-success fw-bold">✅ Produto "${removido.nome}" removido com sucesso!</p>`;
        imprimirLista();
      };
    });
  }

  // Alterna o estado da visibilidade
  listaVisivel = !listaVisivel;
  imprimirLista();
  
}
//#7DaysOfCode - Lógica JS 7/7: Funções em Javascript

function calculadora() {
  const div = document.getElementById("seltab");
  mostrarSeltab();
  div.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <strong>🤖 Calculadora estilo chat</strong>
      <button class="btn btn-sm btn-danger" onclick="fecharCalculadora()">✖</button>
    </div>
    <p>Digite sua operação (ex: <code>8 + 2</code>) e pressione "Enter":</p>
    <input type="text" id="inputCalc" class="form-control mt-2" placeholder="Ex: 10 / 2" onkeydown="if(event.key==='Enter') enviarCalc()" autofocus>
    <div id="chatCalc" class="mt-3 text-start"></div>
    <div class="text-end mt-2">
      <button class="btn btn-sm btn-outline-secondary" onclick="limparCalc()">🧹 Limpar</button>
    </div>
  `;

  // ✅ Torna o chat visível após criar
  setTimeout(() => {
    const chat = document.getElementById("chatCalc");
    if (chat) chat.style.display = "block";
  }, 0);
}

function fecharCalculadora() {
  document.getElementById("seltab").style.display = "none";
}

function limparCalc() {
  const chat = document.getElementById("chatCalc");
  chat.innerHTML = `<p class="text-muted">💬 Chat limpo.</p>`;
  chat.style.display = "block"; // ← garante que fique visível
  document.getElementById("inputCalc").value = "";
  document.getElementById("inputCalc").focus();
}

function enviarCalc() {
  const input = document.getElementById("inputCalc");
  const valor = input.value.trim();
  const chat = document.getElementById("chatCalc");

  chat.style.display = "block";

  // ✅ Remove o aviso "Chat limpo." se for o único conteúdo
  if (chat.innerHTML.includes("💬 Chat limpo.")) {
    chat.innerHTML = "";
  }

  const regex = /^(-?\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(-?\d+(?:\.\d+)?)$/;
  const match = valor.match(regex);

  if (!match) {
    chat.innerHTML += `<p>❌ <em>Entrada inválida.</em> Use o formato: <code>número operador número</code></p>`;
    input.value = "";
    return;
  }

  const num1 = parseFloat(match[1]);
  const operador = match[2];
  const num2 = parseFloat(match[3]);

  let resultado;
  switch (operador) {
    case "+": resultado = num1 + num2; break;
    case "-": resultado = num1 - num2; break;
    case "*": resultado = num1 * num2; break;
    case "/": resultado = num2 === 0 ? "🚫 Erro: divisão por zero!" : num1 / num2; break;
  }

  chat.innerHTML += `
    <p>🧮 <strong>Você:</strong> ${num1} ${operador} ${num2}</p>
    <p>✅ <strong>Resultado:</strong> ${resultado}</p>
  `;

  input.value = "";
}

let estadoAtual = ""; // "" | "cadastro" | "sorteio"

function mostrarCadastro() {
  const seltab = document.getElementById("seltab");
  const cadastroSalvo = localStorage.getItem("seltab");

  if (estadoAtual !== "cadastro") {
    mostrarSeltab();
    seltab.innerHTML = cadastroSalvo || "<p>Nenhum cadastro salvo.</p>";
    estadoAtual = "cadastro";
  } else {
    seltab.style.display = "none";
    estadoAtual = "";
  }
}

function sorteio() {
  const seltab = document.getElementById("seltab");

  if (estadoAtual !== "sorteio") {
    mostrarSeltab();
    seltab.innerHTML = `
      <p><strong>🎲 Sorteio de Números</strong></p>
      <div class="d-flex flex-wrap gap-2 mb-2">
        <div>
          <label for="min" class="form-label mb-1">Min</label>
          <input type="number" id="min" class="form-control form-control-sm" style="width: 80px;">
        </div>
        <div>
          <label for="max" class="form-label mb-1">Max</label>
          <input type="number" id="max" class="form-control form-control-sm" style="width: 80px;">
        </div>
        <div>
          <label for="qtd" class="form-label mb-1">Qtd</label>
          <input type="number" id="qtd" class="form-control form-control-sm" style="width: 80px;">
        </div>
        <div>
          <label for="escolhido" class="form-label mb-1">Sorte</label>
          <input type="number" id="escolhido" class="form-control form-control-sm" style="width: 80px;">
        </div>
        <div class="align-self-end">
          <button onclick="executarSorteio()" class="btn btn-success btn-sm">Sortear 🎯</button>
        </div>
      </div>
      <div id="resultadoSorteio" class="mt-3"></div>
    `;
    estadoAtual = "sorteio";
  } else {
    seltab.style.display = "none";
    estadoAtual = "";
  }
}

function executarSorteio() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const qtd = parseInt(document.getElementById("qtd").value);
  const escolhido = parseInt(document.getElementById("escolhido").value);
  const resultadoDiv = document.getElementById("resultadoSorteio");

  if (isNaN(min) || isNaN(max) || isNaN(qtd)) {
    resultadoDiv.innerHTML = `<p class="text-danger">❌ Preencha os campos mínimo, máximo e quantidade.</p>`;
    return;
  }

  if (min >= max) {
    resultadoDiv.innerHTML = `<p class="text-danger">⚠️ O número mínimo deve ser menor que o máximo.</p>`;
    return;
  }

  if (qtd > (max - min + 1)) {
    resultadoDiv.innerHTML = `<p class="text-danger">🚫 Quantidade maior que o intervalo disponível.</p>`;
    return;
  }

  const numeros = [];
  while (numeros.length < qtd) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numeros.includes(n)) {
      numeros.push(n);
    }
  }

  let destaque = "";
  let vibrar = false;

  const badges = numeros.map(n => {
    if (!isNaN(escolhido) && n === escolhido) {
      destaque = `<p class="text-success mt-3">🎉 Parabéns! Seu número da sorte <strong>${escolhido}</strong> foi sorteado!</p>`;
      vibrar = true;
      return `<span class="badge bg-warning text-dark fs-5 pulse">${n}</span>`;
    }
    return `<span class="badge bg-primary fs-5">${n}</span>`;
  });

  if (!isNaN(escolhido) && escolhido < min || escolhido > max) {
    destaque = `<p class="text-warning mt-3">⚠️ Seu número da sorte está fora do intervalo definido.</p>`;
  } else if (!numeros.includes(escolhido) && !destaque) {
    destaque = `<p class="text-muted mt-3">😕 Seu número da sorte <strong>${escolhido}</strong> não foi sorteado desta vez.</p>`;
  }

  resultadoDiv.innerHTML = `
    <p class="text-success">✅ Números sorteados:</p>
    <div class="d-flex flex-wrap gap-2">
      ${badges.join("")}
    </div>
    ${destaque}
  `;

  if (vibrar && "vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]); // vibra duas vezes
  }
}

