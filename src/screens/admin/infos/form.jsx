import React, { useState } from "react";
import { useFormik } from "formik";
import  * as Yup  from "yup";
import { Body } from "../../../components/admin/common/Body";
import FormBody from "../../../components/admin/common/FormBody";
import { Input } from "../../../components/admin/common/Input";
import Button from "../../../components/admin/common/Button";
import { postResource } from "../../../services/api";
import { errorMessage, onServerSuccess } from "../../../services/Helper";
import { Editor } from "react-simple-wysiwyg";

const FormInfo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 
    const [loading, setLoading] = useState(false)


    const updateData = (values) => {

    }

    const saveData = (data) => {
        console.log(data)
        postResource("/announcements", data).then((res) => {
            onServerSuccess(res.data.message)
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
            content: Yup.string().required('Champ requis'),

        }),
        onSubmit: async (values) => {
            setLoading(true) 
            saveData(values) 
            setLoading(false)
        },
    });

    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormBody title="Creation de Categorie">
            <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
                <Input type="text" name="title" value={formik.values.title} label="Entrez le title" onChange={formik.handleChange}/>
                <Input type="text" name="visibility" value={formik.values.visibility} disabled={true} label="La visibilite" onChange={formik.handleChange}/>
                <Editor value={value} onChange={onChange}>
                    <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    </Toolbar>
                </Editor>
                {/* <HtmlEditor value={formik.values.content} label="Entrez le contenue" onChange={formik.handleChange}/>  */}
                <Button isLoading={loading} className="w-full mt-5" >Enregistrer</Button>
            </form>
            </FormBody>
        </Body>
     );
}
 
export default FormInfo;