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

const FormChoix = () => {
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
        getResource(`/qcm-questions`).then((res) => {
            console.log(res.data)
            setPromotions(res.data)
        }).catch((e) => errorMessage(e))
      }, [])

    useEffect(() => {
        getResource(`/qcm-choices/${id}`).then((res) => {
            console.log(res.data)

            formik.setValues({
                choice_text : res.data.choice_text,
                question_id: res.data.question
            })
            setDefaultPromotion(res.data.question)
        }).catch((e) => errorMessage(e))
          }, [id])

         


    const updateData = (values) => {
        const newData = { ...values, question_id: values.question_id.id};
        console.log(newData)
        patchResource("/qcm-choices", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess("Modifie avec succes")
            formik.resetForm()
            setTimeout(() => navigate(`/admin/qcms-choix`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data, question_id: data.question_id.id };
        console.log(newData)
        postResource("/qcm-choices", newData).then((res) => {
            onServerSuccess("Cree avec Succes")
            setDatas({content: ""})
            formik.resetForm()
        }).catch((e) => errorMessage(e))
    }


               // Fonction de filtrage basée sur le code



    const formik = useFormik({
        initialValues: {
            choice_text : '',
            question_id : defaultPromotion ,
        },
        validationSchema: Yup.object({
            choice_text: Yup.string().required('Champ requis'),

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
            <FormBody title={id ? "Mise a jour Qcm Choix" : "Creation de Qcm Choix"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="choice_text" value={formik.values.choice_text} label="Entrez le choix" onChange={formik.handleChange}/>
                <InputCompletNew
                label="La question"
                    suggestions={promotions}
                    name="question_id"
                    labelKey="question_text"
                    subLabelKey="correct_answer"
                    valueKey="id"
                    onSelect={(promotion) => formik.setFieldValue(
                        "question_id", promotion
                    )}
                    defaultValue={formik.values.question_id}
                    />
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormChoix;