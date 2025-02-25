import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto py-6 px-4 border-t border-gray-200 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center mb-4 md:mb-0">
          <Image
            src="/logo.png"
            alt="Strucureo Logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
            style={{ filter: 'none' }}
          />
        </Link>
        {/* Navigation Links */}
        <nav className="flex space-x-4 mb-4 md:mb-0">
          <a href="/services" className="text-gray-700 hover:text-green-500">Services</a>
          <a href="/freelancer" className="text-gray-700 hover:text-green-500">Freelancer</a>
          <a href="/contact" className="text-gray-700 hover:text-green-500">Contact</a>
        </nav>
        {/* Contact Details */}
        <div className="text-center mb-4 md:mb-0">
          <p className="text-gray-500 text-sm">aathish@theaathish.site</p>
          <p className="text-gray-500 text-sm">+91 74489 98628</p>
        </div>
        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-500">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-500">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-500">Instagram</a>
        </div>
      </div>
      <p className="mt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Strucureo. I don't About Copyrights.
      </p>
    </footer>
  );
}
