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
            <span className="bg-red-600 text-white py-1 px-3 rounded-full text-lg">Certifié</span> par<span className="pt-2 font-semibold"> {course.user.prenom} {course.user.nom}</span>
          </div>
           : <div className="items-center pt-5">
           par<span className="pt-2 font-semibold"> {course.user.prenom} {course.user.nom}</span>
         </div> }
           
        </div>
        <div className="container relative ">
        <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-start">
              
              <div className="flex flex-col items-center space-y-2 pb-10">
                  <Landmark color="red" strokeWidth={3} size={24} />
                  <span className="whitespace-nowrap text-white text-center">
                  {course.promotion && course.promotion.nom}
                  </span>
              </div>

              {/* Colonne 2 */}
              <div className="flex flex-col items-center space-y-2 pb-10">
                  <Clock3 color="#ffffff" strokeWidth={3} size={24} />
                  <span className="whitespace-nowrap text-white text-center">
                  Score min : {course.min_score}%
                  </span>
              </div>

              {/* Colonne 3 */}
              <div className="flex flex-col items-center space-y-2 pb-10">
                  <Clock3 color="#ffffff" strokeWidth={3} size={24} />
                  <span className="whitespace-nowrap text-white text-center">
                  Durée : {course.duree} heure(s)
                  </span>
              </div>

              {/* Colonne 4 */}
              <div className="flex flex-col items-center space-y-2 pb-10">
                  <Languages color="#ffffff" strokeWidth={3} size={24} />
                  <span className="whitespace-nowrap text-white text-center">
                  Langue : Français
                  </span>
              </div>
          </div>
        </div>
          
        </div>
    </div>
  );
};

export default BannerCour;
