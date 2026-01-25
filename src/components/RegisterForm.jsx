import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/Signing.module.css';
import siteLogo from '../assets/site-icon.jpeg';

import { registerUser } from '../api/auth';

export function RegisterForm() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});

	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (formData.password !== formData.passwordConfirmation) {
			setError('Passwords do not match');
			return;
		}

		try {
			await registerUser(formData);
			navigate('/login');
		} catch (err) {
			setError(err.message);
			console.log(err);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.registerHero}>
				<Link to="/">
					<p className={styles.heroText}>Orokidd.</p>
				</Link>
				<img src={siteLogo} alt="" />
			</div>

			<div className={styles.formContainer}>
				<form onSubmit={handleSubmit} className={styles.registerForm}>
					<div className="form-header">
						<p className={styles.registerText}>Sign Up</p>
					</div>

					<div className={styles.errorText}>{error}</div>

					<div className="form-content">
						<div className={styles.inputGroup}>
							<label htmlFor="username">Username</label>
							<input className={styles.registerInput} type="text" name="username" onChange={handleChange} required />
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor="email">Email</label>
							<input className={styles.registerInput} type="email" name="email" onChange={handleChange} required />
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor="password">Password</label>
							<input className={styles.registerInput} type="password" name="password" onChange={handleChange} required />
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor="passwordConfirmation">Confirm Password</label>
							<input className={styles.registerInput} type="password" name="passwordConfirmation" onChange={handleChange} required />
						</div>
					</div>

					<div className="form-options">
						<div className="button-group">
							<button type="submit" className={styles.registerButton}>
								Sign Up
							</button>
						</div>
					</div>
				</form>

				<div className="login-text">
					<p className={styles.alreadyText}>
						Already have an account?{' '}
						<Link to="/login" className={styles.loginLink}>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
