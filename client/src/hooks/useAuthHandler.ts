// src/hooks/useAuthHandler.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import getAuth0Lock from '../utils/auth0config';

export const useAuthHandler = () => {
  // Extrae los métodos y estados necesarios de Auth0
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  // Hook de React Router para la navegación
  const navigate = useNavigate();

  // Efecto que se ejecuta cuando el componente se monta y cuando cambia la autenticación o la navegación
  useEffect(() => {
    // Si el usuario no está autenticado, se muestra el Auth0 Lock
    if (!isAuthenticated) {
      const lock = getAuth0Lock(navigate);
      lock.show();

      // Limpieza: oculta el lock cuando el componente se desmonta
      return () => lock.hide();
    }
  }, [navigate, isAuthenticated]);

  // Efecto que se ejecuta cuando cambia la autenticación
  useEffect(() => {
    const handleAuth = async () => {
      // Si el usuario está autenticado, intenta obtener el token de acceso silenciosamente
      if (isAuthenticated) {
        try {
          await getAccessTokenSilently();
          // Redirige al usuario a la página principal
          navigate('/', { replace: true });
        } catch (error) {
          // Muestra un mensaje de error en la consola si no se puede obtener el token de acceso
          console.error('Error al obtener el token de acceso:', error);
        }
      }
    };

    // Llama a la función handleAuth para manejar la autenticación
    handleAuth();
  }, [isAuthenticated, getAccessTokenSilently, navigate]);
};
