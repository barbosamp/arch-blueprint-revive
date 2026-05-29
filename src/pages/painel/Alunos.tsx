import { useState } from 'react';
import { Plus, Pencil, Trash2, MessageCircle, X } from 'lucide-react';
import PainelLayout, {
  PageHeader, GoldButton, OutlineButton, Field, inputCls, selectCls,
} from '@/components/painel/PainelLayout';
import { usePainel } from '@/contexts/PainelContext';
import { BELTS_ORDER, BELT_LABELS, BELT_COLORS, type Student, type Belt } from '@/types/painel';

const empty: Omit<Student, 'id'> = {
  name: '', email: '', phone: '', birthDate: '', belt: 'branca',
  stripes: 0, planId: '', enrollmentDate: new Date().toISOString().split('T')[0],
  active: true, notes: '',
};

export default function Alunos() {
  const { students, plans, addStudent, updateStudent, deleteStudent } = usePainel();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Student | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Student, 'id'>>(empty);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search)
  );

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (s: Student) => { setForm(s); setEditing(s); setCreating(false); };
  const closeModal = () => { setCreating(false); setEditing(null); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateStudent({ ...form, id: editing.id });
    else addStudent(form);
    closeModal();
  };

  const f = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const modal = creating || editing !== null;

  return (
    <PainelLayout>
      <PageHeader
        title="ALUNOS"
        subtitle={`${students.filter((s) => s.active).length} ativos`}
        action={<GoldButton onClick={openCreate}><Plus size={14} /> Novo Aluno</GoldButton>}
      />

      <div className="px-6 md:px-8 py-6 space-y-4">
        <input
          type="search"
          placeholder="Buscar por nome ou telefone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + ' max-w-sm'}
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                {['Nome', 'Telefone', 'Faixa', 'Plano', 'Status', ''].map((h) => (
                  <th key={h} className="pb-3 pr-6 font-mono text-[9px] tracking-[0.3em] text-mid-gray uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 font-mono text-[10px] text-mid-gray/40 uppercase tracking-wider text-center">
                    Nenhum aluno encontrado
                  </td>
                </tr>
              )}
              {filtered.map((s) => {
                const plan = plans.find((p) => p.id === s.planId);
                return (
                  <tr key={s.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-6">
                      <span className="font-mono text-xs text-white-belt">{s.name}</span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className="font-mono text-[10px] text-mid-gray">{s.phone}</span>
                    </td>
                    <td className="py-3 pr-6">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 shrink-0"
                          style={{
                            backgroundColor: BELT_COLORS[s.belt],
                            border: s.belt === 'preta' ? '1px solid #E8B84B' : 'none',
                          }}
                        />
                        <span className="font-mono text-[10px] text-mid-gray capitalize">
                          {BELT_LABELS[s.belt]}
                          {s.stripes > 0 && ` ×${s.stripes}`}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-6">
                      <span className="font-mono text-[10px] text-mid-gray">{plan?.name ?? '—'}</span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className={`font-mono text-[9px] uppercase tracking-wider ${s.active ? 'text-green-400' : 'text-mid-gray/50'}`}>
                        {s.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(s)} className="text-mid-gray hover:text-gold transition-colors p-1">
                          <Pencil size={13} />
                        </button>
                        <a
                          href={`https://wa.me/55${s.phone.replace(/\D/g, '')}?text=Olá ${s.name}, tudo bem?`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-mid-gray hover:text-green-400 transition-colors p-1"
                        >
                          <MessageCircle size={13} />
                        </a>
                        <button
                          onClick={() => { if (confirm(`Remover ${s.name}?`)) deleteStudent(s.id); }}
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
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-[80] flex items-start justify-end md:items-center md:justify-center bg-black/60">
          <div className="w-full max-w-lg bg-blackout border-l md:border border-white/10 h-full md:h-auto overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h2 className="font-display text-xl text-white-belt tracking-wider">
                {editing ? 'EDITAR ALUNO' : 'NOVO ALUNO'}
              </h2>
              <button onClick={closeModal} className="text-mid-gray hover:text-white-belt">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-6 space-y-4">
              <Field label="Nome completo">
                <input className={inputCls} required value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="Nome do aluno" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Telefone / WhatsApp">
                  <input className={inputCls} value={form.phone} onChange={(e) => f('phone', e.target.value)} placeholder="(00) 00000-0000" />
                </Field>
                <Field label="Data de nascimento">
                  <input type="date" className={inputCls} value={form.birthDate} onChange={(e) => f('birthDate', e.target.value)} />
                </Field>
              </div>
              <Field label="E-mail">
                <input type="email" className={inputCls} value={form.email} onChange={(e) => f('email', e.target.value)} placeholder="email@exemplo.com" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Faixa">
                  <select className={selectCls} value={form.belt} onChange={(e) => f('belt', e.target.value as Belt)}>
                    {BELTS_ORDER.map((b) => (
                      <option key={b} value={b}>{BELT_LABELS[b]}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Graus (0–4)">
                  <select className={selectCls} value={form.stripes} onChange={(e) => f('stripes', Number(e.target.value))}>
                    {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Plano">
                  <select className={selectCls} value={form.planId} onChange={(e) => f('planId', e.target.value)}>
                    <option value="">Sem plano</option>
                    {plans.filter((p) => p.active).map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — R${p.price}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Matrícula">
                  <input type="date" className={inputCls} value={form.enrollmentDate} onChange={(e) => f('enrollmentDate', e.target.value)} />
                </Field>
              </div>
              <Field label="Observações">
                <textarea className={inputCls} rows={2} value={form.notes} onChange={(e) => f('notes', e.target.value)} placeholder="Notas do professor…" />
              </Field>
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active}
                  onChange={(e) => f('active', e.target.checked)}
                  className="accent-gold"
                />
                <label htmlFor="active" className="font-mono text-[10px] tracking-[0.2em] text-mid-gray uppercase">
                  Aluno ativo
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
