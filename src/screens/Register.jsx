import React, { useState } from "react";
import { Link } from "react-router";
import background from "../assets/slide-2.jpg";
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
    <div
      className="flex justify-center items-center w-full h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="xl:max-w-3xl bg-white w-full p-5 sm:p-10 rounded-md overflow-hidden">
        <h1 className="text-center text-xl sm:text-3xl font-semibold text-white">
          Inscrivez-vous pour un compte gratuit
        </h1>

        <div className="w-full mt-6 h-[70vh] overflow-y-auto">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <a
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-50 h-20 mr-2" src={logo} alt="logo" />
              WFDGuinee
            </a>
            <form
              className="flex flex-col w-full items-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  label="Nom"
                  name="nom"
                  placeholder="Entrez votre Nom"
                  type="text"
                  value={formik.values.nom}
                  onChange={formik.handleChange}
                  error={formik.errors.nom}
                />
                <Input
                  label="Prenom"
                  name="prenom"
                  placeholder="Entrez votre prenom"
                  type="text"
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
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
              />
              <Input
                label="Telephone"
                name="telephone"
                placeholder="Entrez votre contact"
                type="text"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={formik.errors.telephone}
              />
              <Input
                label="Date de naissance"
                name="date_naissance"
                placeholder="Entrez votre date de naissance"
                type="date"
                value={formik.values.date_naissance}
                onChange={formik.handleChange}
                error={formik.errors.date_naissance}
              />
              <Select
                name="nationalite"
                label="La nationalité"
                value={formik.values.nationalite}
                onChange={formik.handleChange}
                disabled={false}
              >
                <option>Choisir la nationalité</option>
                {countries.map((x) => (
                  <option value={x.libelle} key={x.code}>
                    {x.libelle}- {x.code}
                  </option>
                ))}
              </Select>
              <Input
                label="Mot de passe"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
              />
              <Input
                label="Confirmation de mot de passe"
                name="password_confirmation"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={formik.errors.password_confirmation}
              />
              <Button
                isLoading={isLoading}
                className="w-full bg-[#E9522C]"
              >
                S'inscrire
              </Button>
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
