import { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";
import Project from "../../components/Project";
import { Loader } from "lucide-react";

const ProjetScreen = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // État pour le chargement
      
          const _init_ = () => {
            getResource("/projets").then((res) => {
                console.log(res.data)
                setProjects(res.data)
            }).catch(e => {
                errorMessage(e)
              }).finally(() => setLoading(false))
    
        }
    
        useEffect(() => {
            _init_()
        }, [])

        if (loading) {
            return (
              <div className="flex items-center justify-center h-screen">
                <Loader className="w-16 h-16 text-orange-500 animate-spin" /> {/* Spinner orange */}
              </div>
            );
          }


    return ( 
    <AppBody>
      <div className="p-12 bg-[#1a5fa9] flex flex-col md:flex-row justify-between items-center text-white">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Les projets</h1>
      </div>
            <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <p className="text-center text-gray-600 mb-10">
                Ces projets, conçus avec passion et précision, représentent notre réponse à des besoins réels, en combinant savoir-faire, créativité et collaboration
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Project projects={projects}/>
                </div>
            </div>
            </div>
        </AppBody>
     );
}
 
export default ProjetScreen;