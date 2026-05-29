import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, createIsolatedClient, isSupabaseConfigured } from '@/lib/supabase';
import type { Profile, Plan, Schedule, GraduationRule, Payment, Attendance } from '@/lib/database.types';
import type { Belt } from '@/types/painel';

// ── Tipos locais (mantém compatibilidade com os componentes do painel) ──────
export type { Profile as Student, Plan, Schedule as ClassSchedule, GraduationRule, Payment, Attendance };

export type StudentInput = Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'role'> & {
  initialPassword: string;
};

interface PainelCtx {
  loading: boolean;

  students: Profile[];
  createStudent: (s: StudentInput) => Promise<{ error: string | null }>;
  updateStudent: (s: Profile) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;

  plans: Plan[];
  addPlan: (p: Omit<Plan, 'id' | 'created_at'>) => Promise<void>;
  updatePlan: (p: Plan) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;

  schedules: Schedule[];
  addSchedule: (s: Omit<Schedule, 'id' | 'created_at'>) => Promise<void>;
  updateSchedule: (s: Schedule) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;

  rules: GraduationRule[];
  addRule: (r: Omit<GraduationRule, 'id' | 'created_at'>) => Promise<void>;
  updateRule: (r: GraduationRule) => Promise<void>;
  deleteRule: (id: string) => Promise<void>;

  payments: Payment[];
  addPayment: (p: Omit<Payment, 'id' | 'created_at'>) => Promise<void>;
  updatePayment: (p: Payment) => Promise<void>;
  deletePayment: (id: string) => Promise<void>;
  markPaid: (id: string) => Promise<void>;

  attendance: Attendance[];
  logAttendance: (studentId: string, scheduleId?: string) => Promise<void>;
  deleteAttendance: (id: string) => Promise<void>;

  refresh: () => Promise<void>;
}

const Ctx = createContext<PainelCtx | null>(null);

