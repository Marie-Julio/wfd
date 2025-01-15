import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { getResource, patchResource, postFile, postResource } from "../../../services/api";
import { errorMessage, onServerSuccess } from "../../../services/Helper";
import TextArea from "../../../components/admin/common/TextArea";
import { useNavigate, useParams } from "react-router";
import Select from "../../../components/admin/common/Select";
import InputComplet from "../../../components/admin/common/InputComplet";

const FormProjet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [users, setUsers] = useState([])
    const [inscriptions, setInscriptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [statuts, setStatuts] = useState([{id: 1, libelle: "oui"}, {id: 2, libelle: "non"}]);
    const [datas, setDatas] = useState({
        content: ""
    })
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
         getResource('/afficher_liste_utilisateur').then((res) => {
                        console.log(res.data)
                        setUsers(res.data.utilisateurs)
        })

        getResource('/inscriptions').then((res) => {
            console.log(res.data)
            setInscriptions(res.data)
        })
    }, [])

    useEffect(() => {
        getResource(`/projets/${id}`).then((res) => {
            console.log(res.data)
            setDatas({content: res.data.description})

            formik.setValues({
                inscription_id: res.data.inscription.nom,
                user_id: res.data.user.nom,
                titre: res.data.titre,
                structure: res.data.structure,
                secteur: res.data.secteur,
                activite_en_cours: res.data.activite_en_cours,
                date_demarrage: res.data.date_demarrage,
                cout: res.data.cout,
                media: res.data.media
            })
        })
          }, [id])


    const updateData = (values) => {
        const newData = { ...values, description: datas.content };
        console.log(newData)
        patchResource("/projets", id, newData).then((res) => {
            // console.log(res)
            onServerSuccess(res.data.message)
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/projets`), 50)
        }).catch(e => {
            errorMessage(e)
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data, description: datas.content, inscription_id: parseInt(data.inscription_id), user_id: parseInt(data.user_id) };
        console.log(newData)
        postFile("/projets", newData).then((res) => {
            onServerSuccess(res.data.message)
            setDatas({content: ""})
        }).catch((e) => errorMessage(e))
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


           // Fonction de filtrage basée sur le nom Inscription
           const fetchSuggestionsIns = async (searchQuery) => {
            // Si la recherche est vide, retourne toutes les données
            if (!searchQuery.trim()) {
                return inscriptions.map(item => `${item.annee} - ${item.prenom}`);
            }
        
            // Filtre les données localement par code
            const filtered = inscriptions.filter(item => {
                const code = item.annee.toLowerCase();
                const query = searchQuery.toLowerCase();
                return code.includes(query);
            });
        
            // Retourne le code et le libellé pour l'affichage
            return filtered.map(item => `${item.id} - ${item.annee}`);
        };
        
        const handleSelectIns = (selectedValue) => {
            // Extrait le code de la valeur sélectionnée (format: "code - libellé")
            const code = selectedValue.split(' - ')[0];
            
            
            // Trouve l'item complet correspondant au code
            const selectedItem = inscriptions.find(item => item.code === code);
            // console.log(selectedItem)
            // specialites.push(selectedItem.nom)
            // console.log('Item sélectionné:', selectedItem);
            
        };


    const formik = useFormik({
        initialValues: {
            inscription_id: 0,
            user_id: 0,
            titre: "",
            description: "",
            structure: "",
            secteur: "",
            activite_en_cours: "",
            date_demarrage: "",
            cout: 0,
            file: ""
        },
        validationSchema: Yup.object({
            inscription_id: Yup.string().required('Champ requis'),
            user_id: Yup.string().required('Champ requis'),
            titre: Yup.string().required('Champ requis'),
            structure: Yup.string().required('Champ requis'),
            secteur: Yup.string().required('Champ requis'),
            activite_en_cours: Yup.string().required('Champ requis'),
            date_demarrage: Yup.string().required('Champ requis'),
            cout: Yup.string().required('Champ requis'),
            media: Yup.string().required('Champ requis'),

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
            <FormBody title={id ? "Mise a jour Projet" : "Creation de Projet"}>
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="titre" value={formik.values.titre} label="Entrez le titre" onChange={formik.handleChange}/>
                <Input type="text" name="structure" value={formik.values.structure} label="La date de debut" onChange={formik.handleChange}/>
                <Input type="text" name="secteur" value={formik.values.secteur} label="Le secteur" onChange={formik.handleChange}/>
                <Input type="date" name="date_demarrage" value={formik.values.date_demarrage} label="La date de demarrage" onChange={formik.handleChange}/>
                <Input type="number" name="cout" value={formik.values.cout} label="Le cout" onChange={formik.handleChange}/>
                <Input type="file" name="media" label="L'image" onChange={(event) => {
            formik.setFieldValue("media", event.target.files[0]); // Enregistre le fichier dans Formik
          }}/>
                <Select name="activite_en_cours" label="L'activite en cours" value={formik.values.activite_en_cours} onChange={formik.handleChange} disabled={false}>
                    <option>Choisir l'activite en cours</option>
                    {
                        statuts.map((x) => (
                            <option value={x.libelle}>{x.libelle}</option>
                        ))
                    }
                </Select>
                 <InputComplet
                    label="L'organisateur"
                    name="user_id"
                    type="number"
                    datas={users}
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    fetchSuggestions={fetchSuggestions}
                    onSelect={handleSelect}
                    minChars={2} // Important : permet d'afficher les suggestions dès le début
                    placeholder="Commencez à taper..."
                    disabled={loading}
                />
                <InputComplet
                    label="L'inscription"
                    name="inscription_id"
                    type="number"
                    datas={inscriptions}
                    value={formik.values.inscription_id}
                    onChange={formik.handleChange}
                    fetchSuggestions={fetchSuggestionsIns}
                    onSelect={handleSelectIns}
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
 
export default FormProjet;