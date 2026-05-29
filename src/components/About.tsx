const belts = [
  { color: '#F5F5F0', label: 'BRANCA', border: false },
  { color: '#2563EB', label: 'AZUL', border: false },
  { color: '#7C3AED', label: 'ROXA', border: false },
  { color: '#92400E', label: 'MARROM', border: false },
  { color: '#0A0A0A', label: 'PRETA', border: true },
];

const About = () => {
  return (
    <section id="sobre" className="py-24 md:py-40 bg-blackout">
      <div className="px-6 max-w-5xl mx-auto">
        {/* Section tag */}
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-12">
          01 — Quem Somos
        </span>

        {/* Heading */}
        <h2
          className="font-display leading-none text-white-belt tracking-wider mb-10"
          style={{ fontSize: 'clamp(52px, 13vw, 104px)' }}
        >
          A CAIXA
          <br />
          PRETA
        </h2>

        <div className="w-full h-px bg-white/8 mb-14" />

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
          <div className="space-y-6 text-mid-gray leading-relaxed text-sm font-light">
            <p>
              A Blackbox não é apenas uma academia de Jiu-Jitsu. É um ambiente de
              transformação. O nome carrega uma metáfora poderosa: a caixa preta como
              espaço onde algo entra e sai diferente — mais evoluído, mais consciente,
              mais forte.
            </p>
            <p>
              A faixa branca representa o ponto de partida universal: todos chegamos
              sem saber. A partir daí, cada aula, cada treino, cada graduação é uma
              versão nova de si mesmo.
            </p>
            <p>
              O tatame nos iguala. Não importa de onde você veio — o que importa é
              onde você quer chegar.
            </p>
          </div>

          <div className="space-y-10">
            {/* Quote */}
            <blockquote className="border-l-2 border-gold pl-6">
              <p className="font-display text-[clamp(24px,5vw,36px)] text-white-belt leading-tight tracking-wide mb-3">
                "PRECISO ENTRAR NA MINHA CAIXA."
              </p>
              <cite className="font-mono text-[9px] tracking-[0.2em] text-mid-gray uppercase not-italic">
                O lugar onde as melhores versões de você nascem
              </cite>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/8">
              {[
                { value: '+5', label: 'Anos' },
                { value: '200+', label: 'Alunos' },
                { value: '3', label: 'Modalidades' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-4xl text-gold leading-none">{stat.value}</span>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray uppercase mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Belt progression */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] text-mid-gray/50 uppercase mb-6">
            A progressão das faixas
          </p>
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2">
            {belts.map((belt, i) => (
              <div key={belt.label} className="flex items-center gap-2 sm:gap-4 shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 sm:w-16 h-3 sm:h-4"
                    style={{
                      backgroundColor: belt.color,
                      border: belt.border ? '1px solid #E8B84B' : 'none',
                    }}
                  />
                  <span className="font-mono text-[7px] sm:text-[8px] tracking-widest text-mid-gray/60 uppercase">
                    {belt.label}
                  </span>
                </div>
                {i < belts.length - 1 && (
                  <div className="w-4 sm:w-8 h-px bg-white/10 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
