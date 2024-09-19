import { useEffect, useRef, useState } from "react";
import OwnerLayout from "../../layout/OwnerLayout/OwnerLayout"
import { FaMoneyCheck, FaPlus, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API, main } from "../../api";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import Img2 from '../../assets/images/Gluten Free Strawberry Cheesecake Pancakes Image.jpeg'
import Img3 from '../../assets/images/Grilled Tandoori Chicken with Indian-Style Rice.jpeg'
import Img4 from '../../assets/images/Pizza Recipes.jpeg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import { TiShoppingCart } from "react-icons/ti";
import ImgG from '../../assets/images/garson.png'
import { BiMenu } from "react-icons/bi";
import Toast from "../../components/Toast/Toast";
import { GiSettingsKnobs } from "react-icons/gi";
import { RiMenuSearchLine } from "react-icons/ri";
import { MdMan } from "react-icons/md";

const sections = [
    {
        title: 'الكل',
        id: 1,
        img: Img2,
        count: 150
    },
    {
        title: 'مشروبات',
        id: 1,
        img: Img2,
        count: 150
    },
    {
        title: 'حلويات',
        id: 1,
        img: Img3,
        count: 150
    },
    {
        title: 'أراكيل',
        id: 1,
        img: Img4,
        count: 150
    },
    {
        title: 'مكسرات',
        id: 1,
        img: Img2,
        count: 150
    },
]

const products = [
    {
        name: 'كريب',
        offer: '20',
        price: '10000',
        img: Img2,
        exp: 4.5,
        id: '1'
    },
    {
        name: 'كريب موز',
        offer: '20',
        price: '15000',
        img: Img2,
        exp: 4.5,
        id: '1'
    },
]

