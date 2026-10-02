import React from 'react';
import { Clock, Ghost, ShieldAlert, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProblemSection: React.FC<{ t: any }> = ({ t }) => {
  const problems = [
    {
      icon: <Clock className="w-6 h-6 text-[#FF5779]" />,
      badge: "High Latency",
      title: t.problem_1_title,
      description: t.problem_1_desc
    },
    {
      icon: <Ghost className="w-6 h-6 text-[#A78BFA]" />,
      badge: "Zero Accountability",
      title: t.problem_2_title,
      description: t.problem_2_desc
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#7CE2FE]" />,
      badge: "Safety Risk",
      title: t.problem_3_title,
      description: t.problem_3_desc
    }
  ];

  return (
    <section className="relative py-28 md:py-36 bg-[#101722] overflow-hidden border-t border-white/[0.06]">
      {/* Soft atmospheric radial gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-25 blur-[140px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255, 87, 121, 0.35) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 75%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.08em] uppercase text-[#FF5779]">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F0FF] tracking-[-0.015em] leading-[1.15]">
            {t.problem_title}
          </h2>
          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed max-w-2xl mx-auto">
            {t.problem_desc}
          </p>
        </div>

        {/* Content Grid: Side-by-side Comparison & Problem Cards */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Before / After Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#161E2E] rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              <div className="space-y-6">
                
                {/* The Old Way */}
                <div className="p-5 rounded-2xl bg-[#101722]/80 border border-white/[0.05] relative opacity-75">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5779] flex items-center gap-1.5">
                      <XCircle size={14} />
                      {t.problem_old_way}
                    </span>
                    <span className="text-[11px] text-[#6B7A90]">Legacy Classifieds</span>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#1C2638] flex-shrink-0 overflow-hidden grayscale border border-white/[0.1]">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Ghosted avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 bg-[#1C2638]/60 p-3.5 rounded-xl border border-white/[0.04]">
                      <p className="text-sm text-[#A0AEC0]">{t.problem_old_msg}</p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#FF5779]">{t.problem_old_status}</span>
                        <span className="text-[10px] text-[#6B7A90]">ss.lv listing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transition Indicator */}
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#1C2638] border border-white/[0.1] flex items-center justify-center text-[#A0AEC0]">
                    <ArrowDown size={16} />
                  </div>
                </div>

                {/* The MeisterMatch Way */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1C2638] to-[#161E2E] border border-[#6366F1]/30 shadow-[0_0_30px_rgba(99,102,241,0.15)] relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#57FF9D] flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      {t.problem_new_way}
                    </span>
                    <span className="text-[11px] text-[#57FF9D] bg-[#57FF9D]/10 px-2 py-0.5 rounded-full font-medium">Under 3 Mins</span>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#57FF9D] p-0.5 flex-shrink-0 shadow-md">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Verified Meister avatar" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex-1 bg-[#101722]/80 p-3.5 rounded-xl border border-white/[0.08]">
                      <p className="text-sm font-medium text-[#F9F0FF]">{t.problem_new_msg}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-[#57FF9D]/15 text-[#57FF9D] border border-[#57FF9D]/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Identity Verified
                        </span>
                        <span className="bg-[#6366F1]/15 text-[#A78BFA] border border-[#6366F1]/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          4.9 ★ (142 fixes)
                        </span>
                        <span className="bg-[#7CE2FE]/15 text-[#7CE2FE] border border-[#7CE2FE]/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Centrs • 1.2km
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Problem Cards with Deep Surface */}
          <div className="lg:col-span-6 space-y-5">
            {problems.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-[#161E2E] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 hover:-translate-y-0.5 flex items-start gap-5 shadow-lg group"
              >
                <div className="p-3.5 rounded-xl bg-[#1C2638] border border-white/[0.06] group-hover:scale-105 transition-transform flex-shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#F9F0FF]">{item.title}</h3>
                    <span className="text-[10px] text-[#A0AEC0] bg-white/[0.06] px-2 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#A0AEC0] leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};