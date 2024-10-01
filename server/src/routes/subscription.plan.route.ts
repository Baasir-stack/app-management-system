import express from 'express';
import { getSubscriptionPlans } from '../controllers/subscription.plan.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/plans', verifyToken,getSubscriptionPlans);

export default router;
