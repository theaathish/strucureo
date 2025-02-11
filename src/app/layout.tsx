import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strucureo - Best Freelance Jobs & Talented Clients",
  description: "Find high-quality freelance jobs & connect with skilled professionals. Work remotely with the best clients on Strucureo.",
  keywords: "freelance jobs, remote work, work from home, freelancers, clients, Upwork alternative, Fiverr, Naukri jobs",
  robots: "index, follow",
  openGraph: {
    title: "Strucureo - Best Freelance Jobs & Clients",
    description: "Join Strucureo to find remote jobs, freelance projects, and top clients worldwide.",
    images: [
      {
        url: "/seo-image.jpg",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Strucureo - Find Freelance Jobs & Clients",
    description: "Discover top freelance opportunities and work with global clients on Strucureo.",
    images: [
      {
        url: "/seo-image.jpg",
      },
    ],
    card: "summary_large_image",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <Image
            src="/logo.png"
            alt="Strucureo Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold">Strucureo</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
