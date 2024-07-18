import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Correo de restablecimiento de contraseña enviado.');
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError('Error al enviar el correo de restablecimiento de contraseña.');
        setMessage(null);
      });
  };

  return (
    <form onSubmit={handlePasswordReset} className="flex flex-col max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Restablecer Contraseña</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo Electrónico"
        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Enviar Correo de Restablecimiento
      </button>
    </form>
  );
};

export default ForgotPassword;
