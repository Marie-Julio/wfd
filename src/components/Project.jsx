import { ChevronRight } from "lucide-react";

const Project = ({projects = []}) => {
    return ( 
        <>
        {projects.map((project) => (
        <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'En cours' ? 'bg-green-100 text-green-800' :
                      project.status === 'Planifié' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                  <button className="mt-4 flex items-center rounded-lg bg-custom-gradient text-white px-4 py-3 hover:text-orange-500 transition-colors duration-300">
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