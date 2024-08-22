const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Create a new exercise
router.post("/", async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const newExercise = new Exercise({ name, type, description });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
