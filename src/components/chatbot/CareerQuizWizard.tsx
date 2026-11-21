"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Target, X } from "lucide-react";

interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    tag: string;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "কোন ধরণের টেকনোলজি নিয়ে কাজ করতে আপনার সবচেয়ে আকর্ষণ বোধ হয়?",
    subtitle: "আপনার প্রাথমিক আগ্রহ নির্বাচন করুন",
    options: [
      {
        label: "ওয়েবসাইট, মোবাইল অ্যাপ ও ভিজ্যুয়াল ডিজাইন",
        description: "ওয়েব পেজ, ইউজার ইন্টারফেস ও ইন্টারেক্টিভ ফিচার তৈরি",
        tag: "Web, App & UI/UX",
      },
      {
        label: "অ্যালগরিদম, ব্যাকএন্ড ও জটিল লজিক",
        description: "সফটওয়্যার আর্কিটেকচার, ডাটাবেস ও সিস্টেম ডিজাইন",
        tag: "Software Engineering & Backend",
      },
      {
        label: "ডেটা, এআই ও মেশিন লার্নিং",
        description: "ডেটা বিশ্লেষণ, প্রেডিকশন ও ইন্টেলিজেন্ট মডেল",
        tag: "AI/ML & Data Science",
      },
      {
        label: "সাইবার নিরাপত্তা, নেটওয়ার্ক ও ক্লাউড সিস্টেম",
        description: "হ্যাকিং প্রতিরোধ, সিকিউরিটি ও ক্লাউড ইনফ্রাস্ট্রাকচার",
        tag: "Cyber Security & Cloud/DevOps",
      },
      {
        label: "গেম ডেভেলপমেন্ট ও থ্রি-ডি গ্রাফিক্স",
        description: "ইন্টারেক্টিভ গেমপ্লে মেকানিক্স, ভিজ্যুয়াল আর্ট ও ফিজিক্স",
        tag: "Game Dev & AR/VR",
      },
      {
        label: "হার্ডওয়্যার, রোবটিক্স ও আইওটি",
        description: "মাইক্রোকন্ট্রোলার, সেন্সর ও এমবেডেড ডিভাইসের কোডিং",
        tag: "Robotics & Embedded IoT",
      },
    ],
  },
  {
    id: 2,
    title: "কোডিং ও প্রোগ্রামিংয়ে আপনার বর্তমান দক্ষতা কোন পর্যায়ে?",
    subtitle: "সঠিক উত্তরটি বাছাই করুন যাতে শেখার সঠিক ধাপ সাজেস্ট করা যায়",
    options: [
      {
        label: "সম্পূর্ণ নতুন (জিরো কোডিং অভিজ্ঞতা)",
        description: "আগে কখনো কোনো কোড করিনি, একদম শূন্য থেকে শুরু করতে চাই",
        tag: "Absolute Beginner",
      },
      {
        label: "বেসিক ধারণা আছে",
        description: "যেকোনো একটি ল্যাঙ্গুয়েজের ভ্যারিয়েবল, লুপ, ফাংশন বা ইফ-এলস বুঝি",
        tag: "Beginner with Basics",
      },
      {
        label: "ইন্টারমিডিয়েট বা প্রজেক্ট তৈরির অভিজ্ঞতা আছে",
        description: "নিজে নিজে ছোটখাটো স্ক্রিপ্ট, কোড বা মিনি-প্রজেক্ট বানিয়েছি",
        tag: "Intermediate",
      },
    ],
  },
  {
    id: 3,
    title: "আপনার মূল ভবিষ্যৎ ক্যারিয়ার লক্ষ্য কী?",
    subtitle: "আপনি ক্যারিয়ারে মূলত কোন দিকটিতে যেতে চান?",
    options: [
      {
        label: "দ্রুত স্কিল শিখে ফ্রিল্যান্সিং বা রিমোট চাকরি",
        description: "দেশি-বিদেশি ক্লায়েন্টের সাথে গ্লোবালি রিমোট কাজের সুযোগ",
        tag: "Freelancing & Remote Work",
      },
      {
        label: "দেশি/মাল্টিন্যাশনাল কোম্পানিতে ফুল-টাইম সফটওয়্যার ইঞ্জিনিয়ার",
        description: "প্রতিষ্ঠিত প্রযুক্তি প্রতিষ্ঠানে দীর্ঘমেয়াদী সফটওয়্যার ক্যারিয়ার",
        tag: "Corporate Software Engineer",
      },
      {
        label: "গভীর গবেষণা, উচ্চশিক্ষা বা ডিপ-টেক",
        description: "ইনোভেশন, গবেষণামূলক কাজ, এমএস/পিএইচডি বা স্পেশালাইজড ফিল্ড",
        tag: "Research & Higher Studies",
      },
    ],
  },
  {
    id: 4,
    title: "উচ্চতর গণিত ও থিওরিটিক্যাল লজিক নিয়ে আপনার আগ্রহ কেমন?",
    subtitle: "গণিত ও অ্যালগরিদমিক চিন্তাভাবনা সম্পর্কে আপনার ভালোলাগা",
    options: [
      {
        label: "গণিত ও থিওরি অনেক পছন্দ",
        description: "পরিসংখ্যান, ক্যালকুলাস, লিনিয়ার অ্যালজেব্রা ও জটিল লজিক উপভোগ করি",
        tag: "Loves Math & Theory",
      },
      {
        label: "প্রয়োজনে শিখে নেব (স্বাভাবিক)",
        description: "কাজের জন্য যতটুকু দরকার ততটুকু ধৈর্য নিয়ে শিখতে পারি",
        tag: "Moderate / Practical",
      },
      {
        label: "ম্যাথ এড়িয়ে সরাসরি প্র্যাকটিক্যাল কোডিং পছন্দ",
        description: "থিওরির চেয়ে ভিজ্যুয়াল ও প্র্যাকটিক্যাল বিল্ড তৈরিতে বেশি স্বাচ্ছন্দ্য",
        tag: "Prefers Hands-on / Practical",
      },
    ],
  },
];

