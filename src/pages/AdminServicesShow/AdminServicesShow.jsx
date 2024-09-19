import { Link } from "react-router-dom"
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../api"
import Loading from "../../components/Loading/Loading"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"

const AdminServicesShow = () => {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState('')

    const [change, setChange] = useState(false)
    

    useEffect(() => {
        setLoading(true)

        axios.get(API.SERVICES.GETALL, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setServices(res.data.data)
                }
            }) 
            .catch(err => {

            })
            .finally(res => {
                setLoading(false)
            })
    }, [change]);

    const handleDelete = (id) => {
        setLoading(true)

        axios.delete(API.SERVICES.DELETE+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setShow(false)
                    setChange(!change)
                }
            }) 
            .catch(err => {

            })
            .finally(res => {
                setLoading(false)
            })
    }

    return (
        <div className="w-full min-h-screen">
        {show && <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-20 rounded-md shadow-md w-[400px] z-50">
                        <h1 className="text-center text-[1.2rem] font-medium">Are you sure you want to {show?.name} this item?</h1>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <div className="w-[100px] p-2 rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center cursor-pointer" onClick={() => setShow(false)}>No</div>
                            <div className="w-[100px] p-2 rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center cursor-pointer items-center" onClick={() => handleDelete(show?.id)}>Yes</div>
                        </div>
                </div>}
            <AdminSideBar>
                <div className="w-full">
                    <div className="p-[30px] ps-[90px] w-full h-full">  
                        <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Services</h1>
                        <div className='flex items-center gap-[25px] mb-[30px]'>
                            <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services'} className='p-2 rounded-md shadow-md px-6 cursor-pointer duration-300 hover:scale-105 bg-black text-white'>Add</Link>
                            <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/show'} className='p-2 rounded-md shadow-md px-6 cursor-pointer duration-300 hover:scale-105 bg-black text-white'>Show</Link>
                        </div>
                    </div>
                    <div className="p-[30px] ps-[90px] w-full h-full">  
                        <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Show</h1>
                        <div className="rounded-[10px] bg-white w-full h-full px-[30px] py-[70px] pb-[100px] shadow-md overflow-scroll">                       
                            <Loading loading={loading}/>
                            {services && <table className="w-full min-w-[1200px] text-center rounded-[10px]">
                                <thead className="bg-[#eee] h-[50px] overflow-scroll">
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Count Of Resturants</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((e, i) => <tr className={`h-[100px ${i % 2 === 0? 'bg-[#ddd]':'bg-[#eee]'}`} key={i}>
                                        <td className="font-bold">
                                            {i+1}
                                        </td>
                                        <td>
                                            {e.name}
                                        </td>
                                        <td>
                                            {e.price}
                                        </td>
                                        <td>
                                            {e.accounts.length}
                                        </td>
                                        <td className="flex gap-5 items-center justify-center h-[50px]">
                                            <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/join/'+e._id}>
                                                <FaPlus className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-yellow-500"/>
                                            </Link>
                                            <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/'+e._id}>
                                                <FaEdit className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-purple-500"/>
                                            </Link>
                                            <FaTrash className="cursor-pointer text-[1.3rem] duration-300 hover:scale-105 text-red-500" onClick={() => setShow({ name: 'Delete', id: e._id })}/>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>}
                        </div>
                    </div>
                </div>
            </AdminSideBar>
        </div>
    )
}

export default AdminServicesShow