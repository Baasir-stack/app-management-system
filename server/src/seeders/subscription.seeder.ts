import Subscription from '../models/subscription.model';
import App from '../models/app.model';
import { subscriptionData } from './data/subscription.data'; 

export const seedSubscriptions = async () => {
  try {
    
    const existingSubscription = await Subscription.findOne();
    if (existingSubscription) {
      console.log('Subscriptions already exist, skipping seeding.');
      return;
    }

   
    const apps = await App.find({}, '_id'); 
    if (apps.length === 0) {
      console.log('No apps found, cannot seed subscriptions.');
      return;
    }

    if (apps.length !== subscriptionData.length) {
      console.log(`Mismatch between app count (${apps.length}) and subscription data length (${subscriptionData.length}).`);
      return;
    }

   
    const subscriptionSeedData = apps.map((app, index) => {
      return {
        ...subscriptionData[index],  
        appId: app._id,              
      };
    });


    await Subscription.insertMany(subscriptionSeedData);
    console.log('Subscriptions seeded successfully with 1 subscription per app.');
  } catch (error) {
    console.error('Error seeding subscriptions:', error);
  }
};
