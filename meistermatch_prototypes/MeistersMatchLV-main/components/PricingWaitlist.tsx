import React, { useState, useEffect } from 'react';
import { Check, Mail, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';

export const PricingWaitlist: React.FC<{ t: any }> = ({ t }) => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<'consumer' | 'meister'>('consumer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [position, setPosition] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('waitlist-email');
    if (savedEmail) {
      setIsSuccess(true);
      setIsReturning(true);
      setPosition(localStorage.getItem('waitlist-position') || '---');
      setUserType((localStorage.getItem('waitlist-type') as 'consumer' | 'meister') || 'consumer');
      fetchCurrentPosition(savedEmail);
    }
  }, []);

  const fetchCurrentPosition = async (emailStr: string) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('waitlist')
        .select('created_at, user_type')
        .eq('email', emailStr.toLowerCase().trim())
        .maybeSingle();

      if (userError || !userData) return;

      setUserType(userData.user_type as 'consumer' | 'meister');

      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', userData.created_at);

      if (!error && count !== null) {
        const pos = (count + 1).toString();
        setPosition(pos);
        localStorage.setItem('waitlist-position', pos);
        localStorage.setItem('waitlist-type', userData.user_type);
      }
    } catch (e) {
      console.error("Failed to fetch position", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const cleanEmail = email.toLowerCase().trim();
    setIsSubmitting(true);
    setErrorMsg(null);
    setIsReturning(false);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: cleanEmail, user_type: userType }]);

      if (error) {
        if (error.code === '23505') {
          setIsReturning(true);
          await fetchCurrentPosition(cleanEmail);
          setIsSuccess(true);
          localStorage.setItem('waitlist-email', cleanEmail);
        } else {
          throw error;
        }
      } else {
        await fetchCurrentPosition(cleanEmail);
        setIsSuccess(true);
        localStorage.setItem('waitlist-email', cleanEmail);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-28 md:py-36 bg-[#101722] border-t border-white/[0.06] overflow-hidden">
      
      {/* Soft atmospheric radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-[150px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(167, 139, 250, 0.2) 60%, transparent 75%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Pricing Tiers */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.08em] uppercase text-[#6366F1] mb-3">
                Transparent Economics
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F0FF] tracking-[-0.015em] leading-[1.15]">
                {t.pricing_title.split('.')[0]}.<br />
                <span className="text-[#A0AEC0]">{t.pricing_title.split('.')[1]}</span>
              </h2>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-7 rounded-3xl bg-[#161E2E] border border-white/[0.08] shadow-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-[#F9F0FF]">{t.cust_title}</h3>
                    <p className="text-xs text-[#A0AEC0] mt-0.5">For Riga homeowners and renters</p>
                  </div>
                  <div className="text-2xl font-extrabold text-[#57FF9D]">{t.cust_price}</div>
                </div>
                <ul className="space-y-2.5 mt-5 text-xs text-[#A0AEC0]">
                  <li className="flex gap-2.5 items-center">
                    <Check size={15} className="text-[#57FF9D]" /> 
                    <span>{t.cust_feat_1} & direct master messaging</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check size={15} className="text-[#57FF9D]" /> 
                    <span>{t.cust_feat_2} via protected escrow</span>
                  </li>
                </ul>
              </div>

              <div className="p-7 rounded-3xl bg-[#161E2E]/60 border border-white/[0.06] shadow-md relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-[#F9F0FF]">{t.meister_title}</h3>
                    <p className="text-xs text-[#A0AEC0] mt-0.5">For licensed craftsmen & specialists</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-[#6366F1]/15 text-[#A78BFA] text-[10px] px-2.5 py-1 rounded-full uppercase font-bold border border-[#6366F1]/20">
                      {t.meister_badge}
                    </span>
                    <div className="text-xl font-extrabold text-[#F9F0FF] mt-1">{t.meister_price}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Waitlist Access Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="lg:col-span-6 bg-[#161E2E] p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/[0.08] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#6366F1] text-white text-[10px] font-bold px-3.5 py-1 rounded-bl-xl z-10 tracking-wide">
              {t.launch_badge}
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                  <div className="w-16 h-16 bg-[#57FF9D]/15 text-[#57FF9D] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#57FF9D]/20">
                    <Check size={28} />
                  </div>
                  <h4 className="font-bold text-xl text-[#F9F0FF] mb-2">
                    {isReturning ? t.waitlist_already_on_title : t.waitlist_success_title}
                  </h4>
                  <p className="text-[#A0AEC0] text-sm mb-6 max-w-sm mx-auto">
                    {userType === 'meister' ? t.waitlist_success_desc_meister : t.waitlist_success_desc_consumer}
                  </p>

                  <div className="p-5 bg-[#101722]/80 rounded-2xl border border-white/[0.06] text-left">
                    <p className="text-[10px] uppercase font-bold text-[#A0AEC0] tracking-wider mb-1">{t.waitlist_status_label}</p>
                    <div className="text-4xl font-extrabold text-[#6366F1] tracking-tight">#{position || '---'}</div>
                    <div className="w-full bg-[#1C2638] h-2 rounded-full mt-3 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ delay: 0.4, duration: 0.8 }} className="bg-[#6366F1] h-full" />
                    </div>
                    <p className="text-[11px] mt-3 text-[#A0AEC0]">{t.waitlist_status_cta}</p>
                  </div>

                  <button
                    onClick={() => {
                      localStorage.removeItem('waitlist-email');
                      localStorage.removeItem('waitlist-position');
                      localStorage.removeItem('waitlist-type');
                      setIsSuccess(false);
                      setEmail('');
                    }}
                    className="mt-6 text-xs text-[#A0AEC0] hover:text-[#6366F1] transition-colors"
                  >
                    Not you? Join with another email
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#F9F0FF]">{t.access_title}</h3>
                    <p className="text-[#A0AEC0] text-sm mt-1">{t.access_desc}</p>
                  </div>

                  {errorMsg && (
                    <div className="bg-[#FF5779]/10 text-[#FF5779] p-4 rounded-xl text-xs flex items-center gap-2.5 border border-[#FF5779]/20">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Customer / Meister Toggle */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider">{t.select_user_type}</label>
                    <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#101722] rounded-full border border-white/[0.08]">
                      <button 
                        type="button" 
                        onClick={() => setUserType('consumer')}
                        className={`py-2 rounded-full text-xs font-semibold transition-all ${
                          userType === 'consumer' 
                            ? 'bg-[#6366F1] text-white shadow-sm' 
                            : 'text-[#A0AEC0] hover:text-white'
                        }`}
                      >
                        {t.type_consumer}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setUserType('meister')}
                        className={`py-2 rounded-full text-xs font-semibold transition-all ${
                          userType === 'meister' 
                            ? 'bg-[#6366F1] text-white shadow-sm' 
                            : 'text-[#A0AEC0] hover:text-white'
                        }`}
                      >
                        {t.type_meister}
                      </button>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider mb-2">{t.email_label}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A90]" size={18} />
                      <input
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="janis@riga.lv"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#101722] border border-white/[0.08] text-[#F9F0FF] rounded-full focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none text-sm placeholder:text-[#6B7A90] transition-all"
                      />
                    </div>
                  </div>

                  {/* Pill Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Securing Spot...' : t.btn_join}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};