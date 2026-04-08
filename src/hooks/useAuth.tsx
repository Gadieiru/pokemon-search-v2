import { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);

    console.log(`AuthContext tiene:`, context)
    
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};