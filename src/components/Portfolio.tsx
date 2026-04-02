import { useState } from 'react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

const projects = [
  { img: project1, title: 'Residência Alto Padrão', category: 'residencial' },
  { img: project2, title: 'Casa Moderna', category: 'residencial' },
  { img: project3, title: 'Residência Térrea', category: 'residencial' },
  { img: project4, title: 'Edifício Corporativo', category: 'comercial' },
  { img: project5, title: 'Casa de Campo', category: 'residencial' },
  { img: project6, title: 'Torre Residencial', category: 'comercial' },
];

const filters = [
  { label: 'Todos', value: 'todos' },
  { label: 'Residencial', value: 'residencial' },
  { label: 'Comercial', value: 'comercial' },
];

const Portfolio = () => {
  const [active, setActive] = useState('todos');

  const filtered = active === 'todos' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projetos" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Portfólio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Nossos <span className="text-gradient">projetos</span>
          </h2>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`text-sm tracking-wider uppercase px-5 py-2 rounded-sm transition-colors ${
                active === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <div key={i} className="group relative overflow-hidden rounded-sm aspect-[4/3] cursor-pointer">
              <img
                src={project.img}
                alt={project.title}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/70 transition-all duration-500 flex items-end p-6">
                <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-primary text-xs tracking-[0.2em] uppercase">{project.category}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
