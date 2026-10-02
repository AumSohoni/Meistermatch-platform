import React from 'react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC<{ t: any }> = ({ t }) => {
  const steps = [
    { num: "01", title: t.step_1_title, desc: t.step_1_desc, tag: "Intake" },
    { num: "02", title: t.step_2_title, desc: t.step_2_desc, tag: "Matching" },
    { num: "03", title: t.step_3_title, desc: t.step_3_desc, tag: "Execution" }
  ];

  return (
    <section id="how-it-works" className="relative py-28 md:py-36 bg-[#101722] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] opacity-15 blur-[140px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.08em] uppercase text-[#6366F1]">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F0FF] tracking-[-0.015em] leading-[1.15]">
            {t.how_title}
          </h2>
          <p className="text-base sm:text-lg text-[#A0AEC0] max-w-2xl mx-auto leading-relaxed">
            A frictionless three-step flow connecting your emergency with an authorized Riga trade master.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-8 text-left relative">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#161E2E] p-8 rounded-3xl border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col items-start group relative shadow-xl"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1C2638] border border-[#6366F1]/30 flex items-center justify-center font-bold text-[#6366F1] text-xl shadow-inner group-hover:scale-105 group-hover:border-[#6366F1] transition-all">
                  {step.num}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A0AEC0] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F9F0FF] mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#A0AEC0] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};