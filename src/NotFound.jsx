import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-8">
          Oops! Page non trouvée.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary rounded-full shadow-lg"
        >
          Retour à la page de connexion
        </Link>
      </div>
    </div>
  );
}