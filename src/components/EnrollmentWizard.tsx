import { useState } from 'react';
import { ChevronLeft, Check, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';
import ContractText from './ContractText';

type PlanType = 'kids' | 'adulto' | 'familia';

// ── Pricing (mirrors server-side PRICES) ──────────────────────────────────────
const MATRICULA = 50;

const KIDS_PLANS = [
  { variant: '1x', label: 'Kids I', sub: '4 a 6 anos · 1× por semana', monthly: 179 },
  { variant: '3x', label: 'Kids II', sub: '6 a 12 anos · Até 3× por semana', monthly: 229 },
  { variant: '5x', label: 'Kids Full', sub: '5× por semana · todas as idades', monthly: 279 },
];

const ADULTO_PLANS = [
  {
    variant: 'anual',
    label: 'Anual',
    sub: 'Cartão de crédito — 1× a 12×',
    monthly: 199,
    totalLabel: `R$${(199 * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} total`,
    highlight: true,
  },
  {
    variant: 'recorrente',
    label: 'Recorrente',
    sub: 'Débito automático mensal',
    monthly: 229,
    totalLabel: 'R$229,00/mês',
    highlight: false,
  },
  {
    variant: 'mensal',
    label: 'Mensal',
    sub: 'Sem compromisso',
    monthly: 279,
    totalLabel: 'R$279,00/mês',
    highlight: false,
  },
];

function familyMonthly(n: number) {
  if (n <= 2) return 389;
  if (n === 3) return 499;
  return 499 + (n - 3) * 119;
}

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ── PAR-Q ──────────────────────────────────────────────────────────────────────
const PARQ_QUESTIONS = [
  'Algum médico já disse que você tem problema de coração e que só deveria praticar atividade física com supervisão médica?',
  'Você sente dores no peito quando pratica atividade física?',
  'No último mês, teve dor no peito mesmo sem fazer atividade física?',
  'Sente tontura ou perde a consciência com frequência?',
  'Tem algum problema ósseo ou articular que poderia piorar com a prática de atividade física?',
  'Já foi prescrito algum medicamento para pressão arterial ou coração?',
  'Há qualquer outro motivo pelo qual você não deveria praticar atividades físicas?',
];

const CONTRACT_CHECKS = [
  'Li, compreendi e aceito integralmente os termos deste contrato.',
  'Declaro que o aluno está apto à prática de atividades físicas.',
  'Comprometo-me a informar a Blackbox Jiu-Jitsu sobre eventuais condições neurológicas ou psicológicas.',
  'Respondi ao PAR-Q com veracidade.',
];

// ── Shared styles ──────────────────────────────────────────────────────────────
const labelCls = 'font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2';
const cardBase =
  'w-full flex items-start justify-between px-5 py-5 transition-colors text-left border';
const cardActive = 'bg-gold/10 border-gold/50';
const cardInactive = 'bg-tatame border-white/5 hover:border-white/20';

// ── Step labels ────────────────────────────────────────────────────────────────
const STEP_LABELS = ['Plano', 'Modalidade', 'PAR-Q', 'Contrato', 'Confirmar'];
const TOTAL_STEPS = STEP_LABELS.length;

export default function EnrollmentWizard() {
  const [step, setStep] = useState(1);
  const [planType, setPlanType] = useState<PlanType | null>(null);
  const [planVariant, setPlanVariant] = useState<string | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(2);

  // PAR-Q state
  const [parqAnswers, setParqAnswers] = useState<(boolean | null)[]>(Array(7).fill(null));
  const [parqDeclared, setParqDeclared] = useState(false);

  // Contract state
  const [contractChecks, setContractChecks] = useState<boolean[]>([false, false, false, false]);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // ── Derived ──────────────────────────────────────────────────────────────────
  const parqAllAnswered = parqAnswers.every((a) => a !== null);
  const parqHasSim = parqAnswers.some((a) => a === true);
  const parqCanProceed = parqAllAnswered && parqDeclared;
  const contractCanProceed = contractChecks.every(Boolean);

  const toggleParq = (idx: number, value: boolean) =>
    setParqAnswers((prev) => prev.map((v, i) => (i === idx ? value : v)));

  const toggleContract = (idx: number) =>
    setContractChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  // ── Price summary ────────────────────────────────────────────────────────────
  const getPriceSummary = () => {
    if (!planType || !planVariant) return null;
    if (planType === 'kids') {
      const p = KIDS_PLANS.find((k) => k.variant === planVariant)!;
      return {
        planLabel: `Kids — ${p.label}`,
        details: p.sub,
        matricula: fmt(MATRICULA),
        charge: `${fmt(p.monthly)}/mês (recorrente)`,
        firstCharge: fmt(p.monthly + MATRICULA),
        type: 'recorrente' as const,
      };
    }
    if (planType === 'adulto') {
      const p = ADULTO_PLANS.find((a) => a.variant === planVariant)!;
      if (planVariant === 'anual') {
        return {
          planLabel: 'Adulto — Anual',
          details: '12 meses — pague à vista ou parcelado em até 12×',
          matricula: fmt(MATRICULA),
          charge: `${fmt(199 * 12)} (plano) + ${fmt(MATRICULA)} (matrícula)`,
          firstCharge: fmt(199 * 12 + MATRICULA),
          type: 'parcelado' as const,
        };
      }
      return {
        planLabel: `Adulto — ${p.label}`,
        details: p.sub,
        matricula: fmt(MATRICULA),
        charge:
          planVariant === 'recorrente'
            ? `${fmt(p.monthly)}/mês (recorrente)`
            : `${fmt(p.monthly)} (1 mês)`,
        firstCharge: fmt(p.monthly + MATRICULA),
        type: planVariant === 'recorrente' ? ('recorrente' as const) : ('avulso' as const),
      };
    }
    const monthly = familyMonthly(numberOfPeople);
    const totalMatricula = MATRICULA * numberOfPeople;
    return {
      planLabel: `Família — ${numberOfPeople} pessoas`,
      details: 'Plano anual — pague à vista ou parcelado em até 12×',
      matricula: `${fmt(MATRICULA)} × ${numberOfPeople} = ${fmt(totalMatricula)}`,
      charge: `${fmt(monthly * 12)} (plano) + ${fmt(totalMatricula)} (matrículas)`,
      firstCharge: fmt(monthly * 12 + totalMatricula),
      type: 'parcelado' as const,
    };
  };

  const summary = getPriceSummary();

  // ── Navigation ───────────────────────────────────────────────────────────────
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => {
    setStep((s) => s - 1);
    setApiError(null);
  };

  // ── Checkout ─────────────────────────────────────────────────────────────────
  const handleCheckout = async () => {
    if (!planType || !planVariant) return;
    setLoading(true);
    setApiError(null);

    const body: Record<string, unknown> = {
      planType,
      planVariant,
      parqHasSim,
      parqAnswers: parqAnswers.map((a, i) => ({ q: i + 1, sim: a })),
    };
    if (planType === 'familia') body.numberOfPeople = numberOfPeople;

    try {
      const res = await fetch('/api/checkout/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setApiError(data.error ?? 'Erro ao gerar link de pagamento. Tente novamente.');
        return;
      }
      window.location.href = data.url;
    } catch {
      setApiError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // ── Progress ─────────────────────────────────────────────────────────────────
  const Progress = () => (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] flex-1 transition-colors duration-300 ${
            i < step ? 'bg-gold' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-24 md:py-40 bg-blackout min-h-screen">
      <div className="px-6 max-w-2xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
            Matrícula
          </span>
          <h1
            className="font-display leading-none text-white-belt tracking-wider"
            style={{ fontSize: 'clamp(44px, 11vw, 80px)' }}
          >
            FAÇA SUA
            <br />
            MATRÍCULA
          </h1>
        </div>

        <Progress />

        <div className="flex items-center justify-between mb-10">
          <span className="font-mono text-[9px] tracking-[0.3em] text-gold/60 uppercase">
            {step} / {TOTAL_STEPS} — {STEP_LABELS[step - 1]}
          </span>
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-mid-gray/60 uppercase hover:text-gold transition-colors"
            >
              <ChevronLeft size={12} /> Voltar
            </button>
          )}
        </div>

        {/* ── STEP 1 — Tipo ── */}
        {step === 1 && (
          <div className="space-y-3">
            <span className={labelCls}>Quem vai treinar?</span>
            {(
              [
                { type: 'kids', label: 'Kids', sub: '4 a 12 anos — 3 opções de frequência' },
                {
                  type: 'adulto',
                  label: 'Adulto',
                  sub: 'Gi, No-Gi, Feminino, Defesa Pessoal — acesso livre',
                },
                { type: 'familia', label: 'Família', sub: 'Plano anual para 2 ou mais membros' },
              ] as const
            ).map(({ type, label, sub }) => (
              <button
                key={type}
                onClick={() => {
                  setPlanType(type);
                  setPlanVariant(null);
                  nextStep();
                }}
                className={`${cardBase} ${planType === type ? cardActive : cardInactive}`}
              >
                <div>
                  <span
                    className={`font-display text-2xl tracking-widest uppercase ${
                      planType === type ? 'text-gold' : 'text-white-belt'
                    }`}
                  >
                    {label}
                  </span>
                  <p className="font-mono text-[10px] tracking-wider text-mid-gray uppercase mt-1">
                    {sub}
                  </p>
                </div>
                {planType === type && <Check size={16} className="text-gold shrink-0 mt-1" />}
              </button>
            ))}
          </div>
        )}

        {/* ── STEP 2 — Plano específico ── */}
        {step === 2 && planType === 'kids' && (
          <div className="space-y-3">
            <span className={labelCls}>Frequência semanal</span>
            {KIDS_PLANS.map((p) => (
              <button
                key={p.variant}
                onClick={() => {
                  setPlanVariant(p.variant);
                  nextStep();
                }}
                className={`${cardBase} ${planVariant === p.variant ? cardActive : cardInactive}`}
              >
                <div>
                  <span
                    className={`font-display text-xl tracking-widest uppercase ${
                      planVariant === p.variant ? 'text-gold' : 'text-white-belt'
                    }`}
                  >
                    {p.label}
                  </span>
                  <p className="font-mono text-[10px] tracking-wider text-mid-gray uppercase mt-1">
                    {p.sub}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span
                    className={`font-display text-xl tracking-wider ${
                      planVariant === p.variant ? 'text-gold' : 'text-white-belt'
                    }`}
                  >
                    {fmt(p.monthly)}
                  </span>
                  <p className="font-mono text-[8px] text-mid-gray/60 uppercase">/mês</p>
                </div>
              </button>
            ))}
            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/40 uppercase pt-2">
              + Taxa de matrícula: {fmt(MATRICULA)} por aluno
            </p>
          </div>
        )}

        {step === 2 && planType === 'adulto' && (
          <div className="space-y-3">
            <span className={labelCls}>Tipo de plano</span>
            {ADULTO_PLANS.map((p) => (
              <button
                key={p.variant}
                onClick={() => {
                  setPlanVariant(p.variant);
                  nextStep();
                }}
                className={`${cardBase} relative ${
                  planVariant === p.variant ? cardActive : cardInactive
                } ${p.highlight ? 'border-t-2 border-t-gold' : ''}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`font-display text-xl tracking-widest uppercase ${
                        planVariant === p.variant ? 'text-gold' : 'text-white-belt'
                      }`}
                    >
                      {p.label}
                    </span>
                    {p.highlight && (
                      <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/20 text-gold uppercase px-2 py-0.5">
                        Mais econômico
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">
                    {p.sub}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span
                    className={`font-display text-xl tracking-wider ${
                      planVariant === p.variant ? 'text-gold' : 'text-white-belt'
                    }`}
                  >
                    {fmt(p.monthly)}
                  </span>
                  <p className="font-mono text-[8px] text-mid-gray/60 uppercase">/mês</p>
                </div>
              </button>
            ))}
            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/40 uppercase pt-2">
              + Taxa de matrícula: {fmt(MATRICULA)} por aluno
            </p>
          </div>
        )}

        {step === 2 && planType === 'familia' && (
          <div className="space-y-6">
            <div>
              <span className={labelCls}>Número de membros</span>
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => setNumberOfPeople((n) => Math.max(2, n - 1))}
                  disabled={numberOfPeople <= 2}
                  className="w-12 h-12 border border-white/10 text-white-belt font-display text-2xl flex items-center justify-center hover:border-gold/40 transition-colors disabled:opacity-30"
                >
                  −
                </button>
                <span className="font-display text-4xl text-white-belt tracking-wider w-12 text-center">
                  {numberOfPeople}
                </span>
                <button
                  onClick={() => setNumberOfPeople((n) => Math.min(5, n + 1))}
                  disabled={numberOfPeople >= 5}
                  className="w-12 h-12 border border-white/10 text-white-belt font-display text-2xl flex items-center justify-center hover:border-gold/40 transition-colors disabled:opacity-30"
                >
                  +
                </button>
                <span className="font-mono text-[10px] tracking-[0.2em] text-mid-gray uppercase ml-2">
                  pessoas
                </span>
              </div>
              {numberOfPeople > 3 && (
                <p className="font-mono text-[9px] tracking-[0.2em] text-gold/60 uppercase mt-3">
                  Base 3 pessoas + {numberOfPeople - 3} adicional
                  {numberOfPeople - 3 > 1 ? 'is' : ''} ({fmt(119)}/mês cada)
                </p>
              )}
            </div>

            <div className="bg-tatame border border-white/5 p-5 space-y-3">
              <p className={labelCls}>Resumo mensal</p>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">
                  Mensalidade
                </span>
                <span className="font-mono text-[11px] text-white-belt">
                  {fmt(familyMonthly(numberOfPeople))}/mês
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">
                  Total anual (plano)
                </span>
                <span className="font-mono text-[11px] text-white-belt">
                  {fmt(familyMonthly(numberOfPeople) * 12)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">
                  Matrículas ({numberOfPeople} × {fmt(MATRICULA)})
                </span>
                <span className="font-mono text-[11px] text-white-belt">
                  {fmt(MATRICULA * numberOfPeople)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <span className="font-mono text-[10px] tracking-wider text-gold uppercase">
                  Total na contratação
                </span>
                <span className="font-display text-xl text-gold">
                  {fmt(familyMonthly(numberOfPeople) * 12 + MATRICULA * numberOfPeople)}
                </span>
              </div>
              <p className="font-mono text-[9px] text-mid-gray/40 uppercase text-right">
                parcelável em até 12×
              </p>
            </div>

            <button
              onClick={() => {
                setPlanVariant('anual');
                nextStep();
              }}
              className="w-full font-display text-xl tracking-widest uppercase py-4 bg-gold text-blackout hover:bg-gold/90 transition-colors"
            >
              Continuar
            </button>
          </div>
        )}

        {/* ── STEP 3 — PAR-Q ── */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border border-white/5 bg-tatame/50 px-5 py-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-gold/80 uppercase mb-1">
                Questionário de Prontidão para Atividade Física
              </p>
              <p className="font-mono text-[9px] text-mid-gray/60 leading-relaxed">
                Responda com honestidade. As respostas ficam registradas com sua matrícula e são
                protegidas pelo sigilo médico-desportivo.
              </p>
            </div>

            <div className="space-y-4">
              {PARQ_QUESTIONS.map((q, idx) => (
                <div key={idx} className="border-b border-white/5 pb-4 last:border-0">
                  <p className="font-mono text-[10px] tracking-[0.15em] text-white-belt/80 leading-relaxed mb-3">
                    <span className="text-gold/50 mr-2">{idx + 1}.</span>
                    {q}
                  </p>
                  <div className="flex gap-3">
                    {(['Sim', 'Não'] as const).map((opt) => {
                      const val = opt === 'Sim';
                      const active = parqAnswers[idx] === val;
                      return (
                        <button
                          key={opt}
                          onClick={() => toggleParq(idx, val)}
                          className={`font-mono text-[9px] tracking-[0.3em] uppercase px-5 py-2.5 border transition-colors ${
                            active
                              ? val
                                ? 'bg-intense-red/20 border-intense-red/60 text-white-belt'
                                : 'bg-gold/10 border-gold/50 text-gold'
                              : 'bg-tatame border-white/10 text-mid-gray/60 hover:border-white/30'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {parqHasSim && parqAllAnswered && (
              <div className="flex items-start gap-3 border border-intense-red/20 bg-intense-red/5 px-4 py-4">
                <AlertTriangle size={14} className="text-intense-red shrink-0 mt-0.5" />
                <p className="font-mono text-[9px] tracking-[0.15em] text-mid-gray/80 leading-relaxed">
                  Você respondeu <strong className="text-white-belt">Sim</strong> a uma ou mais
                  perguntas. Recomendamos consultar um médico antes de iniciar as atividades. Você
                  ainda pode prosseguir com a matrícula e apresentar atestado médico presencialmente.
                </p>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer group">
              <button
                onClick={() => setParqDeclared((v) => !v)}
                className={`w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                  parqDeclared ? 'bg-gold border-gold' : 'border-white/20 hover:border-gold/50'
                }`}
              >
                {parqDeclared && <Check size={11} className="text-blackout" />}
              </button>
              <span className="font-mono text-[9px] tracking-[0.15em] text-mid-gray/70 leading-relaxed group-hover:text-mid-gray/90 transition-colors">
                Declaro que respondi ao PAR-Q com veracidade e estou ciente de que devo procurar
                orientação médica caso tenha respondido "Sim" a qualquer pergunta.
              </span>
            </label>

            <button
              onClick={nextStep}
              disabled={!parqCanProceed}
              className="w-full font-display text-xl tracking-widest uppercase py-4 bg-gold text-blackout hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próximo
            </button>

            {!parqAllAnswered && (
              <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase text-center">
                Responda todas as perguntas para continuar
              </p>
            )}
          </div>
        )}

        {/* ── STEP 4 — Contrato ── */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border border-white/5 bg-tatame/50 px-5 py-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-gold/80 uppercase mb-1">
                Leia o contrato antes de aceitar
              </p>
              <p className="font-mono text-[9px] text-mid-gray/60 leading-relaxed">
                Role até o final e marque todas as opções para prosseguir.
              </p>
            </div>

            {/* Contract text scrollable */}
            <div className="border border-white/5 bg-tatame/30 p-5 max-h-72 overflow-y-auto rounded-none scrollbar-thin">
              <ContractText />
            </div>

            {/* Acceptance checkboxes */}
            <div className="space-y-3">
              <p className={labelCls}>Termos de aceite digital</p>
              {CONTRACT_CHECKS.map((text, idx) => (
                <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                  <button
                    onClick={() => toggleContract(idx)}
                    className={`w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                      contractChecks[idx]
                        ? 'bg-gold border-gold'
                        : 'border-white/20 hover:border-gold/50'
                    }`}
                  >
                    {contractChecks[idx] && <Check size={11} className="text-blackout" />}
                  </button>
                  <span className="font-mono text-[9px] tracking-[0.15em] text-mid-gray/70 leading-relaxed group-hover:text-mid-gray/90 transition-colors">
                    {text}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!contractCanProceed}
              className="w-full font-display text-xl tracking-widest uppercase py-4 bg-gold text-blackout hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirmar e Pagar
            </button>

            {!contractCanProceed && (
              <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase text-center">
                Marque todas as opções para continuar
              </p>
            )}
          </div>
        )}

        {/* ── STEP 5 — Confirmar ── */}
        {step === 5 && summary && (
          <div className="space-y-6">
            <div className="bg-tatame border border-white/5 divide-y divide-white/5">
              {[
                { label: 'Plano', value: summary.planLabel },
                { label: 'Detalhes', value: summary.details },
                { label: 'Taxa de matrícula', value: summary.matricula },
                {
                  label: summary.type === 'parcelado' ? 'Total' : '1ª cobrança',
                  value: summary.firstCharge,
                },
                ...(summary.type === 'recorrente'
                  ? [
                      {
                        label: 'Cobranças seguintes',
                        value: summary.charge.replace(/\(recorrente\)/, '').trim(),
                      },
                    ]
                  : []),
                { label: 'PAR-Q', value: parqHasSim ? 'Respondido — acompanhamento recomendado' : 'Respondido — apto' },
                { label: 'Contrato', value: 'Aceito digitalmente' },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-4 px-5 py-4">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase w-36 shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-white-belt">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 border border-white/5 px-4 py-4 bg-tatame/40">
              <ShieldCheck size={14} className="text-gold/60 shrink-0 mt-0.5" />
              <p className="font-mono text-[9px] tracking-[0.15em] text-mid-gray/60 leading-relaxed">
                Você será redirecionado para o ambiente seguro do Asaas. Seus dados de pagamento são
                processados exclusivamente pelo Asaas, em conformidade com a LGPD.
              </p>
            </div>

            {apiError && (
              <p className="font-mono text-[10px] tracking-wider text-red-400 uppercase border border-red-400/20 px-4 py-3 text-center">
                {apiError}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gold text-blackout font-display text-2xl tracking-widest uppercase py-5 hover:bg-gold/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Gerando link…
                </>
              ) : (
                'Pagar com Segurança'
              )}
            </button>

            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase text-center">
              PIX · Cartão de crédito · Boleto bancário
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
