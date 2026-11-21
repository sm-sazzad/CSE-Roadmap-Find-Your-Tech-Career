"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  MessageSquare,
  X,
  Send,
  Square,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

const STARTER_PROMPTS = [
  "ওয়েব ডেভেলপমেন্ট শিখতে চাই, কোথা থেকে শুরু করব?",
  "আমি কোন সেক্টর বেছে নেব বুঝতে পারছি না",
  "Which sector is good if I like maths?",
  "ফ্রিল্যান্সিং কীভাবে শুরু করব?",
];

const MAX_CHAR_LIMIT = 500;

function getMessageText(message: UIMessage): string {
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter(
        (part) =>
          part &&
          part.type === "text" &&
          typeof (part as { text?: unknown }).text === "string"
      )
      .map((part) => (part as { text: string }).text)
      .join("");
  }
  return (message as unknown as { content?: string }).content || "";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    sendMessage,
    status,
    stop,
    setMessages,
    regenerate,
    error,
    clearError,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isBusy = status === "submitted" || status === "streaming";

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      inputRef.current?.focus();
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("smooth");
    }
  }, [messages, status, isOpen, scrollToBottom]);

  // Handle ESC key to close widget
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isBusy) return;
    if (query.length > MAX_CHAR_LIMIT) return;

    if (error) {
      clearError();
    }

    sendMessage({ text: query });
    if (!textToSend) {
      setInput("");
    }
  };

  const handleStarterClick = (promptText: string) => {
    handleSend(promptText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    clearError();
    setInput("");
  };

  const lastMessage = messages[messages.length - 1];
  const showTypingIndicator =
    isBusy &&
    (!lastMessage ||
      lastMessage.role === "user" ||
      (lastMessage.role === "assistant" &&
        getMessageText(lastMessage).trim() === ""));

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI Assistant" : "Open CSE Roadmap AI Assistant"}
          aria-expanded={isOpen}
          className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-500 text-white shadow-xl shadow-violet-600/30 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/50 active:scale-95 border border-white/20"
        >
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#05050a]" />
          </div>

          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <MessageSquare className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          )}

          {!isOpen && (
            <span className="absolute -top-10 right-0 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#0d0c1d]/90 px-3 py-1 text-xs font-medium text-violet-200 backdrop-blur-md shadow-lg group-hover:block transition-all pointer-events-none">
              Roadmap Assistant ✨
            </span>
          )}
        </button>
      </div>

      {/* Backdrop for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Chat Panel */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="CSE Roadmap AI Assistant"
          className="fixed inset-x-0 bottom-0 top-14 z-50 flex flex-col rounded-t-3xl border border-white/10 bg-[#090814]/95 shadow-2xl backdrop-blur-2xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[580px] sm:w-[410px] sm:rounded-2xl overflow-hidden text-zinc-100 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-sky-500/10 border border-violet-500/30 text-violet-300">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold tracking-tight text-white">
                    CSE Roadmap Assistant
                  </h2>
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Online • Gemini AI</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Clear chat history"
                  aria-label="Clear chat history"
                  className="rounded-lg p-2 text-zinc-400 hover:bg-white/[0.08] hover:text-white transition"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="rounded-lg p-2 text-zinc-400 hover:bg-white/[0.08] hover:text-white transition"
              >
                <ChevronDown className="h-4 w-4 sm:hidden" />
                <X className="h-4 w-4 hidden sm:block" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-zinc-700">
            {/* Empty State */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-4 px-2">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600/20 to-sky-500/20 border border-violet-500/30 text-violet-300 shadow-inner">
                  <Sparkles className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white text-base">
                  স্বাগতম! কীভাবে সাহায্য করতে পারি?
                </h3>
                <p className="mt-1 text-xs text-zinc-400 max-w-[320px] leading-relaxed">
                  তোমার টেক ক্যারিয়ার, প্রোগ্রামিং শেখা, কিংবা সঠিক রোডম্যাপ বেছে নিতে যেকোনো প্রশ্ন করো।
                </p>

                {/* Starter Prompt Chips */}
                <div className="mt-5 w-full flex flex-col gap-2 text-left">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 px-1">
                    পরামর্শ / Suggested questions
                  </span>
                  {STARTER_PROMPTS.map((promptText, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleStarterClick(promptText)}
                      disabled={isBusy}
                      className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5 text-xs text-zinc-300 transition duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white text-left"
                    >
                      <span>{promptText}</span>
                      <Send className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:text-violet-400 transition ml-2 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Render Messages */}
            {messages.map((message) => {
              const isUser = message.role === "user";
              const text = getMessageText(message);

              if (!text.trim() && !isUser) return null;

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs ${
                      isUser
                        ? "bg-violet-600 text-white"
                        : "bg-white/[0.06] border border-white/10 text-violet-300"
                    }`}
                  >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] text-xs leading-relaxed break-words ${
                      isUser
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-xs shadow-md"
                        : "bg-white/[0.04] border border-white/[0.08] text-zinc-200 rounded-tl-xs shadow-sm"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{text}</p>
                    ) : (
                      <div className="prose-chat">
                        <ReactMarkdown
                          components={{
                            a({ href, children }) {
                              const isInternal =
                                href &&
                                (href.startsWith("/sector") ||
                                  href.startsWith("/") ||
                                  href.startsWith("#"));

                              if (isInternal) {
                                return (
                                  <Link
                                    href={href}
                                    onClick={() => {
                                      if (
                                        typeof window !== "undefined" &&
                                        window.innerWidth < 768
                                      ) {
                                        setIsOpen(false);
                                      }
                                    }}
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 my-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/35 hover:bg-violet-500/30 hover:border-violet-400 hover:text-white transition-all"
                                  >
                                    <span>{children}</span>
                                    <ExternalLink className="h-3 w-3 opacity-70" />
                                  </Link>
                                );
                              }

                              return (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
                                >
                                  {children}
                                </a>
                              );
                            },
                            p({ children }) {
                              return (
                                <p className="mb-2 last:mb-0 leading-relaxed">
                                  {children}
                                </p>
                              );
                            },
                            ul({ children }) {
                              return (
                                <ul className="list-disc pl-4 mb-2 space-y-1 text-zinc-300">
                                  {children}
                                </ul>
                              );
                            },
                            ol({ children }) {
                              return (
                                <ol className="list-decimal pl-4 mb-2 space-y-1 text-zinc-300">
                                  {children}
                                </ol>
                              );
                            },
                            li({ children }) {
                              return <li className="leading-relaxed">{children}</li>;
                            },
                            strong({ children }) {
                              return (
                                <strong className="font-semibold text-white">
                                  {children}
                                </strong>
                              );
                            },
                            code({ children, className }) {
                              return (
                                <code
                                  className={`rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-violet-200 ${
                                    className || ""
                                  }`}
                                >
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing / Loading Indicator */}
            {showTypingIndicator && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] border border-white/10 text-violet-300">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs bg-white/[0.04] border border-white/[0.08] px-3.5 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-bounce" />
                </div>
              </div>
            )}

            {/* Inline Error Card */}
            {(error || status === "error") && (
              <div className="flex flex-col gap-2 rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-200 animate-in fade-in duration-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-rose-200">
                      এখন উত্তর দিতে পারছি না, একটু পরে আবার চেষ্টা করো।
                    </p>
                    <p className="text-zinc-400 mt-1">
                      সবগুলো ক্যারিয়ার রোডম্যাপ দেখতে{" "}
                      <Link
                        href="/sector"
                        onClick={() => {
                          if (
                            typeof window !== "undefined" &&
                            window.innerWidth < 768
                          ) {
                            setIsOpen(false);
                          }
                        }}
                        className="text-violet-300 underline font-semibold hover:text-white"
                      >
                        /sector
                      </Link>{" "}
                      পেজে যান।
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1 border-t border-rose-500/20">
                  <button
                    type="button"
                    onClick={() => {
                      clearError();
                      regenerate();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-medium flex items-center gap-1 transition"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>আবার চেষ্টা করুন (Retry)</span>
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/[0.08] bg-white/[0.02] p-3 sm:p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex flex-col gap-1.5"
            >
              <div className="relative flex items-center">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHAR_LIMIT) {
                      setInput(e.target.value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isBusy ? "AI উত্তর লিখছে..." : "প্রশ্ন লিখুন... (Enter to send)"
                  }
                  rows={2}
                  maxLength={MAX_CHAR_LIMIT}
                  disabled={isBusy}
                  className="w-full resize-none rounded-xl border border-white/[0.1] bg-black/40 px-3.5 py-2.5 pr-12 text-xs text-white placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50 disabled:opacity-50 transition"
                />

                <div className="absolute right-2.5 bottom-2.5">
                  {isBusy ? (
                    <button
                      type="button"
                      onClick={() => stop()}
                      title="Stop generating"
                      aria-label="Stop generating"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 transition"
                    >
                      <Square className="h-3.5 w-3.5 fill-current" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      title="Send message"
                      aria-label="Send message"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 transition shadow"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between px-1 text-[10px] text-zinc-500">
                <span>Enter = Send • Shift+Enter = Newline</span>
                <span
                  className={
                    input.length >= MAX_CHAR_LIMIT
                      ? "text-rose-400 font-medium"
                      : input.length > MAX_CHAR_LIMIT * 0.85
                      ? "text-amber-400"
                      : "text-zinc-500"
                  }
                >
                  {input.length}/{MAX_CHAR_LIMIT}
                </span>
              </div>
            </form>
          </div>
        </aside>
      )}
    </>
  );
}
