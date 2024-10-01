import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema,  forgetPasswordSchema } from '../validations/auth.validation';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};



export const validateForgetPassword = (req: Request, res: Response, next: NextFunction) => {
  const { error } = forgetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};