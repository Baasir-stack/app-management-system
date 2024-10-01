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

const router = Router();

router.use(verifyToken);

router.post('/create', validateApp,createApp);

router.patch('/update/:id', updateApp);

router.delete('/delete/:id', deleteApp);

router.get('/getAppById/:id', getAppById);

router.get('/getAllUserApps/:userId', getAllUserApps);

export default router;
