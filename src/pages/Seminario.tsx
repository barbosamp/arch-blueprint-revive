import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MapPin, Calendar, Clock, Users, ShieldCheck, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabase';

const ASAAS_URL = import.meta.env.VITE_SEMINAR_TAINAN_ASAAS_URL as string | undefined;

const inputCls =
  'w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors';
const labelCls = 'font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2';

export default function Seminario() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [academia, setAcademia] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = nome.trim() && telefone.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (!ASAAS_URL) {
      setError('Link de pagamento não configurado. Entre em contato com a academia.');
      return;
    }

    setLoading(true);
    setError(null);

    // best-effort insert — não bloqueia o pagamento se falhar
    try {
      await (supabase as any)
        .from('seminar_registrations')
        .insert({ nome: nome.trim(), telefone: telefone.trim(), academia: academia.trim() || null });
    } catch {
      // silently continue — pagamento é o que vale
    }

    window.location.href = ASAAS_URL;
  };

  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-blackout overflow-hidden px-6">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 59px,#F5F5F0 59px,#F5F5F0 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,#F5F5F0 59px,#F5F5F0 60px)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="font-mono text-[9px] tracking-[0.4em] text-gold/60 uppercase">
              Evento Especial
            </span>
            <span className="w-1 h-1 bg-gold/40 rounded-full" />
            <span className="font-mono text-[9px] tracking-[0.4em] text-gold/60 uppercase">
              14 Jun 2025
            </span>
          </div>

          <p className="font-mono text-[11px] tracking-[0.35em] text-gold uppercase mb-4">
            BLACKBOX. JIU-JITSU · CAJAMAR
          </p>

          <h1
            className="font-display leading-none text-white-belt tracking-wider mb-4"
            style={{ fontSize: 'clamp(52px, 14vw, 140px)' }}
          >
            TAINAN
            <br />
            <span className="text-gold">DALPRA</span>
          </h1>

          <p className="font-mono text-[11px] sm:text-[13px] tracking-[0.3em] text-mid-gray uppercase mb-12">
            Seminário · 14 de Junho · 13h00 · Portais, Cajamar
          </p>

          <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-5 py-2.5 mb-14">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
              Vagas limitadas
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inscricao"
              className="bg-gold text-blackout font-display text-xl tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-colors w-full sm:w-auto text-center"
            >
              Garantir Minha Vaga
            </a>
            <a
              href="#sobre"
              className="font-mono text-[10px] tracking-[0.25em] text-mid-gray uppercase hover:text-gold transition-colors border border-white/10 px-8 py-4 w-full sm:w-auto text-center"
            >
              Saiba Mais
            </a>
          </div>
        </div>

        <a
          href="#sobre"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mid-gray/30 animate-bounce"
          aria-label="Rolar para baixo"
        >
          <ChevronDown size={20} />
        </a>
      </section>

      {/* ── SOBRE O TAINAN ───────────────────────────────────────── */}
      <section id="sobre" className="py-20 md:py-32 bg-tatame">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Texto */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
                Sobre o Convidado
              </span>
              <h2
                className="font-display leading-none text-white-belt tracking-wider mb-6"
                style={{ fontSize: 'clamp(36px, 7vw, 64px)' }}
              >
                TAINAN
                <br />
                DALPRA
              </h2>

              <p className="text-mid-gray text-sm leading-relaxed font-light mb-6">
                Considerado um dos melhores competidores do mundo, Tainan Dalpra é faixa preta pela Atos Jiu-Jitsu sob a orientação de André Galvão. Atleta de nível mundial com títulos expressivos no Gi e No-Gi, reconhecido pela criatividade e profundidade técnica do seu jogo.
              </p>
              <p className="text-mid-gray text-sm leading-relaxed font-light mb-10">
                Seu Jiu-Jitsu é marcado pelo domínio do berimbolo, jogo de pernas avançado e leg locks — um estilo ofensivo e altamente técnico que representa a evolução do esporte no cenário mundial.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Campeão Mundial IBJJF',
                  'Campeão ADCC',
                  'No-Gi World Champion',
                  'Atos Jiu-Jitsu',
                ].map((title) => (
                  <div key={title} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 bg-gold shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider text-white-belt uppercase">
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Foto placeholder */}
            <div className="relative">
              <div className="aspect-[3/4] bg-blackout border border-white/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border border-gold/20 flex items-center justify-center">
                  <span className="font-display text-4xl text-gold/20">TD</span>
                </div>
                <p className="font-mono text-[8px] tracking-[0.3em] text-mid-gray/30 uppercase text-center px-8">
                  {/* substituir por foto do Tainan Dalpra */}
                  Foto do atleta
                </p>
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-gold/10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border border-gold/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── DETALHES DO SEMINÁRIO ────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-blackout">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-6">
              Informações
            </span>
            <h2
              className="font-display leading-none text-white-belt tracking-wider"
              style={{ fontSize: 'clamp(40px, 9vw, 72px)' }}
            >
              O SEMINÁRIO
            </h2>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-16">
            {[
              { icon: Calendar, label: 'Data', value: '14 de Junho', sub: '2025' },
              { icon: Clock, label: 'Horário', value: '13h00', sub: 'chegue 15 min antes' },
              { icon: MapPin, label: 'Local', value: 'Portais', sub: 'Cajamar, SP — Matriz' },
              { icon: Users, label: 'Investimento', value: 'R$250', sub: 'por participante' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="bg-blackout px-6 py-8 flex flex-col gap-2">
                <Icon size={16} className="text-gold/60" strokeWidth={1.5} />
                <span className="font-mono text-[9px] tracking-[0.3em] text-gold/60 uppercase">
                  {label}
                </span>
                <span className="font-display text-2xl text-white-belt tracking-wider">{value}</span>
                <span className="font-mono text-[9px] tracking-wider text-mid-gray/50 uppercase">{sub}</span>
              </div>
            ))}
          </div>

          {/* O que esperar */}
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] text-gold/60 uppercase mb-5">
                O que esperar
              </p>
              <ul className="space-y-4">
                {[
                  'Técnicas exclusivas do jogo de Tainan Dalpra',
                  'Berimbolo e variações de inversão',
                  'Leg locks e sistemas de finalização',
                  'Perguntas e respostas ao final',
                  'Treino supervisionado com o atleta',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-[3px] h-4 bg-gold/40 shrink-0 mt-0.5" />
                    <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] text-gold/60 uppercase mb-5">
                Para quem é
              </p>
              <ul className="space-y-4">
                {[
                  'Todos os níveis — iniciante ao avançado',
                  'Gi e No-Gi são bem-vindos',
                  'Alunos Blackbox e de outras academias',
                  'Atletas e praticantes recreativos',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-[3px] h-4 bg-gold/40 shrink-0 mt-0.5" />
                    <span className="font-mono text-[10px] tracking-wider text-mid-gray uppercase">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO DE INSCRIÇÃO ──────────────────────────────── */}
      <section id="inscricao" className="py-20 md:py-32 bg-tatame">
        <div className="px-6 max-w-xl mx-auto">
          <div className="mb-10">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-4">
              Inscrição
            </span>
            <h2
              className="font-display leading-none text-white-belt tracking-wider mb-3"
              style={{ fontSize: 'clamp(36px, 8vw, 60px)' }}
            >
              GARANTA
              <br />
              SUA VAGA
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/50 uppercase">
              Vagas limitadas · 14 Jun · R$250,00
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelCls}>Nome Completo *</label>
              <input
                className={inputCls}
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelCls}>WhatsApp *</label>
              <input
                className={inputCls}
                type="tel"
                placeholder="(11) 00000-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelCls}>Academia <span className="text-mid-gray/40">(opcional)</span></label>
              <input
                className={inputCls}
                type="text"
                placeholder="Nome da sua academia"
                value={academia}
                onChange={(e) => setAcademia(e.target.value)}
              />
            </div>

            {/* LGPD */}
            <div className="flex items-start gap-3 border border-white/5 px-4 py-3 bg-blackout/40">
              <ShieldCheck size={13} className="text-gold/40 shrink-0 mt-0.5" />
              <p className="font-mono text-[8px] tracking-[0.15em] text-mid-gray/40 leading-relaxed">
                Seus dados são usados exclusivamente para comunicação sobre este evento, em conformidade com a LGPD.
              </p>
            </div>

            {error && (
              <p className="font-mono text-[10px] tracking-wider text-red-400 uppercase border border-red-400/20 px-4 py-3 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full flex items-center justify-center gap-3 bg-gold text-blackout font-display text-xl tracking-widest uppercase py-5 hover:bg-gold/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Aguarde…
                </>
              ) : (
                'Garantir Minha Vaga — R$250'
              )}
            </button>

            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 uppercase text-center">
              Você será redirecionado para o pagamento seguro via Asaas
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
