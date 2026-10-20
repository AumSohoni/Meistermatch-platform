"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "worker">("client");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameFromEmail = email.split("@")[0] || "User";
    const userObj = {
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      email: email,
      role: role,
    };
    localStorage.setItem("meister_user", JSON.stringify(userObj));
    
    // Direct worker to job swipe deck, client to search/swipe
    if (role === "worker") {
      window.location.href = "/swipe";
    } else {
      window.location.href = "/search";
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Log in to MeisterMatch
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
            Or{" "}
            <Link href="/signup" scroll={false} className="font-semibold text-black hover:underline">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Account Role Selector */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-gray-100 rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => setRole("client")}
              className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                role === "client"
                  ? "bg-white text-black shadow-xs border border-gray-200"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Hire Tradespeople
            </button>
            <button
              type="button"
              onClick={() => setRole("worker")}
              className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                role === "worker"
                  ? "bg-white text-black shadow-xs border border-gray-200"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              I am a Tradesperson
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3.5 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-xs sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3.5 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-xs sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                Remember me
              </label>
            </div>

            <div>
              <a href="#" className="font-medium text-gray-600 hover:text-black">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-xs sm:text-sm font-semibold rounded-md text-white bg-[#111] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors shadow-xs"
            >
              Sign in as {role === "worker" ? "Meister" : "Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
