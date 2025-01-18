import React from "react";

const TeacherProfileCard = ({ teacher }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
      {/* Photo de l'enseignant */}
      <img
        src={teacher.photo}
        alt={`${teacher.name}'s profile`}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"
      />
      {/* Nom de l'enseignant */}
      <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
      {/* Matière enseignée */}
      <p className="text-sm text-blue-600 font-medium">{teacher.subject}</p>
      {/* Brève description */}
      <p className="text-gray-600 text-center mt-3 text-sm">{teacher.description}</p>
      {/* Boutons d'action */}
      <div className="mt-4 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Contacter
        </button>
        <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition duration-200">
          Voir profil
        </button>
      </div>
    </div>
  );
};

export default TeacherProfileCard;
