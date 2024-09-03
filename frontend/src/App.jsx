import Exercises from "./components/Exercises";
import Search from "./components/Search";
import Modal from "./components/Modal";
import History from "./components/History";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Login from "./components/Auth";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const { user } = useContext(UserContext);

  return <div className="App">{user ? <Profile /> : <Login />}</div>;
}

export default App;
