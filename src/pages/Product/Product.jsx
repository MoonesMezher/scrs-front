import { useEffect, useRef, useState } from 'react'
import { FaCheck } from 'react-icons/fa6';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API, main } from '../../api';
import Loading from '../../components/Loading/Loading';
import { MdError } from 'react-icons/md';
import checkFromToken from '../../helpers/checkFromTokenAsParams';
import { useAccountHook } from '../../hooks/useAccountHook';
import Toast from '../../components/Toast/Toast';

const Product = () => {
    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState();

    const { id } = useParams();

    const { account } = useParams();

    const { account: acc } = useAccountHook();

    const to = useNavigate();

    if(checkFromToken(acc, account)) {
        to('/check/'+account)
    }


    useEffect(() => {
        setLoading(true)
        axios.get(API.PRODUCT.GETONE+id)
            .then(res => {
                if(res.data.state === 'success') {
                    setProduct(res.data.data)
                }
            })
            .catch(err => {
                if(err.response.data.state === 'failed') {
                    to('/error')
                }
            })
            .finally(res => {
                setLoading(false)
            })
    }, [id]);

    const [note, setNote] = useState();
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);

    const handleAdd = () => {
        setLoading(true)
        axios.post(API.ORDER.ADD, {
            count,
            note,
            productId: id
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setShow(true)
                    
                    setTimeout(() => {
                        setShow(false)
                        to('/show/'+acc.token)
                    }, 3000)
                }
            })
            .catch(err => {
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/check/'+acc.token)
                } else if(err.response?.data?.state === 'failed') {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
                setTimeout(() => {
                    setError(false)
                }, 3000)
            })
            .finally(res => {
                setLoading(false)
            })
    }

    const price = useRef()
    const itemPrice = useRef()
    const add = useRef()

    useEffect(() => {
        add.current.style.backgroundColor = acc?.account?.mainColor
        itemPrice.current.style.color = acc?.account?.mainColor
        price.current.style.color = acc?.account?.mainColor
    }, [acc])

    return (<>
        <div className={`w-full min-h-screen ${product? '':'scale-0'}`}>
            <div className="w-full h-[55vh] relative">
                <img src={main+product?.image} alt="product" className="w-full h-full"/>
                <div className='absolute left-[50%] translate-x-[-50%] bottom-[-20px] w-fit z-40'>
                    <div className='rounded-[30px] flex justify-center items-center bg-white overflow-hidden shadow-md'>
                        {count > 0 && <div className='flex shadow-md font-bold p-2 cursor-pointer duration-300 hover:scale-105 px-4 text-[1.2rem] text-[#F9B249] justify-center items-center' onClick={() => setCount(count === 0? 0: count - 1)}>
                            -
                        </div>}
                        <div className='text-[#F9B249] bg-white flex shadow-md font-bold p-2 cursor-pointer duration-300 hover:scale-105 px-4 text-[1.2rem] justify-center items-center'>{count}</div>
                        <div className='bg-[#F9B249] h-full w-full flex shadow-md font-bold p-2 cursor-pointer duration-300 hover:scale-105 px-4 text-[1.2rem] text-white justify-center items-center' onClick={() => setCount(count + 1)}>
                            +
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-2 mt-14 pb-10 flex flex-col gap-[14px]" dir='rtl'>    
                <div className='rounded-[10px] bg-[#FFFFFF] shadow-md p-[22px] w-full'>
                    <h1 className='text-right text-[1.25rem] font-medium leading-[37px]'>{product?.title}</h1>
                    <h2 className='text-[#F21414] text-[1.5rem] font-bold leading-[45px] text-left' ref={itemPrice} dir='ltr'>{product?.price} s.p</h2>
                </div>
                <div className='rounded-[10px] bg-[#FFFFFF] shadow-md p-[22px] w-full'>
                    <h1 className='text-right text-[1.25rem] font-medium leading-[28px]'>عن المنتج:</h1>
                    <h2 className='text-right text-[#B1B1B3] text-[.9rem] font-medium leading-[28px] mt-3'>
                        {product?.desc}
                    </h2>
                </div>
                <div className='rounded-[10px] bg-[#FFFFFF] shadow-md p-[22px] w-full'>
                    <h1 className='text-right text-[1.25rem] font-medium leading-[28px]'>إضافة ملاحظات:</h1>
                    <textarea rows={5} className='w-full bg-[#F8F8F8] rounded-[10px] mt-3 focus:outline-none p-2 h-full outline-none border-none' placeholder='بدون جبن' onChange={(e) => setNote(e.target.value)}> 
                    </textarea>
                </div>
                <div className={`rounded-[10px] bg-[#FFFFFF] shadow-md p-[22px] w-full duration-300 ${count > 0? 'scale-100':'scale-0 opacity-0'}`}>
                    <h1 className='text-right text-[1.25rem] font-medium leading-[37px]'>الإجمالي:</h1>
                    <h2 className='text-[#F21414] text-[1.5rem] font-bold leading-[45px] text-left' dir='ltr' ref={price}>{count * product?.price} s.p</h2>
                </div>
                <div className={`bg-[#F21414] p-[20px] rounded-[30px] rounded-se-[0] text-white w-fit mx-auto mt-5 shadow-md duration-300 hover:scale-105 cursor-pointer ${count === 0?'scale-0':'scale-100'}`} onClick={handleAdd} ref={add}>
                    إضافة الى السلة
                </div>
            </div>
            <Toast show={show} isScale={true}>
                <h1 className='flex justify-center items-center flex-row-reverse gap-2 text-green-500 text-center text-[1.2rem]'>تمت الإضافة الى السلة بنجاح 
                    <FaCheck className='text-green-500 text-[1.2rem]'/>
                </h1>
            </Toast>
            <Toast show={error} isScale={true}>
                <h1 className='flex justify-center flex-row-reverse items-center gap-2 text-red-500 text-[1.2rem] text-center'>
                    {error}
                    <MdError className='text-red-500 text-[1.2rem]'/>
                </h1>
            </Toast>
        </div>
        <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-md'>
            <Loading loading={loading}/>
        </div></>
    )
}

export default Product