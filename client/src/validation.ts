const nameRegex = /^[A-Za-z]+$/;

export const validateFirstName = (firstName: string): string | null => {
  if (!firstName) {
    return 'El nombre es obligatorio';
  } else if (firstName.length > 20) {
    return 'El nombre no puede tener más de 20 caracteres';
  } else if (!nameRegex.test(firstName)) {
    return 'El nombre solo puede contener letras';
  }
  return null;
};

export const validateLastName = (lastName: string): string | null => {
  if (!lastName) {
    return 'El apellido es obligatorio';
  } else if (lastName.length > 20) {
    return 'El apellido no puede tener más de 20 caracteres';
  } else if (!nameRegex.test(lastName)) {
    return 'El apellido solo puede contener letras';
  }
  return null;
};

const emailRegex = /^[^@]+@\w+(\.\w+)+\w$/;
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'El correo electrónico es obligatorio';
  } else if (!emailRegex.test(email)) {
    return 'El correo electrónico contiene caracteres inválidos';
  }
  return null;
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'La contraseña es obligatoria';
  } else if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  } else if (!passwordRegex.test(password)) {
    return 'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un símbolo especial';
  }
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Debe confirmar la contraseña';
  } else if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }
  return null;
};
