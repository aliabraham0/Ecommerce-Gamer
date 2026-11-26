
import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<AuthUser | null>("gamestore_user", null);

  const login = (userData: AuthUser) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
};
