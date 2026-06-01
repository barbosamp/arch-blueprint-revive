import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { MessageCircle } from 'lucide-react';

type ClassEntry = { time: string; end: string; name: string };
type DaySchedule = { day: string; label: string; classes: ClassEntry[] };
type TatameData = { tatame: string; days: DaySchedule[] };

const adultSchedule: TatameData[] = [
  {
    tatame: 'Tatame 1',
    days: [
      { day: 'SEG', label: 'Segunda', classes: [
        { time: '07:00', end: '08:00', name: 'Misto GI' },
        { time: '13:00', end: '14:00', name: 'Misto GI' },
        { time: '19:50', end: '21:00', name: 'Avançado GI' },
      ]},
      { day: 'TER', label: 'Terça', classes: [
        { time: '07:00', end: '08:00', name: 'Misto No-Gi' },
        { time: '13:00', end: '14:00', name: 'Misto No-Gi' },
        { time: '19:50', end: '21:00', name: 'Misto GI' },
      ]},
      { day: 'QUA', label: 'Quarta', classes: [
        { time: '07:00', end: '08:00', name: 'Misto GI' },
        { time: '13:00', end: '14:00', name: 'Misto GI' },
        { time: '19:50', end: '21:00', name: 'Avançado GI' },
      ]},
      { day: 'QUI', label: 'Quinta', classes: [
        { time: '07:00', end: '08:00', name: 'Misto No-Gi' },
        { time: '13:00', end: '14:00', name: 'Misto No-Gi' },
        { time: '19:50', end: '21:00', name: 'Misto GI' },
      ]},
      { day: 'SEX', label: 'Sexta', classes: [
        { time: '07:00', end: '08:00', name: 'Open Mat' },
        { time: '13:00', end: '14:00', name: 'Open Mat' },
        { time: '19:50', end: '21:00', name: 'Open Mat' },
      ]},
      { day: 'SAB', label: 'Sábado', classes: [
        { time: '09:00', end: '10:00', name: 'Tatame Livre' },
      ]},
    ],
  },
  {
    tatame: 'Tatame 2',
    days: [
      { day: 'SEG', label: 'Segunda', classes: [
        { time: '18:30', end: '19:40', name: 'Feminino GI' },
        { time: '19:50', end: '21:00', name: 'Iniciantes GI' },
        { time: '21:15', end: '22:00', name: 'No-Gi' },
      ]},
      { day: 'TER', label: 'Terça', classes: [
        { time: '18:30', end: '19:40', name: 'Misto GI' },
        { time: '19:50', end: '21:00', name: 'Teens GI' },
      ]},
      { day: 'QUA', label: 'Quarta', classes: [
        { time: '18:30', end: '19:40', name: 'Feminino GI' },
        { time: '19:50', end: '21:00', name: 'Iniciantes GI' },
        { time: '21:15', end: '22:00', name: 'No-Gi' },
      ]},
      { day: 'QUI', label: 'Quinta', classes: [
        { time: '18:30', end: '19:40', name: 'Misto GI' },
        { time: '19:50', end: '21:00', name: 'Teens GI' },
      ]},
      { day: 'SEX', label: 'Sexta', classes: [
        { time: '18:30', end: '19:40', name: 'Feminino GI · Open Mat' },
        { time: '19:50', end: '21:00', name: 'Tatame Livre' },
      ]},
    ],
  },
  {
    tatame: 'Tatame 3',
    days: [
      { day: 'SEG', label: 'Segunda', classes: [
        { time: '18:30', end: '19:30', name: 'Misto GI Masc.' },
      ]},
      { day: 'QUA', label: 'Quarta', classes: [
        { time: '18:30', end: '19:30', name: 'Misto GI Masc.' },
      ]},
    ],
  },
];

