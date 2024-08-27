require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

// Get MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected");
    // Start the server
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
