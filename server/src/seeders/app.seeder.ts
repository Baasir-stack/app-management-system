import App from '../models//app.model';
import User from '../models/user.model';
import { appData } from './data/app.data'; 


export const seedApps = async () => {
  try {
   
    const existingApp = await App.findOne();
    if (existingApp) {
      console.log('Apps already exist, skipping seeding.');
      return;
    }

    
    const users = await User.find({}, '_id'); 
    if (users.length === 0) {
      console.log('No users found, cannot seed apps.');
      return;
    }

    if (users.length * 2 !== appData.length) {
      console.log(`Mismatch between user count (${users.length}) and app data length (${appData.length}).`);
      return;
    }


    const appSeedData = users.flatMap((user, index) => {
      return [
        { ...appData[index * 2], userId: user._id },     
        { ...appData[index * 2 + 1], userId: user._id }, 
      ];
    });

    
    await App.insertMany(appSeedData);
    console.log('Apps seeded successfully with 2 apps per user.');
  } catch (error) {
    console.error('Error seeding apps:', error);
  }
};
