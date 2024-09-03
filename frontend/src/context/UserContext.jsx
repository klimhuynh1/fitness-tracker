import { createContext, useState } from "react";

// Create UserContext
export const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
