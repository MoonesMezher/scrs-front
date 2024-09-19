import React, { useEffect, useState } from 'react'
import ErrorResponse from '../../components/ErrorResponse/ErrorResponse'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../api'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'

const AdminServices = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [error, setError] = useState('')
    const [errorData, setErrorData] = useState([])

    const [loading, setLoading] = useState();

    const to = useNavigate();

    const { id } = useParams()
    
    const handleCreate = () => {
        if(loading) {
            return;
        }

        setLoading(true)

        if(id) {
            axios.put(API.SERVICES.UPDATE+id, {
                name, price: +price
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adminScrs') 
                }
            })
            .then(res => {
                setError()
                setErrorData([])
                if(res.data.state === 'success') {
                    to('/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/show')
                    setName("")
                    setPrice("")
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
        } else {   
            axios.post(API.SERVICES.ADD, {
                name, price: +price
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adminScrs') 
                }
            })
            .then(res => {
                setError()
                setErrorData([])
                if(res.data.state === 'success') {
                    to('/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/show')
                    setName("")
                    setPrice("")
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
    }

    useEffect(() => {
        if(!id) {
            return;
        }

        setLoading(true);

        axios.get(API.SERVICES.GETONE+id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs') 
            }
        })
        .then(res => {
            if(res.data.state === 'success') {
                setName(res.data.data.name)
                setPrice(res.data.data.price)
            }
        })
        .catch(err => {
        })
        .finally(res => {
            setLoading(false);
        })
    }, [id])

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] relative overflow-hidden">
            <AdminSideBar>
                <div className="w-full">
                    <div className="p-[30px] ps-[90px] w-full h-full">  
                        <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Services</h1>
                        <div className='flex items-center gap-[25px] mb-[30px]'>
                            <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services'} className='p-2 rounded-md shadow-md px-6 cursor-pointer duration-300 hover:scale-105 bg-black text-white'>Add</Link>
                            <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/show'} className='p-2 rounded-md shadow-md px-6 cursor-pointer duration-300 hover:scale-105 bg-black text-white'>Show</Link>
                        </div>
                        <div className="rounded-[10px] bg-white w-full h-full px-[30px] py-[70px] pb-[100px] shadow-md">
                        <form className="w-full">
                            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-10">
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Name</h1>
                                    <input type="text" value={name} placeholder="Name Of Service" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full" onChange={(e) => setName(e.target.value)}/>
                                    <ErrorResponse error={errorData?.find(e => e === 'name')}/>
                                </label>
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Price</h1>
                                    <input type="number" value={price} placeholder="10" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full" min={0} onChange={(e) => setPrice(e.target.value)}/>
                                    <ErrorResponse error={errorData?.find(e => e === 'price')}/>
                                </label>
                            </div>
                            <ErrorResponse error={error}/>
                            <Loading loading={loading}/>
                            <div className="w-full mt-10">
                                <label>
                                    <div className="py-[10px] px-[38px] bg-[#4181f973] text-[#2C659B] text-[15px] font-normal leading-[22px] w-fit rounded-[7.4px] cursor-pointer shadow-md duration-300 hover:scale-105 mx-auto" onClick={handleCreate}>
                                        {id? 'Update ': 'Add '} Service
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                    </div>
                 
                </div>
            </AdminSideBar>
        </div>
    )
}

export default AdminServices