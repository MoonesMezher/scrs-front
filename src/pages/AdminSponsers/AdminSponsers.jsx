import { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";
import { API } from "../../api";
import ErrorResponse from "../../components/ErrorResponse/ErrorResponse";

const AdminSponsers = () => {
    const [name, setName] = useState('');
    const [percent, setPercent] = useState(0);

    const [sponsers, setSponsers] = useState([]);
    const [change, setChange] = useState(false);

    const [show, setShow] = useState(false);

    const [error, setError] = useState();
    const [errorData, setErrorData] = useState([]);    
    const [loading, setLoading] = useState();
    
    const handleCreate = () => {
        if(loading) {
            return;
        }
        setLoading(true)
        axios.post(API.ADMIN.ADDSPONSER, {
            name, percent: percent+'%'
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs') 
            }
        })
        .then(res => {
            setError()
            setErrorData([])
            if(res.data.state === 'success') {
                setName("")
                setPercent("")
                setChange(!change)
            }
        })
        .catch(err => {
            if(err.response.data.state === 'failed') {
                setError(err.response.data.message);
                
                if(err.response.data?.data && err.response.data.data.length > 0) {
                    setErrorData(err.response.data.data)
                }
            } else {
                setError(err.message);
            }
        })
        .finally(res => {
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(true);
        axios.get(API.ADMIN.GETSPONSERS, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setSponsers(res.data.data)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false);
            })
    }, [change])

    const handleDelete = async (id) => {
        setLoading(true);
        axios.delete(API.ADMIN.DELETESPONSER+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setChange(!change)
                    setShow("")
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false);
            })
    }

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] relative overflow-hidden">
            {show && <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-20 rounded-md shadow-md w-[400px] z-50">
                        <h1 className="text-center text-[1.2rem] font-medium">Are you sure you want to {show.name} this item?</h1>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <div className="w-[100px] p-2 rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center cursor-pointer" onClick={() => setShow(false)}>No</div>
                            <div className="w-[100px] p-2 rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center cursor-pointer items-center" onClick={() => handleDelete(show?.id)}>Yes</div>
                        </div>
                </div>}
            <AdminSideBar>
                <div className="w-full">
                    <div className="p-[30px] ps-[90px] w-full h-full">  
                        <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Sponsers</h1>
                        <div className="rounded-[10px] bg-white w-full h-full px-[30px] py-[70px] pb-[100px] shadow-md">
                        <form className="w-full">
                            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-10">
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Full Name</h1>
                                    <input type="text" value={name} placeholder="Full Name" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full" onChange={(e) => setName(e.target.value)}/>
                                    <ErrorResponse error={errorData.find(e => e === 'name')}/>
                                </label>
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Percent</h1>
                                    <input type="number" value={percent} placeholder="10%" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full" min={0} max={100} onChange={(e) => setPercent(e.target.value)}/>
                                    <ErrorResponse error={errorData.find(e => e === 'percent')}/>
                                </label>
                            </div>
                            <ErrorResponse error={error}/>
                            <div className="w-full mt-10">
                                <label>
                                    <div className="py-[10px] px-[38px] bg-[#4181f973] text-[#2C659B] text-[15px] font-normal leading-[22px] w-fit rounded-[7.4px] cursor-pointer shadow-md duration-300 hover:scale-105 mx-auto" onClick={handleCreate}>
                                        Add Sponser
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                    </div>
                    {sponsers && <div className="p-[30px] ps-[90px] w-full h-full">  
                        <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Show</h1>
                        <div className="rounded-[10px] bg-white w-full h-full px-[30px] py-[70px] pb-[100px] shadow-md overflow-scroll">                       
                        <table className="w-full min-w-[1200px] text-center rounded-[10px]">
                                <thead className="bg-[#eee] h-[50px] overflow-scroll">
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Percent</th>
                                        <th>Count Of Resturant</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sponsers.map((e, i) => <tr className={`h-[100px ${i % 2 === 0? 'bg-[#ddd]':'bg-[#eee]'}`} key={i}>
                                        <td className="font-bold">
                                            {i+1}
                                        </td>
                                        <td>
                                            {e.name}
                                        </td>
                                        <td>
                                            {e.percent}
                                        </td>
                                        <td>
                                            {e.countResturants}
                                        </td>
                                        <td className="flex gap-5 items-center justify-center h-[50px]">
                                            {/* <FaEdit className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-purple-500"/> */}
                                            <FaTrash className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-red-500" onClick={() => setShow({ name: 'Delete', id: e._id })}/>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>}
                </div>
            </AdminSideBar>
        </div>
    )
}

export default AdminSponsers