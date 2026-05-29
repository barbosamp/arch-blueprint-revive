import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import About from '@/components/About';

export default function Sobre() {
  return (
    <Layout>
      {/* Page header */}
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          A Academia
        </span>
      </div>

      {/* Main content */}
      <About />

      {/* Values section */}
      <section className="py-20 md:py-32 bg-tatame">
        <div className="px-6 max-w-6xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-10">
            Nossos pilares
          </span>
          <div className="divide-y divide-white/5">
            {[
              { n: '01', t: 'DISCIPLINA', d: 'Consistência e presença em cada treino. Não é sobre perfeição — é sobre aparecer, todos os dias.' },
              { n: '02', t: 'PROCESSO', d: 'Respeito pelas etapas, sem atalhos. Cada faixa é conquistada, nunca dada. O caminho é o destino.' },
              { n: '03', t: 'TRANSFORMAÇÃO', d: 'Cada faixa é uma versão nova de si mesmo. Você entra de um jeito. Sai diferente — mais forte, mais consciente.' },
              { n: '04', t: 'COMUNIDADE', d: 'O tatame nos iguala. Dentro da Blackbox, não existe hierarquia fora do kimono. Somos todos faixa branca em alguma coisa.' },
              { n: '05', t: 'PROTEÇÃO', d: 'Jiu-Jitsu não é sobre violência — é sobre segurança. Proteger a si mesmo e quem você ama é um direito, não um privilégio.' },
            ].map((v) => (
              <div
                key={v.n}
                className="py-7 md:py-9 grid md:grid-cols-[60px_200px_1fr] gap-4 md:gap-10 items-start group cursor-default"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-gold/40 pt-1">{v.n}</span>
                <h3 className="font-display text-[clamp(24px,4.5vw,34px)] text-white-belt tracking-widest group-hover:text-gold transition-colors duration-300 leading-none">
                  {v.t}
                </h3>
                <p className="text-mid-gray text-sm leading-relaxed font-light">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="py-20 md:py-32 bg-blackout border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto text-center">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold/40 uppercase block mb-6">
            Em breve
          </span>
          <h2 className="font-display text-[clamp(32px,7vw,60px)] text-white-belt/20 tracking-widest leading-none mb-4">
            NOSSA EQUIPE
          </h2>
          <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/30 uppercase">
            Conheça os instrutores da Blackbox · Em breve nesta página
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-[clamp(28px,5vw,44px)] text-white-belt tracking-widest leading-none">
            PRONTO PARA COMEÇAR?
          </p>
          <Link
            to="/agendar"
            className="bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors whitespace-nowrap"
          >
            Aula Grátis
          </Link>
        </div>
      </section>
    </Layout>
  );
}
