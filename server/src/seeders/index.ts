import { seedUsers } from './user.seeder';
import { seedApps } from './app.seeder';  
import { seedSubscriptions } from './subscription.seeder';  
import { seedSubscriptionPlans } from './subscription.plan.seeder';  

export const runSeeders = async () => {
  try {
    await seedUsers();
    await seedApps();
    await seedSubscriptions();
    await seedSubscriptionPlans();
    console.log('All seeders executed successfully.');
  } catch (error) {
    console.error('Error running seeders:', error);
  }
};
