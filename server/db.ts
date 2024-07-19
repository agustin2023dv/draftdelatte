import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env.development
dotenv.config({ path: '../client/.env.development' });

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Por favor, define la URI de MongoDB a las variables de entorno");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1); // Salir del proceso con error
  }
};

export default connectDB;
