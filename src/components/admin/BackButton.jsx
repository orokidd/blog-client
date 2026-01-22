import { Link } from "react-router-dom";
import styles from "../../styles/PostForm.module.css";

export function BackButton() {
	return (
		<div className={styles.backLinkContainer}>
			<Link to="/admin" className={styles.backLink}>
				← Back
			</Link>
		</div>
	);
}
