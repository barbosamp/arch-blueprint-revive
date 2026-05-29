import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (role !== 'professor') return <Navigate to="/painel/login" replace />;
  return <>{children}</>;
}
