import { useState, useMemo } from 'react';
import { MessageCircle, ChevronLeft, Check } from 'lucide-react';
import { scheduleData } from './Schedule';

const UNIT_WHATSAPP: Record<string, string> = {
  'Portais — Matriz': '5511977962165',
  'Parque Santana': '5511960680648',
  'Cidade São Pedro': '5511975859485',
};

type Profile = 'adulto' | 'kids';

const UNIT_OPTIONS = Object.keys(UNIT_WHATSAPP);
const ADULT_MODALITIES = ['BJJ Adultos Gi', 'BJJ No-Gi', 'BJJ Feminino', 'Defesa Pessoal'];
const WEEK_HEADER = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
const PT_DAY_SHORT = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

const formatDate = (d: Date) =>
  `${PT_DAY_SHORT[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;

const inputCls =
  'w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors';

const labelCls = 'font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2';

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Profile>('adulto');

  // Step 1 — adult
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Step 1 — kids
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');

  // Step 2
  const [unit, setUnit] = useState('');
  const [modality, setModality] = useState('');

  // Step 3
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ time: string; name: string; duration: string } | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // 4 weeks of Mon–Sat starting from the Monday of the current week
  const calendarWeeks = useMemo(() => {
    const dow = today.getDay();
    const offsetToMonday = dow === 0 ? -6 : 1 - dow;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + offsetToMonday);
    return Array.from({ length: 4 }, (_, w) =>
      Array.from({ length: 6 }, (_, d) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + w * 7 + d);
        return date;
      })
    );
  }, [today]);

  const getSlotsForDate = (date: Date) => {
    const idx = date.getDay() - 1; // 0=Mon … 5=Sat
    if (idx < 0 || !unit) return [];
    const unitData = scheduleData[unit];
    if (!unitData) return [];
    const dayData = unitData[idx];
    if (!dayData) return [];
    if (!modality) return dayData.classes;
    return dayData.classes.filter((c) => c.name === modality);
  };

  const availableSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

  const modalities = profile === 'kids' ? ['BJJ Kids'] : ADULT_MODALITIES;

  const handleProfileChange = (p: Profile) => {
    setProfile(p);
    setModality(p === 'kids' ? 'BJJ Kids' : '');
  };

  const canProceedStep1 =
    profile === 'adulto'
      ? Boolean(name && dob && phone && email)
      : Boolean(childName && childAge && guardianName && guardianPhone && guardianEmail);

  const canProceedStep2 = Boolean(unit && modality);
  const canProceedStep3 = Boolean(selectedDate && selectedSlot);

  const buildMessage = () => {
    const isKids = profile === 'kids';
    return [
      'Olá! Quero agendar minha aula experimental grátis.',
      '',
      `*Nome:* ${isKids ? guardianName : name}`,
      selectedDate ? `*Data sugerida:* ${formatDate(selectedDate)}` : '',
      selectedSlot ? `*Horário:* ${selectedSlot.time} — ${selectedSlot.name} (${selectedSlot.duration})` : '',
      `*Modalidade:* ${modality}`,
      `*Unidade:* ${unit}`,
      `*Celular:* ${isKids ? guardianPhone : phone}`,
      `*E-mail:* ${isKids ? guardianEmail : email}`,
      isKids ? `*Criança:* ${childName}, ${childAge} anos` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleConfirm = () => {
    const number = UNIT_WHATSAPP[unit] ?? UNIT_WHATSAPP['Portais — Matriz'];
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(buildMessage())}`, '_blank');
  };

  const stepLabels = ['Dados Pessoais', 'Unidade e Modalidade', 'Data e Horário', 'Confirmar'];

  return (
    <section className="py-24 md:py-40 bg-blackout min-h-screen">
      <div className="px-6 max-w-2xl mx-auto">

        {/* Page heading */}
        <div className="mb-10">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
            Aula Experimental Grátis
          </span>
          <h1
            className="font-display leading-none text-white-belt tracking-wider"
            style={{ fontSize: 'clamp(44px, 11vw, 80px)' }}
          >
            AGENDE
            <br />
            SUA AULA
          </h1>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-[3px] flex-1 transition-colors duration-300 ${s <= step ? 'bg-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        {/* Step label + back */}
        <div className="flex items-center justify-between mb-10">
          <span className="font-mono text-[9px] tracking-[0.3em] text-gold/60 uppercase">
            {step} / 4 — {stepLabels[step - 1]}
          </span>
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-mid-gray/60 uppercase hover:text-gold transition-colors"
            >
              <ChevronLeft size={12} /> Voltar
            </button>
          )}
        </div>

        {/* ── STEP 1 — Dados Pessoais ── */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className={labelCls}>Quem vai treinar?</span>
              <div className="flex gap-px">
                {(['adulto', 'kids'] as Profile[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => handleProfileChange(p)}
                    className={`flex-1 font-display text-xl tracking-widest uppercase py-4 transition-colors ${
                      profile === p ? 'bg-gold text-blackout' : 'bg-tatame text-mid-gray hover:text-white-belt'
                    }`}
                  >
                    {p === 'adulto' ? 'Adulto' : 'Kids'}
                  </button>
                ))}
              </div>
            </div>

            {profile === 'adulto' ? (
              <>
                <div>
                  <label className={labelCls}>Nome Completo</label>
                  <input className={inputCls} type="text" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Data de Nascimento</label>
                  <input className={`${inputCls} [color-scheme:dark]`} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Celular / WhatsApp</label>
                  <input className={inputCls} type="tel" placeholder="(11) 00000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>E-mail</label>
                  <input className={inputCls} type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className={labelCls}>Nome da Criança</label>
                  <input className={inputCls} type="text" placeholder="Nome completo da criança" value={childName} onChange={(e) => setChildName(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Idade da Criança</label>
                  <input className={inputCls} type="number" min={4} max={17} placeholder="Ex: 8" value={childAge} onChange={(e) => setChildAge(e.target.value)} />
                </div>

                <div className="border-t border-white/5 pt-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase block mb-5">
                    Dados do Responsável
                  </span>
                  <div className="space-y-6">
                    <div>
                      <label className={labelCls}>Nome do Responsável</label>
                      <input className={inputCls} type="text" placeholder="Nome completo" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Celular do Responsável</label>
                      <input className={inputCls} type="tel" placeholder="(11) 00000-0000" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>E-mail do Responsável</label>
                      <input className={inputCls} type="email" placeholder="responsavel@email.com" value={guardianEmail} onChange={(e) => setGuardianEmail(e.target.value)} />
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => canProceedStep1 && setStep(2)}
              disabled={!canProceedStep1}
              className="w-full font-display text-xl tracking-widest uppercase py-4 bg-gold text-blackout hover:bg-gold/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-2"
            >
              Próximo
            </button>
          </div>
        )}

        {/* ── STEP 2 — Unidade e Modalidade ── */}
        {step === 2 && (
          <div className="space-y-10">
            <div>
              <span className={labelCls}>Unidade</span>
              <div className="space-y-px">
                {UNIT_OPTIONS.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`w-full flex items-center justify-between px-5 py-4 transition-colors text-left ${
                      unit === u
                        ? 'bg-gold/10 border border-gold/40'
                        : 'bg-tatame border border-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-mono text-[11px] tracking-wider uppercase ${unit === u ? 'text-gold' : 'text-mid-gray'}`}>
                      {u}
                    </span>
                    {unit === u && <Check size={14} className="text-gold shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={labelCls}>Modalidade</span>
              <div className="flex flex-wrap gap-2">
                {modalities.map((m) => (
                  <button
                    key={m}
                    onClick={() => setModality(m)}
                    className={`font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 transition-colors ${
                      modality === m
                        ? 'bg-gold text-blackout'
                        : 'border border-white/10 text-mid-gray hover:border-gold/40 hover:text-gold'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => canProceedStep2 && setStep(3)}
              disabled={!canProceedStep2}
              className="w-full font-display text-xl tracking-widest uppercase py-4 bg-gold text-blackout hover:bg-gold/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        )}

        {/* ── STEP 3 — Data e Horário ── */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <span className={labelCls}>Escolha uma data</span>

              {/* Week day header */}
              <div className="grid grid-cols-6 gap-px mb-1">
                {WEEK_HEADER.map((d) => (
                  <div key={d} className="text-center font-mono text-[8px] tracking-widest text-mid-gray/40 uppercase py-2">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="space-y-px">
                {calendarWeeks.map((week, wi) => (
                  <div key={wi} className="grid grid-cols-6 gap-px">
                    {week.map((date, di) => {
                      const isPast = date < today;
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      const hasSlots = getSlotsForDate(date).length > 0;
                      const isDisabled = isPast || !hasSlots;
                      return (
                        <button
                          key={di}
                          onClick={() => {
                            if (!isDisabled) {
                              setSelectedDate(date);
                              setSelectedSlot(null);
                            }
                          }}
                          disabled={isDisabled}
                          className={`py-3.5 text-center transition-colors ${
                            isSelected
                              ? 'bg-gold text-blackout'
                              : isDisabled
                              ? 'bg-tatame/40 text-mid-gray/20 cursor-not-allowed'
                              : 'bg-tatame text-mid-gray hover:bg-tatame/70 hover:text-white-belt'
                          }`}
                        >
                          <span className="font-mono text-[11px] tracking-wider">{date.getDate()}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div>
                <span className={labelCls}>Horários — {formatDate(selectedDate)}</span>
                {availableSlots.length === 0 ? (
                  <p className="font-mono text-[10px] tracking-wider text-mid-gray/50 uppercase border border-white/5 px-4 py-4 text-center">
                    Sem aulas de {modality} neste dia. Escolha outra data.
                  </p>
                ) : (
                  <div className="space-y-px">
                    {availableSlots.map((slot, i) => {
                      const isSelected = selectedSlot?.time === slot.time && selectedSlot?.name === slot.name;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full flex items-center justify-between px-5 py-4 transition-colors text-left ${
                            isSelected
                              ? 'bg-gold/10 border border-gold/40'
                              : 'bg-tatame border border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-baseline gap-3">
                            <span className={`font-mono text-base tracking-wider ${isSelected ? 'text-gold' : 'text-white-belt'}`}>
                              {slot.time}
                            </span>
                            <span className={`font-mono text-[10px] tracking-wider uppercase ${isSelected ? 'text-gold/80' : 'text-mid-gray'}`}>
                              {slot.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-[9px] text-mid-gray/50">{slot.duration}</span>
                            {isSelected && <Check size={14} className="text-gold" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => canProceedStep3 && setStep(4)}
              disabled={!canProceedStep3}
              className="w-full font-display text-xl tracking-widest uppercase py-4 bg-gold text-blackout hover:bg-gold/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        )}

        {/* ── STEP 4 — Confirmar ── */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="bg-tatame border border-white/5 divide-y divide-white/5">
              {[
                { label: 'Unidade', value: unit },
                { label: 'Modalidade', value: modality },
                { label: 'Data', value: selectedDate ? formatDate(selectedDate) : '' },
                {
                  label: 'Horário',
                  value: selectedSlot ? `${selectedSlot.time} — ${selectedSlot.name} (${selectedSlot.duration})` : '',
                },
                { label: profile === 'kids' ? 'Responsável' : 'Nome', value: profile === 'kids' ? guardianName : name },
                { label: 'Celular', value: profile === 'kids' ? guardianPhone : phone },
                { label: 'E-mail', value: profile === 'kids' ? guardianEmail : email },
                ...(profile === 'kids'
                  ? [{ label: 'Criança', value: `${childName}, ${childAge} anos` }]
                  : []),
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-4 px-5 py-4">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase w-24 shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-white-belt">{row.value}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/40 uppercase text-center mb-5">
                Nossa equipe confirmará a data e o horário via WhatsApp
              </p>
              <button
                onClick={handleConfirm}
                className="w-full flex items-center justify-center gap-3 bg-gold text-blackout font-display text-2xl tracking-widest uppercase py-5 hover:bg-gold/90 transition-colors"
              >
                <MessageCircle size={20} />
                Confirmar no WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
