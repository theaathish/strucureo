"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FreelancerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
