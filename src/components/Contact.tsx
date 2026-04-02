import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Mensagem enviada!', description: 'Entraremos em contato em breve.' });
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contato" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Contato
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Fale <span className="text-gradient">conosco</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Tem um projeto em mente? Entre em contato conosco e transforme suas
              ideias em realidade. Estamos prontos para atendê-lo.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-foreground font-medium text-sm">Endereço</h4>
                  <p className="text-muted-foreground text-sm">Brasília - DF, Brasil</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-foreground font-medium text-sm">Telefone</h4>
                  <p className="text-muted-foreground text-sm">(61) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-foreground font-medium text-sm">E-mail</h4>
                  <p className="text-muted-foreground text-sm">contato@lothusengenharia.com.br</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-card border-border"
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-card border-border"
            />
            <Input
              placeholder="Telefone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-card border-border"
            />
            <Textarea
              placeholder="Sua mensagem"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="bg-card border-border"
            />
            <Button type="submit" className="w-full tracking-wider uppercase text-sm">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
