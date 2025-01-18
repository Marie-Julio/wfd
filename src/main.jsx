import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'flowbite'
import App from './App.jsx'
import '@fontsource/montserrat'; // Import par défaut
import '@fontsource/montserrat/400.css'; // Regular
import '@fontsource/montserrat/400-italic.css'; // Italique
import '@fontsource/montserrat/700.css'; // Bold
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from './context/AuthProvider.jsx'
import { persistor, store } from './store/store.js'
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
