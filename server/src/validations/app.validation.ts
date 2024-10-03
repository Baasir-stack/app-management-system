import Joi from "joi";

export const UpdateAppSchema = Joi.object({
    title: Joi.string().optional().messages({
      'string.base': 'Title must be a string',
    }),
    desc: Joi.string().optional().messages({
      'string.base': 'Description must be a string',
    }),
    status: Joi.string()
      .valid('active', 'inactive')
      .optional()
      .messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be either active or inactive',
      }),
  });