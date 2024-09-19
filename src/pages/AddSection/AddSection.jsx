import { useEffect, useState } from "react"
import MainInput from "../../components/MainInput/MainInput"
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { API } from "../../api"
import { toast } from "react-toastify"
import Loading from "../../components/Loading/Loading"

const AddSection = () => {
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const to = useNavigate();

    const handleSection = () => {
        if(loading) {
            return;
        }
        setLoading(true)

        if(!id) {
            axios.post(API.SECTION.ADD, {title: name}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('owner')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        toast.success(res.data.message);
                        to('/owner/sections')
                    }
                })
                .catch(err => {
                    if(err?.response?.data?.state === 'failed') {
                        toast.error(err.response.data.message);
                        if(err.response?.data?.data) {
                            err.response?.data?.data.map(e => toast.error(e))
                        }
                    } else {
                        toast.error(err.message);
                    }
                })
                .finally(res => {
                    setLoading(false)
                })
        } else {
            axios.put(API.SECTION.UPDATE+id, {title: name}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('owner')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        toast.success(res.data.message);
                        to('/owner/sections')
                    }
                })
                .catch(err => {
                    if(err?.response?.data?.state === 'failed') {
                        toast.error(err.response.data.message);
                        if(err.response?.data?.data) {
                            err.response?.data?.data.map(e => toast.error(e))
                        }
                    } else {
                        toast.error(err.message);
                    }
                })
                .finally(res => {
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        if(id) {
            setLoading(true);

            // console.log(id);
            

            axios.get(API.SECTION.GETONE+id, {
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('owner')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setName(res.data.data.title);
                    }
                })
                .catch(err => {
                    if(err?.response?.data?.state === 'failed') {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error(err.message);
                    }
                })
                .finally(res => {
                    setLoading(false)
                })
        }
    }, [])

    return (
        <OwnerLayout>
            <div className="w-full">
                <h1 className="flex justify-between items-center gap-2">
                    {!id?
                    <span className="font-bold text-[1.5rem]">إضافة قسم جديد</span>
                    :
                    <span className="font-bold text-[1.5rem]">تعديل قسم</span>}
                </h1>
                <div className="w-full mt-5">
                    <form className="w-full mb-10">
                        <MainInput label={'الاسم'} type={'text'} key={1} placeholder={'مشروبات ساخنة'} value={name} setValue={setName}/>
                    </form>
                    <div className={`flex items-center bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] px-[28px] rounded-[16px] opacity-70 hover:opacity-100 w-fit cursor-pointer shadow-md`} onClick={handleSection}>
                        <h2 className='text-[1.1rem] font-medium text-white'>{id?'تعديل':'إضافة'}</h2>
                    </div>
                </div>
            </div>
            <Loading loading={loading}/>
        </OwnerLayout>
    )
}

export default AddSection