import React, { useEffect, useState } from 'react';
import { Download, BookOpen, CheckCircle, FileText, Video, File, Loader } from 'lucide-react'; // Ajout des icônes
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Button } from '../../components/Button';
import AppBody from '../../components/AppBody';
import { getResource } from '../../services/api';
import { useNavigate, useParams } from 'react-router';

const ProjetDetail = () => {
  const [projet, setProjet] = useState(null); // Initialisez avec `null`
  const [loading, setLoading] = useState(true); // État pour le chargement
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCourseData = async () => {
    try {
      const response = await getResource(`/projets/${id}`);
      setProjet(response.data);
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

  if (!projet) {
    return <p>Erreur lors de la récupération du projet. Veuillez réessayer plus tard.</p>;
  }

  return (
    <AppBody>
      <div className="bg-white shadow-md w-full">
        {/* Header avec titre et bouton */}
        <div className="p-6 bg-blue-600 flex flex-col md:flex-row justify-between items-center text-white">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">{projet.titre}</h1>
          <button
            className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center"
            onClick={() => window.open(projet.media, '_blank')}
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger le média
          </button>
        </div>

        {/* Contenu principal */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Description
            </h2>
            <p className="text-gray-700">{projet.description || 'Aucune description disponible.'}</p>
          </div>

          {/* Informations */}
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Informations du projet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Structure :</p>
                <p className="text-gray-700">{projet.structure || 'Non spécifiée'}</p>
              </div>
              <div>
                <p className="text-gray-500">Secteur :</p>
                <p className="text-gray-700">{projet.secteur || 'Non spécifié'}</p>
              </div>
              <div>
                <p className="text-gray-500">Activité en cours :</p>
                <p className="text-gray-700">{projet.activite_en_cours || 'Aucune activité'}</p>
              </div>
              <div>
                <p className="text-gray-500">Date de démarrage :</p>
                <p className="text-gray-700">
                  {projet.date_demarrage === '0000-00-00' ? 'Non définie' : projet.date_demarrage}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Coût :</p>
                <p className="text-gray-700">{projet.cout > 0 ? `${projet.cout} €` : 'Non spécifié'}</p>
              </div>
            </div>
          </div>

          {/* Média */}
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <Video className="w-5 h-5 mr-2 text-blue-600" />
              Média associé
            </h2>
            {projet.media ? (
              <img
                src={projet.media}
                alt="Média du projet"
                className="rounded-lg w-full h-48 object-cover"
              />
            ) : (
              <p className="text-gray-700">Aucun média disponible.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-100 rounded-b-lg">
          <h2 className="text-lg font-semibold flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Détails de l'inscription
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500">Statut :</p>
              <p className="text-gray-700">{projet.inscription?.statut || 'Non spécifié'}</p>
            </div>
            <div>
              <p className="text-gray-500">Année :</p>
              <p className="text-gray-700">{projet.inscription?.annee || 'Non spécifiée'}</p>
            </div>
            <div>
              <p className="text-gray-500">Commentaire :</p>
              <p className="text-gray-700">{projet.inscription?.commentaire || 'Aucun commentaire'}</p>
            </div>
          </div>
        </div>
      </div>
    </AppBody>
  );
};

export default ProjetDetail;
