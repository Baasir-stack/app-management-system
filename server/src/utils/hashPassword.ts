import bcrypt from 'bcryptjs';

// Function to hash passwords
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
