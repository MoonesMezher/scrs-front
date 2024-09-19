import { useNavigate, useParams } from "react-router-dom"
import ProductCard from "../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loading";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API, main } from "../../api";
import { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Section from "../../components/Section/Section";
import { useAccountHook } from "../../hooks/useAccountHook";
import checkFromToken from '../../helpers/checkFromTokenAsParams'
import { FaArrowRight, FaSearch } from "react-icons/fa";
import Toast from "../../components/Toast/Toast";
import axios from "axios";
import { SocketContext } from "../../context/socketContext";
import { RiMenuSearchLine } from "react-icons/ri";
import { MdMan } from "react-icons/md";

const Show = () => {
    const settings = {
        infinite: false,
        arrows: false,
        speed: 500,
        // autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        // margin: 20
    };

    const to = useNavigate();

    const { account } = useParams()

    const { account: acc } = useAccountHook()

    const { socket } = useContext(SocketContext);

    if(checkFromToken(acc, account)) {
        to('/check/'+account)
    }
    
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(acc?.products)
    const [sections, setSections] = useState(acc?.sections)

    const comic = useRef();
    const s1 = useRef();

    useEffect(() => {
        if(!localStorage.getItem('account')) {
            return;
        }

        s1.current.style.backgroundColor = acc?.account?.mainColor;
        comic.current.style.backgroundColor = acc?.account?.mainColor;
    }, [acc])

    const [searchBySection, setSearchBySection] = useState({id: 1, value: 'الكل'})    
    const [searchByName, setSearchByName] = useState('')    

    const [data, setData] = useState(acc?.products)    

    const [search, setSearch] = useState(false)

    useEffect(() => {
        if(searchBySection.value === 'الكل') {
            if(searchByName === '') {
                setData(acc?.products)
            } else {
                const newRegex = new RegExp(`.*${searchByName}.*`, 'i')
                setData(acc?.products.filter(e => newRegex.test(e.title)))
            }
        } else {
            if(searchByName === '') {
                setData(acc?.products.filter(e => e.sectionId.toString() === searchBySection?.id.toString()))
            } else {
                const newRegex = new RegExp(`.*${searchByName}.*`, 'i')
                setData(acc?.products.filter(e => e.sectionId.toString() === searchBySection?.id.toString()).filter(e => newRegex.test(e.title)))
            }
        }

        setSearchByName("")
    }, [search, searchBySection])

    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            setSearchBySection({id: 1, value: 'الكل'})
            setSearch(!search)
        }
    }

    const [showSearch, setShowSearch] = useState(false)

    const handleSearchByName = () => {
        setShowSearch(!showSearch);
        setSearchByName('')
    }

    const handleSearchByClick = () => {
        setSearchBySection({id: 1, value: 'الكل'})
        setSearch(!search)
    }

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const handleClick = () => {
        axios.post(API.MESSAGES.ADDCOMIC, null, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setShow3('سوف يأتي خلال لحظات')                        
                    socket?.emit('send', {accId: acc?.account?._id, type: 'messages'})
                }
            })
            .catch(err => {
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/check/'+acc.token)
                }
            })
            .finally(res => {
                setShow2(false)
                setTimeout(() => {
                    setShow3(false)
                }, 3000)
            })
    }

    return (
        <section>
            <div className={`mx-auto min-h-screen bg-white`}>
                <div className="w-full">
                    {localStorage.getItem('account') &&
                    <div className="p-5 pt-8 container mx-auto bg-white">
                        <div className="flex items-center">
                            <div className="rounded-full w-[50px] h-[50px] overflow-hidden shadow-md img-container">
                                <img src={main+acc.account?.image} alt="logo" className="w-full h-full object-cover"/>
                            </div>
                            <div className="text-center mx-auto translate-x-[-25px]">
                                <h1 className="font-bold text-[18px] text-black">{acc?.account?.title}</h1>
                                <h2 dir="rtl" className="text-[13px] text-black">{acc.account?.startDate}</h2>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center gap-[10px]" dir="rtl">
                            <div className="p-4 bg-white rounded-md shadow-md cursor-pointer" ref={s1} onClick={handleSearchByName}>
                                <FaArrowRight className={`text-white text-[1.3rem] ${showSearch? 'block': 'hidden'}`}/>
                                <RiMenuSearchLine className={`text-white text-[1.3rem] ${!showSearch? 'block': 'hidden'}`}/>
                            </div>
                            <div className={`bg-white border rounded-lg flex items-center flex-row-reverse overflow-hidden shadow-md flex-1 duration-300 ${showSearch? 'scale-100': 'scale-0'}`}>
                                <input type="text" 
                                    value={searchByName}
                                    placeholder="البحث"
                                    className="w-full h-full p-3 translate-x-[2px] outline-none focus:outline-none"
                                    onChange={(e) => setSearchByName(e.target.value)} onKeyDown={(e) => handleSearch(e)}/>
                                <FaSearch className="mx-2 ms-3 cursor-pointer" onClick={handleSearchByClick}/>
                            </div>
                            <div className="relative p-3 bg-white rounded-md shadow-md cursor-pointer" ref={comic} onClick={() => setShow2(true)}>
                                <div className="w-[32px] h-[32px] overflow-hidden cursor-pointer duration-300 hover:scale-105 relative flex justify-center items-center">
                                    <MdMan className="text-[1.5rem] text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="container mx-auto">
                        <div className="w-full">
                            <div className="relative left-[50%] translate-x-[-50%] z-10">
                                <Loading loading={loading}/>
                            </div>
                            <Slider {...settings} focusable={false} className="w-full mt-10 px-[10px] flex gap-[10px]">
                                {!loading && sections && [{id: 1, title: 'الكل'}, ...sections]?.map((section,index) => <Section section={section} key={index} account={account} search={searchBySection} setSearch={setSearchBySection}/>)}
                            </Slider>
                        </div>
                    </div>
                </div>
                <Loading loading={loading}/>
                <div className="grid-products py-[50px] container mx-auto px-5">
                    {data && data?.map((product,index) => <ProductCard setShow={setShow} key={index} info={product} index={index} account={account}/>)}
                </div>
                <div className={`text-center font-bold text-[1.1rem] text-black ${(data && data.length === 0)? 'block':'hidden'}`}>لا يوجد</div>
            </div>
            <Toast show={show} style={'duration:300 w-[300px] py-0'}>
                <h1 className='flex text-green-500 text-[1.2rem] text-center'>
                    لقد تمت إضافة المنتج الى السلة بنجاح
                </h1>
            </Toast>
            <Toast show={show2} style={'duration:300'}>
                <h1 className="text-center font-bold text-[1.2rem]">هل تريد طلب الكوميك؟</h1>
                <div className="flex justify-center items-center gap-5 mt-5">
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => setShow2(false)}>لا</div>
                    <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={handleClick}>نعم</div>
                </div>
            </Toast>
            <div className={`fixed p-5 duration-300 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md shadow-md ${show3? 'scale-100':'scale-0'}`}>
                <h1 className='flex justify-center flex-row-reverse items-center gap-2 text-green-500 text-[1.2rem] text-center'>
                    {show3}
                </h1>
            </div>
        </section>
    )
}

export default Show