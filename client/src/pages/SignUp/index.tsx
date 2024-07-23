import React, { useState } from 'react';
import { registerUser } from '../../api/userApi'; 
import { auth, googleProvider, facebookProvider } from '../../firebase/firebaseConfig';
import { signInWithPopup } from "firebase/auth";
import { validateFirstName, validateLastName, validateEmail, validatePassword, validateConfirmPassword } from '../../validation';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError
      });
      return;
    }

    try {
      const newUser = await registerUser({ firstName, lastName, email, password });
      console.log('Usuario registrado:', newUser);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const handleGoogleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFacebookSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Registrarse</h2>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Nombre"
        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Apellido"
        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo Electrónico"
        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmar Contraseña"
        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
      <button
        type="submit"
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Registrarse
      </button>
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="mb-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
      >
        Registrarse con Google
      </button>
      <button
        type="button"
        onClick={handleFacebookSignup}
        className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors"
      >
        Registrarse con Facebook
      </button>

      <div>
        <p>¿Ya tienes una cuenta?</p>
        <a
          href="/login"
          className="text-blue-500 hover:underline text-center"
        >
          Inicia sesión
        </a>
      </div>
    </form>
  );
};

export default Signup;
