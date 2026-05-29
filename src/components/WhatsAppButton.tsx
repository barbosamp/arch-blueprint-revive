import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5511977962165?text=Quero%20agendar%20minha%20aula%20experimental%20gr%C3%A1tis."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 shadow-xl hover:scale-110 transition-transform"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppButton;
