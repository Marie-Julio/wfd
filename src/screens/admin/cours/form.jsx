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
                        file_path : res.data.title,
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
        const newData = { ...values, description: datas.content, promotion_id: values.promotion_id.id, required_qcm_id: values.id };
        console.log(newData)
        patchFile("/course-modules", id, newData).then((res) => {
            onServerSuccess("Mise à jour effectuée avec succès.")
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }

    const saveData = (data) => {
        setLoading(true) 
        const newData = { ...data, description: datas.content, promotion_id: data.promotion_id.id, required_qcm_id: data.required_qcm_id.id };
        console.log(newData)
        postFile("/course-modules", newData).then((res) => {
            onServerSuccess("Création effectuée avec succès.")
            formik.resetForm()
            setDatas({content: ""})
        }).catch((e) => errorMessage(e)).finally(() => setLoading(false) )
    }
    const formik = useFormik({
        initialValues: {
            title : '',
            type : '',
            min_score : '',
            promotion_id : 0,
            required_qcm_id : 0,
            file_path : '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Champ requis'),
            // content: Yup.string().required('Champ requis'),

        }),
        onSubmit: async (values) => {
            setLoading(true) 
            if(id) updateData(values)
            else saveData(values) 
            setLoading(false)
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
                <Input type="file" name="file_path"  label="Joindre le fichier" onChange={(event) => {
                        formik.setFieldValue("file_path", event.target.files[0]); // Enregistre le fichier dans Formik
                      }}/>
                {/* {formik.values.type === "pdf" && <Input type="file" name="file_path" value={formik.values.file_path} label="Le fichier pdf" onChange={formik.handleChange}/>} */}
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