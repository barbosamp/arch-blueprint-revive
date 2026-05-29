const pillars = [
  {
    number: '01',
    title: 'CURRÍCULO ESTRUTURADO',
    description:
      'Da faixa branca à preta, cada aluno segue um caminho claro de evolução técnica. Nada é deixado ao acaso — cada aula faz parte de um sistema pedagógico desenvolvido para maximizar o aprendizado.',
  },
  {
    number: '02',
    title: 'INSTRUTORES QUALIFICADOS',
    description:
      'Nossa equipe é formada por faixas pretas e marrons com experiência em competição e docência. Qualidade técnica combinada com a capacidade de ensinar faz toda a diferença na sua evolução.',
  },
  {
    number: '03',
    title: 'AMBIENTE SEGURO',
    description:
      'O tatame é um espaço de aprendizado, não de ego. Priorizamos a integridade física e emocional de todos os alunos — do iniciante mais nervoso ao competidor mais experiente.',
  },
  {
    number: '04',
    title: 'DOIS CAMINHOS',
    description:
      'Você escolhe o seu objetivo: competição ou saúde. Oferecemos preparação técnica para atletas que querem subir ao pódio, e um caminho recreativo para quem busca condicionamento, disciplina e qualidade de vida.',
  },
];

const Methodology = () => {
  return (
    <section id="metodologia" className="py-24 md:py-40 bg-blackout">
      <div className="px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
            03 — Metodologia
          </span>
          <h2
            className="font-display leading-none text-white-belt tracking-wider"
            style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
          >
            COMO
            <br />
            ENSINAMOS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="bg-tatame p-8 md:p-10 flex flex-col gap-5">
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold/50">{pillar.number}</span>
              <h3 className="font-display text-[clamp(22px,3.5vw,30px)] text-white-belt tracking-widest leading-none">
                {pillar.title}
              </h3>
              <div className="w-8 h-px bg-gold/30" />
              <p className="text-mid-gray text-sm leading-relaxed font-light">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-16 border border-white/5 p-8 md:p-12 text-center">
          <p className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase mb-4">Nossa missão</p>
          <p
            className="font-display text-white-belt leading-tight tracking-wide"
            style={{ fontSize: 'clamp(28px, 5.5vw, 52px)' }}
          >
            TRANSFORMAR VIDAS ATRAVÉS DO JIU-JITSU.
          </p>
          <p className="font-mono text-[10px] tracking-[0.25em] text-mid-gray/60 uppercase mt-4">
            Do iniciante ao campeão — todos têm espaço na Blackbox
          </p>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
