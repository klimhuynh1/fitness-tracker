import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {
  const { user, logout } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <h2>No user is logged in</h2>
      )}
    </div>
  );
}

export default Profile;
