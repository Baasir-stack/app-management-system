import cron from 'node-cron';
import Subscription from '../models/subscription.model'; // Adjust the path as needed
import { UpdateResult } from 'mongodb'; // Import UpdateResult type

// Cron job to check for expired subscriptions every 24 hours
cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  try {
    // Find all subscriptions that have expired
    const expiredSubscriptions: UpdateResult = await Subscription.updateMany(
      { subsEndDate: { $lt: now }, isExpired: false },
      { isExpired: true }
    );

    // nModified is part of the UpdateResult interface in MongoDB
    console.log(`Updated ${expiredSubscriptions.modifiedCount} subscriptions to expired.`);
  } catch (error) {
    console.error('Error updating expired subscriptions:', error);
  }
});
