import Evento from "@/components/basicos/Evento";
import Link from "next/link";

export default function PaginaEventos() {
    return (
        <div className={`
        flex flex-wrap items-center
        justify-center h-screen gap-5
        `}>
            <Evento />
            <Evento />
            <Evento />
            <Link href="/">Voltar</Link>
        </div>
    )
}