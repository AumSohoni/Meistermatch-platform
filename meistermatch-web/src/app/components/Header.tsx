"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, LogOut, Menu, X, Briefcase, Users } from "lucide-react";
import { usePathname } from "next/navigation";

const Logo = () => (
  <Link href="/" scroll={false} className="font-bold text-xl flex items-center gap-2 tracking-tight text-black hover:opacity-80 transition-opacity">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 13.5 20 18.8a2 2 0 0 1-2.8 2.8l-5.3-5.3"/>
      <path d="M11 9.5a5.5 5.5 0 1 1-7.8-7.8 5.5 5.5 0 0 1 7.8 7.8Z"/>
      <path d="M9.5 14.5 4.2 19.8a2 2 0 0 0 2.8 2.8l5.3-5.3"/>
      <path d="M13.5 9.5 18.8 4.2a2 2 0 0 0-2.8-2.8L10.7 6.7"/>
    </svg>
    MeisterMatch
  </Link>
);

export default function Header() {
  const [user, setUser] = useState<{ name: string; email: string; role?: "client" | "worker" } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("meister_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("meister_user");
    setUser(null);
    window.location.href = "/";
  };

  const isWorker = user?.role === "worker";

  // Role-adaptive Navigation links
  const navLinks = isWorker
    ? [
        { name: "Job Swipe Deck", href: "/swipe" },
        { name: "My Credentials", href: "/meister-portal" },
        { name: "Employer Messages", href: "/chat" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Search Trades", href: "/search" },
        { name: "Swipe Pros", href: "/swipe" },
        { name: "Matches & Chat", href: "/chat" },
      ];

  return (
    <header className="w-full border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-xs z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-black font-semibold border-b-2 border-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 px-2.5 sm:px-3 py-1.5 rounded-md max-w-[170px] sm:max-w-none truncate">
                {isWorker ? (
                  <span className="bg-neutral-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    Meister
                  </span>
                ) : (
                  <span className="bg-gray-200 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    Client
                  </span>
                )}
                <span className="truncate">{user.name || user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs text-gray-500 hover:text-black p-2 rounded-md hover:bg-gray-100 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                scroll={false}
                className="text-sm font-medium border border-gray-300 rounded-md px-3.5 py-1.5 hover:bg-gray-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                scroll={false}
                className="text-sm font-medium bg-[#111] text-white rounded-md px-3.5 py-1.5 hover:bg-black transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-100 text-black font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          {!user && (
            <div className="pt-3 border-t border-gray-100 flex gap-2">
              <Link
                href="/login"
                scroll={false}
                className="flex-1 text-center text-xs font-semibold border border-gray-300 py-2.5 rounded-md hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                scroll={false}
                className="flex-1 text-center text-xs font-semibold bg-[#111] text-white py-2.5 rounded-md hover:bg-black"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
