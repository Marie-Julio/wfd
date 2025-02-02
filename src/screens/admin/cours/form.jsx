import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { getResource, patchFile, patchResource, postFile, postResource } from "../../../services/api";
import { errorMessage, onServerSuccess, onServerWarning } from "../../../services/Helper";
import TextArea from "../../../components/admin/common/TextArea";
import Select from "../../../components/admin/common/Select";
import InputCompletNew from "../../../components/admin/common/InputCompletNew";
import { useParams } from "react-router";
import {jwtDecode} from "jwt-decode";

const FormCours = () => {
  const accessToken = localStorage.getItem("token");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [promos, setPromos]  = useState([])
    const [qcms, setQcms]  = useState([])
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [datas, setDatas] = useState({
        content: ""
    })
    const statuts = [{id: 1, libelle: "video"}, {id: 2, libelle: "pdf"}, {id: 3, libelle: "video & pdf"}];

    useEffect(() => {
            const fetchData = async() => {
                try {
                    const res = await getResource(`/course-modules/${id}`);
                    setDatas({ content: res.data.content });
                    formik.setValues({
                        title : res.data.title,
                        type : res.data.type,
                        min_score : res.data.min_score,
                        duree : res.data.duree,
                        promotion_id : res.data.promotion.nom,
                        required_qcm_id : res.data.qcm.required_qcm_id.title,
                    });
                } catch (error) {
                    console.error('Erreur lors de la récupération de l\'annonce:', error);
                } finally {
                    setLoading(false); // Arrête le spinner après la récupération
                }
            }
            fetchData()
        }, [id])

    const _init_ = () => {
            getResource('/promotions').then((res) => {
                setPromos(res.data)
            })

            getResource('/qcms').then((res) => {
                setQcms(res.data)
            })
          }
    
          useEffect(() => {
            _init_()
          }, [])

    const updateData = (values) => {
        // const newData = { ...values, description: datas.content, promotion_id: values.promotion_id, required_qcm_id: values.id };
        patchFile("/course-modules", id, values).then((res) => {
            onServerSuccess("Mise à jour effectuée avec succès.")
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }

    const saveData = (data) => {
        setLoading(true) 
        // const newData = { ...data, description: datas.content, promotion_id: data.promotion_id, required_qcm_id: data.required_qcm_id.id };
        postFile("/course-modules", data).then((res) => {
            onServerSuccess("Création effectuée avec succès.")
            formik.resetForm()
            formik.setValues({
                title : '',
                type : '',
                duree: 0,
                min_score : 0,
                promotion_id : 0,
                required_qcm_id : 0,
                media : [],
            });
            setDatas({content: ""})
        }).catch((e) => errorMessage(e)).finally(() => setLoading(false) )
    }
    const formik = useFormik({
        initialValues: {
          title: "",
          type: "",
          duree: 0,
          min_score: 0,
          promotion_id: 0,
          required_qcm_id: 0,
          media: [], // Initialisé comme un tableau vide
        },
        validationSchema: Yup.object({
          title: Yup.string().required("Champ requis"),
        }),
        onSubmit: async (values) => {
          setLoading(true);
          if (!values.type) {
            return onServerWarning('Le champ type est obligatoire. Veuillez remplir type ');
          }
          if (!values.promotion_id) {
            return onServerWarning('Le champ promotion est obligatoire.. Veuillez remplir promotion');
          }
          if (!values.required_qcm_id) {
            return onServerWarning('Le champ promotion est obligatoire.. Veuillez remplir Test associé');
          }
          if (!values.media) {
            return onServerWarning('Le champ fichier est obligatoire.. Veuillez remplir media');
          }
          if (!datas.content) {
            return onServerWarning('Le champ description est obligatoire.. Veuillez remplir content');
          }
                        
          const formData = new FormData(); // Utiliser FormData pour inclure les fichiers
          formData.append("title", values.title);
          formData.append("type", values.type);
          formData.append("min_score", values.min_score);
          formData.append("duree", values.duree);
          formData.append("user_id", decodedToken.id);
          formData.append("description", datas.content);
          formData.append("promotion_id", values.promotion_id);
          formData.append("required_qcm_id", values.required_qcm_id.id);

          values.media.forEach((file) => {
            formData.append("file_path[]", file);
          });
      
          try {
            if (id) {
               updateData(formData);
            } else {
               saveData(formData);
            }
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        },
      });
      

    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormBody title="Creation de Cours">
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}><br />
                      <div className="w-full mb-2 flex flex-col">
                            <label className=" font-semibold mb-2 text-gray-800">Nom du cours  <span className="text-red-500">*</span></label>
                      <input type="text" required name="title" value={formik.values.title} placeholder="Entrez le title" className=" w-full rounded-md" onChange={formik.handleChange}/>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                            <label className=" font-semibold mb-2 text-gray-800">Score minimun pour valider en %  <span className="text-red-500">*</span></label>
                      <input type="number" required name="min_score" value={formik.values.min_score}  placeholder="La moyenne" className=" w-full rounded-md" onChange={formik.handleChange}/>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                            <label className=" font-semibold mb-2 text-gray-800">Durée estimé en heure  <span className="text-red-500">*</span></label>
                      <input type="number" required name="duree" value={formik.values.duree} placeholder="La duree en heure" className=" w-full rounded-md" onChange={formik.handleChange}/>
                      </div>

                      <div className="w-full mb-2 flex flex-col">
                        <label className=" font-semibold mb-2 text-gray-800">Le(s) type(s) de document  <span className="text-red-500">*</span></label>
                        <select required name="type" className=" w-full rounded-md" value={formik.values.type} onChange={formik.handleChange}>
                            <option>Sélectionner</option>
                            {
                                statuts.map((x) => (
                                    <option value={x.libelle}>{x.libelle}</option>
                                ))
                            }
                        </select>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                            <label className=" font-semibold mb-2 text-gray-800">Joindre un ou plusieurs fichiers  <span className="text-red-500">*</span></label>
                            <input type="file" name="media" required onChange={(event) => {
                          const filesArray = Array.from(event.target.files);
                          formik.setFieldValue("media", filesArray);
                      }} multiple/>
                      </div>
                      
                      <div className="w-full mb-2 flex flex-col">
                        <label className=" font-semibold mb-2 text-gray-800">La promotion  <span className="text-red-500">*</span></label>
                        <select required name="promotion_id"  className=" w-full rounded-md" value={formik.values.promotion_id} onChange={formik.handleChange} >
                            <option>Sélectionner</option>
                            {
                                promos.map((x) => (
                                    <option value={x.id}>{x.nom}</option>
                                ))
                            }
                        </select>
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                        <label className=" font-semibold mb-2 text-gray-800">Le test associé  <span className="text-red-500">*</span></label>
                              
                            <InputCompletNew
                          suggestions={qcms}
                          name="required_qcm_id"
                          labelKey="title"
                          subLabelKey="promotion_id"
                          valueKey="id"
                          onSelect={(qcm) => {formik.setFieldValue(
                              "required_qcm_id", qcm
                          )
                          console.log(qcm)}}
                          defaultValue={formik.values.required_qcm_id}
                          />
                      </div>
                      <div className="w-full mb-2 flex flex-col">
                        <label className="mb-2 text-gray-800 font-semibold">Description <span className="text-red-500">*</span></label>
                      <TextArea val={datas.content} handleChange={(e) => setDatas({...datas, content : e})}
                      />
                      </div>
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormCours;