import { useEffect, useState } from "react"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import axios from "axios"
import { API, main } from "../../api"
import Loading from "../../components/Loading/Loading"
import Toast from "../../components/Toast/Toast"

const OwnerStatistics = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const [change, setChange] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get(API.ORDER.DETAILSSTATISTICS, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setData(res.data.data)
                }
            })
            .catch(err => {
            })
            .finally(res => {
                setLoading(false);                
            })
    }, [change])

    const [by, setBy] = useState("اليوم");

    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);

    const options = [
        "اليوم",
        "الاسبوع",
        "الشهر",
        "السنة"
    ]

    const [loadingS, setLoadingS] = useState(false)

    useEffect(() => {
        setLoadingS(true)

        axios.get(API.ORDER.GETSTATISTICS, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    if(by === 'اليوم') {
                        setPrice(res.data.data.price.day)
                        setCount(res.data.data.count.day)
                    } else if(by === 'الاسبوع') {
                        setPrice(res.data.data.price.week)
                        setCount(res.data.data.count.week)
                    } else if(by === 'الشهر') {
                        setPrice(res.data.data.price.month)
                        setCount(res.data.data.count.month)
                    } else {
                        setPrice(res.data.data.price.year)
                        setCount(res.data.data.count.year)
                    }
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoadingS(false)
            })
    }, [by])

    const [showResetOption ,setShowRestOption] = useState(false)

    const handleReset = (req, res) => {
        axios.put(API.ORDER.RESETSTATISTICS, null,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res?.data?.state === 'success') {
                    setChange(!change);
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setShowRestOption(false);
            })
    }
    
    return (
        <OwnerLayout>
            <div className="w-full">
            <div className="w-full mb-10" dir="rtl">
                <span className="font-bold text-[1.5rem] block mb-5">إحصائيات</span>
                <select required className="w-fit bg-white shadow-md focus:outline-none outline-none p-2 rounded-[10px] cursor-pointer mb-5" defaultValue={by} onChange={(e) => setBy(e.target.value)}>
                    {options.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                <div className={`flex items-center justify-between bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] rounded-[16px] w-full`}>
                    <h2 className='text-[1.1rem] font-medium text-white'>عدد الطلبات</h2>
                    <h2 className='text-[1.1rem] font-medium text-white'>{count}</h2>
                </div>
                <div className={`flex items-center justify-between bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] rounded-[16px] w-full`}>                    
                    <h2 className='text-[1.1rem] font-medium text-white'>مجموع الاسعار</h2>
                    <h2 className='text-[1.1rem] font-medium text-white'>{price}</h2>
                </div>
            </div>
                <div className="mb-10">
                    <span className="px-4 py-3 font-bold block w-fit duration-300 hover:scale-105 bg-black text-white rounded-md cursor-pointer" onClick={() => setShowRestOption(true)}>إعادة فلترة الإحصائيات بدءاً من الآن</span>
                </div>
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">المنتجات الأكثر طلباً</span>
                </h1>
                <Loading loading={loading}/>
                <div className="w-full grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:gris-cols-4 gap-[25px] my-5">
                    {!loading && data && data?.products.map((e,i) => <div key={i} className="p-2 bg-white shadow-md rounded-md">
                        <div className="w-full h-auto aspect-square rounded-md overflow-hidden">
                            <img src={main+e.image} alt="image" className="w-full h-full"/>
                        </div>
                        <h1 className="text-[1.2rem] font-bold mt-3">{e.title}</h1>
                        <h2>عدد الطلبات: <span className="font-bold">{e.count}</span></h2>
                    </div>)}
                </div>
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">الطاولات الأكثر نشاطاً</span>
                </h1>
                <Loading loading={loading}/>
                <div className="w-full grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:gris-cols-4 gap-[25px] my-5">
                    {!loading && data && data?.tables.map((e,i) => <div key={i} className="p-2 bg-white shadow-md rounded-md flex justify-center items-center flex-col text-center">
                        <h1 className="text-[1.2rem] font-bold">{e.title}</h1>
                        <h2>عدد الطلبات: <span className="font-bold">{e.count}</span></h2>
                    </div>)}
                </div>
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">الأقسام الأكثر طلباً</span>
                </h1>
                <Loading loading={loading}/>
                <div className="w-full grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:gris-cols-4 gap-[25px] my-5">
                    {!loading && data && data?.sections.map((e, i) => <div key={i} className="p-2 bg-white shadow-md rounded-md flex justify-center items-center flex-col text-center">
                        <h1 className="text-[1.2rem] font-bold">{e.title}</h1>
                        <h2>عدد الطلبات: <span className="font-bold">{e.count}</span></h2>
                    </div>)}
                </div>
                {/* <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">الأوقات الأكثر نشاطاً</span>
                </h1>
                <div className="w-full flex justify-center gap-[25px] flex-wrap"></div> */}
            </div>
            <Toast show={showResetOption} message={'هل أنت متأكد من إعادة ضبط الإحصائيات؟'}>
                <h2>ملاحظة: هذا لا يشمل عدد الطلبات ومجموع الأسعار</h2>
                <div className="flex justify-center items-center gap-5 mt-5">
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setShowRestOption(false)}>لا</div>
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={handleReset}>نعم</div>
                </div>
            </Toast>
        </OwnerLayout>
    )
}

export default OwnerStatistics