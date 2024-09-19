import { FaBars, FaFileAlt, FaList, FaServicestack, FaUser } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import { Link } from "react-router-dom"
import Logo from '../../assets/images/log.webp'
import Img from '../../assets/images/admin-bg.png'
import { useState } from "react"
import { CiLogout } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io"
import { MdMiscellaneousServices } from "react-icons/md"

const AdminSideBar = ( { children } ) => {
    const [showLeave, setShowLeave] = useState(false);

    const handleAction = () => {
        localStorage.removeItem('adminScrs');

        location.reload()
    }

    return (
        <div>
            <div className="bg-white fixed left-0 top-0 h-screen shadow-md z-10">
                <Link to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'} className="w-[52px] h-[52px] my-10 mx-auto mb-16 block">
                    <img src={Logo} alt="spark" className="w-full h-full"/>
                </Link>
                <Link to="/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789">
                    <IoIosAddCircle className={`text-[3rem] mx-auto w-[60px] py-1 cursor-pointer duration-300 hover:scale-105 ${location.pathname === '/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'? 'text-cyan-500':'text-[#dbdbdb]'} mb-5`}/>
                </Link>
                <Link to="/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/list">
                    <FaList className={`text-[3rem] mx-auto w-[60px] py-1 cursor-pointer duration-300 hover:scale-105 ${location.pathname?.includes("list")? 'text-cyan-500':'text-[#dbdbdb]'} mb-5`}/>
                </Link>
                <Link to="/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/sponsers">
                    <FaUser className={`text-[3rem] mx-auto w-[60px] py-1 cursor-pointer duration-300 hover:scale-105 ${location.pathname?.includes("sponsers")? 'text-cyan-500':'text-[#dbdbdb]'} mb-5`}/>
                </Link>
                <Link to="/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services">
                    <MdMiscellaneousServices className={`text-[3rem] mx-auto w-[60px] py-1 cursor-pointer duration-300 hover:scale-105 ${location.pathname?.includes("services")? 'text-cyan-500':'text-[#dbdbdb]'} mb-5`}/>
                </Link>
                <Link onClick={() => setShowLeave(true)}>
                    <CiLogout className={`text-[3rem] mx-auto w-[60px] py-1 cursor-pointer duration-300 hover:scale-105 text-[#dbdbdb]`}/>
                </Link>
            </div>
            <div>
                <div className="w-full ms-[50px] h-[150px] overflow-hidden">
                    <img src={Img} alt="background" className="w-full h-full"/>
                </div>
                <div className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-20 rounded-md shadow-md w-[400px] z-50 duration-300 ${showLeave? 'scale-100':'scale-0'}`}>
                    <h1 className="text-center text-[1.2rem] font-medium">Are you sure you want logout and leave us?</h1>
                    <div className="flex justify-center items-center gap-5 mt-5">
                        <div className="w-[100px] p-2 rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center cursor-pointer" onClick={() => setShowLeave(false)}>No</div>
                        <div className="w-[100px] p-2 rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center cursor-pointer items-center"
                            onClick={handleAction}
                        >Yes</div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default AdminSideBar