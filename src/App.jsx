import { useEffect, useState } from 'react'
import reactLogo from './assets/wfdguinee.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppBody from './components/AppBody'
import { redirect, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './screens/front/Home'
import LoginScreen from './screens/Login'
import CoursScreen from './screens/front/CoursScreen'
import { AdminHome } from './screens/admin'
import Cours from './screens/admin/cours'
import CoursDetail from './screens/front/CoursDetail'
import QuizInterface from './screens/front/Quizz'
import Information from './screens/front/Information'
import Register from './screens/Register'
import ForumScreen from './screens/front/Forum'
import InformationAdmin from './screens/admin/infos'
import FormInfo from './screens/admin/infos/form'
import Promotion from './screens/front/Promotion'
import PromotionAdmin from './screens/admin/promotion'
import InscriptionAdmin from './screens/admin/inscriptions'
import ProjetAdmin from './screens/admin/projets'
import Utilisateur from './screens/admin/utilisateurs'
import NotificationAdmin from './screens/admin/notifications'
import ProjetScreen from './screens/front/ProjetScreen'
import InfoSingle from './screens/front/InfoSingle'
import FormInscription from './screens/admin/inscriptions/form'
import { Flip, ToastContainer } from 'react-toastify'
import FormNotification from './screens/admin/notifications/form'
import FormPromotion from './screens/admin/promotion/form'
import FormCours from './screens/admin/cours/form'
import Profile from './screens/front/Profile'
import { jwtDecode } from 'jwt-decode'
import FormProjet from './screens/admin/projets/form'

function App() {
  const [count, setCount] = useState(0)

  const access_token = localStorage.getItem('token');

  useEffect(() => {

    // Définir un intervalle de 10 minutes
    const intervalId = setInterval(() => {
      if (access_token) {
        const tokenNew = jwtDecode(access_token);
        const now = Math.floor(Date.now() / 1000);
  
        if (tokenNew.exp < now) {
          dispatch({ type: 'LOGOUT' });
          redirect('/login'); // Redirection en cas d'expiration du token
        }
      }
      console.log("Exécution après 10 minutes");
      // Placez ici la logique que vous voulez exécuter
    }, 10 * 60 * 1000); // 10 minutes en millisecondes

    // Nettoyer l'intervalle lorsqu'on quitte le composant
    return () => clearInterval(intervalId);
    
  }, [])

  return (
    <>
    <Router>
      
    <Routes>
      <Route path="/" element={  <Home/>  } />  
      <Route path="/login" element={  <LoginScreen/>  } />  
      <Route path="/register" element={  <Register/>  } />  
      <Route path="/page-cours" element={  <CoursScreen/>  } />  
      <Route path="/page-cours-detail/:id" element={  <CoursDetail />  } />  
      <Route path="/page-quizz/:id" element={  <QuizInterface />  } />  
      <Route path="/page-promotion" element={  <Promotion />  } />  
      <Route path="/page-profil" element={ <Profile />  } />  
      <Route path="/pages-infos" element={ <Information />  } />  
      <Route path="/pages-infos-single/:id" element={ <InfoSingle />  } />  
      <Route path="/pages-forum" element={ <ForumScreen />  } />  
      <Route path="/pages-projet" element={ <ProjetScreen />  } />  
     

       {/* Screen admin  */}
       <Route path="/admin/dashboard" element={     <AdminHome/>  } /> 
      <Route path="/admin/cours" element={     <Cours/>  } /> 
      <Route path="/admin/cours-create" element={     <FormCours/>  } /> 
      <Route path="/admin/cours-update/:id" element={     <FormCours/>  } /> 
      <Route path="/admin/informations" element={     <InformationAdmin />  } /> 
      <Route path="/admin/informations-create" element={     <FormInfo />  } /> 
      <Route path="/admin/informations-update/:id" element={     <FormInfo />  } /> 
      <Route path="/admin/promotion" element={     <PromotionAdmin />  } /> 
      <Route path="/admin/promotion-create" element={     <FormPromotion />  } /> 
      <Route path="/admin/promotion-update/:id" element={     <FormPromotion />  } /> 
      <Route path="/admin/inscription" element={     <InscriptionAdmin />  } /> 
      <Route path="/admin/inscription-create" element={     <FormInscription />  } /> 
      <Route path="/admin/inscription-update/:id" element={     <FormInscription />  } /> 
      <Route path="/admin/projets" element={     <ProjetAdmin />  } /> 
      <Route path="/admin/projets-create" element={     <FormProjet />  } /> 
      <Route path="/admin/projets-update/:id" element={     <FormProjet />  } /> 
      <Route path="/admin/notification" element={     <NotificationAdmin />  } /> 
      <Route path="/admin/notification-create" element={     <FormNotification />  } /> 
      <Route path="/admin/notification-update/:id" element={     <FormNotification />  } /> 
      <Route path="/admin/users" element={     <Utilisateur />  } /> 
    </Routes>
    </Router>
    <ToastContainer autoClose={8000} icon={true} transition={Flip}/>
    </>

  )
}

export default App
