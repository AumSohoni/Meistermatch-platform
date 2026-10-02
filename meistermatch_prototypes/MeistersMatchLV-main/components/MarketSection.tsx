import React from 'react';

export const MarketSection: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section id="market" className="py-20 md:py-28 bg-[#101722] border-t border-white/10">
      <div className="mx-auto px-4 md:px-8 max-w-7xl">
        <p className="text-sm font-semibold tracking-wide text-[#7CE2FE]">Prototype status</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F0FF] tracking-tight mt-2 max-w-2xl">
          What this prototype proves, and what it does not
        </h2>
        <p className="text-base text-[#A0AEC0] max-w-2xl mt-3">{t.market_desc}</p>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-[#161E2E] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold">Reciprocal matching works</h3>
            <p className="text-sm text-[#A0AEC0] mt-2">A job is assigned only when customer and Meister both like it. Every match carries scored reasons.</p>
          </div>
          <div className="bg-[#161E2E] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold">Demo data only</h3>
            <p className="text-sm text-[#A0AEC0] mt-2">6 Riga Meisters and 2 demo jobs ship locally. No real users, no labour-market claims.</p>
          </div>
          <div className="bg-[#161E2E] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold">Human stays in charge</h3>
            <p className="text-sm text-[#A0AEC0] mt-2">Swipes are expressions of interest, not hiring decisions, in line with EU AI Act oversight duties.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
