/* eslint-disable @typescript-eslint/no-this-alias */
import  { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserModel } from '../interfaces/user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['app_owner'],
      default: 'app_owner',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'block'],
      default: 'active',
    },
    resetPasswordToken: { type: String, default: undefined },
    resetPasswordExpiresAt: { type: Date, default: undefined },
    
  },
  {
    timestamps: true, 
  }
);

userSchema.methods.isPasswordMatch = async function (password: string) {

  const isMatch = await bcrypt.compare(password, this.password);
 
  return isMatch; 
};

userSchema.methods.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId?: string) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await user.hashPassword(user.password);
  }
  next();
});


const User = model<IUser, UserModel>('User', userSchema);

export default User;
