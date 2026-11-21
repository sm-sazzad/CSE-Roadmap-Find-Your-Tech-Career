"use client";

import Link from "next/link";
import { ArrowLeft, Clock3, Layers3, Sparkles, Terminal } from "lucide-react";
import SectorIcon from "@/components/ui/SectorIcon";

type RoadmapHeroProps = {
  roadmap: {
    slug: string;
    name: string;
    icon: string;
    difficulty: string;
    estimated_time: string;
    overview: string;
    steps: unknown[];
    career_roles: string[];
  };
};

export default function RoadmapHero({ roadmap }: RoadmapHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.07] bg-gradient-to-b from-[#080c16] to-[#06080e]">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#00f5a0]/10 blur-[130px]" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#00d2ff]/10 blur-[140px]" />
        <div className="grid-mesh absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link
            href="/sector"
            className="flex items-center gap-1.5 transition-colors hover:text-[#00f5a0]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Sectors
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="truncate text-zinc-400">{roadmap.name}</span>
        </div>

        {/* Main Hero */}
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#00f5a0]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#00f5a0]">
                Verified Roadmap
              </span>
            </div>

            {/* Title */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#0d1220] text-[#00f5a0] shadow-[0_0_25px_rgba(0,245,160,0.2)] sm:flex">
                <SectorIcon slug={roadmap.slug} className="h-8 w-8" fallbackIcon={roadmap.icon} />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-heading">
                  {roadmap.name}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                  {roadmap.overview}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-3 font-mono">
              {/* Difficulty */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#0c101c] px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00f5a0]/10 text-[#00f5a0]">
                  <Layers3 className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                    Difficulty
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-white">
                    {roadmap.difficulty}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#0c101c] px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00d2ff]/10 text-[#00d2ff]">
                  <Clock3 className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                    Estimated Time
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-white">
                    {roadmap.estimated_time}
                  </p>
                </div>
              </div>

              {/* Stages */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#0c101c] px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-[10px] font-bold text-amber-400">
                  {roadmap.steps.length}
                </span>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                    Roadmap Stages
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-white">
                    Learning Steps
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Career Roles */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0d18]/90 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#00f5a0]/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-[#00f5a0]">
                      Target Career Roles
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-zinc-300">
                      Industry Opportunities
                    </p>
                  </div>
                  <Terminal className="h-4 w-4 text-[#00f5a0]" />
                </div>

                {/* Roles */}
                <div className="mt-4 space-y-2">
                  {roadmap.career_roles.slice(0, 5).map((role, index) => (
                    <div
                      key={role}
                      className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-black/30 px-3.5 py-2.5 transition-all duration-200 hover:border-[#00f5a0]/30 hover:bg-[#00f5a0]/[0.04]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#00f5a0]/10 text-[10px] font-mono font-bold text-[#00f5a0]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate text-xs text-zinc-300 group-hover:text-white">
                        {role}
                      </span>
                    </div>
                  ))}
                </div>

                {roadmap.career_roles.length > 5 && (
                  <p className="mt-3 text-center text-[10px] font-mono text-zinc-500">
                    +{roadmap.career_roles.length - 5} more career paths
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-12 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-[#00f5a0]/25 to-transparent" />
          <span className="text-[9px] font-mono font-medium uppercase tracking-[0.2em] text-zinc-600">
            Trajectory Sequence
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#00d2ff]/25 to-transparent" />
        </div>
      </div>
    </section>
  );
}
