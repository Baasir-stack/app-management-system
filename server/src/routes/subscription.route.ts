// routes/subscription.route.ts
import { Router } from 'express';
import { createSubscription, updateSubscription, deleteSubscription, getSubscriptionById } from '../controllers/subscription.controller';
import { verifyToken } from '../middlewares/verifyToken'; 

const router = Router();


router.use(verifyToken)

router.post('/create', verifyToken, createSubscription);
router.patch('/update/:id', verifyToken, updateSubscription);
router.delete('/delete/:id', verifyToken, deleteSubscription);
router.get('/getSubsById/:id', verifyToken, getSubscriptionById);

export default router;
