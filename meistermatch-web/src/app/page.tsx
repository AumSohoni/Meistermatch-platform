import { Search, ShieldCheck, Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20">
      
      {/* 1. HERO SECTION (BROD Mockup Aligned) */}
      <section className="flex flex-col lg:flex-row gap-12 items-stretch">
        {/* Left column: Search / Tabs */}
        <div className="flex-1 max-w-xl bg-[#fafafa] p-8 md:p-10 rounded-xl border border-gray-200 flex flex-col justify-between shadow-sm">
          <div>
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-8">
              <button className="pb-4 border-b-2 border-black font-semibold text-black text-sm">
                Hire Someone
              </button>
              <Link href="/signup" className="pb-4 font-medium text-gray-400 hover:text-black transition-colors text-sm">
                Become a Tradesperson
              </Link>
            </div>
            
            {/* Main Headline & Goal Statement */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Hire Skilled Tradespeople in Latvia
            </h1>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              MeisterMatch connects homeowners and businesses with verified, reliable tradespeople across Riga, Jūrmala, Liepāja, and surrounding cities.
            </p>

            {/* Search form */}
            <form action="/search" method="GET" className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                What do you need help with?
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="q"
                    className="block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm shadow-sm"
                    placeholder="Search service (e.g., Electrician, Painter)"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#111] text-white px-8 py-3 rounded-md font-medium hover:bg-black transition-colors flex items-center justify-center shrink-0 text-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Clean Swipe Match CTA */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-500 font-medium">Quick Discovery Mode:</span>
              <Link
                href="/swipe"
                className="text-xs font-semibold bg-white border border-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Try Swipe Match &rarr;
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-500 pt-4 border-t border-gray-200 flex items-center gap-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-gray-700" /> Verified Pros</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gray-700" /> Latvia Nationwide</span>
          </div>
        </div>
        
        {/* Right column: Clean Image */}
        <div className="flex-1">
          <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
              alt="Tradesperson repairing AC unit" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. THE GOAL OF MEISTERMATCH (PLATFORM MISSION & VALUE) */}
      <section className="bg-[#fafafa] border border-gray-200 rounded-xl p-8 md:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Platform Goal</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Solving Latvia's Tradesperson Discovery Challenge
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Finding certified electricians, painters, and carpenters in Latvia has traditionally suffered from lack of price transparency, unverified reviews, and slow communication. MeisterMatch solves this by providing a unified marketplace with transparent hourly rates, verified worker location coverage, and instant direct hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-2">
            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-900 text-lg">
              1
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Verified & Licensed</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every worker profile is cross-checked for identity, past portfolio work, and trade qualifications in Latvia.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-2">
            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-900 text-lg">
              2
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Upfront Hourly Rates</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              No hidden fees or unexpected costs. See average hourly pricing and estimated project costs before reaching out.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-2">
            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-900 text-lg">
              3
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Search or Swipe Matching</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Choose between traditional category search or fast Tinder-style profile matching depending on your preference.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            How MeisterMatch Works
          </h2>
          <p className="text-xs text-gray-500">
            Three simple steps to hire the right tradesperson for your job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 rounded-xl space-y-3 bg-white">
            <span className="text-xs font-bold text-gray-400">STEP 01</span>
            <h3 className="font-bold text-gray-900 text-base">Find a Meister</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Search by service or swipe through local skilled worker profiles in your radius.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl space-y-3 bg-white">
            <span className="text-xs font-bold text-gray-400">STEP 02</span>
            <h3 className="font-bold text-gray-900 text-base">Compare & Match</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Review transparent pricing, verified past reviews, and portfolio project galleries.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl space-y-3 bg-white">
            <span className="text-xs font-bold text-gray-400">STEP 03</span>
            <h3 className="font-bold text-gray-900 text-base">Hire & Direct Message</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Connect directly via messaging or click Hire to schedule your project.
            </p>
          </div>
        </div>
      </section>

      {/* 4. POPULAR CATEGORIES GRID */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-semibold text-gray-900">Popular Categories</h2>
          <Link href="/search" className="text-xs font-semibold text-black hover:underline flex items-center gap-1">
            See all categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: "Electrician", count: "340+ Pros", href: "/search?q=Electrical" },
            { title: "House Painting", count: "210+ Pros", href: "/search?q=Painting" },
            { title: "Construction", count: "190+ Pros", href: "/search?q=Construction" },
            { title: "Gardening", count: "140+ Pros", href: "/search?q=Gardening" },
            { title: "Solar & Energy", count: "95+ Pros", href: "/search?q=Solar" },
            { title: "House Cleaning", count: "280+ Pros", href: "/search?q=Cleaning" },
            { title: "Carpentry", count: "160+ Pros", href: "/search?q=Carpentry" },
            { title: "Plumbing", count: "185+ Pros", href: "/search?q=Plumbing" },
          ].map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="p-5 border border-gray-200 rounded-lg hover:border-black transition-colors bg-white group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:underline text-sm">{cat.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="bg-[#111] text-white p-10 md:p-14 rounded-xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to hire a tradesperson in Latvia?</h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Create an account in less than a minute or search through active local professionals.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/signup"
            className="bg-white text-black font-semibold px-6 py-3 rounded-md text-sm hover:bg-gray-100 transition-colors text-center"
          >
            Create Account
          </Link>
          <Link
            href="/search"
            className="border border-gray-700 text-white font-semibold px-6 py-3 rounded-md text-sm hover:bg-gray-800 transition-colors text-center"
          >
            Explore Trades
          </Link>
        </div>
      </section>

    </div>
  );
}
