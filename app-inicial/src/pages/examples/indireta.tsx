import Painel from "@/components/examples/indireta/Painel";
import Pagina from "@/components/template/Pagina";
import Link from "next/link";

export default function PaginaDireta() {
    return (
        <Pagina>
            <Painel />
            <Link href="/">Voltar</Link>
        </Pagina>
    )
}