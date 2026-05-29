import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blackout border-t border-white/5 py-14">
      <div className="px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-display text-3xl text-white-belt tracking-wider leading-none mb-1.5">
              BLACKBOX<span className="text-gold">.</span>
            </div>
            <p className="font-mono text-[8px] tracking-[0.35em] text-mid-gray uppercase mb-4">
              JIU-JITSU
            </p>
            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/50 uppercase leading-relaxed">
              Disciplina · Processo · Transformação
            </p>
            <a
              href="https://www.instagram.com/blackboxjiujitsu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mid-gray/50 hover:text-gold transition-colors mt-5"
              aria-label="Instagram"
            >
              <Instagram size={15} />
              <span className="font-mono text-[9px] tracking-widest uppercase">@blackboxjiujitsu</span>
            </a>
          </div>

          {/* Unidades */}
          <div className="md:col-span-2 grid sm:grid-cols-3 gap-8">
            {[
              { title: 'PORTAIS', sub: 'Matriz · Cajamar, SP', tag: 'Matriz' },
              { title: 'SANTANA DE PARNAÍBA', sub: 'Santana de Parnaíba, SP', tag: null },
              { title: 'CIDADE SÃO PEDRO', sub: 'Cajamar, SP', tag: null },
            ].map((unit) => (
              <div key={unit.title}>
                {unit.tag && (
                  <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/15 text-gold uppercase px-2 py-0.5 mb-2 inline-block">
                    {unit.tag}
                  </span>
                )}
                <p className="font-mono text-[10px] tracking-[0.15em] text-white-belt uppercase leading-snug">
                  {unit.title}
                </p>
                <p className="font-mono text-[9px] text-mid-gray/50 uppercase mt-1">{unit.sub}</p>
              </div>
            ))}
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase mb-4">Navegação</p>
            <ul className="space-y-2.5">
              {['#sobre', '#modalidades', '#metodologia', '#planos', '#horarios', '#unidades', '#contato'].map((href) => (
                <li key={href}>
                  <button
                    onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/50 hover:text-gold transition-colors uppercase"
                  >
                    {href.replace('#', '')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Belt bars */}
        <div className="flex items-center gap-[5px] mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[3px] h-4 bg-mid-gray/10" />
          ))}
          <div className="w-[10px] h-[10px] border border-mid-gray/10 ml-1.5" />
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
