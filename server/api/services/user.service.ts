import User from '../../models/User';
import bcrypt from 'bcrypt';
import { encryptPassword } from './encrypton.service';

//* LOGICA RELACIONADA CON LA BD . Servicio para la lógica de usuarios.

//**Función para crear un nuevo usuario en MongoDB
export const createUser = async (userData: any) => {
  try {
    const { firstName, lastName, email, phone, age, password } = userData;

    console.log('Datos recibidos en createUser:', userData); // Log para depuración

    // Verifica si todas las propiedades obligatorias están presentes
    if (!firstName || !lastName || !email || !password) {
      throw new Error('Todos los campos obligatorios deben ser proporcionados');
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      age,
      password 
    });

    console.log('Guardando nuevo usuario en la BD:', newUser); // Log para depuración

    return await newUser.save(); // Guarda el nuevo usuario en la base de datos y devuelve el documento guardado
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error en createUser:', errorMessage); // Log para depuración
    throw new Error('Error al crear el usuario: ' + errorMessage);
  }
};
//**Función para obtener un usuario por su correo electrónico en MongoDB
export const getUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ email }); // Busca un usuario en la base de datos por su correo electrónico y devuelve el documento encontrado
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error('Error al obtener el usuario por correo electrónico: ' + errorMessage);
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
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error('Error al restablecer la contraseña: ' + errorMessage);
  }
};
