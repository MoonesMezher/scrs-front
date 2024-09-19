import { FaPlus } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { API, main } from "../../api"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAccountHook } from "../../hooks/useAccountHook"

const ProductSearchCard = ({ info, index }) => {
    const a = useRef()
    const priceRef = useRef()

    const to = useNavigate();

    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState(false)

    const { account } = useAccountHook();

    useEffect(() => {
        if(!localStorage.getItem("account")) {
            return;
        }
        a.current.style.backgroundColor = account?.account?.mainColor
        priceRef.current.style.color = account?.account?.mainColor
    }, [])

    const handleAdd = () => {
        if(loading) {
            return;
        }

        axios.post(API.ORDER.ADD, { count: 1, productId: info._id },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('user')
                }
            }
        )
            .then(res => {
                if(res.data.state === 'success') {
                    setShow(true)
                }
            })
            .catch(err => {
                // console.log(err);                
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/check/'+account.token)
                }
            })
            .finally(res => {
                setLoading(false);
                setTimeout(() => {
                    setShow(false);
                }, 3000)
            })
    }


    return (
        <div className="relative">
        <Link to={'/product/'+account?.token+'/'+info._id} className="block p-[1rem] rounded-[10px] bg-white shadow-md md:text-center relative product">
            <div className="overflow-hidden w-full h-[200px] max-[600px]:h-[300px] rounded-[10px]">
                <img src={main+info?.image} className="w-full h-full object-cover duration-300"/>
            </div>
            <h1 className="text-[1rem] font-medium my-[12px] text-right md:text-center">{info?.title}</h1>
            <h2 className="w-fit text-[#ce2428] md:text-center font-medium" ref={priceRef}>{info.price} s.p</h2>
        </Link>
        <div className="text-center mx-auto p-5 rounded-full text-white w-fit relative z-40 shadow-md translate-y-[-50%] duration-300 hover:scale-105 cursor-pointer" ref={a} onClick={handleAdd}>
            <FaPlus/>
        </div>
        <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${show? 'scale-100':'scale-0'}`}>
            <h1 className='flex text-green-500 text-[1.2rem] text-center'>
                لقد تمت إضافة المنتج الى السلة بنجاح
            </h1>
        </div>
        </div>
    )
}

export default ProductSearchCard