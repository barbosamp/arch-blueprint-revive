import aboutBg from '@/assets/about-bg.jpg';

const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
              Quem Somos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Excelência em cada
              <br />
              <span className="text-gradient">detalhe</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A Lothus Engenharia é uma empresa especializada em projetos de
                arquitetura e engenharia, com foco em soluções inovadoras e
                sustentáveis para residências e empreendimentos comerciais.
              </p>
              <p>
                Nossa equipe multidisciplinar combina criatividade e técnica para
                entregar projetos que superam expectativas, respeitando prazos e
                orçamentos. Cada projeto é único, pensado para refletir a
                personalidade e as necessidades de nossos clientes.
              </p>
              <p>
                Atuamos desde a concepção do projeto até o acompanhamento completo
                da obra, garantindo qualidade e excelência em todas as etapas.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              <div>
                <span className="text-3xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>150+</span>
                <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">Projetos</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>10+</span>
                <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">Anos</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>100%</span>
                <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">Satisfação</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={aboutBg}
              alt="Interior de projeto moderno"
              loading="lazy"
              width={1280}
              height={960}
              className="w-full h-[400px] md:h-[550px] object-cover rounded-sm"
            />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-primary rounded-sm hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
