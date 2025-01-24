import { ChevronRight } from "lucide-react";
import { truncateStringAdvanced } from "../services/Helper";
import { useNavigate } from "react-router";

const InfoComponent = ({informations = []}) => {
  const navigate = useNavigate()
    return ( 
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
        {informations.map((info, index) => (
          
          <div key={index} className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
            <div className="h-[200px] relative overflow-hidden flex items-center justify-center">
              <img src={info.image} alt={info.title} className="w-full h-auto object-contain transform transition-all duration-500 hover:scale-105" />
            </div>

          <div className="content p-6">
              <button onClick={() => navigate(`/pages-infos-single/${info.id}`)} className="font-semibold title h5 text-lg hover:text-[#eb6b11] duration-500 ease-in-out">{info.title}</button>
              <p className="text-slate-400 mt-3 text-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateStringAdvanced(info.content, 200),
                  }}
                  className="article-content"
                /></p>
              
              <div className="mt-4">
              <button onClick={() => navigate(`/pages-infos-single/${info.id}`)} className=" font-semibold relative bg-white inline-block tracking-wide align-middle text-[#1a5fa9] text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">
              En savoir plus <i className="uil uil-arrow-right"></i></button>
              </div>
          </div>
      </div>
        ))}
      </div>
    
     );
}
 
export default InfoComponent;