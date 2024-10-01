import Joi from 'joi';


export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).optional().label('First Name'),
  lastName: Joi.string().min(2).max(15).optional().label('Last Name'),
  avatar: Joi.string().optional().allow(''), 
});