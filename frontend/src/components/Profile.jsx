import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ExerciseContext } from "../context/ExerciseContext";
import Search from "./Search";
import Exercises from "./Exercises";
import Modal from "./Modal";

function Profile() {
  const { user, logout } = useContext(UserContext);
  const { showModal } = useContext(ExerciseContext);

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome {user.username}!</h2>
          <button onClick={logout}>Logout</button>
          <Search />
          <Exercises />
          {showModal && <Modal />}
        </>
      ) : (
        <h2>No user is logged in</h2>
      )}
    </div>
  );
}

export default Profile;
