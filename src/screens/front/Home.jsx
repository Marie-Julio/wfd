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
import CourIcon from "../../assets/images/cours.svg"

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

    return ( 
        <AppBody home={true}>
        <section className="bg-white">
          <div className="container px-6 py-12 mx-auto lg:w-10/12 sm:px-6 sm:py-12 lg:px-8">

            <div className="gap-8 grid grid-cols-1 sm:grid-cols-3">
                <div className="w-full">
                  <div className="bg-white shadow-md rounded-lg">
                    <div className="p-6 bg-blue-400 flex-shrink-0 relative overflow-hidden">
                      <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: "scale(1.5)", opacity: 0.1 }}>
                        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                      </svg>
                      <div className="flex items-center">
                        <div className="flex-grow text-left">
                          <h3 className="text-primary text-2xl font-bold">{cours.length}</h3>
                          <span className="text-gray-600">Cours</span>
                        </div>
                        <div className="flex-shrink-0">
                          <img
                              src={h3} height={70} width={70}
                              alt="Illustration"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="bg-white shadow-md rounded-lg">
                    <div className="p-6 bg-yellow-400 flex-shrink-0 relative overflow-hidden">
                      <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: "scale(1.5)", opacity: 0.1 }}>
                        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                      </svg>
                      <div className="flex items-center">
                        <div className="flex-grow text-left">
                          <h3 className="text-primary text-2xl font-bold">{projects.length}</h3>
                          <span className="text-gray-600">Projets</span>
                        </div>
                        <div className="flex-shrink-0">
                          <img
                              src={h2} height={70} width={70}
                              alt="Illustration"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="bg-white shadow-md rounded-lg">
                    <div className="p-6 bg-green-400 flex-shrink-0 relative overflow-hidden">
                      <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: "scale(1.5)", opacity: 0.1 }}>
                        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                      </svg>
                      <div className="flex items-center">
                        <div className="flex-grow text-left">
                          <h3 className="text-primary text-2xl font-bold">{inscris.length}</h3>
                          <span className="text-gray-600">Inscrits</span>
                        </div>
                        <div className="flex-shrink-0">
                          <img
                              src={h1} height={70} width={70}
                              alt="Illustration"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                <div className="max-w-7xl my-20 mx-auto text-center mb-12 transform transition-all duration-500 hover:scale-105 animate-jump-in animate-once animate-duration-[5000ms] animate-delay-500">
                    <h1 className="text-4xl font-bold text-tertiaire mb-4 inline-block " >
                    Nos Projets & Opportunités
                    </h1>
                    <p className="text-xl text-gray-600">
                    Découvrez nos initiatives innovantes et rejoignez notre équipe
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-left animate-delay-500 animate-ease-in-out">
                    <Project projects={projects}/>
                </div>

                 {/* Header */}
              <div className="max-w-7xl mx-auto text-center mb-12 my-20 animate-jump-in animate-once animate-duration-[5000ms] animate-delay-500">
                <h1 className="text-4xl font-bold text-tertiaire mb-4">
                  Nos Cours et Formations
                </h1>
                <p className="text-xl text-gray-600">
                  Développez vos compétences avec nos formations de qualité
                </p>
              </div>

              {/* Courses Section */}
              <div className="max-w-7xl mx-auto mb-12 animate-fade-down animate-once animate-duration-[5000ms] animate-delay-500">
                {/* <h2 className="text-2xl font-semibold text-gray-900 mb-6 items-start ">
                  Cours disponibles
                </h2> */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-5">
                {cours.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
                </div>
              </div>

            {/* Information Section */}

            <div className=" items-center animate-jump-in animate-once animate-duration-[5000ms] animate-delay-500">
            <h1 className="text-4xl font-bold text-tertiaire text-center mb-4">
                  Nos Actualites
                </h1>
                <InfoComponent informations={infos}/>
            </div>
            </div>
            </section>


        </AppBody>
     );
}
 
export default Home;