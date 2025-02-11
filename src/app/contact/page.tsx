import Header from '../../components/Header';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      <Header />
      <Contact />
      <Footer />
    </div>
  );
}