// lib/auth.ts

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
};
