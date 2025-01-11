import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite'
import App from './App.jsx'
import '@fontsource/merriweather'; // Import par défaut
import '@fontsource/merriweather/400.css'; // Regular
import '@fontsource/merriweather/400-italic.css'; // Italique
import '@fontsource/merriweather/700.css'; // Bold
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from './context/AuthProvider.jsx'
import { persistor, store } from './store/store.js'



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
