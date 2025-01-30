// App.jsx
import { Clock3, Info, Landmark, Languages, Plus } from "lucide-react";
import React from "react";
import img from "../assets/imgCard.jpeg";
import img2 from "../../public/assets/images/certified.png";

const BannerCour = ({course}) => {
  return (
    <div className="bg-custom-gradient ">
        <div className="p-8 text-gray-50 text-center">
          <h1 className="mt-6 text-3xl font-bold">{course.title}</h1>
          {course.certifield === 1 ? 
          <div className="items-center pt-5">
            <span className="bg-red-500 text-white py-1 px-3 rounded-full text-lg">Certifié</span>
          </div>
           : null }
          </div>

          <div className="flex mb-10 space-x-16 justify-center items-start">
            {/* Colonne 1 */}
            <div className="flex flex-col items-center space-y-2">
                <Landmark color="#ffffff" strokeWidth={3} size={24} />
                <span className="whitespace-nowrap text-white text-center">
                Promotion: {course.promotion && course.promotion.nom}
                </span>
            </div>

            {/* Colonne 2 */}
            <div className="flex flex-col items-center space-y-2">
                <Clock3 color="#ffffff" strokeWidth={3} size={24} />
                <span className="whitespace-nowrap text-white text-center">
                Moyenne minimum: {course.min_score}
                </span>
            </div>

            {/* Colonne 3 */}
            <div className="flex flex-col items-center space-y-2">
                <Languages color="#ffffff" strokeWidth={3} size={24} />
                <span className="whitespace-nowrap text-white text-center">
                Duree: {course.promotion.duree}
                </span>
            </div>

            {/* Colonne 4 */}
            <div className="flex flex-col items-center space-y-2">
                <Languages color="#ffffff" strokeWidth={3} size={24} />
                <span className="whitespace-nowrap text-white text-center">
                Langue: Français
                </span>
            </div>
        </div>

      </div>
  );
};

export default BannerCour;
