import React, { useState } from 'react';
import { useMarketplace } from '../marketplaceStore';

export const SwipeDeck: React.FC<{ jobId: string }> = ({ jobId }) => {
  const { jobs, rankedMeistersForJob, recordSwipe, matches } = useMarketplace();
  const [notice, setNotice] = useState<string | null>(null);
  const job = jobs.find(j => j.id === jobId);
  const deck = rankedMeistersForJob(jobId);
  const match = matches.find(m => m.jobId === jobId && m.active);

  if (!job) return <p className="text-[#A0AEC0]">Select a job to start swiping.</p>;

  const swipe = (meisterId: string, dir: 'like' | 'pass') => {
    const m = recordSwipe(jobId, meisterId, 'customer', dir);
    if (m) setNotice(`Mutual match with ${deck.find(d => d.meister.id === meisterId)?.meister.name}. Chat unlocked in tracker.`);
    else if (dir === 'like') setNotice('Liked. Waiting for the Meister to like this job back.');
    else setNotice(null);
    if (dir === 'like') {
      const auto = deck.find(d => d.meister.id === meisterId)?.meister;
      if (auto && auto.isOnline && auto.category.toLowerCase() === job.category.toLowerCase()) {
        const mm = recordSwipe(jobId, meisterId, 'employer', 'like');
        if (mm) setNotice(`Mutual match with ${auto.name}. Chat unlocked in tracker.`);
      }
    }
  };

  return (
    <div className="space-y-4">
      {match && (
        <div className="bg-[#57FF9D]/10 border border-[#57FF9D]/30 rounded-2xl p-4" role="status">
          <p className="font-semibold text-[#57FF9D]">Matched, score {match.score}/100</p>
          <ul className="text-sm text-[#A0AEC0] mt-1 list-disc pl-5">
            {match.reasons.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
      {notice && !match && <p className="text-sm text-[#A0AEC0]" role="status">{notice}</p>}
      {deck.length === 0 && <p className="text-[#A0AEC0]">No more profiles. Post a new job or reset demo data.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {deck.slice(0, 6).map(({ meister, score, reasons }) => (
          <article key={meister.id} className="bg-[#161E2E] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{meister.name}</h3>
                <p className="text-sm text-[#A0AEC0]">{meister.category} in {meister.district} | {meister.distanceKm.toFixed(1)} km | {meister.hourlyRate} EUR/hr</p>
              </div>
              <span className="text-sm font-bold px-2.5 py-1 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#A78BFA]">{score}</span>
            </div>
            <ul className="text-sm text-[#A0AEC0] mt-3 list-disc pl-5 space-y-0.5">
              {reasons.slice(0, 3).map((r, i) => <li key={i}>{r}</li>)}
            </ul>
            <div className="flex gap-2 mt-4">
              <button onClick={() => swipe(meister.id, 'pass')} aria-label={`Pass on ${meister.name}`} className="flex-1 py-2.5 rounded-full border border-white/15 text-[#A0AEC0] min-h-[44px]">Pass</button>
              <button onClick={() => swipe(meister.id, 'like')} aria-label={`Like ${meister.name}`} className="flex-1 py-2.5 rounded-full bg-[#6366F1] text-white font-semibold min-h-[44px]">Like</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