const kidsSchedule: TatameData[] = [
  {
    tatame: 'Tatame 1',
    days: [
      { day: 'SEG', label: 'Segunda', classes: [
        { time: '17:00', end: '18:00', name: 'Kids I' },
        { time: '18:30', end: '19:30', name: 'Kids II' },
      ]},
      { day: 'TER', label: 'Terça', classes: [
        { time: '17:00', end: '18:00', name: 'Kids I' },
        { time: '18:30', end: '19:30', name: 'Kids Geral' },
      ]},
      { day: 'QUA', label: 'Quarta', classes: [
        { time: '17:00', end: '18:00', name: 'Kids I' },
        { time: '18:30', end: '19:30', name: 'Kids II' },
      ]},
      { day: 'QUI', label: 'Quinta', classes: [
        { time: '17:00', end: '18:00', name: 'Kids I' },
        { time: '18:30', end: '19:30', name: 'Kids Geral' },
      ]},
      { day: 'SEX', label: 'Sexta', classes: [
        { time: '18:30', end: '19:30', name: 'Kids II' },
      ]},
    ],
  },
  {
    tatame: 'Tatame 2',
    days: [
      { day: 'TER', label: 'Terça', classes: [
        { time: '19:50', end: '21:00', name: 'Teens +13 anos' },
      ]},
      { day: 'QUI', label: 'Quinta', classes: [
        { time: '19:50', end: '21:00', name: 'Teens +13 anos' },
      ]},
    ],
  },
  {
    tatame: 'Tatame 3',
    days: [
      { day: 'TER', label: 'Terça', classes: [
        { time: '18:30', end: '19:30', name: 'Kids I' },
        { time: '19:50', end: '20:50', name: 'Kids Geral' },
      ]},
      { day: 'QUI', label: 'Quinta', classes: [
        { time: '18:30', end: '19:30', name: 'Kids I' },
        { time: '19:50', end: '20:50', name: 'Kids Geral' },
      ]},
    ],
  },
];

const classColor: Record<string, string> = {
  'Misto GI': 'text-white-belt',
  'Misto GI Masc.': 'text-white-belt',
  'Avançado GI': 'text-gold',
  'Misto No-Gi': 'text-gold',
  'No-Gi': 'text-gold',
  'Feminino GI': 'text-[#d4a8e0]',
  'Feminino GI · Open Mat': 'text-[#d4a8e0]',
  'Iniciantes GI': 'text-mid-gray',
  'Teens GI': 'text-gold/70',
  'Teens +13 anos': 'text-gold/70',
  'Open Mat': 'text-mid-gray/60',
  'Tatame Livre': 'text-mid-gray/40',
  'Kids I': 'text-[#7ecfb2]',
  'Kids II': 'text-[#7ecfb2]/80',
  'Kids Geral': 'text-[#7ecfb2]/60',
};

const adultLegend = [
  { color: 'bg-white-belt', label: 'Misto', desc: 'Iniciante + Avançado · com kimono' },
  { color: 'bg-gold', label: 'No-Gi / Avançado', desc: 'Sem kimono / Somente graduados' },
  { color: 'bg-[#d4a8e0]', label: 'Feminino', desc: 'Treino 100% feminino' },
  { color: 'bg-mid-gray', label: 'Iniciantes', desc: 'Apenas faixas brancas' },
  { color: 'bg-gold/70', label: 'Teens', desc: '13 a 15 anos' },
  { color: 'bg-mid-gray/40', label: 'Open Mat / Tatame Livre', desc: 'Treino livre · toda sexta' },
];

const kidsLegend = [
  { color: 'bg-[#7ecfb2]', label: 'Kids I', desc: '4 a 6 anos' },
  { color: 'bg-[#7ecfb2]/80', label: 'Kids II', desc: '6 a 12 anos' },
  { color: 'bg-[#7ecfb2]/60', label: 'Kids Geral', desc: '+5 anos · turmas mistas kids' },
  { color: 'bg-gold/70', label: 'Teens', desc: '+13 anos' },
];

const otherUnits = [
  { name: 'PARQUE SANTANA', city: 'Santana de Parnaíba, SP', whatsapp: '5511960680648' },
  { name: 'CIDADE SÃO PEDRO', city: 'Santana de Parnaíba, SP', whatsapp: '5511975859485' },
];

type Tab = 'adultos' | 'kids';

