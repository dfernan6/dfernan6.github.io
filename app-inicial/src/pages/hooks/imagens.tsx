import ImagemAleatoria from "@/components/hooks/ImagenAleatoria";
import Link from "next/link";

export default function PaginaImagens() {
    return (
        <div className={`
        flex justify-center items-center h-screen
        gap-5
        `}>
            <ImagemAleatoria />
            <ImagemAleatoria />
            <ImagemAleatoria />
            <Link href="/">Voltar</Link>
        </div>
    )
}