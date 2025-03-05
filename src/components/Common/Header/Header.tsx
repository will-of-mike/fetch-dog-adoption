import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '@/constants/constants';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(`${baseUrl}/login`);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link to={`${baseUrl}/`} className={styles.logo}>
          <span className={styles.logoIcon}>🐾</span>
          Fetch Adoption
        </Link>
        
        {isLoggedIn && (
          <div className={styles.navRight}>
            <div className={styles.navLinks}>
              <Link to={`${baseUrl}/search`} className={styles.link}>Search</Link>
              <Link to={`${baseUrl}/favorites`} className={styles.link}>Favorites</Link>
            </div>
            <button 
              onClick={handleLogout}
              className={styles.logoutButton}
              aria-label="Logout"
            >
              Log Out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}