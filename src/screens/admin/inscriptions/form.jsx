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
                user_id : res.data.user.nom,
                promotion_id: res.data.promotion.nom,
                statut : res.data.statut,
            })
            setDatas({content: res.data.content})
        }).catch((e) => errorMessage(e))
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
                
                let newData = res.data.map(({ id, nom, ...rest }) => ({
                    code: id, 
                    libelle: nom, 
                    ...rest    
                }));
                console.log(newData)
                setPromos(newData)
            })

          }
    
          useEffect(() => {
            _init_()
          }, [])

    const saveData = (data) => {
       console.log(data)
        postResource("/inscriptions", data).then((res) => {
            onServerSuccess(res.data.message)
            formik.resetForm();
        }).catch((e) => errorMessage(e))
    }

    // Fonction de filtrage basée sur le code
const fetchSuggestionsUsers = async (searchQuery) => {
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

const handleChangeUsers = (e) => {
    const { name, value } = e.target;
    setqueriesColumns(prev => ({
        ...prev,
        [name]: value
    }));
};

const handleSelectUsers = (selectedValue) => {
    // Extrait le code de la valeur sélectionnée (format: "code - libellé")
    const code = selectedValue.split(' - ')[0];
    
    
    // Trouve l'item complet correspondant au code
    const selectedItem = users.find(item => item.id === id);
    // console.log(selectedItem)
    // specialites.push(selectedItem.nom)
    // console.log('Item sélectionné:', selectedItem);
    
    // Mise à jour du formulaire avec le code
    // setqueriesColumns(prev => ({
    //     ...prev,
    //     search: selectedItem.code
    // }));
};

const [queriesColumns, setqueriesColumns] = useState({
    code : '',
    libelle : '',

})

// Fonction de filtrage basée sur le code
const fetchSuggestions = async (searchQuery) => {
    // Si la recherche est vide, retourne toutes les données
    if (!searchQuery.trim()) {
        return promos.map(item => `${item.code} - ${item.libelle}`);
    }

    // Filtre les données localement par code
    const filtered = promos.filter(item => {
        console.log(searchQuery)
        const code = item.libelle.toString();
        const query = searchQuery.toString();
        return code.includes(query);
    });

    // Retourne le code et le libellé pour l'affichage
    return filtered.map(item => `${item.code} - ${item.libelle}`);
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setqueriesColumns(prev => ({
        ...prev,
        [name]: value
    }));
};

const handleSelect = (selectedValue) => {
    // Extrait le code de la valeur sélectionnée (format: "code - libellé")
    const code = selectedValue.split(' - ')[0];
    console.log(code)
    
    
    // Trouve l'item complet correspondant au code
    const selectedItem = promos.find(item => item.code === code);
    // console.log(selectedItem)
    // specialites.push(selectedItem.specialite)
    // console.log('Item sélectionné:', selectedItem);
    
    // Mise à jour du formulaire avec le code
    // setqueriesColumns(prev => ({
    //     ...prev,
    //     search: selectedItem.code
    // }));
    return selectedItem;
};



    const formik = useFormik({
        initialValues: {
            user_id : '',
            promotion_id : '',
            statut : '',
            annee : currentYear,
        },
        validationSchema: Yup.object({
            user_id: Yup.string().required('Champ requis'),
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
                <InputComplet
                    label="L'utilisateur"
                    name="user_id"
                    type="text"
                    datas={users}
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    fetchSuggestions={fetchSuggestionsUsers}
                    onSelect={handleSelectUsers}
                    minChars={2} // Important : permet d'afficher les suggestions dès le début
                    placeholder="Commencez à taper..."
                    disabled={loading}
                />
                <InputComplet
                    label="La Promotion"
                    name="promotion_id"
                    type="text"
                    datas={promos}
                    value={formik.values.promotion_id}
                    onChange={formik.handleChange}
                    fetchSuggestions={fetchSuggestions}
                    onSelect={handleSelect}
                    minChars={2} // Important : permet d'afficher les suggestions dès le début
                    placeholder="Commencez à taper..."
                    displayKey="nom" // Clé pour l'affichage
                    valueKey="id" // Clé pour la valeur
                    disabled={loading}
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