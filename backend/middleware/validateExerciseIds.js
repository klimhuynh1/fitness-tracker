const Exercise = require("../models/Exercise");

// Middleware function to validate exercise IDs inthe request
const validateExerciseIds = async (req, res, next) => {
  const { exercises } = req.body;

  if (exercises) {
    for (const exercise of exercises) {
      const validExercise = await Exercise.findById(exercise.exerciseId);
      if (!validExercise) {
        return res
          .status(400)
          .json({ error: `Exercise with ID ${exercise.exerciseId} not found` });
      }
    }
  }

  next();
};

module.exports = validateExerciseIds;
