import React from 'react';
import { 
  Wrench, 
  Flame, 
  Zap, 
  Sparkles, 
  Snowflake, 
  Key, 
  Hammer, 
  HeartHandshake, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryPillsProps {
  onSelectCategory?: (category: string) => void;
}

const CATEGORY_ITEMS = [
  { name: 'Emergency Plumbing', icon: <Wrench size={15} />, color: '#6366F1', bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.3)' },
  { name: 'Heating & Gas Boilers', icon: <Flame size={15} />, color: '#F97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' },
  { name: 'Licensed Electrical', icon: <Zap size={15} />, color: '#EAB308', bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)' },
  { name: 'Eco Deep Cleaning', icon: <Sparkles size={15} />, color: '#57FF9D', bg: 'rgba(87, 255, 157, 0.12)', border: 'rgba(87, 255, 157, 0.3)' },
  { name: 'Winter Snow & Roof Clearance', icon: <Snowflake size={15} />, color: '#7CE2FE', bg: 'rgba(124, 226, 254, 0.12)', border: 'rgba(124, 226, 254, 0.3)' },
  { name: 'Emergency Locksmith', icon: <Key size={15} />, color: '#FF5779', bg: 'rgba(255, 87, 121, 0.12)', border: 'rgba(255, 87, 121, 0.3)' },
  { name: 'General Handyman & Carpentry', icon: <Hammer size={15} />, color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.3)' },
  { name: 'Vetted Childcare & Babysitting', icon: <HeartHandshake size={15} />, color: '#F472B6', bg: 'rgba(244, 114, 182, 0.12)', border: 'rgba(244, 114, 182, 0.3)' }
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({ onSelectCategory }) => {
  return (
    <section className="relative py-24 md:py-32 bg-[#101722] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] opacity-20 blur-[140px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.08em] uppercase text-[#A78BFA]">
            Modular Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F0FF] tracking-[-0.015em] leading-[1.15]">
            One unified network. Every household fix.
          </h2>
          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed max-w-2xl mx-auto">
            Configurable, localized dispatch channels designed to connect Riga residents with certified specialists in under three minutes.
          </p>
        </div>

        {/* Category Pills Row - Scrolling & Wrapping */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-5xl mx-auto">
          {CATEGORY_ITEMS.map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory?.(item.name)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#161E2E] hover:bg-[#1C2638] text-[#F9F0FF] border transition-all duration-200 shadow-md group"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:rotate-6"
                style={{ backgroundColor: item.bg, color: item.color, border: `1px solid ${item.border}` }}
              >
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#F9F0FF]">
                {item.name}
              </span>
              <ChevronRight size={14} className="text-[#6B7A90] group-hover:text-white transition-colors" />
            </motion.button>
          ))}
        </div>

        {/* Assurance footnote */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-[#A0AEC0]">
          <ShieldCheck size={16} className="text-[#57FF9D]" />
          <span>Every trade is backed by our Latvian verified identity check & 100% arrival guarantee</span>
        </div>

      </div>
    </section>
  );
};
