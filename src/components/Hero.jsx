export function Hero({role}) {
  const headerText = role === "ADMIN" ? "Welcome, Admin!" : "Hello!";

  return (
    <div className="hero-container">
      <p className="hero-header">{headerText}</p>
      <p className="hero-text">Take a look at the most recent blog posts below.</p>
    </div>
  );
}
