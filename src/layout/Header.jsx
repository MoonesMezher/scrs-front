import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaChevronRight, FaHeart, FaSearch } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6';
import { useAccountHook } from '../hooks/useAccountHook';

const Header = () => {
    const [showSearchInput,setShowSearchInput] = useState(false);

    const [hideSearchInput,setHideSearchInput] = useState(false)

    const [search,setSearch] = useState(false)
    
    const [z,setZ] = useState(false)

    const { pathname } = useLocation();

    const { account } = useAccountHook()

    const to = useNavigate();

    useEffect(() => {
        setSearch('')
        setHideSearchInput(
            pathname?.includes('/product')
            ||
            pathname?.includes('/shop')
        )
        setShowSearchInput(false);
        setZ(pathname?.includes('/shop'))
    }, [pathname]);

    const searchBtn = useRef();

    useEffect(() => {
        if(!localStorage.getItem('account')) {
            return;
        }
        searchBtn.current.style.backgroundColor = account?.account?.mainColor
    }, []);

    return (
        <header className={`fixed left-0 top-0 w-full ${z?'z-50 w-[100px] left-[70%]':'z-50'} px-4`}>
            <div className='container mx-auto flex justify-end items-center py-8'>
                <div className='flex justify-center items-center gap-[1.25rem] overflow-hidden'>
                    {
                        !hideSearchInput &&
                    <div className="flex justify-center items-center">
                        <div className='w-[50px] h-[50px] rounded-full cursor-pointer bg-white flex border-[1px] border-solid border-black md:w-[60px] md:h-[60px] justify-center items-center relative z-[50] duration-300 hover:rotate-[45deg]' onClick={() => setShowSearchInput(!showSearchInput)}>
                            {showSearchInput?<FaXmark className='md:text-[1.5rem]'/> :<FaSearch className='md:text-[1.5rem]'/>}
                        </div>
                    </div>
                    }
                    <div className={`fixed translate-x-[-50%] top-[90px] z-20 duration-300 ${showSearchInput? 'left-[50%]':'left-[-100%]'} container mx-auto pe-[20px] overflow-hidden w-fit bg-white shadow-lg h-[50px] md:h-[60px] duration-300 rounded-[30px] ${!hideSearchInput? 'flex': 'hidden'} justify-center items-center`} dir='rtl'>
                        <input type="text" value={search} className={`z-[1] focus:outline-none p-[20px] pe-[75px] ps-10 sm:ps-[20px] w-[220px] min-[500px]:w-[280px] md:w-[400px]`} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => (e.key === 'Enter') ? to('/search/'+account?.token+'/'+(search || 'all-data')): 1}/>
                        <Link to={'/search/'+account?.token+'/'+(search || 'all-data')} className='absolute left-[0px] top-[50%] translate-y-[-50%] z-50 bg-cyan-500 text-white p-[20px] text-[.9rem] cursor-pointer duration-300 hover:scale-105' onClick={() => setShowSearchInput(false) } ref={searchBtn}>بحث</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header