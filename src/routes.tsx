import { JSX, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthWrapper from '@/components/Auth/AuthWrapper';
import Spinner from '@/components/Common/LoadingSpinner/LoadingSpinner';
import { baseUrl } from './constants/constants';

const LoginForm = lazy(() => import('@components/Login/LoginForm'));
const SearchPage = lazy(() => import('@components/Search/SearchPage'));
const FavoritesPage = lazy(() => import('@components/Favorites/FavoritesPage'));

export default function AppRoutes(): JSX.Element {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path={`${baseUrl}/login`} element={<LoginForm />} />
                <Route element={<AuthWrapper />}>
                    <Route path={`${baseUrl}/search`} element={<SearchPage />} />
                    <Route path={`${baseUrl}/favorites`} element={<FavoritesPage />} />
                </Route>
                <Route path="*" element={<LoginForm />} />
            </Routes>
        </Suspense>
    )
}