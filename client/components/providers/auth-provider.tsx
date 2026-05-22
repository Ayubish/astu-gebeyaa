"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/lib/types";
import * as auth from "@/lib/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    userType: "buyer" | "seller";
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setUser(auth.getSession());
  }, []);

  useEffect(() => {
    auth.seedDemoUser();
    refresh();
    setLoading(false);
  }, [refresh]);

  const login = async (email: string, password: string) => {
    const result = auth.login(email, password);
    if (result.success) setUser(result.user ?? auth.getSession());
    return result;
  };

  const register = async (data: Parameters<AuthContextValue["register"]>[0]) => {
    const result = auth.register(data);
    if (result.success) refresh();
    return result;
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
