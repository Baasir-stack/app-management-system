import bcrypt from 'bcryptjs';
export const isCurrentPasswordCorrect = async (currentPassword: string, storedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(currentPassword, storedPassword);
  };