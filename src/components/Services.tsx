import { Home, Building2, HardHat, ClipboardCheck } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Projetos Residenciais',
    description: 'Casas e apartamentos personalizados com design contemporâneo, priorizando conforto e funcionalidade.',
  },
  {
    icon: Building2,
    title: 'Projetos Comerciais',
    description: 'Espaços comerciais e corporativos projetados para maximizar eficiência e impacto visual.',
  },
  {
    icon: HardHat,
    title: 'Engenharia Estrutural',
    description: 'Cálculos e projetos estruturais com segurança e economia, utilizando as melhores práticas do mercado.',
  },
  {
    icon: ClipboardCheck,
    title: 'Acompanhamento de Obra',
    description: 'Gestão e supervisão completa da construção, garantindo fidelidade ao projeto e cumprimento de prazos.',
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            O que <span className="text-gradient">fazemos</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-sm p-8 hover:border-primary/50 transition-all duration-300"
            >
              <service.icon className="text-primary mb-6 group-hover:scale-110 transition-transform" size={36} />
              <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
