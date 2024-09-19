import Img from '../../assets/images/log.webp'
import Img2 from '../../assets/images/qrcode.png'

const SplashScreen = () => {
    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-white absolute left-0 top-0 z-[100] flex-col griedient-splash'>
            <div className='w-[200px] h-[200px] animate-rotate'>
                <img src={Img} className='w-full h-full object-cover'/>
            </div>
            <h1 className='mt-2 text-[1.5rem] font-bold text-white'>SPARK</h1>
            <div className='flex justify-center items-center flex-col mx-auto relative z-[-1] mt-10'>
                <div className='w-[160px] h-[160px]'>
                    <img src={Img2} className='w-full h-full object-cover'/>
                </div>
                <h1 className='text-center text-white mt-10'>أهلاً وسهلاً بكم في خدمة المطاعم و المقاهي</h1>
                <h2 className='text-center text-white mt-3 font-bold'>Powered By Spark</h2>
            </div>
        </div>
    )
}

export default SplashScreen