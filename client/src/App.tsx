// App.tsx

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Importa hooks de Auth0 para la autenticación
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación de React Router

const App = () => {
  const { isLoading, isAuthenticated, error, user, logout } = useAuth0(); // Obtiene estados y métodos de Auth0
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Muestra un mensaje de carga mientras se obtienen los datos de autenticación
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Muestra un mensaje de error si ocurre algún problema con la autenticación
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Muestra contenido si el usuario está autenticado
  if (isAuthenticated) {
    return (
      <div>
        Bienvenido {user?.name} {/* Muestra el nombre del usuario autenticado */}
        <button onClick={() => {
          logout(); // Cierra sesión
          navigate('/'); // Navega a la página principal después de cerrar sesión
        }}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  // Muestra la landing page si el usuario no está autenticado
  return (
    <div>
      <h1>Landing page</h1>
      <button onClick={() => navigate('/auth')}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default App; // Exporta el componente App
