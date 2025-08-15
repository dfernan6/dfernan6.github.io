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

//#7DaysOfCode - Lógica JS 2/7: 👩🏽‍💻 Variáveis

async function cadastro() {
  const seltabCadastro = document.getElementById("seltabCadastro");
  seltabCadastro.innerHTML = ""; // limpa antes de adicionar novo conteúdo
  let resumo = "";

  const nome = await showPrompt("Qual o seu nome?");
  resumo += `<p>👤 Nome: <strong>${nome}</strong></p>`;
  seltabCadastro.innerHTML = resumo;

  const idade = await showPrompt("Quantos anos você tem?");
  resumo += `<p>🎂 Idade: <strong>${idade}</strong></p>`;
  seltabCadastro.innerHTML = resumo;

  const linguagem = await showPrompt("Qual linguagem de programação você está estudando?");
  resumo += `<p>💻 Estudando: <strong>${linguagem}</strong></p>`;
  seltabCadastro.innerHTML = resumo;

  const reply = await showPrompt(`Você gosta de estudar ${linguagem}?`);
  if (reply.toLowerCase() === 'sim') {
    resumo += `<p>✅ Muito bom! Continue estudando e você terá muito sucesso.</p>`;
  } else if (reply.toLowerCase() === 'não') {
    resumo += `<p>😕 Ahh que pena... Em breve você encontrará algo que goste!</p>`;
  }
  seltabCadastro.innerHTML = resumo;

  resumo += await decisao(linguagem, seltabCadastro);
  resumo += await especialidade(nome, seltabCadastro);

  seltabCadastro.innerHTML = resumo;
  localStorage.setItem("seltabCadastro", resumo);
}

//#7DaysOfCode - Lógica JS 3/7: Fluxo de decisão

async function decisao(linguagem, seltabCadastro) {
  let resultado = "";

  const msg = await showPrompt(`Você que estuda ${linguagem}, quer seguir para qual área?\nFront-end (1) ou Back-end (2)`);
  resultado += `<p>🧭 Escolha de área: ${msg === '1' ? 'Front-end' : msg === '2' ? 'Back-end' : 'Indefinida'}</p>`;
  seltabCadastro.innerHTML += resultado;

  if (msg === '1') {
    const reply2 = await showPrompt(`Além de seu foco em front-end, qual linguagem você quer aprender?\nReact (1) ou Vue (2)`);
    if (reply2 === '1') {
      resultado += `<p>⚛️ React é uma ótima escolha para front-end.</p>`;
    } else if (reply2 === '2') {
      resultado += `<p>🖼️ Vue é uma ótima escolha para front-end.</p>`;
    }
  } else if (msg === '2') {
    const reply2 = await showPrompt(`Além de seu foco em back-end, qual linguagem você quer aprender?\nC# (1) ou Java (2)`);
    if (reply2 === '1') {
      resultado += `<p>🔧 C# é uma ótima escolha para back-end.</p>`;
    } else if (reply2 === '2') {
      resultado += `<p>☕ Java é uma ótima escolha para back-end.</p>`;
    }
  }

  seltabCadastro.innerHTML += resultado;
  return resultado;
}

async function especialidade(nome, seltabCadastro) {
  let resultado = "";

  const msg2 = await showPrompt(`E você ${nome}, gostaria de seguir se especializando na área escolhida ou se tornar Fullstack?\nÁrea escolhida (1) ou Full-stack (2)`);
  const area = msg2 === '1' ? "Área escolhida" : msg2 === '2' ? "Full-stack" : "Indefinida";
  resultado += `<p>🎯 Especialização: <strong>${area}</strong></p>`;
  seltabCadastro.innerHTML += resultado;

  const quantidadeStr = await showPrompt(`Quantas tecnologias são essenciais para ${area}?`);
  const quantidade = Number(quantidadeStr);
  resultado += `<p>📊 Quantidade de tecnologias: ${quantidade}</p>`;
  seltabCadastro.innerHTML += resultado;

  let tecnologias = [];
  for (let i = 0; i < quantidade; i++) {
    const msg3 = await showPrompt(`Quais tecnologias?`);
    tecnologias.push(msg3);
    resultado += `<p>🔹 Tecnologia ${i + 1}: ${msg3}</p>`;
    seltabCadastro.innerHTML += `<p>🔹 Tecnologia ${i + 1}: ${msg3}</p>`;
  }

  resultado += `<p>🧠 Tecnologias essenciais para <strong>${area}</strong>: ${tecnologias.join(", ")}.</p>`;
  seltabCadastro.innerHTML += resultado;

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
  }
}
let listaVisivel = false;

async function compras() {
  const mensagem = document.getElementById("seltab");
  const listaContainer = document.getElementById("seltabCompras");

  let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];

  function salvarLista() {
    localStorage.setItem("listaCompras", JSON.stringify(lista));
  }


 const gerarListaHTML = () => {
  if (lista.length === 0) {
    return `
      <h5 class="fw-bold text-primary mb-3">🛍️ Lista Final de Compras</h5>
      <p class="text-muted">📭 Lista vazia. Adicione itens com o botão abaixo.</p>
      <button class="btn btn-sm btn-success mt-2" id="btnAdicionarItem">➕ Adicionar item</button>
    `;
  }

  return `
    <h5 class="fw-bold text-primary mb-3">🛍️ Lista Final de Compras</h5>
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
      listaContainer.innerHTML = ""; // Esconde a lista
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

function calculadora(){
  var calculo = prompt(`Simblos de cálculo: + - / *!: Cancelar pressione x`);
  

 switch (calculo) {
    case "+":
        var a = Number(prompt(`Digite o primeiro número!`));
        var b = Number(prompt(`Digite o segundo número!`));
        console.log(somar(a,b))
        break;
    case "-":
        var a = Number(prompt(`Digite o primeiro número!`));
        var b = Number(prompt(`Digite o segundo número!`));
        console.log(subtrair(a,b))
        break;
    case "*":
        var a = Number(prompt(`Digite o primeiro número!`));
        var b = Number(prompt(`Digite o segundo número!`));
        console.log(multiplicar(a,b))
        break;
    case "/":
        var a = Number(prompt(`Digite o primeiro número!`));
        var b = Number(prompt(`Digite o segundo número!`));
        console.log(dividir(a,b))
        break;
    case "x":
        break;
    default:
        alert(`Símbolo incorreto!Favor realize o cálculo novamente!`);
        calculadora();
    }
}


function somar(a,b){
     return a + b;
}

function subtrair(a,b){
    return a - b;
}

function multiplicar(a,b){
    return a * b;
}

function dividir(a,b){
    return a / b;
}