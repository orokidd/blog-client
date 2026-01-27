import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Signing.module.css'
import siteLogo from '../assets/site-icon.jpeg'

import { loginUser } from "../api/auth";

export function LoginForm() {
	const { login } = useContext(AuthContext);

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
			const loginResponse = await loginUser(formData)
			login(loginResponse.token);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className={styles.wrapper}>
            <div className={styles.loginHero}>
				<Link to='/'><p className={styles.heroText}>Orokidd.</p></Link>
				<Link to='/'><img src={siteLogo} alt="" /></Link>
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
