const mongoose = require('mongoose');
const { connectDb } = require('../utils/db');

// === Models === //
const Whisk = require('../models/Whisk');

// === Seeder Files === //
const seederWhisks = require('./whiskSeeds');

const seedDB = async () => {
  try {
    await Whisk.deleteMany({});
    console.log('deleted!');

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

(async () => {
  connectDb();
  await seedDB();
  mongoose.connection.close();
})();
