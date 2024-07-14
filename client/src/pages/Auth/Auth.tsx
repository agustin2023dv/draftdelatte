// src/pages/Auth/Auth.tsx
import React from 'react';
import { useAuthHandler } from '../../hooks/useAuthHandler'; // Importa el hook personalizado para manejar la autenticación
import './Auth.css'; // Importa el archivo CSS específico para la página de autenticación

const Auth: React.FC = () => {
  // Llama al hook useAuthHandler para manejar la lógica de autenticación
  useAuthHandler();

  // Renderiza el contenedor para el formulario de Auth0
  return <div id="auth0-lock-container" />;
};

export default Auth;
