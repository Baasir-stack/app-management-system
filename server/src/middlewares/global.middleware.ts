import { Request, Response, NextFunction } from "express";
import {  passwordSchema } from "../validations/global.validation";
import Joi from "joi";

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { error } = passwordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


export const validateApp = (schema: Joi.ObjectSchema) => {
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