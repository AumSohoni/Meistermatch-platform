import React from 'react';
import { 
  Radio, 
  ShieldCheck, 
  Navigation, 
  Clock, 
  CheckCircle, 
  MapPin, 
  SlidersHorizontal, 
  CreditCard,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductShowcase: React.FC<{ onLaunchApp?: () => void }> = ({ onLaunchApp }) => {
  return (
    <section className="relative py-28 md:py-36 bg-[#101722] border-t border-white/[0.06] overflow-hidden">
      
      {/* Atmospheric radial lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-25 blur-[160px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(124, 226, 254, 0.25) 50%, transparent 75%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.08em] uppercase text-[#7CE2FE]">
            Interactive Platform
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F0FF] tracking-[-0.015em] leading-[1.15]">
            Engineered for instantaneous delivery.
          </h2>
          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed max-w-2xl mx-auto">
            From emergency intake to GPS dispatch, live telemetry, and instant escrow settlement—see the platform in action.
          </p>
        </div>

        {/* Floating Collage Grid (Section 6.6 from DESIGN.md) */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Card 1: Live Dispatch Radar (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#161E2E] rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1C2638] border border-white/[0.08] flex items-center justify-center text-[#7CE2FE]">
                  <Radio size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F9F0FF]">Riga Live Dispatch Engine</h3>
                  <p className="text-xs text-[#A0AEC0]">Centrs • Teika • Āgenskalns Active Hubs</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#57FF9D]/10 border border-[#57FF9D]/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#57FF9D] animate-ping" />
                <span className="text-[11px] font-semibold text-[#57FF9D]">14 Meisters Live</span>
              </div>
            </div>

            {/* Radar Activity Feed */}
            <div className="mt-6 space-y-3.5">
              <div className="p-4 rounded-xl bg-[#101722]/80 border border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center text-xs font-bold">
                    PL
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#F9F0FF]">Emergency Radiator Repair</div>
                    <div className="text-[11px] text-[#A0AEC0]">Elizabetes iela 14 • 1.2km away</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#57FF9D]">Matched (45s)</span>
                  <div className="text-[10px] text-[#6B7A90]">Jānis B. assigned</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101722]/80 border border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F97316]/20 text-[#F97316] flex items-center justify-center text-xs font-bold">
                    EL
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#F9F0FF]">Short Circuit / Fuse Board</div>
                    <div className="text-[11px] text-[#A0AEC0]">Brīvības gatve 214 • 2.8km away</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#7CE2FE]">En Route</span>
                  <div className="text-[10px] text-[#6B7A90]">Artūrs L. (ETA 11 min)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101722]/80 border border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#57FF9D]/20 text-[#57FF9D] flex items-center justify-center text-xs font-bold">
                    CL
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#F9F0FF]">Post-Renovation Deep Clean</div>
                    <div className="text-[11px] text-[#A0AEC0]">Kalnciema kvartāls • 3.4km away</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#A78BFA]">Scheduled</span>
                  <div className="text-[10px] text-[#6B7A90]">Today at 15:00</div>
                </div>
              </div>
            </div>

            {/* Cyan status progress bar */}
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-[#A0AEC0]">System Throughput (Last 60m)</span>
                <span className="text-[#7CE2FE] font-bold">98.4% On-time Arrival</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1C2638] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#6366F1] via-[#7CE2FE] to-[#57FF9D] rounded-full w-[88%]" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Certified Meister Profile Card (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 bg-[#161E2E] rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl relative"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop" 
                  alt="Jānis Bērziņš" 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#6366F1]"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#57FF9D] border-2 border-[#161E2E] flex items-center justify-center text-[10px] font-bold text-[#101722]">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#F9F0FF]">Jānis Bērziņš</h4>
                  <span className="text-[10px] font-bold text-[#57FF9D] bg-[#57FF9D]/15 px-2 py-0.5 rounded-full">
                    Top Meister
                  </span>
                </div>
                <p className="text-xs text-[#A0AEC0] mt-0.5">Certified Master Plumber • 5 yr exp</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#6B7A90]">
                  <span className="text-[#EAB308] font-semibold">★ 4.95 (184 reviews)</span>
                  <span>•</span>
                  <span>Centrs & Teika</span>
                </div>
              </div>
            </div>

            {/* Verification checklist pills */}
            <div className="space-y-2.5 bg-[#101722]/80 p-4 rounded-2xl border border-white/[0.05] text-xs">
              <div className="flex items-center justify-between text-[#A0AEC0]">
                <span className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#57FF9D]" />
                  <span>Latvian State ID & Background Check</span>
                </span>
                <span className="text-[#57FF9D] font-medium text-[11px]">Verified</span>
              </div>
              <div className="flex items-center justify-between text-[#A0AEC0]">
                <span className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#57FF9D]" />
                  <span>Trade Qualification Certificate</span>
                </span>
                <span className="text-[#57FF9D] font-medium text-[11px]">Level 4 Meister</span>
              </div>
              <div className="flex items-center justify-between text-[#A0AEC0]">
                <span className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#57FF9D]" />
                  <span>Commercial Public Liability Cover</span>
                </span>
                <span className="text-[#57FF9D] font-medium text-[11px]">€50,000</span>
              </div>
            </div>

            {/* Rate & Quick Launch */}
            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6B7A90] uppercase tracking-wider block">Standard Rate</span>
                <span className="text-xl font-bold text-[#F9F0FF]">€25.00 <span className="text-xs text-[#A0AEC0] font-normal">/ hour</span></span>
              </div>
              {onLaunchApp && (
                <button 
                  onClick={onLaunchApp}
                  className="px-5 py-2.5 rounded-full bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
                >
                  <span>Book in App</span>
                  <ArrowUpRight size={14} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Card 3: Live Telemetry & GPS Arrival (Span 6) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 bg-[#161E2E] rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#7CE2FE]/15 text-[#7CE2FE]">
                  <Navigation size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#F9F0FF]">Live GPS Dispatch Tracker</h4>
              </div>
              <span className="text-xs text-[#7CE2FE] font-bold bg-[#7CE2FE]/10 px-2.5 py-1 rounded-full border border-[#7CE2FE]/20">
                ETA: 8 Minutes
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#101722]/80 border border-white/[0.05] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#A0AEC0]">Origin</span>
                <span className="text-[#F9F0FF] font-medium">Gertrūdes iela Workshop</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#A0AEC0]">Destination</span>
                <span className="text-[#F9F0FF] font-medium">Elizabetes iela 14, Centrs</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#A0AEC0]">Vehicle</span>
                <span className="text-[#57FF9D] font-medium">VW Transporter • Tool Pack A</span>
              </div>
              {/* Cyan Progress Bar */}
              <div className="pt-2">
                <div className="w-full h-2 rounded-full bg-[#1C2638] overflow-hidden">
                  <div className="h-full bg-[#7CE2FE] rounded-full w-[78%] animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Transparent Escrow Calculator (Span 6) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-6 bg-[#161E2E] rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#57FF9D]/15 text-[#57FF9D]">
                  <CreditCard size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#F9F0FF]">Guaranteed Fair Pricing</h4>
              </div>
              <span className="text-xs text-[#57FF9D] font-bold bg-[#57FF9D]/10 px-2.5 py-1 rounded-full border border-[#57FF9D]/20">
                Zero Hidden Markups
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#101722]/80 border border-white/[0.05] space-y-2 text-xs">
              <div className="flex justify-between text-[#A0AEC0]">
                <span>Hourly Labor (Pro Plumber)</span>
                <span className="text-[#F9F0FF] font-semibold">€25.00/h</span>
              </div>
              <div className="flex justify-between text-[#A0AEC0]">
                <span>Materials / Replacement Valve</span>
                <span className="text-[#F9F0FF] font-semibold">Store Receipt Cost</span>
              </div>
              <div className="flex justify-between text-[#A0AEC0]">
                <span>Customer Escrow Protection</span>
                <span className="text-[#57FF9D] font-semibold">Included Free</span>
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center text-sm font-bold text-[#F9F0FF]">
                <span>Funds Released</span>
                <span className="text-[#7CE2FE]">Only after your sign-off</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
