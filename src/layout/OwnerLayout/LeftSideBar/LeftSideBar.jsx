import { Link, useLocation } from 'react-router-dom'
import Logo from '../../../assets/images/log.webp'
import { FaGear } from 'react-icons/fa6'
import { MdCoffee, MdDeliveryDining, MdOutlineDynamicFeed, MdOutlineTableBar, MdSpaceDashboard } from 'react-icons/md'
import { LuMessagesSquare } from 'react-icons/lu'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API, main } from '../../../api'
import Loading from '../../../components/Loading/Loading'
import { FaChartBar, FaTable } from 'react-icons/fa'
import { useAlertHooks } from '../../../hooks/useAlertHooks'
import { startTimer } from '../../../helpers/setIntervalBySetTimeOut'
import { SocketContext } from '../../../context/socketContext'


const LeftSideBar = () => {
    const links = [
        {
            title: 'لوحة التحكم',
            url: '/owner/dash',
            icon: <MdSpaceDashboard className="text-[#A098AE] text-[1.2rem]"/>,
            new: false,
        },
        {
            title: 'قائمة الطلبات',
            url: '/owner/orders',
            icon: <MdOutlineDynamicFeed className="text-[#A098AE] text-[1.2rem]"/>,
            new: true,
        },
        {
            title: 'الرسائل',
            url: '/owner/messages',
            icon: <LuMessagesSquare className="text-[#A098AE] text-[1.2rem]"/>,
            new: true,
        },
        {
            title: 'الطاولات',
            url: '/owner/tables',
            icon: <MdOutlineTableBar className='text-[#A098AE] text-[1.2rem]'/>,
            new: true,
        },
        {
            title: 'الإحصائيات',
            url: '/owner/statistcis',
            icon: <FaChartBar className='text-[#A098AE] text-[1.2rem]'/>,
            new: false
        },
        {
            title: 'الضبط',
            url: '/owner/settings',
            icon: <FaGear className='text-[#A098AE] text-[1.2rem]'/>,
            new: false,
        },
    ]

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        axios.get(API.ACCOUNT.GETACCID, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
        .then(res => {
            if(res.data.state === 'success') {
                socket.emit('addAccount', { accId: res.data.data })
            }
        })
        .catch(err => {

        })
    }, [socket, window.location])

    const { pathname } = useLocation();

    const [logo, setLogo] = useState(localStorage.getItem("logo"))
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!localStorage.getItem("logo")
        ||
        !localStorage.getItem("startTime")
        ||
        !localStorage.getItem("endTime")
        ||
        !localStorage.getItem("color1")
        || 
        !localStorage.getItem("color2")
        || 
        !localStorage.getItem("resturantName")
    ) {
            setLoading(true)
            axios.get(API.ACCOUNT.GETINFO, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('owner')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setLogo(res.data?.data?.image)
                        localStorage.setItem("logo", res.data.data.image)
                        localStorage.setItem("startTime", res.data.data.startDate)
                        localStorage.setItem("endTime", res.data.data.endDate)
                        localStorage.setItem("color1", res.data.data.mainColor)
                        localStorage.setItem("color2", res.data.data.secondColor)
                        localStorage.setItem("resturantName", res.data.data.title)
                    }
                })
                .catch(err => {
                    // console.log(err)
                })
                .finally(res => {
                    setLoading(false)
                })
        }
    }, [])

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
        <aside className="hidden w-[345px] bg-white px-[45px] py-[20px] fixed left-0 top-0 overflow-y-auto h-screen shadow-md min-[1021px]:flex items-center flex-col z-50">
            <Link to={'/owner/dash'} className="block rounded-full shadow-md w-[100px] h-[100px] overflow-hidden min-h-[100px] min-w-[100px]">
                <Loading loading={loading}/>
                <img src={main+logo} alt="logo" className="w-full h-full"/>
            </Link>
            <div className='mt-14 w-full'>
                {links && links?.map((e, i) => <Link key={i} to={e?.url} className={`flex items-center gap-5 mb-[16px] duration-300 owner-link ${pathname?.includes(e?.url)? 'active-owner-link':''} p-[14px] rounded-[16px] w-full`} onClick={() => dispatch({ type: 'REMOVE',payload: i })}>
                    {e?.icon}
                    <h2 className={`text-[#A098AE] text-[1.1rem] font-medium`}>{e?.title}</h2>
                    {e?.new && (show?.includes(i)) && !pathname?.includes(e?.url) && <div className='w-[20px] h-[20px] rounded-full bg-red-500 absolute right-[60px]'/>}
                </Link>)}
            </div>
            <div className='mt-5 rounded-[16px] w-full  min-h-[200px] bg-[#1FA5B8] p-2 overflow-hidden' dir="rtl">
                <h1 className='text-center text-white'>ملاحظات</h1>
                <textarea rows={5} className='w-full min-h-[150px] max-h-[150px] outline-none focus:outline-none bg-[#1FA5B8] text-white mt-1 placeholder:text-[#eee]' onChange={(e) => localStorage.setItem('note', e.target.value)} defaultValue={localStorage.getItem("note")? localStorage.getItem("note"):''} placeholder='ملاحظة 1'>
                </textarea>
            </div>
        </aside>
    )
}

export default LeftSideBar