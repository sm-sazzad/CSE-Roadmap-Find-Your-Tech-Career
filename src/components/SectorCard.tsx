"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Sector = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

type SectorCardProps = {
  sector: Sector;
};

export default function SectorCard({ sector }: SectorCardProps) {
  return (
    <Link
      href={`/sector/${sector.slug}`}
      className="group relative block h-full"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-linear-to-r from-violet-500/0 via-violet-500/0 to-blue-500/0 opacity-0 blur-sm transition-all duration-500 group-hover:from-violet-500/20 group-hover:via-violet-500/10 group-hover:to-blue-500/20 group-hover:opacity-100" />

      <div className="relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090910]/80 p-6 backdrop-blur-sm transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-violet-500/20 group-hover:bg-[#0c0c15] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-600/[0.05] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-600/[0.04] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top Row */}
        <div className="relative flex items-start justify-between">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-2 group-hover:border-violet-500/20 group-hover:bg-violet-500/[0.07]">
            <span className="transition-transform duration-500">
              {sector.icon}
            </span>
          </div>

          {/* Arrow */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-zinc-700 transition-all duration-500 group-hover:border-violet-500/20 group-hover:bg-violet-500/[0.07] group-hover:text-violet-300">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Content */}
        <div className="relative mt-6 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-200 transition-colors duration-300 group-hover:text-white">
            {sector.name}
          </h3>

          <p className="mt-2.5 text-sm leading-6 text-zinc-600 transition-colors duration-300 group-hover:text-zinc-500">
            {sector.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="relative mt-6 flex items-center gap-2">
          <span className="h-px w-5 bg-zinc-800 transition-all duration-500 group-hover:w-8 group-hover:bg-violet-500/60" />

          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-700 transition-colors duration-300 group-hover:text-violet-400">
            Explore roadmap
          </span>
        </div>
      </div>
    </Link>
  );
}
