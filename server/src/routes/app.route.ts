// routes/app.routes.ts
import { Router } from 'express';
import {
  createApp,
  updateApp,
  deleteApp,
  getAppById,
  getAllUserApps,
} from '../controllers/app.controller'; // Adjust the import path based on your project structure
import { verifyToken } from '../middlewares/verifyToken';
import { validateApp } from '../middlewares/global.middleware';

const router = Router();

router.use(verifyToken);

// Route for creating a new app
router.post('/create', validateApp,createApp);

// Route for updating an existing app
router.patch('/update/:id', updateApp);

// Route for deleting an app
router.delete('/delete/:id', deleteApp);

// Route for getting an app by ID
router.get('/getAppById/:id', getAppById);

// Route for getting all apps for a user
router.get('/getAllUserApps/:userId', getAllUserApps);

export default router;
