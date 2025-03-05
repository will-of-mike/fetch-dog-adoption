import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import DogCard from '@/components/Dogs/DogCard';
import Pagination from '../Common/Pagination/Pagination';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './SearchPage.module.css';
import { Dog, SearchParams } from '@/types/api';

export default function SearchPage() {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    breeds: [],
    ageMin: 0,
    ageMax: 0,
    sort: 'breed:asc',
    from: 0
  });
  const [results, setResults] = useState<{ dogs: Dog[]; total: number }>({ dogs: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const { toggleFavorite, favorites } = useFavorites();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams(prev => ({
      ...prev,
      from: (page - 1) * itemsPerPage
    }));
  };

  const baseUrl = '/fetch-dog-adoption'

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breeds = await api.getBreeds();
        setBreeds(breeds);
      } catch (error) {
        throw new Error('Failed to fetch breeds')
        navigate(`${baseUrl}/login`);
      }
    };
    fetchBreeds();
  }, [navigate]);

  useEffect(() => {
    handleSearch();
  }, [searchParams]);
  
  const handleSearch = async () => {
    setLoading(true);
    try {
      const searchResponse = await api.searchDogs(searchParams);
      const dogs = await api.getDogs(searchResponse.resultIds);
      setResults({ dogs, total: searchResponse.total });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Adjust fields for immediate results!</h3>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Breeds:</label>
          <select
            multiple
            value={searchParams.breeds}
            onChange={(e) => setSearchParams(prev => ({
              ...prev,
              breeds: Array.from(e.target.selectedOptions, opt => opt.value)
            }))}
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
              value={searchParams.ageMin}
              onChange={(e) => setSearchParams(prev => ({ ...prev, ageMin: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Max"
              value={searchParams.ageMax}
              onChange={(e) => setSearchParams(prev => ({ ...prev, ageMax: e.target.value }))}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Sort By:</label>
          <select
            value={searchParams.sort}
            onChange={(e) => setSearchParams(prev => ({ ...prev, sort: e.target.value }))}
          >
            <option value="breed:asc">Breed (A-Z)</option>
            <option value="breed:desc">Breed (Z-A)</option>
            <option value="age:asc">Age (Low to High)</option>
            <option value="age:desc">Age (High to Low)</option>
          </select>
        </div>

        {loading && (
          <p className={styles.loadingSearch}>Herding puppies...</p>
        )}
      </div>

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
        <div>
        {results.total > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={results.total}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};