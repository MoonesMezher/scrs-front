const Toast = ({ show, message, handleYes, handleNo, style, isScale = false, children }) => {
    return (
        <div className={`fixed ${isScale? 'duration-300':'duration-500'} ${show? (isScale?'scale-100 left-[50%]':'left-[50%]'):(isScale?'scale-0 left-[50%]':'left-[-150%] scale-0')} top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-5 bg-white shadow-md p-10 rounded-lg z-[200] ${style} ${isScale? 'w-[280px] p-2 py-10':''} border`}>
            {message && <h1 className="text-center font-bold text-[1.2rem]">{message}</h1>}
            {children}
            {(handleNo || handleNo) && <div className="flex justify-center items-center gap-5 mt-5">
                {handleNo && <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-red-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleNo()}>لا</div>}
                {handleYes && <div className="w-[100px] p-2 cursor-pointer rounded-[10px] bg-green-500 text-white duration-300 hover:scale-105 shadow-md flex justify-center items-center" onClick={() => handleYes(show)}>نعم</div>}
            </div>}
        </div>
    )
}

export default Toast