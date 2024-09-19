import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaGear } from 'react-icons/fa6'
import { MdCoffee, MdDeliveryDining } from 'react-icons/md'
import { LuMessagesSquare } from 'react-icons/lu'
import { FaChartBar, FaTable } from "react-icons/fa";
import { useAlertHooks } from "../../../hooks/useAlertHooks";

const links = [
    {
        title: 'لوحة التحكم',
        url: '/owner/dash',
        icon: <MdCoffee className="text-[#A098AE] text-[1.2rem]"/>,
        new: false
    },
    {
        title: 'قائمة الطلبات',
        url: '/owner/orders',
        icon: <MdDeliveryDining className="text-[#A098AE] text-[1.2rem]"/>,
        new: true
    },
    {
        title: 'الرسائل',
        url: '/owner/messages',
        icon: <LuMessagesSquare className="text-[#A098AE] text-[1.2rem]"/>,
        new: true
    },
    {
        title: 'الضبط',
        url: '/owner/settings',
        icon: <FaGear className='text-[#A098AE] text-[1.2rem]'/>,
        new: false
    },
    {
        title: 'الطاولات',
        url: '/owner/tables',
        icon: <FaTable className='text-[#A098AE] text-[1.2rem]'/>,
        new: true
    },
    {
        title: 'الإحصائيات',
        url: '/owner/statistcis',
        icon: <FaChartBar className='text-[#A098AE] text-[1.2rem]'/>,
        new: false
    },
]

const MobileNavBar = () => {
    const { pathname } = useLocation();

    const { show, dispatch } = useAlertHooks()

    useEffect(() => {
        if(pathname?.includes('owner/messages')) {
            dispatch({ type: "REMOVE", payload: 2})
        } else if(pathname?.includes('owner/orders')) {
            dispatch({ type: "REMOVE", payload: 1})
        } else if(pathname?.includes('owner/tables')) {
            dispatch({ type: "REMOVE", payload: 3})
        } 
    }, []);

    return (
        <div className="w-full bg-white border-[1px] border-solid border-[#ccc] min-[1300px]:hidden flex gap-5 p-5 max-[600px]:flex-col fixed top-0 right-0 z-50 max-[700px]:static" dir="rtl">
            <div className="">
                <h1 className="text-[1.1rem] font-medium text-[#A098AE] mb-2">إضافة</h1>
                <Link to={'/owner/sections/add'} className={`flex items-center bg-[#1FA5B8] gap-5 mb-[20px] duration-300 p-[14px] rounded-[16px] w-full opacity-70 hover:opacity-100`}>
                    <h2 className='text-[1.1rem] font-medium text-white'>إضافة قسم</h2>
                </Link>
                <Link to={'/owner/products/add'} className={`flex items-center bg-[#1FA5B8] gap-5 duration-300 p-[14px] rounded-[16px] w-full opacity-70 hover:opacity-100`}>
                    <h2 className='text-[1.1rem] font-medium text-white'>إضافة منتج</h2>
                </Link>
            </div>
            <div className={`min-[1021px]:hidden`}>                
                <h1 className="text-[1.1rem] font-medium text-[#A098AE] mb-2">الصفحات</h1>
                <div className='grid grid-cols-2 max-[400px]:grid-cols-1 gap-5'>
                {links && links?.map((e, i) => <Link key={i} to={e?.url} className={`flex items-center gap-5 mb-[16px] duration-300 owner-link ${pathname?.includes(e?.url)? 'active-owner-link':''} p-[14px] rounded-[16px] w-full relative`} onClick={() => dispatch({ type: 'REMOVE',payload: i })}>
                    {e?.icon}
                    <h2 className={`text-[#A098AE] text-[1.1rem] font-medium`}>{e?.title}</h2>
                    {e?.new && (show?.includes(i)) && !pathname?.includes(e?.url) && <div className='w-[20px] h-[20px] rounded-full bg-red-500 absolute left-[0px]'/>}
                </Link>)}
                </div>
            </div>    
        </div>
    )
}

export default MobileNavBar