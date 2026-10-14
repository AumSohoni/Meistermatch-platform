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
  Sparkles,
  Zap,
  Phone,
  Euro,
  ArrowRight
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
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const opacity = useTransform(x, [-250, -120, 0, 120, 250], [0.4, 1, 1, 1, 0.4]);

  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1]);

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
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 12 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden cursor-grab active:cursor-grabbing select-none ${
        !isTop ? "pointer-events-none opacity-85" : ""
      }`}
    >
      {/* Photo Header */}
      <div className="relative h-60 sm:h-72 w-full bg-gray-900">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Swipe Indicators */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-5 left-5 border-2 border-emerald-400 bg-emerald-500/90 backdrop-blur-md text-white font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg rotate-[-8deg] shadow-lg flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-white" /> MATCH
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-5 right-5 border-2 border-rose-400 bg-rose-500/90 backdrop-blur-md text-white font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg rotate-[8deg] shadow-lg flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> SKIP
            </motion.div>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {profile.verified && (
            <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Meister
            </span>
          )}
        </div>

        {/* Name & Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{profile.name}</h2>
            <div className="flex items-center gap-1 text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{profile.rating}</span>
              <span className="text-gray-300 font-normal">({profile.reviews})</span>
            </div>
          </div>
          <p className="text-gray-200 text-xs sm:text-sm font-medium line-clamp-1">{profile.profession}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-4 sm:p-5 space-y-3.5 bg-white">
        {/* Match Rationale / Factors */}
        {profile.matchReasons && profile.matchReasons.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-xs text-emerald-800">
              <span className="font-semibold">AI Match Fit ({profile.matchScore}%):</span>{" "}
              {profile.matchReasons.join(" • ")}
            </div>
          </div>
        )}

        {/* Location & Pricing Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="bg-[#fafafa] border border-gray-200 p-2.5 sm:p-3 rounded-xl">
            <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-gray-700" /> District & Area
            </div>
            <div className="text-xs font-semibold text-gray-900 leading-tight">
              {profile.location}
            </div>
            <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 line-clamp-1">{profile.coverage}</div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-2.5 sm:p-3 rounded-xl">
            <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <Euro className="w-3.5 h-3.5 text-gray-700" /> Standard Rate
            </div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">
              €{profile.hourly_rate_eur} / hr
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
          {profile.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1 font-medium text-gray-700 text-[11px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Replies in {profile.responseRate}
          </span>
          <Link
            href={`/profile/${profile.id}`}
            className="text-black font-semibold hover:underline flex items-center gap-1 text-[11px] sm:text-xs"
          >
            View Full Profile <ExternalLink className="w-3 h-3" />
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
    <div className="min-h-[85vh] py-6 sm:py-8 px-4 flex flex-col items-center justify-between max-w-7xl mx-auto">
      {/* Top Banner & Quick Navigation */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center sm:text-left">
            Direct Match Deck
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 text-center sm:text-left">
            Swipe right to match & unlock direct contact • Left to pass
          </p>
        </div>
        
        <Link
          href="/chat"
          className="bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Matches ({activeMatchesCount})</span>
        </Link>
      </div>

      {/* Card Stack Container */}
      <div className="w-full max-w-sm sm:max-w-md min-h-[500px] sm:min-h-[540px] relative flex items-center justify-center grid px-2 sm:px-0">
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
              className="bg-white p-8 rounded-2xl border border-gray-200 text-center max-w-sm w-full space-y-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-gray-900">Deck Complete!</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                You have reviewed all available tradespeople for today. Check your matched chats to discuss project details.
              </p>
              <div className="pt-2 space-y-2">
                <Link
                  href="/chat"
                  className="w-full bg-[#111] text-white py-2.5 rounded-lg font-semibold text-xs hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> View Matched Chats
                </Link>
                <button
                  onClick={handleReset}
                  className="w-full bg-gray-50 text-gray-700 py-2.5 rounded-lg font-semibold text-xs hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  Reset Deck
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Controls */}
      {deck.length > 0 && (
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-colors shadow-sm"
            title="Undo last swipe"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleSwipeLeft}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md hover:scale-105 active:scale-95"
            title="Pass (Left)"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500" />
          </button>

          <button
            onClick={handleSwipeRight}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg hover:scale-105 active:scale-95"
            title="Match (Right)"
          >
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
          </button>

          <Link
            href={`/profile/${currentProfile?.id}`}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            title="Full Details"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center border border-gray-200 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />
              
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
                <Heart className="w-8 h-8 fill-emerald-500 text-emerald-500" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                It's a Match!
              </h2>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                You and <strong className="text-gray-800">{matchedRecord.tradesperson.name}</strong> both expressed interest. Direct messaging is now unlocked!
              </p>

              <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl mb-5 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-medium">Trade:</span>
                  <span className="capitalize font-semibold">{matchedRecord.tradesperson.trade}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-medium">Hourly Rate:</span>
                  <span className="font-semibold">€{matchedRecord.tradesperson.hourly_rate_eur}/hr</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-medium">Location:</span>
                  <span>{matchedRecord.tradesperson.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/chat?matchId=${matchedRecord.id}`}
                  className="w-full bg-black text-white py-3 px-4 rounded-xl font-semibold text-xs hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> Open Chat Room <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => setMatchedRecord(null)}
                  className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium text-xs hover:bg-gray-50 transition-colors"
                >
                  Keep Swiping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
