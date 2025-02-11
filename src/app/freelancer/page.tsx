import Header from '../../components/Header';
import Freelancer from '../../components/Freelancer';
import Footer from '../../components/Footer';

export default function FreelancerPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      <Header />
      <Freelancer />
      <Footer />
    </div>
  );
}
