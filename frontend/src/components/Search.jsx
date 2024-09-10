import { useContext, useState } from "react";
import { ExerciseContext } from "../context/ExerciseContext";

const Search = () => {
  const [text, setText] = useState("");
  const { setSearchTerm } = useContext(ExerciseContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  };

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={text}
          placeholder="search exercise"
          className="form-input"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </header>
  );
};

export default Search;
