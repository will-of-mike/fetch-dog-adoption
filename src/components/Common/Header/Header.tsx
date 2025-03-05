import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import styles from './Header.module.css';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleLogout = async () => {
    const success = await api.logout();
    if (success) {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🐾</span>
          Fetch Adoption
        </Link>
        
        {isLoggedIn && (
          <div className={styles.navRight}>
            <div className={styles.navLinks}>
              <Link to="/search" className={styles.link}>Search</Link>
              <Link to="/favorites" className={styles.link}>Favorites</Link>
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