import Link from "next/link";
import Pagina from "@/components/template/Pagina";

export default function Simples() {
    return (
        <Pagina>
        <div>           
            <p>Componente Simples</p>
            <Link href="/">Voltar</Link>          
        </div>
        </Pagina>
        )
}