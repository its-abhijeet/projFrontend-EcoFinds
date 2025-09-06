// src/contexts/AuthContext.tsx
"use client";

import { BACKEND_API_URL } from "@/constants/apiConstants";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string; // now a string (UUID)
  name: string;
  role: "USER" | "SELLER" | "ADMIN";
  email: string; // we’ll keep email in our User object too
  countryCode: string;
  phoneNumber: string;
  address: string;
  profileImage: string;
  verificationDocument: string;
  isDocumentVerified: boolean;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  authFetch: typeof fetch;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // On mount, load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const { token: t, user: u } = JSON.parse(saved);
      setToken(t);
      setUser(u);
    }
  }, []);

  // Wrap fetch to include Bearer token
  const authFetch: typeof fetch = (
    input: RequestInfo,
    init: RequestInit = {}
  ) => {
    return fetch(input, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token: jwt, user: u } = await response.json();
        // expected shape: { token: string, user: { id, name, role } }

        // Keep email too
        const me: User = { ...u, email };

        setToken(jwt);
        setUser(me);
        localStorage.setItem("auth", JSON.stringify({ token: jwt, user: me }));
        return true;
      }

      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
  };

  const value: AuthContextType = {
    user,
    setUser,
    token,
    login,
    logout,
    isAuthenticated: Boolean(user && token),
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return ctx;
}
