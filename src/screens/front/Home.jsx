import { Book, ChevronDown, ChevronUp, Clock, Info, Star, User } from "lucide-react";
import AppBody from "../../components/AppBody";
import CardComponent from "../../components/Card";
import Project from "../../components/Project";
import { courses, information, projects } from "../../Data/data";
import { useState } from "react";
import Cour from "../../components/Cour";

const Home = () => {
    
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-15">
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
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 items-start ">
          Cours disponibles
        </h2>
        <Cour courses={courses}/>
      </div>

      {/* Information Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Informations pratiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {information.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  {info.title}
                </h3>
              </div>
              <p className="text-gray-600">{info.content}</p>
            </div>
          ))}
        </div>
      </div>
            </section>


        </AppBody>
     );
}
 
export default Home;