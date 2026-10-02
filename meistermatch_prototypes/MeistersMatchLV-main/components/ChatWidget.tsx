import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget: React.FC<{ onOpenRequestForm?: () => void }> = ({ onOpenRequestForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user', text: string, time: string }>>([
    { 
      sender: 'bot', 
      text: 'Sveiki! 👋 Looking for an emergency plumber, electrician, or cleaner in Riga? How can we help today?', 
      time: 'Just now' 
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputMessage('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: `Got it! We have 6 vetted meisters active in Centrs & Teika ready for "${userText}". Would you like to request an instant match?`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Floating Dismissible Greeting Bubble (Section 5.7) */}
      <AnimatePresence>
        {!isOpen && !bubbleDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-3 p-3.5 bg-[#161E2E] border border-white/[0.1] rounded-2xl shadow-2xl flex items-center gap-3 text-xs text-[#F9F0FF] max-w-[260px]"
          >
            <div className="w-2 h-2 rounded-full bg-[#57FF9D] animate-pulse flex-shrink-0" />
            <span className="flex-1 text-[#A0AEC0]">
              Need help matching with a Riga Meister?
            </span>
            <button 
              onClick={() => setBubbleDismissed(true)} 
              className="text-[#6B7A90] hover:text-white transition-colors"
              title="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[340px] sm:w-[380px] h-[460px] bg-[#161E2E] border border-white/[0.1] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-[#0D131C] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F9F0FF]">MeisterMatch Concierge</h4>
                  <p className="text-[10px] text-[#57FF9D] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#57FF9D]" />
                    Online • Avg response under 1 min
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#A0AEC0] hover:text-white rounded-full hover:bg-white/[0.06] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#6366F1] text-white rounded-br-none'
                        : 'bg-[#1C2638] text-[#F9F0FF] border border-white/[0.06] rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-[#6B7A90] mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-[#0D131C] border-t border-white/[0.08] flex items-center gap-2">
              <input 
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about repairs in Riga..."
                className="flex-1 bg-[#161E2E] border border-white/[0.08] text-xs text-[#F9F0FF] placeholder:text-[#6B7A90] rounded-full px-4 py-2.5 outline-none focus:border-[#6366F1]"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#6366F1] hover:bg-[#4F46E5] text-white flex items-center justify-center transition-all disabled:opacity-50"
                disabled={!inputMessage.trim()}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular Trigger Button (Section 5.7) */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setBubbleDismissed(true);
        }}
        className="w-14 h-14 rounded-full bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95"
        title="Live Dispatch Assistance"
      >
        <MessageCircle size={24} />
      </button>

    </div>
  );
};
