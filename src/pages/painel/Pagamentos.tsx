import { useState } from 'react';
import { Plus, CheckCircle, MessageCircle, Trash2, X } from 'lucide-react';
import PainelLayout, {
  PageHeader, GoldButton, OutlineButton, Field, inputCls, selectCls,
} from '@/components/painel/PainelLayout';
import { usePainel } from '@/contexts/PainelContext';
import type { Payment, PaymentStatus } from '@/types/painel';

const statusLabel: Record<PaymentStatus, string> = {
  pendente: 'Pendente',
  pago: 'Pago',
  atrasado: 'Atrasado',
};
const statusColor: Record<PaymentStatus, string> = {
  pendente: 'text-gold',
  pago: 'text-green-400',
  atrasado: 'text-red-400',
};

const empty: Omit<Payment, 'id'> = {
  studentId: '', planId: '', amount: 0,
  dueDate: new Date().toISOString().split('T')[0],
  status: 'pendente', notes: '',
};

export default function Pagamentos() {
  const { payments, students, plans, addPayment, updatePayment, deletePayment, markPaid } = usePainel();
  const [filter, setFilter] = useState<PaymentStatus | 'todos'>('todos');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Payment, 'id'>>(empty);

  const f = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const closeModal = () => { setCreating(false); setForm(empty); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addPayment(form);
    closeModal();
  };

  const handleStudentChange = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    const plan = student ? plans.find((p) => p.id === student.planId) : undefined;
    setForm((prev) => ({
      ...prev,
      studentId,
      planId: plan?.id ?? '',
      amount: plan?.price ?? 0,
    }));
  };

  const generateMonthly = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const dueDay = 10;
    const due = `${year}-${String(month).padStart(2, '0')}-${String(dueDay).padStart(2, '0')}`;

    let added = 0;
    students
      .filter((s) => s.active && s.planId)
      .forEach((s) => {
        const plan = plans.find((p) => p.id === s.planId);
        if (!plan) return;
        const exists = payments.some(
          (p) => p.studentId === s.id && p.dueDate.startsWith(`${year}-${String(month).padStart(2, '0')}`)
        );
        if (!exists) {
          addPayment({ studentId: s.id, planId: plan.id, amount: plan.price, dueDate: due, status: 'pendente', notes: '' });
          added++;
        }
      });
    if (added === 0) alert('Todos os alunos já têm cobrança neste mês.');
    else alert(`${added} cobrança(s) gerada(s) para ${new Date().toLocaleString('pt-BR', { month: 'long' })}.`);
  };

  const filtered = payments.filter((p) => filter === 'todos' || p.status === filter)
    .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));

  const totalPending = payments.filter((p) => p.status === 'pendente').reduce((s, p) => s + p.amount, 0);
  const totalOverdue = payments.filter((p) => p.status === 'atrasado').reduce((s, p) => s + p.amount, 0);

  return (
    <PainelLayout>
      <PageHeader
        title="PAGAMENTOS"
        subtitle={`${payments.length} registros`}
        action={
          <div className="flex gap-2">
            <OutlineButton onClick={generateMonthly}>Gerar Mês Atual</OutlineButton>
            <GoldButton onClick={() => setCreating(true)}><Plus size={14} /> Novo</GoldButton>
          </div>
        }
      />

      <div className="px-6 md:px-8 py-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-px bg-white/5">
          <div className="bg-tatame p-5">
            <span className="font-mono text-[9px] tracking-[0.3em] text-mid-gray uppercase block mb-2">A receber</span>
            <span className="font-display text-3xl text-gold">R$ {totalPending.toFixed(0)}</span>
          </div>
          <div className="bg-tatame p-5">
            <span className="font-mono text-[9px] tracking-[0.3em] text-mid-gray uppercase block mb-2">Atrasados</span>
            <span className="font-display text-3xl text-red-400">R$ {totalOverdue.toFixed(0)}</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 border-b border-white/5">
          {(['todos', 'pendente', 'pago', 'atrasado'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-colors border-b-2 -mb-px ${
                filter === s
                  ? 'text-gold border-gold'
                  : 'text-mid-gray border-transparent hover:text-white-belt'
              }`}
            >
              {s === 'todos' ? 'Todos' : statusLabel[s]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                {['Aluno', 'Vencimento', 'Valor', 'Status', ''].map((h) => (
                  <th key={h} className="pb-3 pr-6 font-mono text-[9px] tracking-[0.3em] text-mid-gray uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 font-mono text-[10px] text-mid-gray/40 uppercase tracking-wider text-center">
                    Nenhum registro
                  </td>
                </tr>
              )}
              {filtered.map((pay) => {
                const student = students.find((s) => s.id === pay.studentId);
                const plan = plans.find((p) => p.id === pay.planId);
                const isOverdue = pay.status === 'pendente' && new Date(pay.dueDate) < new Date();

                return (
                  <tr key={pay.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-6">
                      <div className="font-mono text-xs text-white-belt">{student?.name ?? '—'}</div>
                      <div className="font-mono text-[9px] text-mid-gray/60">{plan?.name}</div>
                    </td>
                    <td className="py-3 pr-6">
                      <span className={`font-mono text-[11px] ${isOverdue ? 'text-red-400' : 'text-mid-gray'}`}>
                        {new Date(pay.dueDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className="font-mono text-sm text-white-belt">R$ {pay.amount.toFixed(0)}</span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className={`font-mono text-[9px] uppercase tracking-wider ${statusColor[isOverdue ? 'atrasado' : pay.status]}`}>
                        {isOverdue ? 'Atrasado' : statusLabel[pay.status]}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {pay.status !== 'pago' && (
                          <button
                            onClick={() => markPaid(pay.id)}
                            title="Marcar como pago"
                            className="text-mid-gray hover:text-green-400 transition-colors p-1"
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}
                        {student?.phone && (
                          <a
                            href={`https://wa.me/55${student.phone.replace(/\D/g, '')}?text=Olá ${student.name}, lembrete de pagamento: R$${pay.amount} — vencimento ${new Date(pay.dueDate + 'T12:00:00').toLocaleDateString('pt-BR')}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Enviar lembrete"
                            className="text-mid-gray hover:text-green-400 transition-colors p-1"
                          >
                            <MessageCircle size={13} />
                          </a>
                        )}
                        <button
                          onClick={() => { if (confirm('Remover pagamento?')) deletePayment(pay.id); }}
                          className="text-mid-gray hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pix info */}
        <div className="border border-gold/20 p-5 bg-gold/5">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-2">Chave Pix para recebimento</h3>
          <p className="font-mono text-[11px] text-mid-gray">Configure sua chave Pix em <span className="text-white-belt">Configurações → Pagamentos</span></p>
        </div>
      </div>

      {/* Modal novo pagamento */}
      {creating && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md bg-blackout border border-white/10">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h2 className="font-display text-xl text-white-belt tracking-wider">NOVO PAGAMENTO</h2>
              <button onClick={closeModal} className="text-mid-gray hover:text-white-belt"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-6 space-y-4">
              <Field label="Aluno">
                <select className={selectCls} required value={form.studentId} onChange={(e) => handleStudentChange(e.target.value)}>
                  <option value="">Selecione o aluno</option>
                  {students.filter((s) => s.active).map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Valor (R$)">
                  <input type="number" className={inputCls} required min={0} step={0.01} value={form.amount}
                    onChange={(e) => f('amount', Number(e.target.value))} />
                </Field>
                <Field label="Vencimento">
                  <input type="date" className={inputCls} required value={form.dueDate}
                    onChange={(e) => f('dueDate', e.target.value)} />
                </Field>
              </div>
              <Field label="Status">
                <select className={selectCls} value={form.status} onChange={(e) => f('status', e.target.value as PaymentStatus)}>
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="atrasado">Atrasado</option>
                </select>
              </Field>
              <Field label="Observações">
                <input className={inputCls} value={form.notes} onChange={(e) => f('notes', e.target.value)} placeholder="Referência, mês…" />
              </Field>
              <div className="flex gap-3 pt-2 border-t border-white/5">
                <GoldButton type="submit" className="flex-1 justify-center">Salvar</GoldButton>
                <OutlineButton onClick={closeModal}>Cancelar</OutlineButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </PainelLayout>
  );
}
