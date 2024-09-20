import ScrollAnimation from "react-animate-on-scroll"
import { FaPlus } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { API, main } from "../../api"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAccountHook } from "../../hooks/useAccountHook"
import Toast from "../Toast/Toast"

const ProductCard = ({ info, index, setShow }) => {
    const [loading, setLoading] = useState();

    const { account } = useAccountHook();

    const to = useNavigate();

    const handleAdd = () => {
        if(loading) {
            return;
        }

        axios.post(API.ORDER.ADD, { count: 1, productId: info._id }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setShow(true)
                }
            })
            .catch(err => {
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/code')
                }
            })
            .finally(res => {
                setLoading(false);
                setTimeout(() => {
                    setShow(false);
                }, 3000)
            })
    }

    const a = useRef();
    const b = useRef();

    useEffect(() => {
        if(!localStorage.getItem('account')) {
            return;
        }
        a.current.style.backgroundColor = account?.account?.mainColor
        b.current.style.color = account?.account?.mainColor
    }, [account])

    return (
        <ScrollAnimation animateIn={index % 2 === 0? 'slideInLeft' :'slideInRight'} animateOnce={false} delay={index * 100}>
        <div className="block p-[1rem] rounded-[10px] bg-white shadow-md md:text-center relative product">
            <Link to={'/product/'+account?.token+'/'+info._id} className="block overflow-hidden w-full h-auto aspect-square rounded-[10px] mx-auto">
                <img src={main+info?.image} className="w-full h-full duration-300"/>
            </Link>
            <div className="flex flex-row-reverse items-end justify-between pb-5 w-full">
                <div>
                    <h1 className="text-[1rem] font-medium my-[10px] mb-0 text-right md:text-center">{info?.title}</h1>
                    <h2 className="w-fit md:text-center font-medium ms-auto" ref={b}>{info.price} s.p</h2>
                </div>
                <div className="text-center p-3 rounded-full text-white w-fit shadow-md duration-300 hover:scale-105 cursor-pointer h-fit translate-x-[-30%] translate-y-[80%] relative z-50" onClick={handleAdd} ref={a}>
                    <FaPlus/>
                </div>
            </div>
        </div>
        </ScrollAnimation>
    )
}

export default ProductCard