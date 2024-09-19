import { useEffect, useRef } from "react";
import { useAccountHook } from "../../hooks/useAccountHook";

const SectionView = ({ section }) => {
    const sect = useRef();

    const { account } = useAccountHook()

    useEffect(() => {
        if(!localStorage.getItem("account")) {
            return;
        }
        sect.current.style.color = account?.account?.mainColor
    }, [account])

    return (
        <div className="bg-[#fff8ed] block p-2 rounded-[10px] px-[20px] py-[20px] font-medium text-[15px] shadow-md w-full" ref={sect}>{section?.title}</div>  
    )
}

export default SectionView