"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "bn";

const STORAGE_KEY = "codepath-lang";

const en = {
  nav_home: "Home",
  nav_roadmaps: "Roadmaps",
  nav_about: "About",

  hero_badge: "Free · Zero-to-hero roadmaps",
  hero_t1: "Start from zero.",
  hero_t2: "Become a pro.",
  hero_sub:
    "Pick a tech career, follow a clear step-by-step roadmap with free resources, build real projects and always know what to learn next — in simple English or Bangla.",
  hero_cta1: "Explore roadmaps",
  hero_cta2: "How it works",
  stat_paths: "Career paths",
  stat_steps: "Learning steps",
  stat_res: "Free resources",
  stat_lang: "Languages",

  featured_k: "Popular paths",
  featured_t: "Find the path that fits you.",
  featured_s:
    "Not sure where to start? Begin with Programming Fundamentals, then choose a direction.",
  view_all: "View all paths",
  open_roadmap: "Open roadmap",

  how_k: "How it works",
  how_t: "Three simple steps to start.",
  how_s: "No more guessing what to learn next.",
  how1_t: "Choose a path",
  how1_d:
    "Read a simple overview: who it is for, why to learn it and what you will build.",
  how2_t: "Follow the steps",
  how2_d:
    "Every step has a plain explanation, topics, free resources and a checklist.",
  how3_t: "Build and grow",
  how3_d:
    "Finish projects, track your progress and build a portfolio that gets you hired.",

  why_k: "Why CodePath",
  why_t: "Learn with clarity, not confusion.",
  why_s:
    "Hundreds of tutorials and thousands of tools. We filter the noise and give you one clear order to follow.",
  why1_t: "Right order",
  why1_d: "Stop jumping between random videos. Every step builds on the last.",
  why2_t: "Everything in one place",
  why2_d:
    "Explanations, free links, projects, glossary and FAQ. No need to search elsewhere.",
  why3_t: "Made for beginners",
  why3_d: "Plain words, real-life examples and a Bangla version for everyone.",
  why4_t: "Track your progress",
  why4_d:
    "Tick off steps and checklist items. Your progress stays on your device.",

  cta_k: "Start today",
  cta_t: "Your tech career starts with one step.",
  cta_s:
    "Pick a path, open the first step and learn for just 30 minutes today.",
  cta_b1: "Explore all roadmaps",
  cta_b2: "About",

  list_k: "Career roadmaps",
  list_t: "Find your tech path.",
  list_s:
    "Zero-to-hero roadmaps for every CSE career. Pick one and start today.",
  search_ph: "Search roadmaps (e.g. web, AI, security)…",
  n_paths: "{n} paths",
  cat_all: "All",
  cat_start: "Start here",
  cat_web: "Web & Software",
  cat_ai: "AI & Data",
  cat_infra: "Cloud & Systems",
  cat_security: "Security & Networks",
  cat_creative: "Design & Games",
  cat_hardware: "Hardware & Robots",
  cat_career: "Career & Skills",
  no_found: "No roadmap found",
  no_found_s: "Try another word like web, AI or security.",
  show_all: "Show all",
  steps_n: "{n} steps",
  topics_n: "{n} topics",

  nav_overview: "Overview",
  nav_path: "Learning path",
  nav_resources: "Resources",
  nav_glossary: "Glossary",
  nav_faq: "FAQ",
  meta_level: "Level",
  meta_time: "Total time",
  meta_weekly: "Per week",
  meta_steps: "Steps",
  btn_start: "Start step 1",
  btn_resources: "Free resources",
  who_t: "Who is this for?",
  why_t2: "Why learn this?",
  build_t: "What you will build",
  prereq_t: "Before you start",
  skills_t: "Skills you will gain",
  tools_t: "Tools you will use",
  start_k: "Start today",
  start_t: "Your first 3 moves",
  path_k: "Learning path",
  path_t: "Your zero-to-hero roadmap",
  path_s: "Follow the steps in order and tick each one when you finish.",
  track_t: "Choose your track",
  track_all: "Complete path",
  track_n: "{n} steps in this track",
  track_roles: "You can become",
  ph_Beginner: "Foundation",
  ph_Intermediate: "Build skills",
  ph_Advanced: "Go pro",
  lvl_Beginner: "Beginner",
  lvl_Intermediate: "Intermediate",
  lvl_Advanced: "Advanced",
  simple_t: "In simple words",
  learn_t: "What to learn",
  outcome_t: "After this step you can",
  projects_t: "Build these",
  step_res_t: "Learn from these (free)",
  ready_t: "Ready to move on?",
  ready_s: "Tick what you can already do.",
  mark: "Mark step complete",
  done: "Completed",
  prog_t: "Your progress",
  prog_of: "{a} of {b} steps done",
  prog_done: "Roadmap complete! 🎉",
  careers_t: "Where this can take you",
  careers_s: "Job roles you can aim for.",
  res_t: "Free learning resources",
  res_s: "Handpicked, beginner-friendly links. They open in a new tab.",
  res_all: "All",
  res_open: "Open",
  gloss_t: "Words you will meet",
  gloss_s: "Plain-language meanings.",
  faq_t: "Common questions",
  final_k: "Final project",
  final_t: "Prove your skills",
  final_s: "Build this to show employers and clients what you can do.",
  final_1: "Publish it on GitHub",
  final_2: "Write a clear README",
  final_3: "Add it to your portfolio",
  related_t: "Explore next",
  back_all: "← All roadmaps",
  partial_note:
    "The Bangla version of this roadmap is still being written. Some parts are shown in English.",
  t_Documentation: "Docs",
  t_Tutorial: "Tutorial",
  t_Course: "Course",
  t_Practice: "Practice",
  t_Video: "Video",
  t_Book: "Book",
} as const;

