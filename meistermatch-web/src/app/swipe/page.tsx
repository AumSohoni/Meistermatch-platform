"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  CheckCircle2,
  RotateCcw,
  Heart,
  X,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Phone,
  Euro,
  ArrowRight,
  SlidersHorizontal
} from "lucide-react";
import Link from "next/link";
import {
  TRADESPEOPLE,
  Tradesperson,
  MatchRecord,
  recordSwipe,
  getStoredMatches
} from "../lib/tradesStore";

function SwipeCard({
  profile,
  isTop,
  onSwipeRight,
  onSwipeLeft,
}: {
  profile: Tradesperson;
  isTop: boolean;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-10, 10]);
  const opacity = useTransform(x, [-220, -100, 0, 100, 220], [0.6, 1, 1, 1, 0.6]);

  const likeOpacity = useTransform(x, [20, 90], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -90], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 90) {
      onSwipeRight();
    } else if (info.offset.x < -90) {
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
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      animate={{ scale: isTop ? 1 : 0.97, y: isTop ? 0 : 8 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={`w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden select-none cursor-grab active:cursor-grabbing ${
        !isTop ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Photo Header */}
      <div className="relative h-60 sm:h-64 w-full bg-gray-100">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Swipe Badge Overlays */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-4 left-4 bg-black text-white font-semibold text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-md border border-white/20"
            >
              <Heart className="w-3.5 h-3.5 fill-white" /> CONNECT
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-4 right-4 bg-white text-gray-800 font-semibold text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-md border border-gray-300"
            >
              <X className="w-3.5 h-3.5" /> SKIP
            </motion.div>
          </>
        )}

        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 border border-gray-200 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-900" /> Verified Meister
            </span>
          </div>
        )}

        {/* Profile Identity on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-xl font-bold tracking-tight text-white">{profile.name}</h2>
            <div className="flex items-center gap-1 text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">
              <Star className="w-3 h-3 fill-white text-white" />
              <span>{profile.rating}</span>
              <span className="text-gray-200 font-normal">({profile.reviews})</span>
            </div>
          </div>
          <p className="text-gray-200 text-xs font-medium line-clamp-1">{profile.profession}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-4 sm:p-5 space-y-3.5 bg-white">
        {/* Key Highlights */}
        {profile.highlights && profile.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {profile.highlights.map((h, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-[#fafafa] text-gray-700 px-2.5 py-1 rounded border border-gray-200"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Location & Pricing Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#fafafa] border border-gray-200 p-2.5 rounded-lg">
            <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-gray-700" /> Location & Area
            </div>
            <div className="text-xs font-semibold text-gray-900 leading-tight">
              {profile.location}
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5 truncate">{profile.coverage}</div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-2.5 rounded-lg">
            <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <Euro className="w-3.5 h-3.5 text-gray-700" /> Hourly Rate
            </div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">
              €{profile.hourly_rate_eur} / hr
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5 truncate">{profile.estProject}</div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
          {profile.bio}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1 font-medium text-gray-700 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-900" /> Replies in {profile.responseRate}
          </span>
          <Link
            href={`/profile/${profile.id}`}
            className="text-black font-semibold hover:underline flex items-center gap-1 text-[11px]"
          >
            View Profile <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipePage() {
  const [deck, setDeck] = useState<Tradesperson[]>(TRADESPEOPLE);
  const [history, setHistory] = useState<Tradesperson[]>([]);
  const [matchedRecord, setMatchedRecord] = useState<MatchRecord | null>(null);
  const [activeMatchesCount, setActiveMatchesCount] = useState<number>(0);

  useEffect(() => {
    setActiveMatchesCount(getStoredMatches().length);
  }, [matchedRecord]);

  const currentProfile = deck[0];

  const handleSwipeRight = () => {
    if (!currentProfile) return;
    const match = recordSwipe(currentProfile.id, "like");
    if (match) {
      setMatchedRecord(match);
    }
    setHistory((prev) => [currentProfile, ...prev]);
    setDeck((prev) => prev.slice(1));
  };

  const handleSwipeLeft = () => {
    if (!currentProfile) return;
    recordSwipe(currentProfile.id, "pass");
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
    setDeck(TRADESPEOPLE);
    setHistory([]);
    setMatchedRecord(null);
  };

  return (
    <div className="min-h-[82vh] py-8 sm:py-10 px-4 flex flex-col items-center justify-between max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="w-full max-w-md flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Swipe Mode
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Connect with local tradespeople in Latvia
          </p>
        </div>
        
        <Link
          href="/chat"
          className="bg-white border border-gray-300 text-gray-800 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 hover:bg-gray-50 transition-colors shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Matches ({activeMatchesCount})</span>
        </Link>
      </div>

      {/* Card Stack Container */}
      <div className="w-full max-w-sm sm:max-w-md min-h-[490px] relative flex items-center justify-center grid px-2 sm:px-0">
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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#fafafa] p-8 rounded-xl border border-gray-200 text-center max-w-sm w-full space-y-4 shadow-xs"
            >
              <h3 className="text-lg font-bold text-gray-900">All Profiles Reviewed</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                You have reached the end of the available deck. Check your matched conversations or reload profiles.
              </p>
              <div className="pt-2 space-y-2">
                <Link
                  href="/chat"
                  className="w-full bg-[#111] text-white py-2.5 rounded-md font-semibold text-xs hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> View Matched Conversations
                </Link>
                <button
                  onClick={handleReset}
                  className="w-full bg-white text-gray-700 py-2.5 rounded-md font-medium text-xs hover:bg-gray-50 transition-colors border border-gray-300"
                >
                  Reload Profiles
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      {deck.length > 0 && (
        <div className="flex items-center justify-center gap-5 mt-6 sm:mt-8">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="w-11 h-11 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-colors shadow-xs"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSwipeLeft}
            className="w-14 h-14 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            title="Pass"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handleSwipeRight}
            className="w-14 h-14 rounded-full bg-[#111] text-white flex items-center justify-center hover:bg-black transition-colors shadow-sm"
            title="Connect"
          >
            <Heart className="w-6 h-6 fill-white" />
          </button>

          <Link
            href={`/profile/${currentProfile?.id}`}
            className="w-11 h-11 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-xs"
            title="Full Details"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Match Confirmation Modal */}
      <AnimatePresence>
        {matchedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="bg-white rounded-xl p-6 sm:p-8 max-w-sm w-full text-center border border-gray-200 shadow-xl"
            >
              <div className="w-12 h-12 bg-gray-100 text-black rounded-full flex items-center justify-center mx-auto text-xl mb-3 font-bold border border-gray-200">
                ✓
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Connected with {matchedRecord.tradesperson.name}
              </h2>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                {matchedRecord.tradesperson.name} ({matchedRecord.tradesperson.profession}) is available in {matchedRecord.tradesperson.location} starting at €{matchedRecord.tradesperson.hourly_rate_eur}/hr.
              </p>

              <div className="space-y-2.5">
                <Link
                  href={`/chat?matchId=${matchedRecord.id}`}
                  className="w-full bg-[#111] text-white py-2.5 px-4 rounded-md font-semibold text-xs hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Open Conversation
                </Link>

                <button
                  onClick={() => setMatchedRecord(null)}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-md font-medium text-xs hover:bg-gray-50 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
