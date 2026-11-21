"use client";

import { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import {
  Code2,
  Bot,
  ShieldCheck,
  Cloud,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Activity,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

type Track = {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  shortNameEn: string;
  shortNameBn: string;
  taglineEn: string;
  taglineBn: string;
  icon: typeof Code2;
  accent: string;
  badge: string;
  velocity: string;
  demand: number;
  timeEst: string;
  skills: string[];
  milestones: { titleEn: string; titleBn: string; status: "mastered" | "in_progress" | "up_next" }[];
};

const TRACKS: Track[] = [
  {
    id: "fullstack",
    slug: "web-development",
    nameEn: "Full-Stack Architect",
    nameBn: "ফুল-স্ট্যাক আর্কিটেক্ট",
    shortNameEn: "Full-Stack",
    shortNameBn: "ফুল-স্ট্যাক",
    taglineEn: "Modern scalable apps, Next.js 16, microservices & distributed caches",
    taglineBn: "আধুনিক স্কেলেবল অ্যাপস, নেক্সট.জেএস ১৬, মাইক্রোসার্ভিস ও ক্যাশ",
    icon: Code2,
    accent: "#00f5a0",
    badge: "HIGH VELOCITY",
    velocity: "9.8 / 10",
    demand: 96,
    timeEst: "6-8 Months",
    skills: ["Next.js 16", "TypeScript", "PostgreSQL", "Docker", "Redis", "Tailwind v4"],
    milestones: [
      { titleEn: "Modern React 19 & Server Components", titleBn: "মডার্ন রিঅ্যাক্ট ১৯ ও সার্ভার কম্পোনেন্টস", status: "mastered" },
      { titleEn: "API Architecture, ORM & Database Design", titleBn: "এপিআই আর্কিটেকচার ও ডেটাবেস ডিজাইন", status: "in_progress" },
      { titleEn: "Production CI/CD & Distributed Caching", titleBn: "প্রোডাকশন সিআই/সিডি ও ক্যাশিং", status: "up_next" },
    ],
  },
  {
    id: "aiml",
    slug: "ai-ml",
    nameEn: "AI & Neural Systems",
    nameBn: "এআই ও নিউরাল সিস্টেমস",
    shortNameEn: "AI & Neural",
    shortNameBn: "এআই ও নিউরাল",
    taglineEn: "LLMs, deep neural architectures, PyTorch, LangChain & RAG pipelines",
    taglineBn: "এলএলএম, ডিপ নিউরাল নেটওয়ার্ক, পাইটর্চ ও আরএজি পাইপলাইন",
    icon: Bot,
    accent: "#00d2ff",
    badge: "EXPONENTIAL",
    velocity: "9.9 / 10",
    demand: 99,
    timeEst: "7-10 Months",
    skills: ["Python", "PyTorch", "Transformers", "LangChain", "Vector DBs", "RAG Systems"],
    milestones: [
      { titleEn: "Calculus, Linear Algebra & Python Core", titleBn: "ক্যালকুলাস, লিনিয়ার অ্যালজেব্রা ও পাইথন", status: "mastered" },
      { titleEn: "Deep Learning & Transformer Architectures", titleBn: "ডিপ লার্নিং ও ট্রান্সফরমার আর্কিটেকচার", status: "in_progress" },
      { titleEn: "LLM Fine-tuning & Agentic RAG Workflows", titleBn: "এলএলএম ফাইন-টিউনিং ও এজেন্ট ওয়ার্কফ্লো", status: "up_next" },
    ],
  },
  {
    id: "cyber",
    slug: "cyber-security",
    nameEn: "Cyber Security Sentinel",
    nameBn: "সাইবার সিকিউরিটি সেন্টিনেল",
    shortNameEn: "Cyber Security",
    shortNameBn: "সাইবার সিকিউরিটি",
    taglineEn: "Zero-trust architectures, pen testing, cryptographic protocols & audit",
    taglineBn: "জিরো-ট্রাস্ট সিকিউরিটি, পেনেট্রেশন টেস্টিং ও ক্রিপ্টোগ্রাফি",
    icon: ShieldCheck,
    accent: "#f59e0b",
    badge: "CRITICAL CORE",
    velocity: "9.5 / 10",
    demand: 94,
    timeEst: "8-12 Months",
    skills: ["Network Security", "Kali Linux", "Wireshark", "Metasploit", "Cryptography", "OWASP"],
    milestones: [
      { titleEn: "TCP/IP Fundamentals & Linux Hardening", titleBn: "নেটওয়ার্কিং ফান্ডামেন্টালস ও লিনাক্স হার্ডেনিং", status: "mastered" },
      { titleEn: "Vulnerability Assessment & Pen Testing", titleBn: "ভালনারেবিলিটি অ্যাসেসমেন্ট ও পেন টেস্টিং", status: "in_progress" },
      { titleEn: "SIEM Monitoring & Incident Response", titleBn: "এসআইইএম মনিটরিং ও সিকিউরিটি অডিট", status: "up_next" },
    ],
  },
  {
    id: "cloud",
    slug: "cloud-computing",
    nameEn: "Cloud & Platform Engineer",
    nameBn: "ক্লাউড ও প্ল্যাটফর্ম ইঞ্জিনিয়ার",
    shortNameEn: "Cloud & Platform",
    shortNameBn: "ক্লাউড ও প্ল্যাটফর্ম",
    taglineEn: "Kubernetes, Terraform, AWS serverless clusters & resilient scale",
    taglineBn: "কুবারনেটিস, টেরাফর্ম, এডব্লিউএস ক্লাউড ও সাইট রিলায়েবিলিটি",
    icon: Cloud,
    accent: "#38bdf8",
    badge: "MISSION CRITICAL",
    velocity: "9.6 / 10",
    demand: 95,
    timeEst: "6-9 Months",
    skills: ["AWS / GCP", "Kubernetes", "Docker", "Terraform", "Prometheus", "CI/CD"],
    milestones: [
      { titleEn: "Linux Internals, Networking & Containers", titleBn: "লিনাক্স ইন্টারনালস, নেটওয়ার্কিং ও ডকার", status: "mastered" },
      { titleEn: "Infrastructure as Code (Terraform) & Cloud", titleBn: "ইনফ্রাস্ট্রাকচার অ্যাজ কোড ও ক্লাউড ক্লাস্টার", status: "in_progress" },
      { titleEn: "Kubernetes Orchestration & Observability", titleBn: "কুবারনেটিস অর্কেস্ট্রেশন ও প্রোমিথিউস", status: "up_next" },
    ],
  },
  {
    id: "mobile",
    slug: "app-development",
    nameEn: "Mobile Systems Engineer",
    nameBn: "মোবাইল সিস্টেমস ইঞ্জিনিয়ার",
    shortNameEn: "Mobile Systems",
    shortNameBn: "মোবাইল সিস্টেমস",
    taglineEn: "High-FPS cross-platform native engineering, offline sync & gestures",
    taglineBn: "হাই-পারফরম্যান্স মোবাইল অ্যাপস, অফলাইন সিঙ্ক ও নেটিভ ইন্টিগ্রেশন",
    icon: Smartphone,
    accent: "#10b981",
    badge: "HIGH GROWTH",
    velocity: "9.2 / 10",
    demand: 91,
    timeEst: "5-7 Months",
    skills: ["Flutter / Dart", "React Native", "Kotlin", "Swift", "SQLite", "Firebase"],
    milestones: [
      { titleEn: "Dart & State Management Architecture", titleBn: "ডার্ট ও স্টেট ম্যানেজমেন্ট আর্কিটেকচার", status: "mastered" },
      { titleEn: "Complex UI, Animations & Local Databases", titleBn: "কমপ্লেক্স ইউআই, অ্যানিমেশন ও লোকাল ডিবি", status: "in_progress" },
      { titleEn: "App Store Publishing & Native Modules", titleBn: "প্লে স্টোর পাবলিশিং ও নেটিভ মডিউলস", status: "up_next" },
    ],
  },
];

export default function CareerCompassToy() {
  const { lang } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const track = TRACKS[activeIdx];

  // 3D tilt micro-physics
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rY = ((x - midX) / midX) * 4;
    const rX = -((y - midY) / midY) * 4;

    setRotX(rX);
    setRotY(rY);
    setSpotlightPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  const ActiveIcon = track.icon;

  return (
    <div className="mx-auto mt-12 w-full max-w-4xl text-left">
      {/* Top Track Switcher Pills - Centered, Responsive, Non-Clipping */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 px-1">
        {TRACKS.map((t, idx) => {
          const Icon = t.icon;
          const isSelected = idx === activeIdx;
          return (
            <button
              key={t.id}
              onClick={() => setActiveIdx(idx)}
              type="button"
              className={`group flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#00f5a0]/40 bg-[#0c121e] text-white shadow-[0_0_20px_rgba(0,245,160,0.15)]"
                  : "border-white/[0.06] bg-[#090c14]/70 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <Icon
                className={`h-3.5 w-3.5 transition-colors ${
                  isSelected ? "text-[#00f5a0]" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              <span>
                {lang === "bn"
                  ? (t.shortNameBn || t.nameBn)
                  : (t.shortNameEn || t.nameEn)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Toy Card with 3D Tilt & Specular Physics */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0e1322]/90 via-[#0a0d18]/95 to-[#06080e] p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-8"
      >
        {/* Dynamic Specular Light Reflection */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 340px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0, 245, 160, 0.12), transparent 70%)`,
          }}
        />

        {/* Decorative Grid Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00f5a0]/40 to-transparent" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column: Title, Tagline, Milestones */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400">
                <Terminal className="h-3 w-3 text-[#00f5a0]" />
                Interactive Career Metaphor
              </span>
              <span className="rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-[#00f5a0]">
                {track.badge}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#121828] text-white shadow-[0_0_24px_rgba(0,245,160,0.18)]">
                <ActiveIcon className="h-6 w-6 text-[#00f5a0]" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl font-heading">
                  {lang === "bn" ? track.nameBn : track.nameEn}
                </h3>
                <p className="text-xs text-zinc-400 sm:text-sm">
                  {lang === "bn" ? track.taglineBn : track.taglineEn}
                </p>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div className="mt-6 space-y-2.5">
              <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                {lang === "bn" ? "প্রোডাকশন রোডম্যাপ ট্রাজেক্টরি" : "Live Trajectory Milestones"}
              </p>
              <div className="space-y-2">
                {track.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-black/30 px-3.5 py-2 text-xs transition-colors hover:border-white/10"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f5a0]/15 text-[#00f5a0]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="flex-1 font-medium text-zinc-300">
                      {lang === "bn" ? m.titleBn : m.titleEn}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase">
                      Phase 0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skill Stack Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-500 mr-1">
                {lang === "bn" ? "টেক স্ট্যাক:" : "Core Stack:"}
              </span>
              {track.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/[0.07] bg-[#121726]/80 px-2.5 py-1 text-[11px] font-mono text-zinc-300 transition-colors hover:border-[#00f5a0]/40 hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Telemetry Gauge & Direct Launch CTA */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#080b14]/80 p-5 lg:w-[260px]">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {lang === "bn" ? "মার্কেট ডিমান্ড" : "Market Demand"}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono font-bold text-[#00f5a0]">
                  <Activity className="h-3.5 w-3.5 animate-pulse" />
                  {track.demand}%
                </span>
              </div>

              {/* Demand Progress Bar */}
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] transition-all duration-700"
                  style={{ width: `${track.demand}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-2.5">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    {lang === "bn" ? "সম্ভাব্য সময়" : "Pace"}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-white font-mono">
                    {track.timeEst}
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-2.5">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    {lang === "bn" ? "ভেলোসিটি" : "Velocity"}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-[#00f5a0] font-mono">
                    {track.velocity}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/sector/${track.slug}`}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-4 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(0,245,160,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,245,160,0.5)] hover:scale-[1.02]"
              >
                <span>{lang === "bn" ? "রোডম্যাপ দেখুন" : "Explore Roadmap"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-2 text-center text-[10px] text-zinc-500 font-mono">
                {lang === "bn" ? "১০০% ফ্রি ও ওপেন সোর্স" : "100% Free · Community Verified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
