import { FaArrowLeft } from 'react-icons/fa'
import Img from '../../assets/images/677e2617e51ff76be4587eaa236c89b9.png'
import ShopProduct from '../ShopProduct/ShopProduct'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { API } from '../../api'
import Loading from '../../components/Loading/Loading'
import { useAccountHook } from '../../hooks/useAccountHook'
import checkFromToken from '../../helpers/checkFromTokenAsParams'
import Toast from '../../components/Toast/Toast'
import { SocketContext } from '../../context/socketContext'

const Shop = () => {
    const { socket } = useContext(SocketContext);

    const [page, setPage] = useState(1);

    const to = useNavigate();

    const { pathname } = useLocation();

    const { account } = useParams()

    const { account: acc } = useAccountHook()

    if(checkFromToken(acc, account)) {
        to('/check/'+account)
    }

    useEffect(() => {
        setPage(pathname?.includes(account+'/'+1)? 1: 2)
    }, [pathname])

    const [add, setAdd] = useState(false)

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const [price, setPrice] = useState(0)

    const [users, setUsers] = useState([])
    const [change, setChange] = useState(false)

    useEffect(() => {
        setLoading(true)
        setPrice(0)

        axios.get(API.ORDER.GETALL, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setPrice(0)
                    // setOrders(res.data.data)
                    // setUsers([...new Set(res.data.data.map(e => e.for))])
                    const allData = [...res.data.data.map(e => {
                        return {for: e.for, orders: res.data.data.filter(x => x.for === e.for)}
                    })];

                    setOrders([...new Set(allData.map(e => e.for))].map(e => {
                        return {for: e, orders: res.data.data.filter(x => x.for === e)}
                    }))

                    setPrice(res.data.data.filter(e => (e.for === 'me' || e.for === 'ثابت')).map(e => e.order.price).reduce((acc, current) => +acc + +current, 0))
                }
            })
            .catch(err => {          
                console.log(err)
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/check/'+acc.token)
                }
            })
            .finally(res => {
                setLoading(false)
            })
    }, [pathname, change])

    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);

    const handleAddCart = () => {
        if(orders.length === 0) {
            setShow4('يجب أن تحتوي سلتك على طلب واحد على الأقل')
            setTimeout(() => {
                setShow4(false)
            }, 3000)

            return;
        }

        setLoading(true)

        axios.post(API.ORDER.ADDTOCART, null, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setPrice(res.data.price)
                    setShow5('تم تأكيد الطلب بنجاح')
                    socket?.emit('send', {accId: acc?.account?._id, type: 'orders'})
                    to('/show/'+acc?.token)
                }
            })
            .catch(err => {    
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/check/'+acc.token)
                } else if(err.response.data.message) {
                    setShow4(err.response.data.message)
                    setAdd(!add);
                } else {
                    setShow4(err.message)
                }
            })
            .finally(res => {
                setLoading(false)
                setTimeout(() => {
                    setShow4(false)
                    setShow5(false)
                }, 3000)
            })
    }

    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        const fetchData = () => axios.get(API.ORDER.TOTALPRICE, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setTotalPrice(res.data.data)
                }
            })
            .catch(err => {
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/check/'+acc.token)
                }
            })
            .finally(res => {

            })

        fetchData()

        const func = setInterval(fetchData, 10 * 1000)

        return () => {
            clearInterval(func); // clean up

            axios.CancelToken.source().cancel()
        };
    }, [price])

    const page1 = useRef()
    const page2 = useRef()
    const dash = useRef()
    const btn1 = useRef();
    const btn2 = useRef();

    useEffect(() => {
        page1.current.style.borderColor = acc?.account?.mainColor
        page2.current.style.borderColor = acc?.account?.mainColor
        page1.current.style.color = acc?.account?.mainColor
        if(page == 2) {
            page1.current.style.backgroundColor = acc?.account?.mainColor
            page1.current.style.color = 'white'
        } else {
            page1.current.style.backgroundColor = 'white'
        }
        page2.current.style.color = acc?.account?.mainColor
        dash.current.style.color = acc?.account?.mainColor
        btn1.current.style.backgroundColor = acc?.account?.mainColor
        btn2.current.style.backgroundColor = acc?.account?.mainColor
    }, [page])

    return (
        <div className="min-h-screen pb-[40px]">
            <h1 className="text-center pt-[52px] text-[1.25rem] font-semibold">{page === 1? 'السلة' : 'معلومات الطلب'}</h1>
            <div className="flex justify-center items-center gap-2 mt-5 flex-row-reverse">
                <Link to={'/shop/'+acc?.token+'/1'} className={`flex justify-center items-center rounded-full ${page === 1?'bg-white text-[#F21414] ':'bg-[#F21414] text-white'} w-[37px] h-[37px] border-[2px] border-solid text-[1.3rem] cursor-pointer font-bold relative z-20`} ref={page1}>1</Link>
                <div className={`text-[#F21414] text-[2rem] ${(orders && orders.filter(e => e.for === 'me')?.length !== 0) ? 'block': 'hidden'}`} ref={dash}>-</div>
                <Link to={'/shop/'+acc?.token+'/2'} className={`justify-center items-center rounded-full bg-white w-[37px] h-[37px] text-[#F21414] border-[2px] border-solid border-[#F21414] text-[1.3rem] cursor-pointer font-bold ${page === 1?'opacity-30':'opacity-100'} duration-300 hover:opacity-100 relative z-20 ${(orders && orders.filter(e => e.for === 'me')?.length !== 0) ? 'flex': 'hidden'}`} ref={page2} onClick={() => setPage(2)}>2</Link>
            </div>
            <div className="w-full container mx-auto mt-[44px] relative">
                <div className={`w-full p-2 duration-300 pb-10`} dir="rtl">
                    {page === 1 && totalPrice && !loading && <div className='bg-white w-full flex items-center gap-2 p-3 rounded-md shadow-md mb-3'>
                        <h1 className='font-bold text-[1.2rem]'> اجمالي طلبات الطاولة:</h1>
                        <h2 dir='ltr'>{totalPrice.table} s.p</h2>
                    </div>}
                    {page === 1 && totalPrice && !loading && <div className='bg-white w-full flex items-center gap-2 p-3 rounded-md shadow-md mb-3'>
                        <h1 className='font-bold text-[1.2rem]'> اجمالي طلباتك الشخصية:</h1>
                        <h2 dir='ltr'>{totalPrice.own} s.p</h2>
                    </div>}
                </div>
                {orders.length === 0 && page == 1 && <h1 className="text-center text-[1.3rem]">{"السلة فارغة"}</h1>}
                <div className={`w-full grid grid-cols-1 min-[1030px]:grid-cols-2 gap-[35px] p-2 duration-300 pb-10 ${page === 1? 'scale-100':'scale-0 hidden'}`}>
                    {!loading && orders?.map((e, i) => 
                        <div key={i} className='rounded-md overflow-hidden bg-[#FFE0B2] h-fit'>
                            {e.for !== 'ثابت'&&  <div className="h-[45px] bg-[#FFE0B2] w-full text-center text-black flex items-center justify-between font-medium px-3">
                                <div className={`${e.for !== 'me'? 'ms-auto':'ms-auto'}`}>{e?.for === 'me'? 'طلباتي': 'المستخدم '+ e?.for}</div>
                            </div>}
                            
                            {e.orders.map((x, ii) => <ShopProduct key={ii} info={x} index={ii+1} setChange={setChange} change={change}/>)}
                        </div>
                    )}
                </div>
                <div className={`w-full p-2 duration-300 pb-10 ${page === 2? 'scale-100':'scale-0 hidden'}`} dir="rtl">
                    <div className='bg-white w-full flex items-center gap-2 p-3 rounded-md shadow-md mb-3'>
                        <h1 className='font-bold text-[1.2rem]'>التوصيل الى:</h1>
                        <h2>
                            الطاولة رقم {localStorage.getItem("account")? acc?.table : ''}
                        </h2>
                    </div>
                    {<div className='bg-white w-full flex items-center gap-2 p-3 rounded-md shadow-md mb-3'>
                        <h1 className='font-bold text-[1.2rem]'>الاجمالي:</h1>
                        <h2 dir='ltr'>{price} s.p</h2>
                    </div>}
                </div>
            </div>
            {loading && <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md'>
                <Loading loading={loading}/>
            </div>}
            <Link to={'/shop/'+acc?.token+'/2'} className={`${(page == 1 && orders.filter(e => e.for === 'me').length !== 0)? 'flex': 'hidden'} items-center justify-center gap-[22.8px] bg-[#F21414] px-[22px] py-[18px] rounded-[10px] text-white cursor-pointer shadow-md duration-300 hover:scale-105 font-bold text-[18px] w-fit mx-auto`} ref={btn1} onClick={() => setPage(2)}>
                {page === 1 && <FaArrowLeft/>}
                <div>{'التالي'}</div>
            </Link>
            <Link className={`${(page == 2 && orders.filter(e => e.for === 'me')?.length !== 0)? 'flex': 'hidden'} items-center justify-center gap-[22.8px] bg-[#F21414] px-[22px] py-[18px] rounded-[10px] text-white cursor-pointer shadow-md duration-300 hover:scale-105 font-bold text-[18px] w-fit mx-auto`} ref={btn2} onClick={handleAddCart}>
                <div>{'تأكيد الطلب'}</div>
            </Link>
            <Toast show={show4}>
                <h1 className='flex text-center justify-center flex-row-reverse items-center gap-2 text-red-500 text-[1.2rem]'>
                    {show4}
                </h1>
            </Toast>
            <Toast show={show5}>
                <h1 className='flex text-center justify-center flex-row-reverse items-center gap-2 text-green-500 text-[1.2rem]'>
                    {show5}
                </h1>
            </Toast>
        </div>
    )
}

export default Shop