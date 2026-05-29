import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { programs } from '@/components/Programs';
import { ArrowRight } from 'lucide-react';

const WHATSAPP = '5511977962165';

const unitsList = [
  { name: 'PORTAIS', city: 'Cajamar, SP', tag: 'Matriz' },
  { name: 'SANTANA DE PARNAÍBA', city: 'Santana de Parnaíba, SP', tag: null },
  { name: 'CIDADE SÃO PEDRO', city: 'Cajamar, SP', tag: null },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <Hero />

      {/* About teaser */}
      <section className="py-20 md:py-32 bg-blackout">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
                Quem somos
              </span>
              <h2
                className="font-display leading-none text-white-belt tracking-wider mb-8"
                style={{ fontSize: 'clamp(44px, 10vw, 80px)' }}
              >
                A CAIXA<br />PRETA
              </h2>
              <p className="text-mid-gray text-sm leading-relaxed font-light mb-8">
                A Blackbox não é apenas uma academia de Jiu-Jitsu. É um ambiente de
                transformação — onde qualquer pessoa entra e sai diferente, mais evoluída,
                mais consciente, mais forte. Três unidades, uma filosofia.
              </p>
              <Link
                to="/sobre"
                className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-gold uppercase hover:gap-5 transition-all"
              >
                Nossa história <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/5">
              {[
                { value: '+5', label: 'Anos' },
                { value: '3', label: 'Unidades' },
                { value: '5', label: 'Modalidades' },
              ].map((stat) => (
                <div key={stat.label} className="bg-tatame p-6 md:p-8 text-center">
                  <span className="font-display text-4xl md:text-5xl text-gold leading-none block">{stat.value}</span>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-mid-gray uppercase mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs teaser */}
      <section className="py-20 md:py-32 bg-tatame">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
                Modalidades
              </span>
              <h2
                className="font-display leading-none text-white-belt tracking-wider"
                style={{ fontSize: 'clamp(40px, 9vw, 72px)' }}
              >
                O QUE<br />ENSINAMOS
              </h2>
            </div>
            <Link
              to="/modalidades"
              className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-gold uppercase hover:gap-5 transition-all self-end mb-1"
            >
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
            {programs.map((program) => (
              <Link
                key={program.tag}
                to="/modalidades"
                className={`p-6 flex flex-col gap-3 group transition-colors hover:bg-gold/10 ${
                  program.featured ? 'bg-gold/8' : 'bg-blackout'
                }`}
              >
                <span className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">
                  {program.tag}
                </span>
                <h3 className="font-display text-white-belt tracking-wider leading-tight text-[clamp(16px,2.5vw,22px)]">
                  {program.title}
                </h3>
                <div className={`w-6 h-px mt-1 ${program.featured ? 'bg-gold' : 'bg-white/15'} group-hover:w-10 transition-all`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 bg-gold">
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] text-blackout/60 uppercase mb-1">Comece hoje</p>
            <h2 className="font-display text-[clamp(28px,6vw,52px)] text-blackout tracking-widest leading-none">
              PRIMEIRA AULA GRÁTIS
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contato"
              className="bg-blackout text-gold font-display text-xl tracking-widest uppercase px-8 py-4 hover:bg-blackout/90 transition-colors text-center"
            >
              Agendar Agora
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Quero agendar minha aula experimental grátis.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-blackout text-blackout font-display text-xl tracking-widest uppercase px-8 py-4 hover:bg-blackout hover:text-gold transition-colors text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Methodology teaser */}
      <section className="py-20 md:py-32 bg-blackout">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
                Metodologia
              </span>
              <h2
                className="font-display leading-none text-white-belt tracking-wider"
                style={{ fontSize: 'clamp(40px, 9vw, 72px)' }}
              >
                POR QUE<br />A BLACKBOX?
              </h2>
            </div>
            <Link
              to="/metodologia"
              className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-gold uppercase hover:gap-5 transition-all self-end mb-1"
            >
              Saber mais <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {[
              { n: '01', t: 'Currículo estruturado', d: 'Evolução técnica com método pedagógico claro, do iniciante ao avançado.' },
              { n: '02', t: 'Instrutores qualificados', d: 'Faixas pretas e marrons com experiência em competição e docência.' },
              { n: '03', t: 'Ambiente seguro', d: 'Tatame de aprendizado, sem ego. Integridade física e emocional em primeiro lugar.' },
              { n: '04', t: 'Dois caminhos', d: 'Competição ou saúde. Você define o objetivo, nós criamos o caminho.' },
            ].map((item) => (
              <div key={item.n} className="bg-tatame p-6 md:p-8 flex flex-col gap-3">
                <span className="font-mono text-[9px] text-gold/50 tracking-widest">{item.n}</span>
                <h3 className="font-display text-[clamp(18px,2.5vw,24px)] text-white-belt tracking-widest leading-tight">
                  {item.t.toUpperCase()}
                </h3>
                <p className="text-mid-gray text-xs leading-relaxed font-light">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Units teaser */}
      <section className="py-20 md:py-32 bg-tatame">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
                Unidades
              </span>
              <h2
                className="font-display leading-none text-white-belt tracking-wider"
                style={{ fontSize: 'clamp(40px, 9vw, 72px)' }}
              >
                PERTO<br />DE VOCÊ
              </h2>
            </div>
            <Link
              to="/unidades"
              className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-gold uppercase hover:gap-5 transition-all self-end mb-1"
            >
              Ver todas unidades <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {unitsList.map((unit) => (
              <Link
                key={unit.name}
                to="/unidades"
                className="bg-blackout p-8 flex flex-col gap-4 group hover:bg-gold/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  {unit.tag && (
                    <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/15 text-gold uppercase px-2 py-0.5">
                      {unit.tag}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-[clamp(20px,3vw,26px)] text-white-belt tracking-wider leading-tight group-hover:text-gold transition-colors">
                    {unit.name}
                  </h3>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-gold/50 uppercase mt-1">{unit.city}</p>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/50 uppercase group-hover:text-gold transition-colors">
                    Ver detalhes
                  </span>
                  <ArrowRight size={12} className="text-mid-gray/50 group-hover:text-gold transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
