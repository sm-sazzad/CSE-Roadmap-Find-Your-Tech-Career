"use client";

import { useMemo, useState } from "react";
import sectors from "@/data/sector.json";
import SectorCard from "@/components/SectorCard";
import Reveal from "@/components/ui/Reveal";

export default function SectorPage() {
  const [search, setSearch] = useState("");

  const filteredSectors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return sectors.sectors;
    }

    return sectors.sectors.filter((sector) => {
      return (
        sector.name.toLowerCase().includes(query) ||
        sector.description.toLowerCase().includes(query) ||
        sector.slug.toLowerCase().includes(query)
      );
    });
  }, [search]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-150px] h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.06] blur-[150px]" />

        <div className="absolute left-[-150px] top-[35%] h-[300px] w-[300px] rounded-full bg-indigo-600/[0.04] blur-[130px]" />

        <div className="absolute right-[-150px] top-[55%] h-[300px] w-[300px] rounded-full bg-blue-600/[0.04] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-[min(1180px,calc(100%-40px))] py-20 sm:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-violet-500/[0.05] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300">
              Career Roadmaps
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find your
            <span className="bg-linear-to-r from-violet-300 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              {" "}
              tech path.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
            Explore structured CSE career roadmaps designed to help you
            understand what to learn, what to build, and where your path can
            take you.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="group relative">
            {/* Search Glow */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-linear-to-r from-violet-500/20 via-indigo-500/10 to-blue-500/20 opacity-0 blur-sm transition duration-500 group-focus-within:opacity-100" />

            <div className="relative flex items-center rounded-2xl border border-white/[0.08] bg-[#090910]/90 px-4 backdrop-blur-xl transition duration-300 group-focus-within:border-violet-500/25">
              {/* Icon */}
              <svg
                className="h-5 w-5 shrink-0 text-zinc-600 transition-colors group-focus-within:text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a career path..."
                className="h-14 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-zinc-600"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="rounded-lg px-2 py-1 text-xs text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Result Info */}
        <div className="mt-12 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-300">
              {search
                ? `${filteredSectors.length} paths found`
                : `${sectors.sectors.length} career paths`}
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Choose a path to explore its complete roadmap.
            </p>
          </div>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs font-medium text-violet-400 transition hover:text-violet-300"
            >
              Show all
            </button>
          )}
        </div>

        {/* Cards */}
        {filteredSectors.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSectors.map((sector, index) => (
              <Reveal
                key={sector.slug}
                delay={index * 0.06}
                y={20}
                className="h-full"
              >
                {" "}
                <SectorCard key={sector.slug} sector={sector} />
              </Reveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#090910]/70 px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] text-xl text-zinc-600">
              ?
            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">
              No roadmap found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
              We couldn't find a career path matching "{search}". Try searching
              for something like Web Development, AI, or Cyber Security.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-5 py-2.5 text-sm font-medium text-violet-300 transition hover:border-violet-400/30 hover:bg-violet-500/[0.1]"
            >
              View all paths
            </button>
          </div>
        )}

        {/* Bottom */}
        <div className="mt-16 border-t border-white/[0.05] pt-6 text-center">
          <p className="text-xs text-zinc-700">
            Pick a direction. Follow the roadmap. Build your future.
          </p>
        </div>
      </div>
    </main>
  );
}
