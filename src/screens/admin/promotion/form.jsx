import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { getResource, patchResource, postResource } from "../../../services/api";
import { errorMessage, onServerSuccess } from "../../../services/Helper";
import TextArea from "../../../components/admin/common/TextArea";
import { useNavigate, useParams } from "react-router";
import Select from "../../../components/admin/common/Select";

const FormPromotion = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [loading, setLoading] = useState(false)
    const [statuts, setStatuts] = useState([{id: 1, libelle: "active"}, {id: 2, libelle: "desactive"}]);
    const [datas, setDatas] = useState({
        content: ""
    })
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        getResource(`/promotions/${id}`).then((res) => {
            console.log(res.data)
            setDatas({content: res.data.description})

            formik.setValues({
                nom : res.data.nom,
                date_debut : res.data.date_debut,
                date_fin : res.data.date_fin,
                statut : res.data.statut,
                duree : res.data.duree,
            })
        })
          }, [id])


    const updateData = (values) => {
        const newData = { ...values, description: datas.content };
        console.log(newData)
        patchResource("/promotions", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess("Mise à jour effectuée avec succès.")
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/promotion`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data, description: datas.content };
        console.log(newData)
        postResource("/promotions", newData).then((res) => {
            onServerSuccess("Création effectuée avec succès.")
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }
    const formik = useFormik({
        initialValues: {
            nom : '',
            date_debut : '',
            date_fin : '',
            statut : '',
            duree : '',
        },
        validationSchema: Yup.object({
            nom: Yup.string().required('Champ requis'),
            date_debut: Yup.string().required('Champ requis'),
            date_fin: Yup.string().required('Champ requis'),
            statut: Yup.string().required('Champ requis'),
            duree: Yup.string().required('Champ requis'),

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
            <FormBody title={id ? "Mise a jour Promotion" : "Creation de Promotion"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="nom" value={formik.values.nom} label="Entrez le nom" onChange={formik.handleChange}/>
                <Input type="date" name="date_debut" value={formik.values.date_debut} label="La date de debut" onChange={formik.handleChange}/>
                <Input type="date" name="date_fin" value={formik.values.date_fin} label="La date de fin" onChange={formik.handleChange}/>
                <Input type="text" name="duree" value={formik.values.duree} label="La duree" onChange={formik.handleChange}/>
                <Select name="statut" label="Le statut" value={formik.values.statut} onChange={formik.handleChange} disabled={false}>
                    <option>Choisir le statut</option>
                    {
                        statuts.map((x) => (
                            <option value={x.libelle}>{x.libelle}</option>
                        ))
                    }
                </Select>
                <TextArea label="Details" 
                val={datas.content}
                handleChange={(e) => setDatas({...datas, content : e})}
                />
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormPromotion;