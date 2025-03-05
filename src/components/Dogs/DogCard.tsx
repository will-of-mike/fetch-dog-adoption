import { Dog } from '@/types/api';
import styles from './DogCard.module.css';

interface DogCardProps {
  dog: Dog;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export default function DogCard({ dog, isFavorited, onToggleFavorite }: DogCardProps) {
  return (
    <div className={styles.card}>
      <img src={dog.img} alt={dog.name} className={styles.image} />
      <div className={styles.details}>
        <h3>{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age} years</p>
        <p>Location: {dog.zip_code}</p>
        <button 
          className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ''}`}
          onClick={onToggleFavorite}
        >
          {isFavorited ? '❤️ Favorited' : '🤍 Favorite'}
        </button>
      </div>
    </div>
  );
}