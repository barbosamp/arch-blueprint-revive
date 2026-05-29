import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { PainelProvider } from "@/contexts/PainelContext";
import ProtectedRoute from "@/components/painel/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PainelLogin from "./pages/painel/Login.tsx";
import Dashboard from "./pages/painel/Dashboard.tsx";
import Alunos from "./pages/painel/Alunos.tsx";
import Horarios from "./pages/painel/Horarios.tsx";
import Graduacao from "./pages/painel/Graduacao.tsx";
import Planos from "./pages/painel/Planos.tsx";
import Pagamentos from "./pages/painel/Pagamentos.tsx";
import AlunoLogin from "./pages/aluno/Login.tsx";
import AlunoDashboard from "./pages/aluno/Dashboard.tsx";
import AlunoHorarios from "./pages/aluno/Horarios.tsx";
import AlunoFrequencia from "./pages/aluno/Frequencia.tsx";
import AlunoPerfil from "./pages/aluno/Perfil.tsx";

const queryClient = new QueryClient();

function AlunoRoute({ children }: { children: React.ReactNode }) {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (role !== 'aluno') return <Navigate to="/aluno/login" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <PainelProvider>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Professor panel */}
              <Route path="/painel/login" element={<PainelLogin />} />
              <Route path="/painel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/painel/alunos" element={<ProtectedRoute><Alunos /></ProtectedRoute>} />
              <Route path="/painel/horarios" element={<ProtectedRoute><Horarios /></ProtectedRoute>} />
              <Route path="/painel/graduacao" element={<ProtectedRoute><Graduacao /></ProtectedRoute>} />
              <Route path="/painel/planos" element={<ProtectedRoute><Planos /></ProtectedRoute>} />
              <Route path="/painel/pagamentos" element={<ProtectedRoute><Pagamentos /></ProtectedRoute>} />

              {/* Student portal */}
              <Route path="/aluno/login" element={<AlunoLogin />} />
              <Route path="/aluno" element={<AlunoRoute><AlunoDashboard /></AlunoRoute>} />
              <Route path="/aluno/horarios" element={<AlunoRoute><AlunoHorarios /></AlunoRoute>} />
              <Route path="/aluno/frequencia" element={<AlunoRoute><AlunoFrequencia /></AlunoRoute>} />
              <Route path="/aluno/perfil" element={<AlunoRoute><AlunoPerfil /></AlunoRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </PainelProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
