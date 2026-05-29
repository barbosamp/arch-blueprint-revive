import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Schedule from '@/components/Schedule';

export default function HorariosPage() {
  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Grade semanal de aulas
        </span>
      </div>

      <Schedule />

      {/* Info block */}
      <section className="py-16 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'HORÁRIOS ILUSTRATIVOS',
              desc: 'Os horários exibidos são uma referência. Confirme com sua unidade, pois podem sofrer ajustes sazonais.',
            },
            {
              title: 'AULAS REPOSTAS',
              desc: 'Perdeu uma aula? Sem problema. Você pode repor em qualquer outra unidade dentro da mesma semana.',
            },
            {
              title: 'OPEN MAT AOS SÁBADOS',
              desc: 'O Open Mat é aberto a todos os alunos. Treine livremente, desenvolva seu jogo e interaja com diferentes parceiros.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-blackout p-6">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase mb-3">{item.title}</h3>
              <p className="text-mid-gray text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder */}
      <section className="py-10 bg-blackout border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/25 uppercase">
            Em breve · Calendário de eventos · Campeonatos · Seminários
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-[clamp(28px,5vw,44px)] text-white-belt tracking-widest leading-none">
            ESCOLHA SEU HORÁRIO.
          </p>
          <Link
            to="/agendar"
            className="bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors whitespace-nowrap"
          >
            Agendar Aula
          </Link>
        </div>
      </section>
    </Layout>
  );
}
