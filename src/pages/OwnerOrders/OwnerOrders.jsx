import { FaCheck, FaEdit, FaTrash } from "react-icons/fa"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import { useState, useEffect, useRef, useContext } from 'react'
import Img2 from '../../assets/images/Gluten Free Strawberry Cheesecake Pancakes Image.jpeg'
import Img3 from '../../assets/images/Grilled Tandoori Chicken with Indian-Style Rice.jpeg'
import Img4 from '../../assets/images/Pizza Recipes.jpeg'
import Loading from "../../components/Loading/Loading"
import axios from "axios"
import { API } from "../../api"
import changeToSyrianTime from "../../helpers/changeToSyrianTime"
import { Link, useParams } from "react-router-dom"
import { startTimer } from "../../helpers/setIntervalBySetTimeOut"
import { useAlertHooks } from "../../hooks/useAlertHooks"
import Toast from '../../components/Toast/Toast'
import { tableContext } from "../../context/tableContext"

const OwnerOrders = () => {
    const [show, setShow] = useState("new");
    const [orders, setOrders] = useState([]);

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false)

    const { id } = useParams();

    const initial = useRef();

    useEffect(() => {
        initial.current = null;
        if(show === 'new') {
            setOrders(data.filter(e => e.state === 'ordered'))
        } else if(show === 'now') {
            setOrders(data.filter(e => e.state === 'started'))
        }
    }, [data, show])

    const [change, setChange] = useState(false)

    const [data2, setData2] = useState([]);

    const { show: showx } = useAlertHooks()

    useEffect(() => {
        if(loading) {
            return;
        }

        // if(initial.current !== null && show.find(e => e === 1)) {
            // return;
        // }

        // initial.current = true;

        setLoading(true)

        const fetchData = () => axios.get(API.ORDER.GETCARTS+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner'),
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setData(res.data.data)
                    setData2(res.data.data)
                    if(show === 'new') {
                        setOrders(data.filter(e => e.state === 'ordered'))
                    } else if(show === 'now') {
                        setOrders(data.filter(e => e.state === 'started'))
                    }                   
                }
            })
            .catch(err => {
            })
            .finally(res => {
                setLoading(false)
            })
            
        fetchData()

        // startTimer(fetchData, 10 * 1000)

        // return () => {
        //     clearInterval(func); // clean up

        //     axios.CancelToken.source().cancel()
        // };
    }, [change, showx])

    const [read, setRead] = useState(false)

    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const handleDelete = (id) => {
        if(loading) {
            return;
        }

        setLoading(true);

        axios.delete(API.ORDER.DELETECART + id , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner'),
            }
        })
            .then(res => {                
                if(res.data.state === 'success') {
                    setChange(!change)
                }
            })
            .catch(err => {
                if(err.response.data.message) {
                    setError(err.response.data.message)
                }
            })
            .finally(res => {
                setLoading(false)
                setShow5(false)
                setTimeout(() => {
                    setError(false)
                }, 3000)
            })
    }

    const [show5, setShow5] = useState(false)

    const handleRead = (id) => {
        axios.put(API.ORDER.READ+id, null, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setChange(!change)
                }
            })
            .catch(err => {
            }) 
            .finally(res => {
                setRead(false)
            })
    }

    const [showReadAll, setShowReadAll] = useState(false)

    const handleReadAll = () => {
        axios.put(API.ORDER.READALLCARTS+id, null, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setChange(!change)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setShowReadAll(false)
            })
    }

    const { dispatch: tableDispatch } = useContext(tableContext)

    useEffect(() => {
        tableDispatch({ type: 'REMOVE', payload: "o"+id })
    }, [])

    return (
        <OwnerLayout>
            <div className="w-full">
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">قائمة الطلبات للطاولة {id}</span>
                </h1>
                <div className="flex items-center gap-5 mt-5">
                    <div className="px-5 py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md" onClick={() => setShow("new")}>جديدة</div>
                    <div className="px-5 py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md" onClick={() => setShow("now")}>مقروء</div>
                </div>
                <div>
                    {show === 'new' && orders.length !== 0 && <div className="px-5 py-2 text-white bg-black duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md w-fit mt-5" onClick={() => setShowReadAll(true)}>قراءة الكل</div>}
                </div>
                <Loading loading={loading}/>
                <div className="grid grid-cols-1 gap-[16px] mt-[24px]">
                    {orders && !loading && orders.map((e, i) => <div className="shadow-md bg-white p-[20px] rounded-[16px] flex font-bold duration-300 cursor-pointer relative overflow-hidden flex-col items-center" key={i}>
                        <div className="w-full">
                            <h1 className="font-medium bg-[#1FA5B8] flex justify-center items-center text-white rounded-md p-1 w-fit gap-2" dir="rtl">رقم الطاولة
                                <div className="font-bold text-center text-[2rem]">
                                    {e.table}
                                </div>
                            </h1>
                            <table className="w-full text-center mt-5">
                                <thead className="h-[50px] bg-[#ddd]">
                                    <tr>
                                        <th>المنتج</th>
                                        <th>قسم</th>
                                        <th>العدد</th>
                                        <th>السعر المفرد</th>
                                        <th>السعر الإجمالي</th>
                                        <th>ملاحظات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {e.orders && e.orders.map((o, index) => <tr className={`${index === 0? 'bg-[#eee]' : 'bg-[#ddd]'}`} key={index}>
                                        <td>{o?.prodcut.title}</td>
                                        <td>{o?.section}</td>
                                        <td>{o?.count}</td>
                                        <td>{o?.prodcut.price}</td>
                                        <td>{o?.price}</td>
                                        <td className="overflow-x-scroll w-[50%]">{o?.note}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                            <h1 className="font-medium bg-[#1FA5B8] flex justify-center items-center text-white rounded-md p-1 w-fit gap-2 mt-5" dir="rtl">
                                السعر الاجمالي
                                <div className="font-bold text-center text-[2rem]">
                                    {e.price}
                                </div>
                            </h1>
                            <h1 className="p-2 w-fit" dir="ltr">{changeToSyrianTime(e.createdAt)}</h1>
                            <div className="flex justify-between items-center gap-5 mt-5 w-full">
                                {show === "new"
                                ? 
                                <FaCheck className="cursor-pointer relative z-10 text-green-500 duration-300 hover:scale-105 text-[1.2rem]" onClick={() => setRead(e.id)}/>
                                : <FaTrash className="cursor-pointer relative z-10 text-red-500 duration-300 hover:scale-105 text-[1.2rem]" onClick={() => setShow5(e.id)}/>
                                }
                            </div>
                            <div className={`absolute left-0 top-0 p-2 px-3 ${show === "new"? "bg-green-700": (show === "now"?"bg-orange-700": "bg-orange-700")} text-white shadow-md`}>
                                {show === "new"? "جديد": (show === "now"?"تم": "منجز")}
                            </div>
                            <div>
                            </div>
                            <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${read? 'scale-100':'scale-0'}`}>
                                <h1 className="mb-5">التحويل الى قائمة الطلبات المقروءة</h1>
                                <div className="flex justify-center items-center gap-5 mt-5">
                                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setRead(false)}>لا</div>
                                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleRead(read)}>نعم</div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                    <Toast show={showReadAll} message={'هل أنت متأكد من أنك تريد قراءة كل الطلبات الجديد؟'}>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setShowReadAll(false)}>لا</div>
                            <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={handleReadAll}>نعم</div>
                        </div>
                    </Toast>
                    <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${error? 'scale-100':'scale-0'}`}>
                        <h1 className='flex justify-center flex-row-reverse items-center gap-2 text-red-500 text-[1.2rem]'>
                            {error}
                        </h1>
                    </div>
                    <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${success? 'scale-100':'scale-0'}`}>
                        <h1 className='flex justify-center flex-row-reverse items-center gap-2 text-green-500 text-[1.2rem]'>
                            {success}
                        </h1>
                    </div>
                    <div className={`fixed duration-300 ${show5?'scale-100':'scale-0'} top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-5 bg-white shadow-md p-20 px-10 rounded-lg z-[200] left-[50%]`}>
                        <h1 className="text-center font-bold text-[1.2rem]">هل أنت متأكد من حذف العنصر التالي؟</h1>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setShow5(false)}>لا</div>
                            <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleDelete(show5)}>نعم</div>
                        </div>
                    </div>
                </div>
            </div>
        </OwnerLayout>
    )
}

export default OwnerOrders