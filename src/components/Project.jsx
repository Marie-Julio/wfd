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
          
          <div key={project.id} class="picture-item p-4 rounded-md">
              <button className="bg-transparent text-left p-0" onClick={() => redirectPage(project.id)}>
              <div class="relative">
                  <div class="shadow dark:shadow-gray-800 p-5 pb-0 rounded-md bg-[#d5ddf2] dark:bg-[#1a5fa9]/30">
                      <img src={img}
                  alt={project.title} class="rounded-t-md shadow" />
                  </div>
              </div>

              <div class="pt-4 px-3">
                  <h5 class="mb-1 font-semibold text-xl"><a href="https://1.envato.market/techwind" target="_blank" class="hover:text-[#1a5fa9] duration-500">{project.titre}</a></h5>
                  <span class="text-slate-400">Creative</span>
              </div> 
              </button>                           
          </div>
               ))}
        </>
     );
}
 
export default Project;