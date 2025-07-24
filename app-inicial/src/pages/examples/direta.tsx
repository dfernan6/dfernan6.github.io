import Pai from "@/components/examples/direta/Pai";
import Pagina from "@/components/template/Pagina";
import Link from "next/link";

export default function PaginaDireta() {
    return (
        <Pagina>
            <Pai nome="Leonardo" sobrenome="da Vinci" />
            <Link href="/">Voltar</Link>
        </Pagina>
    )
}