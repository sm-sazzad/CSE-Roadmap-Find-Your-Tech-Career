"use client";

import { useMemo, useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectorCard from "./SectorCard";
import { useLang, type TKey } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/roadmap";

const CATEGORIES: { id: string; key: TKey }[] = [
  { id: "all", key: "cat_all" },
  { id: "start", key: "cat_start" },
  { id: "web", key: "cat_web" },
  { id: "ai", key: "cat_ai" },
  { id: "infra", key: "cat_infra" },
  { id: "security", key: "cat_security" },
  { id: "creative", key: "cat_creative" },
  { id: "hardware", key: "cat_hardware" },
  { id: "career", key: "cat_career" },
];

export default function SectorExplorer({ catalog }: { catalog: CatalogItem[] }) {
  const { t, lang } = useLang();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return catalog.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return [item.name, item.tagline, item.slug, item.bn?.name, item.bn?.tagline]
        .filter(Boolean)
        .some((text) => String(text).toLowerCase().includes(q));
    });
  }, [catalog, search, category]);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip pb-24 pt-14 sm:pt-20">
      <div className="ambient-glow" />
      <div className="grid-mesh absolute inset-0 -z-10 opacity-60" />
      <div className="noise-overlay absolute inset-0 -z-10 pointer-events-none opacity-30" />

      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3.5 py-1 text-xs font-mono font-medium text-[#00f5a0]">
              <Sparkles className="h-3.5 w-3.5" />
              {t("list_k")}
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl font-heading">
              <span className="gradient-text">{t("list_t")}</span>
            </h1>
            <p className="mt-4 text-base text-zinc-400 sm:text-lg">{t("list_s")}</p>
          </div>
        </Reveal>

        {/* Command-Palette Style Search Bar */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="glass flex items-center gap-3 rounded-2xl border border-white/[0.08] px-4 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition duration-200 focus-within:border-[#00f5a0]/50 focus-within:shadow-[0_0_25px_rgba(0,245,160,0.15)]">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search_ph")}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 font-sans"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <span className="hidden sm:inline-block rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                category === c.id
                  ? "border-[#00f5a0]/40 bg-[#00f5a0]/15 text-white shadow-[0_0_15px_rgba(0,245,160,0.2)]"
                  : "border-white/[0.07] bg-[#0c101c]/80 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {t(c.key)}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="mt-8 flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono text-zinc-400">
          <span>{t("n_paths", { n: filtered.length })}</span>
          <span className="text-[11px] text-zinc-500">
            {lang === "bn" ? "প্রোডাকশন গ্রেড রোডম্যাপ" : "Production Grade Roadmaps"}
          </span>
        </div>

        {/* Sector Cards Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <Reveal key={item.slug} delay={Math.min(i, 8) * 0.04} y={16}>
                <SectorCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-white/[0.07] bg-[#0c101c] p-8 text-center">
            <h3 className="text-base font-bold text-white font-heading">{t("no_found")}</h3>
            <p className="mt-2 text-xs text-zinc-400">{t("no_found_s")}</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="mt-5 rounded-xl border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#00f5a0] transition hover:bg-[#00f5a0]/20 cursor-pointer"
            >
              {t("show_all")}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
