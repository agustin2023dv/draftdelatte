import mongoose, {Schema } from 'mongoose';
import { IUser } from '../common/Interfaces';

// Deficion del esquema para el usuario
const userSchema: Schema = new Schema({
  uid:{type:String,required:true, unique:true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  age: { type: Number},
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Number },
});

// Exporta el modelo de usuario
const User = mongoose.model<IUser>('User', userSchema);

export default User;
