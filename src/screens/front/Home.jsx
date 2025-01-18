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
  const [cours, setCours] = useState([]);
  const [infos, setInfos] = useState([]);
  const [inscris, setInscris] = useState([]);
  
      const _init_ = () => {
        getResource("/projets").then((res) => {
            console.log(res.data)
            setProjects(res.data.slice(0, 3))
        }).catch(e => {
            errorMessage(e)
          })

          getResource("/announcements").then((res) => {
            console.log(res.data);
            setInfos(res.data.slice(0, 3));
        })

          getResource("/course-modules").then((res) => {
            console.log(res.data)
            setCours(res.data.slice(0, 8))
        })

        getResource("/inscriptions").then((res) => {
          console.log(res.data)
          setInscris(res.data.slice(0, 6))
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
                    <div className="lg:col-span-5 md:col-span-6">
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

                    <div className="lg:col-span-7 md:col-span-6">
                        <div className="lg:ms-5">
                            <div className="flex mb-4">
                                <span className="text-[#eb6b11] text-2xl font-bold mb-0"><span className="counter-value text-6xl font-bold" data-target="15">10</span>+</span>
                                <span className="self-end font-semibold ms-2">Years <br /> Experience</span>
                            </div>

                            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Business and technology <br /> consulting for growth</h3>

                            <p className="text-slate-400 max-w-xl">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect. Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with 'real' content.</p>
                        
                            <div className="mt-6">
                                <a href="contact-one.html" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#eb6b11] hover:bg-indigo-700 border-[#eb6b11] hover:border-indigo-700 text-white rounded-md mt-2"><i className="uil uil-airplay"></i> Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container relative mt-16">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                    <div className="group px-6 py-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow dark:hover:shadow-gray-800 duration-500 ease-in-out border-b-[3px] border-transparent hover:border-[#eb6b11]">
                        <i data-feather="codesandbox" className="size-10 stroke-1 text-[#eb6b11]"></i>

                        <div className="content mt-6">
                            <a href="page-services.html" className="title h5 text-xl font-semibold hover:text-[#eb6b11]">User Friendly</a>
                            <p className="text-slate-400 mt-4">The phrasal sequence of the is now so that many campaign and benefit</p>
                            
                            <div className="mt-5">
                                <a href="page-services.html" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#eb6b11] hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">Learn More <i className="uil uil-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="group px-6 py-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow dark:hover:shadow-gray-800 duration-500 ease-in-out border-b-[3px] border-transparent hover:border-[#eb6b11]">
                        <i data-feather="send" className="size-10 stroke-1 text-[#eb6b11]"></i>

                        <div className="content mt-6">
                            <a href="page-services.html" className="title h5 text-xl font-semibold hover:text-[#eb6b11]">Super Fast</a>
                            <p className="text-slate-400 mt-4">The phrasal sequence of the is now so that many campaign and benefit</p>
                            
                            <div className="mt-5">
                                <a href="page-services.html" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#eb6b11] hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">Learn More <i className="uil uil-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="group px-6 py-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow dark:hover:shadow-gray-800 duration-500 ease-in-out border-b-[3px] border-transparent hover:border-[#eb6b11]">
                        <i data-feather="star" className="size-10 stroke-1 text-[#eb6b11]"></i>

                        <div className="content mt-6">
                            <a href="page-services.html" className="title h5 text-xl font-semibold hover:text-[#eb6b11]">Insightful Analytics</a>
                            <p className="text-slate-400 mt-4">The phrasal sequence of the is now so that many campaign and benefit</p>
                            
                            <div className="mt-5">
                                <a href="page-services.html" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#eb6b11] hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">Learn More <i className="uil uil-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="group px-6 py-8 hover:bg-white dark:hover:bg-slate-900 hover:shadow dark:hover:shadow-gray-800 duration-500 ease-in-out border-b-[3px] border-transparent hover:border-[#eb6b11]">
                        <i data-feather="bookmark" className="size-10 stroke-1 text-[#eb6b11]"></i>

                        <div className="content mt-6">
                            <a href="page-services.html" className="title h5 text-xl font-semibold hover:text-[#eb6b11]">Highly Rated</a>
                            <p className="text-slate-400 mt-4">The phrasal sequence of the is now so that many campaign and benefit</p>
                            
                            <div className="mt-5">
                                <a href="page-services.html" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#eb6b11] hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">Learn More <i className="uil uil-arrow-right"></i></a>
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
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Projets</h3>
                        <p className="text-slate-400 max-w-xl">Start working with Techwind that can provide everything you need to generate awareness, drive traffic, connect.</p>
                    </div>

                    <div className="lg:col-span-4 md:col-span-6 md:text-end hidden md:block">
                        <a href="/pages-projet" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#eb6b11] hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">Voir plus <i className="uil uil-arrow-right align-middle"></i></a>
                    </div>
                </div>

                <div className="sm:flex mt-4" id="grid">
                    <div className="lg:w-1/3 sm:w-1/2 picture-item p-4 rounded-md">
                        <div className="">
                            <div className="relative">
                                <div className="shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-[#eb6b11]/5 dark:bg-[#eb6b11]/30">
                                    <img src="assets/images/portfolio/pro1.jpg" className="rounded-t-md shadow" alt="" />
                                </div>
                            </div>

                            <div className="pt-4 px-3">
                                <h5 className="mb-1 font-semibold text-lg"><a href="https://1.envato.market/techwind" target="_blank" className="hover:text-[#eb6b11] duration-500">Techwind Personal Portfolio</a></h5>
                                <span className="text-slate-400">Creative</span>
                            </div>                            
                        </div>
                    </div>

                    <div className="lg:w-1/3 sm:w-1/2 picture-item p-4 rounded-md">
                        <div className="">
                            <div className="relative">
                                <div className="shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-emerald-600/5 dark:bg-emerald-600/30">
                                    <img src="assets/images/portfolio/pro2.jpg" className="rounded-t-md shadow" alt="" />
                                </div>
                            </div>

                            <div className="pt-4 px-3">
                                <h5 className="mb-1 font-semibold text-lg"><a href="https://1.envato.market/techwind" target="_blank" className="hover:text-emerald-600 duration-500">Techwind Minimal Portfolio</a></h5>
                                <span className="text-slate-400">Minimal</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 sm:w-1/2 picture-item p-4 rounded-md">
                        <div className="">
                            <div className="relative">
                                <div className="shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-red-600/5 dark:bg-red-600/30">
                                    <img src="assets/images/portfolio/pro3.jpg" className="rounded-t-md shadow" alt="" />
                                </div>
                            </div>

                            <div className="pt-4 px-3">
                                <h5 className="mb-1 font-semibold text-lg"><a href="https://1.envato.market/techwind" target="_blank" className="hover:text-red-600 duration-500">Techwind NFT Market</a></h5>
                                <span className="text-slate-400">Crypto</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 sm:w-1/2 picture-item p-4 rounded-md">
                        <div className="">
                            <div className="relative">
                                <div className="shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-sky-600/5 dark:bg-sky-600/30">
                                    <img src="assets/images/portfolio/pro4.jpg" className="rounded-t-md shadow" alt="" />
                                </div>
                            </div>

                            <div className="pt-4 px-3">
                                <h5 className="mb-1 font-semibold text-lg"><a href="https://1.envato.market/techwind" target="_blank" className="hover:text-sky-600 duration-500">Techwind Portfolio</a></h5>
                                <span className="text-slate-400">Portfolio</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 sm:w-1/2 picture-item p-4 rounded-md">
                        <div className="">
                            <div className="relative">
                                <div className="shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-amber-600/5 dark:bg-amber-600/30">
                                    <img src="assets/images/portfolio/pro5.jpg" className="rounded-t-md shadow" alt="" />
                                </div>
                            </div>

                            <div className="pt-4 px-3">
                                <h5 className="mb-1 font-semibold text-lg"><a href="https://1.envato.market/techwind" target="_blank" className="hover:text-amber-600 duration-500">Techwind Constuction</a></h5>
                                <span className="text-slate-400">Corporate</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 sm:w-1/2 picture-item p-4 rounded-md">
                        <div className="">
                            <div className="relative">
                                <div className="shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-[#eb6b11]/5 dark:bg-[#eb6b11]/30">
                                    <img src="assets/images/portfolio/pro6.jpg" className="rounded-t-md shadow" alt="" />
                                </div>
                            </div>

                            <div className="pt-4 px-3">
                                <h5 className="mb-1 font-semibold text-lg"><a href="https://1.envato.market/techwind" target="_blank" className="hover:text-[#eb6b11] duration-500">Techwind SEO</a></h5>
                                <span className="text-slate-400">SEO</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 md:hidden mt-8">
                    <div className="md:col-span-12 text-center">
                        <a href="#" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[#eb6b11] hover:text-[#eb6b11] after:bg-[#eb6b11] duration-500 ease-in-out">Voir plus <i className="uil uil-arrow-right align-middle"></i></a>
                    </div>
                </div>
            </div>

            <div className="container relative md:mt-24 mt-16 lg:pt-24 pt-16">
                <div className="absolute inset-0 opacity-25 dark:opacity-50 bg-[url('../../assets/images/map.html')] bg-no-repeat bg-center bg-cover"></div>
                <div className="relative grid grid-cols-1 pb-8 text-center z-1">
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-black dark:text-white">Approuvé par plus de 1K utilisateurs</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.</p>
                </div>

                <div className="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-[30px] z-1">
                    <div className="counter-box  justify-center items-center space-x-4 flex">
                      <div className="pr-5">
                        <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-400 dark:text-white"><span className="counter-value" data-target={cours.length}>{cours.length}</span>+</h1>
                        <h5 className="counter-head text-lg font-medium">Cours</h5>
                      </div>
                      <img src={h3} height={70} width={70} alt="Illustration"/>
                    </div>
                    
                    <div className="counter-box  justify-center items-center space-x-4 flex">
                      <div className="pr-5">
                        <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-400 dark:text-white"><span className="counter-value" data-target={projects.length}>{projects.length}</span>+</h1>
                        <h5 className="counter-head text-lg font-medium">Projets</h5>
                      </div>
                      <img src={h2} height={70} width={70} alt="Illustration"/>
                    </div>
                    
                    <div className="counter-box  justify-center items-center space-x-4 flex">
                      <div className="pr-5">
                        <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-400 dark:text-white"><span className="counter-value" data-target={inscris.length}>{inscris.length}</span>+</h1>
                        <h5 className="counter-head text-lg font-medium">Inscrits</h5>
                      </div>
                      <img src={h1} height={70} width={70} alt="Illustration"/>
                    </div>
                </div>
            </div>

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
                    <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Personnels administratifs</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Les membres de l'administrations dédiés au bon fonctionnement de notre institut et à la réussite de nos missions éducatives.</p>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]">
                    <div className="lg:col-span-3 md:col-span-6">
                        <div className="group text-center">
                            <div className="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                                <img src="assets/images/client/04.jpg" className="" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black size-52 rounded-full opacity-0 group-hover:opacity-100 duration-500"></div>

                                <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="facebook" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="instagram" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="linkedin" className="size-4"></i></a></li>
                                </ul>
                            </div>

                            <div className="content mt-3">
                                <a href="#" className="text-lg font-semibold hover:text-[#eb6b11] duration-500">Jack John</a>
                                <p className="text-slate-400">Directeur</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-3 md:col-span-6">
                        <div className="group text-center">
                            <div className="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                                <img src="assets/images/client/05.jpg" className="" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black size-52 rounded-full opacity-0 group-hover:opacity-100 duration-500"></div>

                                <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="facebook" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="instagram" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="linkedin" className="size-4"></i></a></li>
                                </ul>
                            </div>

                            <div className="content mt-3">
                                <a href="#" className="text-lg font-semibold hover:text-[#eb6b11] duration-500">Krista John</a>
                                <p className="text-slate-400">Directeur Adjoint</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-3 md:col-span-6">
                        <div className="group text-center">
                            <div className="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                                <img src="assets/images/client/06.jpg" className="" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black size-52 rounded-full opacity-0 group-hover:opacity-100 duration-500"></div>

                                <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="facebook" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="instagram" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="linkedin" className="size-4"></i></a></li>
                                </ul>
                            </div>

                            <div className="content mt-3">
                                <a href="#" className="text-lg font-semibold hover:text-[#eb6b11] duration-500">Roger Jackson</a>
                                <p className="text-slate-400">Secrétaire général</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-3 md:col-span-6">
                        <div className="group text-center">
                            <div className="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                                <img src="assets/images/client/07.jpg" className="" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black size-52 rounded-full opacity-0 group-hover:opacity-100 duration-500"></div>

                                <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="facebook" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="instagram" className="size-4"></i></a></li>
                                    <li className="inline"><a href="#" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-[#eb6b11] bg-[#eb6b11] hover:border-[#eb6b11] hover:bg-[#eb6b11] text-white"><i data-feather="linkedin" className="size-4"></i></a></li>
                                </ul>
                            </div>

                            <div className="content mt-3">
                                <a href="#" className="text-lg font-semibold hover:text-[#eb6b11] duration-500">Johnny English</a>
                                <p className="text-slate-400">Responsable des admissions</p>
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