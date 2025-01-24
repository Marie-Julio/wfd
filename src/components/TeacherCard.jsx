import React from "react";
import imgprofil2 from "../assets/images/profil.png";

const TeacherProfileCard = ({ teacher }) => {
  return (
    
    <div class=" bg-white group relative overflow-hidden rounded-md shadow dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out">
    <div class="py-10 bg-gradient-to-r to-orange-600/70 from-indigo-600/70"></div>
    <div class="p-6 pt-0 -mt-10 text-center">
        <img src={teacher.file_path || imgprofil2}
        alt={`${teacher.name}'s profile`} class="size-30 p-1 rounded-full bg-white dark:bg-slate-900 shadow-lg dark:shadow-gray-800 mx-auto" />

        <div class="mt-4">
            <h5 class="text-xl font-semibold mb-3">{teacher.prenom} {teacher.nom}</h5>
            <p className="text-[#eb6b11] text-center text-sm">{teacher.email}</p><p className="text-gray-600 text-center mt-3 text-sm">{teacher.description}</p>
        </div>
    </div>
</div>
  );
};

export default TeacherProfileCard;
