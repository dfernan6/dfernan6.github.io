function mudaFoto(foto){
    document.getElementById("iIcone").src = foto;
}

const botoes = document.querySelectorAll(".skills");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        // Encontra o próximo .textoOculto após o botão
        let proximo = botao.nextElementSibling;

        // Percorre os próximos irmãos até achar o .textoOculto
        while (proximo && !proximo.classList.contains("textoOculto")) {
            proximo = proximo.nextElementSibling;
        }

        // Se encontrou, alterna a visibilidade
        if (proximo) {
            proximo.style.display = proximo.style.display === "block" ? "none" : "block";
        }
    });
});

