import React, { useState, useEffect } from 'react';
import { PrototypeNav, AppView } from './components/PrototypeNav';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { CategoryPills } from './components/CategoryPills';
import { ProductShowcase } from './components/ProductShowcase';
import { HowItWorks } from './components/HowItWorks';
import { MarketSection } from './components/MarketSection';
import { PricingWaitlist } from './components/PricingWaitlist';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthScreen } from './components/AuthScreen';
import { SimulationView } from './components/SimulationView';
import { useAuth } from './authStore';
import { CustomerApp } from './components/CustomerApp';
import { MeisterPortal } from './components/MeisterPortal';
import { ChatWidget } from './components/ChatWidget';
import { translations } from './translations';

export type Language = 'en' | 'lv' | 'ru';

export default function App() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true; // Default to dark-first system per DESIGN.md
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('app-lang') as Language) || 'en';
    }
    return 'en';
  });

  const [view, setView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') return 'admin';
      if (hash === '#auth') return 'auth';
      if (hash === '#simulation') return 'simulation';
      if (hash === '#customer') return 'customer';
      if (hash === '#meister') return 'meister';
      if (hash === '#landing' || hash === '#home') return 'landing';
    }
    return 'landing'; // Default to the newly redesigned landing page
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') setView('admin');
      else if (hash === '#auth') setView('auth');
      else if (hash === '#simulation') setView('simulation');
      else if (hash === '#customer') setView('customer');
      else if (hash === '#meister') setView('meister');
      else if (hash === '#landing' || hash === '#home') setView('landing');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleViewChange = (newView: AppView) => {
    setView(newView);
    if (newView === 'landing') {
      window.location.hash = '#landing';
    } else {
      window.location.hash = `#${newView}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-lang', lang);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#101722] text-[#F9F0FF] flex flex-col selection:bg-[#6366F1]/30 selection:text-white">
      {/* Top Fixed Prototype Sandbox Bar */}
      <PrototypeNav currentView={view} onViewChange={handleViewChange} />

      {/* Main View Router */}
      <div className="flex-1">
        {view === 'landing' && (
          <div>
            <Navbar
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              language={language}
              setLanguage={changeLanguage}
              t={t}
              onOpenPrototype={() => handleViewChange('customer')}
            />
            <main>
              {/* 1. Hero with atmospheric orbs & interactive preview */}
              <Hero 
                t={t} 
                language={language} 
                onLaunchApp={() => handleViewChange('customer')} 
              />
              
              {/* 2. Problem Statement with pink accent label */}
              <ProblemSection t={t} />

              {/* 3. Solutions Intro with green accent label */}
              <SolutionSection t={t} />

              {/* 4. Modular Systems / Program Pills */}
              <CategoryPills onSelectCategory={() => handleViewChange('customer')} />

              {/* 5. Product UI Showcase / Floating Dashboard Collage */}
              <ProductShowcase onLaunchApp={() => handleViewChange('customer')} />

              {/* 6. How It Works */}
              <HowItWorks t={t} />

              {/* 7. Social Proof & Metrics with cyan accent label */}
              <MarketSection t={t} />

              {/* 8. Pricing & Waitlist Card */}
              <PricingWaitlist t={t} />
            </main>
            
            {/* 9. SaaS Deep Navy Footer */}
            <Footer t={t} />
          </div>
        )}

        {view === 'auth' && (
          <div className="pt-12">
            <AuthScreen onDone={(role) => handleViewChange(role === 'meister' ? 'meister' : 'simulation')} />
          </div>
        )}

        {view === 'simulation' && (
          <div className="pt-12">
            {!user ? (
              <AuthScreen onDone={(role) => handleViewChange(role === 'meister' ? 'meister' : 'simulation')} />
            ) : (
              <SimulationView />
            )}
          </div>
        )}

        {view === 'customer' && (
          <div className="pt-12">
            {!user ? (
              <AuthScreen onDone={(role) => handleViewChange(role === 'meister' ? 'meister' : 'customer')} />
            ) : (
              <CustomerApp onSwitchToMeister={() => handleViewChange('meister')} />
            )}
          </div>
        )}

        {view === 'meister' && (
          <div className="pt-12">
            {!user ? (
              <AuthScreen onDone={(role) => handleViewChange(role === 'meister' ? 'meister' : 'customer')} />
            ) : (
              <MeisterPortal onSwitchToCustomer={() => handleViewChange('customer')} />
            )}
          </div>
        )}

        {view === 'admin' && (
          <div className="pt-12">
            <AdminDashboard />
          </div>
        )}
      </div>

      {/* Persistent Dismissible Floating Chat Widget (Section 5.7) */}
      <ChatWidget onOpenRequestForm={() => handleViewChange('customer')} />

      <CookieConsent t={t} />
    </div>
  );
}