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

// export const loadEnvironment = () => {
  
  
//     // if (!process.env.PORT) {
//     //   throw new Error('Environment validation error: PORT is required');
//     // }
    
//     // if (!process.env.MONGO_URI) {
//     //   throw new Error('Environment validation error: MONGO_URI is required');
//     // }
  
//     // Optional: Log loaded variables
//     console.log('Loaded Environment Variables:', process.env.PORT, process.env.MONGO_URI);
//   };
