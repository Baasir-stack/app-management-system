import { Router } from 'express';
import { 
    registerUser, 
  loginUser, 
  resetPassword, 
  forgetPassword, 
  logoutUser,
  validateResetToken
} from '../controllers/auth.controller'; 
import { validateAuthRequest} from '../middlewares/auth.middleware'; 
import upload from '../config/multer.config';
import { validatePassword } from '../middlewares/global.middleware';
import { verifyToken } from '../middlewares/verifyToken';
import { forgetPasswordSchema, loginSchema, registerSchema } from '../validations/auth.validation';

const router = Router();

router.post('/register', upload.single("avatar") ,validateAuthRequest(registerSchema),registerUser);

router.post('/login', validateAuthRequest(loginSchema), loginUser);

router.post('/reset-password/:token', validatePassword, resetPassword);
router.post('/reset-password/validate/:token', validateResetToken);

router.post('/forget-password', validateAuthRequest(forgetPasswordSchema), forgetPassword);


router.post("/logout", verifyToken,logoutUser);

export default router;
