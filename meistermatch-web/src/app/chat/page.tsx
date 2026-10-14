"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCheck,
  Sparkles,
  ArrowLeft,
  Clock,
  Euro,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import {
  getStoredMatches,
  addChatMessage,
  triggerAutoReply,
  MatchRecord,
  ChatMessage
} from "../lib/tradesStore";

function ChatInner() {
  const searchParams = useSearchParams();
  const urlMatchId = searchParams.get("matchId");

  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = getStoredMatches();
    setMatches(list);
    if (urlMatchId && list.some((m) => m.id === urlMatchId)) {
      setSelectedMatchId(urlMatchId);
    } else if (list.length > 0) {
      setSelectedMatchId(list[0].id);
    }
  }, [urlMatchId]);

  const activeMatch = matches.find((m) => m.id === selectedMatchId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMatch?.messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatchId || !inputText.trim() || !activeMatch) return;

    const userText = inputText.trim();
    setInputText("");

    const newMsg = addChatMessage(selectedMatchId, userText);
    if (newMsg) {
      setMatches(getStoredMatches());
    }

    // Interactive automated tradesperson reply
    setIsTyping(true);
    setTimeout(() => {
      const personName = activeMatch.tradesperson.name.split(" ")[0];
      const replies = [
        `Thanks for providing the details! I have an opening this Thursday afternoon in ${activeMatch.tradesperson.district}. Does that work for an initial assessment?`,
        `Understood! For this scope, my rate remains €${activeMatch.tradesperson.hourly_rate_eur}/hr with all basic tools included. Could you share some photos of the site?`,
        `Sounds great. I am nearby in ${activeMatch.tradesperson.location} and can drop by for an estimate. Let me know your preferred time!`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      triggerAutoReply(selectedMatchId, randomReply);
      setIsTyping(false);
      setMatches(getStoredMatches());
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Matched Messages & Contracts
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Discuss quotes, hourly rates, and schedule work with verified tradespeople
          </p>
        </div>
        <Link
          href="/swipe"
          className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Swipe
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm space-y-4">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">No Active Matches Yet</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Swipe right on tradespeople in Swipe Mode. When there is mutual interest, their contact channel and chat will appear right here!
          </p>
          <div className="pt-2">
            <Link
              href="/swipe"
              className="inline-flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors shadow-sm"
            >
              Start Swiping Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
          {/* Matches List (Left sidebar) */}
          <div className="md:col-span-4 border-r border-gray-200 flex flex-col bg-gray-50/50">
            <div className="p-4 border-b border-gray-200 bg-white">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Active Conversations ({matches.length})
              </span>
            </div>

            <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
              {matches.map((m) => {
                const isSelected = m.id === selectedMatchId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMatchId(m.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                      isSelected ? "bg-white border-l-4 border-black shadow-sm" : "hover:bg-gray-100/80"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-200">
                      <img
                        src={m.tradesperson.image}
                        alt={m.tradesperson.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {m.tradesperson.name}
                        </span>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {m.lastMessageTime || "Active"}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-emerald-700 mb-1">
                        €{m.tradesperson.hourly_rate_eur}/hr • {m.tradesperson.trade}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {m.lastMessage || "Chat unlocked..."}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chat Conversation (Right area) */}
          {activeMatch ? (
            <div className="md:col-span-8 flex flex-col h-full bg-white">
              {/* Chat Top Bar */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img
                      src={activeMatch.tradesperson.image}
                      alt={activeMatch.tradesperson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        {activeMatch.tradesperson.name}
                      </h3>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {activeMatch.tradesperson.profession} • {activeMatch.tradesperson.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activeMatch.tradesperson.phone}`}
                    className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    title="Direct Phone"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <Link
                    href={`/profile/${activeMatch.tradesperson.id}`}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-black font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    Profile
                  </Link>
                </div>
              </div>

              {/* Verified Rates Banner */}
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex items-center justify-between text-[11px] text-gray-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Euro className="w-3.5 h-3.5 text-gray-800" /> Hourly Rate: €{activeMatch.tradesperson.hourly_rate_eur}/hr
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-800" /> Avg. response {activeMatch.tradesperson.responseRate}
                </span>
                <span className="hidden sm:inline text-gray-400">
                  Phone: {activeMatch.tradesperson.phone}
                </span>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[460px]">
                {activeMatch.messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="flex justify-center my-2">
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-3.5 py-1.5 rounded-full max-w-md text-center flex items-center gap-1.5 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{msg.text}</span>
                        </div>
                      </div>
                    );
                  }

                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-black text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1 flex items-center gap-1">
                        {msg.time}
                        {isUser && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                      </span>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs italic">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-ping" />
                    {activeMatch.tradesperson.name} is typing a response...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-gray-200 flex items-center gap-2 bg-gray-50/50"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Send message to ${activeMatch.tradesperson.name}...`}
                  className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-black hover:bg-gray-800 disabled:opacity-40 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="md:col-span-8 flex items-center justify-center p-8 text-gray-400 text-xs">
              Select a conversation from the left to start chatting.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-400">Loading chats...</div>}>
      <ChatInner />
    </Suspense>
  );
}
