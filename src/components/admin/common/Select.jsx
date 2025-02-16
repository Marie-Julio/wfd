



const Select = ({label, className, name, value, onChange, error, children, disabled}) => {
    return( 
        <div className={`w-full mb-4 flex flex-col ${className}`}>
            <label className="mb-2">{ label }</label>
            <div className="relative">
                <select name={name} value={value} onChange={onChange} disabled={disabled ? true : false} className={`block appearance-none w-full pr-8 rounded-md border border-blue-950 px-4 py-2 bg-white focus:outline-none focus:border-primary ${error && "border-danger"}`}>
                   { children }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            {error && <span className="text-danger">{error}</span>}
        </div>
    )
}

export default Select;