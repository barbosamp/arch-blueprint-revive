import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Programs from '@/components/Programs';
import Methodology from '@/components/Methodology';
import Plans from '@/components/Plans';
import Schedule from '@/components/Schedule';
import Units from '@/components/Units';
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
      <Methodology />
      <Plans />
      <Schedule />
      <Units />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
