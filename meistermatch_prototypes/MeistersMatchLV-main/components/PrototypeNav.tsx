import React from 'react';
import { 
  Home, 
  Smartphone, 
  Wrench, 
  ShieldCheck, 
  RotateCcw, 
  Radio, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useMarketplace } from '../marketplaceStore';

export type AppView = 'landing' | 'customer' | 'meister' | 'admin' | 'auth' | 'simulation';

interface PrototypeNavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

export const PrototypeNav: React.FC<PrototypeNavProps> = ({ currentView, onViewChange }) => {
  const { jobs, openJobs, resetDemoData, createJob } = useMarketplace();

  const activeJob = jobs.find(j => j.status !== 'completed' && j.status !== 'cancelled');
  const openRequestsCount = openJobs.length;

  const handleSimulateInstantJob = () => {
    createJob({
      category: 'Plumbing',
      urgency: 'emergency',
      address: 'Elizabetes iela 14, Rīga',
      district: 'Centrs',
      description: 'Emergency radiator valve failure, leaking hot water onto parquet!',
      customerName: 'Dāvis Liepiņš',
      customerPhone: '+371 29 999 111'
    });
    onViewChange('customer');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0D131C]/95 text-[#F9F0FF] backdrop-blur-md border-b border-white/[0.08] shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-12 flex items-center justify-between gap-2 text-xs">
        
        {/* Brand & Prototype Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#A78BFA] font-bold tracking-wider uppercase text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#57FF9D] animate-pulse"></span>
            Prototype Sandbox
          </div>
          <span className="hidden sm:inline text-[#6B7A90] font-medium">| MeisterMatch LV</span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-[#161E2E] p-1 rounded-full border border-white/[0.08] overflow-x-auto no-scrollbar">
          <button
            onClick={() => onViewChange('landing')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
              currentView === 'landing'
                ? 'bg-[#6366F1] text-white shadow-sm'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/[0.05]'
            }`}
            title="Public Landing & Marketing Page"
          >
            <Home size={13} />
            <span>Landing</span>
          </button>

          <button
            onClick={() => onViewChange('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium relative transition-all ${
              currentView === 'customer'
                ? 'bg-[#6366F1] text-white shadow-sm'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/[0.05]'
            }`}
            title="Customer App: Browse Meisters & Live Job Tracker"
          >
            <Smartphone size={13} />
            <span>Customer App</span>
            {activeJob && (
              <span className="w-2 h-2 rounded-full bg-[#57FF9D] animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          <button
            onClick={() => onViewChange('meister')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium relative transition-all ${
              currentView === 'meister'
                ? 'bg-[#F97316] text-white font-semibold shadow-sm'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/[0.05]'
            }`}
            title="Meister Portal: Accept Incoming Jobs & Update Execution"
          >
            <Wrench size={13} />
            <span>Meister Portal</span>
            {openRequestsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FF5779] text-white animate-pulse">
                {openRequestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onViewChange('simulation')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
              currentView === 'simulation'
                ? 'bg-[#57FF9D] text-[#101722] font-bold shadow-sm'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/[0.05]'
            }`}
            title="Guided workflow simulation: post job, swipe, match, track, rate"
          >
            <Sparkles size={13} />
            <span>Simulation</span>
          </button>

          <button
            onClick={() => onViewChange('auth')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
              currentView === 'auth'
                ? 'bg-white text-[#101722] font-bold shadow-sm'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/[0.05]'
            }`}
            title="Sign up or log in (local prototype only)"
          >
            <ExternalLink size={13} />
            <span>Sign in</span>
          </button>

          <button
            onClick={() => onViewChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
              currentView === 'admin'
                ? 'bg-[#A78BFA] text-[#101722] font-bold shadow-sm'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/[0.05]'
            }`}
            title="Admin Dashboard"
          >
            <ShieldCheck size={13} />
            <span>Admin</span>
          </button>
        </div>

        {/* Prototype Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSimulateInstantJob}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#57FF9D]/10 hover:bg-[#57FF9D]/20 text-[#57FF9D] border border-[#57FF9D]/30 font-semibold transition-all hover:scale-[1.02]"
            title="Simulate a new emergency plumbing job in Riga Centrs"
          >
            <Radio size={12} className="animate-spin text-[#57FF9D]" />
            <span>Simulate Job</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset marketplace prototype demo data to defaults?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[#A0AEC0] hover:text-[#FF5779] hover:bg-[#FF5779]/10 border border-transparent hover:border-[#FF5779]/20 transition-all"
            title="Reset demo data to initial state"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
};
