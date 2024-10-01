import { Request, Response, NextFunction } from "express";
import { AppSchema, passwordSchema } from "../validations/global.validation";

// Middleware for validating reset password
export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { error } = passwordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


export const validateApp = (req: Request, res: Response, next: NextFunction) => {
  const { error } = AppSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};