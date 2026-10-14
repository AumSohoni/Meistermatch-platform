export interface Tradesperson {
  id: string;
  name: string;
  profession: string;
  trade: "electrician" | "plumber" | "welder" | "carpenter" | "hvac" | "painter" | "cleaning" | "gardener";
  district: string;
  location: string;
  coverage: string;
  hourly_rate_eur: number;
  estProject: string;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  skills: string[];
  languages: string[];
  availability: "immediate" | "one_to_two_weeks" | "specific_date";
  verified: boolean;
  responseRate: string;
  phone: string;
  email: string;
  matchScore?: number;
  matchReasons?: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "tradesperson" | "system";
  text: string;
  time: string;
}

export interface MatchRecord {
  id: string;
  tradespersonId: string;
  tradesperson: Tradesperson;
  createdAt: string;
  messages: ChatMessage[];
  lastMessage?: string;
  lastMessageTime?: string;
}

export const TRADESPEOPLE: Tradesperson[] = [
  {
    id: "w001",
    name: "Jānis Bērziņš",
    profession: "Certified High-Voltage & Residential Electrician",
    trade: "electrician",
    district: "Centrs",
    location: "Centrs, Rīga",
    coverage: "Riga & Pierīga (within 35km)",
    hourly_rate_eur: 24,
    estProject: "€120 - €450 avg. job",
    rating: 4.9,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop",
    bio: "Certified high-voltage electrician with 8+ years of experience in smart home wiring, fuse box rebuilds, and EV chargers. Fluent in LV and EN.",
    skills: ["Circuit Upgrades", "EV Chargers", "Smart Home Automation", "Panel Install", "Emergency 24/7"],
    languages: ["Latvian", "English", "Russian"],
    availability: "immediate",
    verified: true,
    responseRate: "< 10 min",
    phone: "+371 29 112 345",
    email: "janis.berzins@meistermatch.lv",
    matchScore: 95,
    matchReasons: ["High skill match (Wiring & EV)", "Local in Centrs", "Available immediately"],
  },
  {
    id: "w002",
    name: "Aleksandrs Petrovs",
    profession: "Master Plumber & Heating Systems Specialist",
    trade: "plumber",
    district: "Āgenskalns",
    location: "Āgenskalns, Rīga",
    coverage: "Pārdaugava, Mārupe & Jūrmala",
    hourly_rate_eur: 20,
    estProject: "€90 - €380 avg. job",
    rating: 4.85,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
    bio: "7 years handling leak repairs, hydronic underfloor heating, copper piping, and emergency drain unblocking. Clean work guaranteed.",
    skills: ["Bathroom Install", "Leak Repair", "Pipe Fitting", "Underfloor Heating", "Boiler Repair"],
    languages: ["Latvian", "Russian"],
    availability: "immediate",
    verified: true,
    responseRate: "< 15 min",
    phone: "+371 26 443 891",
    email: "aleksandrs.plumbing@meistermatch.lv",
    matchScore: 90,
    matchReasons: ["Immediate availability", "High customer satisfaction (4.85★)", "Within budget"],
  },
  {
    id: "w003",
    name: "Māris Ozols",
    profession: "Industrial Welder & Custom Metal Fabricator",
    trade: "welder",
    district: "Ķengarags",
    location: "Ķengarags, Rīga",
    coverage: "All Greater Riga Industrial Parks",
    hourly_rate_eur: 25,
    estProject: "€200 - €950 avg. job",
    rating: 4.95,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop",
    bio: "20+ years expertise in TIG/MIG metal fabrication, steel gate building, stairs, and structural reinforcement. High-precision welding.",
    skills: ["TIG Welding", "MIG/MAG", "Arc Welding", "Metal Fabrication", "Staircases"],
    languages: ["Latvian", "Russian"],
    availability: "one_to_two_weeks",
    verified: true,
    responseRate: "< 30 min",
    phone: "+371 28 887 654",
    email: "maris.welding@meistermatch.lv",
    matchScore: 88,
    matchReasons: ["20+ years seasoned experience", "Verified certification", "Steel fabrication expert"],
  },
  {
    id: "w004",
    name: "Yves Vergara",
    profession: "All-Around Interior & Exterior Painter",
    trade: "painter",
    district: "Purvciems",
    location: "Purvciems & Ogre",
    coverage: "Riga, Salaspils & Ogre",
    hourly_rate_eur: 18,
    estProject: "€150 - €600 avg. job",
    rating: 4.8,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    bio: "Specializing in dustless interior painting, wall priming, decorative stucco, and weather-resistant facade coatings.",
    skills: ["Interior Decorating", "Wall Sanding", "Facade Painting", "Eco Coatings", "Color Match"],
    languages: ["Latvian", "English"],
    availability: "immediate",
    verified: true,
    responseRate: "< 15 min",
    phone: "+371 20 123 456",
    email: "yves.services@gmail.com",
    matchScore: 84,
    matchReasons: ["Competitive pricing (€18/hr)", "Eco-friendly paints", "Immediate start"],
  },
  {
    id: "w005",
    name: "Kārlis Kalniņš",
    profession: "HVAC & Heat Pump Installation Specialist",
    trade: "hvac",
    district: "Teika",
    location: "Teika, Rīga",
    coverage: "Riga, Sigulda, Cēsis",
    hourly_rate_eur: 28,
    estProject: "€350 - €1,800 avg. job",
    rating: 4.92,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
    bio: "Certified Daikin, Mitsubishi, and Panasonic heat pump installer. Air duct ventilation, recuperation units, and climate balancing.",
    skills: ["Air Heat Pumps", "Recuperators", "Air Conditioning", "Ductwork", "ALTUM Support"],
    languages: ["Latvian", "English"],
    availability: "immediate",
    verified: true,
    responseRate: "< 20 min",
    phone: "+371 29 456 789",
    email: "karlis.hvac@meistermatch.lv",
    matchScore: 92,
    matchReasons: ["Air Heat Pump certification", "Fast quote response", "Covers Teika & Pieriga"],
  },
  {
    id: "w006",
    name: "Dmitrijs Ivanovs",
    profession: "Custom Woodworker & Finish Carpenter",
    trade: "carpenter",
    district: "Ziepniekkalns",
    location: "Ziepniekkalns & Mārupe",
    coverage: "South Riga & Pierīga",
    hourly_rate_eur: 22,
    estProject: "€180 - €750 avg. job",
    rating: 4.78,
    reviews: 49,
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1000&auto=format&fit=crop",
    bio: "Custom kitchen cabinetry assembly, oak flooring installation, door framing, and bespoke wooden terrace construction.",
    skills: ["Cabinetry", "Parquet & Laminate", "Door Hanging", "Terrace Construction", "Framing"],
    languages: ["Latvian", "Russian"],
    availability: "one_to_two_weeks",
    verified: true,
    responseRate: "< 25 min",
    phone: "+371 27 334 112",
    email: "dmitrijs.wood@meistermatch.lv",
    matchScore: 86,
    matchReasons: ["Custom woodwork specialist", "Affordable cabinetry rate", "High rating"],
  },
  {
    id: "w007",
    name: "Jane & Crew",
    profession: "Commercial & Deep Renovation Cleaners",
    trade: "cleaning",
    district: "Imanta",
    location: "Imanta, Rīga",
    coverage: "Entire Riga Metro Area",
    hourly_rate_eur: 16,
    estProject: "€80 - €250 avg. job",
    rating: 4.75,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
    bio: "Equipped with industrial Kärcher steamers and eco-detergents. Specialized in post-construction dust cleanup and high window washing.",
    skills: ["Post-Renovation", "Deep Cleaning", "Window Polishing", "Carpet Extraction", "Eco Cleaners"],
    languages: ["Latvian", "English", "Russian"],
    availability: "immediate",
    verified: true,
    responseRate: "< 5 min",
    phone: "+371 25 990 123",
    email: "jane.clean@meistermatch.lv",
    matchScore: 94,
    matchReasons: ["Instant 5-min response", "Lowest rates in area", "Industrial equipment ready"],
  },
  {
    id: "w008",
    name: "Pēteris Zariņš",
    profession: "Landscape Architect & Automated Irrigation",
    trade: "gardener",
    district: "Jūrmala",
    location: "Jūrmala & Babīte",
    coverage: "Jūrmala, Babīte, Mārupe & West Riga",
    hourly_rate_eur: 19,
    estProject: "€100 - €400 avg. job",
    rating: 4.87,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
    bio: "Automated Hunter/Rainbird irrigation systems, seasonal lawn aeration, hedge trimming, and natural stone paving.",
    skills: ["Irrigation Systems", "Lawn Aeration", "Hedge Shaping", "Patio Tiles", "Tree Pruning"],
    languages: ["Latvian", "English"],
    availability: "immediate",
    verified: true,
    responseRate: "< 20 min",
    phone: "+371 22 771 882",
    email: "peteris.zarins@meistermatch.lv",
    matchScore: 89,
    matchReasons: ["Jūrmala local expert", "Available this week", "Complete toolset"],
  }
];

