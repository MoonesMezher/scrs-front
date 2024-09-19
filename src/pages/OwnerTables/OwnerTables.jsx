import { useEffect, useRef, useState } from "react"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import axios from "axios"
import { API } from "../../api"
import { MdTableRestaurant } from "react-icons/md"
import { useAlertHooks } from "../../hooks/useAlertHooks"
import Toast from "../../components/Toast/Toast"
import Loading from "../../components/Loading/Loading"
// import html2canvas from 'html2canvas';
import DomToImage from "dom-to-image"
import { saveAs } from 'file-saver';

const OwnerTables = () => {
    const [tables, setTables] = useState([])
    const [users, setUsers] = useState('')
    const [change, setChange] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const { show: showx } = useAlertHooks()

    const [data2, setData2] = useState([]);

    useEffect(() => {
        setLoading(true)

        const fetchData = () => axios.get(API.ACCOUNT.GETALLTABLES, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("owner")
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setData2(res.data.data)
                    setUsers(res.data.users)
                    setTables(res.data.data)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false)
            })
        
            fetchData()
    }, [change, showx])

    const handleReset = (table) => {
        if(!table) {
            return;
        }
        setLoading(true);

        axios.delete(API.USERS.RESET+table, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setChange(!change)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setShow(false)
                setLoading(false)
            })
    }

    const [show2, setShow2] = useState(false);

    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        if(!show2) {
            return;
        }

        setLoading(true)

        axios.get(API.ORDER.GETCHECKOUTOFTABLE+show2, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    const output = []
                    res.data.data.data.map(e => {
                        if(!output.find(r => r.product.id === e.product.id)) {
                            output.push({count: e.count, price: e.price,product: {id: e.product.id, title: e.product.title, price: e.product.price}})
                        } else {
                            const pr = output.find(o => o.product.id === e.product.id)
                            pr.count+=e.count;
                            pr.price+=e.price;
                        }
                    })

                    setCheckout({data: output, totalPrice: res.data.data.totalPrice})
                }
            })
            .catch(err => {
                // console.log(err)
            })
            .finally(res => {
                setLoading(false)
            })
    }, [show2])

    const handleClose = () => {
        setCheckout(false);
        setShow2(false)
    }

    // const handleTakeScreenshot = async () => {
    //     const element = document.querySelector(".table-data")
    //     DomToImage.toPng(element,{
    //         cacheBust: true
    //     })
    //         .then(dataUrl => {
    //             // Create a blob from the data URL
    //             const blob = new Blob([dataUrl], { type: 'image/png' });

    //             // Save the screenshot as a file
    //             saveAs(blob, 'screenshot' + (Math.random() * 2000) + (Math.random() * 2000) + '.png');
    //         })
    //         .catch(error => {
    //             console.error('Error capturing screenshot:', error);
    //         });
    // }

    return (
        <OwnerLayout>
            <span className="font-bold text-[1.5rem] block">إدارة الطاولات</span>
            <div className="my-5 flex items-center gap-[10px] text-[1.1rem]">عدد المستخدمين الكلي: 
                <span className="font-bold">{users && !loading && users}</span>
            </div>
            <div className={`fixed duration-500 ${show?'left-[50%]':'left-[-150%] scale-0'} top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-5 bg-white shadow-md p-20 px-10 rounded-lg z-[200]`}>
                <h1 className="text-center font-bold text-[1.2rem]">هل تريد إغلاق الطاولة {show}؟</h1>
                <div className="flex justify-center items-center gap-5 mt-5">
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setShow(false)}>لا</div>
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleReset(show)}>نعم</div>
                </div>
            </div>
            <Toast show={show2} style={'border-[1px] border-solid border-black'}>
                <Loading loading={loading}/>
                <div className="w-[1000px] max-h-[300px] overflow-y-auto">
                    {!loading && <table className="w-full text-center table-data rounded-md overflow-hidden">
                        <thead className="font-bold bg-[#1FA5B8] text-white">
                            <td className="p-2">المنتج</td>
                            <td className="p-2">السعر</td>
                            <td className="p-2">العدد</td>
                            {/* <td>توقيت</td> */}
                            <td className="p-2">الإجمالي</td>
                        </thead>
                        <tbody>
                            {checkout?.data?.map((e, i) => <tr key={i} className={`${i % 2 === 0? 'bg-white':'bg-[#6dafb871]'}`}>
                                <td className="p-1">{e?.product?.title}</td>
                                <td className="p-1">{e?.product?.price}</td>
                                <td className="p-1">{e?.count}</td>
                                {/* <td className="p-1">{e?.time?.split("T")[1].split(".")[0]}</td> */}
                                <td className="p-1">{e?.price}</td>
                            </tr>)}
                        </tbody>
                    </table>}
                    <div className={`text-center bg-[#1FA5B8] w-fit mx-auto text-white p-2 mt-5 rounded-md`}>
                        <span className="font-bold text-center block">
                            الحساب الكلي:
                            <span className="font-normal ms-2">
                                {checkout?.totalPrice}
                            </span>
                        </span>
                    </div>
                </div>
                {!loading && <div className="flex flex-col justify-center items-center gap-5 mt-5">
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={handleClose}>إغلاق</div>
                    {/* <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={handleTakeScreenshot}>طباعة</div> */}
                </div>}
            </Toast>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1250px]:grid-cols-5 gap-[25px]">
                {tables && tables.map((e, i) => <div key={i} className="bg-white rounded-md shadow-md p-5 text-center text-[.9rem]">
                    <h1 className="font-bold text-[1.5rem]">{e.table}</h1>
                    <MdTableRestaurant className="mx-auto text-[3rem]" />
                    <h2 className="font-bold">الحالة: <span className={`${e.active? 'text-green-500': 'text-red-500'} font-medium`}>
                        <br/>{e.active? 'نشط': 'غير نشط'}
                    </span></h2>
                    <h3 className="my-1">
                    <span className="font-bold">عدد المستخدمين:</span> 
                        <br/>{e.activeUsers}
                    </h3>
                    <h4 className="mb-1">
                        <span className="font-bold">الكود الخاص:</span><br/> {e.code}</h4>
                    {e.active
                    ? 
                    <>
                        <h4 className="mt-5 text-[.9rem] duration-300 cursor-pointer bg-black text-white rounded-md shadow-md w-fit mx-auto p-2 hover:scale-105" onClick={() => setShow(e.table)}>إغلاق الطاولة</h4>
                        <h4 className="mt-2 text-[.9rem] duration-300 cursor-pointer bg-black text-white rounded-md shadow-md w-fit mx-auto p-2 hover:scale-105" onClick={() => setShow2(e.table)}>حساب الطاولة</h4>
                    </>
                    :
                    <>
                        <h4 className="mt-5 text-[.9rem] bg-black opacity-30 text-white rounded-md shadow-md w-fit mx-auto p-2">إغلاق الطاولة</h4>
                        <h4 className="mt-2 text-[.9rem] bg-black opacity-30 text-white rounded-md shadow-md w-fit mx-auto p-2">حساب الطاولة</h4>
                    </>
                    }
                </div>)}
            </div>
        </OwnerLayout>
    )
}

export default OwnerTables
