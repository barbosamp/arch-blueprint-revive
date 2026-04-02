import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Projeto arquitetônico moderno"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-block w-16 h-[1px] bg-primary mb-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          Transformamos
          <br />
          <span className="text-gradient">espaços em arte</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Arquitetura e engenharia de excelência. Criamos projetos que unem
          funcionalidade, estética e inovação.
        </p>
        <a
          href="#projetos"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-sm text-sm tracking-wider uppercase font-semibold hover:bg-primary/90 transition-colors"
        >
          Ver Projetos
        </a>
      </div>

      <button
        onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default Hero;
