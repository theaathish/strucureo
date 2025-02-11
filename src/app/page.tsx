import Link from "next/link";
import Image from "next/image";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 text-center text-white p-6">
          <h1 className="text-5xl font-bold mb-4">Find Your Next Opportunity</h1>
          <p className="text-xl mb-8">Connect with top clients and freelancers worldwide</p>
          <Link
            href="/freelancer-info"
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          <Services />
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