export function PainelProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Profile[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [rules, setRules] = useState<GraduationRule[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const fetchAll = useCallback(async () => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    setLoading(true);
    const [
      { data: st }, { data: pl }, { data: sc },
      { data: ru }, { data: pa }, { data: at },
    ] = await Promise.all([
      supabase.from('profiles').select('*').eq('role', 'aluno').order('name'),
      supabase.from('plans').select('*').order('price'),
      supabase.from('schedules').select('*').order('day_of_week').order('time'),
      supabase.from('graduation_rules').select('*'),
      supabase.from('payments').select('*').order('due_date', { ascending: false }),
      supabase.from('attendance').select('*').order('date', { ascending: false }),
    ]);
    if (st) setStudents(st);
    if (pl) setPlans(pl);
    if (sc) setSchedules(sc);
    if (ru) setRules(ru);
    if (pa) setPayments(pa);
    if (at) setAttendance(at);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Alunos ────────────────────────────────────────────────────
  const createStudent = async (input: StudentInput) => {
    const { initialPassword, ...profileData } = input;

    // 1. Criar conta Supabase Auth isolada (não afeta sessão do professor)
    const isolated = createIsolatedClient();
    const { data: authData, error: authErr } = await isolated.auth.signUp({
      email: profileData.email,
      password: initialPassword,
    });
    if (authErr || !authData.user) {
      return { error: authErr?.message ?? 'Erro ao criar conta do aluno' };
    }

    // 2. Inserir perfil vinculado ao auth user
    const { error: profileErr } = await supabase.from('profiles').insert({
      id: authData.user.id,
      role: 'aluno',
      ...profileData,
    });
    if (profileErr) return { error: profileErr.message };

    setStudents((p) => [...p, { id: authData.user!.id, role: 'aluno', ...profileData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]);
    return { error: null };
  };

  const updateStudent = async (s: Profile) => {
    const { id, created_at, updated_at, ...data } = s;
    await supabase.from('profiles').update(data).eq('id', id);
    setStudents((p) => p.map((x) => (x.id === id ? s : x)));
  };

  const deleteStudent = async (id: string) => {
    await supabase.from('profiles').delete().eq('id', id);
    setStudents((p) => p.filter((x) => x.id !== id));
  };

  // ── Planos ────────────────────────────────────────────────────
  const addPlan = async (data: Omit<Plan, 'id' | 'created_at'>) => {
    const { data: row } = await supabase.from('plans').insert(data).select().single();
    if (row) setPlans((p) => [...p, row]);
  };

  const updatePlan = async (plan: Plan) => {
    const { id, created_at, ...data } = plan;
    await supabase.from('plans').update(data).eq('id', id);
    setPlans((p) => p.map((x) => (x.id === id ? plan : x)));
  };

  const deletePlan = async (id: string) => {
    await supabase.from('plans').delete().eq('id', id);
    setPlans((p) => p.filter((x) => x.id !== id));
  };

  // ── Horários ──────────────────────────────────────────────────
  const addSchedule = async (data: Omit<Schedule, 'id' | 'created_at'>) => {
    const { data: row } = await supabase.from('schedules').insert(data).select().single();
    if (row) setSchedules((p) => [...p, row]);
  };

  const updateSchedule = async (s: Schedule) => {
    const { id, created_at, ...data } = s;
    await supabase.from('schedules').update(data).eq('id', id);
    setSchedules((p) => p.map((x) => (x.id === id ? s : x)));
  };

  const deleteSchedule = async (id: string) => {
    await supabase.from('schedules').delete().eq('id', id);
    setSchedules((p) => p.filter((x) => x.id !== id));
  };

  // ── Regras de Graduação ───────────────────────────────────────
  const addRule = async (data: Omit<GraduationRule, 'id' | 'created_at'>) => {
    const { data: row } = await supabase.from('graduation_rules').insert(data).select().single();
    if (row) setRules((p) => [...p, row]);
  };

  const updateRule = async (r: GraduationRule) => {
    const { id, created_at, ...data } = r;
    await supabase.from('graduation_rules').update(data).eq('id', id);
    setRules((p) => p.map((x) => (x.id === id ? r : x)));
  };

  const deleteRule = async (id: string) => {
    await supabase.from('graduation_rules').delete().eq('id', id);
    setRules((p) => p.filter((x) => x.id !== id));
  };

  // ── Pagamentos ────────────────────────────────────────────────
  const addPayment = async (data: Omit<Payment, 'id' | 'created_at'>) => {
    const { data: row } = await supabase.from('payments').insert(data).select().single();
    if (row) setPayments((p) => [...p, row]);
  };

  const updatePayment = async (pay: Payment) => {
    const { id, created_at, ...data } = pay;
    await supabase.from('payments').update(data).eq('id', id);
    setPayments((p) => p.map((x) => (x.id === id ? pay : x)));
  };

  const deletePayment = async (id: string) => {
    await supabase.from('payments').delete().eq('id', id);
    setPayments((p) => p.filter((x) => x.id !== id));
  };

  const markPaid = async (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    await supabase.from('payments').update({ status: 'pago', paid_date: today }).eq('id', id);
    setPayments((p) =>
      p.map((x) => x.id === id ? { ...x, status: 'pago', paid_date: today } : x)
    );
  };

  // ── Presença ──────────────────────────────────────────────────
  const logAttendance = async (studentId: string, scheduleId?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const exists = attendance.some((a) => a.student_id === studentId && a.date === today);
    if (exists) return;
    const { data: row } = await supabase
      .from('attendance')
      .insert({ student_id: studentId, schedule_id: scheduleId ?? null, date: today })
      .select()
      .single();
    if (row) setAttendance((p) => [row, ...p]);
  };

  const deleteAttendance = async (id: string) => {
    await supabase.from('attendance').delete().eq('id', id);
    setAttendance((p) => p.filter((x) => x.id !== id));
  };

  return (
    <Ctx.Provider value={{
      loading,
      students, createStudent, updateStudent, deleteStudent,
      plans, addPlan, updatePlan, deletePlan,
      schedules, addSchedule, updateSchedule, deleteSchedule,
      rules, addRule, updateRule, deleteRule,
      payments, addPayment, updatePayment, deletePayment, markPaid,
      attendance, logAttendance, deleteAttendance,
      refresh: fetchAll,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePainel() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePainel must be inside PainelProvider');
  return ctx;
}
