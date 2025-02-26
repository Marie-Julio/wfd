import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { getResource, patchResource, postFile, postResource } from "../../../services/api";
import { errorMessage, onServerWarning, onServerSuccess } from "../../../services/Helper";
import TextArea from "../../../components/admin/common/TextArea";
import { useNavigate, useParams } from "react-router";
import Select from "../../../components/admin/common/Select";
import InputComplet from "../../../components/admin/common/InputComplet";
import { jwtDecode } from "jwt-decode";
import InputCompletNew from "../../../components/admin/common/InputCompletNew";

const FormProjet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [users, setUsers] = useState([])
    const [defaultUser, setDefaultUser] = useState({})
    const [inscriptions, setInscriptions] = useState([])
    const [defaultInscris, setDefaultInscris] = useState({})
    const [loading, setLoading] = useState(false)
    const [statuts, setStatuts] = useState([{id: 1, libelle: "oui"}, {id: 2, libelle: "non"}]);
    const [datas, setDatas] = useState({
        content: ""
    })
    const navigate = useNavigate() 
    
        const accessToken = localStorage.getItem("token");
        const decodedToken = accessToken ? jwtDecode(accessToken) : null;
      
        if (!accessToken) {
          navigate("/login");
        }


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
                inscription_id: res.data.inscription.annee,
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
        const newData = { ...values, description: datas.content, inscription_id: values.inscription_id.id, user_id: values.user_id.id  };
        console.log(newData)
        const formData = new FormData(); // Utiliser FormData pour inclure les fichiers
        formData.append("inscription_id", values.inscription_id.id);
        formData.append("user_id", values.user_id.id);
        formData.append("titre", values.titre);
        formData.append("description", datas.content);
        formData.append("structure", values.structure);
        formData.append("secteur", values.secteur);
        formData.append("activite_en_cours", values.activite_en_cours);
        formData.append("date_demarrage", values.date_demarrage);
        formData.append("cout", values.cout);
        formData.append("file", values.file);
        formData.append("media", values.media);
        formData.append('_method', 'PATCH');
        postFile(`/projets/${id}`, formData).then((res) => {
            onServerSuccess("Mise à jour effectuée avec succès.")
            formik.resetForm()
            setDatas({content: ""})
            setTimeout(() => navigate(`/admin/projets`), 50)
        }).catch(e => {
            onServerWarning("Tous les champs doivent être remplir");
        })
    }

    const saveData = (data) => {
       
        const newData = { ...data, description: datas.content, inscription_id: data.inscription_id.id, user_id: data.user_id.id };
        console.log(newData)
        postFile("/projets", newData).then((res) => {
            onServerSuccess("Création effectuée avec succès.")
            setDatas({content: ""})
        }).catch((e) => onServerWarning("Tous les champs doivent être remplir"))
    }



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
            file: "",
            media: ""
        },
        validationSchema: Yup.object({
            // inscription_id: Yup.string().required('Champ requis'),
            // user_id: Yup.string().required('Champ requis'),
            titre: Yup.string().required('Champ requis'),
            structure: Yup.string().required('Champ requis'),
            secteur: Yup.string().required('Champ requis'),
            activite_en_cours: Yup.string().required('Champ requis'),
            date_demarrage: Yup.string().required('Champ requis'),
            cout: Yup.string().required('Champ requis'),

        }),
        onSubmit: async (values) => {
            // console.log(values)
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
                <Input type="text" name="structure" value={formik.values.structure} label="La structure" onChange={formik.handleChange}/>
                <Input type="text" name="secteur" value={formik.values.secteur} label="Le secteur" onChange={formik.handleChange}/>
                <Input type="date" name="date_demarrage" value={formik.values.date_demarrage} label="La date de demarrage" onChange={formik.handleChange}/>
                <Input type="number" name="cout" value={formik.values.cout} label="Le cout" onChange={formik.handleChange}/>
                
                <div className="w-full mb-2 flex flex-col">
                      <label className="mb-2 text-gray-600">L'image *</label>
                      <input  type="file" name="media" onChange={(event) => {
            formik.setFieldValue("media", event.target.files[0]); // Enregistre le fichier dans Formik
          }}/></div>
                <Select name="activite_en_cours" label="Projet en cours" value={formik.values.activite_en_cours} onChange={formik.handleChange} disabled={false}>
                    <option>Choisir l'activite en cours</option>
                    {
                        statuts.map((x) => (
                            <option value={x.libelle}>{x.libelle}</option>
                        ))
                    }
                </Select>
                <InputCompletNew
                    label="L'organisateur"
                    suggestions={users}
                    name="user_id"
                    labelKey="nom"
                    subLabelKey="prenom"
                    valueKey="id"
                    onSelect={(value) => formik.setFieldValue(
                        "user_id", value
                    )}
                    defaultValue={formik.values.user_id}
                    />
                    <InputCompletNew
                    label="L'inscription"
                    suggestions={inscriptions}
                    name="inscription_id"
                    labelKey="annee"
                    subLabelKey="statut"
                    valueKey="id"
                    onSelect={(value) => formik.setFieldValue(
                        "inscription_id", value
                    )}
                    defaultValue={formik.values.inscription_id}
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