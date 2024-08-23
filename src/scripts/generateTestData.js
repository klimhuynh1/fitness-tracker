require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const Workout = require("../models/Workout");

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Database connected");

    // Create test users
    const user1 = new User({
      username: "test_user1",
      email: "test_user1@example.com",
      password: "password123",
    });
    const user2 = new User({
      username: "test_user2",
      email: "test_user2@example.com",
      password: "password123",
    });
    await user1.save();
    await user2.save();

    // Create test exercises
    const exercise1 = new Exercise({
      name: "Barbell Squat",
      category: "barbell",
      muscle: "legs",
      instructions: "A basic barbell squat exercise",
    });
    const exercise2 = new Exercise({
      name: "Running",
      category: "cardio",
      muscle: "cardio",
      instructions: "Cardio exercise running",
    });
    await exercise1.save();
    await exercise2.save();

    // Create test workouts
    const workout1 = new Workout({
      userId: user1._id,
      date: new Date(),
      notes: "Intense workout",
      exercises: [
        {
          exerciseId: exercise1._id,
          sets: [
            { weight: 100, reps: 10 },
            { weight: 110, reps: 8 },
          ],
        },
        {
          exerciseId: exercise2._id,
          sets: [{ distance: 5.0, duration_seconds: 1800 }],
        },
      ],
    });
    await workout1.save();

    console.log("Test data generated");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    mongoose.disconnect();
  });
