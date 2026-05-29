import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import PainelLayout, {
  PageHeader, GoldButton, OutlineButton, Field, inputCls, selectCls,
} from '@/components/painel/PainelLayout';
import { usePainel } from '@/contexts/PainelContext';
import {
  DAY_LABELS, MODALITY_LABELS, type ClassSchedule, type Modality,
} from '@/types/painel';

const empty: Omit<ClassSchedule, 'id'> = {
  dayOfWeek: 1, time: '19:00', duration: 60,
  modality: 'bjj-adultos', instructor: '',
};

export default function Horarios() {
  const { schedules, addSchedule, updateSchedule, deleteSchedule } = usePainel();
  const [editing, setEditing] = useState<ClassSchedule | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<ClassSchedule, 'id'>>(empty);

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (s: ClassSchedule) => { setForm(s); setEditing(s); setCreating(false); };
  const closeModal = () => { setCreating(false); setEditing(null); };
  const f = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateSchedule({ ...form, id: editing.id });
    else addSchedule(form);
    closeModal();
  };

  const byDay = DAY_LABELS.map((label, day) => ({
    label,
    day,
    classes: schedules
      .filter((s) => s.dayOfWeek === day)
      .sort((a, b) => a.time.localeCompare(b.time)),
  })).filter((d) => d.classes.length > 0 || d.day >= 1);

  const modal = creating || editing !== null;

  return (
    <PainelLayout>
      <PageHeader
        title="HORÁRIOS"
        subtitle={`${schedules.length} aulas cadastradas`}
        action={<GoldButton onClick={openCreate}><Plus size={14} /> Nova Aula</GoldButton>}
      />

      <div className="px-6 md:px-8 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {byDay.map(({ label, day, classes }) => (
            <div key={day} className="bg-tatame p-5">
              <h3 className="font-display text-2xl text-white-belt/30 tracking-widest mb-4">{label.toUpperCase()}</h3>
              {classes.length === 0 ? (
                <p className="font-mono text-[9px] text-mid-gray/30 uppercase tracking-wider">Sem aulas</p>
              ) : (
                <div className="space-y-3">
                  {classes.map((cls) => (
                    <div key={cls.id} className="group flex items-start justify-between gap-2 border-l-2 border-gold/20 pl-3">
                      <div>
                        <div className="font-mono text-xs text-white-belt">{cls.time}</div>
                        <div className="font-mono text-[10px] text-gold/70 uppercase tracking-wider">
                          {MODALITY_LABELS[cls.modality]}
                        </div>
                        <div className="font-mono text-[9px] text-mid-gray/60 uppercase tracking-wider">
                          {cls.duration}min{cls.instructor ? ` — ${cls.instructor}` : ''}
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button onClick={() => openEdit(cls)} className="text-mid-gray hover:text-gold p-1">
                          <Pencil size={11} />
                        </button>
                        <button
                          onClick={() => { if (confirm('Remover aula?')) deleteSchedule(cls.id); }}
                          className="text-mid-gray hover:text-red-400 p-1"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md bg-blackout border border-white/10">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h2 className="font-display text-xl text-white-belt tracking-wider">
                {editing ? 'EDITAR AULA' : 'NOVA AULA'}
              </h2>
              <button onClick={closeModal} className="text-mid-gray hover:text-white-belt">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Dia da semana">
                  <select className={selectCls} value={form.dayOfWeek} onChange={(e) => f('dayOfWeek', Number(e.target.value))}>
                    {DAY_LABELS.map((d, i) => <option key={i} value={i}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Horário">
                  <input type="time" className={inputCls} value={form.time} onChange={(e) => f('time', e.target.value)} required />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Duração (min)">
                  <input type="number" className={inputCls} value={form.duration} min={30} max={180} step={15}
                    onChange={(e) => f('duration', Number(e.target.value))} />
                </Field>
                <Field label="Modalidade">
                  <select className={selectCls} value={form.modality} onChange={(e) => f('modality', e.target.value as Modality)}>
                    {Object.entries(MODALITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Instrutor">
                <input className={inputCls} value={form.instructor} onChange={(e) => f('instructor', e.target.value)} placeholder="Nome do professor" />
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
