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
        <AppBody banner={true} titleBanner="Les projets">
            <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <p className="text-center text-gray-600 mb-10">
                Ces projets, conçus avec passion et précision, représentent notre réponse à des besoins réels, en combinant savoir-faire, créativité et collaboration
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                <Project projects={projects}/>
                </div>
            </div>
            </div>
        </AppBody>
     );
}
 
export default ProjetScreen;