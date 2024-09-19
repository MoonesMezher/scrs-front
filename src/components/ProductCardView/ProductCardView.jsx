import ScrollAnimation from "react-animate-on-scroll"
import { API, main } from "../../api"

const ProductCardView = ({ info, index }) => {
    return (
        <ScrollAnimation animateIn={index % 2 === 0? 'slideInLeft' :'slideInRight'} animateOnce={false} delay={index * 100}>
        <div className="block p-[1rem] rounded-[10px] bg-white shadow-md md:text-center relative">
            <div className="overflow-hidden w-full h-auto aspect-square rounded-[10px] mx-auto">
                <img src={main+info?.image} className="w-full h-full duration-300"/>
            </div>
            <h1 className="text-[1rem] font-medium my-[12px] text-right md:text-center">{info?.title}</h1>
        </div>
        </ScrollAnimation>
    )
}

export default ProductCardView