import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import styles from '../styles/Header.module.css'

export function UserCard( { showCard }) {
	const { loggedIn, user, logout } = useContext(AuthContext);
    const displayRole = user?.role === 'ADMIN' ? 'Admin' : 'User';

	return (
		<div className={`${styles.userCard} ${showCard ? styles.active : ""}`}>
				{loggedIn ? (
					<>
						<div className="user-info">
							{displayRole}, {user.username}
						</div>

						<div className="logout">
							<button className={styles.logoutButton} onClick={logout}>Logout</button>
						</div>
					</>
				) : (
					<Link to="/login" className={styles.loginButton}>Login</Link>
				)}
		</div>
	);
}
