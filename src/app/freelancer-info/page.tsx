"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FreelancerInfoPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow p-8 pt-24"> {/* Add padding-top to avoid overlap */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Freelancer Platform</h1>
          <p className="mt-4 text-lg text-gray-600">
            Connect with high-quality jobs and talented clients.
          </p>
        </header>
      
        <section className="max-w-4xl mx-auto text-center">
          <p className="mb-6 text-lg">
            Our platform empowers you by providing an opportunity to connect with professional opportunities.
            Only client-side login is supported. To access features as a client, please sign up.
          </p>
          <div className="flex justify-center">
            <Link
              href="/freelancer/signup"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
