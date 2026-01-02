import siteLogo from '../../assets/site-icon.jpeg'

export function Header() {
  const user = null;

  return (
    <header className="header">
      <div className="site-icon">
        <a href="/">
          <img src={siteLogo} alt="Site logo" />
        </a>
      </div>

      <div className="header-options">
        {user ? <div className="logout">Logout</div> : <div className="Login">Login</div>}
        </div>
    </header>
  );
}
