import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tableContext } from "../../context/tableContext";
import { API } from "../../api";
import axios from "axios";
import { MdTableRestaurant } from "react-icons/md";
import Loading from "../../components/Loading/Loading";
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout";

const OwnerOrdersTables = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get(API.ACCOUNT.GETALLTABLES, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setData(res.data.data)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false);
            })
    }, []);

    const { show } = useContext(tableContext);

    const to = useNavigate()

    return (
        <OwnerLayout>
            <div className="w-full">
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">قائمة الطلبات</span>
                    <Link to={'/owner/all-orders'} className="flex justify-center items-center gap-2 text-[#1FA5B8] font-bold duration-300 hover:translate-x-[-5px]">
                        <div>عرض الكل</div>
                        <div>{">"}</div>
                    </Link>
                </h1>
                <Loading loading={loading}/>
                <div className="grid grid-cols-10 max-[650px]:grid-cols-5 max-[450px]:grid-cols-3 gap-[16px] mt-[24px]">
                    {!loading && data && data.length !== 0 && data.map((e, i) => <div className="shadow-md overflow-hidden bg-white p-[20px] rounded-[16px] flex justify-center items-center flex-col font-bold duration-300 hover:scale-105 cursor-pointer relative" key={i} onClick={() => to('/owner/orders/'+e.table)}>
                        <h1 className="font-medium text-center pt-2" dir="ltr">الطاولة
                            <div className="font-bold text-center text-[1rem]">
                                {e.table}
                            </div>
                            {show?.includes("o"+e.table) && <div className='w-[20px] h-[20px] rounded-full bg-red-500 absolute left-[50%] translate-x-[-50%] top-[10px]'/>}
                            <MdTableRestaurant className="mx-auto text-[2rem]" />
                        </h1>                    
                    </div>)}
                </div>
            </div>
        </OwnerLayout>
    )
}

export default OwnerOrdersTables