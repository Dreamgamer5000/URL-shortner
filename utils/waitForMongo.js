const mongoose = require("mongoose");

const waitForMongo = async (maxRetries = 10, delay = 1000) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      if (mongoose.connection.readyState === 1) {
        console.log("✅ MongoDB is connected.");
        return;
      }
      await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener");
    } catch (err) {
      console.log(`⏳ Waiting for MongoDB... (${retries + 1})`);
      await new Promise((res) => setTimeout(res, delay));
    }
    retries++;
  }

  throw new Error("❌ MongoDB connection failed after retries");
};

module.exports = waitForMongo;
