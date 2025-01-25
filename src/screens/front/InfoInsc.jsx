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
        <div class="container relative md:mt-16 mt-10">
            <div class="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div class="md:col-span-7">
                    <div class="lg:ms-4">
                        <h4 class="font-bold lg:leading-normal leading-normal text-3xl lg:text-4xl mb-5 text-black dark:text-white">Lancer votre inscription <br /> dans une promotion</h4>
                        <p class="text-slate-900 dark:text-white/75 text-lg max-w-xl">Vous êtes sur le point de commencer le processus d'inscription au réseau <span class="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-[#1a5fa9]/30 relative font-semibold text-lg">"FRUITS DE WFD Guinée"</span>, la plateforme des jeunes engagés pour la promotion de la Paix et du Développement Durable</p>
                    </div>
                </div>
              </div>
          </div>
        <div className="container mx-auto px-4 pt-10 md:pt-0">
          <div className="max-w-7xl mx-auto mb-12 md:m-10">
          <section class="relative md:py-24 py-16">
            <div class="container relative">
                <div class="md:flex justify-center">
                    <div class="md:w-3/4">
                        <div class="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                            <h5 class="text-xl font-semibold mb-4">Introduction :</h5>
                            <p class="text-slate-400">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>

                            <h5 class="text-xl font-semibold mb-4 mt-8">User Agreements :</h5>
                            <p class="text-slate-400">The most well-known dummy text is the 'Lorem Ipsum', which is said to have <b class="text-red-600">originated</b> in the 16th century. Lorem Ipsum is <b class="text-red-600">composed</b> in a pseudo-Latin language which more or less <b class="text-red-600">corresponds</b> to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also <b class="text-red-600">incomprehensible</b>, but it imitates the rhythm of most European languages in Latin script. The <b class="text-red-600">advantage</b> of its Latin origin and the relative <b class="text-red-600">meaninglessness</b> of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's <b class="text-red-600">attention</b> from the layout.</p>
                            <p class="text-slate-400 mt-3">There is now an <b class="text-red-600">abundance</b> of readable dummy texts. These are usually used when a text is <b class="text-red-600">required purely</b> to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or <b class="text-red-600">nonsensical</b> stories.</p>
                            <p class="text-slate-400 mt-3">It seems that only <b class="text-red-600">fragments</b> of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>
                            
                            <h5 class="text-xl font-semibold mb-4 mt-8">Restrictions :</h5>
                            <p class="text-slate-400">You are specifically restricted from all of the following :</p>
                            <ul class="list-none text-slate-400 mt-3">
                                <li class="flex mt-2"><i class="uil uil-arrow-right text-indigo-600 text-lg align-middle me-2"></i>Digital Marketing Solutions for Tomorrow</li>
                                <li class="flex mt-2"><i class="uil uil-arrow-right text-indigo-600 text-lg align-middle me-2"></i>Our Talented & Experienced Marketing Agency</li>
                                <li class="flex mt-2"><i class="uil uil-arrow-right text-indigo-600 text-lg align-middle me-2"></i>Create your own skin to match your brand</li>
                                <li class="flex mt-2"><i class="uil uil-arrow-right text-indigo-600 text-lg align-middle me-2"></i>Digital Marketing Solutions for Tomorrow</li>
                                <li class="flex mt-2"><i class="uil uil-arrow-right text-indigo-600 text-lg align-middle me-2"></i>Our Talented & Experienced Marketing Agency</li>
                                <li class="flex mt-2"><i class="uil uil-arrow-right text-indigo-600 text-lg align-middle me-2"></i>Create your own skin to match your brand</li>
                            </ul>

                            <h5 class="text-xl font-semibold mt-8">Users Question & Answer :</h5>

                            <div id="accordion-collapse" data-accordion="collapse" class="mt-6">
                                <div class="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                    <h2 class="text-base font-semibold" id="accordion-collapse-heading-1">
                                        <button type="button" class="flex justify-between items-center p-5 w-full font-medium text-start" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                            <span>How does it work ?</span>
                                            <svg data-accordion-icon class="size-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </h2>
                                    <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
                                        <div class="p-5">
                                            <p class="text-slate-400 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          </div>
      </div>
    </div>
    </AppBody>
    );
}
 
export default Promotion;