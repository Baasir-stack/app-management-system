import SubscriptionPlan from '../models/subscription.plan.model'; 
import { subscriptionPlanData } from './data/subscription.plan.data'; 

export const seedSubscriptionPlans = async () => {
  try {
    const existingPlans = await SubscriptionPlan.findOne();
    if (existingPlans) {
      console.log('Subscription plans already exist, skipping seeding.');
      return;
    }

    await SubscriptionPlan.insertMany(subscriptionPlanData);
    console.log('Subscription plans seeded successfully.');
  } catch (error) {
    console.error('Error seeding subscription plans:', error);
  }
};
