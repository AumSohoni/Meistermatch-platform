import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type JobStatus = 'searching' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';

export interface MeisterProfile {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  experienceYears: number;
  distanceKm: number;
  district: string;
  avatar: string;
  phone: string;
  isVerified: boolean;
  isOnline: boolean;
  emergencyAvailable: boolean;
  bio: string;
  badges: string[];
}

export type SwipeDirection = 'like' | 'pass';
export type SwipeSide = 'customer' | 'employer';

export interface Swipe {
  id: string;
  jobId: string;
  meisterId: string;
  side: SwipeSide;
  direction: SwipeDirection;
  createdAt: string;
}

export interface Match {
  id: string;
  jobId: string;
  meisterId: string;
  customerName: string;
  score: number;
  reasons: string[];
  createdAt: string;
  active: boolean;
}

export interface RankedMeister {
  meister: MeisterProfile;
  score: number;
  reasons: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'meister' | 'system';
  text: string;
  timestamp: string;
}

export interface Job {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  category: string;
  urgency: 'emergency' | 'today' | '2-3-days' | 'flexible';
  address: string;
  district: string;
  description: string;
  status: JobStatus;
  createdAt: string;
  estimatedPrice: number;
  assignedMeister?: MeisterProfile;
  etaMinutes?: number;
  messages: ChatMessage[];
  rating?: number;
  review?: string;
}

const STORAGE_KEY = 'meistermatch_marketplace_data_v1';

export const INITIAL_MEISTERS: MeisterProfile[] = [
  {
    id: 'm1',
    name: 'Jānis Bērziņš',
    category: 'Plumbing',
    rating: 4.94,
    reviewsCount: 128,
    hourlyRate: 35,
    experienceYears: 8,
    distanceKm: 1.2,
    district: 'Centrs',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    phone: '+371 29 111 222',
    isVerified: true,
    isOnline: true,
    emergencyAvailable: true,
    bio: 'Certified master plumber in Riga. Emergency pipe leaks, radiator bleeding, bathroom installations. Fast arrival with full tool kit.',
    badges: ['Certified Pro', 'Emergency Ready', 'Top Rated 2026']
  },
  {
    id: 'm2',
    name: 'Artūrs Liepiņš',
    category: 'Electrical',
    rating: 4.98,
    reviewsCount: 94,
    hourlyRate: 40,
    experienceYears: 12,
    distanceKm: 2.1,
    district: 'Teika',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    phone: '+371 28 333 444',
    isVerified: true,
    isOnline: true,
    emergencyAvailable: true,
    bio: 'Licensed high-voltage and home electrician. Fuse box replacements, LED rewiring, socket repairs. Safety guaranteed.',
    badges: ['Licensed Master', 'Bilingual (LV/RU)', 'Quick Response']
  },
  {
    id: 'm3',
    name: 'Ieva Kalniņa',
    category: 'Cleaning',
    rating: 4.89,
    reviewsCount: 86,
    hourlyRate: 20,
    experienceYears: 4,
    distanceKm: 0.8,
    district: 'Āgenskalns',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    phone: '+371 26 555 666',
    isVerified: true,
    isOnline: true,
    emergencyAvailable: false,
    bio: 'Deep home and post-renovation cleaning specialist. Eco-friendly professional chemicals, meticulous eye for detail.',
    badges: ['Eco Friendly', 'Vetted ID', 'Insured']
  },
  {
    id: 'm4',
    name: 'Māris Ozols',
    category: 'Handyman',
    rating: 4.91,
    reviewsCount: 110,
    hourlyRate: 28,
    experienceYears: 7,
    distanceKm: 1.8,
    district: 'Purvciems',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    phone: '+371 25 777 888',
    isVerified: true,
    isOnline: true,
    emergencyAvailable: true,
    bio: 'IKEA furniture assembly, TV wall mounting, drywall patch repairs, door adjustments. Punctual and clean work.',
    badges: ['IKEA Specialist', 'Own Tools', 'Flexible Hours']
  },
  {
    id: 'm5',
    name: 'Aleksejs Ivanovs',
    category: 'Locksmith',
    rating: 5.0,
    reviewsCount: 72,
    hourlyRate: 45,
    experienceYears: 15,
    distanceKm: 2.9,
    district: 'Imanta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    phone: '+371 27 888 999',
    isVerified: true,
    isOnline: true,
    emergencyAvailable: true,
    bio: 'Emergency lock opening without damaging doors. Lock cylinder upgrades, intercom key duplicates.',
    badges: ['24/7 Emergency', 'Non-Destructive', 'Certified']
  },
  {
    id: 'm6',
    name: 'Edgars Krūmiņš',
    category: 'Heating',
    rating: 4.88,
    reviewsCount: 65,
    hourlyRate: 42,
    experienceYears: 10,
    distanceKm: 3.4,
    district: 'Jugla',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    phone: '+371 22 999 000',
    isVerified: true,
    isOnline: false,
    emergencyAvailable: true,
    bio: 'Boiler maintenance, gas and pellet heating system repairs, underfloor heating diagnostics in Riga & Pierīga.',
    badges: ['Gas Certified', 'Winter Emergency Hero']
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-demo-001',
    customerId: 'c1',
    customerName: 'Roberts Vītols',
    customerPhone: '+371 29 876 543',
    category: 'Plumbing',
    urgency: 'emergency',
    address: 'Brīvības iela 88, Dz. 14, Rīga',
    district: 'Centrs',
    description: 'Kitchen sink pipe is leaking aggressively under the cabinet. Water shut off valve is stuck.',
    status: 'on_the_way',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    estimatedPrice: 45,
    assignedMeister: INITIAL_MEISTERS[0],
    etaMinutes: 12,
    messages: [
      { id: 'm-1', sender: 'system', text: 'Job request submitted. Radar dispatch searching for Meisters...', timestamp: '14:22' },
      { id: 'm-2', sender: 'system', text: 'Meister Jānis Bērziņš accepted your request!', timestamp: '14:24' },
      { id: 'm-3', sender: 'meister', text: 'Sveiks! I am packed and heading your way with replacement gaskets. ETA around 12 mins.', timestamp: '14:25' },
      { id: 'm-4', sender: 'customer', text: 'Paldies! Door code is #4821, 3rd floor.', timestamp: '14:26' },
      { id: 'm-5', sender: 'meister', text: 'Got it, see you shortly.', timestamp: '14:26' }
    ]
  },
  {
    id: 'job-demo-002',
    customerId: 'c2',
    customerName: 'Laura Zvaigzne',
    customerPhone: '+371 26 123 456',
    category: 'Electrical',
    urgency: 'today',
    address: 'K. Valdemāra iela 32, Rīga',
    district: 'Centrs',
    description: 'Chandelier installation in living room ceiling and replace 2 burnt socket outlets.',
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    estimatedPrice: 55,
    assignedMeister: INITIAL_MEISTERS[1],
    messages: [
      { id: 'm-20', sender: 'system', text: 'Job completed successfully. Total paid: €55.00', timestamp: '12:15' }
    ],
    rating: 5,
    review: 'Artūrs was super fast, brought all safety gear, and cleaned up after drilling. Excellent master!'
  }
];

