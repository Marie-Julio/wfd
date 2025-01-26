import { ChevronRight } from "lucide-react";
import img from "../assets/slide-2.jpg"
import { useNavigate } from "react-router";
import { dateToFr } from "../services/Helper";


const Project = ({projects = []}) => {
  const apiUrl = import.meta.env.VITE_API_URI_BASE
  const navigate = useNavigate();
  const redirectPage = (item) => {
    navigate(`/projet/${item}`)
  }
    return ( 
        <>
        {projects.map((project) => (
          
          <div key={project.id} class="picture-item p-4 rounded-md">
              <button className="bg-transparent text-left p-0" onClick={() => redirectPage(project.id)}>
              <div class="relative">
                  <div class="transform transition-all duration-500 hover:scale-105 shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-[#d5ddf2] dark:bg-[#1a5fa9]/30 hover:bg-orange-300">
                      <img src={img} alt={project.title} class="rounded-t-md shadow" />
                  </div>
              </div>

              <div class="pt-4">
                  <h5 class="mb-1 font-semibold text-gray-600 hover:text-[#1a5fa9] duration-500">{project.titre}</h5>
                  
                  <div class="flex items-center">
                      <img src="assets/images/client/03.jpg" class="size-11 rounded-full shadow transform transition-all duration-500 hover:scale-105" alt="" />

                      <div class="ms-3 flex-1">
                          <a href="#" class="text-sm font-semibold hover:text-indigo-600 duration-500">{project.user && `${project.user.nom} ${project.user.prenom}`}</a>
                          <p class="text-sm text-slate-400">{dateToFr(project.created_at)}</p>
                      </div>
                  </div>
                </div> 
              </button>                           
          </div>
               ))}
        </>
     );
}
 
export default Project;