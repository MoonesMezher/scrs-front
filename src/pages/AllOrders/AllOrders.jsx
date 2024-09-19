import { useEffect, useState } from "react"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import axios from "axios"
import { API } from "../../api"
import changeToSyrianTime from "../../helpers/changeToSyrianTime"

const AllOrders = () => {
    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)    
    const [pages, setPages] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        setLoading(true);

        axios.get(API.ORDER.ALLCARTSBYPAGE+page, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    console.log(res.data)
                    setCarts(res.data.data)
                    setPages(res.data.pages)
                    setTotal(res.data.total);
                }
            })
            .catch(err => {
            })
            .finally(res => {
                setLoading(false);
            })

    }, [page])
    
    return (
        <OwnerLayout>
            <div className="w-full">
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">{'كل الطلبات'}</span>
                    <span className="font-bold text-[1.5rem]">{total}</span>
                </h1>
                {true && <div className="flex justify-center items-center gap-[20px]">
                    {page !== 1 && <div className="text-[2rem] cursor-pointer duration-300 hover:text-cyan-500 font-bold" onClick={() => setPage(page - 1)}>{'<'}</div>}            
                    <div className="text-[2rem] font-bold">{page}</div>
                    {page !== pages && <div className="text-[2rem] cursor-pointer duration-300 hover:text-cyan-500 font-bold" onClick={() => setPage(page + 1)}>{'>'}</div>}
                </div>}
                <div className="mb-5 mt-3">الصفحة: {page} من {pages}</div>
                <div className="grid grid-cols-1 gap-[16px] mt-[24px]">
                    {carts && !loading && carts.map((e, i) => <div className="shadow-md bg-white p-[20px] rounded-[16px] flex font-bold duration-300 cursor-pointer relative overflow-hidden flex-col items-center" key={i}>
                        <div className="w-full">
                            <h1 className="font-medium bg-[#1FA5B8] flex justify-center items-center text-white rounded-md p-1 w-fit gap-2" dir="rtl">رقم الطاولة
                                <div className="font-bold text-center text-[2rem]">
                                    {e.table}
                                </div>
                            </h1>
                            <table className="w-full text-center mt-5">
                                <thead className="h-[50px] bg-[#ddd]">
                                    <tr>
                                        <th>المنتج</th>
                                        <th>قسم</th>
                                        <th>العدد</th>
                                        <th>السعر المفرد</th>
                                        <th>السعر الإجمالي</th>
                                        <th>ملاحظات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {e.orders && e.orders.map((o, index) => <tr className={`${index === 0? 'bg-[#eee]' : 'bg-[#ddd]'}`} key={index}>
                                        <td>{o?.prodcut.title}</td>
                                        <td>{o?.section}</td>
                                        <td>{o?.count}</td>
                                        <td>{o?.prodcut.price}</td>
                                        <td>{o?.price}</td>
                                        <td className="overflow-x-scroll w-[50%]">{o?.note}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                            <h1 className="font-medium bg-[#1FA5B8] flex justify-center items-center text-white rounded-md p-1 w-fit gap-2 mt-5" dir="rtl">
                                السعر الاجمالي
                                <div className="font-bold text-center text-[2rem]">
                                    {e.price}
                                </div>
                            </h1>
                            <h1 className="p-2 w-fit" dir="ltr">{changeToSyrianTime(e.createdAt)}</h1>
                            <div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </OwnerLayout>
    )
}

export default AllOrders