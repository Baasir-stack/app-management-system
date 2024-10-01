import User from '../models/app.model'; 
import { hashPassword } from '../utils/hashPassword';
import { users } from './data/user.data';




export const seedUsers = async () => {
  try {
  
    const existingUser = await User.findOne();
    if (existingUser) {
      console.log('Users already exist, skipping seeding.');
      return;
    }


    for (const user of users) {
      user.password = await hashPassword(user.password); 
    }

  
    await User.insertMany(users);
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
