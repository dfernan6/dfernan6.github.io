export default function Pagina(props: any) {
    return (
        <div className={`
            flex flex-col justify-center items-center
            w-full h-full text-white
        `}>
            <div className={`
                flex flex-col items-center justify-center w-full h-full
                 bg-opacity-80
            `}>
                {props.children}
            </div>
        </div>
    )
}