"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function Hero() {
  const images = ["/temp.jpg", "/temp1.jpg", "/temp.jpg"];
  const [currentImage, setCurrentImage] = React.useState(0);
  const fullText = "Exploring the Future of Digital Workforce";
  const [displayText, setDisplayText] = React.useState("");

  // Image Slideshow Effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Typing Effect
  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex-1 py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <section className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-16">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className={`
                brightness-50 rounded-xl object-cover transition-opacity duration-1000
                ${currentImage === index ? "opacity-100" : "opacity-0"}
              `}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {displayText}
            </h1>
            <p className="text-base md:text-lg">
              Explore exciting career opportunities with Strucureo
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

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

function FreelancerSection() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Freelancers</h2>
        <p className="text-lg text-gray-700 mb-8">
          View our top rated freelancers ready to bring your project to life.
        </p>
        <Link
          href="/contact"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">About Strucureo</h2>
        <p className="text-lg text-gray-700 mb-8">
          We aim to connect world-class freelancers with top clients. Our platform is built to empower professionals and drive success.
        </p>
        <Link
          href="/contact"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Get In Touch
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ServicesSection />
        <FreelancerSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
