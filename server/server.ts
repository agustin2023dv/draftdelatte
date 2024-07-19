import express from 'express';
import connectDB from './db';
import dotenv from 'dotenv';
import userRoutes from './api/routes/user.routes';

// Cargar las variables de entorno del archivo .env.development
dotenv.config({ path: '../client/.env.development' });

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Definir 
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Rutas
app.use('/api/user', userRoutes);


export default app;
