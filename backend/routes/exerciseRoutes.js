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

// Get a single exercise
router.get("/:id", async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      return res.status(404).json({ error: "exercise not found" });
    }
    res.status(200).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update exercise
router.patch("/:id", async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const updates = req.body;

    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res
      .status(200)
      .json({ message: "Exercise updated successfully", updatedExercise });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete exercise
router.delete("/:id", async (req, res) => {
  try {
    const exerciseId = req.params.id;

    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);

    if (!deletedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.status(200).json({ message: "Exercise deleted sucessfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
