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

const FormQuestion = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [loading, setLoading] = useState(false)
    const [promotions, setPromotions] = useState([])
    const [datas, setDatas] = useState({
        content: ""
    })
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        getResource(`/qcms`).then((res) => {
            console.log(res.data)
            setPromotions(res.data)
        })
      }, [])
      const getData = async() => {
        await getResource(`/qcm-questions/${id}`).then((res) => {
            console.log(res.data)

            formik.setValues({
                question_text : res.data.question_text,
                correct_answer : res.data.correct_answer,
                qcm_id: res.data.qcm.title
            })
            setDatas({content: res.data.description})
        })
      }

    useEffect(() => {
        getData();
          }, [id])

         


    const updateData = (values) => {
        const newData = { ...values, qcm_id: ata.qcm_id.id };
        console.log(newData)
        patchResource("/qcm-questions", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess("Mise à jour effectuée avec succès.")
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/qcms-questions`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data,  qcm_id: data.qcm_id.id };
        console.log(newData)
        postResource("/qcm-questions", newData).then((res) => {
            onServerSuccess("Question créée avec succès.")
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }


 

    const formik = useFormik({
        initialValues: {
            question_text : '',
            correct_answer : '',
            qcm_id : 0,
        },
        validationSchema: Yup.object({
            question_text: Yup.string().required('Champ requis'),
            correct_answer: Yup.string().required('Champ requis'),
            // qcm_id: Yup.string().required('Champ requis'),

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
            <FormBody title={id ? "Mise a jour Question" : "Creation de Question"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
            <Input type="text" name="question_text" value={formik.values.question_text} label="Entrez la question" onChange={formik.handleChange}/>
            <Input type="text" name="correct_answer" value={formik.values.correct_answer} label="Entrez la reponse" onChange={formik.handleChange}/>
                
                <InputCompletNew
                    label="Le test associe"
                    suggestions={promotions}
                    name="qcm_id"
                    labelKey="title"
                    // subLabelKey="niveau"
                    valueKey="id"
                    onSelect={(promotion) => formik.setFieldValue(
                        "qcm_id", promotion
                    )}
                    defaultValue={formik.values.qcm_id}
                    />
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormQuestion;