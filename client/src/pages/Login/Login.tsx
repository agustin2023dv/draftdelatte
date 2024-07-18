import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
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
    <form onSubmit={handleLogin} className="flex flex-col max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo Electrónico"
        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
      <button
        type="button"
        onClick={redirectToPasswordReset}
        className="text-blue-500 mt-4 hover:underline"
      >
        ¿Olvidó su contraseña?
      </button>
    </form>
  );
};

export default Login;
