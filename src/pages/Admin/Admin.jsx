import Img from '../../assets/images/admin-bg.png'
import { useRef, useState, useEffect } from "react"
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import axios from 'axios';
import { API, main } from "../../api";
import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Admin = () => {
    const [name, setName] = useState('');
    const [resturantName, setResturantName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [logo, setLogo] = useState('');
    const [sponser, setSponser] = useState('');
    const [table, setTables] = useState(1);
    const [offer, setOffer] = useState(1);
    const [contract, setContract] = useState(1);
    
    const [loading, setLoading] = useState();

    const [sponsers, setSponsers] = useState([]);

    const { id } = useParams();

    const [account, setAccount] = useState([]);    

    const to  = useNavigate();

    const [loadingUpdate, setLoadingUpdate] = useState(id && loading);

    const handleCreate = () => {
        if(loading) {
            return;
        }

        setLoading(true);

        if(id) {
            axios.put(API.ACCOUNT.UPDATE+id, {
                name, 
                title: resturantName,
                image: logo,
                offer: +offer,
                sponserId: sponser,
                table: +table,
                city,
                email,
                password,
                contract: +contract,
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
                }
            })
            .then(res => {
                if(res.data.state === 'success') {
                    toast.success(res.data.message)
                    to('/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/list')
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
            axios.post(API.ACCOUNT.ADD, {
                name, 
                title: resturantName,
                image: logo,
                offer: +offer,
                sponserId: sponser,
                table: +table,
                city,
                email,
                password,
                contract: +contract,
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
                }
            })
            .then(res => {
                if(res.data.state === 'success') {
                    setName("") 
                    setResturantName("")
                    setLogo("")
                    setOffer("")
                    setSponser("")
                    setTables("")
                    setCity("")
                    setEmail("")
                    setPassword("")
                    setContract("")
                    toast.success(res.data.message)
                    to('/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/list')
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
        axios.get(API.ADMIN.GETSPONSERS, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adminScrs')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setSponsers(res.data.data)
                    if(!id) {
                        setSponser(res.data.data[0]._id)                    
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
        formData.append("picture", file.target.files[0])

        const oneMB = (1024 * 1024)

        if(file.target.files[0].size > oneMB) {
            toast.error("File size exceeds 1 MB")
            setLoading(false)
            return
        }
    
        axios.post(API.UPLOAD.LOGO, formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
            .then(res => {
                // console.log(res);
                
                if(res.data.state === 'success') {
                    setLogo(res.data.data)                    
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

    useEffect(() => {
        if(id) {
            setLoading(true);
            axios.get(API.ACCOUNT.GETACCOUNT+id)
            .then(res => {
                if(res.data.state === 'success') {
                    setAccount(res.data.data)
                    setName(res.data.data.name) 
                    setResturantName(res.data.data.title)
                    setLogo(res.data.data.image)
                    setOffer(res.data.data.offer)
                    setSponser(res.data.data.sponserId)
                    setTables(res.data.data.table)
                    setCity(res.data.data.city)
                    setEmail(res.data.data.email)
                    setPassword(res.data.data.password)
                    setContract(res.data.data?.contract)
                }
            })
            .catch(err => {
                // console.log(err);
                
            })
            .finally(res => {
                setLoading(false)
            })
        }
    }, [id]);

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] relative overflow-hidden">
            <AdminSideBar>
            <div>
                <div className="p-[30px] ps-[90px] w-full h-full">  
                    <h1 className="underline text-[2.5rem] font-bold mb-[30px]">Add</h1>
                    <div className="rounded-[10px] bg-white w-full h-full px-[30px] py-[70px] pb-[100px] shadow-md">
                        {!loadingUpdate && <form className="w-full">
                            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-10">
                                {!id && <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Full Name</h1>
                                    <input defaultValue={name} type="text" placeholder="Full Name" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full" onChange={(e) => setName(e.target.value)}/>
                                </label>}
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Resturant Name</h1>
                                    <input defaultValue={resturantName} type="text" placeholder="Resturant Name" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  onChange={(e) => setResturantName(e.target.value)}/>
                                </label>
                                {!id && <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Email</h1>
                                    <input defaultValue={email} type="text" placeholder="Email" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  onChange={(e) => setEmail(e.target.value)}/>
                                </label>}
                                {!id && <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Password</h1>
                                    <input defaultValue={password} type="text" placeholder="Password" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  onChange={(e) => setPassword(e.target.value)}/>
                                </label>}
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">City</h1>
                                    <input defaultValue={city} type="text" placeholder="City" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  onChange={(e) => setCity(e.target.value)}/>
                                </label>
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Tables Count</h1>
                                    <input value={table} type="number" placeholder="10" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full" min={1} onChange={(e) => setTables(e.target.value)}/>
                                </label>
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Offer</h1>
                                    <input value={offer} type="number" placeholder="10" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  min={0} onChange={(e) => setOffer(e.target.value)}/>
                                </label>
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Contract</h1>
                                    <input value={contract} type="number" placeholder="1" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  min={1} onChange={(e) => setContract(e.target.value)}/>
                                </label>
                                <label className="w-full">
                                    <h1 className="font-medium text-[1.2rem] ms-1">Sponser</h1>
                                    <select placeholder="Danyal" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full cursor-pointer" onChange={(e) => setSponser(e.target.value)} value={sponser}>
                                        {sponsers.map((e, i) => <option value={e._id} key={i}>{e.name}</option>)}
                                    </select>
                                </label>
                            </div>
                            <div className="w-fit mt-10">
                                <label className="w-fit">
                                    <h1 className="font-medium text-[1.2rem] ms-1 mb-2">Resturant Logo</h1>
                                    <input type="file" accept="image" className="bg-white p-2 shadow-md rounded-md mb-5 w-[200px] md:w-[300px]" onChange={(e) => handleUpload(e)}/>
                                </label>
                                {logo && <div className="w-[150px] h-[150px] rounded-full shadow-md overflow-hidden flex justify-center items-center mx-auto mb-20">
                                    <img src={main+logo} alt="logo-image" className="w-full h-full"/>
                                </div>}
                                <Loading loading={loading}/>
                                <label>
                                    <div className="py-[10px] px-[38px] bg-[#4181f973] text-[#2C659B] text-[15px] font-normal leading-[22px] w-fit rounded-[7.4px] cursor-pointer shadow-md duration-300 hover:scale-105 mx-auto" onClick={handleCreate}>
                                        {id? 'Update ':'Add '}Resturant
                                    </div>
                                </label>
                            </div>
                        </form>}
                    </div>
                </div>
            </div>
            </AdminSideBar>
        </div>
    )
}

export default Admin