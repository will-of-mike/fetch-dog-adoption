import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/Common/Header/Header';
import { JSX } from 'react';
import styles from './App.module.css';


export default function App(): JSX.Element {
  return (
      <BrowserRouter>
        <div className={styles.appContainer}>
          <Header />
          <main className={styles.mainContent}>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
  );
}