import { Router } from 'express';
import {
  createApp,
  updateApp,
  deleteApp,
  getAppById,
  getAllUserApps,
} from '../controllers/app.controller'; 
import { verifyToken } from '../middlewares/verifyToken';
import { validateApp } from '../middlewares/global.middleware';
import { AppSchema } from '../validations/global.validation';
import { UpdateAppSchema } from '../validations/app.validation';

const router = Router();

router.use(verifyToken);

router.post('/create', validateApp(AppSchema),createApp);

router.patch('/update/:id', validateApp(UpdateAppSchema),updateApp);

router.delete('/delete/:id', deleteApp);

router.get('/getAppById/:id', getAppById);

router.get('/getAllUserApps/:userId', getAllUserApps);

export default router;
