import { useEffect } from 'react'
import code from '../../assets/images/qrcode.png'
import logo from '../../assets/images/log.webp'

const Code = () => {
    useEffect(() => {
        localStorage.removeItem('account');
        localStorage.removeItem('user');
    }, []);
    
    return (
        <div className='min-h-screen bg-white flex flex-col gap-5 justify-center items-center'>
            <div className="w-[100px] h-[100px] rounded-md overflow-hidden mx-auto">
                <img className="w-full h-full" src={logo} alt="spark"/>
            </div>
            {/* <h1 className='text-center'>Powered By Spark</h1> */}
            <h1 className='font-bold text-[2rem]'>للمتابعة</h1>
            <h2 className='text-center'>قم بقراءة الكود الموجود على الطاولة حتًى تتمكن من تسجيل الدخول</h2>
            <div className="w-[150px] h-[150px] bg-black rounded-md overflow-hidden">
                <img className="w-full h-full" src={code} alt="spark"/>
            </div>
        </div>
    )
}

export default Code