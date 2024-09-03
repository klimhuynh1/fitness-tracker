import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // Use UserContext to store the logged-in user
  const { login } = useContext(UserContext);
  const loginUrl = "http://localhost:3000/api/login";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(loginUrl, {
        identifier,
        password,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setError(""); // Clear error messages
        // Store the user in context
        login(response.data.user);
      } else {
        console.log(response);
        setError(response.data.message);
        setMessage(""); // Clear messages
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message || "An error occurred");
        setMessage(""); // Clear messages
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response received from the server");
        setMessage(""); // Clear messages
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${err.message}`);
        setMessage(""); // Clear messages
      }
    } finally {
      setPassword(""); //Clear password
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username/Email:
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
    </div>
  );
}

export default Login;
