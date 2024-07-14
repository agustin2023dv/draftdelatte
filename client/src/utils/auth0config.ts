// src/utils/auth0Config.ts
import Auth0Lock from 'auth0-lock';

// Función para configurar y obtener una instancia de Auth0 Lock
export const getAuth0Lock = (navigate: any) => {
  // Crear una nueva instancia de Auth0 Lock
  const lock = new Auth0Lock(
    process.env.REACT_APP_AUTH0_CLIENT_ID!, // ID del cliente de Auth0 desde las variables de entorno
    process.env.REACT_APP_AUTH0_DOMAIN!, // Dominio de Auth0 desde las variables de entorno
    {
      auth: {
        // URL a la que Auth0 redirigirá después de la autenticación
        redirectUrl: `${window.location.origin}`,
        // Tipo de respuesta para obtener el token de acceso e id_token
        responseType: 'token id_token',
        params: {
          // Alcance de los permisos solicitados
          scope: 'openid profile email offline_access',
        },
      },
      // Conexiones permitidas para autenticación
      allowedConnections: ["delatteDB-connection", "facebook", "google-oauth2"],
      // Campos adicionales para el formulario de registro
      additionalSignUpFields: [
        { name: "name", placeholder: "Ingresa tu nombre" },
        { name: "last_name", placeholder: "Ingresa tu apellido" },
      ],
      // Diccionario de idioma para personalizar los textos de la interfaz
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
      // Configuración del tema para personalizar los colores y el logo
      theme: {
        primaryColor: "#b81b1c", // Color principal
        logo: "https://example.com/logo.png" // URL del logo personalizado
      },
      // Configuración adicional
      rememberLastLogin: false, // No recordar el último inicio de sesión
      autoclose: true, // Cerrar automáticamente el Lock después de autenticarse
      autofocus: true, // Enfocar automáticamente en el primer campo del formulario
    }
  );

  // Evento para manejar cuando el Lock se oculta
  lock.on("hide", () => {
    // Navegar a la página principal cuando el Lock se oculta
    navigate('/', { replace: true });
  });

  // Evento para manejar errores de autorización
  lock.on("authorization_error", () => {
    // Navegar a la página de autenticación en caso de error de autorización
    navigate('/auth', { replace: true });
  });

  // Retornar la instancia de Auth0 Lock
  return lock;
};

export default getAuth0Lock;
