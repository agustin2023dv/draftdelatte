import mongoose, { Schema } from 'mongoose';
import { IUser } from '../common/Interfaces';
import bcrypt from 'bcrypt';

// Definición del esquema para el usuario
const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  age: { type: Number },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Number },
}, { timestamps: true });

// Middleware para encriptar la contraseña antes de guardar el usuario
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporta el modelo de usuario
const User = mongoose.model<IUser>('User', userSchema, 'usuarios');

export default User;
