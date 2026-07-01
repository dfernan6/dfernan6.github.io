import Circulo from "@/components/basicos/Circulo";
import Link from "next/link";

export default function PaginaCirculos(){
    return (
        <div className={`flex 
        justify-around items-center 
        h-screen`}>
            <Circulo text="Circ #1"/>
            <Circulo text="Circ #2"/>
            <Circulo text="Circ #3" quasePerfeito={true}/>
            <Circulo text="Circ #4"/>
            <Link href="/">Voltar</Link>
        </div>
    )
}