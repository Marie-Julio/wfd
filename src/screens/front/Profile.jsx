import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, MapPin, Building, Calendar, Edit2, Save, User, Download, ChevronDown, ChevronUp, Loader } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import { getResource, patchResource, postFile, patchFile, postResource } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { errorMessage, onServerError, onServerSuccess } from "../../services/Helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "../../components/admin/common/Select";
import { Input } from "../../components/admin/common/Input";
import AppBody from "../../components/AppBody";
import InputCompletNew from "../../components/admin/common/InputCompletNew";
import Button from "../../components/admin/common/Button";
import useAuth from "../../hooks/useAuth";
import imgprofil from "../../assets/images/profil.png";
import bgmotpasse from "../../assets/motpasse.png";
import bgforum from "../../assets/forum.png";
import GalleryTable from "../../components/GalerieTable";

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [info, setInfo] = useState({});
  const [galeries, setGaleries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState([]);
  const [testSummary, setTestSummary] = useState({});
  const [isTestCollapseOpen, setIsTestCollapseOpen] = useState(false);
  const [isFormCollapseOpen, setIsFormCollapseOpen] = useState(true);
  const [galerieCollapse, setGalerieCollapse] = useState(false);
  const [forumCollapse, setForumCollapse] = useState(false);
  const [listgalerieCollapse, setListGalerieCollapse] = useState(false);
  const [isFormCollapseOpenPassword, setIsFormCollapseOpenPassword] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();
  const apiUrl = import.meta.env.VITE_API_URI_BASE


  const accessToken = localStorage.getItem("token");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const [newForum, setNewForum] = useState({ title: '', description: '', user_id: decodedToken.id});

  const [defaultPromotion , setDefaultPromotion] = useState({})
  const [promotions, setPromotions] = useState([])

  useEffect(() => {
        getResource(`/promotions`).then((res) => {
            setPromotions(res.data)
        }).catch((e) => errorMessage(e))
      }, [])

  // Créer un forum
  const createForum = async () => {
    try {
      await postResource('/forums', newForum);
      setNewForum({ title: '', description: '' });
      onServerSuccess("Forum créer !");
    } catch (error) {
      onServerError("Erreur. Contactez-nous !2");
    }
  };

  if (!accessToken) {
    navigate("/login");
  }

  
 const handleLogout = () => {
    localStorage.removeItem("token");
    auth.logout();
    navigate("/login");
  };

  const handleImageChange = async(event) => {
    const file = event.target.files[0];
    
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      try {
        const formData = new FormData(); // Utiliser FormData pour inclure les fichiers
        formData.append("file_path", file);// Utiliser FormData pour inclure les fichiers
        formData.append('_method', 'PATCH'); // Simule une requête PATCH avec multipart/form-data
        // setLoading(true);
        console.log(file);
        const res = await postFile(`/profil-user/${decodedToken.id}`, formData);
        console.log(res)
        onServerSuccess("Image sauvegarder !");
      } catch (error) {
        errorMessage(error);
        // onServerError(error.message);
      } finally {
        // setLoading(false);
      }
    }
  };

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
      await patchResource(`/modifier_utilisateur`, decodedToken.id, formik.values);
      onServerSuccess("Mise à jour réussie !");
      setEditIndex(null);
      fetchData();
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de galerie
  const handleGalerie = async (values) => {
    try {
      setLoading(true);
      
      const newData = {...values, user_id: decodedToken.id}
      await postFile(`/galleries`, newData);
      onServerSuccess("Image sauvegarder !");
      formikGalerie.resetForm();
      _init_()
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
      const newData = {...data, email : formik.values.email, id: decodedToken.id}
      await postResource(`/reset`, newData),
      onServerSuccess("Mise à jour réussie !");
      setEditIndex(null); // Désactiver le mode édition
      handleLogout()
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


  const formikGalerie = useFormik({
    initialValues: {
      title: "",
      description: "",
      promotion_id: null,
      image: "",
    },
    validationSchema: Yup.object({
    }),
    onSubmit: async (values) => handleGalerie(values),
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

  const _init_ = () => {
    getResource(`/galleries?user_id=${decodedToken.id}`).then((res) => {
        console.log(res.data)
        setGaleries(res.data)
    })
    fetchData();
    fetchTestResults();
  }

  useEffect(() => {
    _init_()
  }, [])


  if (loading) {
    return  <div className="flex items-center justify-center h-screen">
    <Loader className="w-16 h-16 text-orange-500 animate-spin" /> {/* Spinner orange */}
  </div>;
  }

  return (
    <AppBody>
      <section className="items-center justify-center min-h-screen w-full md:m-5">
        <div className="max-w-4xl mx-auto">
          {/* Card Profil */}
          <div className="bg-white shadow-xl overflow-hidden">
            {/* Section Header */}
            <div className="relative bg-gradient-to-r from-[#1a5fa9] to-purple-600 p-8">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                 <img
                    src={selectedImage || `${apiUrl}/storage/${info.file_path}` || imgprofil}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                   {isHovered && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                          <label
                            htmlFor="profile-upload"
                            className="text-white text-sm cursor-pointer"
                          >
                            Modifier Photo
                          </label>
                          <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                      )}
                </div>
                <div className="text-center md:text-left text-white">
                  <p className="text-sm font-semibold text-orange-400 uppercase">{info.matricule}</p>
                  <h1 className="text-3xl font-bold">
                    {info.nom} {info.prenom}
                  </h1>
                  <p className="text-sm opacity-90 uppercase">{info.role}</p>
                  
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
                    className="px-4 py-2 bg-[#1a5fa9] hover:bg-blue-800 text-white rounded-lg"
                  >
                    Sauvegarder
                  </button>
                </form>
              )}
            </div>


            {/* Form Collapse Liste gallerie */}
            <div className="p-6 sm:p-8">
              <div
                onClick={() => setListGalerieCollapse(!listgalerieCollapse)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Ma Galerie</h2>
                {listgalerieCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {listgalerieCollapse && (
                <GalleryTable galleries={galeries} reloadFunction={_init_}/>
              )}
            </div>

             {/* Form Collapse Insertion gallerie */}
             <div className="p-6 sm:p-8">
              <div
                onClick={() => setGalerieCollapse(!galerieCollapse)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Ajouter une image à la galerie</h2>
                {galerieCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {galerieCollapse && (
                <form className="mt-4 space-y-4" onSubmit={formikGalerie.handleSubmit}>
                 
                     <Input
                      label="Titre"
                      name="title"
                      type="text"
                      placeholder="Galerie d'exemple"
                      value={formikGalerie.values.title }
                      onChange={formikGalerie.handleChange}
                      error={formikGalerie.errors.title}
                    />
                     <Input
                      label="Description"
                      name="description"
                      type="text" 
                      placeholder="Description"
                      value={formikGalerie.values.description }
                      onChange={formikGalerie.handleChange}
                      error={formikGalerie.errors.description }
                    />
                    <div className="w-full mb-2 flex flex-col">
                      <label className="mb-2 text-gray-600">Image</label>
                      <input id="file-upload" name="image" type="file" 
                        onChange={(event) => {
                          formikGalerie.setFieldValue("image", event.target.files[0]);
                        }}/>
                    </div>
                    <Select name="promotion_id" label="Promotion" value={formikGalerie.values.promotion_id} 
                    onChange={formikGalerie.handleChange} disabled={false} className="w-1/2">
                      <option>Choisir la promotion</option>
                      {promotions.map((x) => (
                        <option value={x.id} key={x.id}>
                          {x.nom}
                        </option>
                      ))}
                    </Select>
                  <Button
                    type="submit"
                    className="px-4 py-2 bg-[#1a5fa9] hover:bg-blue-800 text-white rounded-lg"
                  >
                    Sauvegarder
                  </Button>
                </form>
              )}
            </div>

            {/* Form Collapse Insertion gallerie */}
            {info.role !== "participant" ? 
             <div className="p-6 sm:p-8">
              <div
                onClick={() => setForumCollapse(!forumCollapse)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Ajouter un forum</h2>
                {forumCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {forumCollapse && (
              <div className="flex">
                <div className="w-3/5 md:pr-10">
                  <div className="flex-1 pt-10">
                    <input
                      type="text"
                      placeholder="Titre du forum"
                      value={newForum.title}
                      onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
                      className="w-full mb-2 p-2 border rounded bg--100"
                    />
                    <textarea
                      placeholder="Description du forum"
                      value={newForum.description}
                      onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
                      className="w-full mb-4 p-2 border rounded bg--100"
                    />
                    <Button onClick={createForum}>Créer</Button>
                  </div>
                </div>
                <div className="relative w-2/5 items-center bg-no-repeat bg-contain bg-center mt-10 " style={{ backgroundImage: `url(${bgforum})` }}>
                </div>
              </div>
              )}
            </div> : null }
            {/* Form Collapse */}
            <div className="p-6 sm:p-8">
                  <div
                    onClick={() => setIsFormCollapseOpenPassword(!isFormCollapseOpenPassword)}
                    className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
                  >
                    <h2 className="text-lg font-bold">Réinitialisation de mot de passe</h2>
                    {isFormCollapseOpenPassword ? <ChevronUp /> : <ChevronDown />}
                  </div>
              <div className="flex">
                <div className="relative w-2/5 items-center bg-no-repeat bg-contain bg-center mt-10 " style={{ backgroundImage: `url(${bgmotpasse})` }}>
                </div>
                <div className="w-3/5">
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
                      <Button
                        type="submit"
                        className=""
                      >
                        Sauvegarder
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppBody>
  );
};

export default Profile;
