import { useEffect, useRef } from "react"
import { useAccountHook } from "../hooks/useAccountHook";

const Footer = () => {
    const text = useRef();
    const footer = useRef();

    const { account } = useAccountHook();

    useEffect(() => {
        if(localStorage.getItem('account')) {
            // console.log(account?.account?.mainColor)
            footer.current.style.borderColor = account?.account?.mainColor
            text.current.style.color = account?.account?.mainColor
        }
    }, [])

    return (
        <footer className="w-full py-[40px] text-center border-t-[1px] border-t-solid" ref={footer}>
            <p className="text-center text-[1.1rem]">&copy; All rights reversed to <a href="https://sparkengdev.com" className="duration-300 hover:scale-105 font-bold" target="_blank" ref={text}>SPARK</a></p>
        </footer>
    )
}

export default Footer