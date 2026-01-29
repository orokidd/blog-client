import { Wobble } from "ldrs/react";
import styles from '../styles/Loading.module.css'
import "ldrs/react/Wobble.css";

export function Loading() {
	return (
		<div className={styles.loadingContainer}>
			<Wobble size="45" speed="0.9" color="var(--accent)" />
		</div>
	);
}
