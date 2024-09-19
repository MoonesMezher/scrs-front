import { FaSearch } from "react-icons/fa"
import LeftSideBar from "./LeftSideBar/LeftSideBar"
import RightSideBar from "./RightSideBar/RightSideBar"
import MobileNavBar from "./MobileNavBar/MobileNavBar"
import Img from '../../assets/images/owner-dash-2.jpg'
import logo from '../../assets/images/log.webp'
import { useEffect } from "react"
import { startTimer } from "../../helpers/setIntervalBySetTimeOut"

const OwnerLayout = ( { children } ) => {
    // useEffect(() => {
    //     startTimer(() => {
    //         window.location.reload()
    //     }, (5 * 60 * 1000))
    // }, [])

    return (
        <div className="w-full overflow-hidden">
            <MobileNavBar/>
            <LeftSideBar/>
            <div className="bg-[#F9F9F9] py-[56px] px-[40px] min-[1021px]:ms-[345px] min-[1300px]:me-[300px] min-[1600px]:me-[455px] min-h-screen max-[700px]:pt-[0px] max-[1020px]:pt-[250px] max-[1300px]:pt-[250px]">
                <div className="w-full max-[1020px]:hidden">
                    <div className="flex justify-between items-center">
                        <h1 className="text-[2.25rem] font-bold text-[#2E2E2E]">Hello {localStorage?.getItem("resturantName")? localStorage?.getItem("resturantName"):'Admin'}</h1>
                        <h1 className="text-[2.25rem] font-bold text-[#2E2E2E] flex gap-2 flex-row-reverse">SCRS
                            <a href="https://sparkengdev.com" className="w-[50px] h-[50px] overflow-hidden rounded-full">
                                <img src={logo} alt="spark logo" className="w-full h-full"/>
                            </a>
                        </h1>
                    </div>
                    <div className="rounded-[16px] bg-[#1FA5B8] h-[240px] shadow-md mt-[32px] overflow-hidden relative">
                        <img src={Img} alt='owner - dash' className="w-full h-full"/>
                        <div className="absolute right-[30px] top-[50%] translate-y-[-50%] z-10 text-white" dir="rtl">
                            <h1 className="text-[2rem] mb-2 font-bold">ماذا تقدم لك سبارك؟</h1>
                            <h2 className="md:pe-[200px] leading-[30px] font-bold">قم بإدارة مطعمك بكل سهولة مع سبارك من خلال ما تقدمه لك من سلاسة بتلقي الطلبات وجدولتها وإضافة منتجاتك والتحكم باللوغو والهوية البصرية الخاصة بك وغيرها الكثير من المميزات.</h2>
                        </div>
                    </div>
                </div>
                <div className="pt-[40px]" dir="rtl">
                    { children }
                </div>
            </div>
            <RightSideBar/>
        </div>
    )
}

export default OwnerLayout