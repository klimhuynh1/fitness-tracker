import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const allExercisesUrl = "http://localhost:3000/api/exercises";

  const fetchExercises = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setExercises(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Display modal when an exercise has been selected
  // Function to select an exercise by ID
  const selectExercise = (idExercise) => {
    const exercise = exercises.find((exercise) => exercise._id === idExercise);
    setSelectedExercise(exercise);
  };

  // Fetch all exercises
  useEffect(() => {
    fetchExercises(allExercisesUrl);
  }, []);

  // Fetch exercises that match search term
  useEffect(() => {
    if (!searchTerm) return;
    fetchExercises(`${allExercisesUrl}?search=${searchTerm}`);
  }, [searchTerm]);

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedExercise,
        selectExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
