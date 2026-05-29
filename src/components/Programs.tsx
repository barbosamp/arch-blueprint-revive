import { Link } from 'react-router-dom';

const programs = [
  {
    tag: 'Gi',
    title: 'BJJ ADULTOS GI',
    description:
      'A base do Jiu-Jitsu Brasileiro. Treinamento com kimono para iniciantes e avançados — técnica, estratégia e evolução contínua.',
    features: ['A partir de 13 anos', 'Todos os níveis', 'Gi (kimono)'],
    featured: false,
  },
  {
    tag: 'No-Gi',
    title: 'BJJ NO-GI',
    description:
      'Jiu-Jitsu sem kimono — mais dinâmico e explosivo. Ideal para quem busca grappling completo, MMA e competição.',
    features: ['A partir de 13 anos', 'Shorts e rashguard', 'Grappling completo'],
    featured: true,
  },
  {
    tag: 'Feminino',
    title: 'BJJ FEMININO',
    description:
      'Ambiente seguro e acolhedor criado para a mulher. Defesa pessoal, condicionamento e empoderamento no tatame.',
    features: ['Exclusivo feminino', 'Todos os níveis', 'Autodefesa + técnica'],
    featured: false,
  },
  {
    tag: 'Infantil',
    title: 'BJJ KIDS',
    description:
      'O tatame como sala de aula da vida. Disciplina, respeito e confiança desde cedo. Um espaço seguro para crescer.',
    features: ['6 a 12 anos', 'Turmas por faixa etária', 'Desenvolvimento integral'],
    featured: false,
  },
  {
    tag: 'Defesa',
    title: 'DEFESA PESSOAL',
    description:
      'Jiu-Jitsu não é sobre violência — é sobre proteção. Técnicas práticas para situações reais, sem pré-requisito.',
    features: ['Adultos e adolescentes', 'Sem pré-requisito', 'Aplicação real'],
    featured: false,
  },
];

export { programs };

const Programs = () => {
  return (
    <section className="py-24 md:py-40 bg-tatame">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
            Modalidades
          </span>
          <h2
            className="font-display leading-none text-white-belt tracking-wider"
            style={{ fontSize: 'clamp(48px, 11vw, 88px)' }}
          >
            ESCOLHA
            <br />
            SUA JORNADA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {programs.map((program) => (
            <div
              key={program.tag}
              className={`p-8 md:p-10 flex flex-col gap-6 ${
                program.featured ? 'bg-gold/8' : 'bg-blackout'
              }`}
            >
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase">
                {program.tag}
              </span>

              <h3
                className="font-display text-white-belt tracking-wider leading-none"
                style={{ fontSize: 'clamp(26px, 4.5vw, 38px)' }}
              >
                {program.title}
              </h3>

              <div className={`w-8 h-px ${program.featured ? 'bg-gold' : 'bg-white/15'}`} />

              <p className="text-mid-gray text-sm leading-relaxed font-light flex-1">
                {program.description}
              </p>

              <ul className="space-y-2.5 mt-auto">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      className={`w-1 h-1 shrink-0 ${
                        program.featured ? 'bg-gold' : 'bg-mid-gray/50'
                      }`}
                    />
                    <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contato"
            className="inline-block bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors"
          >
            Agendar Aula Experimental
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;
