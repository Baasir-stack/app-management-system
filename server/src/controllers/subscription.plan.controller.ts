import { Request, Response } from 'express';
import SubscriptionPlan from '../models/subscription.plan.model'; 


export const getSubscriptionPlans = async (req: Request, res: Response) => {
  try {
    const subscriptionPlans = await SubscriptionPlan.find().sort({amount:1}); 

    return res.status(200).json({
      success: true,
      data: subscriptionPlans,
    });
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later.',
    });
  }
};
