import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  Car, 
  Check, 
  X, 
  Send, 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Bell, 
  Radio, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useMarketplace, 
  Job, 
  JobStatus, 
  MeisterProfile 
} from '../marketplaceStore';

export const MeisterPortal: React.FC<{ onSwitchToCustomer: () => void }> = ({ onSwitchToCustomer }) => {
  const { 
    meisters, 
    jobs, 
    currentMeister, 
    setCurrentMeister, 
    toggleMeisterOnline, 
    acceptJob, 
    updateJobStatus, 
    sendChatMessage,
    createJob 
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'radar' | 'active' | 'earnings'>('radar');
  const [chatInput, setChatInput] = useState('');
  const [coveredDistricts, setCoveredDistricts] = useState<string[]>([
    'Centrs', 'Teika', 'Āgenskalns', 'Purvciems'
  ]);

  // Find active job assigned to this Meister
  const currentAssignedJob = jobs.find(
    j => j.assignedMeister?.id === currentMeister.id && 
         ['accepted', 'on_the_way', 'in_progress'].includes(j.status)
  );

  // Incoming unassigned jobs matching either category or open radar
  const incomingJobs = jobs.filter(j => j.status === 'searching');

  const handleToggleDistrict = (dist: string) => {
    setCoveredDistricts(prev => 
      prev.includes(dist) ? prev.filter(d => d !== dist) : [...prev, dist]
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentAssignedJob) return;
    sendChatMessage(currentAssignedJob.id, 'meister', chatInput);
    setChatInput('');
  };

  const handleSimulateNewJob = () => {
    createJob({
      category: currentMeister.category,
      urgency: 'emergency',
      address: 'K. Barona iela 45, Dz. 8, Rīga',
      district: 'Centrs',
      description: `Urgent ${currentMeister.category.toLowerCase()} fix needed ASAP! Water valve shutoff won't budge.`,
      customerName: 'Jekaterina M.',
      customerPhone: '+371 28 888 123'
    });
    setActiveTab('radar');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-16 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Worker Status & Profile Bar */}
        <div className="bg-gray-900/90 rounded-3xl border border-white/10 p-4 sm:p-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Meister Identity & Switcher */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={currentMeister.avatar}
                  alt={currentMeister.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/50 shadow-lg shadow-amber-500/10"
                />
                <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                  currentMeister.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                }`} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Meister Partner
                  </span>
                  <span className="text-xs text-gray-400 font-mono">ID: {currentMeister.id}</span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <h1 className="text-xl sm:text-2xl font-black text-white">{currentMeister.name}</h1>
                  <select
                    value={currentMeister.id}
                    onChange={(e) => setCurrentMeister(e.target.value)}
                    className="bg-gray-800 border border-white/10 text-xs text-amber-400 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                    title="Switch Meister profile for testing"
                  >
                    {meisters.map(m => (
                      <option key={m.id} value={m.id} className="bg-gray-900 text-white">
                        Switch to {m.name} ({m.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span className="text-riga-blue font-semibold">{currentMeister.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star size={13} fill="currentColor" /> {currentMeister.rating} ({currentMeister.reviewsCount} jobs)
                  </span>
                  <span>•</span>
                  <span>Base: €{currentMeister.hourlyRate}/h</span>
                </div>
              </div>
            </div>

            {/* Online Status Toggle & Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10">
              
              {/* Earnings snippet */}
              <div className="bg-gray-950/70 p-3 rounded-2xl border border-white/10 min-w-[120px]">
                <div className="text-[11px] text-gray-400">Today's Payout</div>
                <div className="text-lg font-black text-emerald-400 font-mono">€125.00</div>
                <div className="text-[10px] text-gray-500">2 jobs finished</div>
              </div>

              {/* Online / Offline Dispatch Toggle */}
              <div className="flex items-center gap-3 bg-gray-950/70 p-3 rounded-2xl border border-white/10">
                <div className="text-left">
                  <div className="text-[11px] text-gray-400">Dispatch Status</div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      currentMeister.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'
                    }`} />
                    <span>{currentMeister.isOnline ? 'Online & Listening' : 'Offline'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleMeisterOnline(currentMeister.id, !currentMeister.isOnline)}
                  className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
                    currentMeister.isOnline ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                >
                  <motion.div 
                    animate={{ x: currentMeister.isOnline ? 20 : 0 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'radar'
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Radio size={16} />
              <span>Incoming Radar</span>
              {incomingJobs.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[11px] font-black bg-rose-600 text-white animate-bounce">
                  {incomingJobs.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'active'
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wrench size={16} />
              <span>Active Assignment</span>
              {currentAssignedJob && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'earnings'
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <DollarSign size={16} />
              <span>Earnings & Payouts</span>
            </button>
          </div>

          <button
            onClick={handleSimulateNewJob}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all"
            title="Create an incoming job matching this Meister's trade"
          >
            <Bell size={13} className="text-amber-400" />
            <span>Simulate Incoming Call</span>
          </button>
        </div>

        {/* TAB 1: INCOMING JOBS RADAR FEED */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            
            {/* District Coverage Selector */}
            <div className="bg-gray-900/60 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-300 font-semibold">
                <MapPin size={15} className="text-amber-400" />
                <span>Your Active Coverage Districts in Riga:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Centrs', 'Teika', 'Āgenskalns', 'Purvciems', 'Imanta', 'Jugla'].map(dist => (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => handleToggleDistrict(dist)}
                    className={`px-2.5 py-1 rounded-lg border transition-all ${
                      coveredDistricts.includes(dist)
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-gray-950/60 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {coveredDistricts.includes(dist) ? '✓ ' : ''}{dist}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Incoming Open Requests */}
            {incomingJobs.length === 0 ? (
              <div className="p-12 text-center bg-gray-900/40 rounded-3xl border border-white/10 space-y-4">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" />
                  <Radio size={36} className="text-amber-400 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Radar is Scanning for Jobs in Riga</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  No unassigned jobs right now. When a customer submits a request in your category, it will appear here in real time.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleSimulateNewJob}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                  >
                    <Bell size={15} />
                    <span>Send Simulated Customer Request</span>
                  </button>
                  <button
                    onClick={onSwitchToCustomer}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition-all"
                  >
                    Open Customer App
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {incomingJobs.map(job => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-3xl border-2 border-amber-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase bg-amber-500 text-gray-950 flex items-center gap-1">
                          <Radio size={12} className="animate-spin" /> NEW INCOMING REQUEST
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase ${
                          job.urgency === 'emergency'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {job.urgency === 'emergency' ? '🚨 Urgent (1-2h)' : job.urgency}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          {job.createdAt ? new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-white">{job.category} • {job.district}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                          <MapPin size={13} className="text-amber-400" />
                          <span>{job.address}</span>
                        </p>
                      </div>

                      <p className="text-sm text-gray-200 bg-gray-950/70 p-3 rounded-2xl border border-white/5 leading-relaxed">
                        "{job.description}"
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>Client: <strong className="text-white">{job.customerName}</strong></span>
                        <span>•</span>
                        <span>Phone: <strong className="text-white">{job.customerPhone}</strong></span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-white/10 shrink-0">
                      <div className="text-left md:text-right">
                        <span className="text-xs text-gray-400">Estimated Payout</span>
                        <div className="text-3xl font-black text-emerald-400 font-mono">
                          €{job.estimatedPrice}.00
                        </div>
                        <span className="text-[10px] text-gray-500">20% fee covered by client</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            acceptJob(job.id, currentMeister.id);
                            setActiveTab('active');
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-gray-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:scale-[1.03] flex items-center gap-2"
                        >
                          <Check size={18} />
                          <span>ACCEPT JOB</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ACTIVE ASSIGNED JOB EXECUTION CONTROLLER */}
        {activeTab === 'active' && (
          <div>
            {!currentAssignedJob ? (
              <div className="p-12 text-center bg-gray-900/40 rounded-3xl border border-white/10 space-y-4">
                <CheckCircle2 size={36} className="mx-auto text-emerald-400" />
                <h3 className="text-lg font-bold text-white">No active job currently assigned</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Accept an open job from the Incoming Radar or wait for new client dispatch notifications.
                </p>
                <button
                  onClick={() => setActiveTab('radar')}
                  className="px-5 py-2.5 bg-amber-500 text-gray-950 font-bold text-xs rounded-xl"
                >
                  View Incoming Radar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 7 Cols: Execution Steps & Actions */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-gray-900/90 rounded-3xl border border-white/10 p-6 shadow-xl space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-xs font-mono text-amber-400 uppercase">Order #{currentAssignedJob.id}</span>
                        <h2 className="text-xl font-black text-white">{currentAssignedJob.category} Service</h2>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400">Status</span>
                        <div className="text-sm font-black uppercase text-riga-blue">{currentAssignedJob.status}</div>
                      </div>
                    </div>

                    {/* Step-by-Step Execution Controls */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                        Update Job Progress for Client:
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Step 1: On the way */}
                        <button
                          onClick={() => updateJobStatus(currentAssignedJob.id, 'on_the_way')}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                            currentAssignedJob.status === 'on_the_way'
                              ? 'bg-blue-500/20 border-blue-500 text-white shadow-lg'
                              : 'bg-gray-950/60 border-white/10 hover:border-white/20 text-gray-300'
                          }`}
                        >
                          <Car size={22} className="text-blue-400" />
                          <div>
                            <div className="text-xs font-extrabold">1. On My Way</div>
                            <div className="text-[10px] text-gray-400">Share GPS & ETA</div>
                          </div>
                        </button>

                        {/* Step 2: In progress / Arrived */}
                        <button
                          onClick={() => updateJobStatus(currentAssignedJob.id, 'in_progress')}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                            currentAssignedJob.status === 'in_progress'
                              ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg'
                              : 'bg-gray-950/60 border-white/10 hover:border-white/20 text-gray-300'
                          }`}
                        >
                          <Wrench size={22} className="text-amber-400" />
                          <div>
                            <div className="text-xs font-extrabold">2. Arrived & Working</div>
                            <div className="text-[10px] text-gray-400">Start active repair</div>
                          </div>
                        </button>

                        {/* Step 3: Completed */}
                        <button
                          onClick={() => updateJobStatus(currentAssignedJob.id, 'completed')}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                            currentAssignedJob.status === 'completed'
                              ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg'
                              : 'bg-gray-950/60 border-white/10 hover:border-white/20 text-gray-300'
                          }`}
                        >
                          <CheckCircle2 size={22} className="text-emerald-400" />
                          <div>
                            <div className="text-xs font-extrabold">3. Complete Job</div>
                            <div className="text-[10px] text-gray-400">Generate invoice</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Client & Address Info */}
                    <div className="p-5 bg-gray-950/70 rounded-2xl border border-white/10 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Client Name:</span>
                        <span className="text-white font-bold">{currentAssignedJob.customerName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Client Phone:</span>
                        <a href={`tel:${currentAssignedJob.customerPhone}`} className="text-riga-blue font-bold hover:underline flex items-center gap-1">
                          <Phone size={12} /> {currentAssignedJob.customerPhone}
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Destination:</span>
                        <span className="text-white font-medium">{currentAssignedJob.address}</span>
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-gray-400 block mb-1">Issue Details:</span>
                        <p className="text-gray-200 bg-gray-900 p-2.5 rounded-xl border border-white/5">
                          {currentAssignedJob.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2">
                      <button
                        onClick={onSwitchToCustomer}
                        className="text-riga-blue hover:underline flex items-center gap-1"
                      >
                        <span>Check Customer View Live Status</span>
                        <ExternalLink size={12} />
                      </button>

                      <button
                        onClick={() => updateJobStatus(currentAssignedJob.id, 'cancelled')}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        Cancel assignment
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right 5 Cols: In-App Chat with Customer */}
                <div className="lg:col-span-5">
                  <div className="bg-gray-900/90 rounded-3xl border border-white/10 p-5 shadow-xl flex flex-col h-[450px]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-amber-400" />
                        <span className="text-xs font-bold text-white uppercase">Chat with {currentAssignedJob.customerName}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Active</span>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
                      {currentAssignedJob.messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === 'meister'
                              ? 'items-end'
                              : msg.sender === 'customer'
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
                                msg.sender === 'meister'
                                  ? 'bg-amber-500 text-gray-950 font-medium rounded-br-none shadow-md shadow-amber-500/15'
                                  : 'bg-gray-800 text-gray-200 rounded-bl-none border border-white/10'
                              }`}
                            >
                              <div className="text-[10px] opacity-75 mb-0.5 font-bold">
                                {msg.sender === 'meister' ? 'You' : currentAssignedJob.customerName}
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

                    {/* Quick Presets for Meister */}
                    <div className="flex gap-1.5 overflow-x-auto py-2 border-t border-white/5 no-scrollbar">
                      {['I am downstairs, please open', 'I will arrive in 10 mins', 'Finished! Testing the seal'].map(text => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => {
                            sendChatMessage(currentAssignedJob.id, 'meister', text);
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
                        placeholder="Type reply to client..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-1 bg-gray-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold transition-all shadow-md"
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

        {/* TAB 3: EARNINGS & PAYOUTS */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-gray-900/80 rounded-3xl border border-white/10 space-y-2">
                <span className="text-xs text-gray-400 uppercase font-bold">This Week Earnings</span>
                <div className="text-3xl font-black text-emerald-400 font-mono">€485.00</div>
                <div className="text-xs text-gray-400">11 completed jobs in Riga</div>
              </div>

              <div className="p-6 bg-gray-900/80 rounded-3xl border border-white/10 space-y-2">
                <span className="text-xs text-gray-400 uppercase font-bold">Available for Payout</span>
                <div className="text-3xl font-black text-white font-mono">€310.00</div>
                <button className="px-3 py-1 bg-emerald-500 text-gray-950 font-extrabold text-xs rounded-lg mt-1">
                  Instant Payout to Swedbank / Revolut
                </button>
              </div>

              <div className="p-6 bg-gray-900/80 rounded-3xl border border-white/10 space-y-2">
                <span className="text-xs text-gray-400 uppercase font-bold">Meister Trust Rating</span>
                <div className="text-3xl font-black text-amber-400 font-mono">4.94 ★</div>
                <div className="text-xs text-emerald-400">Top 5% of Riga Plumbers</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
