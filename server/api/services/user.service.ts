import User from '../../models/User';
import bcrypt from 'bcrypt';

//* LOGICA RELACIONADA CON LA BD . Servicio para la lógica de usuarios.

//**Función para crear un nuevo usuario en MongoDB
export const createUser = async (userData: any) => {
  try {
    const { uid, firstName, lastName, email, phone, age, password } = userData;

    // Verifica si todas las propiedades obligatorias están presentes
    if (!uid || !firstName || !lastName || !email || !password) {
      throw new Error('Todos los campos obligatorios deben ser proporcionados');
    }

    const salt = await bcrypt.genSalt(10); // Genera un salt para encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña usando el salt generado
    const newUser = new User({ 
      uid, 
      firstName, 
      lastName, 
      email, 
      phone, 
      age, 
      password: hashedPassword 
    }); // Crea un nuevo documento de usuario con los datos proporcionados, incluyendo la contraseña encriptada

    return await newUser.save(); // Guarda el nuevo usuario en la base de datos y devuelve el documento guardado
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

//**Función para obtener un usuario por su correo electrónico en MongoDB
export const getUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ email }); // Busca un usuario en la base de datos por su correo electrónico y devuelve el documento encontrado
  } catch (error) {
    throw new Error('Error al obtener el usuario por correo electrónico: ' + error.message);
  }
};

//**Función para actualizar la contraseña de un usuario en MongoDB
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const salt = await bcrypt.genSalt(10); // Genera un salt para encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, salt); // Encripta la nueva contraseña usando el salt generado
    user.password = hashedPassword; // Actualiza la contraseña del usuario
    return await user.save(); // Guarda los cambios en la base de datos y devuelve el documento actualizado
  } catch (error) {
    throw new Error('Error al restablecer la contraseña: ' + error.message);
  }
};
