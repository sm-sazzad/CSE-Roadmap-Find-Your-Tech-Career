"use client";

import Link from "next/link";
import { useLang, phrase, num } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/roadmap";

export default function SectorCard({ item }: { item: CatalogItem }) {
  const { lang, t } = useLang();
  const name = (lang === "bn" && item.bn?.name) || item.name;
  const tagline = (lang === "bn" && item.bn?.tagline) || item.tagline;

  return (
    <Link
      href={`/sector/${item.slug}`}
      className="glass glow-border group flex h-full flex-col rounded-2xl p-6 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-sky-500/10 text-2xl">
          {item.icon}
        </div>
        <span className="text-zinc-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300">
          ↗
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-zinc-500">{tagline}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium text-zinc-400">
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
          {t("steps_n", { n: item.steps })}
        </span>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
          ⏱ {phrase(item.estimated_time, lang)}
        </span>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
          {num(item.resources, lang)} ↗
        </span>
      </div>
    </Link>
  );
}
