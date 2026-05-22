import type { User } from "./types";

const USERS_KEY = "astu-gebeya-users";
const SESSION_KEY = "astu-gebeya-session";

interface StoredUser extends User {
  password: string;
  bio?: string;
  location?: string;
}

function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  const userId = localStorage.getItem(SESSION_KEY);
  if (!userId) return null;
  const user = getUsers().find((u) => u.id === userId);
  if (!user) return null;
  const { password: _, ...safe } = user;
  return safe;
}

export function register(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: "buyer" | "seller";
}): { success: boolean; error?: string } {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { success: false, error: "An account with this email already exists." };
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password,
    phone: data.phone,
    userType: data.userType,
    rating: 5,
    createdAt: new Date(),
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, newUser.id);
  return { success: true };
}

export function login(
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } {
  const user = getUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  localStorage.setItem(SESSION_KEY, user.id);
  const { password: _, ...safe } = user;
  return { success: true, user: safe };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateProfile(
  userId: string,
  updates: Partial<Pick<User, "name" | "email" | "phone"> & { bio?: string; location?: string }>
): User | null {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  const { password: _, ...safe } = users[index];
  return safe;
}

export function seedDemoUser() {
  if (typeof window === "undefined") return;
  const users = getUsers();
  if (users.length > 0) return;

  const demo: StoredUser = {
    id: "demo-user-1",
    name: "Abebe Tadesse",
    email: "abebe@gmail.com",
    password: "demo1234",
    phone: "+251 911 234 567",
    userType: "seller",
    rating: 4.8,
    createdAt: new Date("2023-01-15"),
  };
  saveUsers([demo]);
}
