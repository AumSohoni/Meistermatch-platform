"use client";

import { Search, Star, Bookmark, MapPin, Filter, SlidersHorizontal, CheckCircle2, ShieldCheck, ArrowRight, Euro } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { TRADESPEOPLE, Tradesperson } from "../lib/tradesStore";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTrade, setSelectedTrade] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [maxRate, setMaxRate] = useState<number>(35);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const tradesList = [
    { label: "All Trades", value: "all" },
    { label: "Electrician", value: "electrician" },
    { label: "Plumber", value: "plumber" },
    { label: "Welder", value: "welder" },
    { label: "Carpenter", value: "carpenter" },
    { label: "HVAC", value: "hvac" },
    { label: "Painter", value: "painter" },
    { label: "Cleaning", value: "cleaning" },
    { label: "Gardener", value: "gardener" },
  ];

  const districtsList = [
    "All Districts",
    "Centrs",
    "Āgenskalns",
    "Ķengarags",
    "Teika",
    "Imanta",
    "Purvciems",
    "Ziepniekkalns",
    "Jūrmala",
  ];

  const filtered = useMemo(() => {
    return TRADESPEOPLE.filter((person) => {
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        person.name.toLowerCase().includes(q) ||
        person.profession.toLowerCase().includes(q) ||
        person.trade.toLowerCase().includes(q) ||
        person.skills.some((s) => s.toLowerCase().includes(q));

      const matchesTrade = selectedTrade === "all" || person.trade === selectedTrade;
      const matchesDistrict =
        selectedDistrict === "all" ||
        selectedDistrict === "All Districts" ||
        person.district.toLowerCase() === selectedDistrict.toLowerCase();
      const matchesRate = person.hourly_rate_eur <= maxRate;

      return matchesQuery && matchesTrade && matchesDistrict && matchesRate;
    });
  }, [searchQuery, selectedTrade, selectedDistrict, maxRate]);

  return (
    <div className="pb-16 w-full">
      {/* Search Header Banner */}
      <div className="bg-[#111] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 w-full border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-2">
                <span>Latvia Directory</span>
                <span>•</span>
                <span>Verified Skilled Trades</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Find Skilled Tradespeople for Your Needs
              </h1>
            </div>
            <Link
              href="/swipe"
              scroll={false}
              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold px-4 py-2.5 rounded-md border border-neutral-700 transition-colors shrink-0"
            >
              Switch to Swipe Mode <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Search Input Bar */}
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-2xl">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-neutral-700 rounded-md bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-white placeholder-gray-500 text-xs sm:text-sm shadow-xs"
                placeholder="Search by trade, skill, or keyword (e.g. Electrician, Boiler, Wiring)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-neutral-400 hover:text-white px-3 py-2 self-center sm:self-auto"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Content Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Filter Toolbar */}
        <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-4 sm:p-5 mb-8 shadow-2xs space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters & Trade Categories</span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Showing <strong>{filtered.length}</strong> available professionals
            </span>
          </div>

          {/* Trade Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {tradesList.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setSelectedTrade(t.value)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium shrink-0 transition-colors border ${
                  selectedTrade === t.value
                    ? "bg-[#111] text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls (District + Rate Slider) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 border-t border-gray-200">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Neighborhood / District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
              >
                {districtsList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                <span>Max Hourly Rate</span>
                <span className="text-black font-bold">€{maxRate} / hr</span>
              </div>
              <input
                type="range"
                min={15}
                max={35}
                step={1}
                value={maxRate}
                onChange={(e) => setMaxRate(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedTrade("all");
                  setSelectedDistrict("all");
                  setMaxRate(35);
                  setSearchQuery("");
                }}
                className="w-full text-xs font-medium text-gray-600 hover:text-black border border-gray-300 rounded-md py-2 px-3 hover:bg-white transition-colors text-center"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filtered.map((person) => (
              <Link
                href={`/profile/${person.id}`}
                scroll={false}
                key={person.id}
                className="group flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:border-black transition-all bg-white shadow-2xs hover:shadow-sm"
              >
                {/* Photo banner */}
                <div className="h-44 bg-gray-100 w-full relative overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {person.trade}
                  </div>
                  {person.verified && (
                    <div className="absolute top-2.5 right-2.5 bg-white/95 text-black text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-2xs">
                      <ShieldCheck className="w-3 h-3 text-neutral-800" /> Verified
                    </div>
                  )}
                </div>

                {/* Profile Information */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 group-hover:underline text-sm truncate">
                      {person.name}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-1 mb-2 font-medium">
                    {person.profession}
                  </p>

                  <div className="flex items-center text-xs text-gray-500 mb-3 gap-1">
                    <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                    <span className="truncate">{person.location}</span>
                  </div>

                  {/* Skills preview */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {person.skills.slice(0, 2).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded font-medium truncate max-w-[120px]"
                      >
                        {s}
                      </span>
                    ))}
                    {person.skills.length > 2 && (
                      <span className="text-[10px] text-gray-400 self-center">
                        +{person.skills.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Pricing and Rating footer */}
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100 text-xs">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 text-black fill-black mr-1" />
                      <span className="font-semibold text-gray-900">{person.rating}</span>
                      <span className="text-gray-400 ml-1">({person.reviews})</span>
                    </div>
                    <div className="font-bold text-gray-900 text-xs sm:text-sm">
                      €{person.hourly_rate_eur}/hr
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500 mb-16 border-2 border-dashed border-gray-200 rounded-xl space-y-3">
            <p className="text-sm font-medium text-gray-800">
              No verified tradespeople match your current filters.
            </p>
            <p className="text-xs text-gray-500">
              Try adjusting your max rate, expanding district bounds, or clearing search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedTrade("all");
                setSelectedDistrict("all");
                setMaxRate(35);
                setSearchQuery("");
              }}
              className="text-xs font-semibold bg-[#111] text-white px-4 py-2 rounded-md hover:bg-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-gray-500">Loading search directory...</div>}>
      <SearchContent />
    </Suspense>
  );
}
