export interface JobPosting {
  id: string;
  employer: string;
  title: string;
  trade: "electrician" | "plumber" | "welder" | "carpenter" | "hvac" | "painter" | "cleaning" | "gardener";
  required_skills: string[];
  district: string;
  location: string;
  pay_min_eur_h: number;
  pay_max_eur_h: number;
  start_date: string;
  duration: string;
  trial_shift_hours: number;
  description: string;
  created_at: string;
}

export const SEED_JOBS: JobPosting[] = [
  {
    id: "j001",
    employer: "SIA Ziemeļu Jumti & Būve",
    title: "Apartment Electrical Renovation & Fuse Panels",
    trade: "electrician",
    required_skills: ["Circuit Upgrades", "EV Chargers", "Smart Home Automation"],
    district: "Centrs",
    location: "Centrs & Klusais Centrs, Rīga",
    pay_min_eur_h: 22,
    pay_max_eur_h: 27,
    start_date: "Immediate",
    duration: "2-3 weeks project",
    trial_shift_hours: 4,
    description: "Seeking a certified residential electrician for complete rewiring and distribution panel upgrades in historical pre-war apartments in Central Riga. High safety standards required.",
    created_at: "2026-10-18T09:00:00Z"
  },
  {
    id: "j002",
    employer: "SIA Rīgas Santehnikas Grupa",
    title: "Hydronic Heating & Commercial Pipe Fitting",
    trade: "plumber",
    required_skills: ["Underfloor Heating", "Boiler Repair", "Pipe Fitting"],
    district: "Āgenskalns",
    location: "Āgenskalns & Pārdaugava, Rīga",
    pay_min_eur_h: 20,
    pay_max_eur_h: 25,
    start_date: "Within 1 week",
    duration: "Full-time / 1 month contract",
    trial_shift_hours: 4,
    description: "Urgent contractor needed for hydronic underfloor heating layout, copper manifold connection, and boiler commissioning across 4 residential townhomes in Āgenskalns.",
    created_at: "2026-10-19T11:30:00Z"
  },
  {
    id: "j003",
    employer: "Metāla Konstrukcijas SIA",
    title: "Structural TIG/MIG Welder for Balcony Railings",
    trade: "welder",
    required_skills: ["TIG/MIG Welding", "Custom Railings", "Structural Beams"],
    district: "Ķengarags",
    location: "Ķengarags Industrial Park, Rīga",
    pay_min_eur_h: 24,
    pay_max_eur_h: 30,
    start_date: "Immediate",
    duration: "On-demand shifts",
    trial_shift_hours: 4,
    description: "Fabrication and on-site assembly of architectural steel railings and terrace support beams. EN ISO 9606 certification or documented experience required.",
    created_at: "2026-10-19T14:15:00Z"
  },
  {
    id: "j004",
    employer: "Ozols & Partneri Woodcraft",
    title: "Finish Carpenter for Custom Kitchen Cabinetry",
    trade: "carpenter",
    required_skills: ["Kitchen Assembly", "Hardwood Floors", "Custom Shelving"],
    district: "Teika",
    location: "Teika & Berģi, Rīga",
    pay_min_eur_h: 21,
    pay_max_eur_h: 26,
    start_date: "Next Monday",
    duration: "Ongoing project work",
    trial_shift_hours: 4,
    description: "Precision installation of bespoke oak and walnut kitchen units, soft-close hardware fittings, and solid hardwood flooring in residential renovation.",
    created_at: "2026-10-20T08:00:00Z"
  },
  {
    id: "j005",
    employer: "SIA Baltic Climate Solutions",
    title: "Heat Pump & Ventilation Recovery Installation",
    trade: "hvac",
    required_skills: ["Heat Pump Install", "AC Servicing", "Ventilation Ducts"],
    district: "Imanta",
    location: "Imanta & Babīte",
    pay_min_eur_h: 23,
    pay_max_eur_h: 28,
    start_date: "Immediate",
    duration: "2 weeks",
    trial_shift_hours: 4,
    description: "Installation of air-to-water heat pumps and balanced mechanical ventilation units for modern energy-efficient single-family homes.",
    created_at: "2026-10-20T10:00:00Z"
  },
  {
    id: "j006",
    employer: "Rīgas Apdares Meistari",
    title: "Airless Spray Painting & Drywall Smoothing",
    trade: "painter",
    required_skills: ["Airless Spraying", "Drywall Smoothing", "Color Matching"],
    district: "Purvciems",
    location: "Purvciems & Dārzciems, Rīga",
    pay_min_eur_h: 18,
    pay_max_eur_h: 23,
    start_date: "This Friday",
    duration: "1 week project",
    trial_shift_hours: 4,
    description: "High-volume airless spray priming and painting of newly boarded commercial offices. Dustless sanding equipment and clean finish required.",
    created_at: "2026-10-20T11:00:00Z"
  }
];

const JOB_SWIPES_STORAGE_KEY = "meister_job_swipes_v1";
const JOB_APPLICATIONS_STORAGE_KEY = "meister_job_applications_v1";

export function getJobApplications(): { job: JobPosting; appliedAt: string; status: "applied" | "interview" | "trial_scheduled" }[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(JOB_APPLICATIONS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordJobSwipe(jobId: string, direction: "like" | "pass"): JobPosting | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(JOB_SWIPES_STORAGE_KEY);
  const swipes: Record<string, string> = raw ? JSON.parse(raw) : {};
  swipes[jobId] = direction;
  localStorage.setItem(JOB_SWIPES_STORAGE_KEY, JSON.stringify(swipes));

  if (direction === "like") {
    const job = SEED_JOBS.find((j) => j.id === jobId);
    if (!job) return null;

    const apps = getJobApplications();
    if (!apps.some((a) => a.job.id === jobId)) {
      apps.unshift({
        job,
        appliedAt: new Date().toISOString(),
        status: "applied"
      });
      localStorage.setItem(JOB_APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
    }
    return job;
  }
  return null;
}
