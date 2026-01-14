import styles from '../styles/Hero.module.css'

export function Hero({role}) {
  const headerHeader = role === "ADMIN" ? "Welcome, Admin!" : "Orokidd.";

  return (
    <div className={styles.heroContainer}>
      <p className={styles.heroHeader}>{headerHeader}</p>
      <p className={styles.heroText}>Welcome to my blog</p>
      <p className={styles.heroText}>Take a look at the most recent blog posts below.</p>
    </div>
  );
}
