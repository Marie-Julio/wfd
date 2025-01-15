import boxes from '../assets/Icons/boxes.svg';

const CardComponent = ({image, title, values}) => {
    return ( 
                    
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
        <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt="Illustration"
            className="object-cover w-full h-full"
          />
          {/* {image} */}
        </div>
        <div className="w-full bg-white -mt-3 ">
          <h3 className="py-4 text-xl font-semibold text-center text-gray-800 capitalize dark:text-gray-200">
            {title}
          </h3>
          <div className="flex items-center justify-center py-4  rounded-b-xl dark:bg-gray-700">
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {values}
            </span>
          </div>
        </div>
      </div>
      

        
         );
}
 
export default CardComponent;