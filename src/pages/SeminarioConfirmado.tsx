import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Calendar, Clock, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';

const WA_GROUP = import.meta.env.VITE_SEMINAR_WA_GROUP as string | undefined;

export default function SeminarioConfirmado() {
  return (
    <Layout>
      <section className="py-24 md:py-40 bg-blackout min-h-screen">
        <div className="px-6 max-w-2xl mx-auto text-center">

          <CheckCircle2 size={48} className="text-gold mx-auto mb-8" strokeWidth={1.5} />

          <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
            Vaga confirmada
          </span>

          <h1
            className="font-display leading-none text-white-belt tracking-wider mb-6"
            style={{ fontSize: 'clamp(44px, 11vw, 72px)' }}
          >
            VAGA
            <br />
            GARANTIDA!
          </h1>

          <p className="text-mid-gray text-sm leading-relaxed font-light mb-10 max-w-md mx-auto">
            Seu pagamento foi confirmado. Bem-vindo ao seminário com Tainan Dalpra. Acesse o grupo do WhatsApp para receber todas as informações e atualizações do evento.
          </p>

          {/* Resumo do evento */}
          <div className="grid grid-cols-2 gap-px bg-white/5 mb-10 text-left">
            {[
              { icon: Calendar, label: 'Data', value: '14 de Junho de 2025' },
              { icon: Clock, label: 'Horário', value: '13h00 (chegue às 12h45)' },
              { icon: MapPin, label: 'Local', value: 'Portais — Cajamar, SP' },
              { icon: Users, label: 'Atleta', value: 'Tainan Dalpra' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-tatame px-5 py-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon size={12} className="text-gold/50" strokeWidth={1.5} />
                  <span className="font-mono text-[9px] tracking-[0.3em] text-gold/50 uppercase">{label}</span>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-white-belt uppercase">{value}</span>
              </div>
            ))}
          </div>

          {/* Próximos passos */}
          <div className="bg-tatame border border-white/5 p-6 mb-8 text-left space-y-4">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase">Informações importantes</p>
            {[
              'Traga kimono (Gi) e/ou shorts + rash guard (No-Gi)',
              'Chegue pelo menos 15 minutos antes do início',
              'Água e lanche leve recomendados',
              'Local: BLACKBOX. Jiu-Jitsu — Portais, Cajamar, SP',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-[3px] h-4 bg-gold/40 shrink-0 mt-0.5" />
                <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">{item}</span>
              </div>
            ))}
          </div>

          {/* WhatsApp group CTA */}
          {WA_GROUP ? (
            <a
              href={WA_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-5 hover:bg-gold/90 transition-colors w-full mb-4"
            >
              Entrar no Grupo do WhatsApp
            </a>
          ) : (
            <div className="border border-gold/20 px-6 py-5 mb-4">
              <p className="font-mono text-[10px] tracking-[0.25em] text-gold/60 uppercase text-center">
                Link do grupo será enviado por WhatsApp em breve
              </p>
            </div>
          )}

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
