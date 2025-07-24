import Basico from "@/components/examples/Basico";
import Pagina from "@/components/template/Pagina";
import Link from "next/link";

export default function PaginaBasico() {
    return (
        <Pagina>
            <Basico />
            <Link href="/">Voltar</Link>
        </Pagina>
    )
}