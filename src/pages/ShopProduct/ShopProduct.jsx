import { useEffect, useState } from "react"
import { API, main } from "../../api";
import Loading from "../../components/Loading/Loading";
import { FaArrowDownShortWide, FaCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import axios from "axios";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaArrowDown } from "react-icons/fa";

const ShopProduct = ({ info, index, change, setChange }) => {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setCount(info?.order.count)
    }, [])
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [show3, setShow3] = useState(false);

    const [note, setNote] = useState(info.order.note);

    const handleUpdate = () => {
        setLoading(true)

        axios.put(API.ORDER.UPDATE+info.order._id, {
            note, count
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setShow3(true)

                    setChange(!change)

                    setTimeout(() => {
                        setShow3(false)
                    }, [3000])
                }
            })
            .catch(err => {
                if(err.response.data.state === 'failed') {
                    setError(err.response.data.message);
                } else {
                    setError(err.message);
                }

                setTimeout(() => {
                    setError(false)
                }, [3000])
            })
            .finally(res => {
                setLoading(false)
            })
    }

    const [show2, setShow2] = useState(false);

    const handleDelete = (id) => {
        setLoading(true)

        axios.delete(API.ORDER.DELETE+id)
            .then(res => {
                if(res.data.state === 'success') {
                    setChange(!change)
                }
            })
            .catch(err => {
                if(err.response.data.state === 'failed') {
                    setError(err.response.data.message);
                } else {
                    setError(err.message);
                }

                setTimeout(() => {
                    setError(false)
                }, [3000])
            })
            .finally(res => {
                setLoading(false)
                setShow2(false)
            })   
    }

    const [showOrder, setShowOrder] = useState(false);

    return (
        info.product?
        <div className="rounded-[10px] shadow-md overflow-hidden h-fit relative my-2">    
            <div className="h-[45px] bg-[white] w-full text-center text-black flex items-center justify-between font-medium px-3 shadow-md">
                <div className={`ms-auto flex justify-center items-center flex-row-reverse gap-2 cursor-pointer`} onClick={() => setShowOrder(!showOrder)}>{'الطلب ' + index} {!showOrder?<FaArrowAltCircleDown/>:<FaArrowAltCircleUp/>}</div>
            </div>
            {showOrder && <div className="w-full p-[10px] md:p-[20px] bg-white flex justify-between items-center flex-wrap relative border-t-[#f5f5f8] border-t-solid border-t-[5px]">    
                <div className={`rounded-[30px] flex justify-center items-center bg-white overflow-hidden ${info.for !== 'me'? 'shadow-0':'shadow-md'}`}>
                    {count > 0 && info.for === 'me' && <div className='flex shadow-md font-bold p-2 cursor-pointer duration-300 hover:scale-105 px-4 text-[1.2rem] text-[#F21414] justify-center items-center' onClick={() => setCount(count === 0? 0: count - 1)}>
                        -
                    </div>}
                    <div className={`text-[#F21414] bg-white flex font-bold p-2 cursor-pointer duration-300 hover:scale-105 px-4 text-[1.2rem] justify-center items-center ${info.for !== 'me'? 'shadow-0':'shadow-md'}`}>{count}</div>
                    {info.for === 'me' && <div className='bg-[#F21414] h-full w-full flex shadow-md font-bold p-2 cursor-pointer duration-300 hover:scale-105 px-4 text-[1.2rem] text-white justify-center items-center' onClick={() => setCount(count + 1)}>
                        +
                    </div>}
                </div>
                <div className="flex justify-center items-center gap-[20px]">
                    <div className="flex flex-col justify-center items-end md:text-[1.2rem]">
                        <h1 className="font-medium">{info.product.title}</h1>
                        <h2 className="text-[#F9B249] font-semibold">{info.product.price} s.p</h2>
                    </div>
                    <div className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] overflow-hidden">
                        <img src={main+info.product.image} alt="img" className="w-full h-full object-cover rounded-md"/>
                    </div>
                </div>
                <div className={`duration-300 bg-white border-t-[5px] border-solid border-t-[#f5f5f8] w-full text-center text-black flex flex-col py-2 items-center justify-center font-medium mt-5`}>
                    <div>
                        الاجمالي
                    </div>
                    <div className="text-[#F9B249] mb-2">
                        {count * info.product.price} s.p
                    </div>
                </div>
                {info?.for === 'me' && <div className="absolute font-bold text-neutral-600 bottom-0 right-0 w-fit px-2 h-[22px] z-[19] text-[.8rem]">{'أضغط على حفظ بعد تعديل الطلب'}</div>}
            </div>}
            {showOrder && info.for === 'me' && show && <div className={`duration-300 ${show? 'block':'block'} bg-white border-t-[5px] border-solid border-t-[#f5f5f8] w-full text-center text-black flex flex-col py-2 items-center justify-center font-medium`}>
                <div>
                    ملاحظات
                </div>
                <div className="w-full px-2">
                    <textarea rows={5} className='w-full bg-[#F8F8F8] rounded-[10px] mt-3 focus:outline-none p-2 h-full outline-none border-none' placeholder='بدون جبن' defaultValue={note} dir="rtl" onChange={(e) => setNote(e.target.value)}> 
                    </textarea>
                </div>
            </div>}
            {showOrder && info.for === 'me' && <div className="w-full flex gap-2 bg-[#ffe9c9] p-2">
                <div onClick={() => setShow(!show)} className="absloute cursor-pointer left-0 top-0 w-fit px-2 h-[22px] flex justify-center items-center bg-black me-auto shadow-md text-white rounded-full duration:300 hover:scale-105 z-[19] text-[.8rem]">{!show? "إضافة ملاحظات":"عودة"}</div>
                <div onClick={() => setShow2(true)} className="absloute cursor-pointer left-0 top-0 w-[50px] h-[22px] flex justify-center items-center bg-red-500 text-white rounded-full duration:300 hover:scale-105 z-[19]">حذف</div>
                <h1 className="absloute cursor-pointer left-0 top-0 w-[50px] h-[22px] flex justify-center items-center bg-black text-white rounded-full duration:300 hover:scale-105 z-[19] ms-auto" onClick={handleUpdate}>
                    حفظ 
                </h1>
            </div>}
            {/* {show && <div className="bg-white text-center py-2 pb-5">
                
            </div>} */}
            {loading && <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md'>
                <Loading loading={loading}/>
            </div>}
            <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${show3? 'scale-100':'scale-0'}`}>
                <h1 className='flex justify-center items-center flex-row-reverse gap-2 text-green-500 text-[1.2rem]'>تمت التعديل بنجاح 
                    <FaCheck className='text-green-500 text-[1.2rem]'/>
                </h1>
            </div>
            <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${error? 'scale-100':'scale-0'}`}>
                <h1 className='flex justify-center flex-row-reverse items-center gap-2 text-red-500 text-[1.2rem]'>
                    {error}
                    <MdError className='text-red-500 text-[1.2rem]'/>
                </h1>
            </div>
            {show2 && <div className={`fixed duration-500 ${show2?'scale-100':'scale-0'} top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-5 bg-white shadow-md p-20 px-10 rounded-lg z-[200]`}>
                <h1 className="text-center font-bold text-[1.2rem]">هل أنت متأكد من أنك تريد حذف هذا الطلب؟</h1>
                <div className="flex justify-center items-center gap-5 mt-5">
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setShow2(false)}>لا</div>
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleDelete(info.order._id)}>نعم</div>
                </div>
            </div>}
        </div>: <div className='rounded-[10px] shadow-md overflow-hidden h-fit' dir="rtl">
            <div className="h-[45px] bg-[#FFE0B2] w-full text-center text-black flex items-center justify-between font-medium px-3">
                <div>ثابت</div>        
            </div>
            <div className="w-full p-[10px] md:p-[20px] bg-white flex justify-between items-center flex-wrap">
                <h1 className="font-medium">{info.order.fixedOrder}</h1>
                <h2 className="text-[#F9B249] font-semibold" dir="ltr">{info.order.price} s.p</h2>
            </div>
        </div>
    )
}

export default ShopProduct