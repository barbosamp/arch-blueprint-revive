import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold tracking-[0.3em] text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              LOTHUS
            </span>
            <p className="text-xs text-muted-foreground tracking-wider mt-1">
              Arquitetura | Engenharia
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/lothusengenharia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lothus Engenharia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
