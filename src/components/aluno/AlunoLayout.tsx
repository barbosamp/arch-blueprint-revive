import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, BarChart2, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  { to: '/aluno', label: 'Início', icon: LayoutDashboard, end: true },
  { to: '/aluno/horarios', label: 'Horários', icon: Calendar },
  { to: '/aluno/frequencia', label: 'Frequência', icon: BarChart2 },
  { to: '/aluno/perfil', label: 'Perfil', icon: User },
];

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => { await signOut(); navigate('/aluno'); };

  return (
    <div className="min-h-screen bg-blackout">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-blackout border-b border-white/5 flex items-center justify-between px-5 py-4">
        <div>
          <div className="font-display text-lg text-white-belt tracking-wider leading-none">
            BLACKBOX<span className="text-gold">.</span>
          </div>
          {profile && (
            <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray uppercase mt-0.5">
              {profile.name}
            </p>
          )}
        </div>
        <button onClick={() => setOpen(true)} className="text-white-belt p-1 md:hidden">
          <Menu size={20} />
        </button>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${isActive ? 'text-gold' : 'text-mid-gray hover:text-white-belt'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <button onClick={handleLogout} className="font-mono text-[10px] tracking-[0.2em] text-mid-gray hover:text-gold uppercase transition-colors flex items-center gap-1.5">
            <LogOut size={12} />Sair
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[70] flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-64 bg-blackout border-r border-white/5 flex flex-col h-full">
            <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
              <span className="font-display text-xl text-white-belt tracking-wider">BLACKBOX<span className="text-gold">.</span></span>
              <button onClick={() => setOpen(false)} className="text-mid-gray"><X size={18} /></button>
            </div>
            <nav className="flex-1 py-6 flex flex-col gap-1">
              {links.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${isActive ? 'text-gold' : 'text-mid-gray hover:text-white-belt'}`
                  }
                >
                  <Icon size={14} className="shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="px-6 py-4 border-t border-white/5">
              <button onClick={handleLogout} className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mid-gray hover:text-gold uppercase">
                <LogOut size={13} />Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="pt-16 min-h-screen">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-blackout border-t border-white/5 flex z-40">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${isActive ? 'text-gold' : 'text-mid-gray'}`
            }
          >
            <Icon size={18} />
            <span className="font-mono text-[7px] tracking-widest uppercase">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
