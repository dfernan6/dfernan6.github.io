function mudaFoto(foto){
    document.getElementById("iIcone").src = foto;
}

const botoes = document.querySelectorAll(".skills");

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    // Encontra o próximo .textoOculto após o botão
    let proximo = botao.nextElementSibling;

    while (proximo && !proximo.classList.contains("textoOculto")) {
      proximo = proximo.nextElementSibling;
    }

    // Alterna visibilidade do texto
    if (proximo) {
      const visivel = proximo.style.display === "block";
      proximo.style.display = visivel ? "none" : "block";

      // Alterna a seta dentro do botão
      const seta = botao.querySelector(".arrow");
      if (seta) {
        seta.textContent = visivel ? "◀" : "▼" ;
        seta.classList.toggle("active", !visivel);
      }
    }
  });
});

  const itensMenu = document.querySelectorAll("nav#iMenu li");

  itensMenu.forEach(item => {
    item.addEventListener("click", () => {
      // Remove a classe 'ativo' de todos os itens
      itensMenu.forEach(i => i.classList.remove("ativo"));
      
      // Adiciona a classe 'ativo' ao item clicado
      item.classList.add("ativo");
    });
  });
