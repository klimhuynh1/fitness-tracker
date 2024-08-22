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
    bodyPart: {
      type: String,
      enum: [
        "none",
        "core",
        "arms",
        "back",
        "chest",
        "legs",
        "shoulders",
        "other",
        "olympic",
        "full body",
        "cardio",
      ],
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
