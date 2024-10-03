import { Document, Model } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'app_owner';
  status: 'active' | 'inactive' | 'block';
  resetPasswordToken: string | undefined;
  resetPasswordExpiresAt: Date | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  isPasswordMatch: (password: string) => Promise<boolean>;
  hashPassword: (password: string) => Promise<string>;
}

export interface UserModel extends Model<IUser> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
}

export interface IRequestUser extends Request{
  userId: string
}
