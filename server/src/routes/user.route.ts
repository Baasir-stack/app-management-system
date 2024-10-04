import { Router } from 'express';
import { getProfile, updatePassword , updateProfile} from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { validateUpdateProfile } from '../middlewares/user.middleware';
import { validatePassword } from '../middlewares/global.middleware';
import upload from '../config/multerConfig';

const router = Router();


router.get('/me', verifyToken, getProfile);
router.patch('/me', verifyToken,validateUpdateProfile,upload.single("avatar")  ,updateProfile);
router.put('/me/password', verifyToken, validatePassword, updatePassword);

export default router;
