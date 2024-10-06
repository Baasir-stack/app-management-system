import {  Response } from 'express';
import User from '../models/user.model'; 
import { IRequestUser } from '../interfaces/user.interface';
import { uploadImageToCloudinary } from '../utils/handlingAvatar';
import { isCurrentPasswordCorrect } from '../utils/checkingPassword';
import { MulterRequest } from '../interfaces/global.interface';

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
    const { firstName, lastName } = req.body;
    const userId = req.userId;



    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

  
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;

 
 
    let avatarUrl = '';

    const documentFile  = (req as unknown as MulterRequest).file;

  
    if (documentFile) {
      avatarUrl = await uploadImageToCloudinary(documentFile.buffer); 
      user.avatar = avatarUrl
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
    const { currentPassword, password, confirmPassword } = req.body; 
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

    const isMatch = await isCurrentPasswordCorrect(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
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
