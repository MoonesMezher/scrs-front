import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../components/Loading/Loading";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API, main } from "../../api";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import checkFromToken from '../../helpers/checkFromTokenAsParams'
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import ProductCardView from "../../components/ProductCardView/ProductCardView";
import Section from "../../components/Section/Section";
import { RiMenuSearchLine } from "react-icons/ri";

const View = () => {
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
    
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [acc, setAcc] = useState()

    useEffect(() => {
        // localStorage.removeItem("user");
        setLoadingPage(true)
        axios.get(API.ACCOUNT.GETBYTOKEN+account)
            .then(res => {
                if(res.data.state === 'success') {
                    setAcc(res.data.data)
                }
            })
            .catch(err => {
                if(err.response.data.state === 'block') {
                    to('/not-active')
                } else {
                    to('/error')
                }
            })
            .finally(res => {
                setTimeout(() => {
                    setLoadingPage(false)
                }, 3000)
            })
    }, []);

    useEffect(() => {
        if(!acc) {
            return;
        }
        if(!acc?.services.find(e => e.name === 'View')) {
            to('/check/'+acc?.token)
        }
    }, [acc])

    const s1 = useRef();

    useEffect(() => {
        if(!acc) {
            return;
        }

        s1.current.style.backgroundColor = acc?.account?.mainColor
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
    }, [search, searchBySection])

    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            setSearch(!search)
            setSearchBySection({id: 1, value: 'الكل'})
        }
    }

    const [showSearch, setShowSearch] = useState(false)

    const handleSearchByName = () => {
        setShowSearch(!showSearch);
        setSearchByName('')
    }

    return (
        <section>
            <div className={`mx-auto min-h-screen bg-white`}>
                <div className="w-full">
                    {acc &&
                    <div className="p-5 pt-8 container mx-auto bg-white">
                        <div className="flex items-center">
                            <div className="rounded-full w-[50px] h-[50px] overflow-hidden shadow-md img-container">
                                <img src={main+acc.account?.image} alt="logo" className="w-full h-full object-cover"/>
                            </div>
                            <div className="text-center mx-auto translate-x-[-25px]">
                                <h1 className="font-bold text-black text-[18px]">{acc?.account?.title}</h1>
                                <h2 dir="rtl" className="text-black text-[13px]">{acc.account?.startDate}</h2>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center gap-[10px]" dir="rtl">
                            <div className="p-4 bg-white rounded-md shadow-md cursor-pointer" ref={s1} onClick={handleSearchByName}>
                                {showSearch? <FaArrowRight className="text-white text-[1.2rem]"/>:<RiMenuSearchLine className="text-white text-[1.2rem]"/>}
                            </div>
                            <div className={`bg-white border rounded-lg flex items-center flex-row-reverse overflow-hidden shadow-md flex-1 duration-300 ${showSearch? 'scale-100': 'scale-0'}`}>
                                <input type="text" 
                                    value={searchByName}
                                    placeholder="البحث"
                                    className="w-full h-full p-3 translate-x-[2px] outline-none focus:outline-none"
                                    onChange={(e) => setSearchByName(e.target.value)} onKeyDown={(e) => handleSearch(e)}/>
                                <FaSearch className="mx-2 ms-3"/>
                            </div>
                        </div>
                    </div>}
                    <div className="container mx-auto">
                        <div className="w-full">
                            <div className="relative left-[50%] translate-x-[-50%] z-10">
                                <Loading loading={loading}/>
                            </div>
                            <Slider {...settings} focusable={false} className="w-full mt-10 px-[10px] flex gap-[10px]">
                                {!loading && acc?.sections && [{id: 1, title: 'الكل'}, ...acc?.sections]?.map((section,index) => <Section section={section} key={index} account={account} search={searchBySection} setSearch={setSearchBySection}/>)}
                            </Slider>
                        </div>
                    </div>
                </div>
                <Loading loading={loading}/>
                <div className="grid-products py-[50px] container mx-auto px-5">
                    {data && data?.map((product,index) => <ProductCardView key={index} info={product} index={index} account={account}/>)}
                </div>
                <div className={`text-center font-bold text-[1.1rem] text-black ${(data && data.length === 0)? 'block':'hidden'}`}>لا يوجد</div>
            </div>
        </section>
    )
}

export default View