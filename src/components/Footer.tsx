import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const footerLinks = [
  { label: 'A Blackbox', to: '/sobre' },
  { label: 'Modalidades', to: '/modalidades' },
  { label: 'Metodologia', to: '/metodologia' },
  { label: 'Planos', to: '/planos' },
  { label: 'Horários', to: '/horarios' },
  { label: 'Unidades', to: '/unidades' },
  { label: 'Contato', to: '/contato' },
];

const Footer = () => {
  return (
    <footer className="bg-blackout border-t border-white/5 py-14">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="block">
              <div className="font-display text-3xl text-white-belt tracking-wider leading-none mb-1.5">
                BLACKBOX<span className="text-gold">.</span>
              </div>
              <p className="font-mono text-[8px] tracking-[0.35em] text-mid-gray uppercase mb-4">
                JIU-JITSU
              </p>
            </Link>
            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/50 uppercase leading-relaxed mb-5">
              Disciplina · Processo · Transformação
            </p>
            <a
              href="https://www.instagram.com/blackboxbjj/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mid-gray/50 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={15} />
              <span className="font-mono text-[9px] tracking-widest uppercase">@blackboxbjj</span>
            </a>
          </div>

          {/* Unidades */}
          <div className="md:col-span-2 grid sm:grid-cols-3 gap-8">
            {[
              { title: 'PORTAIS', sub: 'Matriz · Cajamar, SP', tag: 'Matriz', ig: '@blackboxcajamar', igUrl: 'https://www.instagram.com/blackboxcajamar/' },
              { title: 'PARQUE SANTANA', sub: 'Santana de Parnaíba, SP', tag: null, ig: '@blackbox_pqsantana', igUrl: 'https://www.instagram.com/blackbox_pqsantana/' },
              { title: 'CIDADE SÃO PEDRO', sub: 'Santana de Parnaíba, SP', tag: null, ig: '@blackbox_cidadesaopedro', igUrl: 'https://www.instagram.com/blackbox_cidadesaopedro/' },
            ].map((unit) => (
              <div key={unit.title} className="group">
                {unit.tag && (
                  <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/15 text-gold uppercase px-2 py-0.5 mb-2 inline-block">
                    {unit.tag}
                  </span>
                )}
                <p className="font-mono text-[10px] tracking-[0.15em] text-white-belt uppercase leading-snug">
                  {unit.title}
                </p>
                <p className="font-mono text-[9px] text-mid-gray/50 uppercase mt-1 mb-1">{unit.sub}</p>
                <a
                  href={unit.igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[8px] tracking-[0.15em] text-gold/40 hover:text-gold transition-colors uppercase"
                >
                  {unit.ig}
                </a>
              </div>
            ))}
          </div>

          {/* Nav links */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase mb-4">Navegação</p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/50 hover:text-gold transition-colors uppercase"
                  >
                    {link.label}
                  </Link>
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
