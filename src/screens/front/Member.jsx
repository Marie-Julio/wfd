import React, { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import TeacherProfileCard from "../../components/TeacherCard";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";
import { getResource } from "../../services/api";

const teachers = [
  {
    name: "Jean Dupont",
    subject: "Mathématiques",
    photo: "../.../../public/assets/images/coach/about.jpg",
    description: "Expert en algèbre et géométrie avec 10 ans d'expérience.",
  },
  {
    name: "Marie Curie",
    subject: "Chimie",
    photo: "../.../../public/assets/images/coach/one-one.jpg",
    description: "Passionnée par les sciences et la pédagogie.",
  },
  {
    name: "Albert Einstein",
    subject: "Physique",
    photo: "../.../../public/assets/images/coach/executive.jpg",
    description: "Enseignant dévoué à rendre la physique amusante.",
  },
];

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
    <AppBody banner={true} titleBanner="Encadreurs">
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-10">
            Découvrez nos encadreurs qualifiés et dévoués à votre succès.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
