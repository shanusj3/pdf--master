import { ReactNode, createContext, useContext, useState } from "react";
import { loginUser, signupUser } from "../helpers/api-communication";

type User = {
  name: string;
  email: string;
  id: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        localStorage.removeItem("userId");
      }

      setUser({ email: data.email, name: data.name, id: data.id });
      setIsLoggedIn(true);

      localStorage.setItem("userId", data.id);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);
    console.log(data);

    if (data) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        localStorage.removeItem("userId");
      }

      setUser({ email: data.email, name: data.name, id: data.id });
      setIsLoggedIn(true);

      localStorage.setItem("userId", data.id);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("userId");
    
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
