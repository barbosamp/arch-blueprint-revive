import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-blackout">
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
