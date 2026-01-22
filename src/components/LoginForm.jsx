import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/Signing.module.css'
import siteLogo from '../assets/site-icon.jpeg'

export function LoginForm() {
	const navigate = useNavigate();
	const { login, user } = useContext(AuthContext);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.message);

			login(data.token);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		if (user && user.role === "ADMIN") {
			navigate("/admin");
		} else if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className={styles.wrapper}>
            <div className={styles.loginHero}>
				<Link to='/'><p className={styles.heroText}>Orokidd.</p></Link>
                <img src={siteLogo} alt="" />
            </div>

			<div className={styles.formContainer}>
				
				<form onSubmit={handleSubmit} className={styles.loginForm}>
					<div className="form-header">
						<p className={styles.loginText}>Sign In</p>
					</div>

					<div className={styles.errorText}>{error}</div>

					<div className="form-content">
						<div className={styles.inputGroup}>
							<label htmlFor="username">Username</label>
							<input className={styles.loginInput} type="text" name="username" onChange={handleChange} required />
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor="password">Password</label>
							<input className={styles.loginInput} type="password" name="password" onChange={handleChange} required />
						</div>
					</div>

					<div className="form-options">
						<div className="buttons-group">
							<button type="submit" className={styles.loginButton}>Login</button>
						</div>
					</div>
				</form>

				<div className="register-text">
					<p className={styles.alreadyText}>Don't have an account? <Link to="/register" className={styles.registerLink}>Sign Up</Link></p>
				</div>
			</div>
		</div>
	);
}
