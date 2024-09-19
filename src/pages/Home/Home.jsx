import spark from '../../assets/images/log.webp'
const Home = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-[150px] h-[150px]">
                <img className="w-full h-full" src={spark} alt="spark"/>
            </div>
            <h1 className="text-center pt-5">خدمة سبارك للمطاعم والمقاهي</h1>
            <h2 className='font-bold'>SCRS</h2>
        </div>
    )
}

export default Home