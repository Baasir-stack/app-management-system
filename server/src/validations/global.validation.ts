import Joi from "joi";

export const passwordSchema = Joi.object({
    password: Joi.string().min(8).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Confirm Password must match Password',
      'string.empty': 'Confirm Password is required',
    }),
});


export const AppSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
  }),
  desc: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
  }),
  status: Joi.string()
    .valid('active', 'inactive')
    .required()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': 'Status must be either active or inactive',
      'string.empty': 'Status is required',
    }),

});