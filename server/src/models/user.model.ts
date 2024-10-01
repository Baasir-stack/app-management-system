/* eslint-disable @typescript-eslint/no-this-alias */
import  { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserModel } from '../interfaces/user.interface';

// User schema definition
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
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Instance method to compare passwords
userSchema.methods.isPasswordMatch = async function (password: string) {
  // Await the comparison to get the result


  const isMatch = await bcrypt.compare(password, this.password);
 
  return isMatch; // Return the result
};

userSchema.methods.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

// Static method to check if email is taken
userSchema.statics.isEmailTaken = async function (email: string, excludeUserId?: string) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await user.hashPassword(user.password);
  }
  next();
});

// Create User model with schema and interface
const User = model<IUser, UserModel>('User', userSchema);

export default User;
