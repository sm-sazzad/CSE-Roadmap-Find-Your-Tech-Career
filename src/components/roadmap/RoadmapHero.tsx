"use client";

import Link from "next/link";
import { ArrowLeft, Clock3, Layers3, Sparkles } from "lucide-react";

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
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-[120px]" />

        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-blue-600/[0.07] blur-[130px]" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.025] blur-[100px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-xs text-zinc-600">
          <Link
            href="/sector"
            className="flex items-center gap-1.5 transition-colors hover:text-violet-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Sectors
          </Link>

          <span className="text-zinc-800">/</span>

          <span className="truncate text-zinc-500">{roadmap.name}</span>
        </div>

        {/* Main Hero */}
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-violet-500/[0.06] px-3.5 py-2">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                Career Roadmap
              </span>
            </div>

            {/* Title */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-3xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] sm:flex">
                {roadmap.icon}
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {roadmap.name}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                  {roadmap.overview}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* Difficulty */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/[0.08]">
                  <Layers3 className="h-3.5 w-3.5 text-violet-400" />
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-700">
                    Difficulty
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-zinc-300">
                    {roadmap.difficulty}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/[0.08]">
                  <Clock3 className="h-3.5 w-3.5 text-blue-400" />
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-700">
                    Estimated Time
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-zinc-300">
                    {roadmap.estimated_time}
                  </p>
                </div>
              </div>

              {/* Stages */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/[0.08] text-[10px] font-bold text-indigo-400">
                  {roadmap.steps.length}
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-700">
                    Roadmap Stages
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-zinc-300">
                    Learning Steps
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Career Roles */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090910]/80 p-6 backdrop-blur-xl">
              {/* Small Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/[0.07] blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                      Career Paths
                    </p>

                    <p className="mt-1 text-sm font-semibold text-zinc-200">
                      Where this can take you
                    </p>
                  </div>

                  <span className="text-lg text-violet-400">✦</span>
                </div>

                {/* Roles */}
                <div className="mt-5 space-y-2">
                  {roadmap.career_roles.slice(0, 5).map((role, index) => (
                    <div
                      key={role}
                      className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-3.5 py-3 transition-all duration-300 hover:border-violet-500/15 hover:bg-violet-500/[0.04]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/[0.07] text-[9px] font-bold text-violet-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="truncate text-xs text-zinc-500 transition-colors group-hover:text-zinc-300">
                        {role}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Role Count */}
                {roadmap.career_roles.length > 5 && (
                  <p className="mt-4 text-center text-[10px] text-zinc-700">
                    +{roadmap.career_roles.length - 5} more career paths
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-12 flex items-center gap-3">
          <div className="h-px flex-1 bg-linear-to-r from-violet-500/20 to-transparent" />

          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-700">
            Start learning
          </span>

          <div className="h-px flex-1 bg-linear-to-l from-blue-500/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
