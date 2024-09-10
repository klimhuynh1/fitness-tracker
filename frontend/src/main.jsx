import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import { ExerciseProvider } from "./context/ExerciseContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ExerciseProvider>
        <App />
      </ExerciseProvider>
    </UserProvider>
  </StrictMode>
);
