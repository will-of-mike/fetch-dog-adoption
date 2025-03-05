import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import AppRoutes from './routes';
import Header from './components/Common/Header/Header';
import { JSX } from 'react';
import styles from './App.module.css';


export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
            <div className={styles.appContainer}>
              <Header />
              <main className={styles.mainContent}>
                <AppRoutes />
              </main>
            </div>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}