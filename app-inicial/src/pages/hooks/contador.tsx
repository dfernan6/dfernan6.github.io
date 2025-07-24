import Contador from "@/components/hooks/Contador";
import Background from "@/components/starWars/Background";
import Link from "next/link";

export default function PaginaContador() {
    return (
        <div className={`
        flex justify-center items-center
        h-screen
        `}>
            <Contador />
            <Background />
            <Link href="/">Voltar</Link>
        </div>
    )
}