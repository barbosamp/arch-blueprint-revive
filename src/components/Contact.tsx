import { useState } from 'react';
import { MessageCircle, Instagram } from 'lucide-react';

const UNIT_WHATSAPP: Record<string, string> = {
  'Portais — Cajamar (Matriz)': '5511977962165',
  'Parque Santana': '5511960680648',
  'Cidade São Pedro': '5511975859485',
};

const unitOptions = Object.keys(UNIT_WHATSAPP);

const modalityOptions = [
  'BJJ Adultos Gi',
  'BJJ No-Gi',
  'BJJ Feminino',
  'BJJ Kids',
  'Defesa Pessoal',
  'Não sei ainda',
];

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('');
  const [modality, setModality] = useState('');

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      `Olá! Me chamo *${name}*.`,
      `Quero agendar uma *aula experimental* na Blackbox.`,
      unit && `Unidade preferida: *${unit}*`,
      modality && `Modalidade: *${modality}*`,
      `Meu contato: ${phone}`,
    ].filter(Boolean);
    const number = UNIT_WHATSAPP[unit] ?? UNIT_WHATSAPP['Portais — Cajamar (Matriz)'];
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(parts.join('\n'))}`, '_blank');
  };

  return (
    <section id="contato" className="py-24 md:py-40 bg-blackout">
      <div className="px-6 max-w-6xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-12">
          07 — Entre na Caixa
        </span>

        <div className="grid md:grid-cols-2 gap-14 md:gap-24">
          {/* Left */}
          <div>
            <h2
              className="font-display leading-none text-white-belt tracking-wider mb-10"
              style={{ fontSize: 'clamp(52px, 12vw, 100px)' }}
            >
              AGENDE
              <br />
              SUA AULA
            </h2>

            <div className="w-full h-px bg-white/8 mb-8" />

            <p className="text-mid-gray text-sm leading-relaxed font-light mb-10">
              A primeira aula é experimental e gratuita. Venha conhecer o tatame
              sem compromisso, sem equipamento. Só você e o processo.
            </p>

            <div className="space-y-4 mb-10">
              <a
                href="https://www.instagram.com/blackboxbjj/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-mid-gray hover:text-gold transition-colors group"
              >
                <Instagram size={14} className="shrink-0" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase group-hover:text-gold transition-colors">
                  @blackboxbjj
                </span>
              </a>
            </div>

            {/* Units quick list */}
            <div className="space-y-4">
              {[
                { label: 'PORTAIS · MATRIZ', sub: 'Cajamar, SP' },
                { label: 'PARQUE SANTANA', sub: 'Santana de Parnaíba, SP' },
                { label: 'CIDADE SÃO PEDRO', sub: 'Santana de Parnaíba, SP' },
              ].map((loc) => (
                <div key={loc.label} className="flex items-center gap-3">
                  <div className="w-[3px] h-4 bg-gold/40 shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-white-belt uppercase">{loc.label}</p>
                    <p className="font-mono text-[9px] text-mid-gray/50 uppercase">{loc.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-l-2 border-gold/30 pl-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/50 italic">
                "O Jiu-Jitsu não é sobre violência. É sobre proteção e transformação."
              </p>
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleWhatsApp} className="flex flex-col gap-5">
            <div>
              <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
                className="w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 00000-0000"
                required
                className="w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">
                Unidade
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-tatame border border-white/10 text-mid-gray px-4 py-3.5 font-mono text-[11px] tracking-wider focus:outline-none focus:border-gold/50 transition-colors uppercase appearance-none"
              >
                <option value="">Selecione a unidade</option>
                {unitOptions.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">
                Modalidade de interesse
              </label>
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                className="w-full bg-tatame border border-white/10 text-mid-gray px-4 py-3.5 font-mono text-[11px] tracking-wider focus:outline-none focus:border-gold/50 transition-colors uppercase appearance-none"
              >
                <option value="">Selecione uma modalidade</option>
                {modalityOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-3 bg-gold text-blackout font-display text-2xl tracking-widest uppercase px-8 py-4 hover:bg-gold/90 transition-colors mt-2"
            >
              <MessageCircle size={18} />
              Quero Começar
            </button>

            <p className="font-mono text-[9px] tracking-[0.2em] text-mid-gray/30 text-center uppercase">
              Você será redirecionado para o WhatsApp
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
