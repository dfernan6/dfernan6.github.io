import Faq from "@/components/condicional/Faq";
import Link from "next/link";


export default function PaginaFaq() {
    return (
        <div className={`flex justify-center
        h-screen mt-10`}>
            <Faq />
        <Link href="/">Voltar</Link>
        </div>
    )

}