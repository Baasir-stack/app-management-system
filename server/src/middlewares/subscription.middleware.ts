import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateSubscriptionRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((detail) => detail.message).join(', '),
      });
    }
    next();
  };
};
