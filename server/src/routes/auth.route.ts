import { Router } from 'express';
import { 
    registerUser, 
  loginUser, 
  resetPassword, 
  forgetPassword, 
  logoutUser
} from '../controllers/auth.controller'; // Adjust the import path based on your project structure
import {   validateRegister,
    validateLogin,
 
    validateForgetPassword, } from '../middlewares/auth.validation'; // Optional validation middleware
import upload from '../config/multerConfig';
import { validatePassword } from '../middlewares/global.middleware';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.post('/register', upload.single("avatar") ,validateRegister,registerUser);

router.post('/login', validateLogin, loginUser);

router.post('/reset-password/:token', validatePassword, resetPassword);

router.post('/forget-password', validateForgetPassword, forgetPassword);


router.post("/logout", verifyToken,logoutUser);

export default router;
