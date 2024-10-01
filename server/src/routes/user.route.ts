import { Router } from 'express';
import { getProfile, updatePassword , updateProfile} from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { validateUpdateProfile } from '../middlewares/user.validation';
import { validatePassword } from '../middlewares/global.middleware';

const router = Router();


router.get('/me', verifyToken, getProfile);
router.patch('/me', verifyToken,validateUpdateProfile, updateProfile);
router.put('/me/password', verifyToken, validatePassword, updatePassword);

export default router;
