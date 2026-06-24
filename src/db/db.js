const mongoose = require("mongoose");
const dotenv = require("dotenv");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to DB");
  } catch (err) {
    console.log("Database connection failed: ", err.message);
  }
}

module.exports = connectDB;
