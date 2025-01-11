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
import InputCheck from "../../../components/admin/common/InputCheck";
import InputComplet from "../../../components/admin/common/InputComplet";

const FormNotification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [datas, setDatas] = useState({
        content: ""
    })
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        getResource(`/notifications/${id}`).then((res) => {
            console.log(res.data)

            formik.setValues({
                user_id : res.data.user.nom,
                read : res.data.read,
            })
            setDatas({content: res.data.message})
        })

          }, [id])

          const _init_ = () => {
            getResource('/afficher_liste_utilisateur').then((res) => {
                console.log(res.data)
                setUsers(res.data.utilisateurs)
            })
          }
    
          useEffect(() => {
            _init_()
          }, [])


    const updateData = (values) => {
        const newData = { ...values, message: datas.content };
        console.log(newData)
        patchResource("/notifications", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess("Mise a jour reussie.")
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/notification`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

        // Fonction de filtrage basée sur le code
const fetchSuggestions = async (searchQuery) => {
    // Si la recherche est vide, retourne toutes les données
    if (!searchQuery.trim()) {
        return users.map(item => `${item.nom} - ${item.prenom}`);
    }

    // Filtre les données localement par code
    const filtered = users.filter(item => {
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
    const selectedItem = users.find(item => item.code === code);
    // console.log(selectedItem)
    // specialites.push(selectedItem.nom)
    // console.log('Item sélectionné:', selectedItem);
    
};

    const saveData = (data) => {
       
        const newData = { ...data, message: datas.content };
        console.log(newData)
        postResource("/notifications", newData).then((res) => {
            onServerSuccess(res.data.message)
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
    }
    const formik = useFormik({
        initialValues: {
            user_id : '',
            read : false,
            
        },
        validationSchema: Yup.object({
            user_id: Yup.string().required('Champ requis'),
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
            <FormBody title={id ? "Mise a jour de notification" : "Creation de notification"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <InputComplet
                    label="Le destinataire"
                    name="user_id"
                    type="text"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    fetchSuggestions={fetchSuggestions}
                    onSelect={handleSelect}
                    minChars={2} // Important : permet d'afficher les suggestions dès le début
                    placeholder="Commencez à taper..."
                    disabled={loading}
                />
                <TextArea label="Message" 
                val={datas.content}
                handleChange={(e) => setDatas({...datas, content : e})}
                />
                <InputCheck 
                    label="Read" 
                    name="read"
                    onChange={formik.handleChange}
                    value={formik.values.read}
                    error={formik.errors.read}
                    // disabled={!edit}
                />
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormNotification;