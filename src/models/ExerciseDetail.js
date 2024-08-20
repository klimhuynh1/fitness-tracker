const ExerciseDetail = sequelize.define("ExerciseDetail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Exercises",
      key: "id",
    },
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
  },
  reps: {
    type: DataTypes.INTEGER,
  },
  addedWeight: {
    type: DataTypes.FLOAT,
  },
  removedWeight: {
    type: DataTypes.FLOAT,
  },
  distance: {
    type: DataTypes.FLOAT,
  },
  timeSeconds: {
    type: DataTypes.INTEGER,
  },
});

module.exports = ExerciseDetail;
