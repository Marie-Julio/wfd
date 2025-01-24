import React, { useState } from "react";
import AppBody from "../components/AppBody";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de la soumission
    setSuccess(true);
  };

  return (
    <AppBody>
        <div class="h-screen md:flex">
      <div class="relative overflow-hidden md:flex w-2/5 justify-around items-center hidden bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
            <div className="pl-10">
          <h1 class="text-white font-bold text-4xl font-sans">WELT FRIEDENS DIENST e.V</h1>
          <p class="text-white mt-1">Service mondiale pour la paix</p>
        </div>
      </div>
      <div class="flex md:w-3/5 justify-center py-10 items-center bg-white">
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          Réinitialisation de mot de passe
        </h1>
        <p className="mt-2 text-gray-600 text-center">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
        {success ? (
          <div className="mt-6 text-center">
            <p className="text-green-600">
              Un email a été envoyé à <strong>{email}</strong> avec des
              instructions pour réinitialiser votre mot de passe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#1a5fa9] focus:border-[#1a5fa9] sm:text-sm"
                placeholder="example@domain.com"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1a5fa9] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#1a5fa9] focus:ring-offset-2"
              >
                Envoyer le lien de réinitialisation
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-[#1a5fa9] hover:text-[#1a5fa9]"
          >
            Retour à la connexion
          </a>
        </div>
        </div>
        </div>
    </AppBody>
  );
};

export default ResetPassword;
