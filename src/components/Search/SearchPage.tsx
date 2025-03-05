import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import DogCard from '@/components/Dogs/DogCard';
import { useFavorites } from '@/context/FavoritesContext';
import Pagination from '@/components/Common/Pagination/Pagination';
import styles from './SearchPage.module.css';
import type { Dog, SearchParams } from '@/types/api';

export default function SearchPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [sortField, setSortField] = useState('breed');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<{ dogs: Dog[]; total: number }>({ dogs: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 25;

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsData = await api.getBreeds();
        setBreeds(breedsData);
      } catch (error) {
        navigate('/login');
      }
    };
    fetchBreeds();
  }, [navigate]);

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      setError('');
      try {
        const searchParams: SearchParams = {
          breeds: selectedBreeds,
          ageMin,
          ageMax,
          sort: `${sortField}:${sortOrder}`,
          from: (currentPage - 1) * itemsPerPage
        };

        const searchResponse = await api.searchDogs(searchParams);
        
        if (!searchResponse.resultIds.length) {
          setError('No dogs found matching your criteria');
          setResults({ dogs: [], total: 0 });
          return;
        }

        const dogs = await api.getDogs(searchResponse.resultIds);
        setResults({ dogs, total: searchResponse.total });
      } catch (error) {
        console.error('Search failed:', error);
        setError('Failed to load dogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [selectedBreeds, ageMin, ageMax, sortField, sortOrder, currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Breeds:</label>
          <select
            multiple
            value={selectedBreeds}
            onChange={(e) => setSelectedBreeds(
              Array.from(e.target.selectedOptions, opt => opt.value)
            )}
            size={5}
            className={styles.select}
          >
            {breeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Age Range:</label>
          <div className={styles.ageInputs}>
            <input
              type="number"
              placeholder="Min"
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value)}
              min="0"
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Max"
              value={ageMax}
              onChange={(e) => setAgeMax(e.target.value)}
              min="0"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Sort By:</label>
          <div className={styles.sortControls}>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className={styles.select}
            >
              <option value="breed">Breed</option>
              <option value="age">Age</option>
              <option value="name">Name</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={styles.select}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>Loading dogs...</div>
      ) : (
        <>
          <div className={styles.results}>
            {results.dogs.map(dog => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorited={favorites.some(f => f.id === dog.id)}
                onToggleFavorite={() => toggleFavorite(dog)}
              />
            ))}
          </div>
          
          {results.total > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalItems={results.total}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}