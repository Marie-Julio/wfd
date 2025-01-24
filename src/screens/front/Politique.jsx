import React from "react";
import AppBody from "../../components/AppBody";

const PrivacyPolicy = () => {
  return (
    <AppBody>
        <div className=" bg-gray-50 px-6 py-8 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Politique de confidentialité
        </h1>
        <p className="text-gray-700 mb-4">
          Nous attachons une grande importance à la confidentialité de vos
          données. Cette politique décrit la manière dont nous collectons,
          utilisons et protégeons vos informations personnelles.
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Collecte des informations
        </h2>
        <p className="text-gray-700 mb-4">
          Nous pouvons collecter vos données personnelles lorsque vous utilisez
          notre site, vous inscrivez ou interagissez avec nos services. Ces
          données incluent votre nom, votre adresse e-mail, et toute autre
          information fournie.
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Utilisation des données
        </h2>
        <p className="text-gray-700 mb-4">
          Vos données sont utilisées pour améliorer votre expérience utilisateur,
          fournir nos services et répondre à vos besoins spécifiques.
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Protection des données
        </h2>
        <p className="text-gray-700 mb-4">
          Nous prenons toutes les mesures nécessaires pour garantir la sécurité
          de vos données et éviter tout accès non autorisé.
        </p>

        <h2 className="text-xl font-semibold text-[#1a5fa9] mt-6 mb-2">
          Vos droits
        </h2>
        <p className="text-gray-700 mb-4">
          Vous avez le droit d'accéder, de corriger ou de supprimer vos données
          personnelles en nous contactant directement.
        </p>
      </div>
    </div>
    </AppBody>
  );
};

export default PrivacyPolicy;
