const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbUrl = process.env.DB || process.env.LOCAL_DB;

module.exports.connectDb = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(`Mongo Database Connected...`);
  } catch (e) {
    console.log(`Mongo Connection Error: ${e}`);
  }
};

//module.exports = connectDb;
