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

const FormInfo = () => {
    const {id} = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [loading, setLoading] = useState(false)
    const [datas, setDatas] = useState({
        content: ""
    })
    const navigate = useNavigate()
    

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await getResource(`/announcements/${id}`);
                console.log(res.data);
                setDatas({ content: res.data.content });
                formik.setValues({
                    title: res.data.title || '',
                    visibility: res.data.visibility || 'public',
                });
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'annonce:', error);
            } finally {
                setLoading(false); // Arrête le spinner après la récupération
            }
        }
        fetchData()
    }, [id])


    const updateData = (values) => {
        const newData = { ...values, content: datas.content };
        console.log(newData)
        patchResource("/announcements", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess("Mise à jour effectuée avec succès.")
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/informations`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data, content: datas.content };
        console.log(newData)
        postResource("/announcements", newData).then((res) => {
            onServerSuccess("Création effectuée avec succès.")
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }
    const formik = useFormik({
        initialValues: {
            title : '',
            visibility : 'public',
            content : '',
            // user_id : '',
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
            <FormBody title={id ? "Mise a jour Actualite" : "Creation de Actualite"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="title" value={formik.values.title} label="Entrez le title" onChange={formik.handleChange}/>
                <Input type="text" name="visibility" value={formik.values.visibility} disabled={true} label="La visibilite" onChange={formik.handleChange}/>
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
 
export default FormInfo;