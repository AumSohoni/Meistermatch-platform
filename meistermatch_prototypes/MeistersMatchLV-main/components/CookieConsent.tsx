import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC<{ t: any }> = ({ t }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t.cookie_text}
        </p>
        <div className="flex gap-3 shrink-0">
           <button onClick={() => setIsVisible(false)} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 transition-colors rounded-lg">
             {t.cookie_decline}
           </button>
           <button onClick={handleAccept} className="px-6 py-2 text-sm font-bold bg-riga-blue hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all">
             {t.cookie_accept}
           </button>
        </div>
      </div>
    </div>
  );
};