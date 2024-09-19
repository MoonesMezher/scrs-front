import { useState } from 'react'
import './Error.css'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
    const [url, setUrl] = useState('/');

    return (
        <div className='h-screen overflow-hidden relative bg-black'>
            <h1 className='text-white font-bold text-center absolute left-[50%] translate-x-[-50%] top-[15%] z-[100]'><span className="text-[3rem]">404</span> <br/> Page Not Found</h1>
            <Link to={url} className='bg-white font-bold text-center absolute left-[50%] translate-x-[-50%] bottom-[25%] z-[100] text-black rounded-md px-5 py-2 cursor-pointer duration-300 hover:scale-105 shadow-md'>Back</Link>
            <div className="box-of-star1 bg-black">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
            </div>
            <div className="box-of-star2 bg-black">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
            </div>
            <div className="box-of-star3">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
            </div>
            <div className="box-of-star4">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
            </div>
            <div data-js="astro" className="astronaut">
                <div className="head"></div>
                <div className="arm arm-left"></div>
                <div className="arm arm-right"></div>
                <div className="body">
                <div className="panel"></div>
                </div>
                <div className="leg leg-left"></div>
                <div className="leg leg-right"></div>
                <div className="schoolbag"></div>
            </div>
        </div>
    )
}

export default ErrorPage