interface MarketplaceState {
  meisters: MeisterProfile[];
  jobs: Job[];
  currentMeisterId: string;
  activeJobId: string | null;
  swipes: Swipe[];
  matches: Match[];
}

class MarketplaceStore {
  private state: MarketplaceState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): MarketplaceState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.jobs) && Array.isArray(parsed.meisters)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load marketplace state from localStorage:', e);
    }
    return {
      meisters: INITIAL_MEISTERS,
      jobs: INITIAL_JOBS,
      currentMeisterId: 'm1',
      activeJobId: 'job-demo-001',
      swipes: [],
      matches: []
    };
  }

  private saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save marketplace state:', e);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getState(): MarketplaceState {
    return this.state;
  }

  public resetDemoData() {
    this.state = {
      meisters: INITIAL_MEISTERS,
      jobs: INITIAL_JOBS,
      currentMeisterId: 'm1',
      activeJobId: 'job-demo-001',
      swipes: [],
      matches: []
    };
    this.saveState();
  }

  public scoreMeisterForJob(job: Job, meister: MeisterProfile): RankedMeister {
    const reasons: string[] = [];
    let score = 0;
    if (meister.category.toLowerCase() === job.category.toLowerCase()) { score += 40; reasons.push('Trade matches the job category'); }
    else { score += 5; reasons.push('Different trade, usable for general tasks'); }
    if (meister.district === job.district) { score += 20; reasons.push(`Same district (${job.district})`); }
    else { score += 8; reasons.push(`${meister.distanceKm.toFixed(1)} km away in ${meister.district}`); }
    const ratingPts = Math.round((meister.rating / 5) * 20);
    score += ratingPts;
    reasons.push(`Rated ${meister.rating.toFixed(2)} from ${meister.reviewsCount} reviews`);
    if (meister.experienceYears >= 8) { score += 10; reasons.push(`${meister.experienceYears} yrs experience`); }
    else { score += 5; reasons.push(`${meister.experienceYears} yrs experience`); }
    if (job.urgency === 'emergency' && meister.emergencyAvailable) { score += 10; reasons.push('Available for emergencies'); }
    if (!meister.isOnline) { score -= 15; reasons.push('Currently offline'); }
    return { meister, score: Math.max(0, Math.min(100, score)), reasons };
  }

  public rankedMeistersForJob(jobId: string): RankedMeister[] {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (!job) return [];
    const swiped = new Set(this.state.swipes.filter(s => s.jobId === jobId && s.side === 'customer').map(s => s.meisterId));
    return this.state.meisters
      .filter(m => !swiped.has(m.id))
      .map(m => this.scoreMeisterForJob(job, m))
      .sort((a, b) => b.score - a.score);
  }

  public recordSwipe(jobId: string, meisterId: string, side: SwipeSide, direction: SwipeDirection): Match | null {
    const job = this.state.jobs.find(j => j.id === jobId);
    const meister = this.state.meisters.find(m => m.id === meisterId);
    if (!job || !meister) return null;
    this.state.swipes = [
      ...this.state.swipes.filter(s => !(s.jobId === jobId && s.meisterId === meisterId && s.side === side)),
      { id: `sw-${Date.now().toString(36)}`, jobId, meisterId, side, direction, createdAt: new Date().toISOString() }
    ];
    let match: Match | null = null;
    if (direction === 'like') {
      const other: SwipeSide = side === 'customer' ? 'employer' : 'customer';
      const reciprocal = this.state.swipes.find(s => s.jobId === jobId && s.meisterId === meisterId && s.side === other && s.direction === 'like');
      const exists = this.state.matches.find(m => m.jobId === jobId && m.meisterId === meisterId && m.active);
      if (reciprocal && !exists) {
        const ranked = this.scoreMeisterForJob(job, meister);
        match = { id: `match-${Date.now().toString(36)}`, jobId, meisterId, customerName: job.customerName, score: ranked.score, reasons: ranked.reasons, createdAt: new Date().toISOString(), active: true };
        this.state.matches = [match, ...this.state.matches];
        this.state.jobs = this.state.jobs.map(j => j.id === jobId
          ? { ...j, status: 'accepted', assignedMeister: meister, etaMinutes: Math.round(meister.distanceKm * 6 + 6), messages: [...j.messages, { id: `msg-${Date.now()}`, sender: 'system' as const, text: `Mutual match with ${meister.name}. Chat unlocked.`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] }
          : j);
      }
    }
    this.saveState();
    return match;
  }

  public setActiveJob(jobId: string | null) {
    this.state.activeJobId = jobId;
    this.saveState();
  }

  public setCurrentMeister(meisterId: string) {
    this.state.currentMeisterId = meisterId;
    this.saveState();
  }

  public toggleMeisterOnline(meisterId: string, isOnline: boolean) {
    this.state.meisters = this.state.meisters.map(m =>
      m.id === meisterId ? { ...m, isOnline } : m
    );
    this.saveState();
  }

  public createJob(params: {
    category: string;
    urgency: 'emergency' | 'today' | '2-3-days' | 'flexible';
    address: string;
    district?: string;
    description: string;
    customerName: string;
    customerPhone: string;
    directMeisterId?: string;
  }): Job {
    const assignedMeister = params.directMeisterId
      ? this.state.meisters.find(m => m.id === params.directMeisterId)
      : undefined;

    const newJob: Job = {
      id: `job-${Date.now().toString(36)}`,
      customerId: 'current-user',
      customerName: params.customerName || 'Customer',
      customerPhone: params.customerPhone || '+371 20 000 000',
      category: params.category,
      urgency: params.urgency,
      address: params.address,
      district: params.district || 'Centrs',
      description: params.description,
      status: assignedMeister ? 'accepted' : 'searching',
      createdAt: new Date().toISOString(),
      estimatedPrice: assignedMeister ? assignedMeister.hourlyRate : (params.urgency === 'emergency' ? 50 : 35),
      assignedMeister: assignedMeister,
      etaMinutes: assignedMeister ? Math.round(assignedMeister.distanceKm * 6 + 5) : 15,
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'system',
          text: assignedMeister
            ? `Direct booking request sent to ${assignedMeister.name}.`
            : `Job broadcasted to nearby vetted Meisters in ${params.district || 'Riga'}. Radar active!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    this.state.jobs = [newJob, ...this.state.jobs];
    this.state.activeJobId = newJob.id;
    this.saveState();

    // Also attempt optional sync with Supabase if client credentials allow
    try {
      supabase.from('jobs').insert([{
        customer_name: newJob.customerName,
        customer_phone: newJob.customerPhone,
        category: newJob.category,
        urgency: newJob.urgency,
        address: newJob.address,
        description: newJob.description,
        status: newJob.status,
        amount: newJob.estimatedPrice
      }]).then(() => {}).catch(() => {});
    } catch {
      // Offline fallback is fully functional
    }

    return newJob;
  }

  public acceptJob(jobId: string, meisterId: string) {
    const meister = this.state.meisters.find(m => m.id === meisterId);
    if (!meister) return;

    this.state.jobs = this.state.jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'accepted',
          assignedMeister: meister,
          etaMinutes: Math.round(meister.distanceKm * 6 + 6),
          messages: [
            ...job.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'system',
              text: `🎉 Meister ${meister.name} accepted the job!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            {
              id: `msg-${Date.now() + 1}`,
              sender: 'meister',
              text: `Sveiki! I have accepted your request. I'm preparing my tools and will leave shortly.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return job;
    });
    this.saveState();
  }

  public updateJobStatus(jobId: string, status: JobStatus) {
    this.state.jobs = this.state.jobs.map(job => {
      if (job.id === jobId) {
        let statusMessage = '';
        if (status === 'on_the_way') statusMessage = '🚗 Meister is now en route to your address!';
        else if (status === 'in_progress') statusMessage = '🔧 Meister arrived and started work on location.';
        else if (status === 'completed') statusMessage = '✅ Job marked as completed! Review invoice and rate your Meister.';
        else if (status === 'cancelled') statusMessage = '❌ Job has been cancelled.';

        const updatedMessages = statusMessage
          ? [
              ...job.messages,
              {
                id: `msg-${Date.now()}`,
                sender: 'system' as const,
                text: statusMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          : job.messages;

        return {
          ...job,
          status,
          messages: updatedMessages
        };
      }
      return job;
    });
    this.saveState();
  }

  public sendChatMessage(jobId: string, sender: 'customer' | 'meister', text: string) {
    if (!text.trim()) return;
    this.state.jobs = this.state.jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          messages: [
            ...job.messages,
            {
              id: `msg-${Date.now()}`,
              sender,
              text: text.trim(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return job;
    });
    this.saveState();
  }

  public rateJob(jobId: string, rating: number, review: string) {
    this.state.jobs = this.state.jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          rating,
          review: review.trim()
        };
      }
      return job;
    });
    this.saveState();
  }
}

export const marketplaceStore = new MarketplaceStore();

export function useMarketplace() {
  const [state, setState] = useState(() => marketplaceStore.getState());

  useEffect(() => {
    const unsubscribe = marketplaceStore.subscribe(() => {
      setState({ ...marketplaceStore.getState() });
    });
    return unsubscribe;
  }, []);

  return {
    ...state,
    activeJob: state.jobs.find(j => j.id === state.activeJobId),
    currentMeister: state.meisters.find(m => m.id === state.currentMeisterId) || state.meisters[0],
    openJobs: state.jobs.filter(j => j.status === 'searching'),
    setActiveJob: (id: string | null) => marketplaceStore.setActiveJob(id),
    setCurrentMeister: (id: string) => marketplaceStore.setCurrentMeister(id),
    toggleMeisterOnline: (id: string, online: boolean) => marketplaceStore.toggleMeisterOnline(id, online),
    createJob: (params: Parameters<typeof marketplaceStore.createJob>[0]) => marketplaceStore.createJob(params),
    acceptJob: (jobId: string, meisterId: string) => marketplaceStore.acceptJob(jobId, meisterId),
    updateJobStatus: (jobId: string, status: JobStatus) => marketplaceStore.updateJobStatus(jobId, status),
    sendChatMessage: (jobId: string, sender: 'customer' | 'meister', text: string) => marketplaceStore.sendChatMessage(jobId, sender, text),
    rateJob: (jobId: string, rating: number, review: string) => marketplaceStore.rateJob(jobId, rating, review),
    resetDemoData: () => marketplaceStore.resetDemoData(),
    rankedMeistersForJob: (jobId: string) => marketplaceStore.rankedMeistersForJob(jobId),
    recordSwipe: (jobId: string, meisterId: string, side: 'customer' | 'employer', direction: 'like' | 'pass') => marketplaceStore.recordSwipe(jobId, meisterId, side, direction)
  };
}
