import PainelLayout, { PageHeader } from '@/components/painel/PainelLayout';
import { usePainel } from '@/contexts/PainelContext';
import { BELT_COLORS, BELT_LABELS } from '@/types/painel';
import { Users, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

function StatCard({ label, value, sub, icon: Icon }: {
  label: string; value: string | number; sub?: string; icon: React.ElementType;
}) {
  return (
    <div className="bg-tatame border border-white/5 p-6">
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-[9px] tracking-[0.3em] text-mid-gray uppercase">{label}</span>
        <Icon size={14} className="text-gold/50" />
      </div>
      <div className="font-display text-4xl text-white-belt tracking-wider">{value}</div>
      {sub && <p className="font-mono text-[9px] tracking-wider text-mid-gray/60 uppercase mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { students, payments, plans } = usePainel();

  const active = students.filter((s) => s.active).length;
  const pending = payments.filter((p) => p.status === 'pendente').length;
  const overdue = payments.filter((p) => p.status === 'atrasado').length;
  const paidThisMonth = payments.filter((p) => {
    if (p.status !== 'pago' || !p.paidDate) return false;
    const d = new Date(p.paidDate);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const revenue = paidThisMonth.reduce((sum, p) => sum + p.amount, 0);

  const beltCount = students.reduce<Record<string, number>>((acc, s) => {
    acc[s.belt] = (acc[s.belt] ?? 0) + 1;
    return acc;
  }, {});

  const recentPayments = [...payments]
    .sort((a, b) => (b.dueDate > a.dueDate ? 1 : -1))
    .slice(0, 6);

  return (
    <PainelLayout>
      <PageHeader title="DASHBOARD" subtitle={`${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`} />

      <div className="px-6 md:px-8 py-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          <StatCard label="Alunos Ativos" value={active} sub={`${students.length} total`} icon={Users} />
          <StatCard label="Receita do Mês" value={`R$ ${revenue.toFixed(0)}`} sub={`${paidThisMonth.length} pagamentos`} icon={CheckCircle} />
          <StatCard label="Pendentes" value={pending} sub="aguardando pagamento" icon={CreditCard} />
          <StatCard label="Atrasados" value={overdue} sub="requerem atenção" icon={AlertCircle} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Belt distribution */}
          <div className="bg-tatame border border-white/5 p-6">
            <h2 className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-5">
              Distribuição por Faixa
            </h2>
            {Object.keys(beltCount).length === 0 ? (
              <p className="font-mono text-[10px] text-mid-gray/50 uppercase tracking-wider">Nenhum aluno cadastrado</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(beltCount).map(([belt, count]) => (
                  <div key={belt} className="flex items-center gap-3">
                    <div
                      className="w-8 h-2 shrink-0"
                      style={{
                        backgroundColor: BELT_COLORS[belt as keyof typeof BELT_COLORS],
                        border: belt === 'preta' ? '1px solid #E8B84B' : 'none',
                      }}
                    />
                    <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase flex-1">
                      {BELT_LABELS[belt as keyof typeof BELT_LABELS]}
                    </span>
                    <span className="font-display text-xl text-white-belt">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent payments */}
          <div className="bg-tatame border border-white/5 p-6">
            <h2 className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-5">
              Pagamentos Recentes
            </h2>
            {recentPayments.length === 0 ? (
              <p className="font-mono text-[10px] text-mid-gray/50 uppercase tracking-wider">Nenhum pagamento registrado</p>
            ) : (
              <div className="space-y-3">
                {recentPayments.map((pay) => {
                  const student = students.find((s) => s.id === pay.studentId);
                  const plan = plans.find((p) => p.id === pay.planId);
                  const statusColor = pay.status === 'pago' ? 'text-green-400' : pay.status === 'atrasado' ? 'text-red-400' : 'text-gold';
                  return (
                    <div key={pay.id} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-none shrink-0 ${statusColor.replace('text-', 'bg-')}`} />
                      <span className="font-mono text-[10px] tracking-wider text-white-belt flex-1 truncate">
                        {student?.name ?? 'Aluno removido'}
                      </span>
                      <span className="font-mono text-[9px] text-mid-gray shrink-0">{plan?.name}</span>
                      <span className={`font-mono text-[9px] uppercase tracking-wider shrink-0 ${statusColor}`}>
                        {pay.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PainelLayout>
  );
}
