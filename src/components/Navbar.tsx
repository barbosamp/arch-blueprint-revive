import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'A Blackbox', to: '/sobre' },
  { label: 'Modalidades', to: '/modalidades' },
  { label: 'Metodologia', to: '/metodologia' },
  { label: 'Planos', to: '/planos' },
  { label: 'Horários', to: '/horarios' },
  { label: 'Unidades', to: '/unidades' },
  { label: 'Contato', to: '/contato' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-blackout/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex flex-col items-start">
            <span className="font-display text-2xl text-white-belt leading-none tracking-wider">
              BLACKBOX<span className="text-gold">.</span>
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-mid-gray uppercase mt-0.5">
              JIU-JITSU
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                    isActive ? 'text-gold' : 'text-mid-gray hover:text-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/agendar"
            className="hidden lg:inline-block bg-gold text-blackout font-display text-base tracking-widest uppercase px-5 py-2.5 hover:bg-gold/90 transition-colors"
          >
            Aula Grátis
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white-belt p-2"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 bg-blackout z-[60] flex flex-col transition-transform duration-500 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
          <span className="font-display text-2xl text-white-belt tracking-wider">
            BLACKBOX<span className="text-gold">.</span>
          </span>
          <button onClick={() => setIsOpen(false)} className="text-white-belt p-2" aria-label="Fechar menu">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 gap-7">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-baseline gap-5 text-left group ${isActive ? 'text-gold' : ''}`
              }
            >
              <span className="font-mono text-[9px] text-gold/40 tracking-widest w-6">
                0{i + 1}
              </span>
              <span className="font-display text-[clamp(28px,9vw,44px)] tracking-widest leading-none group-hover:text-gold transition-colors text-inherit">
                {link.label.toUpperCase()}
              </span>
            </NavLink>
          ))}
        </div>

        <div className="px-8 py-8 border-t border-white/5 space-y-4">
          <Link
            to="/agendar"
            onClick={() => setIsOpen(false)}
            className="block w-full bg-gold text-blackout font-display text-2xl tracking-widest text-center py-4 uppercase"
          >
            Aula Experimental Grátis
          </Link>
          <p className="font-mono text-[9px] text-mid-gray tracking-[0.3em] uppercase text-center">
            3 Unidades · Cajamar · Santana de Parnaíba
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
