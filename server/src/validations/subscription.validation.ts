import Joi from 'joi';

export const createSubscriptionSchema = Joi.object({
  subsType: Joi.string().required().messages({
    'string.base': 'Subscription type must be a string',
    'string.empty': 'Subscription type is required',
  }),
  appId: Joi.string().required().messages({
    'string.base': 'App ID must be a string',
    'string.empty': 'App ID is required',
  }),
});
