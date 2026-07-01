import ImagemAleatoria from "@/components/hooks/ImagenAleatoria";
import Pagina from "@/components/template/Pagina";
import Link from "next/link";

export default function PaginaImagens() {
    return (
        <Pagina>
        <div className={`
        gap-5
        `}>
            <ImagemAleatoria />
            <Link href="/">Voltar</Link>
        </div>
        </Pagina>
    )
}