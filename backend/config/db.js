const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shoppu_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error('Please ensure MongoDB is running locally or check your MONGODB_URI in .env');
    // We don't exit process immediately so server can still serve documentation/error message if needed,
    // but in standard REST API, exiting or retrying is typical. Let's log clearly.
  }
};

module.exports = connectDB;
