const plans = [
  {
    tag: 'Kids',
    title: 'PLANO KIDS',
    description: 'Para crianças de 6 a 12 anos. Desenvolvimento integral através do Jiu-Jitsu.',
    features: [
      'BJJ Kids — Gi',
      'Turmas por faixa etária',
      'Eventos e graduações',
      'Acompanhamento pedagógico',
    ],
    cta: 'Matricule Seu Filho',
    featured: false,
  },
  {
    tag: 'Mais Popular',
    title: 'PLANO ADULTO',
    description: 'Acesso completo a todas as aulas de adultos — Gi, No-Gi e Defesa Pessoal.',
    features: [
      'BJJ Adultos Gi + No-Gi',
      'Defesa Pessoal',
      'Open Mat aos sábados',
      'Participação em campeonatos',
      'Acesso às 3 unidades',
    ],
    cta: 'Comece Agora',
    featured: true,
  },
  {
    tag: 'Família',
    title: 'PLANO FAMÍLIA',
    description: 'Treine junto com quem você ama. Desconto especial para pares e famílias.',
    features: [
      'Para 2 ou mais membros',
      'Combina adulto + kids',
      'Desconto progressivo',
      'Acesso às 3 unidades',
      'Flexibilidade de horários',
    ],
    cta: 'Falar com a Equipe',
    featured: false,
  },
];

const WHATSAPP = '5500000000000'; // ← Atualize com seu número real

const Plans = () => {
  const handleWhatsApp = (planTitle: string) => {
    const msg = `Olá! Tenho interesse no ${planTitle} da Blackbox. Gostaria de saber mais sobre valores e condições.`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
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
            Fale com nossa equipe para valores e condições especiais
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {plans.map((plan) => (
            <div
              key={plan.tag}
              className={`flex flex-col ${plan.featured ? 'bg-gold/8 relative' : 'bg-blackout'}`}
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
                  style={{ fontSize: 'clamp(24px, 4vw, 34px)' }}
                >
                  {plan.title}
                </h3>

                <div className={`w-8 h-px ${plan.featured ? 'bg-gold' : 'bg-white/15'}`} />

                <p className="text-mid-gray text-sm leading-relaxed font-light">
                  {plan.description}
                </p>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className={`w-1 h-1 shrink-0 ${plan.featured ? 'bg-gold' : 'bg-mid-gray/40'}`} />
                      <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 md:px-10 pb-8 md:pb-10">
                <button
                  onClick={() => handleWhatsApp(plan.title)}
                  className={`w-full font-display text-lg tracking-widest uppercase py-4 transition-colors ${
                    plan.featured
                      ? 'bg-gold text-blackout hover:bg-gold/90'
                      : 'border border-gold/40 text-gold hover:bg-gold hover:text-blackout'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase mt-8 text-center">
          * Consulte disponibilidade e condições especiais na sua unidade mais próxima
        </p>
      </div>
    </section>
  );
};

export default Plans;
