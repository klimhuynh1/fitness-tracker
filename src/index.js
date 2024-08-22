require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Workout = require("./models/Workout");

// Get MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Database connected");

    // Create a new user
    const newUser = new User({
      username: "john_doe",
      email: "john@example.com",
      password: "password", // This will be hashed before saving
    });

    await newUser.save();
    console.log("User created");

    // Create a new workout
    const newWorkout = new Workout({
      userId: newUser._id, // Link to the user
      date: new Date(),
      notes: "Hard workout session",
      exercises: [
        {
          type: "barbell",
          description: "Barbell Bench Press",
          sets: [
            { weight: 100, reps: 10 },
            { weight: 110, reps: 8 },
          ],
        },
        {
          type: "cardio",
          description: "Running",
          sets: [{ distance: 5.0, duration_seconds: 1800 }],
        },
        {
          type: "duration",
          description: "Plank",
          sets: [{ duration_seconds: 120 }],
        },
      ],
    });

    await newWorkout.save();
    console.log("Workout created");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  })
  .finally(() => {
    mongoose.disconnect();
  });
