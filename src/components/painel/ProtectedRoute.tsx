import { Navigate } from 'react-router-dom';
import { usePainel } from '@/contexts/PainelContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = usePainel();
  if (!isAuthenticated) return <Navigate to="/painel/login" replace />;
  return <>{children}</>;
}
