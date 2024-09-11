const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const Workout = require("../models/Workout");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Database connected");

    // Create users only if they don't exist in the database
    const createUser = async (userData) => {
      const { username, email, password } = userData;

      // Check if the user already exists
      const existingUser = await User.findOne({
        username: username,
      });

      if (existingUser) {
        console.log(`User "${username}" already exists`);
        return existingUser;
      } else {
        const newUser = new User({
          username: username,
          email: email,
          password,
        });
        await newUser.save();
        console.log(`User "${username}" created`);
        return newUser;
      }
    };

    // Create test users
    const user1 = new User({
      username: "test_user1",
      email: "test_user1@example.com",
      password: "wg3bebnj%2Qe$Rd@",
    });
    const user2 = new User({
      username: "test_user2",
      email: "test_user2@example.com",
      password: "a@dXAmPg8hhd&NSd",
    });
    savedUser1 = await createUser(user1);
    savedUser2 = await createUser(user2);

    // Create exercises only if they don't exist in the database
    const createExercise = async (exerciseData) => {
      const { name, category, muscle, instructions } = exerciseData;

      // Check if the exercise already exists
      const existingExercise = await Exercise.findOne({
        name: name,
      });

      if (existingExercise) {
        console.log(`Exercise "${name}" already exists`);
        return existingExercise;
      } else {
        const newExercise = new Exercise({
          name: name,
          category: category,
          muscle: muscle,
          instructions: instructions,
        });

        await newExercise.save();
        console.log(`Exercise "${name}" created`);
        return newExercise;
      }
    };

    const exercise1 = new Exercise({
      name: "back squat (barbell)",
      category: "barbell",
      muscle: "legs",
      instructions: "",
    });
    const exercise2 = new Exercise({
      name: "running",
      category: "cardio",
      muscle: "cardio",
      instructions: "",
    });
    const exercise3 = new Exercise({
      name: "deadlift (barbell)",
      category: "barbell",
      muscle: "back",
    });
    const savedExercise1 = await createExercise(exercise1);
    const savedExercise2 = await createExercise(exercise2);
    const savedExercise3 = await createExercise(exercise3);

    // Create test workouts
    const workout1 = new Workout({
      userId: savedUser1._id,
      date: new Date(),
      notes: "Intense workout",
      exercises: [
        {
          exerciseId: savedExercise1._id,
          sets: [
            { weight: 100, reps: 10 },
            { weight: 110, reps: 8 },
          ],
        },
        {
          exerciseId: savedExercise2._id,
          sets: [{ distance: 5.0, duration_seconds: 1800 }],
        },
      ],
    });
    await workout1.save();

    const workout2 = new Workout({
      userId: savedUser1._id,
      date: new Date(),
      notes: "Intense workout",
      exercises: [
        {
          exerciseId: savedExercise1._id,
          sets: [
            { weight: 40, reps: 10 },
            { weight: 40, reps: 10 },
            { weight: 40, reps: 10 },
            { weight: 40, reps: 10 },
            { weight: 40, reps: 10 },
          ],
        },
        {
          exerciseId: savedExercise3._id,
          sets: [
            { weight: 80, reps: 10 },
            { weight: 80, reps: 10 },
            { weight: 80, reps: 10 },
            { weight: 80, reps: 10 },
            { weight: 80, reps: 10 },
          ],
        },
      ],
    });
    await workout2.save();
    console.log("Test data generated");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    mongoose.disconnect();
  });
