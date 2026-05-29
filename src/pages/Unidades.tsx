import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Units from '@/components/Units';

export default function UnidadesPage() {
  return (
    <Layout>
      <div className="pt-28 pb-0 px-6 bg-blackout max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase">
          Nossas localidades
        </span>
      </div>

      <Units />

      {/* Unit details */}
      <section className="py-20 md:py-32 bg-blackout">
        <div className="px-6 max-w-6xl mx-auto space-y-16">
          {[
            {
              name: 'PORTAIS — MATRIZ',
              city: 'Cajamar, SP',
              tag: 'Unidade 1',
              badge: 'Matriz',
              desc: 'Nossa unidade principal, com a maior grade de horários e toda a estrutura Blackbox. Localizada no bairro Portais, em Cajamar, é o coração da academia.',
              details: [
                'Estrutura completa com vestiários',
                'Tatame profissional certificado',
                'Todas as modalidades disponíveis',
                'Estacionamento próprio',
              ],
              placeholder: 'Endereço completo em breve',
            },
            {
              name: 'SANTANA DE PARNAÍBA',
              city: 'Santana de Parnaíba, SP',
              tag: 'Unidade 2',
              badge: null,
              desc: 'Estrategicamente localizada para atender o Alphaville e região, a unidade de Santana de Parnaíba oferece a mesma qualidade Blackbox com horários adaptados à rotina da região.',
              details: [
                'Grade de horários matutino e noturno',
                'Equipe técnica dedicada',
                'Turmas infantis e adulto',
                'Acesso facilitado pela região Alphaville',
              ],
              placeholder: 'Endereço completo em breve',
            },
            {
              name: 'CIDADE SÃO PEDRO',
              city: 'Cajamar, SP',
              tag: 'Unidade 3',
              badge: null,
              desc: 'Levando o Jiu-Jitsu para a comunidade de Cidade São Pedro, em Cajamar. Uma unidade acolhedora e acessível, com foco em turmas noturnas e de fim de semana.',
              details: [
                'Horários noturnos e finais de semana',
                'Localização central no bairro',
                'Turmas reduzidas e atenção individualizada',
                'Open Mat aos sábados',
              ],
              placeholder: 'Endereço completo em breve',
            },
          ].map((unit) => (
            <div key={unit.name} className="grid md:grid-cols-2 gap-10 md:gap-16 items-start border-t border-white/5 pt-16 first:pt-0 first:border-0">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase">{unit.tag}</span>
                  {unit.badge && (
                    <span className="font-mono text-[7px] tracking-[0.3em] bg-gold/15 text-gold uppercase px-2 py-0.5">
                      {unit.badge}
                    </span>
                  )}
                </div>
                <h3
                  className="font-display text-white-belt tracking-wider leading-none mb-2"
                  style={{ fontSize: 'clamp(26px, 5vw, 42px)' }}
                >
                  {unit.name}
                </h3>
                <p className="font-mono text-[9px] tracking-[0.25em] text-gold/50 uppercase mb-6">{unit.city}</p>
                <p className="text-mid-gray text-sm leading-relaxed font-light mb-8">{unit.desc}</p>
                <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase border border-white/5 px-4 py-3 inline-block">
                  📍 {unit.placeholder}
                </p>
              </div>
              <div className="bg-tatame p-8">
                <p className="font-mono text-[9px] tracking-[0.3em] text-gold/60 uppercase mb-5">Estrutura</p>
                <ul className="space-y-3 mb-8">
                  {unit.details.map((d) => (
                    <li key={d} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-gold shrink-0" />
                      <span className="font-mono text-[11px] tracking-wider text-white-belt uppercase">{d}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contato"
                  className="block text-center font-display text-base tracking-widest uppercase border border-gold/40 text-gold px-6 py-3 hover:bg-gold hover:text-blackout transition-colors"
                >
                  Falar com Esta Unidade
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-12 bg-tatame border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto text-center">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold/30 uppercase block mb-3">
            Em breve
          </span>
          <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/25 uppercase">
            Mapa interativo · Fotos das unidades · Equipe por unidade
          </p>
        </div>
      </section>
    </Layout>
  );
}
