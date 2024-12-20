import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite'
import App from './App.jsx'
import '@fontsource/merriweather'; // Import par défaut
import '@fontsource/merriweather/400.css'; // Regular
import '@fontsource/merriweather/400-italic.css'; // Italique
import '@fontsource/merriweather/700.css'; // Bold



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
