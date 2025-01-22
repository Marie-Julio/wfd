import { Book, ChevronDown, ChevronUp, Clock, Star, User } from "lucide-react";
import { useState } from "react";
import { dateToFr, errorMessage, onServerSuccess, truncateStringAdvanced } from "../services/Helper";
import { Button } from "./Button";
import Modal from "./admin/common/Modal";
import { postResource } from "../services/api";
import { jwtDecode } from "jwt-decode";

const Cour = ({courses = []}) => {
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [delModal, setDelModal] = useState(false);
    const access_token = localStorage.getItem('token');
    const tokenNew = access_token ? jwtDecode(access_token) : null;
    const saveData = (data) => {
           console.log(data)
            postResource("/inscriptions", {
              user_id: tokenNew.id,
              promotion_id: data,
              annee: 2025,
              statut: "en_attente"
            }).then((res) => {
                onServerSuccess("Votre inscription a ete bien recue!!!")
                // formik.resetForm();
                setDelModal(false)
            }).catch((e) => errorMessage(e))
        }
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  w-full">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white w-130 h-fit rounded-lg shadow-lg overflow-hidden transition-transform duration-800 hover:transform hover:scale-105 hover:scale-105 hover:shadow-2xl hover:shadow-orange-300/100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.nom}
                  </h3>
                  
                  <p className="text-gray-600"><article className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{
                      __html: truncateStringAdvanced(course.description, 200),
                    }}
                    className="article-content"
                  />
                </article></p>
                  <div className=" whitespace-nowrap flex items-center space-x-8 my-6 text-sm text-gray-500 mb-4 ">
                    <div className="flex items-center">
                      <User className="mr-1" />
                      {course.nombre_inscrits}
                    </div>
                    <div className=" whitespace-nowrap flex items-center">
                      <Clock className="mr-1" />
                      {course.duree}
                    </div>
                    <div className=" whitespace-nowrap flex items-center">
                      <Star className="mr-1 text-yellow-400" />
                      {course.rating} ({course.course_modules} Cours)
                    </div>
                  </div>
                  
                  <p className="text-gray-600 font-semibold">Du: {dateToFr(course.date_debut)} au {dateToFr(course.date_fin)}</p>
                  <Button onClick={() => setDelModal(true)} className="mb-2 mt-10">Inscription</Button>
                </div>
                <Modal isOpen={delModal} onClose={() => setDelModal(false)}>
                <div className="flex flex-col items-center">
                    {/* <img src={danger} className="w-12 h-12 mb-3"/> */}
                    <p className="text-black text-xl font-bold">Êtes-vous sûr de vouloir vous inscrire dans cette promotion ?</p>
                    <div className="flex mt-5 space-x-10">
                        <button className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md" onClick={() => saveData(course.id)}>Oui</button>
                        <button className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white rounded-md" onClick={() => setDelModal(false)}>Non</button>
                    </div>
                </div>
              </Modal>
                {/* <button
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="ml-4 text-gray-400 hover:text-gray-600"
                >
                  {expandedCourse === course.id ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button> */}
              </div>
              {expandedCourse === course.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Modules du cours:</h4>
                  <ul className="space-y-2">
                    {course.modules.map((module, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Book className="w-4 h-4 mr-2" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

      
      </div>
     );
}
 
export default Cour;