import { createContext } from "react";

export interface UserData {
  id: number;
  username: string;
  email?: string;
}

export interface AuthContextType {
  auth: UserData | boolean | null; 
  loading: boolean;                
  login: (token: string, userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;