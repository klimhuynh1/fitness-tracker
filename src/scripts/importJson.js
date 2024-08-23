require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Exercise = require("../models/Exercise");

// Get MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// File path to JSON file
const jsonFilePath = path.join(__dirname, "../data/exercises_processed.json");

// Read and parse JSON data
fs.readFile(jsonFilePath, "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
  }

  try {
    const exercises = JSON.parse(data);
    await Exercise.insertMany(exercises);
    console.log("Data successfully imported to MongoDB");
  } catch (err) {
    console.error("Error importing data:", err);
  } finally {
    mongoose.disconnect();
  }
});
