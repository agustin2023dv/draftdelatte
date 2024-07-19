import { Request, Response } from 'express';
import { createUser as registerUserService, getUserByEmail, resetPassword as resetPasswordService } from "../services/user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../../common/Interfaces';

//* CONTROLADOR PARA LOS USUARIOS

//**Controlador para registrar un nuevo usuario
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await registerUserService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.toString() });
  }
};

//**Controlador para iniciar sesión de un usuario
export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//**Controlador para solicitar un restablecimiento de contraseña
export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    await resetPasswordService(email, newPassword);
    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Fallo al restablecer la contraseña', error: error.toString() });
  }
};

//**Controlador para obtener información del usuario autenticado
export const getUserController = (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    res.json({ message: 'Usuario autenticado', user: req.user });
  } else {
    res.status(401).json({ message: 'Usuario no autenticado' });
  }
};
