import { Router } from 'express';
import { registerUserController, loginUserController,  resetPasswordController, getUserController } from '../controllers/user.controller';
import { registerValidation, loginValidation } from '../../middlewares/validation.middleware';
import authMiddleware from '../../middlewares/auth.middleware';

const router = Router();

// Ruta para registrar un nuevo usuario con validación
router.post('/sign-up', registerValidation, registerUserController);

// Ruta para obtener un usuario por su correo electrónico
router.get('/user/:email', getUserController);

// Ruta para login de usuario con validación
router.post('/login', loginValidation, loginUserController);

// Ruta para restablecer la contraseña de un usuario
router.post('/reset-password', resetPasswordController);

// Ruta protegida para obtener información del usuario autenticado
router.get('/profile', authMiddleware, getUserController);

export default router;
