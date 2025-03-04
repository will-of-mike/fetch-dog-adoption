import { JSX, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from '@/components/Common/LoadingSpinner/LoadingSpinner'

const LoginForm = lazy(() => import('@/components/Login/LoginForm'));

export default function AppRoutes(): JSX.Element {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="*" element={<LoginForm />} />
            </Routes>
        </Suspense>
    )
}