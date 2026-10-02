"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Star, MapPin, CheckCircle2, RotateCcw, Heart, X, MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface WorkerProfile {
  id: number;
  name: string;
  profession: string;
  category: string;
  location: string;
  coverage: string;
  price: string;
  estProject: string;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  skills: string[];
  verified: boolean;
  responseRate: string;
}

const PROFILES: WorkerProfile[] = [
  {
    id: 1,
    name: "Miks Liepiņš",
    profession: "Master Electrician & Smart Home Technician",
    category: "Electrical",
    location: "Riga, Latvia",
    coverage: "Riga & Pierīga (within 45km)",
    price: "€22 / hr",
    estProject: "€120 - €450 avg. job",
    rating: 4.9,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop",
    bio: "Certified high-voltage electrician with 9 years of experience in modern apartment rewiring, EV charger installs, and smart light systems.",
    skills: ["Circuit Upgrades", "EV Chargers", "Smart Home Automation", "Emergency 24/7"],
    verified: true,
    responseRate: "< 10 min",
  },
  {
    id: 2,
    name: "Yves Vergara",
    profession: "All-Around Interior & Exterior Painter",
    category: "Painting",
    location: "Ogre & Riga, Latvia",
    coverage: "All Latvia Central Region",
    price: "€18 / hr",
    estProject: "€150 - €600 avg. job",
    rating: 4.8,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    bio: "Specializing in dustless interior painting, wall priming, decorative stucco, and weather-resistant facade coatings. Clean and precise work.",
    skills: ["Interior Decorating", "Wall Sanding", "Facade Painting", "Eco Coatings"],
    verified: true,
    responseRate: "< 15 min",
  },
  {
    id: 3,
    name: "Jānis Kļaviņš",
    profession: "Solar Panel & Renewable Energy Specialist",
    category: "Electrical & Solar",
    location: "Liepāja & Riga, Latvia",
    coverage: "Nationwide Latvia",
    price: "€30 / hr",
    estProject: "€800 - €3,500 avg. job",
    rating: 4.95,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop",
    bio: "Licensed installer for roof solar arrays and battery power storage. Complete documentation support for ALTUM state grants.",
    skills: ["Rooftop Solar", "Inverter Setup", "ALTUM Grant Assistance", "Grid Connection"],
    verified: true,
    responseRate: "< 30 min",
  },
  {
    id: 4,
    name: "Jane & Team",
    profession: "Deep House & Post-Construction Cleaners",
    category: "Cleaning",
    location: "Riga, Latvia",
    coverage: "Greater Riga Area",
    price: "€15 / hr",
    estProject: "€80 - €220 avg. job",
    rating: 4.7,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
    bio: "Professional eco-friendly cleaning crew. Deep sanitation, window washing, and post-renovation cleanup for residential and offices.",
    skills: ["Deep Cleaning", "Window Polishing", "Post-Renovation", "Eco Detergents"],
    verified: true,
    responseRate: "< 5 min",
  },
  {
    id: 5,
    name: "Pēteris Zariņš",
    profession: "Landscape Architect & Lawn Care Specialist",
    category: "Gardening",
    location: "Jūrmala & Riga, Latvia",
    coverage: "Jūrmala, Babīte, Mārupe",
    price: "€18 / hr",
    estProject: "€100 - €400 avg. job",
    rating: 4.85,
    reviews: 36,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
    bio: "Expert gardener offering automated lawn irrigation installation, hedge trimming, seasonal pruning, and patio paving.",
    skills: ["Lawn Aeration", "Irrigation Systems", "Hedge Shaping", "Patio Tiles"],
    verified: true,
    responseRate: "< 20 min",
  },
];

