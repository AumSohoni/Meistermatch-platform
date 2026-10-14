"use client";

import { Bookmark, MapPin, CheckCircle, Mail, Phone, Globe, Star, ShieldCheck, ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TRADESPEOPLE, recordSwipe } from "../../lib/tradesStore";

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const person = TRADESPEOPLE.find((p) => p.id === id) || TRADESPEOPLE[0];

  const handleStartChat = () => {
    const match = recordSwipe(person.id, "like");
    if (match) {
      window.location.href = `/chat?matchId=${match.id}`;
    } else {
      window.location.href = `/chat`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link
        href="/swipe"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Swiping
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Available for work
            </div>
          </div>

          <div className="text-sm font-semibold text-gray-900 mb-4 bg-gray-50 inline-block px-3 py-1.5 rounded-lg border border-gray-200">
            Rates start at €{person.hourly_rate_eur} / hr
          </div>

          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{person.name}</h1>
            <span title="Verified Meister">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{person.rating} rating</span>
            <span className="text-gray-400 font-normal">({person.reviews} reviews)</span>
          </div>

          <div className="text-gray-600 text-xs sm:text-sm flex items-center gap-2 mb-1">
            <MapPin className="h-3.5 w-3.5 text-gray-800" /> {person.location}
          </div>
          <div className="text-gray-600 text-xs sm:text-sm flex items-center gap-2 mb-6">
            <CheckCircle className="h-3.5 w-3.5 text-gray-800" /> {person.coverage}
          </div>

          <div className="flex flex-col gap-2.5 mb-8">
            <button
              onClick={handleStartChat}
              className="w-full bg-[#111] text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors flex justify-center items-center gap-2 shadow-sm text-xs sm:text-sm"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" /> Match & Message
            </button>
            <a
              href={`tel:${person.phone}`}
              className="w-full bg-white border border-gray-300 text-black py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 text-xs sm:text-sm"
            >
              <Phone className="h-4 w-4" /> Call {person.phone}
            </a>
          </div>

          <div className="mb-8 bg-gray-50 border border-gray-200 p-4 rounded-xl">
            <h3 className="font-semibold text-xs text-gray-900 uppercase tracking-wider mb-2">
              Match Reasons (Scored)
            </h3>
            <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
              {person.matchReasons?.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-sm mb-3">Skills & Tooling</h3>
            <div className="flex flex-wrap gap-1.5">
              {person.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Direct Contact</h3>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-700" /> {person.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-700" /> {person.email}
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-700" /> Languages: {person.languages.join(", ")}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:pl-6">
          <div className="bg-gray-100 inline-block px-3 py-1 rounded text-xs font-semibold uppercase text-gray-700 mb-4 tracking-wider">
            {person.trade} Services
          </div>

          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              {person.profession}
            </h2>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black border border-gray-200 rounded-md px-3 py-1.5">
              <Bookmark className="h-3.5 w-3.5" /> Save
            </button>
          </div>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-5 leading-relaxed text-xs sm:text-sm">
            <p className="text-gray-800 font-medium">{person.bio}</p>

            <h3 className="text-gray-900 font-bold text-sm pt-2">Service Details:</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Transparent Pricing:</strong> Standard rate of €{person.hourly_rate_eur}/hr with upfront estimation before work commences.
              </li>
              <li>
                <strong>Insured & Certified:</strong> Verified under Latvian vocational standards with documented safety adherence.
              </li>
              <li>
                <strong>Fast Response:</strong> Average response time {person.responseRate} for jobs in {person.district} and surrounding areas.
              </li>
            </ul>

            <h3 className="text-gray-900 font-bold text-sm pt-2">Typical Project Range:</h3>
            <p>{person.estProject}</p>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold mb-4">Sample Work Portfolio</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 h-52 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"
                  alt="Gallery 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 h-52 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2031&auto=format&fit=crop"
                  alt="Gallery 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
