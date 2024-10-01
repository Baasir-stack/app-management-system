import {  Response } from 'express';
import User from '../models/user.model'; 
import { IRequestUser } from '../../src/interfaces/user.interface';
import { uploadImageToCloudinary } from '../utils/handlingAvatar';
import cloudinary from '../config/cloudinary';

/**
 * @desc    change profile(first and last name)
 * @route   PATCH /api/users/me/
 * @access  Private
 */
export const getProfile = async (req: IRequestUser, res: Response) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).select('-password'); 

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error in getProfile controller', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


/**
 * @desc    Update user profile (first name, last name, avatar)
 * @route   PATCH /api/users/me/
 * @access  Private
 */
export const updateProfile = async (req: IRequestUser, res: Response) => {
  try {
    const { firstName, lastName, avatar } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

  
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

 
    if (avatar) {
      if (user.avatar) {
        const publicId = user.avatar.split('/').pop().split('.')[0]; 

        await cloudinary.uploader.destroy(publicId);
      }
      const secureUrl = await uploadImageToCloudinary(Buffer.from(avatar, 'base64')); 
      user.avatar = secureUrl; 
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Error in updateProfile controller', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * @desc    change password
 * @route   PUT /api/users/me/password
 * @access  Private
 */
export const updatePassword = async (req: IRequestUser, res: Response) => {
  try {
    const { password, confirmPassword } = req.body;
    const userId = req.userId; 

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.password = password;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error('Error in updatePassword controller', error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
