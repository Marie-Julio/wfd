import React, { useState } from "react";
import { Link } from "react-router";
import background from "../assets/slide-2.jpg";
import { Input } from "../components/admin/common/Input";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { countries } from "../Data/data";
import { postResource } from "../services/api";
import Select from "../components/admin/common/Select";
import Button from "../components/admin/common/Button";
import useAuth from "../hooks/useAuth";
import { errorMessage } from "../services/Helper";


const Register = () => {
  // const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const auth = useAuth()
  const saveData = (data) => {
    console.log(data)
    postResource("register", data).then((res) => {
      console.log(res)
        onServerSuccess(res.data.message)
        auth.login(res.data.token)
        formik.resetForm();
        setIsLoading(false)
        // setTimeout(() => navigate("/"), 1500)
    }).catch(e => {
      setIsLoading(false)
        errorMessage(e)
        // console.log(e)
      })
}

const formik = useFormik({
    initialValues: {
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password : '',
        password_confirmation: '',
        nationalite: '',
        date_naissance: ''
    },
    validationSchema: Yup.object({
      nationalite: Yup.string().required('Champ requis'),
      nom: Yup.string().required('Champ requis'),
      prenom: Yup.string().required('Champ requis'),
      email: Yup.string().required('Champ requis'),
      telephone: Yup.string().required('Champ requis'),
      password_confirmation: Yup.string().required('Champ requis'),
      password: Yup.string().required('Champ requis'),
      date_naissance: Yup.string().required('Champ requis'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
        saveData(values)
        formik.resetForm(); 
        setIsLoading(false)

    },
});



  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
        {/* <div className="flex">
          <h3 className="text-white">Dark Mode : &nbsp;</h3>
          <label class="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div> */}
      </div>
      <div
        className={`xl:max-w-3xl bg-black
       w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold text-white`}
        >
          Inscrivez-vous pour un compte gratuit
        </h1>
        
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
          <form className="flex flex-col w-full items-center" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3">
            
            <Input
                label="Nom"
                name="nom"
                placeholder="Entrez votre Nom"
                type="text"
                darkMode
                value={formik.values.nom}
                onChange={formik.handleChange}
                error={formik.errors.nom}
            />
              <Input
                label="Prenom"
                name="prenom"
                placeholder="Entrez votre prenom"
                type="text"
                darkMode
                value={formik.values.prenom}
                onChange={formik.handleChange}
                error={formik.errors.prenom}
            />
            </div>
            <Input
                label="Email"
                name="email"
                placeholder="Entrez votre email"
                type="email"
                darkMode
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
             <Input
                label="Telephone"
                name="telephone"
                placeholder="Entrez votre contact"
                type="text"
                darkMode
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={formik.errors.telephone}
            />
            <Input
                label="Date de naissance"
                name="date_naissance"
                placeholder="Entrez votre date de naissance"
                type="date"
                darkMode
                value={formik.values.date_naissance}
                onChange={formik.handleChange}
                error={formik.errors.date_naissance}
            />
             <Select name="nationalite" label="La nationalité" value={formik.values.nationalite} onChange={formik.handleChange} disabled={false}>
                <option>Choisir la nationalité</option>
                {
                        countries.map((x) => (
                        <option value={x.libelle}>{x.libelle}- {x.code}</option>
                    ))
                }
            </Select>
            <Input
                label="Mot de passe"
                name="password"
                type="password"
                darkMode
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Input
                label="Confirmation de mot de passe"
                name="password_confirmation"
                type="password"
                darkMode
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={formik.errors.password_confirmation}
            />
            <Button isLoading={isLoading} className="w-full bg-[#E9522C]">S'inscrire</Button>
            </form>
            <p className="mt-6 text-xs text-gray-600 text-center">
            Vous avez déjà un compte ?{" "}
              <Link to="/login">
                <span className="text-[#E9522C] font-semibold">Se connecter</span>
              </Link>
            </p>
          </div>
        </div>
       
      </div>
    </div>
  );
};
export default Register;