import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAccountHook } from '../../hooks/useAccountHook';

const Section = ({ section, search, setSearch }) => {
    const sect = useRef();

    const { account } = useAccountHook()

    useEffect(() => {
        if(!localStorage.getItem("account")) {
            return;
        }
        sect.current.style.width = window.innerWidth / 4;

        if(search?.value === section.title) {
            sect.current.style.backgroundColor = account.account.mainColor;
            sect.current.style.color = 'white';
        } else {
            sect.current.style.backgroundColor = '#dee2e5'
            sect.current.style.color = 'black';
        }
    }, [account, search]);

    return (
        <div className="rounded-[10px] cursor-pointer duration-300 p-[10px] font-medium text-[13px] shadow-md flex justify-center items-center h-[60px] text-center overflow-hidden text-black" onClick={() => setSearch({id: section._id,value: section?.title})} ref={sect}>{section?.title.split(" ").map((e, i) => (i < 2) && (e+ ' '))}</div>  
    )
}

export default Section