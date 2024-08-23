const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: [
        "barbell",
        "dumbbell",
        "machine",
        "other",
        "weighted bodyweight",
        "assisted bodyweight",
        "cardio",
        "duration",
      ],
      required: true,
    },
    muscle: {
      type: String,
      enum: [
        "core",
        "arms",
        "back",
        "chest",
        "legs",
        "shoulders",
        "olympic",
        "full body",
        "cardio",
      ],
      required: true,
    },
    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
