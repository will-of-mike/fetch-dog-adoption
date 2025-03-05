import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import DogCard from '@/components/Dogs/DogCard';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './FavoritesPage.module.css';
import type { Dog, Match } from '@/types/api';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [match, setMatch] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (favorites.length === 0) return;
    setLoading(true);
    try {
      const matchResponse: Match = await api.getMatch(favorites.map(d => d.id));
      const [matchedDog] = await api.getDogs([matchResponse.match]);
      setMatch(matchedDog);
    } catch (error) {
      console.error('Match generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Your Favorites ({favorites.length})</h2>
        <button 
          className={styles.matchButton}
          onClick={handleMatch}
          disabled={favorites.length === 0 || loading}
        >
          {loading ? 'Finding Match...' : 'Generate Match'}
        </button>
      </div>

      {match && (
        <div className={styles.matchSection}>
          <h3>Your Perfect Match!</h3>
          <DogCard
            dog={match.dog}
            isFavorited={favorites.some(f => f.id === match.dog.id)}
            onToggleFavorite={() => toggleFavorite(match.dog)}
          />
        </div>
      )}

      <div className={styles.favoritesGrid}>
        {favorites.map(dog => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorited={true}
            onToggleFavorite={() => toggleFavorite(dog)}
          />
        ))}
      </div>
    </div>
  );
}