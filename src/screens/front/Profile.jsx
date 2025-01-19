import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, MapPin, Building, Calendar, Edit2, Save, User, Download, ChevronDown, ChevronUp } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import { getResource, patchResource, postResource } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { errorMessage, onServerSuccess } from "../../services/Helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/admin/common/Input";
import AppBody from "../../components/AppBody";

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [info, setInfo] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState([]);
  const [testSummary, setTestSummary] = useState({});
  const [isTestCollapseOpen, setIsTestCollapseOpen] = useState(false);
  const [isFormCollapseOpen, setIsFormCollapseOpen] = useState(true);
  const [isFormCollapseOpenPassword, setIsFormCollapseOpenPassword] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = localStorage.getItem("token");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;

  if (!accessToken) {
    navigate("/login");
  }

  // Fonction d'initialisation
  const fetchData = async () => {
    try {
      const response = await getResource(`/me?id=${decodedToken.id}`);
      const userData = response.data;
      setInfo(userData);
      formik.setValues({
        email: userData.email,
        nom: userData.nom,
        prenom: userData.prenom,
        telephone: userData.telephone,
        nationalite: userData.nationalite,
        date_naissance: userData.date_naissance,
      });
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de l'édition
  const handleSave = async () => {
    try {
      setLoading(true);
      console.log(formik.values)
      await patchResource(`/modifier_utilisateur`, decodedToken.id, formik.values);
      onServerSuccess("Mise à jour réussie !");
      setEditIndex(null); // Désactiver le mode édition
      fetchData(); // Actualiser les données
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

   // Gestion de reset
   const handleReset = async (data) => {
    try {
      setLoading(true);
      console.log(formik.values)
      const newData = {...data, email : formik.values.email, id: decodedToken.id}
      await postResource(`/reset`, decodedToken.id, newData),
      onServerSuccess("Mise à jour réussie !");
      setEditIndex(null); // Désactiver le mode édition
      fetchData(); // Actualiser les données
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      nom: "",
      prenom: "",
      telephone: "",
      nationalite: "",
      date_naissance: "",
      password: "",
      password_confirmation: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Champ requis"),
      nom: Yup.string().required("Champ requis"),
      prenom: Yup.string().required("Champ requis"),
      telephone: Yup.string().required("Champ requis"),
      nationalite: Yup.string().required("Champ requis"),
      date_naissance: Yup.string().required("Champ requis"),
    }),
    onSubmit: () => handleSave(),
  });

  const formikPassowrd = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: ""
    },
    validationSchema: Yup.object({
    }),
    onSubmit: async (values) => handleReset(values),
  });

  const fetchTestResults = async () => {
    try {
      const resultsResponse = await getResource(`/qcm-results?user_id=${decodedToken.id}`);
      const summaryResponse = await getResource(`/qcm-results-score?user_id=${decodedToken.id}`);
      setTestResults(resultsResponse.data);
      setTestSummary(summaryResponse.data[0]);
    } catch (error) {
      errorMessage(error);
    }
  };

  const downloadFiche2 = () => {
    // setValueFiche(fiche)
    // Logique pour télécharger la Fiche 2
    // console.log('Télécharger Fiche 2 pour', fiche);
    const url = `/attestation?id=${3}`;
    getResource(url,  {
        responseType: 'blob',}).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Attestation_${info.nom}.pdf`); // Nom du fichier à télécharger
        document.body.appendChild(link);
        link.click();

        // Optionnel : Supprimer le lien après le téléchargement
        link.parentNode.removeChild(link);

        // Nettoyer après le téléchargement
        setTimeout(() => {
            window.URL.revokeObjectURL(tempUrl); // Libérer l'URL blob
            link.parentNode.removeChild(link); // Supprimer le lien du DOM
        }, 100); 
    }).catch((e) => errorMessage(e))
  };

  useEffect(() => {
    fetchData();
    fetchTestResults();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <AppBody>
      <section className="items-center justify-center min-h-screen w-full md:m-5">
        <div className="max-w-4xl mx-auto">
          {/* Card Profil */}
          <div className="bg-white shadow-xl overflow-hidden">
            {/* Section Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    src={info.file_path}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  {isHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">Modifier Photo</span>
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left text-white">
                  <h1 className="text-3xl font-bold">
                    {info.nom} {info.prenom}
                  </h1>
                  <p className="text-xl opacity-90">{info.role}</p>
                  <button
                    onClick={downloadFiche2}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger Attestation
                  </button>
                </div>
              </div>
            </div>

            {/* Form Collapse */}
            <div className="p-6 sm:p-8">
              <div
                onClick={() => setIsFormCollapseOpen(!isFormCollapseOpen)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Modifier les Informations</h2>
                {isFormCollapseOpen ? <ChevronUp /> : <ChevronDown />}
              </div>
              {isFormCollapseOpen && (
                <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
                  {[
                    { label: "Nom", name: "nom", type: "text" },
                    { label: "Prenom", name: "prenom", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Téléphone", name: "telephone", type: "text" },
                    { label: "Nationalité", name: "nationalite", type: "text" },
                    { label: "Date de Naissance", name: "date_naissance", type: "date" },
                  ].map(({ label, name, type }) => (
                    <Input
                      key={name}
                      label={label}
                      name={name}
                      type={type}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      error={formik.errors[name]}
                    />
                  ))}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
                  >
                    Sauvegarder
                  </button>
                </form>
              )}
            </div>

            {/* Test Results Collapse */}
            <div className="mt-6">
              <div
                onClick={() => setIsTestCollapseOpen(!isTestCollapseOpen)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Résultats des Tests</h2>
                {isTestCollapseOpen ? <ChevronUp /> : <ChevronDown />}
              </div>
              {isTestCollapseOpen && (
                <div className="mt-4 bg-white shadow rounded-lg p-6">
                  <p className="mb-4">
                    <strong>Nombre de tests :</strong> {testSummary.Nombre} <br />
                    <strong>Score total :</strong> {testSummary.Total}
                  </p>
                  <div className="space-y-4">
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100"
                      >
                        <h3 className="text-lg font-medium text-blue-600">{result.qcm.title}</h3>
                        <p className="text-sm text-gray-500">{result.qcm.description}</p>
                        <p className="mt-2">
                          <strong>Score :</strong> {result.score} <br />
                          <strong>Status :</strong> {result.status} <br />
                          <strong>Date :</strong>{" "}
                          {new Date(result.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
             {/* Form Collapse */}
             <div className="p-6 sm:p-8">
              <div
                onClick={() => setIsFormCollapseOpenPassword(!isFormCollapseOpenPassword)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Réinitialisation de mot de passe</h2>
                {isFormCollapseOpenPassword ? <ChevronUp /> : <ChevronDown />}
              </div>
              {isFormCollapseOpenPassword && (
                <form className="mt-4 space-y-4" onSubmit={formikPassowrd.handleSubmit}>
                 
                     <Input
                      label="Nouvel mot de passe"
                      name="password"
                      type="password"
                      placeholder="***********"
                      value={formikPassowrd.values.password }
                      onChange={formikPassowrd.handleChange}
                      error={formikPassowrd.errors.password}
                    />
                     <Input
                      label="Nouvel mot de passe"
                      name="password_confirmation"
                      type="password" 
                      placeholder="***********"
                      value={formikPassowrd.values.password_confirmation }
                      onChange={formikPassowrd.handleChange}
                      error={formikPassowrd.errors.password_confirmation }
                    />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
                  >
                    Sauvegarder
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </AppBody>
  );
};

export default Profile;
