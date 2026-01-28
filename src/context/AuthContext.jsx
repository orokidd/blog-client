import { createContext, useEffect, useState } from "react";
import { getUserData } from "../api/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	function getToken() {
		return localStorage.getItem("token");
	}

	function saveToken(token) {
		localStorage.setItem("token", token);
	}

	function clearToken() {
		localStorage.removeItem("token");
	}

	async function login(token) {
		saveToken(token);
		setLoading(true);

		try {
			const userData = await getUserData(token);
			setUser(userData);
		} catch (err) {
			console.error(err);
			clearToken();
			setUser(null);
		} finally {
			setLoading(false);
		}
	}

	function logout() {
		clearToken();
		setUser(null);
	}

	useEffect(() => {
		async function loadUser() {
			const token = getToken();

			if (!token) {
				setLoading(false);
				return;
			}

			try {
				const userData = await getUserData(token);
				setUser(userData);
			} catch (err) {
				console.error(err);
				clearToken();
				setUser(null);
			} finally {
				setLoading(false);
			}
		}

		loadUser();
	}, []);

	return (
		<AuthContext value={{ user, loggedIn: Boolean(user), loading, login, logout, getToken }}>
			{children}
		</AuthContext>
	);
}