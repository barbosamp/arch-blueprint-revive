import { useState } from 'react';

const units = ['Portais — Matriz', 'Santana de Parnaíba', 'Cidade São Pedro'];

const scheduleData: Record<string, { day: string; label: string; classes: { time: string; name: string; duration: string }[] }[]> = {
  'Portais — Matriz': [
    {
      day: 'SEG', label: 'Segunda-Feira',
      classes: [
        { time: '07:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '12:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'TER', label: 'Terça-Feira',
      classes: [
        { time: '07:00', name: 'BJJ No-Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Feminino', duration: '1h' },
      ],
    },
    {
      day: 'QUA', label: 'Quarta-Feira',
      classes: [
        { time: '07:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '12:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ No-Gi', duration: '1h30' },
      ],
    },
    {
      day: 'QUI', label: 'Quinta-Feira',
      classes: [
        { time: '07:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'Defesa Pessoal', duration: '1h' },
      ],
    },
    {
      day: 'SEX', label: 'Sexta-Feira',
      classes: [
        { time: '07:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '12:00', name: 'BJJ No-Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'SAB', label: 'Sábado',
      classes: [
        { time: '09:00', name: 'BJJ Kids', duration: '1h' },
        { time: '10:00', name: 'Open Mat', duration: '2h' },
      ],
    },
  ],
  'Santana de Parnaíba': [
    {
      day: 'SEG', label: 'Segunda-Feira',
      classes: [
        { time: '07:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'TER', label: 'Terça-Feira',
      classes: [
        { time: '19:00', name: 'BJJ Feminino', duration: '1h' },
        { time: '20:00', name: 'BJJ No-Gi', duration: '1h' },
      ],
    },
    {
      day: 'QUA', label: 'Quarta-Feira',
      classes: [
        { time: '07:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'QUI', label: 'Quinta-Feira',
      classes: [
        { time: '19:00', name: 'BJJ No-Gi', duration: '1h' },
        { time: '20:00', name: 'Defesa Pessoal', duration: '1h' },
      ],
    },
    {
      day: 'SEX', label: 'Sexta-Feira',
      classes: [
        { time: '07:00', name: 'BJJ Adultos Gi', duration: '1h' },
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'SAB', label: 'Sábado',
      classes: [
        { time: '09:00', name: 'BJJ Kids', duration: '1h' },
        { time: '10:00', name: 'Open Mat', duration: '2h' },
      ],
    },
  ],
  'Cidade São Pedro': [
    {
      day: 'SEG', label: 'Segunda-Feira',
      classes: [
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'TER', label: 'Terça-Feira',
      classes: [
        { time: '19:00', name: 'BJJ No-Gi', duration: '1h' },
        { time: '20:00', name: 'BJJ Feminino', duration: '1h' },
      ],
    },
    {
      day: 'QUA', label: 'Quarta-Feira',
      classes: [
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'QUI', label: 'Quinta-Feira',
      classes: [
        { time: '19:00', name: 'BJJ No-Gi', duration: '1h' },
        { time: '20:00', name: 'Defesa Pessoal', duration: '1h' },
      ],
    },
    {
      day: 'SEX', label: 'Sexta-Feira',
      classes: [
        { time: '19:00', name: 'BJJ Kids', duration: '1h' },
        { time: '20:00', name: 'BJJ Adultos Gi', duration: '1h30' },
      ],
    },
    {
      day: 'SAB', label: 'Sábado',
      classes: [
        { time: '10:00', name: 'Open Mat', duration: '2h' },
      ],
    },
  ],
};

const classStyle: Record<string, string> = {
  'BJJ Adultos Gi': 'text-white-belt',
  'BJJ No-Gi': 'text-gold',
  'BJJ Kids': 'text-gold/70',
  'BJJ Feminino': 'text-gold/80',
  'Defesa Pessoal': 'text-mid-gray',
  'Open Mat': 'text-mid-gray/60',
};

const Schedule = () => {
  const [activeUnit, setActiveUnit] = useState(units[0]);
  const schedule = scheduleData[activeUnit];

  return (
    <section id="horarios" className="py-24 md:py-40 bg-blackout">
      <div className="px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
            05 — Horários
          </span>
          <h2
            className="font-display leading-none text-white-belt tracking-wider mb-8"
            style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
          >
            TREINO
            <br />
            TODO DIA
          </h2>

          {/* Unit tabs */}
          <div className="flex gap-px flex-wrap">
            {units.map((unit) => (
              <button
                key={unit}
                onClick={() => setActiveUnit(unit)}
                className={`font-mono text-[9px] tracking-[0.25em] uppercase px-5 py-3 transition-colors ${
                  activeUnit === unit
                    ? 'bg-gold text-blackout'
                    : 'bg-tatame text-mid-gray hover:text-white-belt'
                }`}
              >
                {unit}
              </button>
            ))}
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
  );
};

export default Schedule;
