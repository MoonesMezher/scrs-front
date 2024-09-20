import { useEffect } from 'react'
import code from '../../assets/images/qrcode.png'

const Code = () => {
    useEffect(() => {
        localStorage.removeItem('account');
        localStorage.removeItem('user');
    }, []);
    
    return (
        <div className='min-h-screen bg-white flex flex-col gap-5 justify-center items-center'>
            <h1 className='font-bold text-[2rem]'>للمتابعة</h1>
            <h2>قم بقراءة الكود الموجود على الطاولة</h2>
            <div className="w-[150px] h-[150px] bg-black rounded-md overflow-hidden">
                <img className="w-full h-full" src={code} alt="spark"/>
            </div>
        </div>
    )
}

export default Code