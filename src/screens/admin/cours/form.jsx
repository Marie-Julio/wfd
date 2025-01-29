import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { getResource, patchFile, patchResource, postFile, postResource } from "../../../services/api";
import { errorMessage, onServerSuccess } from "../../../services/Helper";
import TextArea from "../../../components/admin/common/TextArea";
import Select from "../../../components/admin/common/Select";
import InputCompletNew from "../../../components/admin/common/InputCompletNew";
import { useParams } from "react-router";

const FormCours = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [promos, setPromos]  = useState([])
    const [qcms, setQcms]  = useState([])
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [datas, setDatas] = useState({
        content: ""
    })
    const statuts = [{id: 1, libelle: "video"}, {id: 2, libelle: "pdf"}, {id: 3, libelle: "video"}];

    useEffect(() => {
            const fetchData = async() => {
                try {
                    const res = await getResource(`/course-modules/${id}`);
                    console.log(res.data);
                    setDatas({ content: res.data.content });
                    formik.setValues({
                        title : res.data.title,
                        type : res.data.type,
                        min_score : res.data.min_score,
                        promotion_id : res.data.promotion.nom,
                        required_qcm_id : res.data.title,
                        media : res.data.title,
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
                console.log(res.data)
                setPromos(res.data)
            })

            getResource('/qcms').then((res) => {
                console.log(res.data)
                setQcms(res.data)
            })
          }
    
          useEffect(() => {
            _init_()
          }, [])

    const updateData = (values) => {
        // const newData = { ...values, description: datas.content, promotion_id: values.promotion_id.id, required_qcm_id: values.id };
        console.log(values)
        patchFile("/course-modules", id, values).then((res) => {
            onServerSuccess("Mise à jour effectuée avec succès.")
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }

    const saveData = (data) => {
        setLoading(true) 
        // const newData = { ...data, description: datas.content, promotion_id: data.promotion_id.id, required_qcm_id: data.required_qcm_id.id };
        console.log(data)
        postFile("/course-modules", data).then((res) => {
            onServerSuccess("Création effectuée avec succès.")
            formik.resetForm()
            setDatas({content: ""})
        }).catch((e) => errorMessage(e)).finally(() => setLoading(false) )
    }
    const formik = useFormik({
        initialValues: {
          title: "",
          type: "",
          min_score: "",
          promotion_id: 0,
          required_qcm_id: 0,
          media: [], // Initialisé comme un tableau vide
        },
        validationSchema: Yup.object({
          title: Yup.string().required("Champ requis"),
        }),
        onSubmit: async (values) => {
          setLoading(true);
      
          const formData = new FormData(); // Utiliser FormData pour inclure les fichiers
          formData.append("title", values.title);
          formData.append("type", values.type);
          formData.append("min_score", values.min_score);
          formData.append("promotion_id", values.promotion_id.id);
          formData.append("required_qcm_id", values.required_qcm_id.id);
      
          // Ajouter les fichiers au formulaire
        //   values.media.forEach((file, index) => {
        //     formData.append(`media[${index}]`, file);
        //   });

         // Ajouter les fichiers sous forme de tableau media: [(binaire), (binaire)]
            values.media.forEach((file) => {
                formData.append("media[]", file); // Utilisation de media[] pour transmettre sous forme de tableau
            });
      
          try {
            if (id) {
               updateData(formData); // Fonction d'édition
            } else {
               saveData(formData); // Fonction de création
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
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="title" value={formik.values.title} label="Entrez le title" onChange={formik.handleChange}/>
                <Input type="text" name="min_score" value={formik.values.min_score}  label="La moyenne" onChange={formik.handleChange}/>
                <Input type="text" name="duree" value={formik.values.duree} label="La duree" onChange={formik.handleChange}/>
                
                <Select name="type" label="Le type" value={formik.values.type} onChange={formik.handleChange} disabled={false}>
                    <option>Choisir le statut</option>
                    {
                        statuts.map((x) => (
                            <option value={x.libelle}>{x.libelle}</option>
                        ))
                    }
                </Select>
                <Input type="file" name="media"  label="Joindre le fichier"  onChange={(event) => {
                    const filesArray = Array.from(event.target.files);
                    formik.setFieldValue("media", filesArray);
                }} multiple/>
                {/* {formik.values.type === "pdf" && <Input type="file" name="media" value={formik.values.media} label="Le fichier pdf" onChange={formik.handleChange}/>} */}
                <InputCompletNew
                    label="La promotion"
                    suggestions={promos}
                    name="promotion_id"
                    labelKey="nom"
                    subLabelKey="niveau"
                    valueKey="id"
                    onSelect={(promotion) => formik.setFieldValue(
                        "promotion_id", promotion
                    )}
                    defaultValue={formik.values.promotion_id}
                    />

                <InputCompletNew
                    label="Le test associé"
                    suggestions={qcms}
                    name="required_qcm_id"
                    labelKey="title"
                    subLabelKey="promotion_id"
                    valueKey="id"
                    onSelect={(qcm) => formik.setFieldValue(
                        "required_qcm_id", qcm
                    )}
                    defaultValue={formik.values.required_qcm_id}
                    />
                <TextArea label="Description" 
                val={datas.content}
                handleChange={(e) => setDatas({...datas, content : e})}
                />
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormCours;