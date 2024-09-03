import { useState, useEffect } from "react";
import axios from "axios";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const allExercisesUrl = "http://localhost:3000/api/exercises";

  const selectExercise = (idExercise) => {
    const exercise = exercises.find((exercise) => exercise._id === idExercise);
    setSelectedExercise(exercise);
  };

  useEffect(() => {
    const fetchexercises = async () => {
      try {
        const response = await axios.get(allExercisesUrl);
        setExercises(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchexercises();
  }, []);

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error: {error.message}</h4>;

  return (
    <div>
      <h2>Exercises</h2>
      {exercises.map((singleExercise) => {
        const {
          _id: id,
          name: exerciseName,
          category,
          muscle,
          instructions,
        } = singleExercise;
        return (
          <article key={id} className="single-exercise">
            <img
              src="/images/running.png"
              alt={exerciseName}
              className="img"
              onClick={() => selectExercise(id)}
            />
            {/* Render exercise details */}
            <div>
              <h2>{exerciseName}</h2>
              <p>Category: {category}</p>
              <p>Muscle: {muscle}</p>
              <p>Instructions: {instructions}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Exercises;
