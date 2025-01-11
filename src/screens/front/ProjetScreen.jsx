import { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";
import Project from "../../components/Project";

const ProjetScreen = () => {

    const [projects, setProjects] = useState([]);
      
          const _init_ = () => {
            getResource("/projets").then((res) => {
                console.log(res.data)
                setProjects(res.data)
            }).catch(e => {
                errorMessage(e)
              })
    
        }
    
        useEffect(() => {
            _init_()
        }, [])


    return ( 
        <AppBody titleBanner="Informez-vous sur nos actualites">
          <section className="items-center justify-center min-h-screen w-full md:m-5">

                 {/* Header */}
            {/* <div className="max-w-7xl mx-auto text-center mb-12 my-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Actualités
                </h1>
                <p className="text-xl text-gray-600">
                    Soyez toujours informer de nos actualites.
                </p>
            </div> */}

            {/* Courses Section */}
            <div className="max-w-7xl mx-auto mb-12 md:m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  w-full">
                {/* <h2 className="text-2xl font-semibold text-gray-900 mb-6 items-start ">
                Informations
                </h2> */}
                <Project projects={projects}/>
            </div>

            </section>

        </AppBody>
     );
}
 
export default ProjetScreen;