const OwnerSettings = () => {
    const [file, setFile] = useState('');
    const [logo, setLogo] = useState(localStorage?.getItem("logo"));
    const [color1, setColor1] = useState(localStorage?.getItem("color1"));
    const [color2, setColor2] = useState(localStorage?.getItem("color2"));
    const [start, setStart] = useState(localStorage?.getItem("startTime"));

    const [loading, setLoading] = useState(false);

    const { pathname } = useLocation();

    const fileRef = useRef();

    const l2 = useRef();
    const l3 = useRef();
    const l4 = useRef();
    const a = products.map(() => useRef());
    const price = products.map(() => useRef());
    const name = products.map(() => useRef());
    const sect = sections.map(() => useRef());
    const time = useRef();
    const title = useRef();
    const all3 = useRef();
    const filter = useRef();
    const comic = useRef();

    useEffect(() => {
        if(pathname?.includes("colors")) {
            filter.current.style.backgroundColor = color1;
            a[0].current.style.backgroundColor = color1;
            a[1].current.style.backgroundColor = color1;
            price[0].current.style.color = color1;
            price[1].current.style.color = color1;
            name[0].current.style.color = 'black';
            name[1].current.style.color = 'black';
            sect[0].current.style.backgroundColor = color1;
            sect[0].current.style.color = 'white';
            time.current.style.color = 'black';      
            title.current.style.color = 'black';                    
            l2.current.style.backgroundColor = color1;
            comic.current.style.backgroundColor = color1;
            l3.current.style.backgroundColor = color1;
            l4.current.style.backgroundColor = color1;
        }
    }, [color1, pathname]);

    const handleUpdate = () => {
        setLoading(true);

        axios.put(API.ACCOUNT.UPDATEBYOWNER, {
            image: logo,
            startDate: start,
            endDate: 'ww',
            mainColor: color1,
            secondColor: color2
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    localStorage.setItem("logo", res.data.data.image)
                    localStorage.setItem("startTime", res.data.data.startDate)
                    localStorage.setItem("color1", res.data.data.mainColor)
                    // localStorage.setItem("color2", res.data.data.secondColor)

                    setColor1(localStorage?.getItem("color1"))
                    // setColor2(localStorage?.getItem("color2"))
                    setLogo(localStorage?.getItem("logo"))
                    setStart(localStorage?.getItem("startTime"))

                    toast.success(res.data.message)

                    setTimeout(() => {
                        location.reload(0)
                    }, 1500)
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
            })
    }

    const handleUpload = (file) => {
        setLoading(true)
        
        const formData = new FormData();        

        const oneMB = (1024 * 1024)

        if(file.target.files[0].size > oneMB) {
            toast.error("حجم الصورة الأعظمي يجب أن يكون 1 ميغابايت")
            setLoading(false)
            return
        }

        formData.append("picture", file.target.files[0])
    
        axios.post(API.UPLOAD.LOGO, formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
            .then(res => {                
                if(res.data.state === 'success') {
                    setLogo(res.data.data)                    
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

    const [logoutShow, setLogoutShow] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('owner');
        localStorage.removeItem("logo")
        localStorage.removeItem("startTime")
        localStorage.removeItem("endTime")
        localStorage.removeItem("color1")
        // localStorage.removeItem("color2")
        localStorage.removeItem("resturantName")
        localStorage.removeItem("ns")
        location.reload(0)
    }

    return (
        <OwnerLayout>
            <div className="w-full">
                <h1 className="flex justify-between items-center gap-2">
                    <span className="font-bold text-[1.5rem]">الإعدادات</span>
                </h1>
                <div className="flex items-center gap-5 mt-5 flex-wrap">
                    <Link to="/owner/settings" className="px-5 block py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md">الهوية البصرية</Link>
                    <Link to="/owner/settings/colors" className="px-5 block py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md">الالوان الخاصة</Link>
                    <Link to="/owner/settings/times" className="px-5 block py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md">أوقات العمل</Link>
                    <div onClick={() => setLogoutShow(true)} className="px-5 block py-2 text-white bg-[#1FA5B8] duration-300 hover:scale-105 shadow-md cursor-pointer rounded-md">تسجيل خروج</div>
                </div>
            </div>
            <div className="w-full mt-5 flex flex-col lg:flex-row">
                {!pathname?.includes("colors") && !pathname?.includes("times") ? <div>
                    <label className="w-full mb-[20px] block">
                        <h2 className="text-[1.2rem] font-medium mb-2">لوغو</h2>
                        {/* <div className="p-5 bg-white w-fit shadow-md rounded-[10px] cursor-pointer px-10 flex justify-center items-center gap-5" onClick={handleFile}>اختر صورة
                            <FaPlus/>
                        </div> */}
                        <input type={'file'} accept="image" ref={fileRef} required className="bg-white rounded-md p-2 shadow-md cursor-pointer" onChange={(e) => handleUpload(e)}/>
                    </label>
                    <div className="w-[150px] h-[150px] rounded-full shadow-md overflow-hidden flex justify-center items-center mx-auto mb-20">
                        <img src={main+logo} alt="logo-image" className="w-full h-full"/>
                    </div>
                </div>: (pathname?.includes("times")? 
                    <div className="mb-10">
                        <label className="w-fit mb-[20px] block">
                            <h2 className="text-[1.2rem] font-medium mb-2">التوقيت</h2>
                            <input type={'text'} value={start} placeholder="طوال اليوم" className="p-2 bg-white outline-none focus:outline-none rounded-md shadow-md cursor-pointer" onChange={(e) => setStart(e.target.value)}/>
                        </label>
                    </div>
                :<div>
                    <label className="w-fit mb-[20px] block">
                        <h2 className="text-[1.2rem] font-medium mb-2">اللون الأساسي</h2>
                        <input type={'color'} required value={color1} className="bg-white p-2 rounded-md shadow-md w-[150px] cursor-pointer h-[100px]" onChange={(e) => setColor1(e.target.value)}/>
                    </label>
                    {/* <label className="w-fit mb-[20px] block">
                        <h2 className="text-[1.2rem] font-medium mb-2">اللون الثاني</h2>
                        <input type={'color'} required value={color2} className="bg-white p-2 rounded-md shadow-md w-[150px] cursor-pointer h-[100px]" onChange={(e) => setColor2(e.target.value)}/>
                    </label> */}
                </div>)}
                <section className={`border-[5px] border-black border-solid rounded-md overflow-hidden p-1 relative my-5 mx-auto w-[400px] h-fit ${pathname === "/owner/settings/colors"? 'block': 'hidden'}`}>
                    <div className={`mx-auto`}>
                        <div className="w-full">
                            <div className="p-5 pt-8 container mx-auto">
                                <div className="flex items-center" dir="ltr">
                                    <div className="rounded-full w-[50px] h-[50px] overflow-hidden shadow-md img-container">
                                        <img src={main+logo} alt="logo" className="w-full h-full object-cover"/>
                                    </div>
                                    <div className="text-center mx-auto translate-x-[-25px]">
                                        <h1 ref={title} className="font-bold text-[18px]">{localStorage?.getItem("resturantName")}</h1>
                                        <h2 dir="rtl" ref={time} className="text-[13px]">{start}</h2>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center gap-[10px]" dir="rtl">
                                    <div className="p-3 bg-white rounded-md shadow-md cursor-pointer" ref={filter}>
                                        <RiMenuSearchLine className="text-[1.3rem] text-white"/>
                                    </div>
                                    <div className={`bg-white border rounded-lg flex items-center flex-row-reverse overflow-hidden shadow-md flex-1 duration-300`}>
                                        <input type="text" 
                                            placeholder="البحث"
                                            className="w-full h-full p-2 translate-x-[2px] outline-none focus:outline-none"
                                        />
                                        <FaSearch className="mx-2 ms-3"/>
                                    </div>
                                    <div className="relative p-2 bg-white rounded-md shadow-md cursor-pointer" ref={comic}>
                                        <MdMan className="text-[1.7rem] text-white"/>
                                    </div>
                                </div>
                            </div>
                            <div className="container mx-auto">
                                <div className="w-full">
                                    <div className="w-full px-[10px] flex gap-[10px]" dir="ltr">
                                        {sections && sections?.map((section,index) => <div key={index} className={`rounded-[10px] cursor-pointer duration-300 p-[10px] font-medium text-[13px] shadow-md flex justify-center items-center h-fit text-center overflow-hidden w-[100px] bg-[#dee2e5] text-black`} ref={sect[index]}>{section?.title}</div>  
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Loading loading={loading}/>
                        <div className="grid-products-view py-[10px] container mx-auto px-5">
                            {products && products?.map((info,index) => <div key={index} className="block p-[1rem] rounded-[10px] bg-white shadow-md md:text-center relative">
                                <div className="block overflow-hidden w-full h-auto aspect-square rounded-[10px] mx-auto">
                                    <img src={info?.img} className="w-full h-full duration-300"/>
                                </div>
                                <div className="flex flex-row-reverse items-end justify-between pb-4" dir="ltr">
                                    <div>
                                        <h1 className="text-[.8rem] font-medium my-[10px] mb-0 text-right md:text-center" ref={name[index]}>{info?.name}</h1>
                                        <h2 className="w-fit text-[.8rem] md:text-center font-medium ms-auto" ref={price[index]}>{info?.price} s.p</h2>
                                    </div>
                                    <div className="text-center mx-auto p-1 rounded-full text-white w-fit shadow-md duration-300 hover:scale-105 cursor-pointer h-fit translate-x-[-120%] translate-y-[130%] relative z-50" ref={a[index]}>
                                        <FaPlus className="text-[.8rem]"/>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className="p-3 sticky mt-[-10px]" ref={all3} dir="ltr">
                        <div className={`relative duration-300 delay-[100ms] mt-2`}>
                            <Link className="w-[35px] h-[35px] overflow-hidden border-[1px] border-solid cursor-pointer shadow-md duration-300 hover:scale-105 relative bg-white rounded-full flex justify-center items-center p-2" ref={l4}>
                                <BiMenu className="text-[2rem] text-white" />
                            </Link>
                        </div>
                        <div className="relative mt-2">
                            <Link className="w-[35px] h-[35px] overflow-hidden border-[1px] border-solid cursor-pointer shadow-md duration-300 hover:scale-105 relative bg-white rounded-full flex justify-center items-center p-2" ref={l2}>
                                <TiShoppingCart className="text-[2rem] text-white" />
                            </Link>
                        </div>
                        <div className="relative mt-2">
                            <div className="w-[35px] h-[35px] overflow-hidden border-[1px] border-solid cursor-pointer shadow-md duration-300 hover:scale-105 relative bg-white rounded-full flex justify-center items-center p-2" ref={l3}>
                                <FaMoneyCheck className="text-[2rem] text-white" />
                            </div>
                        </div>
                    </div>
                </section>
                {loading && <div className="w-[200px] h-fit fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Loading loading={loading}/>
                </div>}
                <div className={`flex ms-auto h-fit items-center bg-[#1FA5B8] gap-5 mb-[16px] duration-300 p-[14px] px-[28px] rounded-[16px] opacity-70 hover:opacity-100 w-fit cursor-pointer shadow-md`} onClick={handleUpdate}>
                    <h2 className='text-[1.1rem] font-medium text-white'>حفظ</h2>
                </div>
            </div>
            <Toast show={logoutShow} message="هل تريد تسجيل الخروج؟" handleYes={handleLogout} handleNo={() => setLogoutShow(false)}/>
        </OwnerLayout>
    )
}

export default OwnerSettings