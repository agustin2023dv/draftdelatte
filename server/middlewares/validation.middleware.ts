import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Caracteres especiales permitidos en el email
const emailRegex = /^[^@]+@\w+(\.\w+)+\w$/;

//**Validación para el registro
export const registerValidation = [
  body('email').isEmail().withMessage('Ingrese un correo electrónico válido')
    .matches(emailRegex).withMessage('El correo electrónico contiene caracteres inválidos'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un símbolo especial'),
  body('firstName').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio'),
  body('lastName').not().isEmpty().trim().escape().withMessage('El apellido es obligatorio'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

//**Validación para el login
export const loginValidation = [
  body('email').isEmail().withMessage('Ingrese un correo electrónico válido')
    .matches(emailRegex).withMessage('El correo electrónico contiene caracteres inválidos'),
  body('password').not().isEmpty().withMessage('La contraseña es obligatoria'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
