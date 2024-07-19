// Importa el tipo Document de mongoose, que representa un documento en la base de datos
import { Document } from 'mongoose';
// Importa el tipo Request de express, que representa una solicitud HTTP
import { Request } from 'express';

// Definición de la interfaz para el usuario que extiende Document de mongoose
// Esto asegura que el usuario tenga las propiedades definidas y sea tratado como un documento de mongoose
export interface IUser extends Document {
  uid: string;                  // ID en base de datos
  firstName: string;           // Primer nombre del usuario
  lastName: string;            // Apellido del usuario
  email: string;               // Correo electrónico del usuario
  phone?: string;               // Número de teléfono del usuario
  age?: number;                 // Edad del usuario
  password: string;            // Contraseña del usuario, encriptada
  resetPasswordToken?: string; // Token opcional para restablecer la contraseña
  resetPasswordExpires?: number; // Timestamp opcional de expiración del token de restablecimiento de contraseña
}

// Extensión de la interfaz Request de Express para incluir la propiedad opcional user
// Esto permite acceder a req.user y tipificarlo como IUser en las rutas y controladores
export interface AuthenticatedRequest extends Request {
  user?: IUser; // La propiedad user puede ser de tipo IUser o no estar definida
}


//**Este enfoque garantiza que cualquier lugar en tu aplicación donde se acceda a req.user, se reconozca y 
//**se maneje como un objeto IUser, proporcionando beneficios de autocompletado y verificación de tipos de TypeScript.