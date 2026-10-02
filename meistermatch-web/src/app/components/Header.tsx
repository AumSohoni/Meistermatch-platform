"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";

const Logo = () => (
  <Link href="/" className="font-bold text-xl flex items-center gap-2 tracking-tight text-black hover:opacity-80 transition-opacity">
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
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

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

  const handleSignOut = () => {
    localStorage.removeItem("meister_user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="w-full border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-black transition-colors">
              Search Trades
            </Link>
            <Link href="/swipe" className="text-gray-600 hover:text-black transition-colors">
              Swipe Mode
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md">
                <User className="w-4 h-4 text-gray-600" />
                <span>{user.name || user.email}</span>
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
            <>
              <Link href="/login" className="text-sm font-medium border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors">
                Log in
              </Link>
              <Link href="/signup" className="text-sm font-medium bg-[#111] text-white rounded-md px-4 py-2 hover:bg-black transition-colors">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
