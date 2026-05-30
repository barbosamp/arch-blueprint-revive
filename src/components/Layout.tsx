import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout({ children, hideNav }: { children: React.ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-screen bg-blackout">
      {!hideNav && <Navbar />}
      {children}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
