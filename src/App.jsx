import { useState } from 'react'
import reactLogo from './assets/wfdguinee.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppBody from './components/AppBody'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './screens/front/Home'
import Login from './screens/Login'
import CoursScreen from './screens/front/CoursScreen'
import { AdminHome } from './screens/admin'
import Cours from './screens/admin/cours'
import CoursDetail from './screens/front/CoursDetail'
import QuizInterface from './screens/front/Quizz'
import MemberProfile from './screens/front/MemberProfile'
import Information from './screens/front/Information'
import Register from './screens/Register'
import ForumScreen from './screens/front/Forum'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={  <Home/>  } />  
      <Route path="/login" element={  <Login/>  } />  
      <Route path="/register" element={  <Register/>  } />  
      <Route path="/page-cours" element={  <CoursScreen/>  } />  
      <Route path="/page-detail" element={  <CoursDetail />  } />  
      <Route path="/page-quizz" element={  <QuizInterface />  } />  
      <Route path="/page-profil-member" element={ <MemberProfile />  } />  
      <Route path="/pages-infos" element={ <Information />  } />  
      <Route path="/pages-forum" element={ <ForumScreen />  } />  
     

       {/* Screen admin  */}
       <Route path="/admin/dashboard" element={     <AdminHome/>  } /> 
      <Route path="/admin/cours" element={     <Cours/>  } /> 
    </Routes>
    </Router>

  )
}

export default App
