const WHATSAPP = '5500000000000'; // ← Atualize com seu número real

const units = [
  {
    tag: 'Matriz',
    name: 'PORTAIS',
    city: 'Cajamar — SP',
    description: 'Nossa unidade principal. Infraestrutura completa, todos os programas disponíveis e a maior grade de horários.',
    programs: ['BJJ Adultos Gi', 'BJJ No-Gi', 'BJJ Kids', 'BJJ Feminino', 'Defesa Pessoal', 'Open Mat'],
    badge: 'MATRIZ',
    featured: true,
  },
  {
    tag: 'Unidade 2',
    name: 'SANTANA DE PARNAÍBA',
    city: 'Santana de Parnaíba — SP',
    description: 'Localizada estrategicamente para atender o Alphaville e região. Estrutura completa e equipe dedicada.',
    programs: ['BJJ Adultos Gi', 'BJJ No-Gi', 'BJJ Kids', 'BJJ Feminino', 'Open Mat'],
    badge: null,
    featured: false,
  },
  {
    tag: 'Unidade 3',
    name: 'CIDADE SÃO PEDRO',
    city: 'Cajamar — SP',
    description: 'Levando o Jiu-Jitsu ao coração da comunidade. Horários noturnos e de fim de semana para todos os perfis.',
    programs: ['BJJ Adultos Gi', 'BJJ No-Gi', 'BJJ Kids', 'BJJ Feminino', 'Open Mat'],
    badge: null,
    featured: false,
  },
];

const Units = () => {
  const handleWhatsApp = (unitName: string) => {
    const msg = `Olá! Tenho interesse em treinar na unidade ${unitName} da Blackbox. Gostaria de mais informações.`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="unidades" className="py-24 md:py-40 bg-tatame">
      <div className="px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
            06 — Unidades
          </span>
          <h2
            className="font-display leading-none text-white-belt tracking-wider"
            style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
          >
            PERTO
            <br />
            DE VOCÊ
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {units.map((unit) => (
            <div
              key={unit.name}
              className={`flex flex-col relative ${unit.featured ? 'bg-gold/8' : 'bg-blackout'}`}
            >
              {unit.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
              )}
              <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase">
                    {unit.tag}
                  </span>
                  {unit.badge && (
                    <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/20 text-gold uppercase px-2 py-0.5 shrink-0">
                      {unit.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    className="font-display text-white-belt tracking-wider leading-none"
                    style={{ fontSize: 'clamp(22px, 3.5vw, 30px)' }}
                  >
                    {unit.name}
                  </h3>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-gold/50 uppercase mt-2">
                    {unit.city}
                  </p>
                </div>

                <div className={`w-8 h-px ${unit.featured ? 'bg-gold' : 'bg-white/15'}`} />

                <p className="text-mid-gray text-sm leading-relaxed font-light flex-1">
                  {unit.description}
                </p>

                <ul className="space-y-2.5">
                  {unit.programs.map((prog) => (
                    <li key={prog} className="flex items-center gap-3">
                      <span className={`w-1 h-1 shrink-0 ${unit.featured ? 'bg-gold' : 'bg-mid-gray/40'}`} />
                      <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">
                        {prog}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 md:px-10 pb-8 md:pb-10">
                <button
                  onClick={() => handleWhatsApp(unit.name)}
                  className={`w-full font-display text-base tracking-widest uppercase py-4 transition-colors ${
                    unit.featured
                      ? 'bg-gold text-blackout hover:bg-gold/90'
                      : 'border border-gold/40 text-gold hover:bg-gold hover:text-blackout'
                  }`}
                >
                  Falar com Esta Unidade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Units;
