// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa el archivo CSS principal
import App from './App'; // Importa el componente principal de la aplicación
import Auth from './pages/Auth/Auth'; // Importa la página de autenticación
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa componentes de React Router
import { Auth0Provider } from '@auth0/auth0-react'; // Importa el proveedor de Auth0

// Obtiene el dominio y el ID del cliente de Auth0 desde las variables de entorno
const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const redirectUri = window.location.origin; // La URL a la que Auth0 redirige después de la autenticación

// Verifica que las variables de entorno estén definidas
if (!domain || !clientId) {
  throw new Error('Las variables de entorno REACT_APP_AUTH0_DOMAIN y REACT_APP_AUTH0_CLIENT_ID deben estar definidas.');
}

// Obtiene el elemento root del DOM
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento root');
}

// Crea el contenedor de la raíz de la aplicación
const root = ReactDOM.createRoot(rootElement);

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    {/* Configura el proveedor de Auth0 */}
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
    >
      {/* Configura el enrutador de la aplicación */}
      <Router>
        <Routes>
          {/* Define las rutas de la aplicación */}
          <Route path="/" element={<App />} /> 
          <Route path="/auth" element={<Auth />} /> 
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
