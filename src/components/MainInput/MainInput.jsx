const MainInput = ({ label, type, value, setValue, placeholder, options }) => {
    return (
        <label className="w-full mb-[20px] block">
            <h2 className="text-[1.2rem] font-medium mb-2">{label}</h2>
            {type !== 'textarea' && type === 'select' && <select required placeholder={placeholder} className="w-full bg-white shadow-md focus:outline-none outline-none p-4 rounded-[10px] cursor-pointer" value={value} onChange={(e) => setValue(e.target.value)}>
                {options.map(e => <option key={e._id} value={e.table? e.table: e._id}>{e.title || e.table}</option>)}
            </select>}
            {type !== 'textarea' && type !== 'select' && <input type={type} required placeholder={placeholder} className="w-full bg-white shadow-md focus:outline-none outline-none p-5 rounded-[10px]" defaultValue={value} onChange={(e) => setValue(e.target.value)} min={0}/>}
            {type === 'textarea' && type !== 'select' && <textarea required placeholder={placeholder} className="w-full bg-white shadow-md focus:outline-none outline-none p-5 rounded-[10px] min-h-[200px] max-h-[200px]" defaultValue={value} onChange={(e) => setValue(e.target.value)}/>}
        </label>
    )
}

export default MainInput