/**
 * Digital Atelier - Database Seed Script
 * Creates a demo user account for testing and presentation purposes.
 * Run with: node seed.js
 */

const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/digitalAtelier';

const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Database connected!');

    // --- Create Demo User ---
    let demoUser = await User.findOne({ email: 'demo@digitalatelier.com' });

    if (!demoUser) {
      demoUser = await User.create({
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@digitalatelier.com',
        password: 'demo1234',
        shopName: 'Atelier Demo Store',
        bio: 'This is a demo account for Digital Atelier.',
        role: 'user',
      });
      console.log(`✅ Demo user created! ID: ${demoUser._id}`);
    } else {
      console.log(`⚠️  Demo user already exists! ID: ${demoUser._id}`);
    }

    // --- Create a Sample Project for the demo user (if not already existing) ---
    const existingProject = await Project.findOne({ user: demoUser._id });
    if (!existingProject) {
      await Project.create({
        user: demoUser._id,
        name: 'My Fashion Boutique',
        description: 'A beautiful online store for fashion lovers.',
        status: 'Draft',
        elements: [],
      });
      console.log('✅ Sample project created for demo user!');
    } else {
      console.log('⚠️  Sample project already exists! Skipping.');
    }

    console.log('\n🎉 Seeding complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  📧 Email:    demo@digitalatelier.com');
    console.log('  🔑 Password: demo1234');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Database disconnected.');
    process.exit(0);
  }
};

seedDatabase();
