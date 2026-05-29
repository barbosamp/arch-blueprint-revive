import { useEffect, useState } from 'react';
import AlunoLayout from '@/components/aluno/AlunoLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { BELT_COLORS, BELT_LABELS } from '@/types/painel';
import type { Belt } from '@/types/painel';
import type { Plan, Schedule, Payment, Attendance } from '@/lib/database.types';
import { DAY_LABELS, MODALITY_LABELS } from '@/types/painel';

export default function AlunoDashboard() {
  const { profile } = useAuth();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    if (!profile) return;

    const load = async () => {
      const today = new Date().getDay();
      const [
        { data: planData },
        { data: schedData },
        { data: payData },
        { data: attData },
      ] = await Promise.all([
        profile.plan_id ? supabase.from('plans').select('*').eq('id', profile.plan_id).single() : Promise.resolve({ data: null }),
        supabase.from('schedules').select('*').eq('day_of_week', today).order('time'),
        supabase.from('payments').select('*').eq('student_id', profile.id).neq('status', 'pago').order('due_date'),
        supabase.from('attendance').select('id').eq('student_id', profile.id),
      ]);
      if (planData) setPlan(planData as Plan);
      if (schedData) setTodaySchedules(schedData as Schedule[]);
      if (payData) setPendingPayments(payData as Payment[]);
      if (attData) setAttendanceCount(attData.length);
    };

    load();
  }, [profile]);

  if (!profile) return null;

  const belt = profile.belt as Belt;
  const beltColor = BELT_COLORS[belt];
  const enrolledMonths = profile.enrollment_date
    ? Math.floor((Date.now() - new Date(profile.enrollment_date).getTime()) / (1000 * 60 * 60 * 24 * 30))
    : 0;

  return (
    <AlunoLayout>
      <div className="px-5 py-8 pb-24 md:pb-8 max-w-2xl mx-auto space-y-8">
        {/* Greeting */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase mb-1">
            Bem-vindo de volta
          </p>
          <h1 className="font-display text-[clamp(32px,8vw,56px)] text-white-belt tracking-wider leading-none">
            {profile.name.split(' ')[0].toUpperCase()}
          </h1>
        </div>

        {/* Belt card */}
        <div className="bg-tatame border border-white/5 p-6">
          <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray uppercase mb-5">Sua faixa atual</p>
          <div className="flex items-center gap-6">
            <div>
              {/* Belt visual */}
              <div
                className="w-28 h-5 mb-2"
                style={{
                  backgroundColor: beltColor,
                  border: belt === 'preta' ? '1px solid #E8B84B' : 'none',
                }}
              />
              {/* Stripes */}
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3"
                    style={{
                      backgroundColor: i < profile.stripes ? '#E8B84B' : 'transparent',
                      border: '1px solid rgba(232,184,75,0.3)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-white-belt tracking-wider capitalize">
                {BELT_LABELS[belt]}
              </div>
              <p className="font-mono text-[10px] tracking-wider text-mid-gray uppercase mt-1">
                {profile.stripes} {profile.stripes === 1 ? 'grau' : 'graus'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-px bg-white/5">
          {[
            { label: 'Meses treinando', value: enrolledMonths },
            { label: 'Aulas registradas', value: attendanceCount },
            { label: 'Pagtos pendentes', value: pendingPayments.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-tatame px-4 py-5 text-center">
              <div className={`font-display text-3xl tracking-wider ${stat.label === 'Pagtos pendentes' && stat.value > 0 ? 'text-red-400' : 'text-gold'}`}>
                {stat.value}
              </div>
              <p className="font-mono text-[8px] tracking-[0.2em] text-mid-gray uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Today's classes */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase mb-4">
            Aulas hoje — {DAY_LABELS[new Date().getDay()]}
          </p>
          {todaySchedules.length === 0 ? (
            <p className="font-mono text-[10px] text-mid-gray/50 uppercase tracking-wider">Sem aulas hoje</p>
          ) : (
            <div className="space-y-2">
              {todaySchedules.map((s) => (
                <div key={s.id} className="flex items-center gap-4 border-l-2 border-gold/30 pl-4 py-1">
                  <span className="font-mono text-sm text-white-belt w-12">{s.time}</span>
                  <span className="font-mono text-[10px] text-gold/70 uppercase tracking-wider flex-1">
                    {MODALITY_LABELS[s.modality]}
                  </span>
                  <span className="font-mono text-[9px] text-mid-gray/60">{s.duration}min</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending payments */}
        {pendingPayments.length > 0 && (
          <div className="bg-red-950/30 border border-red-500/20 p-5">
            <p className="font-mono text-[9px] tracking-[0.3em] text-red-400 uppercase mb-3">
              {pendingPayments.length} pagamento{pendingPayments.length > 1 ? 's' : ''} pendente{pendingPayments.length > 1 ? 's' : ''}
            </p>
            {pendingPayments.slice(0, 2).map((p) => (
              <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="font-mono text-[10px] text-white-belt">
                  Vencimento: {new Date(p.due_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                </span>
                <span className="font-mono text-[11px] text-red-300">R$ {p.amount.toFixed(0)}</span>
              </div>
            ))}
            <p className="font-mono text-[9px] text-mid-gray/50 uppercase tracking-wider mt-3">
              Fale com seu professor para regularizar
            </p>
          </div>
        )}

        {/* Plan info */}
        {plan && (
          <div className="border-t border-white/5 pt-6">
            <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase mb-2">Seu plano</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-white-belt tracking-wider">{plan.name}</span>
              <span className="font-mono text-[10px] text-gold">R$ {plan.price.toFixed(0)}/{plan.frequency}</span>
            </div>
          </div>
        )}
      </div>
    </AlunoLayout>
  );
}
