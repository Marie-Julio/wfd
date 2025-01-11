import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { getResource, postResource } from "../../../services/api";
import { errorMessage, onServerSuccess } from "../../../services/Helper";
import TextArea from "../../../components/admin/common/TextArea";
import Select from "../../../components/admin/common/Select";

const FormCours = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [promos, setPromos]  = useState([])
    const [qcms, setQcms]  = useState([])
    const [loading, setLoading] = useState(false)
    const [datas, setDatas] = useState({
        content: ""
    })
    const statuts = [{id: 1, libelle: "video"}, {id: 2, libelle: "pdf"}, {id: 3, libelle: "video"}];

    const _init_ = () => {
            getResource('/promotions').then((res) => {
                console.log(res.data)
                setPromos(res.data)
            })
          }
    
          useEffect(() => {
            _init_()
          }, [])

    const updateData = (values) => {

    }

    const saveData = (data) => {
       
        const newData = { ...data, description: datas.content };
        console.log(newData)
        postResource("/announcements", newData).then((res) => {
            onServerSuccess(res.data.message)
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }
    const formik = useFormik({
        initialValues: {
            title : '',
            type : '',
            min_score : '',
            promotion_id : '',
            required_qcm_id : '',
            file_path : '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Champ requis'),
            // content: Yup.string().required('Champ requis'),

        }),
        onSubmit: async (values) => {
            setLoading(true) 
            saveData(values) 
            setLoading(false)
        },
    });

    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormBody title="Creation de Cours">
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="title" value={formik.values.title} label="Entrez le title" onChange={formik.handleChange}/>
                <Input type="text" name="min_score" value={formik.values.min_score} disabled={true} label="La moyenne" onChange={formik.handleChange}/>
                <Input type="text" name="duree" value={formik.values.duree} label="La duree" onChange={formik.handleChange}/>
                <Input type="file" name="file_path" value={formik.values.file_path} label="Le fichier" onChange={formik.handleChange}/>
                <Select name="type" label="Le type" value={formik.values.type} onChange={formik.handleChange} disabled={false}>
                    <option>Choisir le statut</option>
                    {
                        statuts.map((x) => (
                            <option value={x.libelle}>{x.libelle}</option>
                        ))
                    }
                </Select>
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