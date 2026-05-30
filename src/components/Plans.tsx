import { Link } from 'react-router-dom';

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const MATRICULA_URL = '/matricula';

const planGroups = [
  {
    id: 'kids',
    tag: 'Kids · 4–12 anos',
    title: 'PLANO KIDS',
    description: 'Frequência controlada pelo plano contratado. Turmas por faixa etária com acompanhamento pedagógico.',
    variants: [
      { label: '1× por semana', price: 179, period: '/mês' },
      { label: 'Até 3× por semana', price: 229, period: '/mês' },
      { label: '5× por semana', price: 279, period: '/mês' },
    ],
    cta: 'Matricular',
    featured: false,
  },
  {
    id: 'adulto',
    tag: 'Mais Popular',
    title: 'PLANO ADULTO',
    description: 'Acesso livre a todos os treinos — Gi, No-Gi, Feminino e Defesa Pessoal. Associação a professor para acompanhamento oficial.',
    variants: [
      { label: 'Anual (melhor valor)', price: 199, period: '/mês · cobrado anualmente', highlight: true },
      { label: 'Recorrente', price: 229, period: '/mês' },
      { label: 'Mensal', price: 279, period: '/mês' },
    ],
    cta: 'Matricular',
    featured: true,
  },
  {
    id: 'familia',
    tag: 'Família',
    title: 'PLANO FAMÍLIA',
    description: 'Plano anual para 2 ou mais membros. Crianças a partir de 6 anos treinam até 3× por semana.',
    variants: [
      { label: '2 pessoas', price: 389, period: '/mês · anual' },
      { label: '3 pessoas', price: 499, period: '/mês · anual' },
      { label: 'Cada adicional', price: 119, period: '/mês · anual' },
    ],
    cta: 'Matricular',
    featured: false,
  },
];

const Plans = () => (
  <section id="planos" className="py-24 md:py-40 bg-tatame">
    <div className="px-6 max-w-6xl mx-auto">
      <div className="mb-16">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
          04 — Planos
        </span>
        <h2
          className="font-display leading-none text-white-belt tracking-wider"
          style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
        >
          INVISTA
          <br />
          EM VOCÊ
        </h2>
        <p className="font-mono text-[10px] tracking-[0.25em] text-mid-gray/60 uppercase mt-6">
          Taxa de matrícula: {fmt(50)} por aluno · Cancelamento com 30 dias de aviso
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-white/5">
        {planGroups.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col relative ${plan.featured ? 'bg-gold/8' : 'bg-blackout'}`}
          >
            {plan.featured && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
            )}
            <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase">
                  {plan.tag}
                </span>
                {plan.featured && (
                  <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/20 text-gold uppercase px-2 py-0.5">
                    ★ Popular
                  </span>
                )}
              </div>

              <h3
                className="font-display text-white-belt tracking-wider leading-none"
                style={{ fontSize: 'clamp(22px, 3.5vw, 30px)' }}
              >
                {plan.title}
              </h3>

              <div className={`w-8 h-px ${plan.featured ? 'bg-gold' : 'bg-white/15'}`} />

              <p className="text-mid-gray text-sm leading-relaxed font-light">
                {plan.description}
              </p>

              <ul className="space-y-3 flex-1">
                {plan.variants.map((v) => (
                  <li key={v.label} className="flex items-start gap-3">
                    <span className={`w-1 h-1 shrink-0 mt-1.5 ${plan.featured ? 'bg-gold' : 'bg-mid-gray/40'}`} />
                    <div>
                      <span className={`font-display text-lg tracking-wider ${v.highlight ? 'text-gold' : 'text-white-belt'}`}>
                        {fmt(v.price)}
                      </span>
                      <span className="font-mono text-[9px] tracking-wider text-mid-gray/60 ml-1.5 uppercase">
                        {v.period}
                      </span>
                      <p className="font-mono text-[9px] tracking-wider text-mid-gray/50 uppercase mt-0.5">
                        {v.label}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-8 md:px-10 pb-8 md:pb-10">
              <Link
                to={MATRICULA_URL}
                className={`block text-center font-display text-lg tracking-widest uppercase py-4 transition-colors ${
                  plan.featured
                    ? 'bg-gold text-blackout hover:bg-gold/90'
                    : 'border border-gold/40 text-gold hover:bg-gold hover:text-blackout'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase mt-8 text-center">
        * Planos recorrentes: cobrança automática mensal até cancelamento · Planos anuais: parcelamento em até 12×
      </p>
    </div>
  </section>
);

export default Plans;
