import { useCallback, useEffect, useState } from "react"
import useProcessando from "./useProcessando"

export default function useStarWars() {
    const { processando, iniciarProcessamento, finalizarProcessamento } = useProcessando()
    const [personagens, setPersonagens] = useState<any[]>([])
    const [personagem, setPersonagem] = useState<any>([])
    const [filmes, setFilmes] = useState<any>([])

    const obterFilmes = useCallback(async function (personagem: any) {
        if(!personagem?.films?.length) return
        try {   
            iniciarProcessamento()     
            const reqs = personagem.films.map(async (film: string) => {
            const resp = await fetch(film)
            return resp.json()
        })
        const filmes = await Promise.all(reqs)
        setFilmes(filmes)
        console.log(filmes)
        }finally {
            finalizarProcessamento()
        }
    }, [iniciarProcessamento, finalizarProcessamento])

    async function simularChamadaAPI() {
        const resp = await fetch('https://swapi.py4e.com/api/people/')
        const dados = await resp.json()
        setPersonagens(dados.results)
    }

    const obterPersonagens = useCallback(async function () {
        try {
        iniciarProcessamento()
        await simularChamadaAPI()
    } finally {
        finalizarProcessamento()
    }
}, [iniciarProcessamento, finalizarProcessamento])

   function selecionarPersonagem(personagem: any) {
    setPersonagem(personagem)
   } 

   function voltar() {
    setPersonagem(null)
    setFilmes([])
   }

    useEffect(() => {
        obterPersonagens()
    }, [obterPersonagens])

    useEffect(() => {
        obterFilmes(personagem)
    }, [personagem, obterFilmes])

    return {
        personagens,
        filmes,
        processando,
        selecionarPersonagem,
        voltar
    }
}