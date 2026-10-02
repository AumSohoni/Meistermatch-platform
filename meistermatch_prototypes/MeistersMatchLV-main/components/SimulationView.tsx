import React, { useState } from 'react';
import { useMarketplace } from '../marketplaceStore';
import { SwipeDeck } from './SwipeDeck';

const STEPS = ['Post job', 'Swipe ranked Meisters', 'Mutual match', 'Track and chat', 'Complete and rate'];

export const SimulationView: React.FC = () => {
  const { jobs, activeJob, setActiveJob, createJob, updateJobStatus, rateJob } = useMarketplace();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ category: 'Plumbing', urgency: 'today' as const, address: 'Brivibas iela 88, Riga', district: 'Centrs', description: 'Kitchen sink leak under cabinet.', customerName: 'Demo Customer', customerPhone: '+371 20 000 000' });

  const postJob = (e: React.FormEvent) => {
    e.preventDefault();
    const job = createJob(form);
    setActiveJob(job.id);
    setStep(1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
      <p className="text-sm text-[#57FF9D] font-medium">Guided workflow simulation with demo data</p>
      <h1 className="text-4xl font-bold mt-2">From job post to rating</h1>
      <ol className="flex flex-wrap gap-2 mt-4" aria-label="Workflow progress">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button onClick={() => setStep(i)} className={`px-3 py-1.5 rounded-full text-sm border min-h-[44px] ${i === step ? 'bg-[#6366F1] text-white border-[#6366F1]' : 'border-white/10 text-[#A0AEC0]'}`} aria-current={i === step ? 'step' : undefined}>{i + 1}. {s}</button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <form onSubmit={postJob} className="mt-6 bg-[#161E2E] border border-white/10 rounded-2xl p-5 grid gap-4 md:grid-cols-2">
          <label className="block">Category<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1 w-full bg-[#101722] border border-white/10 rounded-xl px-3 py-2.5">{['Plumbing', 'Electrical', 'Handyman', 'Cleaning', 'Locksmith', 'Heating'].map(c => <option key={c}>{c}</option>)}</select></label>
          <label className="block">Urgency<select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value as typeof form.urgency })} className="mt-1 w-full bg-[#101722] border border-white/10 rounded-xl px-3 py-2.5">{['emergency', 'today', '2-3-days', 'flexible'].map(u => <option key={u} value={u}>{u}</option>)}</select></label>
          <label className="block md:col-span-2">Address<input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required className="mt-1 w-full bg-[#101722] border border-white/10 rounded-xl px-3 py-2.5" /></label>
          <label className="block md:col-span-2">Description<textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3} className="mt-1 w-full bg-[#101722] border border-white/10 rounded-xl px-3 py-2.5" /></label>
          <div className="md:col-span-2"><button type="submit" className="px-6 py-3 rounded-full bg-[#6366F1] text-white font-semibold min-h-[44px]">Post job and continue</button></div>
        </form>
      )}

      {step === 1 && (
        <div className="mt-6">
          <label className="block max-w-sm">Active job<select value={activeJob?.id || ''} onChange={e => setActiveJob(e.target.value)} className="mt-1 w-full bg-[#101722] border border-white/10 rounded-xl px-3 py-2.5">{jobs.slice(0, 8).map(j => <option key={j.id} value={j.id}>{j.category} - {j.address}</option>)}</select></label>
          <div className="mt-4">{activeJob && <SwipeDeck jobId={activeJob.id} />}</div>
          <button onClick={() => setStep(2)} className="mt-4 px-6 py-3 rounded-full border border-white/15 text-white min-h-[44px]">Continue to match</button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 bg-[#161E2E] border border-white/10 rounded-2xl p-5">
          <h2 className="text-xl font-semibold">Match status</h2>
          {!activeJob?.assignedMeister && <p className="text-[#A0AEC0] mt-2">No mutual match yet. Go back and like a Meister who likes this job back.</p>}
          {activeJob?.assignedMeister && <p className="text-[#A0AEC0] mt-2">Matched with {activeJob.assignedMeister.name}. Status: {activeJob.status}.</p>}
          <button onClick={() => setStep(3)} className="mt-4 px-6 py-3 rounded-full bg-[#6366F1] text-white font-semibold min-h-[44px]">Continue to tracking</button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 bg-[#161E2E] border border-white/10 rounded-2xl p-5 space-y-3">
          <h2 className="text-xl font-semibold">Track and update</h2>
          <p className="text-[#A0AEC0]">Use the Customer App tracker for chat. Quick status controls:</p>
          <div className="flex flex-wrap gap-2">
            {(['on_the_way', 'in_progress', 'completed'] as const).map(s => (
              <button key={s} disabled={!activeJob} onClick={() => activeJob && updateJobStatus(activeJob.id, s)} className="px-4 py-2 rounded-full border border-white/15 min-h-[44px]">{s.replace('_', ' ')}</button>
            ))}
          </div>
          <button onClick={() => setStep(4)} className="px-6 py-3 rounded-full bg-[#6366F1] text-white font-semibold min-h-[44px]">Continue to rating</button>
        </div>
      )}

      {step === 4 && (
        <div className="mt-6 bg-[#161E2E] border border-white/10 rounded-2xl p-5">
          <h2 className="text-xl font-semibold">Complete and rate</h2>
          {!activeJob && <p className="text-[#A0AEC0]">No active job.</p>}
          {activeJob && (
            <div className="flex gap-2 mt-3" role="group" aria-label="Rate job">
              {[4, 5].map(r => <button key={r} onClick={() => { rateJob(activeJob.id, r, r === 5 ? 'Fast and tidy work.' : 'Good work.'); }} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 min-h-[44px]">{r} stars</button>)}
            </div>
          )}
          {activeJob?.rating && <p className="text-[#57FF9D] mt-3" role="status">Rated {activeJob.rating}/5. Workflow complete.</p>}
        </div>
      )}
    </div>
  );
};
