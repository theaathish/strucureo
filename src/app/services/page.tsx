import Header from '../../components/Header';
import Services from '../../components/Services';
import Footer from '../../components/Footer';


function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      icon: "🌐"
    },
    {
      title: "Digital Marketing",
      description: "Strategic marketing solutions to grow your online presence",
      icon: "📱"
    },
    {
      title: "Video Editing",
      description: "Professional video editing and post-production services",
      icon: "🎥"
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-black">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      <Header />
      <ServicesSection />
      <Footer />
    </div>
  );
}