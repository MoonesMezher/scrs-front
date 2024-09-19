import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios";
import { API } from "../../../api";
import MainInput from "../../../components/MainInput/MainInput";

const RightSideBar = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState()
    const [data, setData] = useState()
    const [change, setChange] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        axios.get(API.ACCOUNT.GETFIXEDORDER, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner'),
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setPrice(res.data.data.price)
                    setTitle(res.data.data.title)
                    setData(res.data.data)
                }
            })
            .catch(err => {
            })
            .finally(res => {
                setLoading(false);
            })
    }, [change])

    const handleSave = () => {
        if(loading) {
            return;
        }

        setLoading(true);

        axios.put(API.ACCOUNT.FIXEDORDER,{
            title, price: +price,
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner'),
            }
        })
            .then(res => {
                
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false);
                setChange(!change)
            })
    }

    return (
        <aside className="hidden min-[1300px]:block min-[1250px]:w-[300px] min-[1600px]:w-[455px] bg-white px-[45px] py-[10px] fixed right-0 top-0 min-[1300px]:h-screen shadow-md z-50 overflow-y-auto">
            <div className="w-full mt-10" dir="rtl">
                <h1 className="text-[1.1rem] font-medium text-[#A098AE] mb-5">إضافة</h1>
                <Link key={1} to={'/owner/sections/add'} className={`flex items-center bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] rounded-[16px] w-full opacity-70 hover:opacity-100`}>
                    <h2 className='text-[1.1rem] font-medium text-white'>إضافة قسم</h2>
                </Link>
                <Link key={2} to={'/owner/products/add'} className={`flex items-center bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] rounded-[16px] w-full opacity-70 hover:opacity-100`}>
                    <h2 className='text-[1.1rem] font-medium text-white'>إضافة منتج</h2>
                </Link>
            </div>
            <div className="w-full" dir="rtl">
                <h1 className="text-[1.1rem] font-medium text-[#A098AE] my-5">طلب ثابت على كافة الطاولات</h1>
                {data && <div className="shadow-md p-5 rounded-[16px] w-full mb-10 flex justify-center gap-[20px] flex-col bg-[#1FA5B8] text-white">
                    <h2>الاسم: {" "}{data.title}</h2>
                    <h2>السعر: {data.price}</h2>
                </div>}
                <form className="w-full mb-10">
                    <MainInput label={'الاسم'} type={'text'} key={10} placeholder={'مياه + محارم'} value={title} setValue={setTitle}/>
                    <MainInput label={'السعر'} type={'number'} key={11} placeholder={'10000'} value={price} setValue={setPrice}/>
                </form>
                <div className={`flex items-center bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] px-[28px] rounded-[16px] opacity-70 hover:opacity-100 w-fit cursor-pointer shadow-md`} onClick={handleSave}>
                    <h2 className='text-[1.1rem] font-medium text-white'>حفظ</h2>
                </div>
            </div>
        </aside>
    )
}

export default RightSideBar