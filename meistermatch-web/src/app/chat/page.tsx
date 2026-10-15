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
  Check,
  ArrowLeft,
  Clock,
  Euro
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

    setIsTyping(true);
    setTimeout(() => {
      const replies = [
        `Thanks for the details! I have availability this Thursday in ${activeMatch.tradesperson.district}. Would you like an on-site consultation?`,
        `Understood. My standard rate is €${activeMatch.tradesperson.hourly_rate_eur}/hr with basic tools included. Could you let me know the approximate timeline?`,
        `Hello! I am working nearby in ${activeMatch.tradesperson.location} this week and can review your job requirements.`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      triggerAutoReply(selectedMatchId, randomReply);
      setIsTyping(false);
      setMatches(getStoredMatches());
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Messages
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Coordinate job details and pricing directly with connected tradespeople
          </p>
        </div>
        <Link
          href="/swipe"
          className="text-xs font-medium border border-gray-300 rounded-md px-3.5 py-2 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Swipe Mode
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="bg-[#fafafa] rounded-xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mx-auto border border-gray-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">No Conversations Yet</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            When you connect with tradespeople in Swipe Mode, their direct message channel will appear here.
          </p>
          <div className="pt-2">
            <Link
              href="/swipe"
              className="inline-flex items-center justify-center bg-[#111] text-white px-5 py-2.5 rounded-md text-xs font-semibold hover:bg-black transition-colors"
            >
              Browse Tradespeople
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Matches List (Sidebar) */}
          <div className="md:col-span-4 border-r border-gray-200 flex flex-col bg-[#fafafa]">
            <div className="p-4 border-b border-gray-200 bg-white">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Conversations ({matches.length})
              </span>
            </div>

            <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
              {matches.map((m) => {
                const isSelected = m.id === selectedMatchId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMatchId(m.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                      isSelected ? "bg-white border-l-2 border-black" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                      <img
                        src={m.tradesperson.image}
                        alt={m.tradesperson.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                          {m.tradesperson.name}
                        </span>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {m.lastMessageTime || ""}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mb-0.5">
                        €{m.tradesperson.hourly_rate_eur}/hr • {m.tradesperson.trade}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {m.lastMessage || "New conversation"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Pane */}
          {activeMatch ? (
            <div className="md:col-span-8 flex flex-col h-full bg-white">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img
                      src={activeMatch.tradesperson.image}
                      alt={activeMatch.tradesperson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">
                        {activeMatch.tradesperson.name}
                      </h3>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-700" /> Verified
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
                    className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-xs flex items-center gap-1.5"
                    title="Phone"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Call</span>
                  </a>
                  <Link
                    href={`/profile/${activeMatch.tradesperson.id}`}
                    className="text-xs bg-[#111] text-white font-medium px-3 py-2 rounded-md hover:bg-black transition-colors"
                  >
                    Profile
                  </Link>
                </div>
              </div>

              {/* Rate & Area Info Bar */}
              <div className="bg-[#fafafa] border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
                <span>Standard Rate: <strong>€{activeMatch.tradesperson.hourly_rate_eur}/hr</strong></span>
                <span>Average response: {activeMatch.tradesperson.responseRate}</span>
                <span className="hidden sm:inline">Tel: {activeMatch.tradesperson.phone}</span>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[440px]">
                {activeMatch.messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="flex justify-center my-2">
                        <div className="bg-[#fafafa] border border-gray-200 text-gray-600 text-xs px-4 py-2 rounded-md max-w-md text-center">
                          {msg.text}
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
                        className={`max-w-[75%] rounded-lg px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? "bg-[#111] text-white"
                            : "bg-gray-100 text-gray-900 border border-gray-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1 flex items-center gap-1">
                        {msg.time}
                        {isUser && <Check className="w-3 h-3 text-gray-500" />}
                      </span>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="text-gray-400 text-xs italic">
                    {activeMatch.tradesperson.name} is typing...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-gray-200 flex items-center gap-2 bg-[#fafafa]"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Write a message to ${activeMatch.tradesperson.name}...`}
                  className="flex-1 bg-white border border-gray-300 rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#111] hover:bg-black disabled:opacity-40 text-white px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="md:col-span-8 flex items-center justify-center p-8 text-gray-400 text-xs">
              Select a conversation to view messages.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-400">Loading messages...</div>}>
      <ChatInner />
    </Suspense>
  );
}
