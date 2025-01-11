import { ChevronRight } from "lucide-react";
import { truncateStringAdvanced } from "../services/Helper";

const InfoComponent = ({informations = []}) => {
    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 mx-4 sm:mx-7">
        {informations.map((info, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            {/* Image */}
            <div className="mb-4">
              <img
                src={info.image}
                alt={info.title}
                className="w-full h-48 object-cover rounded-t-lg mb-2"
              />
              <h3 className="text-lg text-gray-900 font-extrabold">
                {info.title}
              </h3>
            </div>
      
            {/* Content */}
            <p className="text-gray-600">
              <article className="prose max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateStringAdvanced(info.content, 200),
                  }}
                  className="article-content"
                />
              </article>
            </p>
      
            {/* Button */}
            <button
              className="mt-4 flex items-center rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 hover:text-black transition-all duration-300 transform hover:scale-105 group"
            >
              En savoir plus
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        ))}
      </div>
    
     );
}
 
export default InfoComponent;