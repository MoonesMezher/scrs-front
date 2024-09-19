import { Link, useLocation } from "react-router-dom"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { API, main } from "../../api";
import { toast } from "react-toastify";

const SeeItems = () => {
    const { pathname } = useLocation();

    const [sections, setSections] = useState([])

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState()

    const [change, setChange] = useState(false)

    useEffect(() => {
        setLoading(true);

        if(pathname?.includes('sections')) {
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
        } else {
            axios.get(API.PRODUCT.GETALLTOOWNER, {
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('owner')
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
        }
    }, [pathname, change])

    const [show, setShow] = useState();
    const [show2, setShow2] = useState();

    const handleDelete = (id) => {
        axios.delete(API.SECTION.DELETE+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setChange(!change)
                    toast.success(res.data.message)
                }                
            })
            .catch(err => {
            })
            .finally(res => {
                setLoading(false)
                setShow(false)
            })
    }

    const handleDelete2 = (id) => {
        axios.delete(API.PRODUCT.DELETE+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setChange(!change)
                    toast.success(res.data.message)
                }                
            })
            .catch(err => {
                // console.log(err);
            })
            .finally(res => {
                setLoading(false)
                setShow2(false)
            })
    }

    return (
        <OwnerLayout>
            <div className="w-full">
                {show && <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-20 rounded-md shadow-md w-[500px] z-50">
                        <h1 className="text-center text-[1.2rem] font-medium">هل أنت متأكد أنك تريد حذف هذه الفئة؟</h1>
                        <h2 className="text-[.8rem] text-center">حذفك لفئة يؤدي لحذف كافة المنتجات والطلبات المتعلقة بها</h2>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <div className="w-[100px] p-2 rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center cursor-pointer" onClick={() => setShow(false)}>No</div>
                            <div className="w-[100px] p-2 rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center cursor-pointer items-center" onClick={() => handleDelete(show)}>Yes</div>
                        </div>
                </div>}
                {show2 && <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-20 rounded-md shadow-md w-[500px] z-50">
                        <h1 className="text-center text-[1.2rem] font-medium">هل أنت متأكد أنك تريد حذف هذه المنتج؟</h1>
                        <h2 className="text-[.8rem] text-center">حذفك لمنتج يؤدي لحذف كافة الطلبات المتعلقة به</h2>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <div className="w-[100px] p-2 rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center cursor-pointer" onClick={() => setShow2(false)}>No</div>
                            <div className="w-[100px] p-2 rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center cursor-pointer items-center" onClick={() => handleDelete2(show2)}>Yes</div>
                        </div>
                </div>}
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">{pathname?.includes('sections')? 'كل الفئات':'كل قائمة الطعام'}</span>
                </h1>
                <div className="w-full mt-5">
                {pathname?.includes('sections') && <div className="grid gap-[25px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1300px]:grid-cols-4 mt-[24px]">
                    {sections.map((e, i) => <div className="shadow-md bg-white p-[20px] rounded-[16px] flex justify-center items-center font-bold duration-300 hover:scale-105 cursor-pointer flex-col" key={i}>
                        <h1>
                            {e.title}
                        </h1>
                        <div className="flex justify-between items-center gap-5 mt-5 w-full">
                            <Link to={'/owner/section/edit/'+e._id}>
                                <FaEdit className="cursor-pointer relative z-10 text-[#1FA5B8] duration-300 hover:scale-105 text-[1.3rem]"/>
                            </Link>
                            <div onClick={() => setShow(e._id)}>
                                <FaTrash className="cursor-pointer relative z-10 text-red-500 duration-300 hover:scale-105 text-[1.2rem]"/>
                            </div>
                        </div>
                    </div>)}
                </div>}
                {pathname?.includes('products') && <div className="grid-products mt-[24px]">
                    {products.map((e, i) => <div className="shadow-md bg-white p-[20px] rounded-[16px] flex justify-center items-center flex-col font-bold duration-300 hover:scale-105 cursor-pointer relative" key={i}>
                        <div className="w-full h-auto aspect-square rounded-[16px] overflow-hidden">
                            <img src={main+e.image} alt="product" className="w-full h-full"/>
                        </div>
                        <h1 className="mt-5">{e.title}</h1>                    
                        <span className="absolute left-0 top-0 bg-[#1FA5B8] text-white p-1 shadow-md">{e.section.title}</span>
                        <h2 className="mt-2 font-medium" dir="ltr">{e.price} s.p</h2>                    
                        <div className="flex justify-between items-center gap-5 mt-5 w-full">
                            <Link to={'/owner/product/edit/'+e._id}>
                                <FaEdit className="cursor-pointer relative z-10 text-[#1FA5B8] duration-300 hover:scale-105 text-[1.3rem]"/>
                            </Link>
                            <div onClick={() => setShow2(e._id)}>
                                <FaTrash className="cursor-pointer relative z-10 text-red-500 duration-300 hover:scale-105 text-[1.2rem]"/>
                            </div>
                        </div>
                    </div>)}
                </div>}
                </div>
            </div>
        </OwnerLayout>
    )
}

export default SeeItems