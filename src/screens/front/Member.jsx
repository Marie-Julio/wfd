import React, { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import TeacherProfileCard from "../../components/TeacherCard";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";
import { getResource } from "../../services/api";

const TeacherProfiles = () => {
  const [projets, setProjets] = useState([]); // Initialisez avec `null`
    const [loading, setLoading] = useState(true); // État pour le chargement
    const navigate = useNavigate();
  
    const fetchCourseData = async () => {
      try {
        const response = await getResource(`/afficher_liste_utilisateur?role=formateur`);
        setProjets(response.data.utilisateurs);
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
  return (
  <AppBody>
    <div className="p-12 bg-[#1a5fa9] flex flex-col md:flex-row justify-between items-center text-white">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">Encadreurs</h1>
    </div>
      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-10">
            Découvrez nos encadreurs qualifiés et dévoués à votre succès.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projets.map((teacher, index) => (
              <TeacherProfileCard key={index} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>
    </AppBody>
  );
};

export default TeacherProfiles;
