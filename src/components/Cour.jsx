import { Book, ChevronDown, ChevronUp, Clock, Star, User } from "lucide-react";
import { useState } from "react";
import { dateToFR, dateToFr, dateToInput, errorMessage, onServerError, onServerSuccess, truncateStringAdvanced } from "../services/Helper";
import { Button } from "./Button";
import Modal from "./admin/common/Modal";
import { postResource } from "../services/api";
import { jwtDecode } from "jwt-decode";

const Cour = ({courses = []}) => {
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [delModal, setDelModal] = useState(false);
    const access_token = localStorage.getItem('token');
    const tokenNew = access_token ? jwtDecode(access_token) : null;
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const saveData = (data) => {
           console.log(data)
            postResource("/inscriptions", {
              user_id: tokenNew.id,
              promotion_id: data,
              annee: 2025,
              statut: "en_attente"
            }).then((res) => {
                onServerSuccess("Votre inscription a été bien reçue")
                // formik.resetForm();
                setDelModal(false)
            }).catch((e) => {
                errorMessage(e);
                onServerError("Un problème est survenu. Contactez-nous")
              })
        }
    return ( 
        <div >
        {courses.map((course) => {
            // Récupération de la date d'aujourd'hui
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

            // Vérification si la date de fin (result.qcm.date_fin) est inférieure à aujourd'hui
            const isExpired = course.date_fin > formattedToday;
          return (
            
            <div key={course.id} class="justify-center">
            <div class="relative z-2 duration-500 ">
                <div class="relative bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md overflow-hidden">
                    <div class="grid lg:grid-cols-12 grid-cols-1">
                        <div class="lg:col-span-4 order-1 lg:order-2 bg-indigo-600 hover:bg-orange-600 transform transition-all duration-500 hover:scale-110">
                            <div class="p-[30px] lg:text-start text-center">
                                <span className="text-1xl font-medium">A partir du</span>
                                <h4 class="text-2xl font-semibold text-gray-200 pb-5"> {dateToFr(course.date_debut)}</h4>
                                <div className="flex items-center space-x-4">  
                                  <div className=" whitespace-nowrap flex items-center">
                                    <Clock className="mr-1" />
                                    {course.duree}
                                  </div>
                                  <div className=" whitespace-nowrap flex items-center">
                                  <i class="text-lg uil uil-book-open pr-2"></i>
                                  {course.course_modules} Cours
                                  </div>
                                </div>
                                <div class="mt-6">
                                {course.statut == "active" &&  isExpired && 
                                  <button onClick={() => {setSelectedCourseId(course.id); setDelModal(true);}} class="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-green-400 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md">
                                  Inscription
                                  </button>}
                                </div>
                            </div>
                        </div>

                        <div class="lg:col-span-8 order-2 lg:order-1">
                            <div class="grid grid-cols-1 p-[30px]">
                                <div class="group flex duration-500">
                                    <div class="transform transition-all duration-500 hover:scale-110 flex align-middle justify-center items-center size-10 mt-1 bg-indigo-600/5 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 rounded-full text-2xl shadow-sm dark:shadow-gray-800">
                                        <i class="uil uil-award"></i>
                                    </div>
                                    <div class="flex-1 ms-4">
                                        <h4 class="text-indigo-600 mb-0 text-2xl font-semibold">{course.nom}</h4>
                                        <p class="text-slate-400  mt-3"><div dangerouslySetInnerHTML={{
                                          __html: truncateStringAdvanced(course.description, 200),
                                        }}
                                        className="article-content"
                                      /></p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div><br />
        </div>
        )})}
    
    <Modal isOpen={delModal} onClose={() => setDelModal(false)}>
      <div className="flex flex-col items-center">
        <p className="text-black text-xl font-bold">
          Êtes-vous sûr de vouloir vous inscrire dans cette promotion ? {selectedCourseId}
        </p>
        <div className="flex mt-5 space-x-10">
          <button 
            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md" 
            onClick={() => {
              saveData(selectedCourseId);
              setDelModal(false);
            }}>Oui
          </button>
          <button 
            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white rounded-md" 
            onClick={() => setDelModal(false)}>Non
          </button>
        </div>
      </div>
    </Modal>
      </div>
     );
}
 
export default Cour;