import { Link, useLocation } from "react-router-dom"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import { useContext, useEffect, useState } from "react"
import { API, main } from "../../api"
import axios from "axios"
import Loading from "../../components/Loading/Loading"
import { SocketContext } from "../../context/socketContext"

const OwnerDash = () => {
    const [sections, setSections] = useState([])
    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState();

    useEffect(() => {
        axios.get(API.SECTION.GETALLTOOWNER, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setSections(res.data.data)
                }                    
            })
            .catch(err => {
            })
            .finally(res => {
                setLoading(false)
            })
    }, []);

    useEffect(() => {
        axios.get(API.PRODUCT.GETALLTOOWNER, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setProducts(res.data.data)
                }                    
            })
            .catch(err => {
            })
            .finally(res => {
                setLoading(false)
            })
    }, []);

    return (
        <OwnerLayout>
            <div className="w-full">
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">الفئات</span>
                    <Link to={'/owner/sections'} className="flex justify-center items-center gap-2 text-[#1FA5B8] font-bold duration-300 hover:translate-x-[-5px]">
                        <div>عرض الكل</div>
                        <div>{">"}</div>
                    </Link>
                </h1>
                <Loading loading={loading}/>
                <div className="grid gap-[25px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1300px]:grid-cols-4 mt-[24px]">
                    {sections && sections.slice(0,5).map((e, i) => <div className="shadow-md bg-white p-[20px] rounded-[16px] flex justify-center items-center font-bold duration-300 hover:scale-105 cursor-pointer flex-col" key={i}>
                        <h1>
                            {e.title}
                        </h1>
                    </div>)}
                </div>
            </div>
            <div className="w-full mt-[40px]">
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">قائمة الطعام</span>
                    <Link to={'/owner/products'} className="flex justify-center items-center gap-2 text-[#1FA5B8] font-bold duration-300 hover:translate-x-[-5px]">
                        <div>عرض الكل</div>
                        <div>{">"}</div>
                    </Link>
                </h1>
                <div className="grid-products mt-[24px]">
                    {products && products.slice(0,9).map((e, i) => <div className="shadow-md bg-white p-[20px] rounded-[16px] flex justify-center items-center flex-col font-bold duration-300 hover:scale-105 cursor-pointer relative" key={i}>
                        <div className="w-full h-auto aspect-square rounded-[16px] overflow-hidden">
                            <img src={main+e.image} alt="product" className="w-full h-full"/>
                        </div>
                        <h1 className="mt-5">{e.title}</h1>                    
                        <span className="absolute left-0 top-0 bg-[#1FA5B8] text-white p-1 shadow-md">{e.section.title}</span>
                        <h2 className="mt-2 font-medium" dir="ltr">{e.price} s.p</h2>                    
                    </div>)}
                </div>
            </div>
        </OwnerLayout>
    )
}

export default OwnerDash