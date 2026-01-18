import siteLogo from '../assets/site-icon.jpeg'
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'
import { UserCard } from './UserCard';

export function Header() {
  const { loggedIn, user, logout } = useContext(AuthContext)
  const [showCard, setShowCard] = useState(false)

  function handleClick() {
    setShowCard((prev) => !prev)
  }

  return (
    <header className={styles.header}>
      <div className={styles.siteIcon}>
        <Link to="/">
          <img src={siteLogo} alt="Site logo" />
        </Link>
      </div>

      <div className={styles.headerOptions} onClick={handleClick}>
        { loggedIn ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-cog-icon lucide-user-round-cog"><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="M2 21a8 8 0 0 1 10.434-7.62"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="10" cy="8" r="5"/><circle cx="18" cy="18" r="3"/></svg>        
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>        
        )}

        <UserCard showCard={showCard}/>
        {/* { loggedIn ? 
        <div className="logout">
          <span className="username">{displayRole}, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </div> : 
        <div className="Login">
          <Link to="/login">Login</Link>
        </div> } */}
        </div>
    </header>
  );
}
