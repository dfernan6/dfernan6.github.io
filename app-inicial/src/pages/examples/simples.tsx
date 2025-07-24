import Link from "next/link";
import Pagina from "@/components/template/Pagina";

export default function Simples() {
    return (
        
        <div>
            <Pagina>
            <p>Componente Simples</p>
            <Link href="/">Voltar</Link>
            </Pagina>
        </div>
        )
}