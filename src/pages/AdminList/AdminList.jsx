import { FaCopy, FaEdit, FaEye, FaEyeSlash, FaRegCheckCircle, FaSearch, FaTrash } from "react-icons/fa"
import Img from '../../assets/images/admin-bg.png'
import Logo from '../../assets/images/log.webp'
import { useEffect, useRef, useState } from "react"
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import axios from "axios"
import { API, main } from "../../api"
import { toast } from "react-toastify"
import Loading from "../../components/Loading/Loading"
import { Link } from "react-router-dom"
import { FaRegCircleXmark, FaXmark } from "react-icons/fa6"
import { CiCircleCheck } from "react-icons/ci"

const AdminList = () => {
    const [show, setShow] = useState();

    const [change, setChange] = useState();

    const [showTables, setShowTables] = useState();

    const [accounts, setAccounts] = useState([]);

    const [all, setAll] = useState([]);

    const [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get(API.ACCOUNT.GETALL, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs'),
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    // console.log(res.data.data)
                    setAccounts(res.data.data)
                    setAll(res.data.data)
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false)
            })
    }, [change]);

    const handleAction = (value) => {
        setLoading(true);
        if(value.name === 'Delete') {
            axios.delete(API.ACCOUNT.DELETE+value.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setChange(!change)
                        toast.success(res.data.messsage)
                    }
                })
                .catch(err => {
                    toast.error(err.messsage)
                })
                .finally(res => {
                    setLoading(false);
                    setShow(false)
                })
        } else if(value.name === 'Activate') {
            axios.put(API.ACCOUNT.ACTIVATE+value.id, null, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setChange(!change);
                        toast.success(res.data.messsage)
                    }
                })
                .catch(err => {                    
                    toast.error(err.messsage)
                })
                .finally(res => {
                    setShow(false)
                    setLoading(false);
                })
        } else if(value.name === 'Desactivate') {
            axios.put(API.ACCOUNT.DESACTIVATE+value.id, null, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setChange(!change);
                        toast.success(res.data.messsage);
                    }
                })
                .catch(err => {
                    toast.error(err.messsage)
                })
                .finally(res => {
                    setLoading(false);
                    setShow(false)
                })
        }
    }

    const [by, setBy] = useState('name');

    const handleSearch = (value) => {
        if(!value) {
            setAccounts(all)
        } else {
            const regex = new RegExp(`.*${value}.*`, 'i')

            if(by === 'name') {                
                setAccounts(all.filter(e => regex.test(e.title)))
            } else {
                setAccounts(all.filter(e => regex.test(e.city)))
            }
        }
    }

    const [copied, setCopied] = useState(false);

    const handleCopy = (index, url) => {
        navigator.clipboard.writeText(url);

        setCopied(index);

        setTimeout(() => {
            setCopied(false);
        }, 3000); // Reset the "copied" state after 3 seconds
    };

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] relative overflow-hidden">
            <AdminSideBar>
                <div>
                    {show && <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-20 rounded-md shadow-md w-[400px] z-50">
                        <h1 className="text-center text-[1.2rem] font-medium">Are you sure you want to {show.name} this item?</h1>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <div className="w-[100px] p-2 rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center cursor-pointer" onClick={() => setShow(false)}>No</div>
                            <div className="w-[100px] p-2 rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center cursor-pointer items-center"
                                onClick={() => handleAction(show)}
                            >Yes</div>
                        </div>
                    </div>}
                    {showTables && <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-20 rounded-md shadow-md z-50 w-[90%]">
                        <div className="overflow-scroll text-center h-[400px]">
                        <h1 className="text-center text-[1.5rem] font-bold">{showTables.name}</h1>
                        <div className="flex justify-center items-center flex-col gap-5 mt-5 w-full">
                            {showTables.tables.map((e, i) => <div key={i}>
                                <div className="flex justify-center items-center gap-5">
                                    <h1 className="font-bold">table: {e.table}</h1>
                                    <div className="relative">
                                        <FaCopy className={`cursor-pointer ${(copied === i+1)? 'text-balck':'text-gray-300'}`} onClick={() => handleCopy(i+1, location.origin+'/check/'+e.url)}/>
                                        <div className="absolute right-[-40px] top-[-15px] font-bold">{copied === i+1? 'copied': ''}</div>
                                    </div>
                                </div>
                                <a href={'/check/'+e.url} target="_blank" className="text-wrap break-words text-[1.1rem]">{'check/'+e.url}</a>
                            </div>)}
                            <div className="absolute top-[10px] cursor-pointer right-[10px] duration-300 hover:scale-105" onClick={() => setShowTables(false)}>
                                <FaXmark className="text-[1.2rem]"/>
                            </div>
                        </div>
                        </div>
                    </div>}
                    <div className="w-full ms-[50px] h-[0px] overflow-hidden">
                        <div className="absolute left-[50%] top-[40px] bg-white w-[400px] translate-x-[-50%] rounded-md overflow-hidden flex justify-center items-center pe-4 shadow-md">
                            <select className="ps-1 focus:outline-none cursor-pointer" onChange={(e) => setBy(e.target.value)}>
                                <option className="cursor-pointer" value={'name'}>Name</option>
                                <option className="cursor-pointer" value={'city'}>City</option>
                            </select>
                            <input type="text" className="w-full p-2 focus:outline-none" onChange={(e) => handleSearch(e.target.value)}/>
                            <FaSearch className="text-[1.3rem] cursor-pointer duration-300 hover:scale-105"/>
                        </div>
                    </div>
                    <div className="p-[30px] ps-[90px] w-full h-full">  
                        <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Show</h1>
                        <div className="rounded-[10px] bg-white w-full h-full px-[30px] py-[70px] pb-[100px] shadow-md overflow-scroll">
                            <table className="w-full min-w-[1200px] text-center rounded-[10px]">
                                <thead className="bg-[#eee] h-[50px] overflow-scroll">
                                    <tr>
                                        <th>Id</th>
                                        <th>Logo</th>
                                        <th>Resturant Name</th>
                                        <th>Owner Name</th>
                                        <th>City</th>
                                        <th>Tables</th>
                                        <th>Price (Offer * Tables Count)</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th>Contract</th>
                                        <th>Days</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Loading loading={loading}/>
                                    {!loading && accounts && accounts?.map((e, i) => <tr className={`h-[100px ${i % 2 === 0? 'bg-[#ddd]':'bg-[#eee]'}`} key={i}>
                                        <td className="font-bold">
                                            {i+1}
                                        </td>
                                        <td>
                                            <div className="w-[40px] h-[40px] mx-auto rounded-full overflow-hidden">
                                                <img src={main+e.image} className="w-full h-full"/>
                                            </div>
                                        </td>
                                        <td>
                                            {e.title}
                                        </td>
                                        <td>
                                            {e.name}
                                        </td>
                                        <td>
                                            {e.city}
                                        </td>
                                        <td onClick={() => setShowTables({ tables: e.table.tables, name: e.title })} className="cursor-pointer">
                                            <div className="rounded-md text-white bg-black w-[100px] mx-auto py-1 duration-300 hover:scale-105">
                                                {e?.table?.tables?.length}
                                            </div>
                                        </td>
                                        <td>
                                            {e.offer * e?.table?.tables?.length}
                                        </td>
                                        <td className={`${e.active? 'text-green-500':'text-red-500'} font-bold`}>
                                            {e.active? 'active':'disabled'}
                                        </td>
                                        <td>
                                            {e.createdAt.split("T")[0]}
                                        </td>
                                        <td>
                                            {e?.contract +" month"}
                                        </td>
                                        <td className={`${(new Date().getDate() - new Date(e.createdAt).getDate()) % 30 === 0? 'text-red-500 font-bold':''}`}>
                                            {e.active? (new Date().getDate() - new Date(e.createdAt).getDate()): "None"}
                                        </td>
                                        <td className="flex gap-5 items-center justify-center h-[50px]">
                                            <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/'+e._id}>
                                                <FaEdit className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-purple-500"/>
                                            </Link>
                                            <FaTrash className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-red-500" onClick={() => setShow({ name: 'Delete', id: e._id })}/>
                                            {
                                                e.active?
                                                <FaRegCheckCircle className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-green-500" onClick={() => setShow({ name: 'Desactivate', id: e._id })}/>
                                                :<FaRegCircleXmark className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-red-500" onClick={() => setShow({ name: 'Activate', id: e._id })}/>
                                            }
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminSideBar>
        </div>
    )
}

export default AdminList