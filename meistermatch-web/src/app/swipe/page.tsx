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
  Euro,
  Briefcase,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import {
  TRADESPEOPLE,
  Tradesperson,
  MatchRecord,
  recordSwipe,
  getStoredMatches
} from "../lib/tradesStore";
import { SEED_JOBS, JobPosting, recordJobSwipe, getJobApplications } from "../lib/jobsStore";
import { scoreWorkerForClient, scoreJobForWorker } from "../lib/rankerEngine";

/* -------------------------------------------------------------
   CARD 1: TRADESPERSON CARD (Rendered when Client is browsing)
------------------------------------------------------------- */
function WorkerSwipeCard({
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
  const rotate = useTransform(x, [-220, 220], [-8, 8]);
  const opacity = useTransform(x, [-220, -100, 0, 100, 220], [0.65, 1, 1, 1, 0.65]);

  const likeOpacity = useTransform(x, [20, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -80], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 80) {
      onSwipeRight();
    } else if (info.offset.x < -80) {
      onSwipeLeft();
    }
  };

  const rankResult = scoreWorkerForClient(
    profile.skills,
    profile.district,
    profile.availability,
    profile.hourly_rate_eur,
    8,
    ["Circuit Upgrades", "Panel Install", "EV Chargers"],
    "Centrs",
    25
  );

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
      animate={{ scale: isTop ? 1 : 0.98, y: isTop ? 0 : 6 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={`w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden select-none cursor-grab active:cursor-grabbing flex flex-col ${
        !isTop ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Photo Header */}
      <div className="relative h-44 sm:h-52 w-full bg-gray-100 shrink-0">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* AI Match Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1 border border-white/20 shadow-sm">
            AI Match: {rankResult.score}%
          </span>
        </div>

        {/* Swipe Feedback Badges */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-3 left-3 bg-black text-white font-bold text-[11px] px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md border border-white/25 z-20"
            >
              <Heart className="w-3.5 h-3.5 fill-white" /> CONNECT
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-3 right-3 bg-white text-gray-900 font-bold text-[11px] px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md border border-gray-300 z-20"
            >
              <X className="w-3.5 h-3.5" /> SKIP
            </motion.div>
          </>
        )}

        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-3 right-3">
            <span className="bg-white/95 backdrop-blur-xs text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-2xs border border-gray-200">
              <ShieldCheck className="w-3 h-3 text-neutral-900" /> Verified Meister
            </span>
          </div>
        )}

        {/* Name & Trade overlay */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white">
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate">
              {profile.name}
            </h2>
            <div className="flex items-center gap-1 text-[11px] font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded shrink-0">
              <Star className="w-3 h-3 fill-white text-white" />
              <span>{profile.rating}</span>
              <span className="text-gray-200 font-normal">({profile.reviews})</span>
            </div>
          </div>
          <p className="text-gray-200 text-xs font-medium truncate">{profile.profession}</p>
        </div>
      </div>

      {/* Profile Details Container */}
      <div className="p-3.5 sm:p-4 space-y-2 bg-white flex-1 flex flex-col justify-between">
        {/* Factor Progress Bar */}
        <div className="bg-[#fafafa] border border-gray-200 p-2 rounded-lg text-[10px] space-y-1">
          <div className="flex justify-between items-center text-gray-700 font-bold uppercase tracking-wider text-[9px]">
            <span>Ranker Factor Match</span>
            <span className="text-black">{rankResult.score} / 100 pts</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
            <div style={{ width: `${(rankResult.factors.skillPts / 50) * 50}%` }} className="bg-black h-full" title="Skill overlap" />
            <div style={{ width: `${(rankResult.factors.districtPts / 15) * 15}%` }} className="bg-gray-600 h-full" title="Same district" />
            <div style={{ width: `${(rankResult.factors.payPts / 15) * 15}%` }} className="bg-gray-400 h-full" title="Pay fit" />
            <div style={{ width: `${(rankResult.factors.availabilityPts / 10) * 10}%` }} className="bg-gray-300 h-full" title="Availability" />
            <div style={{ width: `${(rankResult.factors.experiencePts / 10) * 10}%` }} className="bg-gray-200 h-full" title="Experience" />
          </div>
          <div className="text-gray-500 truncate italic">
            {rankResult.reasons[0] || "High overall compatibility"}
          </div>
        </div>

        {/* Location & Rate Row */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#fafafa] border border-gray-200 p-2 rounded-lg min-w-0">
            <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <MapPin className="w-3 h-3 text-gray-700 shrink-0" /> District
            </div>
            <div className="font-semibold text-gray-900 text-xs truncate">
              {profile.district}
            </div>
            <div className="text-[10px] text-gray-500 truncate">{profile.coverage}</div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-2 rounded-lg min-w-0">
            <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <Euro className="w-3 h-3 text-gray-700 shrink-0" /> Hourly Rate
            </div>
            <div className="font-bold text-gray-900 text-xs sm:text-sm">
              €{profile.hourly_rate_eur} / hr
            </div>
            <div className="text-[10px] text-gray-500 truncate">{profile.estProject}</div>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1">
          {profile.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-medium truncate max-w-[140px]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Card Footer */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <CheckCircle2 className="w-3 h-3 text-neutral-900" /> Replies {profile.responseRate}
          </span>
          <Link
            href={`/profile/${profile.id}`}
            scroll={false}
            className="text-black font-semibold hover:underline flex items-center gap-1 text-[11px]"
          >
            Details <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------
   CARD 2: JOB VACANCY CARD (Rendered when Meister is browsing)
------------------------------------------------------------- */
function JobSwipeCard({
  job,
  isTop,
  onSwipeRight,
  onSwipeLeft,
}: {
  job: JobPosting;
  isTop: boolean;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-8, 8]);
  const opacity = useTransform(x, [-220, -100, 0, 100, 220], [0.65, 1, 1, 1, 0.65]);

  const likeOpacity = useTransform(x, [20, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -80], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 80) {
      onSwipeRight();
    } else if (info.offset.x < -80) {
      onSwipeLeft();
    }
  };

  const rankResult = scoreJobForWorker(
    job.required_skills,
    job.district,
    job.start_date,
    job.pay_min_eur_h,
    job.pay_max_eur_h
  );

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
      animate={{ scale: isTop ? 1 : 0.98, y: isTop ? 0 : 6 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={`w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden select-none cursor-grab active:cursor-grabbing flex flex-col ${
        !isTop ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Header Banner */}
      <div className="relative bg-[#111] text-white p-4 h-40 sm:h-44 flex flex-col justify-between shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
            {job.employer}
          </span>
          <span className="bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded border border-white/20">
            Fit Score: {rankResult.score}%
          </span>
        </div>

        {/* Swipe Feedback Badges */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-3 left-3 bg-white text-black font-bold text-[11px] px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md border border-gray-300 z-20"
            >
              <Briefcase className="w-3.5 h-3.5 fill-black" /> APPLY
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-3 right-3 bg-neutral-800 text-white font-bold text-[11px] px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md border border-neutral-700 z-20"
            >
              <X className="w-3.5 h-3.5" /> SKIP
            </motion.div>
          </>
        )}

        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-white line-clamp-2">
            {job.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-400" /> {job.location}
            </span>
            <span>•</span>
            <span className="capitalize">{job.trade}</span>
          </div>
        </div>
      </div>

      {/* Vacancy Details Container */}
      <div className="p-3.5 sm:p-4 space-y-2.5 bg-white flex-1 flex flex-col justify-between">
        {/* Factor Breakdown */}
        <div className="bg-[#fafafa] border border-gray-200 p-2 rounded-lg text-[10px] space-y-1">
          <div className="flex justify-between items-center text-gray-700 font-bold uppercase tracking-wider text-[9px]">
            <span>Algorithm Match Breakdown</span>
            <span className="text-black">{rankResult.score} / 100 pts</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
            <div style={{ width: `${(rankResult.factors.skillPts / 50) * 50}%` }} className="bg-black h-full" title="Skill match" />
            <div style={{ width: `${(rankResult.factors.districtPts / 15) * 15}%` }} className="bg-gray-600 h-full" title="District" />
            <div style={{ width: `${(rankResult.factors.payPts / 15) * 15}%` }} className="bg-gray-400 h-full" title="Pay match" />
            <div style={{ width: `${(rankResult.factors.availabilityPts / 10) * 10}%` }} className="bg-gray-300 h-full" title="Schedule" />
            <div style={{ width: `${(rankResult.factors.experiencePts / 10) * 10}%` }} className="bg-gray-200 h-full" title="Qualification" />
          </div>
          <div className="text-gray-500 truncate italic">
            {rankResult.reasons[0] || "High compensation alignment"}
          </div>
        </div>

        {/* Rate & Start Schedule */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#fafafa] border border-gray-200 p-2 rounded-lg min-w-0">
            <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <Euro className="w-3 h-3 text-gray-700 shrink-0" /> Offered Pay
            </div>
            <div className="font-bold text-gray-900 text-xs sm:text-sm">
              €{job.pay_min_eur_h}–€{job.pay_max_eur_h}/hr
            </div>
            <div className="text-[10px] text-gray-500 truncate">Paid bi-weekly</div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-2 rounded-lg min-w-0">
            <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1 mb-0.5">
              <Clock className="w-3 h-3 text-gray-700 shrink-0" /> Timeline
            </div>
            <div className="font-semibold text-gray-900 text-xs truncate">
              {job.start_date}
            </div>
            <div className="text-[10px] text-gray-500 truncate">{job.duration}</div>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-[11px] sm:text-xs text-gray-600 leading-snug line-clamp-2">
          {job.description}
        </p>

        {/* Required Skills */}
        <div className="flex flex-wrap gap-1">
          {job.required_skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded font-medium truncate max-w-[140px]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Trial Shift Terms */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1 font-semibold text-gray-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" /> {job.trial_shift_hours}-hour paid trial shift
          </span>
          <span className="text-[10px] text-gray-400">Latvia Verified Employer</span>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------
   MAIN SWIPE PAGE COMPONENT
------------------------------------------------------------- */
export default function SwipePage() {
  const [currentUser, setCurrentUser] = useState<{ name: string; role?: "client" | "worker" } | null>(null);

  // Deck states
  const [workerDeck, setWorkerDeck] = useState<Tradesperson[]>(TRADESPEOPLE);
  const [jobDeck, setJobDeck] = useState<JobPosting[]>(SEED_JOBS);
  const [history, setHistory] = useState<any[]>([]);
  
  // Match states
  const [matchedRecord, setMatchedRecord] = useState<MatchRecord | null>(null);
  const [appliedJob, setAppliedJob] = useState<JobPosting | null>(null);
  const [activeMatchesCount, setActiveMatchesCount] = useState<number>(0);

  useEffect(() => {
    const raw = localStorage.getItem("meister_user");
    if (raw) {
      try {
        setCurrentUser(JSON.parse(raw));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    setActiveMatchesCount(getStoredMatches().length);
  }, [matchedRecord]);

  const isMeister = currentUser?.role === "worker";

  /* Client browsing workers actions */
  const currentWorker = workerDeck[0];
  const handleClientSwipeRight = () => {
    if (!currentWorker) return;
    const match = recordSwipe(currentWorker.id, "like");
    if (match) setMatchedRecord(match);
    setHistory((prev) => [currentWorker, ...prev]);
    setWorkerDeck((prev) => prev.slice(1));
  };
  const handleClientSwipeLeft = () => {
    if (!currentWorker) return;
    recordSwipe(currentWorker.id, "pass");
    setHistory((prev) => [currentWorker, ...prev]);
    setWorkerDeck((prev) => prev.slice(1));
  };

  /* Meister browsing employer jobs actions */
  const currentJob = jobDeck[0];
  const handleWorkerSwipeRight = () => {
    if (!currentJob) return;
    const applied = recordJobSwipe(currentJob.id, "like");
    if (applied) setAppliedJob(applied);
    setHistory((prev) => [currentJob, ...prev]);
    setJobDeck((prev) => prev.slice(1));
  };
  const handleWorkerSwipeLeft = () => {
    if (!currentJob) return;
    recordJobSwipe(currentJob.id, "pass");
    setHistory((prev) => [currentJob, ...prev]);
    setJobDeck((prev) => prev.slice(1));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[0];
    setHistory((prev) => prev.slice(1));
    if (isMeister) {
      setJobDeck((prev) => [last, ...prev]);
    } else {
      setWorkerDeck((prev) => [last, ...prev]);
    }
  };

  const handleReset = () => {
    if (isMeister) {
      setJobDeck(SEED_JOBS);
    } else {
      setWorkerDeck(TRADESPEOPLE);
    }
    setHistory([]);
    setMatchedRecord(null);
    setAppliedJob(null);
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] py-3 sm:py-6 px-3 sm:px-4 flex flex-col items-center justify-between max-w-lg mx-auto">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between gap-3 mb-2 sm:mb-4 px-1">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-200">
              {isMeister ? "Meister Mode" : "Client Mode"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight mt-0.5">
            {isMeister ? "Job Vacancies Deck" : "Skilled Trades Deck"}
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500">
            {isMeister
              ? "Swipe right to apply for employer jobs in Latvia"
              : "Swipe right to connect with vetted tradespeople"}
          </p>
        </div>
        
        <Link
          href="/chat"
          scroll={false}
          className="bg-white border border-gray-300 text-gray-800 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-50 transition-colors shadow-2xs shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Messages ({activeMatchesCount})</span>
        </Link>
      </div>

      {/* Card Stack Container */}
      <div className="w-full relative flex items-center justify-center grid min-h-[380px] sm:min-h-[420px]">
        <AnimatePresence>
          {isMeister ? (
            /* MEISTER SWIPING JOBS */
            jobDeck.length > 0 ? (
              jobDeck.slice(0, 2).map((job, index) => (
                <JobSwipeCard
                  key={job.id}
                  job={job}
                  isTop={index === 0}
                  onSwipeRight={handleWorkerSwipeRight}
                  onSwipeLeft={handleWorkerSwipeLeft}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#fafafa] p-6 sm:p-8 rounded-xl border border-gray-200 text-center max-w-sm w-full space-y-4 shadow-xs"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900">All Vacancies Reviewed</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You have reviewed all current job vacancies in your district. Reload deck or check your applications.
                </p>
                <div className="pt-2 space-y-2">
                  <Link
                    href="/meister-portal"
                    scroll={false}
                    className="w-full bg-[#111] text-white py-2.5 rounded-md font-semibold text-xs hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Briefcase className="w-3.5 h-3.5" /> View Submitted Applications
                  </Link>
                  <button
                    onClick={handleReset}
                    className="w-full bg-white text-gray-700 py-2.5 rounded-md font-medium text-xs hover:bg-gray-50 transition-colors border border-gray-300"
                  >
                    Reload Vacancies
                  </button>
                </div>
              </motion.div>
            )
          ) : (
            /* CLIENT SWIPING TRADESPEOPLE */
            workerDeck.length > 0 ? (
              workerDeck.slice(0, 2).map((profile, index) => (
                <WorkerSwipeCard
                  key={profile.id}
                  profile={profile}
                  isTop={index === 0}
                  onSwipeRight={handleClientSwipeRight}
                  onSwipeLeft={handleClientSwipeLeft}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#fafafa] p-6 sm:p-8 rounded-xl border border-gray-200 text-center max-w-sm w-full space-y-4 shadow-xs"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900">All Trades Reviewed</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You have reviewed all available tradespeople in your radius.
                </p>
                <div className="pt-2 space-y-2">
                  <Link
                    href="/chat"
                    scroll={false}
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
            )
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      {((isMeister && jobDeck.length > 0) || (!isMeister && workerDeck.length > 0)) && (
        <div className="w-full flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-5 mb-1">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 active:scale-95 disabled:opacity-30 transition-all shadow-xs"
            title="Undo"
            aria-label="Undo last action"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* DISLIKE / PASS BUTTON */}
          <button
            onClick={isMeister ? handleWorkerSwipeLeft : handleClientSwipeLeft}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all shadow-sm"
            title="Pass"
            aria-label="Pass / Skip"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 stroke-[2.5]" />
          </button>

          {/* LIKE / APPLY BUTTON */}
          <button
            onClick={isMeister ? handleWorkerSwipeRight : handleClientSwipeRight}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#111] hover:bg-black text-white flex items-center justify-center active:scale-90 transition-all shadow-md border border-black"
            title={isMeister ? "Apply to Job" : "Connect with Meister"}
            aria-label="Connect or Apply"
          >
            {isMeister ? (
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-[1.5]" />
            ) : (
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-[2]" />
            )}
          </button>

          <Link
            href={isMeister ? "/meister-portal" : `/profile/${currentWorker?.id || ""}`}
            scroll={false}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all shadow-xs"
            title="Details & Profile"
            aria-label="Details"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* MODAL 1: CLIENT CONNECTED WITH WORKER */}
      <AnimatePresence>
        {matchedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-5 sm:p-7 max-w-sm w-full text-center border border-gray-200 shadow-xl"
            >
              <div className="w-11 h-11 bg-gray-100 text-black rounded-full flex items-center justify-center mx-auto text-lg mb-3 font-bold border border-gray-200">
                ✓
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                Connected with {matchedRecord.tradesperson.name}
              </h2>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                {matchedRecord.tradesperson.name} ({matchedRecord.tradesperson.profession}) is ready to discuss your job starting at €{matchedRecord.tradesperson.hourly_rate_eur}/hr.
              </p>
              <div className="space-y-2">
                <Link
                  href={`/chat?matchId=${matchedRecord.id}`}
                  scroll={false}
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

      {/* MODAL 2: MEISTER APPLIED TO JOB */}
      <AnimatePresence>
        {appliedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-5 sm:p-7 max-w-sm w-full text-center border border-gray-200 shadow-xl"
            >
              <div className="w-11 h-11 bg-neutral-100 text-black rounded-full flex items-center justify-center mx-auto text-lg mb-3 font-bold border border-gray-200">
                ✓
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                Job Application Submitted!
              </h2>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                You applied to <strong>{appliedJob.employer}</strong> for <em>{appliedJob.title}</em> (€{appliedJob.pay_min_eur_h}–€{appliedJob.pay_max_eur_h}/hr). Employer has been notified.
              </p>
              <div className="space-y-2">
                <Link
                  href="/chat"
                  scroll={false}
                  className="w-full bg-[#111] text-white py-2.5 px-4 rounded-md font-semibold text-xs hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Message Employer
                </Link>
                <button
                  onClick={() => setAppliedJob(null)}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-md font-medium text-xs hover:bg-gray-50 transition-colors"
                >
                  Next Vacancy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
