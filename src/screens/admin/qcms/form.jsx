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
import InputComplet from "../../../components/admin/common/InputComplet";
import InputCompletNew from "../../../components/admin/common/InputCompletNew";

const FormQcm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [loading, setLoading] = useState(false)
    const [defaultPromotion , setDefaultPromotion] = useState({})
    const [promotions, setPromotions] = useState([])
    const [datas, setDatas] = useState({
        content: ""
    })
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        getResource(`/promotions`).then((res) => {
            console.log(res.data)
            setPromotions(res.data)
        }).catch((e) => errorMessage(e))
      }, [])

    useEffect(() => {
        getResource(`/qcms/${id}`).then((res) => {
            console.log(res.data)

            formik.setValues({
                title : res.data.title,
                promotion_id: res.data.promotion
            })
            setDefaultPromotion(res.data.promotion)
            setDatas({content: res.data.description})
        }).catch((e) => errorMessage(e))
          }, [id])

         


    const updateData = (values) => {
        const newData = { ...values, description: datas.content, promotion_id: values.promotion_id.id};
        console.log(newData)
        patchResource("/qcms", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess("Modifie avec succes")
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/qcms`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data, description: datas.content, promotion_id: parseInt(data.promotion_id) };
        console.log(newData)
        postResource("/qcms", newData).then((res) => {
            onServerSuccess("Cree avec Succes")
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }


               // Fonction de filtrage basée sur le code



    const formik = useFormik({
        initialValues: {
            title : '',
            promotion_id : defaultPromotion ,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Champ requis'),

        }),
        onSubmit: async (values) => {
            console.log("Données soumises :", values); // Vérifiez le contenu
            setLoading(true) 
            if(id) updateData(values)
            else saveData(values) 
            setLoading(false)
        },
    });

    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormBody title={id ? "Mise a jour Qcm" : "Creation de Qcm"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="title" value={formik.values.title} label="Entrez le titre" onChange={formik.handleChange}/>
                <InputCompletNew
                    suggestions={promotions}
                    name="promotion_id"
                    labelKey="nom"
                    subLabelKey="niveau"
                    valueKey="id"
                    onSelect={(promotion) => formik.setValues({
                        promotion_id: promotion
                    })}
                    defaultValue={formik.values.promotion_id}
                    />;
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
 
export default FormQcm;