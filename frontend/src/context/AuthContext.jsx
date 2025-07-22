import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // Optionally decode token for user info, or fetch user profile
      setUser({}); // Placeholder, you can decode or fetch user info here
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (jwt, userInfo) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setUser(userInfo || {});
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 