import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Plans from '@/components/Plans';

const faqs = [
  {
    q: 'Posso testar antes de me matricular?',
    a: 'Sim! A primeira aula é experimental e completamente gratuita. Venha conhecer o tatame, a equipe e o ambiente sem nenhum compromisso.',
  },
  {
    q: 'Como funcionam os pagamentos?',
    a: 'Os pagamentos são mensais. Aceitamos PIX, cartão de crédito e débito. Fale com a secretaria da sua unidade para condições especiais.',
  },
  {
    q: 'Posso treinar em mais de uma unidade?',
    a: 'Sim. Os planos dão acesso a todas as nossas 3 unidades (Portais, Santana de Parnaíba e Cidade São Pedro), permitindo total flexibilidade de horários.',
  },
  {
    q: 'Existe desconto para famílias?',
    a: 'Sim! O Plano Família oferece desconto progressivo para pares e famílias. Consulte nossa equipe para montar o plano ideal para vocês.',
  },
  {
    q: 'Preciso comprar uniforme?',
    a: 'Para aulas de BJJ Gi, o kimono é necessário. Para No-Gi, Feminino e Defesa Pessoal, shorts e camiseta servem. Para a aula experimental, não precisa trazer nada.',
  },
];

export default function PlanosPage() {
  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Investimento na sua evolução
        </span>
      </div>

      <Plans />

      {/* FAQ */}
      <section className="py-20 md:py-32 bg-blackout">
        <div className="px-6 max-w-4xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-10">
            Dúvidas frequentes
          </span>
          <div className="divide-y divide-white/5">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <h3 className="font-mono text-[11px] tracking-[0.15em] text-white-belt uppercase mb-3">
                  {faq.q}
                </h3>
                <p className="text-mid-gray text-sm leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder */}
      <section className="py-10 bg-blackout border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/25 uppercase">
            Em breve · Tabela comparativa de planos · Condições especiais · Plano anual
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-[clamp(28px,5vw,44px)] text-white-belt tracking-widest leading-none">
            COMECE COM UMA AULA GRÁTIS.
          </p>
          <Link
            to="/agendar"
            className="bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors whitespace-nowrap"
          >
            Agendar Agora
          </Link>
        </div>
      </section>
    </Layout>
  );
}
