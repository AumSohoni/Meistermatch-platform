import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JobRequestForm } from './JobRequestForm';
import { INITIAL_MEISTERS } from '../marketplaceStore';

const TICKET_MEISTER = INITIAL_MEISTERS[0];

export const Hero: React.FC<{ t: any, language: string, onLaunchApp?: () => void }> = ({ t, onLaunchApp }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);

  return (
    <section className="relative bg-[#101722] pt-28 pb-16 md:pt-36 md:pb-24">
      {showRequestForm && <JobRequestForm onClose={() => setShowRequestForm(false)} />}
      <div className="mx-auto px-4 md:px-8 max-w-7xl grid lg:grid-cols-12 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <p className="text-sm font-semibold text-[#57FF9D]">Riga, Latvia. Prototype with demo data.</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-[#F9F0FF] leading-[1.06] tracking-[-0.02em] mt-3">
            {t.hero_title_1} {t.hero_title_highlight} {t.hero_title_2}
          </h1>
          <p className="text-base sm:text-lg text-[#A0AEC0] max-w-xl leading-[1.65] mt-5">
            {t.hero_desc}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-7">
            <button
              onClick={() => setShowRequestForm(true)}
              className="px-7 py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold transition-colors min-h-[44px]"
            >
              Post a job
            </button>
            {onLaunchApp && (
              <button
                onClick={onLaunchApp}
                className="px-7 py-3 rounded-xl bg-transparent text-[#F9F0FF] border border-white/20 text-sm font-semibold transition-colors min-h-[44px]"
              >
                Run the simulation
              </button>
            )}
          </div>
          <dl className="grid grid-cols-3 gap-4 max-w-xl mt-10 border-t border-white/10 pt-6">
            <div>
              <dt className="text-xs text-[#6B7A90]">Matching</dt>
              <dd className="text-[#F9F0FF] font-semibold mt-1">Mutual like only</dd>
            </div>
            <div>
              <dt className="text-xs text-[#6B7A90]">Ranking</dt>
              <dd className="text-[#F9F0FF] font-semibold mt-1">Scored with reasons</dd>
            </div>
            <div>
              <dt className="text-xs text-[#6B7A90]">Languages</dt>
              <dd className="text-[#F9F0FF] font-semibold mt-1">LV, RU, EN</dd>
            </div>
          </dl>
        </motion.div>

        <div className="lg:col-span-5">
          <article aria-label="Example work order" className="bg-[#161E2E] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-dashed border-white/15">
              <span className="text-xs font-semibold tracking-widest text-[#A0AEC0]">WORK ORDER 001</span>
              <span className="text-xs font-semibold text-[#57FF9D]">MATCHED 92/100</span>
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg">Kitchen pipe leak, Centrs</h2>
              <p className="text-sm text-[#A0AEC0] mt-1">Emergency. {TICKET_MEISTER.name}, {TICKET_MEISTER.distanceKm.toFixed(1)} km away, {TICKET_MEISTER.hourlyRate} EUR/hr.</p>
              <ul className="text-sm text-[#A0AEC0] mt-4 space-y-1.5 list-disc pl-5">
                <li>Trade matches the job category</li>
                <li>Same district (Centrs)</li>
                <li>Rated {TICKET_MEISTER.rating.toFixed(2)} from {TICKET_MEISTER.reviewsCount} reviews</li>
              </ul>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                <span className="text-sm text-[#6B7A90]">Status</span>
                <span className="text-sm font-semibold text-[#F9F0FF]">Meister en route, 12 min</span>
              </div>
            </div>
          </article>
          <p className="text-xs text-[#6B7A90] mt-3">Example rendered from the demo dataset in the store. Real ranking reasons, no stock photos.</p>
        </div>
      </div>
    </section>
  );
};
