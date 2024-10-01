import App from '../models//app.model';
import User from '../models/user.model';
import { appData } from './data/app.data'; // Import the mock app data

// Function to seed apps
export const seedApps = async () => {
  try {
    // Check if there are already any apps in the database
    const existingApp = await App.findOne();
    if (existingApp) {
      console.log('Apps already exist, skipping seeding.');
      return;
    }

    // Fetch all users from the User collection
    const users = await User.find({}, '_id'); // Only fetch user ids
    if (users.length === 0) {
      console.log('No users found, cannot seed apps.');
      return;
    }

    if (users.length * 2 !== appData.length) {
      console.log(`Mismatch between user count (${users.length}) and app data length (${appData.length}).`);
      return;
    }

    // Assign exactly 2 apps to each user
    const appSeedData = users.flatMap((user, index) => {
      return [
        { ...appData[index * 2], userId: user._id },     // First app for this user
        { ...appData[index * 2 + 1], userId: user._id }, // Second app for this user
      ];
    });

    // Insert the apps into the database
    await App.insertMany(appSeedData);
    console.log('Apps seeded successfully with 2 apps per user.');
  } catch (error) {
    console.error('Error seeding apps:', error);
  }
};
