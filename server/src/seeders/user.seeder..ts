import User from '../models/app.model'; // Import the User model
import { hashPassword } from '../utils/hashPassword';
import { users } from './data/user.data';



// Function to seed users
export const seedUsers = async () => {
  try {
    // Check if there are any existing users
    const existingUser = await User.findOne();
    if (existingUser) {
      console.log('Users already exist, skipping seeding.');
      return;
    }

    // Hash passwords for all users
    for (const user of users) {
      user.password = await hashPassword(user.password); // Hash the password before saving
    }

    // Insert users into the database
    await User.insertMany(users);
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
