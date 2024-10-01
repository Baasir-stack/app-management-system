import { Request, Response } from 'express';
import App from '../models/app.model'; // Adjust the path as necessary
import catchAsyncError from '../middlewares/catchAsyncError'; // Middleware to handle async errors
import { IRequestUser } from '../../src/interfaces/user.interface';
import { formatDate } from '../utils/dateFormatter';



/**
 * @desc    create a new app
 * @route   POST /api/app/create
 * @access  Private
*/


export const createApp = catchAsyncError(async (req: IRequestUser, res: Response) => {
  const { title, desc,status } = req.body;

 

  const userID = req.userId

  if (!userID) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  const newApp = new App({
    title,
    desc,
    userId: userID,
    status
  });
  await newApp.save();

  res.status(201).json({
    success: true,
    message: 'App created successfully',
    app: newApp,
  });
});

/**
 * @desc    update an existing app
 * @route   PATCH /api/app/update/:id
 * @access  Private
*/


export const updateApp = catchAsyncError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedApp = await App.findByIdAndUpdate(id, updateData, { new: true });

  if (!updatedApp) {
    return res.status(404).json({ success: false, message: 'App not found' });
  }

  res.json({
    success: true,
    message: 'App updated successfully',
    app: updatedApp,
  });
});

/**
 * @desc    delete an app
 * @route   DELETE /api/app/delete/:id
 * @access  Private
*/



export const deleteApp = catchAsyncError(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedApp = await App.findByIdAndDelete(id);

  if (!deletedApp) {
    return res.status(404).json({ success: false, message: 'App not found' });
  }

  res.json({
    success: true,
    message: 'App deleted successfully',
  });
});


/**
 * @desc    get specific app
 * @route   DELETE /api/app/getAppById/:id
 * @access  Private
*/


export const getAppById = catchAsyncError(async (req: Request, res: Response) => {
  const { id } = req.params;

  const app = await App.findById(id).populate('userId', 'firstName lastName email'); // Populate user details if needed

  if (!app) {
    return res.status(404).json({ success: false, message: 'App not found' });
  }

  res.json({
    success: true,
    app,
  });
});


/**
 * @desc    get all apps for a user
 * @route   GET /api/app/getAllUserApps/:userId
 * @access  Private
*/



export const getAllUserApps = catchAsyncError(async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Fetch apps for the user and sort by createdAt in descending order
  const apps = await App.find({ userId }).sort({ createdAt: -1 }); // Sort in descending order

  // Format the createdAt date for each app
  const formattedApps = apps.map(app => ({
    ...app.toObject(), // Convert mongoose document to plain object
    createdAt: formatDate(app.createdAt.toISOString()), // Format the date as a string
  }));

  res.json({
    success: true,
    apps: formattedApps,
  });
});

