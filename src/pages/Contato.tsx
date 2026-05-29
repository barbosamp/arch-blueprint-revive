import Layout from '@/components/Layout';
import Contact from '@/components/Contact';

export default function ContatoPage() {
  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Fale com a gente
        </span>
      </div>

      <Contact />

      {/* Social / placeholder */}
      <section className="py-12 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/25 uppercase">
            Em breve · Chat ao vivo · Formulário de contato por unidade
          </p>
        </div>
      </section>
    </Layout>
  );
}
