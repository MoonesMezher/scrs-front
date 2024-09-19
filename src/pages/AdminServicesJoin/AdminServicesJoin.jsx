import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import { Link, useParams } from 'react-router-dom'
import { API } from '../../api';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { FaMinus, FaPlus } from 'react-icons/fa';

const AdminServicesJoin = () => {
    const { id } = useParams();

    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false)

    const [change, setChange] = useState(false)

    useEffect(() => {
        setLoading(true)

        axios.get(API.SERVICES.SHOWACCOUNTS+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setAccounts(res.data.data)
                }
            }) 
            .catch(err => {
            })
            .finally(res => {
                setLoading(false)
            })
    }, [change])

    const handleAdd = (accId) => {
        if(!accId) return;

        setLoading(true)

        axios.put(API.SERVICES.ADDACCOUNTS+id, {
            account: accId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
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
                setLoading(false)
            })
    }

    const handleRemove = (accId) => {
        if(!accId) return;

        setLoading(true)

        axios.put(API.SERVICES.REMOVEACCOUNT+id, {
            account: accId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
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
                setLoading(false)
            })
    }

    return (
        <div className='w-full min-h-screen'>
            <AdminSideBar>
            <div className="w-full">
                <div className="p-[30px] ps-[90px] w-full h-full">  
                    <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Services</h1>
                    <div className='flex items-center gap-[25px] mb-[30px]'>
                        <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services'} className='p-2 rounded-md shadow-md px-6 cursor-pointer duration-300 hover:scale-105 bg-black text-white'>Add</Link>
                        <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/show'} className='p-2 rounded-md shadow-md px-6 cursor-pointer duration-300 hover:scale-105 bg-black text-white'>Show</Link>
                    </div>
                </div>
                    <Loading loading={loading}/>
                    {accounts && <div className="p-[30px] ps-[90px] w-full h-full">  
                        <div className="rounded-[10px] bg-white w-full h-full px-[30px] py-[70px] pb-[100px] shadow-md overflow-scroll">                       
                        <table className="w-full min-w-[1200px] text-center rounded-[10px]">
                                <thead className="bg-[#eee] h-[50px] overflow-scroll">
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Owner</th>
                                        <th>state</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((e, i) => <tr className={`h-[100px ${i % 2 === 0? 'bg-[#ddd]':'bg-[#eee]'}`} key={i}>
                                        <td className="font-bold">
                                            {i+1}
                                        </td>
                                        <td>
                                            {e.account.title}
                                        </td>
                                        <td>
                                            {e.account.name}
                                        </td>
                                        <td className={`${e.state === 'Yes'? 'text-green-500':'text-red-500'}`}>
                                            {e.state}
                                        </td>
                                        <td className="flex gap-5 items-center justify-center h-[50px]">
                                            {e.state !== 'Yes'? 
                                                <FaPlus className='text-green-500 cursor-pointer' onClick={() => handleAdd(e.account._id)}/>
                                                : <FaMinus className='text-red-500 cursor-pointer' onClick={() => handleRemove(e.account._id)}/>
                                            }
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

export default AdminServicesJoin