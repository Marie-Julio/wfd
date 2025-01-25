import logo from "../assets/wfdguinee.png"
import background from "../assets/slide-5.jpg";
import { postResource } from "../services/api";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Input } from "../components/admin/common/Input";
import useAuth from "../hooks/useAuth";
import { errorMessage, onServerError, onServerSuccess } from "../services/Helper";
import Button from "../components/admin/common/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import logo2 from "../assets/wfdguinee.png";

const LoginScreen = () => {
    const [loading, setLoading] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()

    const saveData = (data) => {
        setLoading(true)
        postResource("login", data).then((res) => {
            // console.log(res.data)
            auth.login(res.data.access_token)
            const token = res.data.access_token ? jwtDecode(res.data.access_token) : null;
            formik.resetForm();
            setLoading(false)
            onServerSuccess("Connexion réussie")
            if (token.role === "participant")
                setTimeout(() => navigate("/"), 100)
            else setTimeout(() => navigate("/admin/dashboard"), 100)
        }).catch(e => {
            setLoading(false)
            onServerError("Identifiants fournies sont invalides.")
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
    <div class="h-screen md:flex">
	<div class="relative overflow-hidden md:flex w-2/5 justify-around items-center hidden bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
        <div className="pl-10">
			<a href="/" className="text-white"><h1 class="hover:text-[#1a5fa9] font-bold text-3xl transform transition-all duration-500 hover:scale-105">WELT FRIEDENS DIENST e.V</h1></a>
			<p class="text-white mt-1">Service mondiale pour la paix</p>
		</div>
	</div>
	<div class="md:flex md:w-3/5 md:justify-center py-10 items-center bg-white">
        <form className="space-y-4 md:space-y-4" onSubmit={formik.handleSubmit}>
            <div class="md:hidden bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
                <div className="px-5 py-14">
                    <a href="/" className="text-white"><h1 class="hover:text-[#1a5fa9] font-bold text-2xl transition-all duration-500 hover:scale-105">WELT FRIEDENS DIENST e.V</h1></a>
                    <p class="text-white mt-1">Service mondiale pour la paix</p>
                </div>
            </div>
            <div className="px-5 md:px-0">
                <a href="/"><img src={logo2} className="h-12 mt-10 md:mt-0" alt="Logo" /></a><br />
                <h1 class="pt-5 md:pt-0 text-gray-800 font-bold text-2xl mb-1">Se connecter</h1>
                <p class="text-sm font-normal text-gray-600 mb-7">Connectez-vous à votre compte</p>
                <div class="flex items-center border-2 hover:border-orange-500 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input required class="pl-2 outline-none border-none w-full" name="email" type="email" value={formik.values.email}
                        onChange={formik.handleChange} placeholder="E-mail" />
                </div>
                <div class="flex items-center border-2 hover:border-orange-500 py-2 px-3 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd" />
                    </svg>
                    <input required class="pl-2 outline-none border-none w-full" name="password" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Mot de passe" />
                </div>
                <div class="pt-2 hover:text-[#1a5fa9]"><Link to="/reset-password">Mot de passe oublié ?</Link></div>
                <Button isLoading={loading} className="block w-full bg-orange-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:text-gray-200 hover:bg-orange-700 focus:outline-none transition-all">Se connecter</Button>
                
                <div className="text-center pt-5">Vous n’avez pas encore de compte ? <Link to="/register" className=" underline text-indigo-600 hover:text-orange-500 transform transition-all duration-500 hover:scale-110">S'inscrire</Link></div>
            </div>
        </form>
	</div>
</div>
     );
}
 
export default LoginScreen;