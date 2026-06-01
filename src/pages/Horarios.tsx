import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { scheduleData } from '@/components/Schedule';
import { MessageCircle } from 'lucide-react';

const classStyle: Record<string, string> = {
  'BJJ Adultos Gi': 'text-white-belt',
  'BJJ No-Gi': 'text-gold',
  'BJJ Kids': 'text-gold/70',
  'BJJ Feminino': 'text-gold/80',
  'Defesa Pessoal': 'text-mid-gray',
  'Open Mat': 'text-mid-gray/60',
};

const otherUnits = [
  { name: 'PARQUE SANTANA', city: 'Santana de Parnaíba, SP', whatsapp: '5511960680648' },
  { name: 'CIDADE SÃO PEDRO', city: 'Santana de Parnaíba, SP', whatsapp: '5511975859485' },
];

export default function HorariosPage() {
  const schedule = scheduleData['Portais — Matriz'];

  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Grade semanal de aulas
        </span>
      </div>

      {/* Portais — Matriz schedule */}
      <section id="horarios" className="py-24 md:py-40 bg-blackout">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
              05 — Horários
            </span>
            <h2
              className="font-display leading-none text-white-belt tracking-wider mb-4"
              style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
            >
              TREINO
              <br />
              TODO DIA
            </h2>
            <div className="inline-flex items-center gap-3 mt-4">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-5 py-3 bg-gold text-blackout">
                Portais — Matriz
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/50 uppercase">
                Cajamar, SP
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-8 flex-wrap">
            {[
              { color: 'text-white-belt', label: 'BJJ Adultos Gi' },
              { color: 'text-gold', label: 'No-Gi' },
              { color: 'text-gold/70', label: 'Kids' },
              { color: 'text-gold/80', label: 'Feminino' },
              { color: 'text-mid-gray', label: 'Defesa / Open Mat' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-1 h-1 bg-current ${item.color}`} />
                <span className={`font-mono text-[9px] tracking-widest uppercase ${item.color}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Schedule rows */}
          <div className="flex flex-col gap-px">
            {schedule.map((day) => (
              <div key={day.day}>
                <div className="flex items-center gap-4 py-3 border-b border-white/5">
                  <span className="font-display text-4xl text-white-belt/20 tracking-widest w-16 shrink-0">
                    {day.day}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-mid-gray/60 uppercase">
                    {day.label}
                  </span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {day.classes.map((cls, i) => (
                    <div key={i} className="flex items-center gap-6 py-3 pl-4 sm:pl-20">
                      <span className="font-mono text-[11px] tracking-wider text-mid-gray w-12 shrink-0">
                        {cls.time}
                      </span>
                      <span
                        className={`font-mono text-[11px] tracking-wider uppercase flex-1 ${
                          classStyle[cls.name] ?? 'text-mid-gray'
                        }`}
                      >
                        {cls.name}
                      </span>
                      <span className="font-mono text-[9px] tracking-wider text-mid-gray/40 shrink-0">
                        {cls.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase mt-10 text-center">
            * Horários ilustrativos — confirme com sua unidade. Programação sujeita a alteração.
          </p>
        </div>
      </section>

      {/* Other units — contact CTA */}
      <section className="py-20 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
            Outras unidades
          </span>
          <h3
            className="font-display leading-none text-white-belt tracking-wider mb-4"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
          >
            HORÁRIOS SOB CONSULTA
          </h3>
          <p className="text-mid-gray text-sm leading-relaxed font-light mb-10 max-w-xl">
            As demais unidades possuem grades próprias adaptadas à região. Entre em contato diretamente com a unidade mais próxima para confirmar horários e disponibilidade.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {otherUnits.map((unit) => (
              <div key={unit.name} className="bg-blackout border border-white/5 p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white-belt uppercase mb-1">{unit.name}</p>
                <p className="font-mono text-[9px] text-mid-gray/50 uppercase mb-5">{unit.city}</p>
                <a
                  href={`https://wa.me/${unit.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de saber os horários da unidade ' + unit.name + '.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase border border-gold/40 text-gold px-4 py-2.5 hover:bg-gold hover:text-blackout transition-colors"
                >
                  <MessageCircle size={12} />
                  Consultar Horários
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info block */}
      <section className="py-16 bg-blackout border-t border-white/5">
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
            <div key={item.title} className="bg-tatame p-6">
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
