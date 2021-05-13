const mongoose = require('mongoose');
const { connectDb } = require('../utils/db');

const Whisk = require('../models/Whisk');

const seederWhisks = require('./whiskSeeds');

//=============================
//      Seeder Functions
//=============================

const seedDB = async () => {
  try {
    await Whisk.deleteMany({});

    // Create Whisks
    seederWhisks.forEach(async (w) => {
      const newWhisk = new Whisk({
        title: w.title,
        category: w.category,
        city: w.city,
        neighborhood: w.neighborhood,
        description: w.description,
        cost: w.cost,
        durationHours: w.durationHours,
        participants: w.participants,
        images: w.images,
        tags: w.tags,
      });

      await newWhisk.save();
    });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

//=============================
//        Seed Database
//=============================

(async () => {
  connectDb();
  await seedDB();
  console.log('Database seeded successfully!');
  mongoose.connection.close();
})();
