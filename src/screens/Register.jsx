import React, { useState } from "react";
import { Link } from "react-router";
import background from "../assets/slide-5.jpg";
import { Input } from "../components/admin/common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { countries } from "../Data/data";
import { postResource } from "../services/api";
import Select from "../components/admin/common/Select";
import Button from "../components/admin/common/Button";
import useAuth from "../hooks/useAuth";
import { errorMessage } from "../services/Helper";
import logo from "../assets/wfdguinee.png";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const saveData = (data) => {
    console.log(data);
    postResource("register", data)
      .then((res) => {
        console.log(res);
        onServerSuccess("Inscription réussie !");
        auth.login(res.data.token);
        formik.resetForm();
        setIsLoading(false);
        setTimeout(() => navigate("/"), 100);
      })
      .catch((e) => {
        setIsLoading(false);
        errorMessage(e);
      });
  };

  const formik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      password: "",
      password_confirmation: "",
      nationalite: "",
      date_naissance: "",
    },
    validationSchema: Yup.object({
      nationalite: Yup.string().required("Champ requis"),
      nom: Yup.string().required("Champ requis"),
      prenom: Yup.string().required("Champ requis"),
      email: Yup.string().required("Champ requis"),
      telephone: Yup.string().required("Champ requis"),
      password_confirmation: Yup.string().required("Champ requis"),
      password: Yup.string().required("Champ requis"),
      date_naissance: Yup.string().required("Champ requis"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      saveData(values);
      formik.resetForm();
      setIsLoading(false);
    },
  });

  return (
      <div className="h-screen md:flex">
    <div className="relative overflow-hidden md:flex w-2/5 justify-around items-center hidden bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
      <div className="pl-10">
        <a href="/"><h1 class="text-white hover:text-[#1a5fa9] font-bold text-3xl font-sans">WELT FRIEDENS DIENST e.V</h1></a>
        <p className="text-white mt-1">Service mondiale pour la paix</p>
      </div>
    </div>
    <div className="md:overflow-y-auto mx-auto md:flex md:w-3/5 md:px-5 md:p-0 justify-center py-10 items-center bg-white">
      <form className="space-y-4 m-auto mt-10 " onSubmit={formik.handleSubmit}>
        
        <div class="md:hidden bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
            <div className="px-5 py-14">
                <a href="/"><h1 class="text-white hover:text-[#1a5fa9] font-bold text-2xl font-sans">WELT FRIEDENS DIENST e.V</h1></a>
                <p class="text-white mt-1">Service mondiale pour la paix</p>
            </div>
        </div>
        <div className="px-5 md:px-0">
          <h1 className="text-gray-800 font-bold text-2xl mb-1 pt-5 md:p-0">S'inscrire</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Inscrivez-vous pour avoir un compte</p>
          <div className="flex">
            <div className="flex items-center border-2 py-2 rounded-2xl mb-4 w-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <input className="pl-2 outline-none border-none" 
                name="nom"
                placeholder="Entrez votre nom"
                type="text"
                value={formik.values.nom}
                onChange={formik.handleChange} required />
            </div>
            <div className="flex items-center border-2 py-2 rounded-2xl mb-4 w-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <input className="pl-2 outline-none border-none"
                name="prenom"
                placeholder="Entrez votre prenom"
                type="text"
                value={formik.values.prenom}
                onChange={formik.handleChange} required />
            </div>
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input className="pl-2 outline-none border-none w-full" name="email" type="email" value={formik.values.email}
                onChange={formik.handleChange} placeholder="E-mail" />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input className="pl-2 outline-none border-none w-full" name="telephone" placeholder="Entrez votre contact" 
            type="text" value={formik.values.telephone} onChange={formik.handleChange} />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <div className="flex space-x-4">
              <Input label="Date de naissance" name="date_naissance" placeholder="Entrez votre date de naissance" type="date"
                value={formik.values.date_naissance} onChange={formik.handleChange} className="w-1/2"/>
              <Select name="nationalite" label="La nationalité" value={formik.values.nationalite} 
              onChange={formik.handleChange} disabled={false} className="w-1/2">
                <option>Choisir la nationalité</option>
                {countries.map((x) => (
                  <option value={x.libelle} key={x.code}>
                    {x.libelle}- {x.code}
                  </option>
                ))}
              </Select>
            </div>
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
            </svg>
            <input className="pl-2 outline-none border-none w-full" name="password" type="password" 
            value={formik.values.password} onChange={formik.handleChange} placeholder="Mot de passe" />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
            </svg>
            <input className="pl-2 outline-none border-none w-full" name="password_confirmation" type="password" 
            value={formik.values.password_confirmation}
          onChange={formik.handleChange} placeholder="Confirmation de mot de passe" />
        </div>
        <Button isLoading={isLoading} className="block w-full bg-orange-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:text-gray-200 hover:bg-orange-700 focus:outline-none transition-all">
          S'inscrire</Button>
        <div className="text-center pt-5 pb-10">Vous avez déjà un compte ? <Link to="/login" className=" text-indigo-600 ">Se connecter</Link></div><br />
    
        </div>
      </form>
    </div>
  </div>
  );
};

export default Register;
