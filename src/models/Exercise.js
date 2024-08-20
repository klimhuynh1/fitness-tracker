const Exercise = sequelize.define("Exercise", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workoutId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Workouts",
      key: "id",
    },
  },
  type: {
    type: DataTypes.ENUM(
      "barbell",
      "dumbbell",
      "machine",
      "weighted_bodyweight",
      "assisted_bodyweight",
      "cardio",
      "duration"
    ),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Exercise;
