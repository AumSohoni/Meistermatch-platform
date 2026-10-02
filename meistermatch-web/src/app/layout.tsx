import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeisterMatch | Find Skilled Tradespeople in Latvia",
  description: "Connect homeowners and businesses with reliable, experienced professionals in Latvia.",
};

const LogoFooter = () => (
  <div className="font-bold text-xl flex items-center gap-2 tracking-tight text-white mb-6">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 13.5 20 18.8a2 2 0 0 1-2.8 2.8l-5.3-5.3"/>
      <path d="M11 9.5a5.5 5.5 0 1 1-7.8-7.8 5.5 5.5 0 0 1 7.8 7.8Z"/>
      <path d="M9.5 14.5 4.2 19.8a2 2 0 0 0 2.8 2.8l5.3-5.3"/>
      <path d="M13.5 9.5 18.8 4.2a2 2 0 0 0-2.8-2.8L10.7 6.7"/>
    </svg>
    MeisterMatch
  </div>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black overflow-x-hidden">
        
        {/* Navigation Bar */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full bg-[#1c1c1c] text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
               <LogoFooter />
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © MeisterMatch 2024 • Skilled Labor Marketplace Latvia
            </div>
          </div>
        </footer>
        
      </body>
    </html>
  );
}
