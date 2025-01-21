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
import Select from "../../../components/admin/common/Select";
import InputComplet from "../../../components/admin/common/InputComplet";
import { useNavigate, useParams } from "react-router";
import InputCompletNew from "../../../components/admin/common/InputCompletNew";

const FormInscription = () => {
    const currentYear = new Date().getFullYear();
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [datas, setDatas] = useState({
            content: ""
        })
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);
    const [promos, setPromos] = useState([]);
    const [statuts, setStatuts] = useState([{id: 1, libelle: "validee"}, {id: 2, libelle: "en_attente"}, {id: 3, libelle: "rejete"}]);

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        getResource(`/inscriptions/${id}`).then((res) => {
            console.log(res.data)
            setDatas({content: ""})

            formik.setValues({
                user_id : res.data.user,
                promotion_id: res.data.promotion,
                statut : res.data.statut,
            })
        })
    }, [id])


    const updateData = (values) => {
        console.log(values)
        patchResource("/inscriptions", id, values).then((res) => {
            // console.log(res)
            onServerSuccess(res.data.message)
            formik.resetForm()
            setTimeout(() => navigate(`/admin/inscription`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const _init_ = () => {
            getResource('/afficher_liste_utilisateur').then((res) => {
                console.log(res.data)
                setUsers(res.data.utilisateurs)
            })

            getResource('/promotions').then((res) => {
                
                console.log(res.data)
                setPromos(res.data)
            })

          }
    
          useEffect(() => {
            _init_()
          }, [])

    const saveData = (data) => {
        const newData = {...data, user_id: data.user_id.id, promotion_id: data.promotion_id.id}
       console.log(newData)
        postResource("/inscriptions", newData).then((res) => {
            onServerSuccess("Cree avec succes")
            formik.resetForm();
        }).catch((e) => errorMessage(e))
    }

    const formik = useFormik({
        initialValues: {
            user_id : '',
            promotion_id : '',
            statut : '',
            annee : currentYear,
        },
        validationSchema: Yup.object({
            statut: Yup.string().required('Champ requis'),
            // content: Yup.string().required('Champ requis'),

        }),
        onSubmit: async (values) => {
            setLoading(true)
            if(id) updateData(values)
            else saveData(values)
            formik.resetForm(); 
            setLoading(false)
        },
    });

    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormBody title={id ? "Mise a jour d'une inscription" : "Creation d'une inscription"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                
                <InputCompletNew
                    label="L'utilisateur"
                    suggestions={users}
                    name="user_id"
                    labelKey="nom"
                    subLabelKey="prenom"
                    valueKey="id"
                    onSelect={(promotion) => formik.setFieldValue(
                        "user_id", promotion
                    )}
                    defaultValue={formik.values.user_id}
                />
                    <InputCompletNew
                        label="La Promotion"
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
                 <Select name="statut" label="Le statut" value={formik.values.statut} onChange={formik.handleChange} disabled={false}>
                                    <option>Choisir le statut</option>
                                    {
                                        statuts.map((x) => (
                                            <option value={x.libelle}>{x.libelle}</option>
                                        ))
                                    }
                                </Select>
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormInscription;