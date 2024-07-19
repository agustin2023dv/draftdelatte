// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa el archivo CSS principal
import App from './App'; // Importa el componente principal de la aplicación
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa componentes de React Router
/* Importación de pages */
import SignUp from 'pages/SignUp';
import Login from 'pages/Login';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Perfil from 'pages/Profile';




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
    
      {/* Configura el enrutador de la aplicación */}
      <Router>
        <Routes>

          <Route path="/" element={<App />} /> 
          <Route path="/login" element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
