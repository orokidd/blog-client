import { RegisterForm } from "../components/RegisterForm";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user.role === "ADMIN") {
			navigate("/admin");
		} else if (user) {
			navigate("/");
		}
	}, [user, loading, navigate]);

	if (user || loading) return <div className="loading">Loading ...</div>;

	return <RegisterForm />;
}
