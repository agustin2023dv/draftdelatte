// index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from './pages/Auth/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

// Obtiene el dominio y el ID del cliente de Auth0 de las variables de entorno
const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;

// Verifica que las variables de entorno necesarias estén definidas
if (!domain || !clientId) {
  throw new Error('Las variables de entorno REACT_APP_AUTH0_DOMAIN y REACT_APP_AUTH0_CLIENT_ID deben estar definidas.');
}

// Obtiene el elemento raíz del DOM
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento root');
}

// Crea la raíz de React
const root = ReactDOM.createRoot(rootElement);

// Renderiza la aplicación dentro del proveedor de Auth0 y configura las rutas
root.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} /> {/*Ruta principal que carga el componente App*/}
          <Route path="/auth" element={<Auth />} /> {/*Ruta de autenticación que carga el componente Auth para login y register*/}
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