export type TKey = keyof typeof en;

const bn: Record<TKey, string> = {
  nav_home: "হোম",
  nav_roadmaps: "রোডম্যাপ",
  nav_about: "পরিচিতি",

  hero_badge: "ফ্রি · শূন্য থেকে হিরো রোডম্যাপ",
  hero_t1: "শূন্য থেকে শুরু করো।",
  hero_t2: "হয়ে ওঠো প্রফেশনাল।",
  hero_sub:
    "একটি টেক ক্যারিয়ার বেছে নাও, ফ্রি রিসোর্সসহ ধাপে ধাপে রোডম্যাপ অনুসরণ করো, বাস্তব প্রজেক্ট বানাও এবং সবসময় জানো পরের ধাপে কী শিখবে — সহজ বাংলা বা ইংরেজিতে।",
  hero_cta1: "রোডম্যাপ দেখো",
  hero_cta2: "কীভাবে কাজ করে",
  stat_paths: "ক্যারিয়ার পথ",
  stat_steps: "শেখার ধাপ",
  stat_res: "ফ্রি রিসোর্স",
  stat_lang: "ভাষা",

  featured_k: "জনপ্রিয় পথ",
  featured_t: "তোমার জন্য সঠিক পথটি খুঁজে নাও।",
  featured_s:
    "কোথা থেকে শুরু করবে বুঝতে পারছ না? Programming Fundamentals দিয়ে শুরু করো, তারপর পছন্দের দিক বেছে নাও।",
  view_all: "সব পথ দেখো",
  open_roadmap: "রোডম্যাপ খোলো",

  how_k: "কীভাবে কাজ করে",
  how_t: "শুরু করতে মাত্র তিনটি সহজ ধাপ।",
  how_s: "পরে কী শিখব — এই চিন্তা আর করতে হবে না।",
  how1_t: "একটি পথ বেছে নাও",
  how1_d:
    "সহজ ভাষায় পড়ো এটি কার জন্য, কেন শিখবে এবং শেষে কী বানাবে।",
  how2_t: "ধাপগুলো অনুসরণ করো",
  how2_d:
    "প্রতিটি ধাপে আছে সহজ ব্যাখ্যা, টপিক, ফ্রি রিসোর্স এবং চেকলিস্ট।",
  how3_t: "বানাও আর এগিয়ে যাও",
  how3_d:
    "প্রজেক্ট শেষ করো, অগ্রগতি ট্র্যাক করো এবং চাকরি পাওয়ার মতো পোর্টফোলিও বানাও।",

  why_k: "কেন CodePath",
  why_t: "বিভ্রান্তি নয়, স্পষ্টতার সাথে শেখো।",
  why_s:
    "শত শত টিউটোরিয়াল আর হাজারো টুল। আমরা অপ্রয়োজনীয় জিনিস বাদ দিয়ে তোমাকে একটাই পরিষ্কার ক্রম দিই।",
  why1_t: "সঠিক ক্রম",
  why1_d:
    "এলোমেলো ভিডিও দেখা বন্ধ করো। প্রতিটি ধাপ আগের ধাপের উপর দাঁড়িয়ে আছে।",
  why2_t: "সবকিছু এক জায়গায়",
  why2_d:
    "ব্যাখ্যা, ফ্রি লিংক, প্রজেক্ট, শব্দকোষ আর FAQ — অন্য কোথাও খুঁজতে হবে না।",
  why3_t: "নতুনদের জন্য তৈরি",
  why3_d: "সহজ শব্দ, বাস্তব উদাহরণ এবং সবার জন্য বাংলা সংস্করণ।",
  why4_t: "অগ্রগতি ট্র্যাক করো",
  why4_d:
    "ধাপ ও চেকলিস্ট টিক দাও। তোমার অগ্রগতি তোমার ডিভাইসেই থাকে।",

  cta_k: "আজই শুরু করো",
  cta_t: "তোমার টেক ক্যারিয়ার শুরু হয় একটি ধাপ থেকে।",
  cta_s:
    "একটি পথ বেছে নাও, প্রথম ধাপ খোলো, আর আজ মাত্র ৩০ মিনিট শেখো।",
  cta_b1: "সব রোডম্যাপ দেখো",
  cta_b2: "আমাদের সম্পর্কে",

  list_k: "ক্যারিয়ার রোডম্যাপ",
  list_t: "তোমার টেক পথ খুঁজে নাও।",
  list_s:
    "প্রতিটি CSE ক্যারিয়ারের জন্য শূন্য থেকে হিরো রোডম্যাপ। একটি বেছে নিয়ে আজই শুরু করো।",
  search_ph: "রোডম্যাপ খোঁজো (যেমন web, AI, security)…",
  n_paths: "{n}টি পথ",
  cat_all: "সব",
  cat_start: "এখান থেকে শুরু",
  cat_web: "ওয়েব ও সফটওয়্যার",
  cat_ai: "AI ও ডেটা",
  cat_infra: "ক্লাউড ও সিস্টেম",
  cat_security: "সিকিউরিটি ও নেটওয়ার্ক",
  cat_creative: "ডিজাইন ও গেম",
  cat_hardware: "হার্ডওয়্যার ও রোবট",
  cat_career: "ক্যারিয়ার ও স্কিল",
  no_found: "কোনো রোডম্যাপ পাওয়া যায়নি",
  no_found_s: "web, AI বা security-র মতো অন্য শব্দ দিয়ে চেষ্টা করো।",
  show_all: "সব দেখাও",
  steps_n: "{n}টি ধাপ",
  topics_n: "{n}টি টপিক",

  nav_overview: "সারসংক্ষেপ",
  nav_path: "শেখার পথ",
  nav_resources: "রিসোর্স",
  nav_glossary: "শব্দকোষ",
  nav_faq: "প্রশ্নোত্তর",
  meta_level: "লেভেল",
  meta_time: "মোট সময়",
  meta_weekly: "প্রতি সপ্তাহে",
  meta_steps: "ধাপ",
  btn_start: "১ম ধাপ থেকে শুরু করো",
  btn_resources: "ফ্রি রিসোর্স",
  who_t: "এটি কার জন্য?",
  why_t2: "কেন শিখবে?",
  build_t: "কী কী বানাবে",
  prereq_t: "শুরুর আগে যা লাগবে",
  skills_t: "যেসব স্কিল পাবে",
  tools_t: "যেসব টুল ব্যবহার করবে",
  start_k: "আজই শুরু করো",
  start_t: "তোমার প্রথম ৩টি পদক্ষেপ",
  path_k: "শেখার পথ",
  path_t: "তোমার শূন্য থেকে হিরো রোডম্যাপ",
  path_s: "ধাপগুলো ক্রমানুসারে অনুসরণ করো এবং শেষ হলে টিক দাও।",
  track_t: "তোমার ট্র্যাক বেছে নাও",
  track_all: "সম্পূর্ণ পথ",
  track_n: "এই ট্র্যাকে {n}টি ধাপ",
  track_roles: "তুমি হতে পারবে",
  ph_Beginner: "ভিত্তি",
  ph_Intermediate: "দক্ষতা গড়ো",
  ph_Advanced: "প্রফেশনাল হও",
  lvl_Beginner: "শুরু",
  lvl_Intermediate: "মাঝামাঝি",
  lvl_Advanced: "উন্নত",
  simple_t: "সহজ কথায়",
  learn_t: "যা শিখবে",
  outcome_t: "এই ধাপ শেষে তুমি পারবে",
  projects_t: "এগুলো বানাও",
  step_res_t: "এগুলো থেকে শেখো (ফ্রি)",
  ready_t: "পরের ধাপে যাওয়ার জন্য প্রস্তুত?",
  ready_s: "যা ইতিমধ্যে পারো তাতে টিক দাও।",
  mark: "ধাপটি সম্পন্ন করলাম",
  done: "সম্পন্ন",
  prog_t: "তোমার অগ্রগতি",
  prog_of: "{b}টির মধ্যে {a}টি ধাপ সম্পন্ন",
  prog_done: "রোডম্যাপ সম্পন্ন! 🎉",
  careers_t: "এই পথ তোমাকে কোথায় নিয়ে যাবে",
  careers_s: "যেসব চাকরির লক্ষ্য রাখতে পারো।",
  res_t: "ফ্রি লার্নিং রিসোর্স",
  res_s: "বাছাই করা, নতুনদের উপযোগী লিংক। নতুন ট্যাবে খুলবে।",
  res_all: "সব",
  res_open: "খোলো",
  gloss_t: "যেসব শব্দ সামনে পাবে",
  gloss_s: "সহজ ভাষায় অর্থ।",
  faq_t: "সাধারণ প্রশ্ন",
  final_k: "ফাইনাল প্রজেক্ট",
  final_t: "নিজের দক্ষতা প্রমাণ করো",
  final_s: "নিয়োগকর্তা ও ক্লায়েন্টকে নিজের কাজ দেখাতে এটি বানাও।",
  final_1: "GitHub-এ প্রকাশ করো",
  final_2: "পরিষ্কার README লেখো",
  final_3: "পোর্টফোলিওতে যোগ করো",
  related_t: "এরপর দেখো",
  back_all: "← সব রোডম্যাপ",
  partial_note:
    "এই রোডম্যাপের বাংলা সংস্করণ এখনো লেখা হচ্ছে। কিছু অংশ ইংরেজিতে দেখানো হচ্ছে।",
  t_Documentation: "ডকুমেন্টেশন",
  t_Tutorial: "টিউটোরিয়াল",
  t_Course: "কোর্স",
  t_Practice: "প্র্যাকটিস",
  t_Video: "ভিডিও",
  t_Book: "বই",
};

const dict = { en, bn } as const;

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert digits to Bangla digits when needed. */
export function num(value: number | string, lang: Lang): string {
  const s = String(value);
  return lang === "bn" ? s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : s;
}

/** Translate time / level phrases such as "6–8 weeks" or "Beginner → Advanced". */
export function phrase(text: string | undefined, lang: Lang): string {
  if (!text) return "";
  if (lang === "en") return text;

  return num(
    text
      .replace(/hours\/week/gi, "ঘণ্টা/সপ্তাহ")
      .replace(/weeks?/gi, "সপ্তাহ")
      .replace(/months?/gi, "মাস")
      .replace(/Ongoing/gi, "চলমান")
      .replace(/Beginner/g, "শুরু")
      .replace(/Intermediate/g, "মাঝামাঝি")
      .replace(/Advanced/g, "উন্নত"),
    "bn"
  );
}

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Read the saved language after the first render (keeps server/client HTML equal).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "bn" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: TKey, vars?: Record<string, string | number>) => {
      let text: string = dict[lang][key] ?? dict.en[key];
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replace(`{${k}}`, num(v, lang));
        }
      }
      return text;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
