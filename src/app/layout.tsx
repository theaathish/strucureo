import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Strucureo - Best Freelance Jobs & Talented Clients</title>
        <meta name="description" content="Find high-quality freelance jobs & connect with skilled professionals. Work remotely with the best clients on Strucureo." />
        <meta name="keywords" content="freelance jobs, remote work, work from home, freelancers, clients, Upwork alternative, Fiverr, Naukri jobs" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Strucureo - Best Freelance Jobs & Clients" />
        <meta property="og:description" content="Join Strucureo to find remote jobs, freelance projects, and top clients worldwide." />
        <meta property="og:image" content="/seo-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Strucureo - Find Freelance Jobs & Clients" />
        <meta name="twitter:description" content="Discover top freelance opportunities and work with global clients on Strucureo." />
        <meta name="twitter:image" content="/seo-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <img src="/logo.png" alt="Strucureo Logo" className="h-10" />
          <h1 className="text-2xl font-bold">Strucureo</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
