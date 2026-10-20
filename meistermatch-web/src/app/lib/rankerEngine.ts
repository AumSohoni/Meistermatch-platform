/**
 * Thesis 6th Semester Report Matching Engine Implementation
 * (Faithfully reflects Chapter 3.3, Fig. 3.2, Table 3.2 & ml/ranker.py)
 * 
 * 5 Factor Point System (Total max 100):
 *  1. Skill overlap: up to 50 pts
 *  2. District match: 15 pts (local/same district)
 *  3. Availability match: up to 10 pts (10 exact, 4 immediate overlap)
 *  4. Pay fit: up to 15 pts (15 within budget, 8 within 10%)
 *  5. Experience: up to 10 pts (10 for 5+ yrs, 5 for 1+ yrs, 2 otherwise)
 */

export interface FactorBreakdown {
  skillPts: number;
  districtPts: number;
  availabilityPts: number;
  payPts: number;
  experiencePts: number;
}

export interface MatchScoreResult {
  score: number; // 0 - 100
  factors: FactorBreakdown;
  reasons: string[];
}

/**
 * Score a worker profile for a client / employer vacancy
 */
export function scoreWorkerForClient(
  workerSkills: string[],
  workerDistrict: string,
  workerAvailability: string,
  workerRateEur: number,
  workerExpYears: number,
  clientRequiredSkills: string[] = ["Circuit Upgrades", "Panel Install"],
  clientDistrict: string = "Centrs",
  clientMaxRateEur: number = 25
): MatchScoreResult {
  const reasons: string[] = [];
  const factors: FactorBreakdown = {
    skillPts: 0,
    districtPts: 0,
    availabilityPts: 0,
    payPts: 0,
    experiencePts: 0,
  };

  // 1. Skill overlap (up to 50)
  if (clientRequiredSkills.length === 0) {
    factors.skillPts = 25;
    reasons.push("General skill compatibility (No specific skills requested)");
  } else {
    const matched = clientRequiredSkills.filter((s) =>
      workerSkills.some((ws) => ws.toLowerCase() === s.toLowerCase())
    );
    const ratio = matched.length / clientRequiredSkills.length;
    factors.skillPts = Math.round(50 * ratio);
    if (ratio === 1) {
      reasons.push(`All required skills match (${matched.join(", ")})`);
    } else if (matched.length > 0) {
      reasons.push(`Partial skills match (${matched.join(", ")})`);
    } else {
      reasons.push("Specialised skills outside target filter");
    }
  }

  // 2. Same district geography (15 pts)
  if (workerDistrict.toLowerCase() === clientDistrict.toLowerCase()) {
    factors.districtPts = 15;
    reasons.push(`Same district location (${workerDistrict})`);
  } else {
    factors.districtPts = 0;
    reasons.push(`District adjacent (${workerDistrict} vs ${clientDistrict})`);
  }

  // 3. Availability (up to 10 pts)
  if (workerAvailability === "immediate") {
    factors.availabilityPts = 10;
    reasons.push("Immediate availability for dispatch");
  } else if (workerAvailability === "one_to_two_weeks") {
    factors.availabilityPts = 4;
    reasons.push("Availability overlaps within 1-2 weeks");
  } else {
    factors.availabilityPts = 0;
    reasons.push("Specific date availability");
  }

  // 4. Pay fit (up to 15 pts)
  if (workerRateEur <= clientMaxRateEur) {
    factors.payPts = 15;
    reasons.push(`Within client budget (Pays €${workerRateEur}/hr ≤ €${clientMaxRateEur})`);
  } else if (workerRateEur <= clientMaxRateEur * 1.1) {
    factors.payPts = 8;
    reasons.push("Rate slightly above target budget (+10%)");
  } else {
    factors.payPts = 0;
    reasons.push("Rate exceeds target budget");
  }

  // 5. Experience (up to 10 pts)
  if (workerExpYears >= 5) {
    factors.experiencePts = 10;
    reasons.push(`Highly experienced master (${workerExpYears} yrs)`);
  } else if (workerExpYears >= 1) {
    factors.experiencePts = 5;
    reasons.push(`Solid field experience (${workerExpYears} yrs)`);
  } else {
    factors.experiencePts = 2;
    reasons.push("New vocational professional");
  }

  const rawSum =
    factors.skillPts +
    factors.districtPts +
    factors.availabilityPts +
    factors.payPts +
    factors.experiencePts;

  const score = Math.min(rawSum, 100);

  return {
    score,
    factors,
    reasons,
  };
}

