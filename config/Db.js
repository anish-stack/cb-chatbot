const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mongoDbUri = process.env.MONGOURL;
// console.log(mongoDbUri);

const connectDb = async () => {
  try {
    if (!dotenv.parsed) {
      throw new Error('Error loading .env file');
    }

    if (!mongoDbUri) {
      throw new Error('MongoDB connection URL is missing');
    }

    const mongo = await mongoose.connect(mongoDbUri);

    console.log('Connected to MongoDB');

    // Additional setup after connecting can be placed here if needed.

    return mongo; // You might not need to return anything, depending on your use case.

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; // Throwing the error allows the calling code to handle it appropriately.
  }
};

module.exports = connectDb;
