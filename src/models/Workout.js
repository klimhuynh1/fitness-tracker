const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Set schema
const SetSchema = new Schema({
  weight: { type: Number }, // For barbell, dumbbell, machine exercises
  reps: { type: Number }, // Number of repetitions
  added_weight: { type: Number }, // For weighted bodyweight
  removed_weight: { type: Number }, // For assisted bodyweight
  distance: { type: Number }, // For cardio
  duration_seconds: { type: Number }, // For duration or cardio
});

// Define the Exercise schema
const ExerciseSchema = new Schema({
  type: {
    type: String,
    enum: [
      "barbell",
      "dumbbell",
      "machine",
      "weighted_bodyweight",
      "assisted_bodyweight",
      "cardio",
      "duration",
    ],
    required: true,
  },
  description: { type: String, required: true },
  sets: [SetSchema], // Embed SetSchema as an array
});

// Define the Workout schema
const WorkoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  notes: { type: String },
  exercises: [ExerciseSchema], // Embed ExerciseSchema as an array
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
