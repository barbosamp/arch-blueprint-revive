import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'A Blackbox', href: '#sobre' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Valores', href: '#valores' },
  { label: 'Contato', href: '#contato' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-blackout/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
          <button onClick={() => handleClick('#inicio')} className="flex flex-col items-start">
            <span className="font-display text-2xl text-white-belt leading-none tracking-wider">
              BLACKBOX<span className="text-gold">.</span>
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-mid-gray uppercase mt-0.5">
              JIU-JITSU
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="font-mono text-[10px] tracking-[0.2em] text-mid-gray hover:text-gold transition-colors uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); handleClick('#contato'); }}
            className="hidden md:inline-block border border-gold/60 text-gold font-mono text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-gold hover:text-blackout transition-colors"
          >
            Agendar Aula
          </a>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white-belt p-2"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 bg-blackout z-[60] flex flex-col transition-transform duration-500 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
          <span className="font-display text-2xl text-white-belt tracking-wider">
            BLACKBOX<span className="text-gold">.</span>
          </span>
          <button onClick={() => setIsOpen(false)} className="text-white-belt p-2" aria-label="Fechar menu">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 gap-10">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="flex items-baseline gap-5 text-left group"
            >
              <span className="font-mono text-[9px] text-gold/40 tracking-widest w-6">
                0{i + 1}
              </span>
              <span className="font-display text-[clamp(32px,10vw,48px)] text-white-belt group-hover:text-gold transition-colors tracking-widest leading-none">
                {link.label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        <div className="px-8 py-8 border-t border-white/5 space-y-4">
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); handleClick('#contato'); }}
            className="block w-full bg-gold text-blackout font-display text-2xl tracking-widest text-center py-4 uppercase"
          >
            Agendar Aula Grátis
          </a>
          <p className="font-mono text-[9px] text-mid-gray tracking-[0.3em] uppercase text-center">
            Disciplina * Processo * Transformação
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
