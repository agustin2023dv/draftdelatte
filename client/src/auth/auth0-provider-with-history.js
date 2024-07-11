import React from 'react';
import { useHistory } from 'react-router-dom'; // Importa el hook de historial de React Router
import { Auth0Provider } from '@auth0/auth0-react'; // Importa el proveedor de Auth0 para React

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN; // Obtiene el dominio de Auth0 de las variables de entorno
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; // Obtiene el ID del cliente de Auth0 de las variables de entorno

  const history = useHistory(); // Hook para acceder al historial de navegación

  // Función de callback para manejar redirecciones después de la autenticación
  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname); // Navega a la ruta almacenada en appState o a la ruta actual
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin} // Configura la URI de redirección después de la autenticación
      onRedirectCallback={onRedirectCallback} // Asigna la función de callback de redirección
    >
      {children} {/* Renderiza los componentes hijos dentro del proveedor de Auth0 */}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;