interface CareerQuizWizardProps {
  onComplete: (quizSummaryPrompt: string) => void;
  onClose: () => void;
}

export default function CareerQuizWizard({
  onComplete,
  onClose,
}: CareerQuizWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = { ...selectedAnswers, [currentStep]: optionIndex };
    setSelectedAnswers(updatedAnswers);

    if (currentStep < totalSteps - 1) {
      // Auto-advance with subtle delay for smooth user experience
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 180);
    } else {
      // Final step completed
      setIsSubmitting(true);
      setTimeout(() => {
        const summary = compileQuizSummary(updatedAnswers);
        onComplete(summary);
      }, 350);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const compileQuizSummary = (answers: Record<number, number>): string => {
    const q1 = QUIZ_QUESTIONS[0].options[answers[0]]?.label || "উল্লেখ নেই";
    const q2 = QUIZ_QUESTIONS[1].options[answers[1]]?.label || "উল্লেখ নেই";
    const q3 = QUIZ_QUESTIONS[2].options[answers[2]]?.label || "উল্লেখ নেই";
    const q4 = QUIZ_QUESTIONS[3].options[answers[3]]?.label || "উল্লেখ নেই";

    return `[CAREER_QUIZ_SUBMISSION]
আমার ক্যারিয়ার কুইজের উত্তর:
১. আগ্রহ: ${q1}
২. অভিজ্ঞতা: ${q2}
৩. লক্ষ্য: ${q3}
৪. ম্যাথ পছন্দ: ${q4}

আমার জন্য সেরা ১-৩টি সেক্টর (% ম্যাচিং সহ), কারণ এবং শুরুর রোডম্যাপ সাজেস্ট করো।`;
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-[#090814]/98 backdrop-blur-2xl text-zinc-100 animate-in fade-in zoom-in-95 duration-200">
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              title="পূর্ববর্তী প্রশ্ন"
              aria-label="Previous question"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300">
              <Target className="h-4 w-4" />
            </div>
          )}
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Career Matcher Quiz</span>
              <Sparkles className="h-3 w-3 text-amber-300" />
            </h3>
            <p className="text-[10px] text-zinc-400">
              ধাপ {currentStep + 1} / {totalSteps}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          title="কুইজ বন্ধ করুন"
          aria-label="Close quiz"
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/[0.05] h-1">
        <div
          className="bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400 h-1 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Quiz Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col justify-between">
        {isSubmitting ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 border border-violet-500/40 text-violet-300 animate-pulse mb-3">
              <Sparkles className="h-7 w-7 text-violet-400 animate-spin" />
            </div>
            <h4 className="text-sm font-bold text-white">
              আপনার উত্তর বিশ্লেষণ করা হচ্ছে...
            </h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-[280px]">
              AI আপনার প্রোফাইল অনুযায়ী সেরা রোডম্যাপ প্রস্তুত করছে ✨
            </p>
          </div>
        ) : (
          <div>
            {/* Question Title */}
            <div className="mb-4">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-violet-400 mb-1">
                প্রশ্ন {question.id}
              </span>
              <h4 className="text-sm font-semibold text-white leading-snug">
                {question.title}
              </h4>
              <p className="text-[11px] text-zinc-400 mt-1">
                {question.subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentStep] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 group ${
                      isSelected
                        ? "border-violet-500 bg-violet-600/20 text-white shadow-md shadow-violet-600/20"
                        : "border-white/[0.08] bg-white/[0.03] text-zinc-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                        isSelected
                          ? "border-violet-400 bg-violet-500 text-white"
                          : "border-zinc-600 group-hover:border-violet-400"
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="h-3 w-3 fill-current" />
                      ) : (
                        <span className="text-[9px] font-bold text-zinc-400 group-hover:text-violet-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium leading-snug">
                        {option.label}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navigation Hints */}
        {!isSubmitting && (
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
            <span>ক্লিক করলেই পরবর্তী প্রশ্নে যাবে</span>
            {selectedAnswers[currentStep] !== undefined && currentStep < totalSteps - 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="text-violet-400 hover:text-violet-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>পরবর্তী</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
