import { useState } from "react";
import Pagina from "../template/Pagina";

export default function ImagemAleatoria() {
    const [pesquisa, setPesquisa] = useState(" ");
    const urlBase = "https://source.unsplash.com/featured/300x300?";

    function urlImagem() {
        return `${urlBase}${pesquisa}`;
    }

    function renderizarBotao(valor: string) {
        return (
            <button
                className="bg-blue-500 px-4 py-2 rounded-md"
                onClick={() => setPesquisa(valor)}
            >
                {valor}
            </button>
        );
    }

    return (
            <Pagina>
                <div className="flex flex-col gap-3 items-center">
                    <img
                        key={pesquisa} // força re-render da imagem ao mudar de pesquisa
                        src={urlImagem()}
                        alt={`Imagem relacionada a ${pesquisa}`}
                        className="rounded-md shadow-md"
                />
                <div className="flex gap-2">
                   {renderizarBotao("abstract")}
                   {renderizarBotao("city")}
                   {renderizarBotao("person")}
                </div>
            </div>
        </Pagina>
    );
}