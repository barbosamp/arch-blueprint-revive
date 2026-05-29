import { useEffect, useState } from 'react';
import AlunoLayout from '@/components/aluno/AlunoLayout';
import { supabase } from '@/lib/supabase';
import { DAY_LABELS, MODALITY_LABELS } from '@/types/painel';
import type { Schedule } from '@/lib/database.types';

export default function AlunoHorarios() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    supabase.from('schedules').select('*').order('day_of_week').order('time')
      .then(({ data }) => { if (data) setSchedules(data as Schedule[]); });
  }, []);

  const today = new Date().getDay();

  const byDay = DAY_LABELS.map((label, day) => ({
    label,
    day,
    isToday: day === today,
    classes: schedules.filter((s) => s.day_of_week === day),
  })).filter((d) => d.classes.length > 0);

  return (
    <AlunoLayout>
      <div className="px-5 py-8 pb-24 md:pb-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase mb-2">Grade de aulas</p>
          <h1 className="font-display text-4xl text-white-belt tracking-wider">HORÁRIOS</h1>
        </div>

        <div className="space-y-1">
          {byDay.length === 0 && (
            <p className="font-mono text-[10px] text-mid-gray/40 uppercase tracking-wider py-10 text-center">
              Nenhum horário cadastrado
            </p>
          )}
          {byDay.map(({ label, day, isToday, classes }) => (
            <div key={day} className={`${isToday ? 'bg-gold/5 border border-gold/15' : 'bg-tatame border border-transparent'}`}>
              <div className="px-5 py-3 flex items-center gap-3 border-b border-white/5">
                <span className={`font-display text-2xl tracking-widest ${isToday ? 'text-gold' : 'text-white-belt/30'}`}>
                  {label.toUpperCase()}
                </span>
                {isToday && (
                  <span className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase bg-gold/10 px-2 py-0.5">
                    Hoje
                  </span>
                )}
              </div>
              <div className="divide-y divide-white/[0.04]">
                {classes.map((cls) => (
                  <div key={cls.id} className="flex items-center gap-4 px-5 py-3">
                    <span className="font-mono text-sm text-white-belt w-12 shrink-0">{cls.time}</span>
                    <div className="flex-1">
                      <span className="font-mono text-[10px] text-gold/70 uppercase tracking-wider block">
                        {MODALITY_LABELS[cls.modality]}
                      </span>
                      {cls.instructor && (
                        <span className="font-mono text-[9px] text-mid-gray/60 uppercase">{cls.instructor}</span>
                      )}
                    </div>
                    <span className="font-mono text-[9px] text-mid-gray/50 shrink-0">{cls.duration}min</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AlunoLayout>
  );
}
