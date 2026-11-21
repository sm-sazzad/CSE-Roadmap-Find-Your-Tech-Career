"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Layers3, BookOpen } from "lucide-react";
import { useLang, phrase, num } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/roadmap";
import SectorIcon from "@/components/ui/SectorIcon";

export default function SectorCard({ item }: { item: CatalogItem }) {
  const { lang, t } = useLang();
  const name = (lang === "bn" && item.bn?.name) || item.name;
  const tagline = (lang === "bn" && item.bn?.tagline) || item.tagline;

  return (
    <Link
      href={`/sector/${item.slug}`}
      className="glass-card group flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00f5a0]/40"
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111726] text-[#00f5a0] shadow-[0_0_20px_rgba(0,245,160,0.12)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#00f5a0]/40 group-hover:shadow-[0_0_25px_rgba(0,245,160,0.25)]">
            <SectorIcon slug={item.slug} className="h-6 w-6" fallbackIcon={item.icon} />
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-500 transition-all duration-300 group-hover:border-[#00f5a0]/30 group-hover:bg-[#00f5a0]/10 group-hover:text-[#00f5a0]">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <h3 className="mt-5 text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#00f5a0] font-heading">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400 line-clamp-2">
          {tagline}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4 text-[11px] font-mono text-zinc-400">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
          <Layers3 className="h-3 w-3 text-zinc-500" />
          {t("steps_n", { n: item.steps })}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
          <Clock className="h-3 w-3 text-zinc-500" />
          {phrase(item.estimated_time, lang)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
          <BookOpen className="h-3 w-3 text-zinc-500" />
          {num(item.resources, lang)}
        </span>
      </div>
    </Link>
  );
}