function ScheduleGrid({ data }: { data: TatameData[] }) {
  return (
    <div className="space-y-10">
      {data.map((tatame) => (
        <div key={tatame.tatame}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[3px] h-5 bg-gold/50 shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
              {tatame.tatame}
            </span>
          </div>
          <div className="flex flex-col gap-px">
            {tatame.days.map((day) => (
              <div key={day.day} className="flex gap-4 sm:gap-8 py-3 border-b border-white/5">
                <div className="w-10 sm:w-14 shrink-0 pt-0.5">
                  <span className="font-display text-2xl sm:text-3xl text-white-belt/15 tracking-widest">
                    {day.day}
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {day.classes.map((cls, i) => (
                    <div key={i} className="flex items-baseline gap-3 sm:gap-5">
                      <span className="font-mono text-[10px] text-mid-gray/60 w-24 shrink-0">
                        {cls.time}–{cls.end}
                      </span>
                      <span
                        className={`font-mono text-[11px] tracking-wider uppercase ${
                          classColor[cls.name] ?? 'text-mid-gray'
                        }`}
                      >
                        {cls.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HorariosPage() {
  const [tab, setTab] = useState<Tab>('adultos');
  const legend = tab === 'adultos' ? adultLegend : kidsLegend;

  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Grade semanal de aulas
        </span>
      </div>

      <section id="horarios" className="py-24 md:py-40 bg-blackout">
        <div className="px-6 max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
              05 — Horários
            </span>
            <h2
              className="font-display leading-none text-white-belt tracking-wider mb-2"
              style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
            >
              TREINO
              <br />
              TODO DIA
            </h2>
            <div className="flex items-center gap-3 mt-6 mb-2">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-4 py-2 bg-gold/10 text-gold border border-gold/20">
                Portais — Matriz · Cajamar, SP
              </span>
            </div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/50 uppercase mt-2">
              Toda sexta-feira · Open Mat em todos os tatames
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex gap-px mb-12">
            {(['adultos', 'kids'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 transition-colors ${
                  tab === t
                    ? 'bg-gold text-blackout'
                    : 'bg-tatame text-mid-gray hover:text-white-belt'
                }`}
              >
                {t === 'adultos' ? 'Adultos' : 'Kids & Teens'}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10 pb-8 border-b border-white/5">
            {legend.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.color}`} />
                <span className="font-mono text-[9px] tracking-widest uppercase text-white-belt/70">
                  {item.label}
                </span>
                <span className="font-mono text-[9px] text-mid-gray/40 hidden sm:inline">
                  — {item.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Schedule grid */}
          {tab === 'adultos' ? (
            <ScheduleGrid data={adultSchedule} />
          ) : (
            <ScheduleGrid data={kidsSchedule} />
          )}

          <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase mt-12 text-center">
            * Horários ilustrativos — confirme com sua unidade. Programação sujeita a alteração.
          </p>
        </div>
      </section>

      {/* Observations */}
      <section className="py-16 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-6">Legenda</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { t: 'MISTO', d: 'Iniciante + Avançado juntos' },
              { t: 'INICIANTES', d: 'Exclusivo para faixas brancas' },
              { t: 'FEMININO', d: 'Treino 100% feminino' },
              { t: 'AVANÇADO', d: 'Apenas faixas graduadas' },
              { t: 'GI', d: 'Com kimono' },
              { t: 'NO-GI', d: 'Sem kimono' },
              { t: 'OPEN MAT', d: 'Treino livre · toda sexta' },
              { t: 'KIDS I', d: '4 a 6 anos' },
              { t: 'KIDS II', d: '6 a 12 anos' },
              { t: 'KIDS GERAL', d: '+5 anos · turmas mistas kids' },
              { t: 'TEENS', d: '13 a 15 anos' },
            ].map((item) => (
              <div key={item.t} className="flex items-baseline gap-3">
                <span className="font-mono text-[9px] tracking-[0.2em] text-gold/60 uppercase w-28 shrink-0">{item.t}</span>
                <span className="font-mono text-[9px] text-mid-gray/50">{item.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other units — contact CTA */}
      <section className="py-20 bg-blackout border-t border-white/5">
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
            As demais unidades possuem grades próprias adaptadas à região. Entre em contato diretamente para confirmar horários e disponibilidade.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {otherUnits.map((unit) => (
              <div key={unit.name} className="bg-tatame border border-white/5 p-6">
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

      {/* Info blocks */}
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
              title: 'OPEN MAT AOS SEXTAS',
              desc: 'Toda sexta-feira é Open Mat em todos os tatames. Treine livremente, desenvolva seu jogo, interaja com diferentes parceiros.',
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
