import { Link, useNavigate, useParams } from "react-router-dom"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import { useEffect, useState } from "react";
import AddCart from "../../components/AddCart/AddCart";
import MainInput from '../../components/MainInput/MainInput'
import { API } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import Toast from '../../components/Toast/Toast'

const OwnerAddOrder = () => {
    const { id } = useParams();

    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState([1]);

    const addMoreOrder = () => {
        setCount(prev => [...prev, count.length+1])
        setOrders([...orders.filter(e => (e.productId !== undefined))])
        setTimeout(() => {
            window.scrollTo((count.length + 1) * window.innerHeight, window.innerHeight * (count.length + 1))
        }, 300)
    }

    const [loading, setLoading] = useState(false);
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState(1);

    useEffect(() => {
        setLoading(true);

        axios.get(API.ACCOUNT.GETALLTABLES, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("owner")
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setTables(res.data.data)
                    setTable(res.data.data[0].table)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false);
            })
    }, [])

    const [total, setTotal] = useState([]);

    const [show, setShow] = useState(false);

    const to = useNavigate();

    const handleAdd = () => {
        console.log({
            orders,
            table
        })
        // return;
        setLoading(true);

        axios.post(API.ORDER.ADDBYADMIN, {
            orders,
            table: +table
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("owner")
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    toast.success("تمت الإضافة بنجاح")
                    setTimeout(() => {
                        to('/owner/orders')
                    }, 200)
                }
            })
            .catch(err => {
                console.log(err)
                if(err?.response?.data?.state === 'failed') {
                    toast.error(err.response.data.message)
                    
                    if(err?.response?.data?.data && err.response.data.data.length > 0) {
                        err.response.data.data.map(e => toast.error(e))
                    }
                } else {
                    toast.error(err.message)
                }
            })
            .finally(res => {
                setShow(false)
                setLoading(false);
            })
    }
    
    return (
        <OwnerLayout>
            <div className="w-full mt-[-50px]">
                <h1 className="flex justify-between items-center gap-2">
                    {id
                    ?<span className="font-bold text-[1.5rem]">تعديل طلب</span>
                    :<span className="font-bold text-[1.5rem]">إدخال طلب</span>}
                    <Link to={id?'/owner/orders/':'/owner/orders'} className="flex justify-center items-center gap-2 text-[#1FA5B8] font-bold duration-300 hover:translate-x-[-5px]">
                        <div>رجوع</div>
                        <div>{">"}</div>
                    </Link>
                </h1>
                <div className="mt-5">
                    {loading? <Loading loading={loading}/>:<MainInput label={'الطاولة'} type={'select'} key={15} placeholder={'1'} value={table} setValue={setTable} options={tables}/>}
                </div>
                {count.map((e, index) => <AddCart orders={orders} setOrders={setOrders} key={index} index={index} element={e} countt={count} setCountt={setCount} setTotal={setTotal} total={total}/>)}
                <div className="p-2 rounded-md bg-black text-white w-fit cursor-pointer mb-5" onClick={addMoreOrder}>إضافة منتج آخر</div>
            </div>
            <div className="flex items-center gap-5 mb-10 font-bold">
                <div>الإجمالي الكلي</div>
                <div>{total.map(e => e.price).reduce((a, b) => +a + +b ,0)}</div>
            </div>
            <div className={`flex items-center mx-auto bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] px-[28px] rounded-[16px] opacity-70 hover:opacity-100 w-fit cursor-pointer shadow-md`} onClick={() => setShow(true)}>
                <h2 className='text-[1.1rem] font-medium text-white'>{id?'تعديل':'تأكيد'}</h2>
            </div>
            <Toast show={show} message={"هل تريد تأكيد الطلب؟"}>
                <div className="flex justify-center items-center gap-5 mt-5">
                    <div className="w-[100px] p-2 rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center cursor-pointer" onClick={() => setShow(false)}>لا</div>
                    <div className="w-[100px] p-2 rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center cursor-pointer items-center" onClick={handleAdd}>نعم</div>
                </div>
            </Toast>
        </OwnerLayout>
    )
}

export default OwnerAddOrder