import Joi from 'joi';

export const loadEnvironment = () => {

  const envSchema = Joi.object({
    PORT: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
  }).unknown();

  const { error } = envSchema.validate(process.env);
  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }
};

