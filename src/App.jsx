import { useState } from 'react'
import reactLogo from './assets/wfdguinee.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppBody from './components/AppBody'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './screens/front/Home'
import Login from './screens/Login'
import CoursScreen from './screens/front/CoursScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={     <Home/>  } />  
      <Route path="/login" element={     <Login/>  } />  
      <Route path="/page-cours" element={     <CoursScreen/>  } />  
    </Routes>
    </Router>

  )
}

export default App
