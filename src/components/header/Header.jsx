import siteLogo from '../../assets/site-icon.jpeg'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from 'react-router-dom';

export function Header() {
  const { loggedIn, user, logout } = useContext(AuthContext)

  return (
    <header className="header">
      <div className="site-icon">
        <Link to="/">
          <img src={siteLogo} alt="Site logo" />
        </Link>
      </div>

      <div className="header-options">
        { loggedIn ? 
        <div className="logout">
          <span className="username">Hello, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </div> : 
        <div className="Login">
          <Link to="/login">Login</Link>
        </div> }
        </div>
    </header>
  );
}
