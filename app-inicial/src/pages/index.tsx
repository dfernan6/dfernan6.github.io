import Pagina from "@/components/template/Pagina"
import Menu from "@/components/template/Menu"
import MenuItem from "@/components/template/MenuItem"
import { Icon360View, IconAdOff, IconArrowMoveDown, IconArrowMoveUp, IconArrowsDiff, IconClick, IconClock, IconH1, IconSitemap, IconSourceCode, IconTable } from "@tabler/icons-react"
import Linha from "@/components/layout/Linha"
import Link from 'next/link'
import reportWebVitals from '@/reportWebVitals'
import Navegador from '../components/Navegador'

export default function Inicio() {
  return (
        <Pagina>
  <div className={`p-2`}>
  <Menu>
    <Linha>
    <MenuItem 
    icone={<IconSourceCode />}
    url="/hora.html"
    className="botao"
    >

      Hora (Estático)
    </MenuItem>
    <MenuItem 
    icone={<IconSourceCode />}
    url="/horaAtual.html"
    className="botao"
    >

      Hora com JS (Estático)
    </MenuItem>
    <MenuItem
    icone={<IconClock />}
    url="/api/hora"
    className="botao"
    >

      Hora (Dinâmico)
    </MenuItem>
    <MenuItem
    icone={<IconTable />}
    url="/api/tabela?colunas=5&linhas=7"
    className="botao"
    >

      Tabela
    </MenuItem>
    <MenuItem
    icone={<IconArrowsDiff />}
    url="/api/usuarios"
    className="botao"
    >

      API de usuários
    </MenuItem>
    <MenuItem
    icone={<Icon360View />}
    url="/examples/simples"
    className="botao"
    >

      Componente Simples
    </MenuItem>
    <MenuItem
    icone={<IconH1 />}
    url="/examples/basico"
    className="botao"
    >

      Componente Básico
    </MenuItem>
    <MenuItem
    icone={<IconSitemap />}
    url="/examples/filhos"
    className="botao"
    >

      Filhos
    </MenuItem>
    <MenuItem
    icone={<IconClick />}
    url="/examples/evento"
    className="botao"
    >

      Evento
    </MenuItem>
    <MenuItem
    icone={<IconArrowMoveDown />}
    url="/examples/direta"
    className="botao"
    >

      Comunicação direta
    </MenuItem>
    <MenuItem
    icone={<IconArrowMoveUp />}
    url="/examples/indireta"
    className="botao"
    >

      Comunicação indireta
    </MenuItem>
        <MenuItem
    icone={<IconAdOff />}
    url="/starwars"
    className="botao"
    >

      Starwars
    </MenuItem>
    </Linha>
  </Menu>
  </div>
   <div >
    <h1>
      <a href="https://dfernan6.vercel.app/condicional/faq" > FAQ </a>
      <a href="https://dfernan6.vercel.app/basicos/caixa">Caixa</a>
      <a href="https://dfernan6.vercel.app/basicos/circulos">Circulos</a>
      <a href="https://dfernan6.vercel.app/basicos/eventos">Eventos</a>
      <a href="https://dfernan6.vercel.app/basicos/primeiro">Primeiro componente</a>
      <a href="https://dfernan6.vercel.app/hooks/contador">Contador</a>
      <a href="https://dfernan6.vercel.app/hooks/imagens ">API de imagens</a>
      <a href="https://dfernan6.vercel.app/layout">Aparência</a>
      <a href="https://dfernan6.vercel.app/listas/produtos">Produtos</a>
      <a href="https://dfernan6.vercel.app/listas/basica"></a>
      <a href="https://dfernan6.vercel.app/starwars"></a>
    </h1>
   </div>
    <div>
    <Navegador texto="Layout" destino="/layout" /><br></br>
    <Navegador texto="Navegação #01" destino="/navegacao" /> <br></br>
    <Navegador texto="Navegaçã0 #02" destino="/cliente/sp-2/123" /> <br></br>
    <Navegador texto="Componente com Estado" destino="/estado" /><br></br>
    <Navegador texto="Integração com API #01" destino="/integracao_1" /><br></br>
    <Navegador texto="Conteúdo estático" destino="/estatico" />
    </div>
    </Pagina>
  )
}