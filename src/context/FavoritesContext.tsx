import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Dog } from '@/types/api';

type FavoritesContextType = {
  favorites: Dog[];
  toggleFavorite: (dog: Dog) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
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

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);