import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchLoggedUser() {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/logged-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Invalid token");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(token) {
    saveToken(token);
    await fetchLoggedUser();
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function saveToken(token) {
    localStorage.setItem("token", token);
  }

  function clearToken() {
    localStorage.removeItem("token");
  }

  // This is what makes it run once on mount   
  useEffect(() => {
    fetchLoggedUser();
  }, []);

  return (
    <AuthContext value={{ user, loggedIn: Boolean(user), loading, login, logout, getToken }}>
        {children}
    </AuthContext>
    )
}
