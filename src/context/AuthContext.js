import { useState, createContext } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  return (
    <authContext.Provider value={[user, setUser]}>
        {children}
    </authContext.Provider>
  );
};