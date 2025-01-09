import logo from "../assets/wfdguinee.png"
import background from "../assets/slide-2.jpg";
import { postResource } from "../services/api";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Input } from "../components/admin/common/Input";
import useAuth from "../hooks/useAuth";
import { errorMessage } from "../services/Helper";

const Login = () => {
    const auth = useAuth()

    const saveData = (data) => {
        // console.log(data)
        postResource("login", data).then((res) => {
            onServerSuccess("Connexion reussie!!!")
            auth.login(res.data.token)
            formik.resetForm();
            setLoading(false)
            setTimeout(() => navigate("/"), 1500)
        }).catch(e => {
            setLoading(false)
            errorMessage(e)
            // console.log(e)
          })
    }

    const formik = useFormik({
        initialValues: {
            password : '',
            identifiant: ''
        },
        validationSchema: Yup.object({
            identifiant: Yup.string().required('Champ requis'),
            password: Yup.string().required('Champ requis')
        }),
        onSubmit: async (values) => {
            setLoading(true)
            saveData(values) 
        },
    });


    return ( 
        <section class="bg-gray-50 dark:bg-gray-900 bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url(${background})` }}>
             {/* Superposition avec opacité */}
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-50 h-20 mr-2" src={logo} alt="logo"/>
                WFDGuinee    
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Connectez-vous à votre compte
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
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
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Se rappeler de moi</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Mot de passe oublié ?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-custom-gradient hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connexion</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Vous n’avez pas encore de compte ? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
     );
}
 
export default Login;