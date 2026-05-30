import { Link, useSearchParams } from 'react-router-dom';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/Layout';

const WHATSAPP = '5511977962165';
const WA_MSG = encodeURIComponent(
  'Olá! Realizei minha matrícula na BLACKBOX. e gostaria de agendar meu primeiro treino.'
);

export default function MatriculaConfirmado() {
  const [params] = useSearchParams();
  const isBoleto = params.get('payment') === 'boleto';

  return (
    <Layout>
      <section className="py-24 md:py-40 bg-blackout min-h-screen">
        <div className="px-6 max-w-2xl mx-auto text-center">

          <CheckCircle2 size={48} className="text-gold mx-auto mb-8" strokeWidth={1.5} />

          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
            {isBoleto ? 'Boleto gerado' : 'Pagamento confirmado'}
          </span>

          <h1
            className="font-display leading-none text-white-belt tracking-wider mb-8"
            style={{ fontSize: 'clamp(44px, 11vw, 72px)' }}
          >
            BEM-VINDO
            <br />
            À FAMÍLIA
          </h1>

          {isBoleto ? (
            <p className="text-mid-gray text-sm leading-relaxed font-light mb-10 max-w-md mx-auto">
              Seu boleto foi gerado. Após a confirmação do pagamento, nossa equipe entrará em contato para dar as boas-vindas e organizar seu primeiro treino.
            </p>
          ) : (
            <p className="text-mid-gray text-sm leading-relaxed font-light mb-10 max-w-md mx-auto">
              Seu pagamento foi processado com sucesso. Em breve você será associado a um professor no BaseBJJ. Enquanto isso, fale com nossa equipe para agendar seu primeiro treino.
            </p>
          )}

          <div className="bg-tatame border border-white/5 p-6 mb-10 text-left space-y-4">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase">Próximos passos</p>
            {[
              'Nossa equipe entrará em contato via WhatsApp',
              'Você será avaliado e associado à turma certa pelo professor',
              'Traga traje confortável para o primeiro treino (kimono não é obrigatório no início)',
              'Equipamentos podem ser adquiridos presencialmente na academia',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-[3px] h-4 bg-gold/40 shrink-0 mt-0.5" />
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">{item}</span>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors w-full mb-4"
          >
            <MessageCircle size={18} />
            Falar com a Equipe
          </a>

          <Link
            to="/"
            className="font-mono text-[10px] tracking-[0.25em] text-mid-gray/50 uppercase hover:text-gold transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </section>
    </Layout>
  );
}
