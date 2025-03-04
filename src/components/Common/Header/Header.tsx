import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link to="/" className={styles.logo}>Fetch Dog Adoption</Link>
        <div className={styles.navLinks}>
          <Link to="/search" className={styles.link}>Search</Link>
          <Link to="/favorites" className={styles.link}>Favorites</Link>
        </div>
      </nav>
    </header>
  );
}