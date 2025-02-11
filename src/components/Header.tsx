"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex items-center">
          {/* White theme: use standard logo */}
          <Image
            src="/logo.png"
            alt="Strucureo Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/services" className="text-gray-700 hover:text-green-500">Services</Link>
          <Link href="/freelancer" className="text-gray-700 hover:text-green-500">Freelancer Platform</Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-500">Contact</Link>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden relative">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
          {isOpen && (
            <nav className="absolute top-full right-0 bg-white border border-gray-200 shadow-md flex flex-col items-center space-y-4 py-4 mt-2 w-48">
              <Link href="/services" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-green-500">Services</Link>
              <Link href="/freelancer" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-green-500">Freelancer Platform</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-green-500">Contact</Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
