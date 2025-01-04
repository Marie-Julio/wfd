import { ChevronRight } from "lucide-react";

const Info = ({informations = []}) => {
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 mx-7">
          {informations.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-800 hover:transform hover:scale-105 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/100"
            >
              <div className="mb-4">
                <img
                    src={info.image}
                    alt={info.title}
                    className="w-full h-48 object-cover mb-2 bg-cover"
                />
                <h3 className="text-lg font-medium text-gray-900">
                    {info.title}
                </h3>
                </div>
                <p className="text-gray-600">{info.content}</p>

                <button className="mt-4 flex items-center rounded-lg bg-custom-gradient text-white px-4 py-3 hover:text-black transition-all duration-300
                bg-blue-600 hover:bg-blue-700
                transform hover:scale-105
                group">
                            En savoir plus
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
            </div>
          ))}
        </div>
     );
}
 
export default Info;