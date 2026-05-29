import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AlunoLogin() {
  const { signIn, role, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && role === 'aluno') { navigate('/aluno'); return null; }
  if (!loading && role === 'professor') { navigate('/painel'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: err } = await signIn(email, pw);
    if (err) { setError('E-mail ou senha incorretos. Fale com seu professor.'); setSubmitting(false); return; }
    setTimeout(() => navigate('/aluno'), 150);
  };

  return (
    <div className="min-h-screen bg-blackout flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-display text-4xl text-white-belt tracking-wider mb-1">
            BLACKBOX<span className="text-gold">.</span>
          </div>
          <p className="font-mono text-[9px] tracking-[0.35em] text-mid-gray uppercase">
            Área do Aluno
          </p>
        </div>

        <div className="flex items-center justify-center gap-[4px] mb-10">
          {[...Array(4)].map((_, i) => <div key={i} className="w-[3px] h-5 bg-gold/30" />)}
          <div className="w-[11px] h-[11px] border border-gold/30 ml-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">E-mail</label>
            <div className="relative">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" autoFocus required
                className="w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 pl-10 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
              <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid-gray/50" />
            </div>
          </div>
          <div>
            <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">Senha</label>
            <div className="relative">
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••" required
                className="w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 pl-10 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid-gray/50" />
            </div>
          </div>

          {error && <p className="font-mono text-[9px] tracking-widest text-red-400">{error}</p>}

          <button type="submit" disabled={submitting}
            className="w-full bg-gold text-blackout font-display text-xl tracking-widest uppercase py-4 hover:bg-gold/90 transition-colors disabled:opacity-50">
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 text-center mt-8 uppercase">
          Suas credenciais foram fornecidas pelo professor
        </p>

        <div className="mt-6 text-center">
          <a href="/" className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/40 hover:text-mid-gray uppercase transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
