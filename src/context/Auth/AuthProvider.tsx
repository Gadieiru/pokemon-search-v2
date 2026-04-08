import { useState, ReactNode, useMemo } from "react";
import AuthContext, { AuthContextType, UserData } from "./AuthContext";
import { HelpHttp } from "../../helpers/HelpHttp";

interface AuthProviderProps {
  children: ReactNode;
}

const baseUrl = "http://localhost:3000";
const api = HelpHttp();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<boolean>(!!localStorage.getItem("access_token"));
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
    localStorage.setItem("access_token", token || "session_active");
    localStorage.setItem("user", JSON.stringify(userData));
    setAuth(true);
    setUser(userData);
  };

  const logout = (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAuth(false);
    setUser(null);

    api.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true });
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