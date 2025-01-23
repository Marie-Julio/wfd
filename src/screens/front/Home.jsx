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
import h3 from "../../assets/images/h3.png";
import teacher from "../../assets/images/teacher.png";
import knowledge from "../../assets/images/knowledge.png";
import knowledge1 from "../../assets/images/knowledge (1).png";
import CourIcon from "../../assets/images/cours.svg";

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
            console.log(res.data)
            setProjects(res.data.slice(0, 3))
            setProjectsTotal(res.data)
        }).catch(e => {
            errorMessage(e)
          })

          getResource("/announcements").then((res) => {
            console.log(res.data);
            setInfos(res.data.slice(0, 3));
            setInfosTotal(res.data);
        })

          getResource("/course-modules").then((res) => {
            console.log(res.data)
            setCours(res.data.slice(0, 8))
            setCoursTotal(res.data)
        })

        getResource("/inscriptions").then((res) => {
          console.log(res.data)
          setInscris(res.data.slice(0, 6))
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
        <section className="relative bg-gray-50 dark:bg-slate-800 md:py-24 py-16">
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                    <div className="lg:col-span-6 md:col-span-6">
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <img src="assets/images/coach/about.jpg" className="shadow rounded-md" alt="" />
                                    <img src="assets/images/coach/group.jpg" className="shadow rounded-md" alt="" />
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <img src="assets/images/coach/one-one.jpg" className="shadow rounded-md" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 md:col-span-6">
                        <div className="lg:ms-5">
                            <div className="flex mb-4">
                                <span className="text-[#eb6b11] text-2xl font-bold mb-0"><span className="counter-value text-6xl font-bold" data-target="15">10</span>+</span>
                                <span className="self-end font-semibold ms-2">Années <br /> d'Expérience</span>
                            </div>

                            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"> Formation et de sensibilisation</h3>

                            <p className="text-slate-600 max-w-xl">Découvrez des formations inspirantes et des outils pratiques pour devenir un <strong> acteur clé </strong> de la paix et du développement durable.</p>
                        
                            <div className="mt-6">
                                <a href="/register" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#eb6b11] hover:bg-indigo-700 border-[#eb6b11] hover:border-indigo-700 text-white rounded-md mt-2"><i className="uil uil-airplay"></i> Commencer</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="relative md:py-24 py-16">

            <div class="container relative">
                <div class="grid md:grid-cols-12 grid-cols-1 pb-8 items-end">
                    <div class="lg:col-span-8 md:col-span-6 md:text-start text-center">
                        <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Projets</h3>
                        <p class="text-slate-400 max-w-xl">Prenez le temps de découvrir ces réalisations, qui sont autant de témoignages de notre capacité à créer de la valeur et à transformer des idées en solutions concrètes et inspirantes.</p>
                    </div>

                    <div class="lg:col-span-4 md:col-span-6 md:text-end hidden md:block">
                        <a href="/pages-projet" class="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#1a5fa9] hover:text-[#1a5fa9] after:bg-[#1a5fa9] duration-500 ease-in-out">
                            Voir plus <i class="uil uil-arrow-right align-middle"></i></a>
                    </div>
                </div>

                <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                <Project projects={projects}/>
                </div>
            </div>


            <section class="py-20 md:mt-24 mt-16 w-full table relative bg-center bg-no-repeat bg-cover">
            <div class="absolute inset-0 bg-[#fbe2ce]"></div>
                <div className="absolute inset-0 opacity-25 dark:opacity-50 bg-[url('../../assets/images/map.html')] bg-no-repeat bg-center bg-cover"></div>
                <div className="relative grid grid-cols-1 pb-8 text-center z-1">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-black dark:text-white">Approuvé par plus de 1K utilisateurs</h3>

                    <p className="text-slate-600 max-w-xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmo</p>
                </div>

                <div className="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-[30px] z-1">
                    <div className="counter-box  justify-center items-center space-x-4 flex">
                      <div className="pr-5">
                        <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-600 dark:text-white"><span className="counter-value" data-target={cours.length}>{coursTotal.length}</span>+</h1>
                        <h5 className="counter-head text-lg font-medium">Cours</h5>
                      </div>
                      <img src={h3} height={70} width={70} alt="Illustration"/>
                    </div>
                    
                    <div className="counter-box  justify-center items-center space-x-4 flex">
                      <div className="pr-5">
                        <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-600 dark:text-white"><span className="counter-value" data-target={projects.length}>{projectsTotal.length}</span>+</h1>
                        <h5 className="counter-head text-lg font-medium">Projets</h5>
                      </div>
                      <img src={h2} height={70} width={70} alt="Illustration"/>
                    </div>
                    
                    <div className="counter-box  justify-center items-center space-x-4 flex">
                      <div className="pr-5">
                        <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-600 dark:text-white"><span className="counter-value" data-target={inscris.length}>{inscrisTotal.length}</span>+</h1>
                        <h5 className="counter-head text-lg font-medium">Inscrits</h5>
                      </div>
                      <img src={h1} height={70} width={70} alt="Illustration"/>
                    </div>
                </div>
            </section>
            
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-black dark:text-white">Témoignages</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Vous aussi, partagez votre expérience avec nous</p>
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
                                    <p className="text-lg text-slate-400 italic"> " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " </p>

                                    <div className="text-center mt-5">
                                        <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                        </ul>

                                        <img src="assets/images/client/01.jpg" className="size-14 rounded-full shadow-md dark:shadow-gray-800 mx-auto" alt="" />
                                        <h6 className="mt-2 font-semibold">Christa Smith</h6>
                                        <span className="text-slate-400 text-sm">Manager</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tiny-slide">
                                <div className="text-center">
                                    <p className="text-lg text-slate-400 italic"> " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " </p>

                                    <div className="text-center mt-5">
                                        <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                        </ul>

                                        <img src="assets/images/client/02.jpg" className="size-14 rounded-full shadow-md dark:shadow-gray-800 mx-auto" alt="" />
                                        <h6 className="mt-2 font-semibold">Christa Smith</h6>
                                        <span className="text-slate-400 text-sm">Manager</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tiny-slide">
                                <div className="text-center">
                                    <p className="text-lg text-slate-400 italic"> " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " </p>

                                    <div className="text-center mt-5">
                                        <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                        </ul>

                                        <img src="assets/images/client/04.jpg" className="size-14 rounded-full shadow-md dark:shadow-gray-800 mx-auto" alt="" />
                                        <h6 className="mt-2 font-semibold">Christa Smith</h6>
                                        <span className="text-slate-400 text-sm">Manager</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                      </div>
                </div>
            </div>

            
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Découvrez nos dernières actualités !</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Découvrez les événements récents qui façonnent notre avenir.</p>
                </div>

                <InfoComponent informations={infos}/>
                
                <div className="lg:col-span-4 md:col-span-6 text-center hidden md:block pt-10">
                    <a href="/pages-infos" className="btn relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#eb6b11] hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">Voir plus <i className="uil uil-arrow-right align-middle"></i></a>
                </div>
            </div>
        </section>

        </AppBody>
     );
}
 
export default Home;