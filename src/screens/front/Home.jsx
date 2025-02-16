import { Book, ChevronDown, ChevronUp, Clock, Info, Star, User } from "lucide-react";
import AppBody from "../../components/AppBody";
import CardComponent from "../../components/Card";
import Project from "../../components/Project";
import { courses, information, projects } from "../../Data/data";
import { useEffect, useState } from "react";
import Cour from "../../components/Cour";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";
import InfoComponent from "../../components/Info";
import CourseCard from "../../components/CourseCard";
import h1 from "../../assets/images/h1.png";
import h2 from "../../assets/images/h2.png";
import CourIcon from "../../assets/images/cours.svg";
import background2 from "../../assets/images/home2.png";;
import 'tiny-slider/dist/tiny-slider.css';
import { tns } from 'tiny-slider';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [projectsTotal, setProjectsTotal] = useState([]);
  const [cours, setCours] = useState([]);
  const [coursTotal, setCoursTotal] = useState([]);
  const [infos, setInfos] = useState([]);
  const [infosTotal, setInfosTotal] = useState([]);
  const [inscris, setInscris] = useState([]);
  const [inscrisTotal, setInscrisTotal] = useState([]);
  
      const _init_ = () => {
        getResource("/projets").then((res) => {
            setProjects(res.data.slice(0, 3))
            setProjectsTotal(res.data)
        }).catch(e => {
            errorMessage(e)
          })

          getResource("/announcements").then((res) => {;
            setInfos(res.data.slice(0, 3));
            setInfosTotal(res.data);
        })

          getResource("/course-modules").then((res) => {
            setCours(res.data)
            setCoursTotal(res.data)
        })

        getResource("/inscriptions").then((res) => {
          setInscris(res.data)
          setInscrisTotal(res.data)
      })
    }

    useEffect(() => {
        _init_()
    }, [])


    useEffect(() => {
        tns({
          container: '.tiny-single-item',
          items: 1,
          slideBy: 'page',
          autoplay: true,
          controls: false,
          nav: false,
          navPosition: "bottom",
          autoplayButtonOutput: false,
          speed: 400,
          mouseDrag: true,
          gutter: 10,
        });
      }, []);
      

  useEffect(() => {
    feather.replace();
  }, []);

    return ( 
        <AppBody >
        <section className="relative bg-indigo-600/5 dark:bg-slate-800 md:py-10 py-6">
            <div className=" hidden md:block absolute top-5 right-20 w-40 h-40 bg-[#eb6b11] rounded-full ">
                <div className="bg-no-repeat bg-cover bg-center w-40 h-40 rounded-full transform transition-all duration-500 hover:scale-110" style={{ backgroundImage: `url(${background2})` }}></div>
            </div>
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                    <div className="lg:col-span-5 md:col-span-5">
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <img src="assets/images/coach/s1.jpg" className="shadow rounded-md transform transition-all duration-500 hover:scale-110" alt="" />
                                    <img src="assets/images/coach/s2.jpg" className="shadow rounded-md transform transition-all duration-500 hover:scale-110" alt="" />
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <img src="assets/images/coach/s3.jpg" className="shadow rounded-md transform transition-all duration-500 hover:scale-110" alt="" />
                                    <img src="assets/images/coach/s4.jpg" className="shadow rounded-md transform transition-all duration-500 hover:scale-110" alt="" />
                                    <img src="assets/images/coach/s5.jpg" className="shadow rounded-md transform transition-all duration-500 hover:scale-110" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 md:col-span-7">
                        <div className="lg:ms-5">
                            <div className="flex mb-4">
                                <span className="transform transition-all duration-500 hover:scale-110 text-[#eb6b11] text-2xl font-bold mb-0"><span className="counter-value text-6xl font-bold" data-target="15">10</span>+</span>
                                <span className="transform transition-all duration-500 hover:scale-110 self-end font-semibold ms-2">Années <br /> d'Expérience</span>
                            </div>

                            <h3 className="transform transition-all duration-500 hover:scale-105 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"> Formation et de sensibilisation à la PAIX !</h3>

                            <p className="text-slate-600 max-w-xl">Découvrez des formations inspirantes et des outils pratiques pour devenir un <strong> acteur clé </strong> de la paix et du développement durable.</p>
                        
                            <div className="mt-6">
                                <a href="/login" className="transform transition-all hover:scale-105 py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#eb6b11] hover:bg-indigo-700 border-[#eb6b11] hover:border-indigo-700 text-white rounded-md mt-2">
                                <i className="uil uil-airplay"></i> Commencer</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="relative md:py-24 py-16">

            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 pb-8 items-end">
                    <div className="lg:col-span-8 md:col-span-6 md:text-start text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold"><span className="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-[#1a5fa9]/30 relative">Projets</span></h3>
                        <p className="text-slate-400 max-w-xl">À travers des projets participatifs, co-conçus avec les bénéficiaires en fonction des besoins réels identifiés, nous affirmons notre engagement à être des acteurs de notre propre développement. Dans cette dynamique, nous restons constamment à l'écoute de notre communauté, envers laquelle nous sommes résolument déterminés à offrir notre service, guidés par un profond souci d'humanité, de solidarité.</p>
                    </div>

                    <div className="lg:col-span-4 md:col-span-6 md:text-end hidden md:block">
                        <a href="/pages-projet" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#1a5fa9] hover:text-[#1a5fa9] after:bg-[#1a5fa9] duration-500 ease-in-out">
                            Voir plus <i className="uil uil-arrow-right align-middle"></i></a>
                    </div>
                </div>

                <div className="grid mt-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Project projects={projects}/>
                </div>
            </div>


            <section className=" md:mt-24 mt-16 w-full table relative bg-center bg-no-repeat bg-cover">
            <div className=" bg-[#eb6b11] py-10 ">
                <div className="relative grid grid-cols-1 pb-8 text-center z-1">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-black dark:text-white">Approuvé par plus de 1K utilisateurs</h3>

                    <p className="text-slate-700 max-w-xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmo</p>
                </div>

                <div className="relative grid grid-cols-2 items-center mt-8 gap-[30px] px-10 z-1">
                    <div className="transform transition-all duration-500 hover:scale-105 counter-box justify-center items-center space-x-2 flex pr-5">
                        <div className="pr-1 lg:pr-5">
                            <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-900">
                                <span className="counter-value" data-target={projects.length}>{projects.length}</span>+
                            </h1>
                            <h5 className="counter-head text-lg font-semibold">Projets</h5>
                        </div>
                        <img src={h2} height={70} width={70} alt="Illustration"/>
                    </div>
                    
                    <div className="transform transition-all duration-500 hover:scale-105 counter-box justify-center items-center space-x-2 flex">
                        <div className="pr-1 lg:pr-5">
                            <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-900">
                                <span className="counter-value" data-target={inscris.length}>{inscris.length}</span>+
                            </h1>
                            <h5 className="counter-head text-lg font-semibold">Inscrits</h5>
                        </div>
                        <img src={h1} height={70} width={70} alt="Illustration"/>
                    </div>
                </div>
                </div>
            </section>
            
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold"><span className="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-[#1a5fa9]/30 relative">Témoignages</span></h3>

                    <p className="text-slate-500 max-w-xl mx-auto">Vous aussi, partagez votre expérience avec nous</p>
                </div>

                <div className="flex justify-center relative mt-16">
                    <div className="relative md:w-1/2 w-full">
                        <div className="absolute -top-20 md:-start-24 -start-0">
                            <i className="mdi mdi-format-quote-open text-9xl opacity-5"></i>
                        </div>

                        <div className="absolute bottom-28 md:-end-24 -end-0">
                            <i className="mdi mdi-format-quote-close text-9xl opacity-5"></i>
                        </div>

                        <div className="tiny-single-item">
                            <div className="tiny-slide">
                                <div className="text-center">
                                    <p className="text-lg text-slate-800 italic"> " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. " </p>

                                    <div className="text-center mt-5">
                                        <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                        </ul>

                                        <img src="assets/images/client/01.jpg" className="size-14 rounded-full shadow-md dark:shadow-gray-800 mx-auto" alt="" />
                                        <h6 className="mt-2 font-semibold">Abimodou AHOYO</h6>
                                        <span className="text-slate-400 text-sm">Manager</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tiny-slide">
                                <div className="text-center">
                                    <p className="text-lg text-slate-800 italic"> " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. " </p>

                                    <div className="text-center mt-5">
                                        <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                        </ul>

                                        <img src="assets/images/client/02.jpg" className="size-14 rounded-full shadow-md dark:shadow-gray-800 mx-auto" alt="" />
                                        <h6 className="mt-2 font-semibold">Christa GBELANTO</h6>
                                        <span className="text-slate-400 text-sm">Manager</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                      </div>
                </div>
            </div>
        </section>
        <section class="relative table w-full bg-indigo-600/5 overflow-hidden">
            <div class="container relative">
                <div class="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px] relative">
                    <div class="md:col-span-7">
                        <h4 class="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-black dark:text-white">Apprenez avec des
                         <span class="text-indigo-600"> Experts</span></h4>
                        <p class="text-slate-400 text-lg max-w-xl">Apprenez les principes 
                            fondamentaux de la résolution de conflits, de la communication pacifique et de la gestion des différences, tout en intégrant des techniques pratiques et efficaces.</p>
                        <div class="mt-6">
                            <a href="#"><img src="assets/images/app/app.png" class="inline-block m-1" alt="" /></a>
                            <a href="#"><img src="assets/images/app/playstore.png" class="inline-block m-1" alt="" /></a>
                        </div>
                    </div>

                    <div class="md:col-span-5">
                        <div class="relative">
                            <img src="assets/images/course/hero.png" alt="" />

                            <div class="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                                <a href="#!" data-type="youtube" data-id="S_CGed6E610"
                                    class="lightbox size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-indigo-600 dark:text-white">
                                    <i class="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="overflow-hidden after:content-[''] after:absolute after:h-32 after:w-32 after:bg-red-600/5 after:top-10 after:start-0 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]"></div>
                    <div class="overflow-hidden after:content-[''] after:absolute after:size-[512px] after:bg-indigo-600/5 after:top-0 after:-end-5 after:-z-1 after:rounded-full"></div>
                </div>
            </div>
        </section>
        

        
        <section class="py-6 border-b border-gray-100 dark:border-gray-800">
            <div class="container relative">
                <div class="grid md:grid-cols-4 grid-cols-2 justify-center gap-[20px]">
                    <div class="mx-auto py-4">
                        <img src="assets/images/client/amazon.svg" class="h-12" alt="" />
                    </div>

                    <div class="mx-auto py-4">
                        <img src="assets/images/client/google.svg" class="h-12" alt="" />
                    </div>
                    
                    <div class="mx-auto py-4">
                        <img src="assets/images/client/lenovo.svg" class="h-12" alt="" />
                    </div>
                    
                    <div class="mx-auto py-4">
                        <img src="assets/images/client/paypal.svg" class="h-12" alt="" />
                    </div>
                    
                </div>
            </div>
        </section>
        </AppBody>
     );
}
 
export default Home;