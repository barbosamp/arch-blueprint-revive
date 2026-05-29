import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Methodology from '@/components/Methodology';

export default function MetodologiaPage() {
  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Nossa abordagem pedagógica
        </span>
      </div>

      <Methodology />

      {/* Belt progression methodology */}
      <section className="py-20 md:py-32 bg-tatame">
        <div className="px-6 max-w-6xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-10">
            Progressão de graduação
          </span>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2
                className="font-display leading-none text-white-belt tracking-wider mb-8"
                style={{ fontSize: 'clamp(36px, 7vw, 60px)' }}
              >
                CADA FAIXA<br />É MERECIDA
              </h2>
              <p className="text-mid-gray text-sm leading-relaxed font-light mb-6">
                Na Blackbox, graduações não são dadas — são conquistadas. Nosso sistema de graduação
                avalia técnica, frequência, comportamento e evolução pessoal. Não existe atalho no tatame.
              </p>
              <p className="text-mid-gray text-sm leading-relaxed font-light">
                As graduações acontecem de forma transparente, com critérios claros para cada transição
                de faixa. O aluno sabe exatamente onde está e o que precisa desenvolver para avançar.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { belt: '#F5F5F0', label: 'FAIXA BRANCA', desc: 'Fundamentos, postura, defesa, movimentos básicos', border: false },
                { belt: '#2563EB', label: 'FAIXA AZUL', desc: 'Consolidação técnica, primeiros ataques, guarda', border: false },
                { belt: '#7C3AED', label: 'FAIXA ROXA', desc: 'Domínio de posições, jogo próprio, submissões', border: false },
                { belt: '#92400E', label: 'FAIXA MARROM', desc: 'Refinamento, ensino, transições fluidas', border: false },
                { belt: '#0A0A0A', label: 'FAIXA PRETA', desc: 'Maestria técnica, filosofia, legado no esporte', border: true },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-5 p-4 bg-blackout">
                  <div
                    className="w-12 h-3 shrink-0"
                    style={{ backgroundColor: b.belt, border: b.border ? '1px solid #E8B84B' : 'none' }}
                  />
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-white-belt uppercase">{b.label}</p>
                    <p className="font-mono text-[9px] text-mid-gray/60 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for future content */}
      <section className="py-16 bg-blackout border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto text-center">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold/30 uppercase block mb-4">
            Em breve
          </span>
          <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/25 uppercase">
            Depoimentos de alunos · Resultados em competições · Cases de transformação
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-[clamp(28px,5vw,44px)] text-white-belt tracking-widest leading-none">
            VENHA VIVENCIAR O MÉTODO.
          </p>
          <Link
            to="/contato"
            className="bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors whitespace-nowrap"
          >
            Aula Grátis
          </Link>
        </div>
      </section>
    </Layout>
  );
}
