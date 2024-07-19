import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const oobCode = query.get('oobCode');

  useEffect(() => {
    if (!oobCode) {
      setError('No se proporcionó un código válido.');
      navigate('/login'); // Redirige al usuario si no hay `oobCode` en la URL
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => {
        setIsValidToken(true);
      })
      .catch(() => {
        setError('El enlace para restablecer la contraseña no es válido o ha expirado.');
        navigate('/login'); // Redirige al usuario si el `oobCode` no es válido
      });
  }, [oobCode, navigate]);

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (oobCode) {
      confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => {
          setMessage('Contraseña restablecida con éxito. Redirigiendo a la página de inicio de sesión...');
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        })
        .catch(() => {
          setError('Error al restablecer la contraseña.');
        });
    }
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Restablecer Contraseña</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {isValidToken && (
        <form onSubmit={handlePasswordReset}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva Contraseña"
            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirmar Nueva Contraseña"
            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Restablecer Contraseña
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
