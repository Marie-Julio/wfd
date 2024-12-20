import boxes from '../assets/Icons/boxes.svg';

const CardComponent = () => {
    return ( 
                    
        <div className="bg-white flex flex-col items-center justify-center  transform transition-all duration-500  w-full max-w-56 mx-auto hover:shadow-2xl">
    <div className="w-full h-64 bg-white bg-center flex items-center justify-center bg-cover rounded-lg shadow-md">
        <img
            src={boxes}
            alt="Logo"
            width="100"
            height="100"
            className="flex justify-center items-center"
        />
    </div>

    <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
        <h3 className="py-2 font-bold tracking-wide text-center text-3xl text-gray-800 uppercase dark:text-white">
            Nike Revolt
        </h3>

        <div className="flex items-center justify-center px-3 py-2 bg-custom-gradient dark:bg-gray-700">
            <span className="flex font-bold text-white dark:text-gray-200 justify-center items-center text-center text-4xl">12900</span>
            
        </div>
    </div>
</div>

        
         );
}
 
export default CardComponent;