const MATCHES_STORAGE_KEY = "meister_matches_v2";
const SWIPES_STORAGE_KEY = "meister_swipes_v2";

export function getStoredMatches(): MatchRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(MATCHES_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredMatches(matches: MatchRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches));
}

export function recordSwipe(tradespersonId: string, direction: "like" | "pass"): MatchRecord | null {
  if (typeof window === "undefined") return null;
  
  // Save swipe record
  const rawSwipes = localStorage.getItem(SWIPES_STORAGE_KEY);
  const swipes: Record<string, string> = rawSwipes ? JSON.parse(rawSwipes) : {};
  swipes[tradespersonId] = direction;
  localStorage.setItem(SWIPES_STORAGE_KEY, JSON.stringify(swipes));

  if (direction === "like") {
    const person = TRADESPEOPLE.find((p) => p.id === tradespersonId);
    if (!person) return null;

    const matches = getStoredMatches();
    const existing = matches.find((m) => m.tradespersonId === tradespersonId);
    if (existing) return existing;

    const newMatch: MatchRecord = {
      id: `m_${tradespersonId}_${Date.now()}`,
      tradespersonId: person.id,
      tradesperson: person,
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_welcome_${Date.now()}`,
          sender: "system",
          text: `You and ${person.name} have matched! You can now agree on pricing, schedule an inspection, or ask questions directly.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: `msg_intro_${Date.now()}`,
          sender: "tradesperson",
          text: `Sveiki! Paldies par interesi. I'm available in ${person.district} starting at €${person.hourly_rate_eur}/hr. How can I help you with your project?`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
      lastMessage: `Sveiki! Paldies par interesi. I'm available in ${person.district}...`,
      lastMessageTime: "Just now",
    };

    matches.unshift(newMatch);
    saveStoredMatches(matches);
    return newMatch;
  }

  return null;
}

export function addChatMessage(matchId: string, text: string): ChatMessage | null {
  const matches = getStoredMatches();
  const matchIndex = matches.findIndex((m) => m.id === matchId);
  if (matchIndex === -1) return null;

  const newMsg: ChatMessage = {
    id: `msg_${Date.now()}`,
    sender: "user",
    text,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  matches[matchIndex].messages.push(newMsg);
  matches[matchIndex].lastMessage = text;
  matches[matchIndex].lastMessageTime = "Just now";
  saveStoredMatches(matches);

  return newMsg;
}

export function triggerAutoReply(matchId: string, replyText: string): ChatMessage | null {
  const matches = getStoredMatches();
  const matchIndex = matches.findIndex((m) => m.id === matchId);
  if (matchIndex === -1) return null;

  const replyMsg: ChatMessage = {
    id: `reply_${Date.now()}`,
    sender: "tradesperson",
    text: replyText,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  matches[matchIndex].messages.push(replyMsg);
  matches[matchIndex].lastMessage = replyText;
  matches[matchIndex].lastMessageTime = "Just now";
  saveStoredMatches(matches);

  return replyMsg;
}
