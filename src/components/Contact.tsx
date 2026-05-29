import { useState } from 'react';
import { MessageCircle, Instagram, MapPin } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Me chamo ${name}. Quero agendar uma aula experimental na Blackbox. Meu contato: ${phone}`;
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contato" className="py-24 md:py-40 bg-blackout">
      <div className="px-6 max-w-5xl mx-auto">
        {/* Section tag */}
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold uppercase block mb-12">
          05 — Entre na Caixa
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
              A primeira aula é experimental — venha conhecer o tatame. Sem compromisso,
              sem equipamento. Só você e o processo.
            </p>

            <div className="space-y-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-mid-gray hover:text-gold transition-colors group"
              >
                <Instagram size={14} className="shrink-0" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase group-hover:text-gold transition-colors">
                  @blackboxjiujitsu
                </span>
              </a>
              <div className="flex items-center gap-3 text-mid-gray">
                <MapPin size={14} className="shrink-0" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
                  Sua Cidade — Brasil
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-12 border-l-2 border-gold/30 pl-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-mid-gray/50 italic">
                "Defesa pessoal não é sobre violência. É sobre proteção."
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
                placeholder="(00) 00000-0000"
                required
                className="w-full bg-tatame border border-white/10 text-white-belt placeholder-mid-gray/30 px-4 py-3.5 font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase block mb-2">
                Modalidade de interesse
              </label>
              <select
                className="w-full bg-tatame border border-white/10 text-mid-gray px-4 py-3.5 font-mono text-[11px] tracking-wider focus:outline-none focus:border-gold/50 transition-colors uppercase appearance-none"
              >
                <option value="">Selecione uma modalidade</option>
                <option value="bjj-adultos">BJJ Adultos</option>
                <option value="bjj-kids">BJJ Kids</option>
                <option value="defesa">Defesa Pessoal</option>
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
