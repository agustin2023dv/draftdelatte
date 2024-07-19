import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest, IUser } from '../common/Interfaces';
import User from '../models/User'; // Asegúrate de importar tu modelo de usuario

// Inicializar la aplicación de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require('../serviceAccountKey.json'))
});

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado, falta el token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Buscar usuario adicional en la base de datos si es necesario
    const userRecord = await User.findOne({ uid: decodedToken.uid });
    if (!userRecord) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Asignar el documento completo de Mongoose a req.user
    req.user = userRecord as IUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
};

export default authMiddleware;
