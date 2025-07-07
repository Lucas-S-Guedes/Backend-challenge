// src/contexts/AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  type: string;
}

type AuthContextType = {
  user: User | null;
  login: (user: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (res.ok) {
        // Supondo que sua API retorne os dados do usuário em JSON no corpo da resposta
        const userData = await res.json();

        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          type: userData.type,
        });

        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = async () => {
    await fetch("http://localhost:8080/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
