import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, MapPin, Building, Calendar, Edit2, Save, User } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import { getResource, patchResource } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { errorMessage, onServerSuccess } from "../../services/Helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/admin/common/Input";
import AppBody from "../../components/AppBody";

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [info, setInfo] = useState({});
  const [editIndex, setEditIndex] = useState(null); // Index de l'élément édité
  const [loading, setLoading] = useState(true);
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
  const handleEdit = (index) => {
    setEditIndex(index); // Activer le mode édition
  };

  const handleSave = async () => {
    try {
      setLoading(true);
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

  const formik = useFormik({
    initialValues: {
      email: "",
      nom: "",
      prenom: "",
      telephone: "",
      nationalite: "",
      date_naissance: "",
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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <AppBody>
      <section className="items-center justify-center min-h-screen w-full md:m-5">
      <div className="max-w-4xl mx-auto">
        {/* Card Profil */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: User, label: "Nom", value: info.nom, key: "nom" },
                { icon: User, label: "Prenom", value: info.prenom, key: "prenom" },
                { icon: Mail, label: "Email", value: info.email, key: "email" },
                { icon: Phone, label: "Téléphone", value: info.telephone, key: "telephone" },
                { icon: Building, label: "Nationalité", value: info.nationalite, key: "nationalite" },
                { icon: Calendar, label: "Date de Naissance", value: info.date_naissance, key: "date_naissance" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {editIndex === index ? (
                      <Input
                        name={item.key}
                        type={formik.values[item.key] == "date_naissance" ? "date":  "text"}
                        value={formik.values[item.key]}
                        onChange={formik.handleChange}
                        error={formik.errors[item.key]}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{item.value}</p>
                    )}
                  </div>
                  {editIndex === index ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </AppBody>
  );
};

export default Profile;
