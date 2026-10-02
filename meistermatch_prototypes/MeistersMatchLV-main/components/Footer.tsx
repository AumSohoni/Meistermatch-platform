import React from 'react';
import { Hammer } from 'lucide-react';

export const Footer: React.FC<{ t: any }> = ({ t }) => {
  return (
    <footer id="footer" className="bg-[#0D131C] border-t border-white/[0.08] pt-20 pb-12 text-[#A0AEC0]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366F1] via-[#A78BFA] to-[#FF5779] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#101722] rounded-full flex items-center justify-center">
                  <Hammer size={16} className="text-[#F9F0FF]" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#F9F0FF]">
                Meister<span className="text-[#6366F1]">Match</span> LV
              </span>
            </a>
            <p className="text-xs text-[#6B7A90] max-w-sm leading-relaxed">
              Latvia’s first verified real-time craftsman network. Eliminating classifieds uncertainty with vetted professionals, upfront pricing, and protected escrow.
            </p>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F9F0FF]">Trades</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Emergency Plumbing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Heating & HVAC</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Electrical Systems</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Deep Cleaning</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Locksmith 24/7</a></li>
            </ul>
          </div>

          {/* Column 2: Districts */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F9F0FF]">Coverage</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Riga Centrs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Teika & Čiekurkalns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Āgenskalns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Purvciems & Pļavnieki</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jūrmala & Pierīga</a></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F9F0FF]">Platform</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{t.nav_how}</a></li>
              <li><a href="#market" className="hover:text-white transition-colors">{t.nav_market}</a></li>
              <li><a href="#waitlist" className="hover:text-white transition-colors">Meister Accreditation</a></li>
              <li><a href="#waitlist" className="hover:text-white transition-colors">Escrow Guarantee</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Latvia Flag */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-[#6B7A90]">
            {t.footer_rights} Built with high standards for Riga citizens.
          </p>
          <div className="flex items-center gap-2 text-[#A0AEC0]">
            <span>{t.footer_made}</span>
            <div className="h-3 w-5 bg-[#9E3039] relative rounded-[2px] overflow-hidden border border-white/20">
              <div className="absolute top-[35%] bottom-[35%] left-0 right-0 bg-white" />
            </div>
            <span className="font-medium text-[#F9F0FF]">Latvia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};