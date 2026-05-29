const values = [
  {
    number: '01',
    title: 'DISCIPLINA',
    description:
      'Consistência e presença em cada treino. Não é sobre perfeição — é sobre aparecer, todos os dias.',
  },
  {
    number: '02',
    title: 'PROCESSO',
    description:
      'Respeito pelas etapas, sem atalhos. Cada faixa é conquistada, nunca dada. O caminho é o destino.',
  },
  {
    number: '03',
    title: 'TRANSFORMAÇÃO',
    description:
      'Cada faixa é uma versão nova de si mesmo. Você entra de um jeito. Sai diferente — mais forte, mais consciente.',
  },
  {
    number: '04',
    title: 'COMUNIDADE',
    description:
      'O tatame nos iguala. Dentro da Blackbox, não existe hierarquia fora do kimono. Somos todos faixa branca em alguma coisa.',
  },
  {
    number: '05',
    title: 'PROTEÇÃO',
    description:
      'Jiu-Jitsu não é sobre violência — é sobre segurança. Proteger a si mesmo e quem você ama é um direito, não um privilégio.',
  },
];

const Values = () => {
  return (
    <section id="valores" className="py-24 md:py-40 bg-tatame">
      <div className="px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
            04 — Pilares
          </span>
          <h2
            className="font-display leading-none text-white-belt tracking-wider"
            style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
          >
            NOSSA
            <br />
            ESSÊNCIA
          </h2>
        </div>

        {/* Values list */}
        <div className="divide-y divide-white/5">
          {values.map((value) => (
            <div
              key={value.number}
              className="py-8 md:py-10 grid md:grid-cols-[60px_220px_1fr] gap-4 md:gap-10 items-start group cursor-default"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-gold/40 pt-1">
                {value.number}
              </span>
              <h3 className="font-display text-[clamp(28px,5vw,36px)] text-white-belt tracking-widest group-hover:text-gold transition-colors duration-300 leading-none">
                {value.title}
              </h3>
              <p className="text-mid-gray text-sm leading-relaxed font-light">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Manifesto footer */}
        <div className="mt-20 pt-12 border-t border-white/8 text-center overflow-hidden">
          <p
            className="font-display text-white-belt/10 tracking-[0.25em] leading-none select-none"
            style={{ fontSize: 'clamp(20px, 5vw, 48px)' }}
          >
            DISCIPLINA · PROCESSO · TRANSFORMAÇÃO
          </p>
        </div>
      </div>
    </section>
  );
};

export default Values;
