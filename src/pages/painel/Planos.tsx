import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import PainelLayout, {
  PageHeader, GoldButton, OutlineButton, Field, inputCls, selectCls,
} from '@/components/painel/PainelLayout';
import { usePainel } from '@/contexts/PainelContext';
import type { Plan } from '@/types/painel';

const freqLabels: Record<Plan['frequency'], string> = {
  mensal: 'Mensal',
  trimestral: 'Trimestral',
  semestral: 'Semestral',
  anual: 'Anual',
};

const empty: Omit<Plan, 'id'> = {
  name: '', price: 0, frequency: 'mensal', description: '', active: true,
};

export default function Planos() {
  const { plans, students, addPlan, updatePlan, deletePlan } = usePainel();
  const [editing, setEditing] = useState<Plan | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Plan, 'id'>>(empty);

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (p: Plan) => { setForm(p); setEditing(p); setCreating(false); };
  const closeModal = () => { setCreating(false); setEditing(null); };
  const f = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updatePlan({ ...form, id: editing.id });
    else addPlan(form);
    closeModal();
  };

  const modal = creating || editing !== null;

  return (
    <PainelLayout>
      <PageHeader
        title="PLANOS"
        subtitle={`${plans.filter((p) => p.active).length} ativos`}
        action={<GoldButton onClick={openCreate}><Plus size={14} /> Novo Plano</GoldButton>}
      />

      <div className="px-6 md:px-8 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {plans.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <p className="font-mono text-[10px] text-mid-gray/40 uppercase tracking-wider">
                Nenhum plano cadastrado
              </p>
            </div>
          )}
          {plans.map((plan) => {
            const enrolled = students.filter((s) => s.planId === plan.id && s.active).length;
            return (
              <div
                key={plan.id}
                className={`bg-tatame p-6 flex flex-col gap-4 group ${!plan.active ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.3em] text-gold/60 uppercase block mb-1">
                      {freqLabels[plan.frequency]}
                    </span>
                    <h3 className="font-display text-2xl text-white-belt tracking-wider">{plan.name}</h3>
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(plan)} className="text-mid-gray hover:text-gold p-1">
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => { if (confirm(`Remover plano "${plan.name}"?`)) deletePlan(plan.id); }}
                      className="text-mid-gray hover:text-red-400 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="w-8 h-px bg-gold/30" />

                <div className="font-display text-4xl text-gold tracking-wider">
                  R$ {plan.price.toFixed(0)}
                  <span className="font-mono text-[10px] text-mid-gray tracking-wider ml-1 font-normal">
                    /{freqLabels[plan.frequency].toLowerCase()}
                  </span>
                </div>

                {plan.description && (
                  <p className="font-mono text-[10px] text-mid-gray leading-relaxed tracking-wider">
                    {plan.description}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-mid-gray/60 uppercase tracking-wider">
                    {enrolled} aluno{enrolled !== 1 ? 's' : ''} ativo{enrolled !== 1 ? 's' : ''}
                  </span>
                  <span className={`font-mono text-[9px] uppercase tracking-wider ${plan.active ? 'text-green-400' : 'text-mid-gray/40'}`}>
                    {plan.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md bg-blackout border border-white/10">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h2 className="font-display text-xl text-white-belt tracking-wider">
                {editing ? 'EDITAR PLANO' : 'NOVO PLANO'}
              </h2>
              <button onClick={closeModal} className="text-mid-gray hover:text-white-belt">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-6 space-y-4">
              <Field label="Nome do plano">
                <input className={inputCls} required value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="Ex: Mensal, Família, Anual…" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Preço (R$)">
                  <input type="number" className={inputCls} required min={0} step={0.01} value={form.price}
                    onChange={(e) => f('price', Number(e.target.value))} placeholder="0,00" />
                </Field>
                <Field label="Frequência">
                  <select className={selectCls} value={form.frequency} onChange={(e) => f('frequency', e.target.value as Plan['frequency'])}>
                    {Object.entries(freqLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Descrição">
                <textarea className={inputCls} rows={2} value={form.description}
                  onChange={(e) => f('description', e.target.value)} placeholder="Detalhes do plano…" />
              </Field>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="planActive" checked={form.active}
                  onChange={(e) => f('active', e.target.checked)} className="accent-gold" />
                <label htmlFor="planActive" className="font-mono text-[10px] tracking-[0.2em] text-mid-gray uppercase">
                  Plano ativo
                </label>
              </div>
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
