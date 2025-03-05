// src/components/Auth/AuthWrapper.tsx
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import LoadingSpinner from '@/components/Common/LoadingSpinner/LoadingSpinner';

export default function AuthWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const baseUrl = '/fetch-dog-adoption'

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Test with a simple authenticated endpoint
        await api.getBreeds();
        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem('isLoggedIn');
        navigate(`${baseUrl}/login`, { replace: true });
      }
    };

    if (localStorage.getItem('isLoggedIn')) {
      validateSession();
    } else {
      navigate(`${baseUrl}/login`, { replace: true });
    }
  }, [navigate]);

  return isLoading ? <LoadingSpinner /> : <Outlet />;
}