const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
    exercises: [
      {
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },
        sets: [
          {
            weight: Number,
            reps: Number,
            weight_added: Number,
            weight_removed: Number,
            duration_seconds: Number,
            distance: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
