// routes/subscription.route.ts
import { Router } from 'express';
import { createSubscription, updateSubscription, deleteSubscription, getSubscriptionById } from '../controllers/subscription.controller';
import { verifyToken } from '../middlewares/verifyToken'; // Assuming you have token verification middleware

const router = Router();


router.use(verifyToken)

// Protect these routes with the verifyToken middleware
router.post('/create', verifyToken, createSubscription);
router.patch('/update/:id', verifyToken, updateSubscription);
router.delete('/delete/:id', verifyToken, deleteSubscription);
router.get('/getSubsById/:id', verifyToken, getSubscriptionById);

export default router;
