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

// Pre-validation hook to enforce rules based on exercise type
workoutSchema.pre("validate", async function (next) {
  // Populate exercise information to validate based on type
  await this.populate("exercises.exerciseId");

  for (const exercise of this.exercises) {
    const exerciseCategory = exercise.exerciseId.category;
    const exerciseSets = exercise.sets;

    for (const set of exerciseSets) {
      switch (exerciseCategory) {
        case "barbell":
        case "dumbbell":
        case "machine":
        case "other":
          // Ensure only weight and reps are used
          if (
            set.duration_seconds ||
            set.distance ||
            set.weight_added ||
            set.weight_removed
          ) {
            return next(
              new Error(
                "Invalid fields for barbell, dumbbell, or machine exercise"
              )
            );
          }
          break;
        case "weighted bodyweight":
          // Ensure only weight_added and reps are used
          if (
            set.weight ||
            set.duration_seconds ||
            set.distance ||
            set.weight_removed
          ) {
            return next(
              new Error("Invalid fields for weighted bodyweight exercise")
            );
          }
          break;
        case "assisted bodyweight":
          // Ensure only weight_removed and reps are used
          if (
            set.weight ||
            set.duration_seconds ||
            set.distance ||
            set.weight_added
          ) {
            return next(
              new Error("Invalid fields for assisted bodyweight exercise")
            );
          }
          break;
        case "cardio":
          // Ensure only distance and duration_seconds are used
          if (
            set.weight ||
            set.reps ||
            set.weight_added ||
            set.weight_removed
          ) {
            return next(new Error("Invalid fields for cardio exercise"));
          }
          break;
        case "duration":
          // Ensure only duration_seconds is used
          if (
            set.weight ||
            set.reps ||
            set.weight_added ||
            set.weight_removed ||
            set.distance
          ) {
            return next(new Error("Invalid fields for duration exercise"));
          }
          break;
        default:
          return next(new Error("Unknown exercise type"));
      }
    }
  }

  next();
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
