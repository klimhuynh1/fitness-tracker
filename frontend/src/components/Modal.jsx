import { useContext } from "react";
import { ExerciseContext } from "../context/ExerciseContext";

const Modal = () => {
  const { selectedExercise, closeModal } = useContext(ExerciseContext);
  const { name, category, muscle, instructions } = selectedExercise;

  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src="/images/running.png" className="img modal-img" />
        <div className="modal-content">
          <h4>{name}</h4>
          <h5>Category: {category}</h5>
          <h5>Muscle: {muscle}</h5>
          <h5>Instructions: {instructions}</h5>
          <button className="btn close-btn" onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
