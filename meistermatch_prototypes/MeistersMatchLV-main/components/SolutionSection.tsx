import React from 'react';
import { Smartphone, CheckCircle2, MessageSquare, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const SolutionSection: React.FC<{ t: any }> = ({ t }) => {
  const features = [
    { 
      icon: <Smartphone className="w-6 h-6 text-[#6366F1]" />, 
      title: t.sol_1_title, 
      description: t.sol_1_desc, 
      badge: "Fast Dispatch"
    },
    { 
      icon: <CheckCircle2 className="w-6 h-6 text-[#57FF9D]" />, 
      title: t.sol_2_title, 
      description: t.sol_2_desc, 
      badge: "Certified Only"
    },
    { 
      icon: <MessageSquare className="w-6 h-6 text-[#7CE2FE]" />, 
      title: t.sol_3_title, 
      description: t.sol_3_desc, 
      badge: "LV / RU / EN"
    },
    { 
      icon: <MapPin className="w-6 h-6 text-[#FF5779]" />, 
      title: t.sol_4_title, 
      description: t.sol_4_desc, 
      badge: "Riga Neighborhoods"
    }
  ];

  return (
    <section id="features" className="relative py-28 md:py-36 bg-[#101722] overflow-hidden border-t border-white/[0.06]">
      {/* Subtle atmospheric radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-1/3 right-1/4 w-[600px] h-[500px] opacity-20 blur-[130px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(87, 255, 157, 0.3) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 75%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.08em] uppercase text-[#57FF9D]">
            Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F0FF] tracking-[-0.015em] leading-[1.15]">
            {t.solution_title}
          </h2>
          <p className="text-base sm:text-lg text-[#A0AEC0] max-w-2xl mx-auto leading-relaxed">
            Eliminating guesswork with rigorous vetting, localized geo-matching, and transparent pricing across all Riga districts.
          </p>
        </div>

        {/* Feature Cards Grid (4 columns) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -4 }} 
              transition={{ duration: 0.2 }}
              className="bg-[#161E2E] p-7 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between shadow-lg group relative overflow-hidden"
            >
              {/* Card top badge & icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#1C2638] border border-white/[0.08] flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-[#A0AEC0] bg-white/[0.05] border border-white/[0.06] px-2.5 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-[#F9F0FF] mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#A0AEC0] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom micro-accent */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center text-xs text-[#6B7A90] font-medium">
                <span>Verified System Feature</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};