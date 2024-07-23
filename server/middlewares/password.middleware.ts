import { NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../common/Interfaces';

// Middleware para encriptar la contraseña antes de guardar el usuario
export const encryptPassword = async function (this: IUser, next: NextFunction) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
};
