import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const success = await api.login({ name, email });
    
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/search');
    } else {
      setError('Invalid credentials');
    }
  } catch (error) {
    setError('Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Fetch Doggie Door</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}