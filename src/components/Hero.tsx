"use client";
import { useState, useEffect } from 'react';

export default function Hero() {
  const slides = [
    {
      title: "Professional Web Solutions",
      description: "We design, develop, and deliver high-quality digital experiences.",
      buttonText: "Explore Platform",
      buttonLink: "#freelancer",
      backgroundImage: "/temp.jpg"
    },
    {
      title: "Innovative Designs",
      description: "Modern aesthetics tailored to elevate your brand.",
      buttonText: "Our Services",
      buttonLink: "#services",
      backgroundImage: "/temp1.jpg"
    },
    {
      title: "Reliable Support",
      description: "24/7 assistance to keep your projects on track.",
      buttonText: "Contact Us",
      buttonLink: "/contact",
      backgroundImage: "/temp2.jpg"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
        ></div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Slider content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 transition-opacity duration-1000">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 transition-opacity duration-1000">
          {slides[currentSlide].description}
        </p>
        <a
          href={slides[currentSlide].buttonLink}
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300"
        >
          {slides[currentSlide].buttonText}
        </a>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="#services" aria-label="Scroll Down" className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
