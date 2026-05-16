import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blackout border-t border-white/5 py-14">
      <div className="px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-display text-3xl text-white-belt tracking-wider leading-none">
              BLACKBOX<span className="text-gold">.</span>
            </div>
            <p className="font-mono text-[8px] tracking-[0.35em] text-mid-gray uppercase mt-1.5">
              JIU-JITSU
            </p>
          </div>

          {/* Belt bars visual */}
          <div className="flex items-center gap-[5px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[3px] h-5 bg-mid-gray/20" />
            ))}
            <div className="w-[12px] h-[12px] border border-mid-gray/20 ml-1.5" />
          </div>

          {/* Tagline */}
          <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase">
            Disciplina * Processo * Transformação
          </p>

          {/* Social */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mid-gray hover:text-gold transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="font-mono text-[9px] tracking-widest text-mid-gray/25 uppercase">
            © {new Date().getFullYear()} Blackbox Jiu-Jitsu. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
