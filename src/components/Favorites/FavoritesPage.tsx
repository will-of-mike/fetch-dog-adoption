import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { Dog } from '@/types/api';
import DogCard from '@/components/Dogs/DogCard';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './FavoritesPage.module.css';
import { baseUrl } from '@/constants/constants';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, resetFavorites } = useFavorites();
  const [match, setMatch] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    if (favorites.length === 0) {
      setError('Please select at least one favorite dog');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const matchResponse = await api.getMatch(favorites.map(d => d.id));
      
      if (!matchResponse?.match) {
        throw new Error('No match found');
      }
      
      const matchedDogs = await api.getDogs([matchResponse.match]);
      
      if (!matchedDogs.length) {
        throw new Error('Matched dog not found');
      }
      
      setMatch(matchedDogs[0]);
      resetFavorites();
    } catch (error) {
      console.error('Match generation failed:', error);
      setError('Failed to generate match. Please try again.');
      navigate(`${baseUrl}/favorites`);
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
        {error && <div className={styles.error}>{error}</div>}
      </div>

      {match && (
        <div className={styles.matchSection}>
          <h3>Your Perfect Match!</h3>
          <DogCard
            dog={match}
            isFavorited={favorites.some(f => f.id === match.id)}
            onToggleFavorite={() => toggleFavorite(match)}
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