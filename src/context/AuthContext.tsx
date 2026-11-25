import {createContext, useContext,useState, type ReactNode,} from "react";

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem("gamestore_user");

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser) as AuthUser;
    } catch {
      localStorage.removeItem("gamestore_user");
      return null;
    }
  });

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("gamestore_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gamestore_user");
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, login, logout }}
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
