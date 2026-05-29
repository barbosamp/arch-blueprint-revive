import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { usePainel } from '@/contexts/PainelContext';

export default function PainelLogin() {
  const { login, isAuthenticated } = usePainel();
  const navigate = useNavigate();
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  if (isAuthenticated) {
    navigate('/painel');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pw)) {
      navigate('/painel');
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-blackout flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="font-display text-4xl text-white-belt tracking-wider mb-1">
            BLACKBOX<span className="text-gold">.</span>
          </div>
          <p className="font-mono text-[9px] tracking-[0.35em] text-mid-gray uppercase">
            Painel do Professor
          </p>
        </div>

        {/* Belt bars */}
        <div className="flex items-center justify-center gap-[4px] mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[3px] h-5 bg-gold/30" />
          ))}
          <div className="w-[11px] h-[11px] border border-gold/30 ml-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">
              Senha de acesso
            </label>
            <div className="relative">
              <input
                type="password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(false); }}
                placeholder="••••••••"
                autoFocus
                required
                className="w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 pl-10 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid-gray/50" />
            </div>
            {error && (
              <p className="font-mono text-[9px] tracking-widest text-red-400 uppercase mt-2">
                Senha incorreta
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-blackout font-display text-xl tracking-widest uppercase py-4 hover:bg-gold/90 transition-colors"
          >
            Entrar
          </button>
        </form>

        <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray/30 uppercase text-center mt-8">
          Senha padrão: blackbox2025
        </p>

        <div className="mt-10 text-center">
          <a
            href="/"
            className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/40 hover:text-mid-gray uppercase transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
