function mudaFoto(foto){
    document.getElementById("iIcone").src = foto;
}

const botoes = document.querySelectorAll(".skills");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
    const texto = botao.nextElementSibling;
    texto.style.display = texto.style.display === "block" ? "none" : "block";
    });
});
