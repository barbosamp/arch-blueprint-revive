import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Modalidades from './pages/Modalidades';
import MetodologiaPage from './pages/Metodologia';
import PlanosPage from './pages/Planos';
import HorariosPage from './pages/Horarios';
import UnidadesPage from './pages/Unidades';
import ContatoPage from './pages/Contato';
import AgendarPage from './pages/Agendar';
import MatriculaPage from './pages/Matricula';
import MatriculaConfirmado from './pages/MatriculaConfirmado';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/modalidades" element={<Modalidades />} />
      <Route path="/metodologia" element={<MetodologiaPage />} />
      <Route path="/planos" element={<PlanosPage />} />
      <Route path="/horarios" element={<HorariosPage />} />
      <Route path="/unidades" element={<UnidadesPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/agendar" element={<AgendarPage />} />
      <Route path="/matricula" element={<MatriculaPage />} />
      <Route path="/matricula/confirmado" element={<MatriculaConfirmado />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
