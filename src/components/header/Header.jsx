import siteLogo from '../../assets/site-icon.jpeg'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export function Header() {
  const { loggedIn, user } = useContext(AuthContext)

  return (
    <header className="header">
      <div className="site-icon">
        <a href="/">
          <img src={siteLogo} alt="Site logo" />
        </a>
      </div>

      <div className="header-options">
        { user ? <div className="logout">Logout</div> : <div className="Login">Login</div> }
        </div>
    </header>
  );
}
