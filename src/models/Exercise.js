const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: [
        "barbell",
        "dumbbell",
        "machine",
        "weighted bodyweight",
        "assisted bodyweight",
        "cardio",
        "duration",
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
