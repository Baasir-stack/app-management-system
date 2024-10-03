import cron from 'node-cron';
import Subscription from '../models/subscription.model'; 
import { UpdateResult } from 'mongodb'; 

cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  try {
    const expiredSubscriptions: UpdateResult = await Subscription.updateMany(
      { subsEndDate: { $lt: now }, isExpired: false },
      { isExpired: true }
    );

    console.log(`Updated ${expiredSubscriptions.modifiedCount} subscriptions to expired.`);
  } catch (error) {
    console.error('Error updating expired subscriptions:', error);
  }
});
