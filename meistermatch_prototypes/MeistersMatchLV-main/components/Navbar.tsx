import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Language } from '../App';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  onOpenPrototype?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, language, setLanguage, t, onOpenPrototype }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav_features, href: '#features' },
    { name: t.nav_how, href: '#how-it-works' },
    { name: t.nav_market, href: '#market' },
    { name: t.nav_about, href: '#footer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const LangBtn = ({ lang, label }: { lang: Language, label: string }) => {
    const isActive = language === lang;
    return (
      <button
        onClick={() => setLanguage(lang)}
        className={`px-2.5 py-1 text-xs rounded-full transition-all duration-200 ${isActive
          ? 'bg-[#6366F1] text-white font-medium shadow-sm'
          : 'text-[#A0AEC0] hover:text-white hover:bg-white/[0.06]'
          }`}
      >
        {label}
      </button>
    );
  };

  return (
    <nav className={`fixed top-12 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0D131C]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
        {/* Brand mark: solid Latvian-red square, white M. Reason: Riga trade identity, no gradient default. */}
        <a href="#" className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#9E3039] flex items-center justify-center text-white text-lg font-bold" aria-hidden="true">M</span>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-tight text-[#F9F0FF]">
              Meister<span className="text-[#6366F1]">Match</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#A0AEC0] font-medium -mt-1">
              Riga Network
            </span>
          </div>
        </a>

        {/* Desktop Nav Links & Action */}
        <div className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-[#A0AEC0] hover:text-white transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}

          {onOpenPrototype && (
            <button
              onClick={onOpenPrototype}
              className="px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-semibold transition-colors"
            >
              <span>Launch Prototype</span>
            </button>
          )}

          {/* Language Selector Pill */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-[#161E2E] border border-white/[0.08]">
            <LangBtn lang="en" label="EN" />
            <LangBtn lang="lv" label="LV" />
            <LangBtn lang="ru" label="RU" />
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-[#A0AEC0] hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleDarkMode} className="p-2 rounded-full text-[#A0AEC0] hover:text-white">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-[#F9F0FF]">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0D131C] border-b border-white/[0.08] shadow-2xl p-6 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              className="text-base font-medium text-[#A0AEC0] hover:text-white py-2 border-b border-white/[0.05]"
            >
              {link.name}
            </a>
          ))}
          {onOpenPrototype && (
            <button
              onClick={() => { setIsOpen(false); onOpenPrototype(); }}
              className="w-full py-3 rounded-full bg-[#6366F1] text-white text-sm font-semibold shadow-md text-center mt-2"
            >
              Launch Prototype App
            </button>
          )}
          <div className="flex justify-center gap-2 pt-2">
            {(['en', 'lv', 'ru'] as Language[]).map(l => (
              <button key={l} onClick={() => { setLanguage(l); setIsOpen(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  language === l ? 'bg-[#6366F1] text-white' : 'bg-[#161E2E] text-[#A0AEC0] border border-white/[0.08]'
                }`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};