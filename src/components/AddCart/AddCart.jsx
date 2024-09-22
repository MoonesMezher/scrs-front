import axios from "axios";
import Loading from "../Loading/Loading"
import MainInput from "../MainInput/MainInput"
import { API } from "../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AddCart = ({ index, countt, setCountt, element, setTotal, total, orders, setOrders }) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState();
    const [products, setProducts] = useState([]);
    const [tables, setTables] = useState([]);
    const [count, setCount] = useState(1);
    const [note, setNote] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setLoading(true);

        axios.get(API.PRODUCT.GETALLTOOWNER, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("owner")
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setProducts(res.data.data)
                    setProduct(res.data.data[0]._id)
                    setPrice(res.data.data[0].price)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false);
            })
    }, [])

    const removeOrder = (i) => {
        // console.log(i, element, countt)
        setCountt(countt.filter(e => e !== i))
        setTotal(total.filter(e => (e.product !== element)))
        setOrders(orders.filter(e => (e.element !== element)))
    }

    useEffect(() => {
        // console.log(total)        
        // console.log(product)
        setTotal([...total.filter(e => (e.product !== element && e.product !== undefined)), {price: (count * price), product: element}])
    }, [count, product])

    useEffect(() => {
        setOrders([...orders.filter(e => (e.element !== element && e.productId !== undefined)), { element, productId: product, count: +count, note }])
    }, [total, note])

    return (
        loading? <Loading loading={loading}/>:<div className={`w-full mt-5`}>   
                    {index !== 0 && <div className="w-full h-[2px] bg-black mb-5"/>}
                    <div className="w-full flex justify-between">
                        <div className="flex items-center gap-10 mb-5 font-bold text-[1.5rem]">{"الطلب"} {(index+1)}</div>
                        {index !== 0 && <div className="p-2 rounded-md bg-red-600 text-white w-fit cursor-pointer h-fit duration-300 hover:scale-105" onClick={() => removeOrder(element)}>حذف</div>}
                    </div>
                    <form className="w-full mb-10">
                        <div className="flex justify-between">
                            <div className="w-[80%]">
                                <MainInput label={'المنتج'} type={'select'} key={10} placeholder={'قهوة صغير'} value={product} setValue={setProduct} options={products}/>
                            </div>
                            <div className="w-[17%]">
                                <MainInput label={'الكمية'} type={'number'} key={11} placeholder={'1'} value={count} setValue={setCount} />                        
                            </div>
                        </div>
                        <div className="flex gap-2 mb-3">
                            <h1>سعر المنتج</h1>
                            <h2>{price}</h2>
                        </div>
                        <MainInput label={'ملاحظات'} type={'textarea'} key={4} placeholder={'لا يوجد'} value={note} setValue={setNote}/>
                        <div className="flex gap-2 mb-3">
                            <h1>الإجمالي</h1>
                            <h2>{price * count}</h2>
                        </div>
                    </form>
                </div>
    )
}

export default AddCart