import { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
  };

  const fetchLoggedUser = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/logged-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Invalid token");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (token) => {
    saveToken(token);
    setLoading(true);
    await fetchLoggedUser();
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  useEffect(() => {
    fetchLoggedUser();
  }, [fetchLoggedUser]);

  return (
    <AuthContext
      value={{
        user,
        loggedIn: Boolean(user),
        loading,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext>
  );
}
