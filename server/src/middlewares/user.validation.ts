import { Request, Response, NextFunction } from 'express';
import { updateProfileSchema } from '../validations/user.validation';

// Middleware for validating user profile update (firstName and lastName)
export const validateUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateProfileSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next(); // Continue to the next middleware or controller if validation passes
};


