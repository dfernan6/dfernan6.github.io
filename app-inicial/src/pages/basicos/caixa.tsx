import Caixa from "@/components/basicos/Caixa";
import Link from "next/link";

export default function PaginaCaixa() {
    return (
        <div className={`flex gap-7 
        p-7`}>
            <Caixa>#1</Caixa>
            <Caixa>#2</Caixa>
            <Caixa>#3</Caixa>
            <Link href="/">Voltar</Link>
        </div>
    )
}