import { useEffect, useState } from 'react';
import AlunoLayout from '@/components/aluno/AlunoLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Attendance, Schedule } from '@/lib/database.types';

interface AttendanceWithSchedule extends Attendance {
  schedule?: Schedule | null;
}

export default function AlunoFrequencia() {
  const { profile } = useAuth();
  const [records, setRecords] = useState<AttendanceWithSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    const load = async () => {
      const { data: att } = await supabase
        .from('attendance')
        .select('*')
        .eq('student_id', profile.id)
        .order('date', { ascending: false });
      if (!att) { setLoading(false); return; }

      const scheduleIds = [...new Set(att.map((a) => a.schedule_id).filter(Boolean))];
      let schedMap: Record<string, Schedule> = {};
      if (scheduleIds.length > 0) {
        const { data: scheds } = await supabase.from('schedules').select('*').in('id', scheduleIds as string[]);
        if (scheds) scheds.forEach((s) => { schedMap[s.id] = s as Schedule; });
      }
      setRecords(att.map((a) => ({ ...(a as Attendance), schedule: a.schedule_id ? schedMap[a.schedule_id] : null })));
      setLoading(false);
    };
    load();
  }, [profile]);

  const thisMonth = records.filter((r) => {
    const d = new Date(r.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // Group by month for summary
  const byMonth: Record<string, number> = {};
  records.forEach((r) => {
    const d = new Date(r.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    byMonth[key] = (byMonth[key] ?? 0) + 1;
  });
  const sortedMonths = Object.entries(byMonth).sort(([a], [b]) => b.localeCompare(a)).slice(0, 6);

  return (
    <AlunoLayout>
      <div className="px-5 py-8 pb-24 md:pb-8 max-w-2xl mx-auto space-y-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase mb-2">Registro de presença</p>
          <h1 className="font-display text-4xl text-white-belt tracking-wider">FREQUÊNCIA</h1>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-px bg-white/5">
          <div className="bg-tatame p-5 text-center">
            <div className="font-display text-4xl text-gold tracking-wider">{records.length}</div>
            <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray uppercase mt-1">Total de aulas</p>
          </div>
          <div className="bg-tatame p-5 text-center">
            <div className="font-display text-4xl text-white-belt tracking-wider">{thisMonth}</div>
            <p className="font-mono text-[8px] tracking-[0.25em] text-mid-gray uppercase mt-1">Este mês</p>
          </div>
        </div>

        {/* Monthly summary chart */}
        {sortedMonths.length > 0 && (
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase mb-4">Últimos meses</p>
            <div className="space-y-2">
              {sortedMonths.map(([key, count]) => {
                const [year, month] = key.split('-');
                const maxCount = Math.max(...Object.values(byMonth));
                const pct = Math.round((count / maxCount) * 100);
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-mid-gray uppercase w-8 shrink-0">
                      {monthNames[parseInt(month) - 1]}
                    </span>
                    <div className="flex-1 h-1.5 bg-white/5">
                      <div className="h-full bg-gold/60 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-mono text-[9px] text-mid-gray w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Full list */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase mb-4">Histórico completo</p>
          {loading && <p className="font-mono text-[10px] text-mid-gray/40 uppercase">Carregando…</p>}
          {!loading && records.length === 0 && (
            <p className="font-mono text-[10px] text-mid-gray/40 uppercase tracking-wider py-6 text-center">
              Nenhuma presença registrada ainda
            </p>
          )}
          <div className="divide-y divide-white/[0.04]">
            {records.map((r) => (
              <div key={r.id} className="flex items-center gap-4 py-3">
                <div className="w-1.5 h-1.5 bg-gold/50 shrink-0" />
                <span className="font-mono text-[11px] text-white-belt flex-1">
                  {new Date(r.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                {r.schedule && (
                  <span className="font-mono text-[9px] text-mid-gray uppercase tracking-wider">
                    {r.schedule.time} — {r.schedule.modality.replace('bjj-', 'BJJ ').replace('defesa-pessoal', 'Defesa').replace('open-mat', 'Open Mat')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AlunoLayout>
  );
}
