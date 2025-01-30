import { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import Cour from "../../components/Cour";
import Info from "../../components/Info";
import {  courses, information } from "../../Data/data";
import { getResource } from "../../services/api";
import Modal from "../../components/admin/common/Modal";

const Promotion = () => {
    const [infos, setInfos] = useState([]);
          const [loading, setLoading] = useState(true)
          
              const _init_ = () => {
        
                  getResource("/promotions").then((res) => {
                    console.log(res.data);
                    setInfos(res.data);
                }).catch(e => {
                    errorMessage(e)
                  })
            }
        
            useEffect(() => {
                _init_()
                setTimeout(() => setLoading(false), 1500)
            }, [])
    return ( 
    <AppBody>
      <div className=" bg-[#daeff9] flex flex-col md:flex-row justify-between items-center">
        <div className="container relative md:mt-16 mt-10">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="md:col-span-7">
                    <div className="lg:ms-4">
                <h4 className="transform transition-all duration-500 hover:scale-110 font-bold lg:leading-normal leading-normal text-3xl lg:text-4xl mb-5 text-black dark:text-white">Lancer votre inscription <br /> dans une promotion</h4>
                <p className="text-slate-900 dark:text-white/75 text-lg max-w-xl">Vous êtes sur le point de commencer le processus d'inscription au réseau <span className="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-[#1a5fa9]/30 relative font-semibold text-lg">"FRUITS DE WFD Guinée"</span>, la plateforme des jeunes engagés pour la promotion de la Paix et du Développement Durable</p>
            
                        <div className="mt-4">
                            <a href="\insc" className="transform transition-all duration-500 hover:scale-110 py-2 px-5 inline-block font-semibold tracking-wide border align-middle text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-3">
                              En savoir plus </a>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-5">
                    <div className="relative">
                        <div className="transform transition-all duration-500 hover:scale-110 p-5 shadow dark:shadow-gray-800 rounded-t-full bg-gray-50 dark:bg-slate-800">
                            <img src="assets/images/promotion.jpg" className="shadow-md rounded-t-full rounded-md" alt="" />
                        </div>
                        <div className=" hover:scale-105 absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                            <a href="#!" data-type="youtube" data-id="S_CGed6E610"
                                className="lightbox size-20 rounded-full shadow-md dark:shadow-gray-800 inline-flex items-center justify-center bg-white hover:text-white hover:bg-indigo-600 dark:bg-slate-900 text-indigo-600">
                                <i className="mdi mdi-play inline-flex items-center justify-center text-4xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        <div className="container mx-auto px-4 pt-10 md:pt-0">
          <div className="max-w-7xl mx-auto mb-12 md:m-10">
              <Cour courses={infos}/>
          </div>
      </div>
    </div>
    </AppBody>
    );
}
 
export default Promotion;