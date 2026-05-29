import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Programs from '@/components/Programs';

const details = [
  {
    tag: 'Gi',
    title: 'BJJ ADULTOS GI',
    longDesc: [
      'O Jiu-Jitsu Brasileiro com kimono (Gi) é a modalidade mais técnica e tradicional. O kimono amplia as possibilidades de pegadas e finalizações, exigindo mais técnica e menos força.',
      'Indicada para iniciantes e avançados, as aulas de BJJ Gi seguem um currículo progressivo que garante evolução consistente a cada treino.',
    ],
    suitable: ['Iniciantes sem experiência', 'Praticantes intermediários', 'Adultos e adolescentes a partir de 13 anos'],
  },
  {
    tag: 'No-Gi',
    title: 'BJJ NO-GI',
    longDesc: [
      'O grappling sem kimono é mais rápido, explosivo e dinâmico. Sem as facilidades do kimono para controlar o adversário, o No-Gi exige mais atleticismo e domínio de fundamentos de wrestling.',
      'Perfeito para quem pratica MMA, quer competir em nogi ou simplesmente busca um treino mais intenso.',
    ],
    suitable: ['Praticantes com ou sem base em BJJ Gi', 'Atletas de MMA', 'Competidores nogi'],
  },
  {
    tag: 'Feminino',
    title: 'BJJ FEMININO',
    longDesc: [
      'Uma aula criada exclusivamente para mulheres — ambiente seguro, acolhedor e sem a pressão do ambiente misto. As aulas focam tanto na técnica do Jiu-Jitsu quanto na aplicação prática para defesa pessoal.',
      'Independente do nível, toda mulher é bem-vinda. A Blackbox acredita que toda mulher tem o direito de se defender.',
    ],
    suitable: ['Mulheres de todas as idades', 'Sem nenhum pré-requisito', 'Foco em autodefesa e técnica'],
  },
  {
    tag: 'Kids',
    title: 'BJJ KIDS',
    longDesc: [
      'O programa infantil da Blackbox é desenvolvido para crianças de 6 a 12 anos. Além das técnicas do Jiu-Jitsu, trabalhamos valores como respeito, disciplina, autocontrole e trabalho em equipe.',
      'As turmas são divididas por faixa etária para garantir um ambiente adequado ao desenvolvimento de cada fase.',
    ],
    suitable: ['6 a 12 anos', 'Qualquer nível', 'Turmas por faixa etária (6–8 e 9–12 anos)'],
  },
  {
    tag: 'Defesa',
    title: 'DEFESA PESSOAL',
    longDesc: [
      'Focado em situações reais do dia a dia, o programa de Defesa Pessoal ensina técnicas efetivas para se proteger em cenários de perigo. Sem a rigidez do esporte, com foco em aplicação prática.',
      'Não é necessário nenhum conhecimento prévio. O programa é acessível para qualquer pessoa que queira aprender a se proteger.',
    ],
    suitable: ['Adultos e adolescentes', 'Nenhum pré-requisito', 'Homens e mulheres'],
  },
];

export default function Modalidades() {
  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-7xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Programas de treinamento
        </span>
      </div>

      <Programs />

      {/* Detailed descriptions */}
      <section className="py-20 md:py-32 bg-blackout">
        <div className="px-6 max-w-6xl mx-auto space-y-20">
          {details.map((d, i) => (
            <div
              key={d.tag}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-start ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase block mb-4">{d.tag}</span>
                <h3
                  className="font-display text-white-belt tracking-widest leading-none mb-6"
                  style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}
                >
                  {d.title}
                </h3>
                {d.longDesc.map((p, j) => (
                  <p key={j} className="text-mid-gray text-sm leading-relaxed font-light mb-4">{p}</p>
                ))}
              </div>
              <div className={`bg-tatame p-8 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <p className="font-mono text-[9px] tracking-[0.3em] text-gold/60 uppercase mb-5">Para quem é</p>
                <ul className="space-y-3">
                  {d.suitable.map((s) => (
                    <li key={s} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-gold shrink-0" />
                      <span className="font-mono text-[11px] tracking-wider text-white-belt uppercase">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link
                    to="/contato"
                    className="inline-block font-display text-base tracking-widest uppercase border border-gold/40 text-gold px-6 py-3 hover:bg-gold hover:text-blackout transition-colors"
                  >
                    Quero Experimentar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
