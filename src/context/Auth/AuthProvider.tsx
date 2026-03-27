import { useState, ReactNode, useMemo } from "react";
import AuthContext, { AuthContextType, UserData } from "./AuthContext.js";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading] = useState<boolean>(false);

  const login = (token: string, userData: UserData): void => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuth(true);
    setUser(userData);
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(false);
    setUser(null);
  };

  const value = useMemo<AuthContextType>(() => ({
    auth,
    user,
    loading,
    login,
    logout
  }), [auth, user, loading]) 

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};