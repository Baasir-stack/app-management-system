import { connectDB } from '../config/db';
import { runSeeders } from '../seeders';
import dotEnv from 'dotenv';

const seedDatabase = async () => {
  try {
    
  dotEnv.config({
  path: '.env',
  });

    await connectDB();
    await runSeeders();
    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
