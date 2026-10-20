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
  Euro,
  ChevronLeft
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
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = getStoredMatches();
    setMatches(list);
    if (urlMatchId && list.some((m) => m.id === urlMatchId)) {
      setSelectedMatchId(urlMatchId);
      setMobileView("chat");
    } else if (list.length > 0) {
      setSelectedMatchId(list[0].id);
    }
  }, [urlMatchId]);

  const activeMatch = matches.find((m) => m.id === selectedMatchId);

  useEffect(() => {
    // Only scroll within the messages viewport container
    if (messagesEndRef.current?.parentElement) {
      messagesEndRef.current.parentElement.scrollTop =
        messagesEndRef.current.parentElement.scrollHeight;
    }
  }, [activeMatch?.messages, isTyping]);

  const handleSelectMatch = (id: string) => {
    setSelectedMatchId(id);
    setMobileView("chat");
  };

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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-10">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Messages & Coordination
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
            Coordinate job details and pricing directly with connected tradespeople
          </p>
        </div>
        <Link
          href="/swipe"
          scroll={false}
          className="text-xs font-semibold border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Swipe
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="bg-[#fafafa] rounded-xl border border-gray-200 p-8 sm:p-12 text-center max-w-md mx-auto my-8 sm:my-12 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mx-auto border border-gray-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">No Conversations Yet</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            When you connect with tradespeople in Swipe Mode, their direct message channel will appear here.
          </p>
          <div className="pt-2">
            <Link
              href="/swipe"
              scroll={false}
              className="inline-flex items-center justify-center bg-[#111] text-white px-5 py-2.5 rounded-md text-xs font-semibold hover:bg-black transition-colors"
            >
              Browse Tradespeople
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px] sm:min-h-[580px]">
          {/* Matches List (Sidebar) */}
          <div
            className={`md:col-span-4 border-r border-gray-200 flex flex-col bg-[#fafafa] ${
              mobileView === "chat" ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="p-3.5 border-b border-gray-200 bg-white">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Conversations ({matches.length})
              </span>
            </div>

            <div className="divide-y divide-gray-200 overflow-y-auto flex-1 max-h-[540px]">
              {matches.map((m) => {
                const isSelected = m.id === selectedMatchId;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMatch(m.id)}
                    className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors ${
                      isSelected ? "bg-white border-l-3 border-black" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
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
                      <p className="text-[11px] text-gray-600 mb-0.5 truncate">
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
            <div
              className={`md:col-span-8 flex flex-col h-full bg-white ${
                mobileView === "list" ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Active Header */}
              <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  {/* Mobile Back to List button */}
                  <button
                    onClick={() => setMobileView("list")}
                    className="md:hidden p-1.5 -ml-1 text-gray-600 hover:text-black rounded-md hover:bg-gray-100"
                    aria-label="Back to conversations list"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img
                      src={activeMatch.tradesperson.image}
                      alt={activeMatch.tradesperson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {activeMatch.tradesperson.name}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] text-gray-500 flex items-center gap-0.5 shrink-0">
                        <ShieldCheck className="w-3 h-3 text-gray-700" />
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate">
                      {activeMatch.tradesperson.profession} • {activeMatch.tradesperson.district}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <a
                    href={`tel:${activeMatch.tradesperson.phone}`}
                    className="p-1.5 sm:p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-xs flex items-center gap-1"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Call</span>
                  </a>
                  <Link
                    href={`/profile/${activeMatch.tradesperson.id}`}
                    scroll={false}
                    className="text-xs bg-[#111] text-white font-medium px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-black transition-colors"
                  >
                    Profile
                  </Link>
                </div>
              </div>

              {/* Rate & Info Bar */}
              <div className="bg-[#fafafa] border-b border-gray-200 px-3 sm:px-4 py-1.5 flex items-center justify-between text-[11px] text-gray-600">
                <span>Rate: <strong>€{activeMatch.tradesperson.hourly_rate_eur}/hr</strong></span>
                <span>Response: {activeMatch.tradesperson.responseRate}</span>
                <span className="hidden sm:inline">{activeMatch.tradesperson.phone}</span>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-3 max-h-[380px] sm:max-h-[420px]">
                {activeMatch.messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="flex justify-center my-1.5">
                        <div className="bg-[#fafafa] border border-gray-200 text-gray-600 text-[11px] px-3 py-1.5 rounded-md max-w-sm text-center">
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
                        className={`max-w-[85%] sm:max-w-[75%] rounded-lg px-3.5 py-2 text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? "bg-[#111] text-white"
                            : "bg-gray-100 text-gray-900 border border-gray-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-0.5 px-1 flex items-center gap-1">
                        {msg.time}
                        {isUser && <Check className="w-3 h-3 text-gray-500" />}
                      </span>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                    <span>{activeMatch.tradesperson.name} is typing a response...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Tags Bar */}
              <div className="px-3 sm:px-4 py-2 border-t border-gray-100 flex gap-1.5 overflow-x-auto hide-scrollbar bg-[#fafafa]">
                {[
                  "Are you available this week?",
                  "Can you provide a price estimate?",
                  "Do you cover Pierīga?",
                ].map((tag, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInputText(tag)}
                    className="text-[10px] sm:text-[11px] bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-gray-50 transition-colors shrink-0"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 border-t border-gray-200 flex gap-2 bg-white">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Write a message to ${activeMatch.tradesperson.name}...`}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#111] text-white px-3.5 sm:px-4 py-2 rounded-md hover:bg-black disabled:opacity-30 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="hidden md:flex md:col-span-8 items-center justify-center p-8 text-gray-400 text-xs">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500">Loading messages...</div>}>
      <ChatInner />
    </Suspense>
  );
}
