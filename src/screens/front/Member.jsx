import React from "react";
import AppBody from "../../components/AppBody";
import TeacherProfileCard from "../../components/TeacherCard";

const teachers = [
  {
    name: "Jean Dupont",
    subject: "Mathématiques",
    photo: "https://via.placeholder.com/150",
    description: "Expert en algèbre et géométrie avec 10 ans d'expérience.",
  },
  {
    name: "Marie Curie",
    subject: "Chimie",
    photo: "https://via.placeholder.com/150",
    description: "Passionnée par les sciences et la pédagogie.",
  },
  {
    name: "Albert Einstein",
    subject: "Physique",
    photo: "https://via.placeholder.com/150",
    description: "Enseignant dévoué à rendre la physique amusante.",
  },
];

const TeacherProfiles = () => {
  return (
    <AppBody>
        <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Nos Enseignants
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Découvrez nos enseignants qualifiés et dévoués à votre succès.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <TeacherProfileCard key={index} teacher={teacher} />
          ))}
        </div>
      </div>
    </div>
    </AppBody>
  );
};

export default TeacherProfiles;
