import Header from '../../components/Header';
import Services from '../../components/Services';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      <Header />
      <Services />
      <Footer />
    </div>
  );
}