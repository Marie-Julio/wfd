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

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [cours, setCours] = useState([]);
  const [infos, setInfos] = useState([]);
  
      const _init_ = () => {
        getResource("/projets").then((res) => {
            console.log(res.data)
            setProjects(res.data)
        }).catch(e => {
            errorMessage(e)
          })

          getResource("/announcements").then((res) => {
            console.log(res.data);
            setInfos(res.data);
        }).catch(e => {
            errorMessage(e)
          })

          getResource("/course-modules").then((res) => {
            console.log(res.data)
            setCourses(res.data)
        }).catch(e => {
            errorMessage(e)
          })
    }

    useEffect(() => {
        _init_()
    }, [])

    return ( 
        <AppBody home={true}>
          <section className="items-center justify-center min-h-screen w-full">
                <div className="flex flex-wrap justify-center items-center gap-6 w-full my-30">
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>
                 {/* En-tête animé */}
                <div className="max-w-7xl my-20 mx-auto text-center mb-12 transform transition-all duration-500 hover:scale-105">
                    <h1 className="text-4xl font-bold text-tertiaire mb-4 inline-block animate-bounce" style={{
              animationDelay: `0.1s`,
              animationDuration: '1s',
              animationIterationCount: 1
            }}>
                    Nos Projets & Opportunités
                    </h1>
                    <p className="text-xl text-gray-600">
                    Découvrez nos initiatives innovantes et rejoignez notre équipe
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-15 animate-fade-left animate-delay-500 animate-ease-in-out">
                    <Project projects={projects}/>
                </div>

                 {/* Header */}
              <div className="max-w-7xl mx-auto text-center mb-12 my-20">
                <h1 className="text-4xl font-bold text-tertiaire mb-4">
                  Nos Cours et Formations
                </h1>
                <p className="text-xl text-gray-600">
                  Développez vos compétences avec nos formations de qualité
                </p>
              </div>

              {/* Courses Section */}
              <div className="max-w-7xl mx-auto mb-12 animate-jump animate-delay-500 animate-ease-out">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 items-start ">
                  Cours disponibles
                </h2>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-5">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={cours} />
                ))}
                </div>
              </div>

            {/* Information Section */}

            <div className="max-w-7xl mx-auto items-center mb-12 md:m-10">
            <h1 className="text-4xl font-bold text-tertiaire text-center mb-4">
                  Nos Actualites
                </h1>
                <InfoComponent informations={infos}/>
            </div>
            </section>


        </AppBody>
     );
}
 
export default Home;