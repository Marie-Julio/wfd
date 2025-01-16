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

const FormQcm = () => {
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
                promotion_id: res.data.promotion.nom
            })
            setDatas({content: res.data.description})
        }).catch((e) => errorMessage(e))
          }, [id])

         


    const updateData = (values) => {
        const newData = { ...values, description: datas.content, promotion_id: parseInt(data.promotion_id) };
        console.log(newData)
        patchResource("/qcms", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess(res.data.message)
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/qcm`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data, description: datas.content, promotion_id: parseInt(data.promotion_id) };
        console.log(newData)
        postResource("/qcms", newData).then((res) => {
            onServerSuccess(res.data.message)
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }


               // Fonction de filtrage basée sur le code
const fetchSuggestions = async (searchQuery) => {
    // Si la recherche est vide, retourne toutes les données
    if (!searchQuery.trim()) {
        return promotions.map(item => `${item.nom} - ${item.prenom}`);
    }

    // Filtre les données localement par code
    const filtered = promotions.filter(item => {
        const code = item.nom.toLowerCase();
        const query = searchQuery.toLowerCase();
        return code.includes(query);
    });

    // Retourne le code et le libellé pour l'affichage
    return filtered.map(item => `${item.id} - ${item.nom}`);
};

const handleSelect = (selectedValue) => {
    // Extrait le code de la valeur sélectionnée (format: "code - libellé")
    const code = selectedValue.split(' - ')[0];
    
    
    // Trouve l'item complet correspondant au code
    const selectedItem = promotions.find(item => item.id === id);
    // console.log(selectedItem)
    // specialites.push(selectedItem.nom)
    // console.log('Item sélectionné:', selectedItem);
    
};


    const formik = useFormik({
        initialValues: {
            title : '',
            promotion_id : '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Champ requis'),
            promotion_id: Yup.string().required('Champ requis'),

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
            <FormBody title={id ? "Mise a jour Qcm" : "Creation de Qcm"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="title" value={formik.values.title} label="Entrez le title" onChange={formik.handleChange}/>
                <InputComplet
                    label="La promotion"
                    name="promotion_id"
                    type="text"
                    datas={promotions}
                    value={formik.values.promotion_id}
                    onChange={formik.handleChange}
                    fetchSuggestions={fetchSuggestions}
                    onSelect={handleSelect}
                    minChars={2} // Important : permet d'afficher les suggestions dès le début
                    placeholder="Commencez à taper..."
                    disabled={loading}
                />
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