import Formulario from "@/components/examples/estado/Formulario";
import Minimo from "@/components/examples/estado/Minimo";
import Pagina from "@/components/template/Pagina";
import Link from "next/link";

export default function PaginaEstado() {
    return (
        <Pagina>
            <div className="flex flex-col items-center gap-10">
                <Minimo />
                <Formulario />
            </div>
            <Link href="/">Voltar</Link>
        </Pagina>
    )
}