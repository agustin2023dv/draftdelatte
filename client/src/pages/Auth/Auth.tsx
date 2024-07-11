import React, { useEffect } from 'react';
import Auth0Lock from 'auth0-lock';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Auth.css'; 

const Auth: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0(); // Desestructuración de métodos y estado de Auth0
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    // Configuración de Auth0Lock con los parámetros necesarios
    const lock = new Auth0Lock(
      process.env.REACT_APP_AUTH0_CLIENT_ID!, // ID del cliente de Auth0
      process.env.REACT_APP_AUTH0_DOMAIN!, // Dominio de Auth0
      {
        auth: {
          redirectUrl: `${window.location.origin}/auth`, // URL de redirección después de la autenticación
          responseType: 'token id_token', // Tipos de respuesta
          params: {
            scope: 'openid profile email offline_access', // Alcance de los permisos
          },
        },
        allowedConnections: ["delatteDB-connection", "facebook", "google-oauth2"], // Conexiones permitidas
        additionalSignUpFields: [
          {
            name: "name",
            placeholder: "Ingresa tu nombre" // Campo adicional para el registro
          },{
            name: "last_name",
            placeholder: "Ingresa tu apellido" // Campo adicional para el apellido
          }
        ],
        languageDictionary: {
          title: "Bienvenido a Delatte",
          signInTitle: "Iniciar sesión en Delatte",
          signUpTitle: "Registrarse en Delatte",
          signUpTerms: "Al registrarte, aceptas nuestros términos y condiciones.",
          emailInputPlaceholder: "tu-correo-electronico@ejemplo.com",
          passwordInputPlaceholder: "Tu contraseña",
          signInText: "Por favor, inicia sesión para continuar",
          forgotPasswordAction: "¿Olvidaste tu contraseña?",
          lastLoginInstructions: "Última vez que iniciaste sesión con",
          loginLabel: "Iniciar sesión",
          loginSubmitLabel: "Iniciar sesión",
          loginWithLabel: "Iniciar sesión con",
          signUpLabel: "Registrarse",
          signUpSubmitLabel: "Crear cuenta",
          signUpWithLabel: "Registrarse con",
          socialLoginInstructions: ""
        },
        theme: {
          primaryColor: "#b81b1c", // Color primario del tema
          logo: "https://example.com/logo.png" // Logo de la aplicación
        },
        rememberLastLogin: false, // No recordar el último inicio de sesión
        autoclose: true, // Cerrar automáticamente después de iniciar sesión
        autofocus: true, // Autofocus en el formulario
      }
    );

    lock.on("hide", () => {
      navigate('/', { replace: true }); // Redirige a la landing page al cerrar el formulario
    });

    lock.on("authorization_error", () => {
      navigate('/auth', { replace: true }); // Redirige a la página de autenticación en caso de error
    });

    lock.show(); // Muestra el formulario de Auth0

  }, [navigate]);

  useEffect(() => {
    const handleAuth = async () => {
      if (isAuthenticated) {
        try {
          await getAccessTokenSilently(); // Obtiene el token de acceso de manera silenciosa
          navigate('/', { replace: true }); // Redirige a la landing page si está autenticado
        } catch {
          navigate('/auth', { replace: true }); // Redirige a la página de autenticación en caso de error
        }
      }
    };

    handleAuth(); // Llama a la función de manejo de autenticación
  }, [isAuthenticated, getAccessTokenSilently, navigate]);

  return <div id="auth0-lock-container" />; // Contenedor del formulario de Auth0
};

export default Auth;
