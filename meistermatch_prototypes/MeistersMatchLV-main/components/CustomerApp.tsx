import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Phone, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Wrench, 
  Zap, 
  Flame, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Car, 
  X, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  ChevronRight,
  Filter,
  Navigation,
  ThumbsUp,
  CreditCard,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useMarketplace, 
  MeisterProfile, 
  Job, 
  JobStatus 
} from '../marketplaceStore';

const CATEGORIES = [
  { id: 'All', label: 'All Services', icon: '✨' },
  { id: 'Plumbing', label: 'Plumbing', icon: '🔧' },
  { id: 'Electrical', label: 'Electrical', icon: '⚡' },
  { id: 'Handyman', label: 'Handyman', icon: '🔨' },
  { id: 'Cleaning', label: 'Cleaning', icon: '🧹' },
  { id: 'Locksmith', label: 'Locksmith', icon: '🔐' },
  { id: 'Heating', label: 'Heating & Gas', icon: '🔥' }
];

const DISTRICTS = ['All Riga', 'Centrs', 'Teika', 'Āgenskalns', 'Purvciems', 'Imanta', 'Jugla'];

export const CustomerApp: React.FC<{ onSwitchToMeister: () => void }> = ({ onSwitchToMeister }) => {
  const { 
    meisters, 
    jobs, 
    activeJob, 
    setActiveJob, 
    createJob, 
    sendChatMessage, 
    rateJob,
    updateJobStatus 
  } = useMarketplace();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All Riga');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState<'browse' | 'tracker' | 'history'>('browse');
  
  // Modals state
  const [selectedMeister, setSelectedMeister] = useState<MeisterProfile | null>(null);
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [directBookingMeister, setDirectBookingMeister] = useState<MeisterProfile | null>(null);

  // New Job Form State
  const [newCategory, setNewCategory] = useState('Plumbing');
  const [newUrgency, setNewUrgency] = useState<'emergency' | 'today' | '2-3-days' | 'flexible'>('emergency');
  const [newAddress, setNewAddress] = useState('Brīvības iela 88, Dz. 14, Rīga');
  const [newDistrict, setNewDistrict] = useState('Centrs');
  const [newDescription, setNewDescription] = useState('Leaking pipe under the sink, shutoff valve stuck.');
  const [newName, setNewName] = useState('Artis B.');
  const [newPhone, setNewPhone] = useState('+371 29 123 456');

  // Chat message input
  const [chatInput, setChatInput] = useState('');

  // Rating review state
  const [starHover, setStarHover] = useState(0);
  const [selectedStars, setSelectedStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Filtered Meisters list
  const filteredMeisters = meisters.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All Riga' || m.district === selectedDistrict;
    const matchesSearch = searchQuery === '' || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDistrict && matchesSearch;
  });

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createJob({
      category: directBookingMeister ? directBookingMeister.category : newCategory,
      urgency: newUrgency,
      address: newAddress,
      district: newDistrict,
      description: newDescription,
      customerName: newName,
      customerPhone: newPhone,
      directMeisterId: directBookingMeister ? directBookingMeister.id : undefined
    });

    setIsPostingJob(false);
    setDirectBookingMeister(null);
    setViewTab('tracker');
    setActiveJob(created.id);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeJob) return;
    sendChatMessage(activeJob.id, 'customer', chatInput);
    setChatInput('');
  };

  const handleRateSubmit = () => {
    if (!activeJob) return;
    rateJob(activeJob.id, selectedStars, reviewComment || 'Great fast work!');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-16 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header & Mode Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/80 p-4 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-riga-blue text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CUSTOMER APP • RIGA LIVE DISPATCH
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Find & Match with Vetted Masters
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Verified plumbers, electricians, locksmiths and handymen across all Riga neighborhoods.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeJob && (
              <button
                onClick={() => setViewTab('tracker')}
                className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 border transition-all ${
                  viewTab === 'tracker'
                    ? 'bg-emerald-500 text-gray-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active Job ({activeJob.status})</span>
              </button>
            )}

            <button
              onClick={() => {
                setDirectBookingMeister(null);
                setIsPostingJob(true);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-riga-blue to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Sparkles size={16} />
              <span>Post Open Job Request</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Browse / Active Job Tracker / History) */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setViewTab('browse')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              viewTab === 'browse'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Directory of Meisters ({filteredMeisters.length})
          </button>

          <button
            onClick={() => setViewTab('tracker')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              viewTab === 'tracker'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Live Job Tracker</span>
            {activeJob && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                1 Active
              </span>
            )}
          </button>

          <button
            onClick={() => setViewTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              viewTab === 'history'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Job History ({jobs.length})
          </button>
        </div>

        {/* TAB 1: BROWSE MEISTERS */}
        {viewTab === 'browse' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search Bar */}
              <div className="md:col-span-5 relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, skill (e.g. pipe, leak, IKEA, lock)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-riga-blue"
                />
              </div>

              {/* District Filter */}
              <div className="md:col-span-4 relative">
                <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-gray-900/90 border border-white/10 rounded-xl pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-riga-blue appearance-none cursor-pointer"
                >
                  {DISTRICTS.map(d => (
                    <option key={d} value={d} className="bg-gray-900 text-white">{d}</option>
                  ))}
                </select>
                <ChevronRight size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
              </div>

              {/* Quick Status / Counter */}
              <div className="md:col-span-3 flex items-center justify-between px-4 py-2.5 bg-gray-900/60 border border-white/10 rounded-xl text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {meisters.filter(m => m.isOnline).length} Masters Online Now
                </span>
                <span className="text-gray-500 font-mono">Riga Area</span>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-riga-blue text-white shadow-md shadow-riga-blue/20 scale-[1.02]'
                      : 'bg-gray-900/80 text-gray-300 border border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Meister Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMeisters.map(meister => (
                <motion.div
                  key={meister.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/90 rounded-2xl border border-white/10 overflow-hidden hover:border-riga-blue/50 transition-all flex flex-col justify-between group shadow-lg hover:shadow-riga-blue/10"
                >
                  <div className="p-5 space-y-4">
                    {/* Meister Header */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={meister.avatar}
                          alt={meister.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                        />
                        {meister.isOnline && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-900 rounded-full" title="Online now" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-white truncate">{meister.name}</h3>
                          <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                            <Star size={14} fill="currentColor" />
                            <span>{meister.rating}</span>
                            <span className="text-gray-500 text-xs font-normal">({meister.reviewsCount})</span>
                          </div>
                        </div>

                        <p className="text-xs font-medium text-riga-blue">{meister.category} Specialist</p>

                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-gray-500" />
                            {meister.district} ({meister.distanceKm} km)
                          </span>
                          <span>•</span>
                          <span>{meister.experienceYears} yrs exp</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio snippet */}
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {meister.bio}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {meister.badges.map(b => (
                        <span key={b} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-gray-300">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Price & Hire */}
                  <div className="p-4 bg-gray-950/60 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400">Rate from</span>
                      <div className="text-lg font-extrabold text-white">
                        €{meister.hourlyRate}<span className="text-xs font-normal text-gray-400">/hr</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedMeister(meister)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          setDirectBookingMeister(meister);
                          setNewCategory(meister.category);
                          setIsPostingJob(true);
                        }}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-riga-blue hover:bg-blue-500 text-white shadow-md shadow-riga-blue/20 transition-all flex items-center gap-1"
                      >
                        <span>Book</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredMeisters.length === 0 && (
              <div className="p-12 text-center bg-gray-900/40 rounded-2xl border border-white/5">
                <AlertCircle size={36} className="mx-auto text-gray-500 mb-2" />
                <h3 className="text-lg font-bold text-gray-300">No Meisters found</h3>
                <p className="text-xs text-gray-500 mt-1">Try resetting the district or search query.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE JOB TRACKER */}
        {viewTab === 'tracker' && (
          <div className="space-y-6">
            {!activeJob ? (
              <div className="p-12 text-center bg-gray-900/60 rounded-3xl border border-white/10 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-riga-blue/10 border border-riga-blue/30 text-riga-blue flex items-center justify-center mx-auto">
                  <Radio size={28} className="animate-pulse" />
                </div>
                <h2 className="text-xl font-bold text-white">No active job currently tracking</h2>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Post a new job request or select an existing job from the history to inspect live dispatch status and chat with your Meister.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setDirectBookingMeister(null);
                      setIsPostingJob(true);
                    }}
                    className="px-6 py-2.5 bg-riga-blue text-white font-bold text-sm rounded-xl shadow-lg"
                  >
                    Post a Request
                  </button>
                  <button
                    onClick={() => setViewTab('browse')}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl"
                  >
                    Browse Directory
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 8 Cols: Status Stepper, Radar, Map Simulation, and Job Info */}
                <div className="lg:col-span-7 space-y-6">

                  {/* Status Banner */}
                  <div className="bg-gray-900/90 rounded-3xl border border-white/10 p-6 shadow-xl space-y-6">
                    
                    {/* Stepper Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-xs font-mono uppercase text-riga-blue">Order #{activeJob.id}</span>
                        <h2 className="text-xl font-black text-white flex items-center gap-2">
                          <span>{activeJob.category} Service</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            activeJob.urgency === 'emergency' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {activeJob.urgency}
                          </span>
                        </h2>
                      </div>

                      {/* Quick switcher to Meister view for demo pairing */}
                      <button
                        onClick={onSwitchToMeister}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
                        title="Jump to Meister Portal to accept/update this job as the worker"
                      >
                        <Wrench size={13} />
                        <span>Switch to Meister View</span>
                      </button>
                    </div>

                    {/* Stepper Progress Bar */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className={activeJob.status === 'searching' ? 'text-riga-blue' : 'text-gray-400'}>1. Radar Search</span>
                        <span className={activeJob.status === 'accepted' ? 'text-riga-blue' : 'text-gray-400'}>2. Matched</span>
                        <span className={activeJob.status === 'on_the_way' ? 'text-riga-blue' : 'text-gray-400'}>3. En Route</span>
                        <span className={activeJob.status === 'in_progress' ? 'text-riga-blue' : 'text-gray-400'}>4. On Site</span>
                        <span className={activeJob.status === 'completed' ? 'text-emerald-400' : 'text-gray-400'}>5. Completed</span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5 h-2 bg-gray-800 rounded-full overflow-hidden p-0.5">
                        <div className={`rounded-full transition-all duration-500 ${
                          ['searching', 'accepted', 'on_the_way', 'in_progress', 'completed'].includes(activeJob.status) ? 'bg-riga-blue' : 'bg-transparent'
                        }`} />
                        <div className={`rounded-full transition-all duration-500 ${
                          ['accepted', 'on_the_way', 'in_progress', 'completed'].includes(activeJob.status) ? 'bg-riga-blue' : 'bg-transparent'
                        }`} />
                        <div className={`rounded-full transition-all duration-500 ${
                          ['on_the_way', 'in_progress', 'completed'].includes(activeJob.status) ? 'bg-riga-blue' : 'bg-transparent'
                        }`} />
                        <div className={`rounded-full transition-all duration-500 ${
                          ['in_progress', 'completed'].includes(activeJob.status) ? 'bg-riga-blue' : 'bg-transparent'
                        }`} />
                        <div className={`rounded-full transition-all duration-500 ${
                          activeJob.status === 'completed' ? 'bg-emerald-400' : 'bg-transparent'
                        }`} />
                      </div>
                    </div>

                    {/* Dynamic Stage Banner */}
                    {activeJob.status === 'searching' && (
                      <div className="p-6 bg-riga-blue/10 border border-riga-blue/30 rounded-2xl text-center space-y-4">
                        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-riga-blue/20 animate-ping" />
                          <div className="absolute inset-2 rounded-full bg-riga-blue/30 animate-pulse" />
                          <Radio size={32} className="text-riga-blue relative z-10" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-lg text-white">Broadcasting Request across Riga...</h3>
                          <p className="text-xs text-gray-300 mt-1 max-w-sm mx-auto">
                            Matching with nearest verified {activeJob.category} masters in {activeJob.district}. Typical response time is under 2 minutes.
                          </p>
                        </div>
                        <div className="text-xs text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/20 py-2 px-3 rounded-xl inline-block">
                          Tip: Click "Switch to Meister View" above to accept this job as a worker!
                        </div>
                      </div>
                    )}

                    {activeJob.status === 'accepted' && activeJob.assignedMeister && (
                      <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 size={14} /> Meister Confirmed!
                          </span>
                          <h4 className="text-base font-bold text-white">{activeJob.assignedMeister.name} accepted your request</h4>
                          <p className="text-xs text-gray-400">Preparing tool set and equipment. Will depart shortly.</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400">Estimated Arrival</span>
                          <div className="text-xl font-extrabold text-white">~{activeJob.etaMinutes || 15} min</div>
                        </div>
                      </div>
                    )}

                    {activeJob.status === 'on_the_way' && activeJob.assignedMeister && (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20">
                              <Car size={20} className="animate-bounce" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-blue-400">En Route to your address</div>
                              <div className="text-sm font-bold text-white">{activeJob.assignedMeister.name} is driving</div>
                              <div className="text-xs text-gray-400">{activeJob.address}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] text-gray-400 uppercase">Live ETA</span>
                            <div className="text-2xl font-black text-emerald-400 font-mono">12 min</div>
                          </div>
                        </div>

                        {/* Interactive Simulated Riga Route Map Pin */}
                        <div className="relative h-48 bg-gray-950 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                          {/* Map Grid Background */}
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00AEEF_1px,transparent_1px)] [background-size:16px_16px]" />
                          
                          {/* Daugava River SVG Shape representation */}
                          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 400 200">
                            <path d="M 0,160 Q 150,110 240,130 T 400,60" fill="none" stroke="#00AEEF" strokeWidth="22" strokeLinecap="round" />
                          </svg>

                          {/* Client Pin */}
                          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 flex flex-col items-center">
                            <div className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold shadow">
                              You ({activeJob.district})
                            </div>
                            <MapPin size={22} className="text-rose-500 fill-rose-500 drop-shadow" />
                          </div>

                          {/* Moving Meister Pin */}
                          <motion.div 
                            animate={{ x: [ -60, -10 ], y: [ 20, 0 ] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/3 -translate-y-1/2 flex flex-col items-center"
                          >
                            <div className="px-2 py-0.5 rounded bg-emerald-500 text-gray-950 text-[10px] font-extrabold shadow flex items-center gap-1">
                              <Car size={10} /> {activeJob.assignedMeister.name}
                            </div>
                            <div className="w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
                          </motion.div>

                          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-gray-400 bg-gray-900/80 px-2 py-1 rounded border border-white/10">
                            GPS Tracking Active • Riga Dispatch Grid
                          </div>
                        </div>
                      </div>
                    )}

                    {activeJob.status === 'in_progress' && (
                      <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-amber-500 text-gray-950 rounded-xl font-bold">
                            <Wrench size={22} className="animate-spin" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-400">Work Currently In Progress</div>
                            <div className="text-sm font-bold text-white">Meister is on site performing repairs</div>
                            <div className="text-xs text-gray-400">Parts replacement & inspection active</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 uppercase">Elapsed Time</span>
                          <div className="text-xl font-black text-amber-400 font-mono">00:24:18</div>
                        </div>
                      </div>
                    )}

                    {activeJob.status === 'completed' && (
                      <div className="p-6 bg-gradient-to-br from-emerald-950/40 to-gray-900 border border-emerald-500/40 rounded-3xl space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-emerald-500 text-gray-950 rounded-2xl">
                            <CheckCircle2 size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">Job Successfully Completed!</h3>
                            <p className="text-xs text-emerald-400">Service guaranteed under MeisterMatch 30-day warranty</p>
                          </div>
                        </div>

                        {/* Invoice Breakdown */}
                        <div className="p-4 bg-gray-950/60 rounded-2xl border border-white/10 text-xs space-y-2">
                          <div className="flex justify-between text-gray-400">
                            <span>Labor ({activeJob.category} Service):</span>
                            <span className="text-white font-mono">€{activeJob.estimatedPrice}</span>
                          </div>
                          <div className="flex justify-between text-gray-400">
                            <span>Materials & Diagnostic:</span>
                            <span className="text-white font-mono">€0.00</span>
                          </div>
                          <div className="flex justify-between text-gray-400">
                            <span>Platform Insurance & Protection:</span>
                            <span className="text-emerald-400 font-mono">Included</span>
                          </div>
                          <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm">
                            <span className="text-white">Total Charged:</span>
                            <span className="text-emerald-400 font-mono">€{activeJob.estimatedPrice}.00</span>
                          </div>
                        </div>

                        {/* Rating Component */}
                        {!activeJob.rating ? (
                          <div className="p-4 bg-gray-900 rounded-2xl border border-white/10 space-y-3">
                            <h4 className="text-xs font-bold uppercase text-gray-300">Rate your experience with Meister</h4>
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setSelectedStars(star)}
                                  onMouseEnter={() => setStarHover(star)}
                                  onMouseLeave={() => setStarHover(0)}
                                  className="text-amber-400 hover:scale-125 transition-transform"
                                >
                                  <Star 
                                    size={24} 
                                    fill={(starHover || selectedStars) >= star ? 'currentColor' : 'none'} 
                                  />
                                </button>
                              ))}
                            </div>
                            <input
                              type="text"
                              placeholder="Write a brief review (e.g. Clean work, arrived on time)..."
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-riga-blue"
                            />
                            <button
                              onClick={handleRateSubmit}
                              className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold text-xs rounded-xl transition-all"
                            >
                              Submit Rating & Review
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
                            <span>Review submitted: "{activeJob.review}"</span>
                            <span className="font-bold">★ {activeJob.rating}.0</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Job Details Card */}
                    <div className="p-4 bg-gray-950/60 rounded-2xl border border-white/10 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white font-medium">{activeJob.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Contact:</span>
                        <span className="text-white font-medium">{activeJob.customerName} ({activeJob.customerPhone})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Description:</span>
                        <span className="text-white font-medium max-w-xs text-right truncate">{activeJob.description}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right 5 Cols: Assigned Meister Card & Real-Time Chat */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Meister Card */}
                  {activeJob.assignedMeister ? (
                    <div className="bg-gray-900/90 rounded-3xl border border-white/10 p-5 shadow-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">Assigned Master</span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                          <ShieldCheck size={14} /> ID Verified
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <img
                          src={activeJob.assignedMeister.avatar}
                          alt={activeJob.assignedMeister.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-white">{activeJob.assignedMeister.name}</h3>
                          <p className="text-xs text-riga-blue">{activeJob.assignedMeister.category} Specialist</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <span className="flex items-center text-amber-400 font-bold">
                              <Star size={13} fill="currentColor" /> {activeJob.assignedMeister.rating}
                            </span>
                            <span>•</span>
                            <span>{activeJob.assignedMeister.experienceYears}y experience</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:${activeJob.assignedMeister.phone}`}
                          className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Phone size={14} />
                          <span>{activeJob.assignedMeister.phone}</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/90 rounded-3xl border border-white/10 p-6 text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gray-500">
                        <Clock size={20} />
                      </div>
                      <h4 className="text-sm font-bold text-gray-300">Awaiting Meister Confirmation</h4>
                      <p className="text-xs text-gray-500">
                        Meisters within 5km are reviewing the job details.
                      </p>
                    </div>
                  )}

                  {/* Two-Way Chat Box */}
                  <div className="bg-gray-900/90 rounded-3xl border border-white/10 p-5 shadow-xl flex flex-col h-[400px]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-riga-blue" />
                        <span className="text-xs font-bold text-white uppercase">In-App Chat & Updates</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">Live Sync</span>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
                      {activeJob.messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === 'customer'
                              ? 'items-end'
                              : msg.sender === 'meister'
                              ? 'items-start'
                              : 'items-center'
                          }`}
                        >
                          {msg.sender === 'system' ? (
                            <div className="px-3 py-1 rounded-full bg-white/5 text-[10px] text-gray-400 border border-white/5 my-1 text-center max-w-[85%]">
                              {msg.text}
                            </div>
                          ) : (
                            <div
                              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs ${
                                msg.sender === 'customer'
                                  ? 'bg-riga-blue text-white rounded-br-none shadow-md shadow-riga-blue/15'
                                  : 'bg-gray-800 text-gray-200 rounded-bl-none border border-white/10'
                              }`}
                            >
                              <div className="text-[10px] opacity-75 mb-0.5 font-bold">
                                {msg.sender === 'customer' ? 'You' : (activeJob.assignedMeister?.name || 'Meister')}
                              </div>
                              <p className="leading-relaxed">{msg.text}</p>
                              <span className="text-[9px] opacity-60 mt-1 block text-right">
                                {msg.timestamp}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex gap-1.5 overflow-x-auto py-2 border-t border-white/5 no-scrollbar">
                      {['Door code is #4821', 'I am waiting outside', 'Please call on arrival'].map(text => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => {
                            sendChatMessage(activeJob.id, 'customer', text);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 whitespace-nowrap transition-all border border-white/5"
                        >
                          {text}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/10">
                      <input
                        type="text"
                        placeholder="Write a message to your Meister..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-1 bg-gray-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-riga-blue"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-riga-blue hover:bg-blue-500 text-white transition-all shadow-md"
                      >
                        <Send size={15} />
                      </button>
                    </form>

                  </div>

                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 3: JOB HISTORY */}
        {viewTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Your Orders & Requests</h2>
            <div className="grid gap-4">
              {jobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => {
                    setActiveJob(job.id);
                    setViewTab('tracker');
                  }}
                  className="p-5 bg-gray-900/80 hover:bg-gray-900 border border-white/10 rounded-2xl cursor-pointer transition-all hover:border-riga-blue/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">#{job.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        job.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-riga-blue/20 text-riga-blue border border-riga-blue/30'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white">{job.category} • {job.address}</h3>
                    <p className="text-xs text-gray-400 line-clamp-1">{job.description}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Estimate</div>
                      <div className="text-base font-bold text-white">€{job.estimatedPrice}</div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: POST JOB REQUEST / DIRECT BOOKING */}
      <AnimatePresence>
        {isPostingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-white/15 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {directBookingMeister ? `Book ${directBookingMeister.name}` : 'Post Job Request in Riga'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {directBookingMeister 
                      ? `Direct hire at €${directBookingMeister.hourlyRate}/hr`
                      : 'Radar dispatch will notify all nearby vetted masters'}
                  </p>
                </div>
                <button
                  onClick={() => setIsPostingJob(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateJobSubmit} className="space-y-4 text-xs">
                {/* Category Selector if not direct booking */}
                {!directBookingMeister && (
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">Select Service Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {CATEGORIES.filter(c => c.id !== 'All').map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setNewCategory(c.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            newCategory === c.id
                              ? 'bg-riga-blue text-white border-riga-blue shadow-md'
                              : 'bg-gray-950 text-gray-300 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="text-base mb-0.5">{c.icon}</div>
                          <div className="font-semibold">{c.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Urgency */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">How urgent is this?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'emergency', label: '🚨 1-2 Hours' },
                      { id: 'today', label: '📅 Today' },
                      { id: '2-3-days', label: '⏳ 2-3 Days' },
                      { id: 'flexible', label: '✨ Flexible' }
                    ].map(u => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setNewUrgency(u.id as any)}
                        className={`py-2 px-1 rounded-xl border text-center font-bold transition-all ${
                          newUrgency === u.id
                            ? 'bg-white/20 text-white border-white'
                            : 'bg-gray-950 text-gray-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Riga District</label>
                    <select
                      value={newDistrict}
                      onChange={(e) => setNewDistrict(e.target.value)}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-riga-blue"
                    >
                      {DISTRICTS.filter(d => d !== 'All Riga').map(d => (
                        <option key={d} value={d} className="bg-gray-900">{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Street Address & Apt</label>
                    <input
                      type="text"
                      required
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-riga-blue"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Description of the problem</label>
                  <textarea
                    rows={3}
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe what needs fixing, tools needed, or access details..."
                    className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-riga-blue"
                  />
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-riga-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-riga-blue"
                    />
                  </div>
                </div>

                {/* Pricing Guarantee Note */}
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CreditCard size={15} className="text-riga-blue" />
                    <span>Estimated Labor Rate</span>
                  </div>
                  <span className="font-extrabold text-white font-mono">
                    €{directBookingMeister ? directBookingMeister.hourlyRate : (newUrgency === 'emergency' ? '45-55' : '30-40')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-riga-blue to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-riga-blue/20 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Confirm & Broadcast Request</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: MEISTER PROFILE DETAILS */}
      <AnimatePresence>
        {selectedMeister && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-white/15 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-riga-blue uppercase">Meister Profile</span>
                <button
                  onClick={() => setSelectedMeister(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={selectedMeister.avatar}
                  alt={selectedMeister.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-white/10"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedMeister.name}</h3>
                  <p className="text-xs text-riga-blue font-semibold">{selectedMeister.category} Specialist</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span className="flex items-center text-amber-400 font-bold">
                      <Star size={14} fill="currentColor" /> {selectedMeister.rating}
                    </span>
                    <span>•</span>
                    <span>{selectedMeister.reviewsCount} reviews</span>
                    <span>•</span>
                    <span>{selectedMeister.district}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-gray-300 uppercase">About</h4>
                <p className="text-gray-300 leading-relaxed bg-gray-950/60 p-3 rounded-xl border border-white/5">
                  {selectedMeister.bio}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-gray-300 uppercase">Guarantees & Credentials</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMeister.badges.map(b => (
                    <span key={b} className="px-3 py-1 rounded-xl bg-riga-blue/10 border border-riga-blue/30 text-riga-blue font-semibold">
                      ✓ {b}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                    ✓ Identity & Police Background Verified
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    const m = selectedMeister;
                    setSelectedMeister(null);
                    setDirectBookingMeister(m);
                    setNewCategory(m.category);
                    setIsPostingJob(true);
                  }}
                  className="flex-1 py-3 bg-riga-blue hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all text-center"
                >
                  Direct Book for €{selectedMeister.hourlyRate}/hr
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
