import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-blackout overflow-hidden px-6">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 59px,#F5F5F0 59px,#F5F5F0 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,#F5F5F0 59px,#F5F5F0 60px)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold/40" />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold/60 uppercase">
            Academia de Jiu-Jitsu · 3 Unidades
          </span>
        </div>

        <h1
          className="font-display leading-none text-white-belt tracking-wider mb-2"
          style={{ fontSize: 'clamp(64px, 20vw, 200px)' }}
        >
          BLACKBOX<span className="text-gold">.</span>
        </h1>

        <div className="flex items-center justify-center my-8">
          <div className="flex-1 h-px bg-gold/15 max-w-[80px] sm:max-w-[160px]" />
          <div className="flex items-center gap-[5px] mx-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[3px] h-7 bg-gold/45" />
            ))}
            <div className="w-[14px] h-[14px] border border-gold/45 ml-1.5" />
          </div>
          <div className="flex-1 h-px bg-gold/15 max-w-[80px] sm:max-w-[160px]" />
        </div>

        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] text-mid-gray uppercase mb-4">
          Gi · No-Gi · Kids · Feminino · Defesa Pessoal
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-14 flex-wrap">
          {['Portais · Cajamar (Matriz)', 'Santana de Parnaíba', 'Cidade São Pedro · Cajamar'].map((loc) => (
            <span
              key={loc}
              className="font-mono text-[8px] tracking-[0.2em] text-gold/50 uppercase border border-white/10 px-3 py-1"
            >
              {loc}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contato"
            className="w-full sm:w-auto bg-gold text-blackout font-display text-2xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors"
          >
            Aula Experimental Grátis
          </Link>
          <Link
            to="/sobre"
            className="font-mono text-[10px] tracking-[0.25em] text-mid-gray uppercase hover:text-gold transition-colors border border-white/10 px-8 py-4 w-full sm:w-auto text-center"
          >
            Conheça a Blackbox
          </Link>
        </div>

        <p className="mt-16 font-mono text-[9px] tracking-[0.25em] text-mid-gray/35 italic">
          "A verdadeira vitória é não desistir."
        </p>
      </div>

      <Link
        to="/sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mid-gray/30 animate-bounce"
        aria-label="Ver sobre"
      >
        <ChevronDown size={20} />
      </Link>
    </section>
  );
};

export default Hero;
