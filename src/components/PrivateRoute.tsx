import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRoutesProps) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Verificando credenciales...</div>;
  }

  return auth ? <>{children}</> : <Navigate to="/Login" />;
};
