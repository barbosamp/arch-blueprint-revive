import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Users, Calendar, Award, CreditCard, LayoutDashboard,
  LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { usePainel } from '@/contexts/PainelContext';

const links = [
  { to: '/painel', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/painel/alunos', label: 'Alunos', icon: Users },
  { to: '/painel/horarios', label: 'Horários', icon: Calendar },
  { to: '/painel/graduacao', label: 'Graduação', icon: Award },
  { to: '/painel/planos', label: 'Planos', icon: CreditCard },
  { to: '/painel/pagamentos', label: 'Pagamentos', icon: CreditCard },
];

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  const { logout } = usePainel();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/painel/login'); };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
              isActive
                ? 'text-gold border-l-2 border-gold bg-gold/5 pl-[14px]'
                : 'text-mid-gray hover:text-white-belt border-l-2 border-transparent pl-[14px]'
            }`
          }
        >
          <Icon size={14} className="shrink-0" />
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-blackout flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-white/5 shrink-0">
        <div className="px-6 py-6 border-b border-white/5">
          <div className="font-display text-xl text-white-belt tracking-wider">
            BLACKBOX<span className="text-gold">.</span>
          </div>
          <p className="font-mono text-[8px] tracking-[0.3em] text-mid-gray uppercase mt-0.5">
            Painel do Professor
          </p>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1">
          <NavLinks />
        </nav>
        <div className="px-6 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mid-gray hover:text-gold transition-colors uppercase"
          >
            <LogOut size={13} />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-blackout border-b border-white/5 flex items-center justify-between px-5 py-4">
        <div className="font-display text-lg text-white-belt tracking-wider">
          BLACKBOX<span className="text-gold">.</span>
        </div>
        <button onClick={() => setOpen(true)} className="text-white-belt p-1">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[70] flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="relative w-64 bg-blackout border-r border-white/5 flex flex-col h-full">
            <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="font-display text-xl text-white-belt tracking-wider">
                BLACKBOX<span className="text-gold">.</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-mid-gray">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 py-4 flex flex-col gap-1">
              <NavLinks onClick={() => setOpen(false)} />
            </nav>
            <div className="px-6 py-4 border-t border-white/5">
              <button onClick={handleLogout} className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mid-gray hover:text-gold transition-colors uppercase">
                <LogOut size={13} />
                Sair
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 md:overflow-auto">
        <div className="pt-16 md:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-6 md:px-8 py-6 border-b border-white/5 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl text-white-belt tracking-wider">{title}</h1>
        {subtitle && (
          <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray uppercase mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function GoldButton({ onClick, children, type = 'button', className = '' }: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gold text-blackout font-display tracking-widest uppercase px-5 py-2.5 text-base hover:bg-gold/90 transition-colors flex items-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ onClick, children, className = '' }: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border border-white/15 text-mid-gray font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 hover:border-gold/40 hover:text-gold transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputCls = 'w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-gold/50 transition-colors';
export const selectCls = inputCls + ' appearance-none cursor-pointer';
