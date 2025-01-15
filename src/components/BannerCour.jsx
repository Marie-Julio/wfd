// App.jsx
import { Clock3, Info, Landmark, Languages, Plus } from "lucide-react";
import React from "react";
import img from "../assets/imgCard.jpeg";

const BannerCour = ({course}) => {
  return (
    <div className="bg-custom-gradient  h-160 flex items-center justify-center">
      <div className="max-w-10xl   overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div className="p-8 text-white">
          <div className="flex items-center space-x-4">
            <span className="bg-orange-500 text-white py-1 px-3 rounded-full text-sm">Certifié</span>
            <span className="bg-orange-500 text-white py-1 px-3 rounded-full text-sm">Marketing</span>
            <span className="bg-orange-500 text-white py-1 px-3 rounded-full text-sm">Gestion de projet</span>
          </div>

          <h1 className="mt-6 text-xl font-bold">{course.title}</h1>
          <p className="mt-4 text-gray-300">
            {course.description}
          </p>

          <div className="flex mt-8 space-x-16 justify-center items-start ml-80">
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



          <button className="mt-8 bg-white text-blue-900 justify-center items-center font-semibold py-2 px-6 rounded-lg hover:bg-gray-100">
            DÉBUTER LE COURS
          </button>
        </div>

        {/* Right Section */}
        <div className="w-80 h-80  bg-white shadow rounded-xl border px-1 float-right ml-80">
      <img
        src={img}
        alt="Course Thumbnail"
        className="w-full h-40 object-cover rounded"
      />
      <span className="bg-orange-500 text-white right-0 -mr-0 font-semibold p-1 rounded-lg float-right flex justify-between">
      
      <Info strokeWidth={3} size={15} color="#fff" className='mt-1 mr-2'/>Certifié</span>
      <div className='rounded-md  px-1'>
      <div className="mt-4">
        <h3 className="text-lg font-bold">PLANIFICATION ET GESTION DE PROJETS</h3>
        {/* <p className="text-gray-600">{course.location}</p> */}
        <p className="text-gray-600 flex"> <Clock3 color="#000" strokeWidth={3} size={15} className='mt-1 mr-2'/> Duree : 8h</p>
        {/* {course.isCertified && ( */}
          
        {/* )} */}
      </div>
     
      </div>
      <button className="flex w-full  mt-4 bottom-0 -mb-10 bg-orange-500 text-white py-2 px-4 rounded-xl ">
        <Plus />
        Plus d'informations
      </button>
    </div>
      </div>
    </div>
  );
};

export default BannerCour;
