import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PainelProvider>
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/painel/login" element={<PainelLogin />} />
            <Route path="/painel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/painel/alunos" element={<ProtectedRoute><Alunos /></ProtectedRoute>} />
            <Route path="/painel/horarios" element={<ProtectedRoute><Horarios /></ProtectedRoute>} />
            <Route path="/painel/graduacao" element={<ProtectedRoute><Graduacao /></ProtectedRoute>} />
            <Route path="/painel/planos" element={<ProtectedRoute><Planos /></ProtectedRoute>} />
            <Route path="/painel/pagamentos" element={<ProtectedRoute><Pagamentos /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </PainelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
