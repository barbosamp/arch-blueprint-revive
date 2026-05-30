import { useState } from 'react';
import { ChevronLeft, Check, ShieldCheck, Loader2 } from 'lucide-react';

type PlanType = 'kids' | 'adulto' | 'familia';

// ── Display-only pricing (mirrors server-side PRICES) ────────────────────────
const MATRICULA = 50;

const KIDS_PLANS = [
  { variant: '1x', label: 'Kids I', sub: '1× por semana', monthly: 179 },
  { variant: '3x', label: 'Kids II', sub: 'Até 3× por semana', monthly: 229 },
  { variant: '5x', label: 'Kids Full', sub: '5× por semana', monthly: 279 },
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

// ── Shared styles ─────────────────────────────────────────────────────────────
const labelCls = 'font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2';
const cardBase =
  'w-full flex items-start justify-between px-5 py-5 transition-colors text-left border';
const cardActive = 'bg-gold/10 border-gold/50';
const cardInactive = 'bg-tatame border-white/5 hover:border-white/20';

export default function EnrollmentWizard() {
  const [step, setStep] = useState(1);
  const [planType, setPlanType] = useState<PlanType | null>(null);
  const [planVariant, setPlanVariant] = useState<string | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const stepLabels = ['Tipo de Plano', 'Plano', planType === 'familia' ? 'Membros' : null, 'Confirmar'].filter(Boolean) as string[];
  const totalSteps = stepLabels.length;

  // ── Price summary for step 4 ──────────────────────────────────────────────
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
        const total = 199 * 12 + MATRICULA;
        return {
          planLabel: 'Adulto — Anual',
          details: '12 meses — pague à vista ou parcelado em até 12×',
          matricula: fmt(MATRICULA),
          charge: `${fmt(199 * 12)} (plano) + ${fmt(MATRICULA)} (matrícula)`,
          firstCharge: fmt(total),
          type: 'parcelado' as const,
        };
      }
      return {
        planLabel: `Adulto — ${p.label}`,
        details: p.sub,
        matricula: fmt(MATRICULA),
        charge: planVariant === 'recorrente' ? `${fmt(p.monthly)}/mês (recorrente)` : `${fmt(p.monthly)} (1 mês)`,
        firstCharge: fmt(p.monthly + MATRICULA),
        type: planVariant === 'recorrente' ? ('recorrente' as const) : ('avulso' as const),
      };
    }
    // familia
    const monthly = familyMonthly(numberOfPeople);
    const totalMatricula = MATRICULA * numberOfPeople;
    const annualTotal = monthly * 12 + totalMatricula;
    return {
      planLabel: `Família — ${numberOfPeople} pessoas`,
      details: 'Plano anual — pague à vista ou parcelado em até 12×',
      matricula: `${fmt(MATRICULA)} × ${numberOfPeople} = ${fmt(totalMatricula)}`,
      charge: `${fmt(monthly * 12)} (plano) + ${fmt(totalMatricula)} (matrículas)`,
      firstCharge: fmt(annualTotal),
      type: 'parcelado' as const,
    };
  };

  const summary = getPriceSummary();

  const getStepIndex = () => {
    // steps: 1=tipo, 2=plano, 3=membros(familia only), 4=confirmar
    if (planType !== 'familia') {
      // steps map: 1→1, 2→2, skip 3, 4→3
      return step <= 2 ? step : step + 1;
    }
    return step;
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => { setStep((s) => s - 1); setApiError(null); };

  const handleCheckout = async () => {
    if (!planType || !planVariant) return;
    setLoading(true);
    setApiError(null);

    const body: Record<string, unknown> = { planType, planVariant };
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

  // ── Progress bar ──────────────────────────────────────────────────────────
  const Progress = () => (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] flex-1 transition-colors duration-300 ${i < step ? 'bg-gold' : 'bg-white/10'}`}
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
            {step} / {totalSteps} — {stepLabels[step - 1]}
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
                { type: 'adulto', label: 'Adulto', sub: 'Gi, No-Gi, Feminino, Defesa Pessoal — acesso livre' },
                { type: 'familia', label: 'Família', sub: 'Plano anual para 2 ou mais membros' },
              ] as const
            ).map(({ type, label, sub }) => (
              <button
                key={type}
                onClick={() => { setPlanType(type); setPlanVariant(null); nextStep(); }}
                className={`${cardBase} ${planType === type ? cardActive : cardInactive}`}
              >
                <div>
                  <span className={`font-display text-2xl tracking-widest uppercase ${planType === type ? 'text-gold' : 'text-white-belt'}`}>
                    {label}
                  </span>
                  <p className="font-mono text-[10px] tracking-wider text-mid-gray uppercase mt-1">{sub}</p>
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
                onClick={() => { setPlanVariant(p.variant); nextStep(); }}
                className={`${cardBase} ${planVariant === p.variant ? cardActive : cardInactive}`}
              >
                <div>
                  <span className={`font-display text-xl tracking-widest uppercase ${planVariant === p.variant ? 'text-gold' : 'text-white-belt'}`}>
                    {p.label}
                  </span>
                  <p className="font-mono text-[10px] tracking-wider text-mid-gray uppercase mt-1">{p.sub}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className={`font-display text-xl tracking-wider ${planVariant === p.variant ? 'text-gold' : 'text-white-belt'}`}>
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
                onClick={() => { setPlanVariant(p.variant); nextStep(); }}
                className={`${cardBase} relative ${planVariant === p.variant ? cardActive : cardInactive} ${p.highlight ? 'border-t-2 border-t-gold' : ''}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`font-display text-xl tracking-widest uppercase ${planVariant === p.variant ? 'text-gold' : 'text-white-belt'}`}>
                      {p.label}
                    </span>
                    {p.highlight && (
                      <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/20 text-gold uppercase px-2 py-0.5">
                        Mais econômico
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">{p.sub}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className={`font-display text-xl tracking-wider ${planVariant === p.variant ? 'text-gold' : 'text-white-belt'}`}>
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
                  Base 3 pessoas + {numberOfPeople - 3} adicional{numberOfPeople - 3 > 1 ? 'is' : ''} ({fmt(119)}/mês cada)
                </p>
              )}
            </div>

            <div className="bg-tatame border border-white/5 p-5 space-y-3">
              <p className={labelCls}>Resumo mensal</p>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">Mensalidade</span>
                <span className="font-mono text-[11px] text-white-belt">{fmt(familyMonthly(numberOfPeople))}/mês</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">Total anual (plano)</span>
                <span className="font-mono text-[11px] text-white-belt">{fmt(familyMonthly(numberOfPeople) * 12)}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">Matrículas ({numberOfPeople} × {fmt(MATRICULA)})</span>
                <span className="font-mono text-[11px] text-white-belt">{fmt(MATRICULA * numberOfPeople)}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <span className="font-mono text-[10px] tracking-wider text-gold uppercase">Total na contratação</span>
                <span className="font-display text-xl text-gold">{fmt(familyMonthly(numberOfPeople) * 12 + MATRICULA * numberOfPeople)}</span>
              </div>
              <p className="font-mono text-[9px] text-mid-gray/40 uppercase text-right">parcelável em até 12×</p>
            </div>

            <button
              onClick={() => { setPlanVariant('anual'); nextStep(); }}
              className="w-full font-display text-xl tracking-widest uppercase py-4 bg-gold text-blackout hover:bg-gold/90 transition-colors"
            >
              Continuar
            </button>
          </div>
        )}

        {/* ── STEP 3 — Confirmar ── */}
        {step === 3 && summary && (
          <div className="space-y-6">
            <div className="bg-tatame border border-white/5 divide-y divide-white/5">
              {[
                { label: 'Plano', value: summary.planLabel },
                { label: 'Detalhes', value: summary.details },
                { label: 'Taxa de matrícula', value: summary.matricula },
                { label: summary.type === 'parcelado' ? 'Total' : '1ª cobrança', value: summary.firstCharge },
                ...(summary.type === 'recorrente'
                  ? [{ label: 'Cobranças seguintes', value: summary.charge.replace(/\(recorrente\)/, '').trim() }]
                  : []),
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-4 px-5 py-4">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase w-32 shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-white-belt">{row.value}</span>
                </div>
              ))}
            </div>

            {/* LGPD notice */}
            <div className="flex items-start gap-3 border border-white/5 px-4 py-4 bg-tatame/40">
              <ShieldCheck size={14} className="text-gold/60 shrink-0 mt-0.5" />
              <p className="font-mono text-[9px] tracking-[0.15em] text-mid-gray/60 leading-relaxed">
                Você será redirecionado para o ambiente seguro do Asaas. Seus dados pessoais e de pagamento são coletados e processados exclusivamente pelo Asaas, em conformidade com a LGPD. Não armazenamos seus dados de pagamento.
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