/**
 * Score an employer job vacancy for a tradesperson / Meister
 * (Corresponds to ml/ranker.py:score_jobs_for_worker)
 */
export function scoreJobForWorker(
  jobRequiredSkills: string[],
  jobDistrict: string,
  jobStartDate: string,
  jobPayMinEur: number,
  jobPayMaxEur: number,
  workerSkills: string[] = ["Circuit Upgrades", "EV Chargers", "Smart Home Automation", "Panel Install"],
  workerDistrict: string = "Centrs",
  workerRateEur: number = 24,
  workerExpYears: number = 8
): MatchScoreResult {
  const reasons: string[] = [];
  const factors: FactorBreakdown = {
    skillPts: 0,
    districtPts: 0,
    availabilityPts: 0,
    payPts: 0,
    experiencePts: 0,
  };

  // 1. Skill overlap (up to 50 pts)
  if (jobRequiredSkills.length === 0) {
    factors.skillPts = 25;
    reasons.push("No specific required skills listed");
  } else {
    const matched = jobRequiredSkills.filter((s) =>
      workerSkills.some((ws) => ws.toLowerCase() === s.toLowerCase())
    );
    const ratio = matched.length / jobRequiredSkills.length;
    factors.skillPts = Math.round(50 * ratio);
    if (ratio === 1) {
      reasons.push(`All your skills match this vacancy (${matched.join(", ")})`);
    } else if (matched.length > 0) {
      reasons.push(`Partial skill match (${matched.join(", ")})`);
    } else {
      reasons.push("Alternative specialisation required");
    }
  }

  // 2. Same district geography (15 pts)
  if (jobDistrict.toLowerCase() === workerDistrict.toLowerCase()) {
    factors.districtPts = 15;
    reasons.push(`Located in your district (${jobDistrict})`);
  } else {
    factors.districtPts = 0;
    reasons.push(`Job in ${jobDistrict} (near your district)`);
  }

  // 3. Availability overlap (up to 10 pts)
  if (jobStartDate.toLowerCase() === "immediate") {
    factors.availabilityPts = 10;
    reasons.push("Immediate start matches your schedule");
  } else {
    factors.availabilityPts = 4;
    reasons.push(`Starts ${jobStartDate}`);
  }

  // 4. Pay fit for worker (up to 15 pts)
  if (jobPayMaxEur >= workerRateEur) {
    factors.payPts = 15;
    reasons.push(`Pays your rate (Offers up to €${jobPayMaxEur}/hr ≥ your €${workerRateEur}/hr)`);
  } else if (jobPayMinEur >= workerRateEur * 0.9) {
    factors.payPts = 8;
    reasons.push(`Pay close to your rate (€${jobPayMinEur}–€${jobPayMaxEur}/hr)`);
  } else {
    factors.payPts = 0;
    reasons.push("Offered rate is below your standard rate");
  }

  // 5. Experience recognition (up to 10 pts)
  if (workerExpYears >= 5) {
    factors.experiencePts = 10;
    reasons.push(`Meets senior trades qualification (${workerExpYears} yrs)`);
  } else if (workerExpYears >= 1) {
    factors.experiencePts = 5;
    reasons.push("Experience suitable for assignment");
  } else {
    factors.experiencePts = 2;
    reasons.push("Standard entry requirements");
  }

  const rawSum =
    factors.skillPts +
    factors.districtPts +
    factors.availabilityPts +
    factors.payPts +
    factors.experiencePts;

  const score = Math.min(rawSum, 100);

  return {
    score,
    factors,
    reasons,
  };
}
