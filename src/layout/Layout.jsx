import { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaMoneyCheck } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';
import { TiShoppingCart } from "react-icons/ti";
import axios from 'axios'
import { API } from '../api'
import { useAccountHook } from "../hooks/useAccountHook";
import { SocketContext } from "../context/socketContext";

const Layout = ({ children }) => {
    const { pathname } = useLocation();

    const { socket } = useContext(SocketContext)

    const [hide, setHide] = useState(true);

    const [show, setShow] = useState(false);

    const [show1,setShow1] = useState(false);

    const [show3,setShow3] = useState();

    const [count,setCount] = useState(0);

    const { account: acc } = useAccountHook()

    const to = useNavigate()

    useEffect(() => {
        setHide(
            pathname?.includes('/error')
            || pathname === '/'
            || pathname?.includes('/admin')
            || pathname?.includes('/login')
            || pathname?.includes('/owner')
            || pathname?.includes('/not-active')
            || pathname?.includes('/check')
            || pathname?.includes('/view')
            || pathname?.includes('/product')
            || pathname?.includes('/code')
        )
    }, [pathname]);

    const handleShow = (e) => {
        if(!e) {
            setShow1(false)
            setCount(count+1)
        } else {
            setShow1(e)
            setCount(count+1)
        }
    }

    const handleClick = (value) => {
        if(value === 'الكوميك') {
            axios.post(API.MESSAGES.ADDCOMIC, null, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('user')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setShow3('سوف يأتي خلال لحظات')                        
                        socket?.emit('send', {accId: acc?.account?._id, type: 'messages'})
                    }
                })
                .catch(err => {
                    if(err.response?.data.state === 'empty') {
                        localStorage.removeItem('user')
                        to('/code')
                    }
                })
                .finally(res => {
                    setShow1(false)
                    setShowOptions(false)
                    setTimeout(() => {
                        setShow3(false)
                    }, 3000)
                })
        } else {
            axios.post(API.MESSAGES.ADDCHECK, null, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('user')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setShow3('سوف يصل الحساب خلال لحظات')
                        socket?.emit('send', {accId: acc?.account?._id, type: 'messages'})
                    }
                })
                .catch(err => {
                    // console.log(err)
                    if(err.response?.data.state === 'empty') {
                        localStorage.removeItem('user')
                        to('/code')
                    }
                })
                .finally(res => {
                    setShow1(false)
                    setShowOptions(false)
                    setTimeout(() => {
                        setShow3(false)
                    }, 3000)
                })
        }
    }

    const c0 = useRef()
    const c2 = useRef()
    const c3 = useRef()
    const c4 = useRef()

    useEffect(() => {
        if(!localStorage.getItem('account')) {
            return;
        }

        c0.current.style.backgroundColor = acc?.account?.mainColor
        c2.current.style.backgroundColor = acc?.account?.mainColor
        c3.current.style.backgroundColor = acc?.account?.mainColor
        c4.current.style.backgroundColor = acc?.account?.mainColor
    }, [acc])

    const [showOptions, setShowOptions] = useState(false);

    return (
        <main className="w-full">
            {/* {!hide&& <Header/>} */}
            <div className={`w-full bg-[#f5f5f8]`}>
                {children}
                <div className={`fixed z-50 duration-300 ${(!hide || pathname?.includes("/product"))? 'block':'hidden'} ${show? 'left-[15px] bottom-[20px]':(showOptions? 'left-[15px] bottom-[90px]': 'left-[-100px] bottom-[90px]')} layout-mobile`}>
                <div className={`relative duration-300 ${show? 'scale-100': (showOptions? 'left-[0%]':'left-[-200%]')} mt-3 mobile-link`}>
                        <Link to={'/show/'+acc?.token+'/'} className="w-[60px] h-[60px] overflow-hidden border-[1px] border-solid cursor-pointer shadow-md duration-300 hover:scale-105 relative bg-white rounded-full flex justify-center items-center p-2" onClick={() => setShowOptions(false)} ref={c2}>
                            <FaHome className="text-[2rem] text-white" />
                        </Link>
                    </div>
                    <div className={`relative duration-300 delay-[100ms] ${show? 'scale-100': (showOptions? 'left-[0%]':'left-[-200%]')} mt-3 mobile-link`}>
                        <Link to={'/shop/'+acc?.token+'/1'} className="w-[60px] h-[60px] overflow-hidden border-[1px] border-solid cursor-pointer shadow-md duration-300 hover:scale-105 relative bg-white rounded-full flex justify-center items-center p-2" onClick={() => setShowOptions(false)} ref={c3}>
                            <TiShoppingCart className="text-[2rem] text-white" />
                        </Link>
                    </div>
                    <div className={`relative duration-300 delay-[300ms] ${show? 'scale-100': (showOptions? 'left-[0%]':'left-[-200%]')} mt-3 mobile-link`}>
                        <div className="w-[60px] h-[60px] overflow-hidden border-[1px] border-solid cursor-pointer shadow-md duration-300 hover:scale-105 relative bg-white rounded-full flex justify-center items-center p-2" onClick={() => handleShow('الحساب')} ref={c4}>
                            <FaMoneyCheck className="text-[2rem] text-white" />
                        </div>
                    </div>
                </div>
                <div className={`fixed left-[15px] bottom-[20px] ${show? 'hidden':'scale-100'} mt-3 z-50 ${(!hide || (pathname?.includes("/product") && !pathname?.includes("/owner")))? 'block':'hidden'}`}>
                    <div className="w-[60px] h-[60px] overflow-hidden border-[1px] border-solid cursor-pointer shadow-md duration-300 hover:scale-105 relative bg-white rounded-full flex justify-center items-center p-2" onClick={() => setShowOptions(!showOptions)} ref={c0}>
                        {!showOptions? <FaBars className="text-[1.5rem] text-white"/>: <FaXmark className="text-[1.5rem] text-white"/>}
                    </div>
                </div>
                {(!hide || pathname?.includes("/product")) && <div className={`fixed duration-500 ${show1?'left-[50%]':count % 2=== 0?'left-[-150%] scale-0':'left-[150%] scale-0'} top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-5 bg-white shadow-md p-20 px-10 rounded-lg z-[200]`}>
                    <h1 className="text-center font-bold text-[1.2rem]">هل تريد طلب {show1}؟</h1>
                    <div className="flex justify-center items-center gap-5 mt-5">
                        <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleShow(false)}>لا</div>
                        <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleClick(show1)}>نعم</div>
                    </div>
                </div>}
            </div>
            <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${show3? 'scale-100':'scale-0'}`}>
                <h1 className='flex justify-center flex-row-reverse items-center gap-2 text-green-500 text-[1.2rem] text-center'>
                    {show3}
                </h1>
            </div>
            {(!hide || pathname?.includes("/view") || (pathname?.includes("/product") && !pathname?.includes("/owner"))) && <Footer/>}
        </main>
    )
}

export default Layout