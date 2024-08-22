const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");

// Create a new workout
router.post("/", async (req, res) => {
  try {
    const { userId, date, notes, exercises } = req.body;

    // Validate that all exercise IDs are valid
    for (const exercise of exercises) {
      const validExercise = await Exercise.findById(exercise.exerciseId);
      if (!validExercise) {
        return res
          .status(400)
          .json({ error: `Exercise with ID ${exercise.exerciseId} not found` });
      }
    }

    // Create and save the new workout
    const newWorkout = new Workout({ userId, date, notes, exercises });
    await newWorkout.save();

    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all workout
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().populate("userId");
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

module.exports = router;
