import Pagina from "@/components/template/Pagina"
import Menu from "@/components/template/Menu"
import MenuItem from "@/components/template/MenuItem"
import { Icon360View, Icon3dCubeSphere, IconAdOff, IconArrowMoveDown, IconArrowMoveUp, IconArrowsDiff, IconClick, IconClock, IconClock12, IconClock2, IconH1, IconList, IconPhotoCheck, IconPlus, IconSitemap, IconSourceCode, IconTable, IconUniverse } from "@tabler/icons-react"
import Linha from "@/components/layout/Linha"
import Link from 'next/link'
import reportWebVitals from '@/reportWebVitals'
import Navegador from '../components/Navegador'
import { IconAdjustmentsQuestion } from "@tabler/icons-react"
import Image from "next/image"

export default function Inicio() {
  return (
        <Pagina>
          <h1 className="head">Aplicações NextJs</h1>
  <div className={`p-2`}>
  <Menu>
    <Linha>
    <MenuItem 
    icone={<IconClock2 />}
    url="/hora.html"
    className="botao"
    >

      Hora (Estático)
    </MenuItem>
    <MenuItem 
    icone={<IconClock12 />}
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
    url="/listas/produtos"
    className="botao"
    >

      Produtos
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
    icone={<IconUniverse/>}
    url="/starwars"
    className="botao"
    >

      Starwars
    </MenuItem>
            <MenuItem
    icone={<IconAdjustmentsQuestion />}
    url="/condicional/faq"
    className="botao"
    >

      FAQ
    </MenuItem>
            <MenuItem
    icone={<IconList />}
    url="listas/basica"
    className="botao"
    >

      Lista básica
    </MenuItem>
            <MenuItem
    icone={<IconPlus />}
    url="/hooks/contador"
    className="botao"
    >

      Contador
    </MenuItem>
            <MenuItem
    icone={<IconPhotoCheck />}
    url="/hooks/imagens"
    className="botao"
    >

      API de imagens
    </MenuItem>
    </Linha>
  </Menu>
  </div>
  <div>
  <p><i>Fique à vontade para consultar os CODES da aplicação no repositório <b>GitHub</b></i></p>
  <a href="https://github.com/dfernan6/dfernan6.github.io/tree/master" target="_blank" rel="noreferrer">
  <img src="/github.png" className="git" alt="https://github.com/dfernan6/Curso-e-codigos-em-praticas/tree/master/react-fundamentals" />
  </a>
  </div>
    </Pagina>
  )
}