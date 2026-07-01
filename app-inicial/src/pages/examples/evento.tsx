import Evento from "@/components/examples/Evento";
import Pagina from "@/components/template/Pagina";
import Link from "next/link";

export default function PaginaEvento() {
    return (
        <Pagina>
            <Evento />
            <Link href="/">Voltar</Link>
        </Pagina>
    )
}