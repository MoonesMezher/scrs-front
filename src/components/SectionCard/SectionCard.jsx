import { FaBook } from "react-icons/fa"

const SectionCard = ({ info }) => {
    return (
        <div className="rounded-[10px] bg-white border-[1px] border-solid border-black text-center overflow-hidden">
            <div className="overflow-hidden w-full h-[200px] mx-auto">
                <img src={info?.img} className="w-full h-full object-cover"/>
            </div>
            <div className="p-[1rem] pt-[5px]">
                <h2 className="text-[1.5rem]">{info?.name}</h2>
                <h3 className="flex items-center gap-2 mx-auto w-fit">{info.count} <FaBook/></h3>
            </div>
        </div>
    )
}

export default SectionCard