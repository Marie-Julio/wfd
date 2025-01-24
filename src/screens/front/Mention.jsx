import React from "react";
import AppBody from "../../components/AppBody";

const LegalNotice = () => {
  return (
   <AppBody>
         <div className=" bg-gray-50 px-6 py-8 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Mentions légales</h1>
        <p className="text-gray-700 mb-4">
          Conformément à la loi en vigueur, voici les mentions légales relatives
          à notre site.
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Éditeur du site
        </h2>
        <p className="text-gray-700 mb-4">
          Nom de l'entreprise : WFD Guinée <br />
          Adresse : Guinée - Tohin, rue 234 <br />
          Contact : +229 55002123 <br />
          Email : notrelogo@gmail.com
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Hébergement
        </h2>
        <p className="text-gray-700 mb-4">
          Le site est hébergé par [Nom de l'hébergeur], dont le siège social est
          situé à [adresse complète].
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Propriété intellectuelle
        </h2>
        <p className="text-gray-700 mb-4">
          Tous les contenus présents sur ce site (textes, images, logos, etc.)
          sont protégés par les droits d'auteur. Toute reproduction ou
          utilisation sans autorisation est strictement interdite.
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Responsabilité
        </h2>
        <p className="text-gray-700 mb-4">
          L'éditeur ne saurait être tenu responsable des dommages liés à
          l'utilisation du site ou des contenus accessibles depuis celui-ci.
        </p>
      </div>
    </div>
   </AppBody>
  );
};

export default LegalNotice;
