import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../validation'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);

    if (emailValidationError) {
      setEmailError(emailValidationError);
      setError(null);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate('/'); // Redirige al usuario después de iniciar sesión
      })
      .catch((error) => {
        console.error(error);
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      });
  };

  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        navigate('/'); // Redirige al usuario después de iniciar sesión
      })
      .catch((error) => {
        console.error(error);
        setError('Error al iniciar sesión con Google.');
      });
  };

  const handleFacebookLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result.user);
        navigate('/'); // Redirige al usuario después de iniciar sesión
      })
      .catch((error) => {
        console.error(error);
        setError('Error al iniciar sesión con Facebook.');
      });
  };

  const redirectToPasswordReset = () => {
    navigate('/forgot-password');
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(null);
          }}
          placeholder="Correo Electrónico"
          className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mb-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Iniciar Sesión con Google
        </button>
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors"
        >
          Iniciar Sesión con Facebook
        </button>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={redirectToPasswordReset}
            className="text-blue-500 hover:underline"
          >
            ¿Olvidó su contraseña?
          </button>
        </div>

      <div className="pt-4 mb-0">
       
         <p>
         ¿Todavía no tiene una cuenta?
          </p>   <a href="/sign-up" className="text-blue-500 hover:underline text-center"
          >¡Regístrate ahora!
        </a>
      </div>
      </form>
      
    </div>
  );
};

export default Login;
