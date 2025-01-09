import ReloadIcon from "../icons/ReloadIcon";


export const Button = ({onClick, className, isLoading = false, disabled = false, children}) => {
    return(
        <button 
            className={`bg-[#E9522C] text-white py-2 px-3 rounded-md flex flex-row items-center justify-center ${className} ${disabled && "cursor-not-allowed"}`} 
            onClick={onClick} 
            type='submit'
            disabled={disabled ? true : false}
        >
            {
                isLoading ? (
                    <>
                        <ReloadIcon className="animate-spin" size={20}/>
                        <span className="block mx-2">Loading...</span>
                    </>
                ) : children
            }
        </button>
    )
}

export default Button;