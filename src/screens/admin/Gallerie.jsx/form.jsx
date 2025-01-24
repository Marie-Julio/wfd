import React, { useEffect, useState } from "react";
import { useFormik, useFormikContext } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { getResource, patchResource, postFile, postResource } from "../../../services/api";
import { errorMessage, onServerSuccess } from "../../../services/Helper";
import TextArea from "../../../components/admin/common/TextArea";
import { useNavigate, useParams } from "react-router";
import InputComplet from "../../../components/admin/common/InputComplet";
import InputCompletNew from "../../../components/admin/common/InputCompletNew";

const FormGalerie = () => {
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
        })
      }, [])


      

    const saveData = (data) => {
       const newData = {...data, promotion_id: data.promotion_id.id}
        console.log(newData)
        postFile("/galleries", data).then((res) => {
            onServerSuccess("Cree avec Succes")
            setDatas({content: ""})
            formik.resetForm()
        }).catch((e) => errorMessage(e))
    }


               // Fonction de filtrage basée sur le code



    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            promotion_id: "",
            image: "",
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
            <FormBody title={id ? "Mise a jour Qcm Choix" : "Creation de galerie"}>
            <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
                 
                     <Input
                      label="Titre"
                      name="title"
                      type="text"
                      placeholder="Galerie d'exemple"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.errors.title}
                    />
                     <Input
                      label="Description"
                      name="description"
                      type="text" 
                      placeholder="Description"
                      value={formik.values.description }
                      onChange={formik.handleChange}
                      error={formik.errors.description }
                    />
                    <Input
                      label="Image"
                      name="image"
                      type="file" 
                      onChange={(event) => {
                        formik.setFieldValue("image", event.target.files[0]); // Enregistre le fichier dans Formik
                      }}
                      error={formik.errors.image }
                    />
                    <InputCompletNew
                label="La promotion"
                    suggestions={promotions}
                    name="promotion_id"
                    labelKey="nom"
                    subLabelKey="niveau"
                    valueKey="id"
                    onSelect={(promotion) => formik.setFieldValue(
                        "promotion_id", promotion
                    )}
                    defaultValue={formik.values.promotion_id}
                    />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1a5fa9] hover:bg-blue-800 text-white rounded-lg"
                  >
                    Sauvegarder
                  </button>
                </form>
            </FormBody>
        </Body>
     );
}
 
export default FormGalerie;