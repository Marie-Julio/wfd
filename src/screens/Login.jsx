import logo from "../assets/wfdguinee.png"
import background from "../assets/slide-2.jpg";
import { postResource } from "../services/api";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Input } from "../components/admin/common/Input";
import useAuth from "../hooks/useAuth";
import { errorMessage, onServerSuccess } from "../services/Helper";
import Button from "../components/admin/common/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const LoginScreen = () => {
    const accessToken = localStorage.getItem("token");
      const decodedToken = accessToken ? jwtDecode(accessToken) : null;
    const [loading, setLoading] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()

    const saveData = (data) => {
        setLoading(true)
        console.log(data)
        postResource("login", data).then((res) => {
            console.log(res.data)
            onServerSuccess("Connexion reussie!!!")
            auth.login(res.data.access_token)
            const token = res.data.access_token ? jwtDecode(res.data.access_token) : null;
            formik.resetForm();
            setLoading(false)
            if (token.role === "participant")
                setTimeout(() => navigate("/"), 300)
            else setTimeout(() => navigate("/admin/dashboard"), 300)
        }).catch(e => {
            setLoading(false)
            errorMessage(e)
            console.log(e)
            // console.log(e)
          })
    }

    const formik = useFormik({
        initialValues: {
            password : '',
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Champ requis'),
            password: Yup.string().required('Champ requis')
        }),
        onSubmit: async (values) => {
            setLoading(true)
            saveData(values) 
            setLoading(false)
        },
    });


    return ( 
        <section className="bg-gray-50 dark:bg-gray-900 bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
             {/* Superposition avec opacité */}
        <div className="absolute inset-0 bg-white bg-opacity-20 pointer-events-none"></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-50 h-20 mr-2" src={logo} alt="logo"/>
                WFDGuinee    
            </a>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Connectez-vous à votre compte
                    </h1>
                    
                    <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email}
                        />
                        <Input
                            label="Mot de passe"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"  />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Se rappeler de moi</label>
                                </div>
                            </div>
                            <Link to="/reset-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Mot de passe oublié ?</Link>
                        </div>
                        <Button isLoading={loading} className="w-full">Connexion</Button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Vous n’avez pas encore de compte ? <Link to="/register" className="font-medium text-orange-500 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    
                </div>
            </div>
            </form>
        </div>
        </section>
     );
}
 
export default LoginScreen;