import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Programs from '@/components/Programs';
import Schedule from '@/components/Schedule';
import Values from '@/components/Values';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-blackout">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Schedule />
      <Values />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
