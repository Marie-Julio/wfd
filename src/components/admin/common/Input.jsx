import React, { useState } from "react"
import Icon from "./Icon";


export const Input  = ({ label, type, name, value, placeholder, onChange, error, className, disabled, full }) => {
    const [show, setShow] = useState(false)
    return ( 
        <div className={`w-full mb-4 flex flex-col  ${className}`}>
        <label className='mb-2'>{label}</label>
        <div className="relative text-black">
            <input
                name={name}
                type={show ? "text" : type}
                placeholder={placeholder}
                onChange={onChange}
                value={value !== undefined ? value : ''}
                className={`w-full ${full ? "rounded-full" : "rounded-lg" } border border-gray px-4 py-2 bg-white focus:outline-none focus:border-secondary ${error && "border-danger"}`}
                disabled={disabled ? true : false}
            />
            {
                type === "password" && 
                <span className="absolute right-2 top-2 hover:cursor-pointer" onClick={() => setShow(!show)}>
                    {
                        show ? <Icon name="bx-show" size="24px" style={{ margin: "2px" }}/> : <Icon name="bx-hide" size="24px" style={{ margin: "2px" }}/>
                    }
                </span>
            }
        </div>
        {error && <span className="text-danger">{error}</span>}
    </div>
    );
}