import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Dog } from '@/types/api';

type FavoritesContextType = {
  favorites: Dog[];
  toggleFavorite: (dog: Dog) => void;
  resetFavorites: (() => [])
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  resetFavorites: () => []
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Dog[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (dog: Dog) => {
    setFavorites(prev => 
      prev.some(d => d.id === dog.id)
        ? prev.filter(d => d.id !== dog.id)
        : [...prev, dog]
    );
  };

  const resetFavorites = () => {
      setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, resetFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);