import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type {
  Student, Plan, ClassSchedule, GraduationRule, Payment,
} from '@/types/painel';

const DEFAULT_PASSWORD = 'blackbox2025';

interface PainelCtx {
  isAuthenticated: boolean;
  login: (pw: string) => boolean;
  logout: () => void;

  students: Student[];
  addStudent: (s: Omit<Student, 'id'>) => void;
  updateStudent: (s: Student) => void;
  deleteStudent: (id: string) => void;

  plans: Plan[];
  addPlan: (p: Omit<Plan, 'id'>) => void;
  updatePlan: (p: Plan) => void;
  deletePlan: (id: string) => void;

  schedules: ClassSchedule[];
  addSchedule: (s: Omit<ClassSchedule, 'id'>) => void;
  updateSchedule: (s: ClassSchedule) => void;
  deleteSchedule: (id: string) => void;

  rules: GraduationRule[];
  addRule: (r: Omit<GraduationRule, 'id'>) => void;
  updateRule: (r: GraduationRule) => void;
  deleteRule: (id: string) => void;

  payments: Payment[];
  addPayment: (p: Omit<Payment, 'id'>) => void;
  updatePayment: (p: Payment) => void;
  deletePayment: (id: string) => void;
  markPaid: (id: string) => void;
}

const Ctx = createContext<PainelCtx | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

export function PainelProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(() => !!sessionStorage.getItem('bb_auth'));
  const [password] = useLocalStorage('bb_password', DEFAULT_PASSWORD);

  const [students, setStudents] = useLocalStorage<Student[]>('bb_students', []);
  const [plans, setPlans] = useLocalStorage<Plan[]>('bb_plans', [
    { id: 'p1', name: 'Mensal', price: 150, frequency: 'mensal', description: 'Aulas ilimitadas', active: true },
    { id: 'p2', name: 'Trimestral', price: 400, frequency: 'trimestral', description: '3 meses com desconto', active: true },
  ]);
  const [schedules, setSchedules] = useLocalStorage<ClassSchedule[]>('bb_schedules', [
    { id: 's1', dayOfWeek: 1, time: '07:00', duration: 60, modality: 'bjj-adultos', instructor: 'Professor' },
    { id: 's2', dayOfWeek: 3, time: '19:00', duration: 60, modality: 'bjj-kids', instructor: 'Professor' },
  ]);
  const [rules, setRules] = useLocalStorage<GraduationRule[]>('bb_rules', [
    { id: 'r1', fromBelt: 'branca', toBelt: 'azul', minMonths: 12, minClasses: 100, requirements: 'Dominar posições básicas, raspagens e finalizações fundamentais', notes: '' },
    { id: 'r2', fromBelt: 'azul', toBelt: 'roxa', minMonths: 24, minClasses: 200, requirements: 'Consistência técnica, competições, guardar e passar a guarda com eficiência', notes: '' },
  ]);
  const [payments, setPayments] = useLocalStorage<Payment[]>('bb_payments', []);

  const login = useCallback((pw: string) => {
    if (pw === password) {
      sessionStorage.setItem('bb_auth', '1');
      setAuth(true);
      return true;
    }
    return false;
  }, [password]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('bb_auth');
    setAuth(false);
  }, []);

  const addStudent = (s: Omit<Student, 'id'>) =>
    setStudents((prev) => [...prev, { ...s, id: uid() }]);
  const updateStudent = (s: Student) =>
    setStudents((prev) => prev.map((x) => (x.id === s.id ? s : x)));
  const deleteStudent = (id: string) =>
    setStudents((prev) => prev.filter((x) => x.id !== id));

  const addPlan = (p: Omit<Plan, 'id'>) =>
    setPlans((prev) => [...prev, { ...p, id: uid() }]);
  const updatePlan = (p: Plan) =>
    setPlans((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  const deletePlan = (id: string) =>
    setPlans((prev) => prev.filter((x) => x.id !== id));

  const addSchedule = (s: Omit<ClassSchedule, 'id'>) =>
    setSchedules((prev) => [...prev, { ...s, id: uid() }]);
  const updateSchedule = (s: ClassSchedule) =>
    setSchedules((prev) => prev.map((x) => (x.id === s.id ? s : x)));
  const deleteSchedule = (id: string) =>
    setSchedules((prev) => prev.filter((x) => x.id !== id));

  const addRule = (r: Omit<GraduationRule, 'id'>) =>
    setRules((prev) => [...prev, { ...r, id: uid() }]);
  const updateRule = (r: GraduationRule) =>
    setRules((prev) => prev.map((x) => (x.id === r.id ? r : x)));
  const deleteRule = (id: string) =>
    setRules((prev) => prev.filter((x) => x.id !== id));

  const addPayment = (p: Omit<Payment, 'id'>) =>
    setPayments((prev) => [...prev, { ...p, id: uid() }]);
  const updatePayment = (p: Payment) =>
    setPayments((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  const deletePayment = (id: string) =>
    setPayments((prev) => prev.filter((x) => x.id !== id));
  const markPaid = (id: string) =>
    setPayments((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, status: 'pago', paidDate: new Date().toISOString().split('T')[0] } : x
      )
    );

  return (
    <Ctx.Provider value={{
      isAuthenticated: auth, login, logout,
      students, addStudent, updateStudent, deleteStudent,
      plans, addPlan, updatePlan, deletePlan,
      schedules, addSchedule, updateSchedule, deleteSchedule,
      rules, addRule, updateRule, deleteRule,
      payments, addPayment, updatePayment, deletePayment, markPaid,
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
