"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Euro,
  FileCheck,
  Award,
  Upload,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  UserCheck,
  ExternalLink,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { getJobApplications } from "../lib/jobsStore";

export default function MeisterPortalPage() {
  const [activeTab, setActiveTab] = useState<"credentials" | "applications">("credentials");
  const [applications, setApplications] = useState<any[]>([]);

  // Meister Profile state (as defined in Thesis Chapter 5.2.2)
  const [meisterProfile, setMeisterProfile] = useState({
    fullName: "Jānis Bērziņš",
    trade: "electrician",
    experienceYears: 8,
    district: "Centrs",
    hourlyRate: 24,
    availability: "immediate",
    willingToRelocate: true,
    certifications: [
      { name: "High-Voltage Electrician (A-Group LV)", issuer: "Latvian Electro-Energy Board", verified: true },
      { name: "EWPA EU Platform Safety", issuer: "European Construction Safety", verified: true },
      { name: "EV Charger Level 3 DC Quick-Charge", issuer: "Schneider Electric Baltic", verified: true }
    ],
    skills: ["Circuit Upgrades", "EV Chargers", "Smart Home Automation", "Panel Install", "Emergency Diagnostics"]
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setApplications(getJobApplications());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-[#111] text-white p-6 sm:p-8 rounded-xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Tradesperson / Meister Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Meister Credentials & Trial Shifts
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Manage your verified construction licenses, set your hourly rate, and track scheduled trial shifts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/swipe"
            scroll={false}
            className="text-xs font-semibold bg-white text-black px-4 py-2.5 rounded-md hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Briefcase className="w-3.5 h-3.5" /> Open Job Swipe Deck &rarr;
          </Link>
          <Link
            href="/chat"
            scroll={false}
            className="text-xs font-medium border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white px-3.5 py-2.5 rounded-md hover:bg-neutral-800 transition-colors"
          >
            Messages
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-1 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab("credentials")}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
            activeTab === "credentials"
              ? "bg-[#111] text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
        >
          Trade Verification & Badges
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
            activeTab === "applications"
              ? "bg-[#111] text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
        >
          My Applications & Trial Shifts ({applications.length})
        </button>
      </div>

      {/* TAB 1: CREDENTIALS & SKILL-BADGES */}
      {activeTab === "credentials" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-8 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Trade Specialisation & Certification Badges
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Configure your public credentials and target hourly compensation visible to hiring employers.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSavedSuccess(true);
                setTimeout(() => setSavedSuccess(false), 2500);
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name / Legal Entity
                  </label>
                  <input
                    type="text"
                    value={meisterProfile.fullName}
                    onChange={(e) => setMeisterProfile({ ...meisterProfile, fullName: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Primary Trade Specialisation
                  </label>
                  <select
                    value={meisterProfile.trade}
                    onChange={(e) => setMeisterProfile({ ...meisterProfile, trade: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-black focus:outline-none bg-white"
                  >
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="welder">Welder</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="hvac">HVAC Technician</option>
                    <option value="painter">Painter</option>
                    <option value="cleaning">Commercial Cleaning</option>
                    <option value="gardener">Landscape Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Base Hourly Rate (€ / hour)
                  </label>
                  <input
                    type="number"
                    min={12}
                    max={60}
                    value={meisterProfile.hourlyRate}
                    onChange={(e) => setMeisterProfile({ ...meisterProfile, hourlyRate: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Operating District & Base Area
                  </label>
                  <input
                    type="text"
                    value={meisterProfile.district}
                    onChange={(e) => setMeisterProfile({ ...meisterProfile, district: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Verified Certifications Section */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                      Uploaded Trade Badges & Certifications
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Verified through Latvian construction qualification registries.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload PDF Cert
                  </button>
                </div>

                <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-[#fafafa]">
                  {meisterProfile.certifications.map((c, i) => (
                    <div key={i} className="p-3.5 flex items-center justify-between text-xs bg-white">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900 block">{c.name}</span>
                          <span className="text-[11px] text-gray-500">Issuer: {c.issuer}</span>
                        </div>
                      </div>
                      <span className="bg-neutral-100 text-neutral-800 font-semibold text-[10px] px-2 py-0.5 rounded border border-neutral-300">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Credentials updated!
                  </span>
                ) : <div />}
                <button
                  type="submit"
                  className="bg-[#111] text-white px-6 py-2.5 rounded-md text-xs sm:text-sm font-semibold hover:bg-black transition-colors"
                >
                  Save Meister Profile
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <TrendingUp className="w-4 h-4 text-gray-900" />
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Meister Status & Metrics
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500">Active Trade</span>
                  <span className="font-semibold text-gray-900 capitalize">{meisterProfile.trade}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500">Target Base Rate</span>
                  <span className="font-semibold text-gray-900">€{meisterProfile.hourlyRate}/hr</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500">Verified Badges</span>
                  <span className="font-semibold text-gray-900">{meisterProfile.certifications.length} Active</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500">Trial Shift Status</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Eligible
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <Link
                  href="/swipe"
                  scroll={false}
                  className="w-full bg-[#111] text-white py-2.5 rounded-md text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" /> Start Swiping Jobs Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATIONS & TRIAL SHIFTS */}
      {activeTab === "applications" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Active Job Applications & Trial Shifts
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Review responses, interview invites, and scheduled 4-hour trial shifts from employers.
            </p>
          </div>

          {applications.length > 0 ? (
            <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {applications.map((app, i) => (
                <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      {app.job.employer}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900">{app.job.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Location: {app.job.location} • Rate: €{app.job.pay_min_eur_h}–€{app.job.pay_max_eur_h}/hr
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-neutral-100 text-neutral-800 text-[11px] font-semibold px-2.5 py-1 rounded border border-neutral-300">
                      Trial Shift Pending
                    </span>
                    <Link
                      href="/chat"
                      scroll={false}
                      className="bg-[#111] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold hover:bg-black transition-colors"
                    >
                      Chat with Employer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#fafafa] p-8 rounded-lg border border-gray-200 text-center space-y-3">
              <p className="text-xs text-gray-500">No applications submitted yet.</p>
              <Link
                href="/swipe"
                scroll={false}
                className="inline-flex items-center gap-1.5 bg-[#111] text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-black transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5" /> Open Job Swipe Deck
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
