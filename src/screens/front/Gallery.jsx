import { useNavigate } from "react-router";
import AppBody from "../../components/AppBody";
import GallerieComponent from "../../components/GallerieComponent";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { getResource } from "../../services/api";

const Gallery = () => {
    const [projets, setProjets] = useState([]); // Initialisez avec `null`
    const [loading, setLoading] = useState(true); // État pour le chargement
    const navigate = useNavigate();
  
    const fetchCourseData = async () => {
      try {
        const response = await getResource(`/galleries`);
        console.log(response)
        setProjets(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du projet :', error);
      } finally {
        setLoading(false); // Terminer le chargement
      }
    };
  
    useEffect(() => {
      fetchCourseData();
    }, []);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader className="w-16 h-16 text-orange-500 animate-spin" /> {/* Spinner orange */}
        </div>
      );
    }
  
    // if (!projet) {
    //   return <p>Erreur lors de la récupération du projet. Veuillez réessayer plus tard.</p>;
    // }
  
    return ( 
    <AppBody>
      <div className="p-12 bg-[#1a5fa9] flex flex-col md:flex-row justify-between items-center text-white">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Galerie</h1>
      </div>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-10">
            Découvrez notre gallerie.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <GallerieComponent galleries={projets} />
          </div>
        </div>
      </div>
    </AppBody>
     );
}
 
export default Gallery;