import { LoginForm } from "../components/LoginForm";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const { user, loading } = useContext(AuthContext);

	useEffect(() => {
		if (user && user.role === "ADMIN") {
			navigate("/admin");
		} else if (user) {
			navigate("/");
		}
	}, [user, loading, navigate]);

	if (user || loading) return <div className="loading">Loading ...</div>;

	return (
		<>
			<LoginForm />
		</>
	);
}
