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

      {/* Team section */}
      <section className="py-20 md:py-32 bg-blackout border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-10">
            Nossa Equipe
          </span>
          <h2
            className="font-display leading-none text-white-belt tracking-wider mb-16"
            style={{ fontSize: 'clamp(36px, 7vw, 60px)' }}
          >
            OS PROFESSORES
          </h2>

          {[
            {
              unit: 'PORTAIS — MATRIZ',
              city: 'Cajamar, SP',
              instagram: '@blackboxcajamar',
              coaches: [
                {
                  name: 'Jacson Ferreira',
                  role: 'Head Coach Principal',
                  bio: 'Formado em Educação Física com especialização em psicomotricidade e TEA — Transtorno do Espectro Autista.',
                },
                {
                  name: 'Carine DuJardin',
                  role: 'Professora · Turma Feminina',
                  bio: null,
                },
              ],
            },
            {
              unit: 'PARQUE SANTANA',
              city: 'Santana de Parnaíba, SP',
              instagram: '@blackbox_pqsantana',
              coaches: [
                {
                  name: 'Jocsan Ferreira',
                  role: 'Head Coach',
                  bio: null,
                },
                {
                  name: 'Angel Souza',
                  role: 'Professora · Turma Feminina',
                  bio: null,
                },
              ],
            },
            {
              unit: 'CIDADE SÃO PEDRO',
              city: 'Santana de Parnaíba, SP',
              instagram: '@blackbox_cidadesaopedro',
              coaches: [
                {
                  name: 'Jonatas Ferreira',
                  role: 'Head Coach',
                  bio: null,
                },
                {
                  name: 'Gabriela Iak',
                  role: 'Professora · Turma Feminina',
                  bio: null,
                },
              ],
            },
          ].map((loc) => (
            <div key={loc.unit} className="mb-16 last:mb-0">
              <div className="flex items-baseline gap-4 mb-6 border-b border-white/5 pb-4">
                <h3 className="font-display text-[clamp(18px,3vw,26px)] text-white-belt tracking-widest">
                  {loc.unit}
                </h3>
                <span className="font-mono text-[9px] tracking-[0.2em] text-gold/50 uppercase">{loc.city}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {loc.coaches.map((c) => (
                  <div key={c.name} className="bg-tatame border border-white/5 p-6 flex gap-5">
                    <div className="w-12 h-12 bg-blackout border border-white/10 flex items-center justify-center shrink-0">
                      <span className="font-display text-xl text-gold/30">
                        {c.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-[clamp(16px,2.5vw,20px)] text-white-belt tracking-wider leading-none mb-1">
                        {c.name.toUpperCase()}
                      </p>
                      <p className="font-mono text-[9px] tracking-[0.25em] text-gold uppercase mb-2">{c.role}</p>
                      {c.bio && (
                        <p className="text-mid-gray text-xs leading-relaxed font-light">{c.bio}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
