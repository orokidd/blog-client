import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { Loading } from "../components/Loading";
import { LoginForm } from "../components/LoginForm";

export default function Login() {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user && user.role === "ADMIN") {
			navigate("/admin");
		} else if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	if (user) return <Loading />;

	return (
		<>
			<LoginForm />
		</>
	);
}
