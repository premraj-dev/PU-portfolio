import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/useAuth';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;
  if (!isLoggedIn) return <Navigate to="/admin" replace />;

  return <>{children}</>;
}