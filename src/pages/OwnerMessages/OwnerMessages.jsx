import { FaCheck, FaTrash } from "react-icons/fa"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import { useState, useEffect, useRef, useContext } from 'react'
import axios from "axios";
import { API } from "../../api";
import Loading from "../../components/Loading/Loading";
import changeToSyrianTime from "../../helpers/changeToSyrianTime";
import { useAlertHooks } from "../../hooks/useAlertHooks";
import Toast from "../../components/Toast/Toast";
import { Link, useParams } from 'react-router-dom'
import { tableContext } from "../../context/tableContext";

const OwnerMessages = () => {
    const [show, setShow] = useState("new");
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if(show === 'new') {
            setMessages(data.filter(e => e.read === false))
        } else {
            setMessages(data.filter(e => e.read === true))
        }
    }, [show, data])

    const [data2, setData2] = useState([]);

    const { dispatch, show: showx } = useAlertHooks()

    // const { messages: messagesContext, dispatch: messagesDispatch  } = useMessagesHooks()

    useEffect(() => {
        setLoading(true)

        const fetchData = () => axios.get(API.MESSAGES.GETALL+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setData2(res.data.data)
                    setData(res.data.data)
                    if(show === 'new') {
                        setMessages(res.data.data.filter(e => e.read === false))
                    } else {
                        setMessages(res.data.data.filter(e => e.read === true))
                    }                 
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false)
            })

        fetchData()
    }, [change, showx])

    const handleRead = (id) => {
        if(loading) {
            return
        }

        setLoading(true)

        axios.put(API.MESSAGES.READ+id, null, {
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
                // console.log(err)
            })
            .finally(res => {
                setLoading(false)
            })
    }

    const [readAll, setReadAll] = useState(false)

    const handleReadAll = () => {
        if(loading) {
            return
        }

        setLoading(true)

        axios.put(API.MESSAGES.READALL+id, null, {
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
                // console.log(err)
            })
            .finally(res => {
                setLoading(false)
                setReadAll(false)
            })
    }

    const handleDelete = (id) => {
        if(loading) {
            return;
        }

        axios.delete(API.MESSAGES.DELETE+id, {
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
                // console.log(err)
            })
            .finally(res => {
                setLoading(false)
            })
    }

    const { dispatch: tableDispatch } = useContext(tableContext)

    useEffect(() => {
        tableDispatch({ type: 'REMOVE', payload: "m"+id })
    }, [])

    return (
        <OwnerLayout>
            <div className="w-full">
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">قائمة الرسائل للطاولة {id}</span>
                    <Link to={'/owner/messages'} className="flex justify-center items-center gap-2 text-[#1FA5B8] font-bold duration-300 hover:translate-x-[-5px]">
                        <div>رجوع</div>
                        <div>{">"}</div>
                    </Link>            
                </h1>
                <div className="flex items-center gap-5 mt-5">
                    <div className="px-5 py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md" onClick={() => setShow("new")}>جديدة</div>
                    <div className="px-5 py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md" onClick={() => setShow("old")}>مقروءة</div>
                </div>
                <div>
                    {show === 'new' && messages.length !== 0 && <div className="px-5 py-2 text-white bg-black duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md w-fit mt-5" onClick={() => setReadAll(true)}>قراءة الكل</div>}
                </div>
                <Loading loading={loading}/>
                <div className="grid grid-cols-3 max-[650px]:grid-cols-2 max-[450px]:grid-cols-1 gap-[16px] mt-[24px]">
                    {!loading && messages && messages.length !== 0 && messages.map((e, i) => <div className="shadow-md overflow-hidden bg-white p-[20px] rounded-[16px] flex justify-center items-center flex-col font-bold duration-300 hover:scale-105 cursor-pointer relative" key={i}>
                        <h1 className="font-medium" dir="ltr">رقم الطاولة
                            <div className="font-bold text-center text-[2rem]">
                                {e.table}
                            </div>
                        </h1>                    
                        <h2 className="mt-2 font-medium" dir="ltr">{e.type}</h2>                    
                        <h1 className="p-2 w-fit" dir="ltr">{changeToSyrianTime(e.createdAt)}</h1>
                        <div className="flex justify-between items-center gap-5 mt-5 w-full">
                            {show == "new"? <FaCheck className="cursor-pointer relative z-10 text-green-500 duration-300 hover:scale-105 text-[1.2rem]" onClick={() => handleRead(e._id)}/>
                            :
                            <FaTrash className="cursor-pointer relative z-10 text-red-500 duration-300 hover:scale-105 text-[1.2rem]" onClick={() => handleDelete(e._id)}/>}
                        </div>
                        <div className={`absolute left-0 top-0 p-2 px-3 ${show === "new"? "bg-green-700":"bg-yellow-700"} text-white shadow-md`}>
                            {show === "new"? "جديد":"مقروء"}
                        </div>
                    </div>)}
                </div>
            </div>
            <Toast show={readAll} message={'هل أنت متأكد من أنك تريد قراءة كل الرسائل الجديدة؟'}>
                <div className="flex justify-center items-center gap-5 mt-5">
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setReadAll(false)}>لا</div>
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={handleReadAll}>نعم</div>
                </div>
            </Toast>
        </OwnerLayout>
    )
}

export default OwnerMessages