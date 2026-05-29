import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import PainelLayout, {
  PageHeader, GoldButton, OutlineButton, Field, inputCls, selectCls,
} from '@/components/painel/PainelLayout';
import { usePainel } from '@/contexts/PainelContext';
import {
  BELTS_ORDER, BELT_LABELS, BELT_COLORS, type GraduationRule, type Belt,
} from '@/types/painel';

const empty: Omit<GraduationRule, 'id'> = {
  fromBelt: 'branca', toBelt: 'azul', minMonths: 12, minClasses: 100,
  requirements: '', notes: '',
};

export default function Graduacao() {
  const { rules, addRule, updateRule, deleteRule } = usePainel();
  const [editing, setEditing] = useState<GraduationRule | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<GraduationRule, 'id'>>(empty);

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (r: GraduationRule) => { setForm(r); setEditing(r); setCreating(false); };
  const closeModal = () => { setCreating(false); setEditing(null); };
  const f = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateRule({ ...form, id: editing.id });
    else addRule(form);
    closeModal();
  };

  const modal = creating || editing !== null;

  return (
    <PainelLayout>
      <PageHeader
        title="GRADUAÇÃO"
        subtitle={`${rules.length} regras cadastradas`}
        action={<GoldButton onClick={openCreate}><Plus size={14} /> Nova Regra</GoldButton>}
      />

      <div className="px-6 md:px-8 py-6 space-y-4">
        {rules.length === 0 && (
          <p className="font-mono text-[10px] text-mid-gray/40 uppercase tracking-wider py-10 text-center">
            Nenhuma regra de graduação cadastrada
          </p>
        )}

        {rules
          .sort((a, b) => BELTS_ORDER.indexOf(a.fromBelt) - BELTS_ORDER.indexOf(b.fromBelt))
          .map((rule) => (
            <div key={rule.id} className="bg-tatame border border-white/5 p-6 group">
              <div className="flex items-start justify-between gap-4 mb-4">
                {/* Belt transition */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-3"
                      style={{
                        backgroundColor: BELT_COLORS[rule.fromBelt],
                        border: rule.fromBelt === 'preta' ? '1px solid #E8B84B' : 'none',
                      }}
                    />
                    <span className="font-mono text-[8px] text-mid-gray uppercase tracking-wider">
                      {BELT_LABELS[rule.fromBelt]}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-mid-gray/40">→</span>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-3"
                      style={{
                        backgroundColor: BELT_COLORS[rule.toBelt],
                        border: rule.toBelt === 'preta' ? '1px solid #E8B84B' : 'none',
                      }}
                    />
                    <span className="font-mono text-[8px] text-mid-gray uppercase tracking-wider">
                      {BELT_LABELS[rule.toBelt]}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(rule)} className="text-mid-gray hover:text-gold p-1">
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => { if (confirm('Remover regra?')) deleteRule(rule.id); }}
                    className="text-mid-gray hover:text-red-400 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-mid-gray/60 uppercase block mb-1">
                    Tempo mínimo
                  </span>
                  <span className="font-mono text-sm text-white-belt">
                    {rule.minMonths} {rule.minMonths === 1 ? 'mês' : 'meses'}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-mid-gray/60 uppercase block mb-1">
                    Mínimo de aulas
                  </span>
                  <span className="font-mono text-sm text-white-belt">{rule.minClasses} aulas</span>
                </div>
              </div>

              {rule.requirements && (
                <div>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-mid-gray/60 uppercase block mb-1">
                    Requisitos técnicos
                  </span>
                  <p className="font-mono text-[10px] text-mid-gray leading-relaxed">{rule.requirements}</p>
                </div>
              )}
              {rule.notes && (
                <p className="font-mono text-[9px] text-mid-gray/50 italic mt-2">{rule.notes}</p>
              )}
            </div>
          ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg bg-blackout border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h2 className="font-display text-xl text-white-belt tracking-wider">
                {editing ? 'EDITAR REGRA' : 'NOVA REGRA'}
              </h2>
              <button onClick={closeModal} className="text-mid-gray hover:text-white-belt">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="De (faixa atual)">
                  <select className={selectCls} value={form.fromBelt} onChange={(e) => f('fromBelt', e.target.value as Belt)}>
                    {BELTS_ORDER.slice(0, -1).map((b) => <option key={b} value={b}>{BELT_LABELS[b]}</option>)}
                  </select>
                </Field>
                <Field label="Para (próxima faixa)">
                  <select className={selectCls} value={form.toBelt} onChange={(e) => f('toBelt', e.target.value as Belt)}>
                    {BELTS_ORDER.slice(1).map((b) => <option key={b} value={b}>{BELT_LABELS[b]}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Meses mínimos">
                  <input type="number" className={inputCls} value={form.minMonths} min={1} onChange={(e) => f('minMonths', Number(e.target.value))} />
                </Field>
                <Field label="Aulas mínimas">
                  <input type="number" className={inputCls} value={form.minClasses} min={1} onChange={(e) => f('minClasses', Number(e.target.value))} />
                </Field>
              </div>
              <Field label="Requisitos técnicos">
                <textarea className={inputCls} rows={3} value={form.requirements}
                  onChange={(e) => f('requirements', e.target.value)}
                  placeholder="Descreva as habilidades técnicas exigidas…" />
              </Field>
              <Field label="Observações do professor">
                <textarea className={inputCls} rows={2} value={form.notes}
                  onChange={(e) => f('notes', e.target.value)} placeholder="Notas adicionais…" />
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