function SwipeCard({
  profile,
  isTop,
  onSwipeRight,
  onSwipeLeft,
}: {
  profile: WorkerProfile;
  isTop: boolean;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipeRight();
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{
        gridRowStart: 1,
        gridColumnStart: 1,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex: isTop ? 10 : 1,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ scale: isTop ? 1 : 0.96, y: isTop ? 0 : 8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`w-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden cursor-grab active:cursor-grabbing select-none ${
        !isTop ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Photo Header */}
      <div className="relative h-56 sm:h-64 w-full bg-gray-100">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Swipe Indicators */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-4 left-4 border-2 border-black bg-black text-white font-bold text-xs sm:text-sm px-3 py-1 rounded-md rotate-[-8deg] tracking-wide"
            >
              MATCH ✓
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-4 right-4 border-2 border-gray-400 bg-white text-gray-700 font-bold text-xs sm:text-sm px-3 py-1 rounded-md rotate-[8deg] tracking-wide"
            >
              SKIP ✕
            </motion.div>
          </>
        )}

        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-4 right-4">
            <span className="bg-black/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
        )}

        {/* Name & Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">{profile.name}</h2>
            <div className="flex items-center gap-1 text-xs font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">
              <Star className="w-3 h-3 fill-white text-white" />
              <span>{profile.rating}</span>
              <span className="text-gray-200 font-normal">({profile.reviews})</span>
            </div>
          </div>
          <p className="text-gray-200 text-xs font-medium line-clamp-1">{profile.profession}</p>
        </div>
      </div>

      {/* Profile Details (Responsive Box) */}
      <div className="p-4 sm:p-5 space-y-3.5 bg-white">
        {/* Location & Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div className="bg-[#fafafa] border border-gray-200 p-2.5 sm:p-3 rounded-lg">
            <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <MapPin className="w-3 h-3 text-gray-700" /> Location & Area
            </div>
            <div className="text-xs font-semibold text-gray-900 leading-tight">
              {profile.location}
            </div>
            <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 line-clamp-1">{profile.coverage}</div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-2.5 sm:p-3 rounded-lg">
            <div className="text-[11px] text-gray-500 font-medium mb-0.5">
              Average Pricing
            </div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">
              {profile.price}
            </div>
            <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 line-clamp-1">{profile.estProject}</div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
          {profile.bio}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {profile.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 sm:py-1 rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1 font-medium text-gray-700 text-[11px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-800" /> Replies in {profile.responseRate}
          </span>
          <Link
            href={`/profile/${profile.id}`}
            className="text-black font-semibold hover:underline flex items-center gap-1 text-[11px] sm:text-xs"
          >
            View Profile <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipePage() {
  const [deck, setDeck] = useState<WorkerProfile[]>(PROFILES);
  const [history, setHistory] = useState<WorkerProfile[]>([]);
  const [matchedProfile, setMatchedProfile] = useState<WorkerProfile | null>(null);

  const currentProfile = deck[0];

  const handleSwipeRight = () => {
    if (!currentProfile) return;
    setMatchedProfile(currentProfile);
    setHistory((prev) => [currentProfile, ...prev]);
    setDeck((prev) => prev.slice(1));
  };

  const handleSwipeLeft = () => {
    if (!currentProfile) return;
    setHistory((prev) => [currentProfile, ...prev]);
    setDeck((prev) => prev.slice(1));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[0];
    setHistory((prev) => prev.slice(1));
    setDeck((prev) => [last, ...prev]);
  };

  const handleReset = () => {
    setDeck(PROFILES);
    setHistory([]);
    setMatchedProfile(null);
  };

  return (
    <div className="min-h-[82vh] py-6 sm:py-10 px-4 flex flex-col items-center justify-between max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="text-center max-w-lg mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Swipe to Match Tradespeople
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Swipe <strong className="text-gray-900 font-semibold">Right</strong> to Match or <strong className="text-gray-500 font-normal">Left</strong> to Skip
        </p>
      </div>

      {/* Card Stack Container (Fully Fluid & Responsive) */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg min-h-[480px] sm:min-h-[520px] relative flex items-center justify-center grid px-2 sm:px-0">
        <AnimatePresence>
          {deck.length > 0 ? (
            deck.slice(0, 2).map((profile, index) => (
              <SwipeCard
                key={profile.id}
                profile={profile}
                isTop={index === 0}
                onSwipeRight={handleSwipeRight}
                onSwipeLeft={handleSwipeLeft}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#fafafa] p-8 rounded-xl border border-gray-200 text-center max-w-sm w-full space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-900">All Tradespeople Reviewed</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                You've reviewed all available tradespeople in Latvia for today.
              </p>
              <button
                onClick={handleReset}
                className="w-full bg-[#111] text-white py-2.5 rounded-md font-semibold text-xs hover:bg-black transition-colors"
              >
                Reload Profiles
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Controls (Responsive Flex Layout) */}
      {deck.length > 0 && (
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-colors shadow-sm"
            title="Undo last swipe"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleSwipeLeft}
            className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md"
            title="Skip"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={handleSwipeRight}
            className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#111] text-white flex items-center justify-center hover:bg-black transition-colors shadow-md"
            title="Match"
          >
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
          </button>

          <Link
            href={`/profile/${currentProfile?.id}`}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            title="View Full Profile"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      )}

      {/* Match Confirmation Modal */}
      <AnimatePresence>
        {matchedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 sm:p-8 max-w-sm w-full text-center border border-gray-200 shadow-xl"
            >
              <div className="w-12 h-12 bg-gray-100 text-black rounded-full flex items-center justify-center mx-auto text-xl mb-3 font-bold border border-gray-200">
                ✓
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Matched with {matchedProfile.name}!
              </h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                {matchedProfile.name} ({matchedProfile.profession}) operates in {matchedProfile.location} starting at {matchedProfile.price}.
              </p>

              <div className="space-y-2.5">
                <Link
                  href={`/profile/${matchedProfile.id}`}
                  onClick={() => setMatchedProfile(null)}
                  className="w-full bg-[#111] text-white py-2.5 px-4 rounded-md font-semibold text-xs hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Message & Hire
                </Link>

                <button
                  onClick={() => setMatchedProfile(null)}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-md font-medium text-xs hover:bg-gray-50 transition-colors"
                >
                  Continue Swiping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
