import React, { useState } from 'react';
import { useAuth, UserRole } from '../authStore';

export const AuthScreen: React.FC<{ onDone: (role: UserRole) => void }> = ({ onDone }) => {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'up' | 'in'>('up');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'up') signUp(name, phone, role);
    else signIn(phone, role);
    onDone(role);
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-24 pb-16">
      <p className="text-sm text-[#57FF9D] font-medium">Prototype sign-in (local only, no server)</p>
      <h1 className="text-4xl font-bold mt-2">Join MeisterMatch</h1>
      <p className="text-[#A0AEC0] mt-2">One account to post jobs, swipe ranked Meisters, and follow the full workflow.</p>
      <form onSubmit={submit} className="mt-6 bg-[#161E2E] border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex gap-2" role="tablist" aria-label="Auth mode">
          <button type="button" onClick={() => setMode('up')} className={`flex-1 py-2 rounded-full font-medium ${mode === 'up' ? 'bg-[#6366F1] text-white' : 'bg-white/5 text-[#A0AEC0]'}`}>Sign up</button>
          <button type="button" onClick={() => setMode('in')} className={`flex-1 py-2 rounded-full font-medium ${mode === 'in' ? 'bg-[#6366F1] text-white' : 'bg-white/5 text-[#A0AEC0]'}`}>Log in</button>
        </div>
        {mode === 'up' && (
          <label className="block">
            <span className="text-sm text-[#A0AEC0]">Full name</span>
            <input value={name} onChange={e => setName(e.target.value)} required={mode === 'up'} placeholder="Anna Ozola" className="mt-1 w-full bg-[#101722] border border-white/10 rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#6366F1]" />
          </label>
        )}
        <label className="block">
          <span className="text-sm text-[#A0AEC0]">Phone</span>
          <input value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+371 20 000 000" className="mt-1 w-full bg-[#101722] border border-white/10 rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#6366F1]" />
        </label>
        <div>
          <span className="text-sm text-[#A0AEC0]">I am joining as</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button type="button" onClick={() => setRole('customer')} className={`py-2.5 rounded-xl border font-medium ${role === 'customer' ? 'border-[#6366F1] bg-[#6366F1]/15 text-white' : 'border-white/10 text-[#A0AEC0]'}`}>Customer</button>
            <button type="button" onClick={() => setRole('meister')} className={`py-2.5 rounded-xl border font-medium ${role === 'meister' ? 'border-[#6366F1] bg-[#6366F1]/15 text-white' : 'border-white/10 text-[#A0AEC0]'}`}>Meister</button>
          </div>
        </div>
        <button type="submit" className="w-full py-3 rounded-full bg-[#6366F1] hover:bg-[#5457e5] text-white font-semibold min-h-[44px]">Continue</button>
      </form>
    </div>
  );
};
