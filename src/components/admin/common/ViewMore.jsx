import { useState } from 'react';



export default function ViewMore({ title, children, className, open = false }) {
    const [isOpen, setIsOpen] = useState(open);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    };

    return (
        <div className={`w-full mx-auto border border-success rounded-md mb-8 ${className}`}>
            <div
                className={`inline-block mt-[-20px] mx-4 px-2 py-1 max-w-md rounded-md cursor-pointer bg-[#0ba603] text-white ${!isOpen && 'mb-3'}`}
                onClick={toggleOpen}
            >
                <div className='flex items-center'>
                        <span className="transition-transform transform">
                            {!isOpen ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg> : 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 bi bi-dash" viewBox="0 0 16 16">
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                </svg>
                            }
                        </span>
                    <span className='font-bold'>{ title }</span>
                </div>
            </div>
            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-screen' : 'max-h-0'
                }`}
            >
                <div className="px-4 py-2 bg-tertiary rounded-md mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
}