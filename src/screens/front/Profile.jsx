import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, MapPin, Building, Calendar, Edit2, Save, User, Download, ChevronDown, ChevronUp, Loader } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import { getResource, patchResource, postFile, patchFile, postResource } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { errorMessage, onServerError, onServerSuccess, onServerWarning } from "../../services/Helper";
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
import bgcours from "../../assets/cours.png";
import bggalerie from "../../assets/galerie.png";
import GalleryTable from "../../components/GalerieTable";
import CoursTable from "../../components/CoursTable";
import ForumTable from "../../components/ForumTable";
import TextArea from "../../components/admin/common/TextArea";

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [info, setInfo] = useState({});
  const [galeries, setGaleries] = useState([]);
  const [cours, setCours] = useState([]);
  const [forums, setForums] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState([]);
  const [testSummary, setTestSummary] = useState({});
  const [isTestCollapseOpen, setIsTestCollapseOpen] = useState(false);
  const [isFormCollapseOpen, setIsFormCollapseOpen] = useState(false);
  const [galerieCollapse, setGalerieCollapse] = useState(false);
  const [coursCollapse, setCoursCollapse] = useState(false);
  const [forumCollapse, setForumCollapse] = useState(false);
  const [listgalerieCollapse, setListGalerieCollapse] = useState(false);
  const [listforumCollapse, setListForumCollapse] = useState(false);
  const [listcoursCollapse, setListCoursCollapse] = useState(false);
  const [isFormCollapseOpenPassword, setIsFormCollapseOpenPassword] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();
  const apiUrl = import.meta.env.VITE_API_URI_BASE;

  const accessToken = localStorage.getItem("token");
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const [newForum, setNewForum] = useState({ title: null, description: null, user_id: decodedToken.id});

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
      setNewForum({ title: "", description: ""});
      onServerSuccess("Forum créer !");
      getResource(`/forums?user_id=${decodedToken.id}`).then((res) => {
          setForums(res.data)
      })
    } catch (error) {
      onServerWarning("Veuillez remplir tous les champs");
    }
  };

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
        const res = await postFile(`/profil-user/${decodedToken.id}`, formData);
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
      await patchResource(`/modifier_utilisateur`, decodedToken.id, formik.values);
      onServerSuccess("Mise à jour réussie !");
      setEditIndex(null);
      fetchData();
    } catch (error) {
      errorMessage(error);
    }
  };

  // Gestion de galerie
  const handleGalerie = async (values) => {
    try {
      const newData = {...values, user_id: decodedToken.id}
      await postFile(`/galleries`, newData);
      onServerSuccess("Image sauvegarder !");
      formikGalerie.resetForm();
      getResource(`/galleries?user_id=${decodedToken.id}`).then((res) => {
          setGaleries(res.data)
      })
    } catch (error) {
      onServerError("Veuillez remplir tous les champs");
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

  const _init_ = () => {
    getResource(`/course-modules?user_id=${decodedToken.id}`).then((res) => {
        setCours(res.data)
    })
    getResource(`/galleries?user_id=${decodedToken.id}`).then((res) => {
        setGaleries(res.data)
    })
    getResource(`/forums?user_id=${decodedToken.id}`).then((res) => {
        setForums(res.data)
    })
    fetchData();
    fetchTestResults();
  }

  useEffect(() => {
    _init_()
  }, [])


  
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [promos, setPromos]  = useState([])
  const [qcms, setQcms]  = useState([])
  const [loadingc, setLoadingc] = useState(false)
  const [datas, setDatas] = useState({
      content: ""
  })
  const statuts = [{id: 1, libelle: "video"}, {id: 2, libelle: "pdf"}, {id: 3, libelle: "video & pdf"}];
  const _init2_ = () => {
          getResource('/promotions').then((res) => {
              setPromos(res.data)
          })

          getResource('/qcms').then((res) => {
              setQcms(res.data)
          })
        }
  
        useEffect(() => {
          _init2_()
        }, [])

  const saveData = (data) => {
      setLoadingc(true) 
      postFile("/course-modules", data).then((res) => {
          _init_();
          onServerSuccess("Création effectuée avec succès.");
          formikc.resetForm();
          formikc.setValues({
              title : '',
              type : '',
              min_score : 0,
              duree : 0,
              promotion_id : 0,
              required_qcm_id : 0,
              media : [],
          });
          setDatas({content: ""})
      }).catch((e) => errorMessage(e)).finally(() => setLoadingc(false) )
  }
  const formikc = useFormik({
      initialValues: {
        title: "",
        type: "",
        duree: 0,
        min_score: 0,
        promotion_id: 0,
        media: [], // Initialisé comme un tableau vide
      },
      validationSchema: Yup.object({
        title: Yup.string().required("Champ requis"),
      }),
      onSubmit: async (values) => {
        setLoadingc(true);
        if (!values.type) {
          return onServerWarning('Le champ type est obligatoire');
        }
        if (!values.promotion_id) {
          return onServerWarning('Le champ promotion est obligatoire');
        }
        if (!values.media) {
          return onServerWarning('Le fichier champ est obligatoire');
        }
        if (!datas.content) {
          return onServerWarning('Le fichier description est obligatoire');
        }
    
        const formData = new FormData(); // Utiliser FormData pour inclure les fichiers
        formData.append("title", values.title);
        formData.append("type", values.type);
        formData.append("min_score", values.min_score);
        formData.append("duree", values.duree);
        formData.append("user_id",  decodedToken.id);
        formData.append("description", datas.content);
        formData.append("promotion_id", values.promotion_id);
        
        values.media.forEach((file) => {
            formData.append("file_path[]", file);
        });
    
        try {
          if (id) {
              updateData(formData);
          } else {
              saveData(formData);
          }
          setLoadingc(false);
        } catch (error) {
          console.error(error);
          setLoadingc(false);
        }
      },
    });


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
                    src={selectedImage || info.file_path ? `${apiUrl}/storage/${info.file_path}` : imgprofil}
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
                  <p className="text-sm opacity-90 uppercase pb-5">{info.role}</p>
                  {info.role === "admin" ? <a href="/admin/dashboard" className=" p-2 btn bg-black "> Accéder au Panel Administratif</a> : null}
                </div>
              </div>
            </div>

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

             {/* Form Collapse Insertion gallerie */}
             <div className="p-6 sm:p-8">
              <div
                onClick={() => setGalerieCollapse(!galerieCollapse)}
                className="flex justify-between text-white items-center cursor-pointer bg-indigo-600 p-4 rounded-lg shadow hover:bg-indigo-800"
              >
                <h2 className="text-lg font-bold">Ajouter une image à la galerie</h2>
                {galerieCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {galerieCollapse && (
              <div className="md:flex mx-auto">
                <div className="md:w-3/5 md:pr-10">
                <form className="mt-4 space-y-4" onSubmit={formikGalerie.handleSubmit}>
                 
                  <div className="w-full mb-2 flex flex-col">
                      <label className="mb-2 text-gray-800 font-semibold">Titre <span className="text-red-500">*</span></label>
                     <input required
                       className=" w-full rounded-md" name="title"
                      type="text"
                      placeholder="Entrer un titre pour l'image"
                      value={formikGalerie.values.title }
                      onChange={formikGalerie.handleChange}
                      error={formikGalerie.errors.title}
                    />
                    </div>
                    <div className="w-full mb-2 flex flex-col">
                    <label className="mb-2 text-gray-800 font-semibold">Description</label>
                     <input
                       className=" w-full rounded-md" name="description"
                      type="text" 
                      placeholder="Entrer la description"
                      value={formikGalerie.values.description }
                      onChange={formikGalerie.handleChange}
                      error={formikGalerie.errors.description }
                    />
                    </div>
                    <div className="w-full mb-2 flex flex-col">
                    <label className="mb-2 text-gray-800 font-semibold">Image <span className="text-red-500">*</span></label>
                      <input id="file-upload" name="image" type="file" 
                        onChange={(event) => {
                          formikGalerie.setFieldValue("image", event.target.files[0]);
                        }}/>
                    </div>
                  <div className="w-full mb-2 flex flex-col">
                      <label className=" text-gray-800 font-semibold">Promotion <span className="text-red-500">*</span></label>
                    <Select name="promotion_id" value={formikGalerie.values.promotion_id} 
                    onChange={formikGalerie.handleChange} disabled={false} className="w-1/2">
                      <option>Choisir la promotion</option>
                      {promotions.map((x) => (
                        <option value={x.id} key={x.id}>
                          {x.nom}
                        </option>
                      ))}
                    </Select>
                    </div>
                  <Button type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg">
                    Sauvegarder
                  </Button>
                </form>
                </div>
                <div className=" hidden md:block relative w-2/5 items-center bg-no-repeat bg-contain bg-center mt-10 " style={{ backgroundImage: `url(${bggalerie})` }}>
                </div>
              </div>
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
            {info.role !== "participant" ? 
             <div className="p-6 sm:p-8">
              <div
                onClick={() => setForumCollapse(!forumCollapse)}
                className="flex justify-between text-white items-center cursor-pointer bg-yellow-400 p-4 rounded-lg shadow hover:bg-yellow-600"
              >
                <h2 className="text-lg font-bold">Ajouter un forum</h2>
                {forumCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {forumCollapse && (
              <div className="md:flex mx-auto">
                <div className="md:w-3/5 md:pr-10">
                  <form className="mt-4 space-y-4">
                  <div className="pt-4">
                  <div className="w-full mb-2 flex flex-col">
                  <label className="mb-2 text-gray-800 font-semibold">Titre du forum <span className="text-red-500">*</span></label>
                    <input required
                      type="text"
                      placeholder="Titre du forum"
                      value={newForum.title}
                      onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
                      className="w-full mb-2 p-2 border rounded bg-100"
                    />
                    </div>
                    <div className="w-full mb-2 flex flex-col">
                      <label className="mb-2 text-gray-800 font-semibold">Description du forum <span className="text-red-500">*</span></label>
                    <textarea required
                      placeholder="Entrer une description sur le forum"
                      value={newForum.description}
                      onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
                      className="w-full mb-4 p-2 border rounded bg--100"
                    />
                    </div>
                    <Button onClick={createForum} className=" bg-yellow-400 hover:bg-yellow-600">Créer</Button>
                  </div>
                  </form>
                </div>
                <div className="hidden md:block relative w-2/5 items-center bg-no-repeat bg-contain bg-center mt-10 " style={{ backgroundImage: `url(${bgforum})` }}>
                </div>
              </div>
              )}
            </div> : null }
            
            {info.role !== "participant" ? 
            <div className="p-6 sm:p-8">
              <div
                onClick={() => setListForumCollapse(!listforumCollapse)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Mes forums</h2>
                {listforumCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {listforumCollapse && (
                <ForumTable forums={forums} reloadFunction={_init_}/>
              )}
            </div> : null }

            {/* Form Collapse Insertion gallerie */}
            {info.role !== "participant" ? 
             <div className="p-6 sm:p-8">
              <div
                onClick={() => setCoursCollapse(!coursCollapse)}
                className="flex justify-between text-white items-center cursor-pointer bg-green-600 p-4 rounded-lg shadow hover:bg-green-800"
              >
                <h2 className="text-lg font-bold">Ajouter un cours</h2>
                {coursCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {coursCollapse && (
              <div className="md:flex mx-auto">
              <div className=" hidden md:block relative w-1/3 items-center bg-no-repeat bg-contain bg-center mt-10 " style={{ backgroundImage: `url(${bgcours})` }}>
              </div>
                <div className="md:w-2/3 md:pl-10">
                  <form className="flex flex-col w-full items-center" onSubmit={formikc.handleSubmit}><br />
                      <div className="w-full mb-2 flex flex-col">
                            <label className="mb-2 text-gray-800 font-semibold">Nom du cours <span className="text-red-500">*</span></label>
                      <input type="text" required name="title" value={formikc.values.title} placeholder="Entrez le title" className=" w-full rounded-md" onChange={formikc.handleChange}/>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                            <label className="mb-2 text-gray-800 font-semibold">Score minimun pour valider en % <span className="text-red-500">*</span></label>
                      <input type="number" required name="min_score" value={formikc.values.min_score}  placeholder="La moyenne" className=" w-full rounded-md" onChange={formikc.handleChange}/>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                            <label className="mb-2 text-gray-800 font-semibold">Durée estimé en heure <span className="text-red-500">*</span></label>
                      <input type="number" required name="duree" value={formikc.values.duree} placeholder="La duree en heure" className=" w-full rounded-md" onChange={formikc.handleChange}/>
                      </div>

                      <div className="w-full mb-2 flex flex-col">
                        <label className="mb-2 text-gray-800 font-semibold">Le(s) type(s) de document <span className="text-red-500">*</span></label>
                        <select name="type" className=" w-full rounded-md" value={formikc.values.type} onChange={formikc.handleChange} required >
                            <option value="" disabled>Choisir</option>
                            {
                                statuts.map((x) => (
                                    <option value={x.libelle}>{x.libelle}</option>
                                ))
                            }
                        </select>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                            <label className="mb-2 text-gray-800 font-semibold">Joindre un ou plusieurs fichiers <span className="text-red-500">*</span></label>
                            <input type="file" name="media" onChange={(event) => {
                          const filesArray = Array.from(event.target.files);
                          formikc.setFieldValue("media", filesArray);
                      }} multiple/>
                      </div>
                      
                      <div className="w-full mb-2 flex flex-col">
                        <label className="mb-2 text-gray-800 font-semibold">La promotion <span className="text-red-500">*</span></label>
                        <select required name="promotion_id"  className=" w-full rounded-md" value={formikc.values.promotion_id} onChange={formikc.handleChange} >
                            <option>Choisir</option>
                            {
                                promos.map((x) => (
                                    <option value={x.id}>{x.nom}</option>
                                ))
                            }
                        </select>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                        <label className="mb-2 text-gray-800 font-semibold">Description <span className="text-red-500">*</span></label>
                      <TextArea val={datas.content} handleChange={(e) => setDatas({...datas, content : e})}
                      />
                      </div>
                      <Button isLoading={loadingc} className="w-full mt-5 bg-green-500 hover:bg-green-700" >Enregistrer</Button>
                  </form>
                </div>
              </div>
              )}
            </div> : null }

            {info.role !== "participant" ? 
            <div className="p-6 sm:p-8">
              <div
                onClick={() => setListCoursCollapse(!listcoursCollapse)}
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
              >
                <h2 className="text-lg font-bold">Mes cours</h2>
                {listcoursCollapse ? <ChevronUp /> : <ChevronDown />}
              </div>
              {listcoursCollapse && (
                <CoursTable cours={cours} reloadFunction={_init_}/>
              )}
            </div> : null }
            {/* Form Collapse */}
            <div className="p-6 sm:p-8">
                  <div
                    onClick={() => setIsFormCollapseOpenPassword(!isFormCollapseOpenPassword)}
                    className="flex justify-between items-center cursor-pointer bg-red-600 p-4 text-white rounded-lg shadow hover:bg-red-700"
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
                        className=" bg-red-600 hover:bg-red-700"
                      >
                        Réinitialiser
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
