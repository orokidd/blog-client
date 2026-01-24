import styles from "../styles/Error.module.css";
import { Link } from "react-router";
import siteLogo from '../assets/site-icon.jpeg'

export default function Error({ errorType }) {
	const errorMessage = errorType === "not-found" ? "Page not found" : "An unexpected error occurred.";

	return (
		<div className={styles.errorContainer}>
			<div className={styles.siteIcon}>
				<Link to="/">
					<img src={siteLogo} alt="Site logo" />
				</Link>
			</div>

			<p className={styles.errorMessage}>{errorMessage}</p>
		</div>
	);
}
