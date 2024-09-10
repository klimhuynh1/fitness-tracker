import { useContext } from "react";
import { ExerciseContext } from "../context/ExerciseContext";

const Exercises = () => {
  const { exercises, loading, error, selectExercise } =
    useContext(ExerciseContext);

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (exercises.length < 1) {
    return (
      <section className="section">
        <h4>No exercises matched your search term. Please try again.</h4>
      </section>
    );
  }
  if (error)
    return (
      <section className="section">
        <h4>Error: {error.message}</h4>
      </section>
    );

  return (
    <div>
      <h2>Exercises</h2>
      <section className="section-center">
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
              <footer>
                <h5>{exerciseName}</h5>
              </footer>
              {/* <div>
                <h2>{exerciseName}</h2>
                <p>Category: {category}</p>
                <p>Muscle: {muscle}</p>
                <p>Instructions: {instructions}</p>
              </div> */}
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Exercises;
