import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import MainInput from "../../components/MainInput/MainInput"
import { useState, useRef, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { API, main } from "../../api"
import axios from "axios"
import Loading from "../../components/Loading/Loading"
import { toast, ToastContainer } from "react-toastify"

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState();
    const [info, setInfo] = useState('');
    const [section, setSection] = useState('');
    const [file, setFile] = useState('');

    const fileRef = useRef();

    const { id } = useParams()

    const [sections, setSections] = useState([]);

    const handleFile = () => {
        fileRef.current.click();
    }
    
    const [loading, setLoading] = useState();

    const [account, setAccount] = useState([]);    

    const [loadingUpdate, setLoadingUpdate] = useState(id && loading);

    const to = useNavigate()

    const handleCreate = () => {
        if(loading) {
            return;
        }

        setLoading(true);

        console.log(!id)

        if(!id) {
            axios.post(API.PRODUCT.ADD, {
                title: name, 
                image,
                price: +price,
                desc: info,
                sectionId: section,
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('owner')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setName("") 
                        setImage("")
                        setPrice(0)
                        setSection("")
                        setInfo("")
                        toast.success(res.data.message)
                        to('/owner/products/')
                    }
                })
                .catch(err => {                                
                    if(err.response.data.state === 'failed') {
                        toast.error(err.response.data.message)
                        
                        if(err.response.data?.data && err.response.data.data.length > 0) {
                            err.response.data.data.map(e => toast.error(e))
                        }
                    } else {
                        toast.error(err.message);
                    }
                })
                .finally(res => {
                    setLoading(false)
                });
        } else {
            axios.put(API.PRODUCT.UPDATE+id, {
                title: name, 
                image,
                price: +price,
                desc: info,
                sectionId: section,
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('owner')
                }
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        setName("") 
                        setImage("")
                        setPrice(0)
                        setSection("")
                        setInfo("")
                        toast.success(res.data.message)
                        to('/owner/products/')
                    }
                })
                .catch(err => {                                
                    if(err.response.data.state === 'failed') {
                        toast.error(err.response.data.message)
                        
                        if(err.response.data?.data && err.response.data.data.length > 0) {
                            err.response.data.data.map(e => toast.error(e))
                        }
                    } else {
                        toast.error(err.message);
                    }
                })
                .finally(res => {
                    setLoading(false)
                });
        }        
    }

    useEffect(() => {
        setLoading(true);
        axios.get(API.SECTION.GETALLTOOWNER, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setSections(res.data.data)                    
                    if(!id) {
                        setSection(res.data.data[0]._id)
                    }
                }
            })
            .catch(err => {

            })
            .finally(res => {
                setLoading(false);
            })
    }, [])

    const handleUpload = (file) => {
        setLoading(true)
        
        const formData = new FormData();        

        const oneHundredKB = (102400);

        if(file.target.files[0].size > oneHundredKB) {
            toast.error("حجم الصورة الأعظمي يجب أن يكون 100 كيلو بايت")
            setLoading(false)
            return;
        }

        formData.append("picture", file.target.files[0])
    
        axios.post(API.UPLOAD.PRODUCT, formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
            .then(res => {                
                if(res.data.state === 'success') {
                    setImage(res.data.data)                    
                    setFile("")
                    toast.success(res.data.message);
                }
            })
            .catch(err => {
                if(err.response?.data.state === 'failed') {
                    toast.error(err.response.data.message)
                    
                    if(err.response.data?.data && err.response.data.data.length > 0) {
                        err.response.data.data.map(e => toast.error(e))
                    }
                } else {
                    toast.error(err.message)
                }
            })
            .finally(res => {
                setLoading(false)
            })
    }

    const [product, setProduct] = useState()

    useEffect(() => {
        if(id) {
            setLoading(true);
            axios.get(API.PRODUCT.GETONE+id)
            .then(res => {
                if(res.data.state === 'success') {
                    setProduct(res.data.data)
                    setName(res.data.data.title) 
                    setImage(res.data.data.image)
                    setPrice(res.data.data.price)
                    setSection(res.data.data.sectionId)
                    setInfo(res.data.data.desc)
                }
            })
            .catch(err => {
                
            })
            .finally(res => {
                setLoading(false)
            })
        }
    }, [id]);

    return (
        <OwnerLayout>
            <h1 className="flex justify-between items-center gap-2">
            {!id?
                    <span className="font-bold text-[1.5rem]">إضافة منتج جديد</span>
                    :
                    <span className="font-bold text-[1.5rem]">تعديل منتج</span>}
            </h1>
            <div className="w-full mt-5">
                <form className="w-full mb-10">
                    <MainInput label={'الاسم'} type={'text'} key={6} placeholder={'قهوة صغير'} value={name} setValue={setName}/>
                    <MainInput label={'القسم'} type={'select'} key={2} placeholder={'مشروبات ساخنة'} value={section} setValue={setSection} options={sections}/>
                    <label className="w-full mb-[20px] block">
                        <h2 className="text-[1.2rem] font-medium mb-2">الصورة</h2>
                        {/* <div className="p-5 bg-white w-fit shadow-md rounded-[10px] cursor-pointer px-10 flex justify-center items-center gap-5" onClick={handleFile}>اختر صورة
                            <FaPlus/>
                        </div> */}
                        <input type={'file'} ref={fileRef} accept="image" required className="bg-white rounded-md shadow-md p-2" onChange={(e) => handleUpload(e)} onClick={() => 1}/>
                    </label>
                    {image && <div className="w-[300px] h-[300px] overflow-hidden rounded-md shadow-sm mb-2">
                        <img src={main+image} className="w-full h-full"/>
                    </div>}
                    <MainInput label={'السعر'} type={'number'} key={3} placeholder={5000} value={price} setValue={setPrice}/>
                    <MainInput label={'الشرح'} type={'textarea'} key={4} placeholder={'بن إيطالي أصلي'} value={info} setValue={setInfo}/>
                </form>
                <div className={`flex items-center bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] px-[28px] rounded-[16px] opacity-70 hover:opacity-100 w-fit cursor-pointer shadow-md`} onClick={handleCreate}>
                    <h2 className='text-[1.1rem] font-medium text-white'>{id?'تعديل':'إضافة'}</h2>
                </div>
                {loading && <div className="w-[200px] h-fit fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Loading loading={loading}/>
                </div>}
            </div>
        </OwnerLayout>
    )
}

export default AddProduct