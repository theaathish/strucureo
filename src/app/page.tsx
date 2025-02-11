"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Freelancer from "../components/Freelancer";
import Footer from "../components/Footer";
import IntroAnimation from "../components/IntroAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}
      <div
        className={`min-h-screen bg-white text-gray-900 transition-opacity duration-1000 scroll-smooth ${
          showIntro ? "invisible opacity-0" : "visible opacity-100"
        }`}
      >
        <Header />
        <Hero />
        <main className="max-w-6xl mx-auto p-6 space-y-16">
          {/* Services Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
            <Services limit={3} />
            <div className="mt-4 text-center">
              <Link
                href="/services"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </section>

          {/* Freelancer Section */}
          <section>
            <Freelancer />
          </section>

          {/* About Section with Contact Button */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">
              Strucureo enhances your digital presence with innovative solutions and expert guidance.
              We blend creativity and technology to empower your brand.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Contact Us
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
