import { supabase } from "@/lib/supabase";

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
  highlights?: string[];
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
    highlights: ["Licensed High-Voltage", "Covers Centrs & Pierīga", "Available This Week"],
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
    highlights: ["Emergency Unblocking", "Heating & Boilers", "Certified Work"],
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
    bio: "MIG/TIG certified welder with EN ISO 9606 certification. Staircases, railings, structural steel beam supports, and custom metalwork.",
    skills: ["TIG/MIG Welding", "Custom Railings", "Structural Beams", "Stainless Steel", "On-Site Rig"],
    languages: ["Latvian", "English"],
    availability: "one_to_two_weeks",
    verified: true,
    responseRate: "< 30 min",
    phone: "+371 28 334 990",
    email: "maris.ozols@meistermatch.lv",
    highlights: ["EN ISO 9606 Certified", "Heavy Metalwork", "Custom Gates"],
  },
  {
    id: "w004",
    name: "Kristaps Kalniņš",
    profession: "Finish Carpenter & Custom Cabinetry Maker",
    trade: "carpenter",
    district: "Teika",
    location: "Teika, Rīga",
    coverage: "Riga, Sigulda, Ogre",
    hourly_rate_eur: 22,
    estProject: "€150 - €600 avg. job",
    rating: 4.92,
    reviews: 79,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop",
    bio: "Skilled carpenter focused on custom kitchen furniture assembly, solid oak doors, wood panelling, and hardwood floor installation.",
    skills: ["Kitchen Assembly", "Hardwood Floors", "Custom Shelving", "Door Hanging", "Restoration"],
    languages: ["Latvian", "English"],
    availability: "immediate",
    verified: true,
    responseRate: "< 25 min",
    phone: "+371 27 551 224",
    email: "kristaps.carpentry@meistermatch.lv",
    highlights: ["Fine Woodworking", "Custom Furniture", "Certified Carpenter"],
  },
  {
    id: "w005",
    name: "Artūrs Vītols",
    profession: "HVAC & Heat Pump Technician",
    trade: "hvac",
    district: "Imanta",
    location: "Imanta, Rīga",
    coverage: "Riga, Jūrmala, Jelgava",
    hourly_rate_eur: 26,
    estProject: "€180 - €700 avg. job",
    rating: 4.88,
    reviews: 51,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
    bio: "Daikin & Panasonic certified installer. Air-to-air, air-to-water heat pump servicing, ventilation recovery units, and climate maintenance.",
    skills: ["Heat Pump Install", "AC Servicing", "Ventilation Ducts", "Freon Certification", "Winter Prep"],
    languages: ["Latvian", "Russian", "English"],
    availability: "immediate",
    verified: true,
    responseRate: "< 15 min",
    phone: "+371 29 883 412",
    email: "arturs.hvac@meistermatch.lv",
    highlights: ["F-Gas Certified", "Warranty Service", "Immediate Diagnostics"],
  },
  {
    id: "w006",
    name: "Dmitrijs Ivanovs",
    profession: "Interior & Exterior Finishing Painter",
    trade: "painter",
    district: "Purvciems",
    location: "Purvciems, Rīga",
    coverage: "All Riga Neighborhoods & Pierīga",
    hourly_rate_eur: 18,
    estProject: "€80 - €350 avg. job",
    rating: 4.79,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
    bio: "Airless paint spraying, drywall skim-coating (spaktelēšana), wallpaper application, and wood façade staining with premium clean-up.",
    skills: ["Airless Spraying", "Drywall Smoothing", "Wallpapering", "Exterior Staining", "Color Matching"],
    languages: ["Latvian", "Russian"],
    availability: "immediate",
    verified: true,
    responseRate: "< 10 min",
    phone: "+371 26 120 784",
    email: "dmitrijs.painter@meistermatch.lv",
    highlights: ["Airless Spray Tech", "Dustless Sanding", "Fast Turnaround"],
  },
  {
    id: "w007",
    name: "Linda Bērziņa",
    profession: "Post-Construction & Deep Cleaning Lead",
    trade: "cleaning",
    district: "Ziepniekkalns",
    location: "Ziepniekkalns, Rīga",
    coverage: "Riga & Mārupe",
    hourly_rate_eur: 16,
    estProject: "€70 - €220 avg. job",
    rating: 4.91,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
    bio: "Professional post-construction debris cleanup, window glass scaling, commercial steam deep cleans, and residential turnovers.",
    skills: ["Post-Build Cleanup", "Window Detailing", "Steam Cleaning", "Floor Polishing", "Odor Removal"],
    languages: ["Latvian", "English"],
    availability: "immediate",
    verified: true,
    responseRate: "< 10 min",
    phone: "+371 25 990 123",
    email: "jane.clean@meistermatch.lv",
    highlights: ["Industrial Steamers", "Post-Renovation Clean", "Eco Detergents"],
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
    highlights: ["Lawn Irrigation", "Natural Stone Paving", "Hedge Shaping"],
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

// Background sync to Supabase (non-blocking with graceful fallback)
async function syncSwipeToSupabase(tradespersonId: string, direction: "like" | "pass") {
  try {
    const rawUser = localStorage.getItem("meister_user");
    const user = rawUser ? JSON.parse(rawUser) : null;
    const customerEmail = user?.email || "anonymous_guest@meistermatch.lv";

    // Insert swipe activity log or rating into Supabase
    await supabase.from("swipes").insert([
      {
        user_email: customerEmail,
        tradesperson_id: tradespersonId,
        direction: direction,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (err) {
    // Graceful offline fallback
    console.debug("Supabase swipe sync skipped or table awaiting migration:", err);
  }
}

export function recordSwipe(tradespersonId: string, direction: "like" | "pass"): MatchRecord | null {
  if (typeof window === "undefined") return null;
  
  const rawSwipes = localStorage.getItem(SWIPES_STORAGE_KEY);
  const swipes: Record<string, string> = rawSwipes ? JSON.parse(rawSwipes) : {};
  swipes[tradespersonId] = direction;
  localStorage.setItem(SWIPES_STORAGE_KEY, JSON.stringify(swipes));

  // Asynchronously sync swipe to Supabase
  syncSwipeToSupabase(tradespersonId, direction);

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
          text: `You have connected with ${person.name}. You can now discuss project scope, check availability, or request an estimate.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: `msg_intro_${Date.now()}`,
          sender: "tradesperson",
          text: `Labdien! Thank you for getting in touch. I am based in ${person.district} with standard rates at €${person.hourly_rate_eur}/hr. What kind of project do you have in mind?`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
      lastMessage: `Labdien! Thank you for getting in touch. I am based in ${person.district}...`,
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

  // Optional background sync of messages to Supabase
  try {
    supabase.from("messages").insert([
      {
        match_id: matchId,
        sender: "user",
        text: text,
        created_at: new Date().toISOString(),
      },
    ]).then();
  } catch (err) {
    console.debug("Supabase message sync notice:", err);
  }

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
