const User = require("./models/User.js");
const Workout = require("./models/Workout");
const Exercise = require("./models/Exercise");
const ExerciseDetail = require("./models/ExerciseDetail");

// Define associations
User.hasMany(Workout, { foreignKey: "userId" });
Workout.belongsTo(User, { foreignKey: "userId" });

Workout.hasMany(Exercise, { foreignKey: "workoutId" });
Exercise.belongsTo(Workout, { foreignKey: "workoutId" });

Exercise.hasMany(ExerciseDetail, { foreignKey: "exerciseId" });
ExerciseDetail.belongsTo(Exercise, { foreignKey: "exerciseId" });

module.exports = { User, Workout, Exercise, ExerciseDetail };
