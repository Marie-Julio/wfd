import { ChevronRight } from "lucide-react";
import img from "../assets/slide-2.jpg"
import { useNavigate } from "react-router";


const Project = ({projects = []}) => {
  const apiUrl = import.meta.env.VITE_API_URI_BASE
  const navigate = useNavigate();
  const redirectPage = (item) => {
    navigate(`/projet/${item}`)
  }
    return ( 
        <>
        {projects.map((project) => (
        <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden animate-flip-up animate-delay-500 animate-ease-in-out transform transition-all duration-800 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/100"
              >
                <img
                  // src={`${apiUrl}/storage/${project.media}`}
                  src={img}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.titre}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'En cours' ? 'bg-green-100 text-green-800' :
                      project.status === 'Planifié' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.inscription.statut}
                    </span>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                  <button onClick={() => redirectPage(project.id)} className="mt-4 flex items-center rounded-lg bg-custom-gradient text-white px-4 py-3 hover:text-black transition-all duration-300
          bg-blue-600 hover:bg-blue-700
          transform hover:scale-105
          group">
                    En savoir plus
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
               ))}
        </>
     );
}
 
export default Project;