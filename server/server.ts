import express from 'express';
import connectDB from './db';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './api/routes/user.routes';

// Cargar las variables de entorno del archivo .env.development
dotenv.config({ path: '../client/.env.development' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Definir una ruta de prueba
app.get('/api/user/test', (req, res) => {
  res.json({ message: 'Ruta de prueba funcionando' });
})
// Montar las rutas de usuario
app.use('/api/user', userRoutes);
// Servir el frontend estático
app.use(express.static(path.join(__dirname, '../client/build')));

// Manejar todas las demás rutas con el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

export default app;
