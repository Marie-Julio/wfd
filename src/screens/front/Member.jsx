import React from "react";
import AppBody from "../../components/AppBody";
import TeacherProfileCard from "../../components/TeacherCard";

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
  return (
    <AppBody banner={true} titleBanner="Encadreurs">
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-10">
            Découvrez nos encadreurs qualifiés et dévoués à votre succès.
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
