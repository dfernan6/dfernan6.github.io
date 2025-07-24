import { useState, useEffect } from "react"
import Layout from "./layout"

export default function Integracao() {
  const [codigo, setCodigo] = useState(1)
  const [cliente, setCliente] = useState({})

  async function obterCliente() {
    const resp = await fetch(`http://localhost:3000/api/clientes/${codigo}`)
    const dados = await resp.json()
    setCliente(dados)
  }

  // CORREÇÃO: useEffect para evitar chamada fora da renderização
  useEffect(() => {
    if (codigo > 0) {
      fetch(`http://localhost:3000/api/clientes/${codigo}`)
        .then(resp => resp.json())
        .then(dados => setCliente(dados))
    }
  }, [codigo])

  return (
    <Layout>
      <div>
        <input
          type="number"
          value={codigo}
          onChange={e => setCodigo(Number(e.target.value))}
        />
        <button onClick={obterCliente}>
          Obter Cliente
        </button>
      </div>
      <ul>
        <li>Codigo: {cliente.id}</li>
        <li>Nome: {cliente.nome}</li>
        <li>Email: {cliente.email}</li>
      </ul>
    </Layout>
  )
}