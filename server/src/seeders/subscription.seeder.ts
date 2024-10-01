import Subscription from '../models/subscription.model';
import App from '../models/app.model';
import { subscriptionData } from './data/subscription.data'; // Import the mock subscription data

// Function to seed subscriptions
export const seedSubscriptions = async () => {
  try {
    // Check if there are already any subscriptions in the database
    const existingSubscription = await Subscription.findOne();
    if (existingSubscription) {
      console.log('Subscriptions already exist, skipping seeding.');
      return;
    }

    // Fetch all apps from the App collection
    const apps = await App.find({}, '_id'); // Only fetch app ids
    if (apps.length === 0) {
      console.log('No apps found, cannot seed subscriptions.');
      return;
    }

    if (apps.length !== subscriptionData.length) {
      console.log(`Mismatch between app count (${apps.length}) and subscription data length (${subscriptionData.length}).`);
      return;
    }

    // Assign exactly 1 subscription to each app
    const subscriptionSeedData = apps.map((app, index) => {
      return {
        ...subscriptionData[index],  // Use corresponding subscription data
        appId: app._id,              // Assign the app's _id
      };
    });

    // Insert the subscriptions into the database
    await Subscription.insertMany(subscriptionSeedData);
    console.log('Subscriptions seeded successfully with 1 subscription per app.');
  } catch (error) {
    console.error('Error seeding subscriptions:', error);
  }
};
