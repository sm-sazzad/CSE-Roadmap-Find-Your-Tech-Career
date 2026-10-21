"use client";

import { useMemo, useState } from "react";
import Reveal from "./ui/Reveal";
import SectorCard from "./SectorCard";
import { useLang, num, type TKey } from "@/lib/i18n";
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
    <main className="relative isolate overflow-x-clip">
      <div className="aurora" />
      <div className="grid-fade absolute inset-0 -z-10 opacity-50" />

      <div className="mx-auto w-[min(1180px,calc(100%-32px))] pb-24 pt-16 sm:pt-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              {t("list_k")}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              <span className="gradient-text">{t("list_t")}</span>
            </h1>
            <p className="mt-4 text-zinc-400">{t("list_s")}</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 focus-within:border-violet-500/40">
            <svg className="h-5 w-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search_ph")}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="text-zinc-500 hover:text-white">
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                category === c.id
                  ? "border-violet-400/50 bg-violet-500/20 text-white"
                  : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              {t(c.key)}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-zinc-600">
          {t("n_paths", { n: filtered.length })}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <Reveal key={item.slug} delay={Math.min(i, 8) * 0.04} y={16}>
                <SectorCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="glass mt-6 rounded-2xl px-6 py-16 text-center">
            <p className="text-3xl">🔎</p>
            <h2 className="mt-3 text-lg font-semibold text-white">{t("no_found")}</h2>
            <p className="mt-2 text-sm text-zinc-500">{t("no_found_s")}</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="mt-5 rounded-lg bg-violet-500/20 px-5 py-2 text-sm text-violet-200 hover:bg-violet-500/30"
            >
              {t("show_all")}
            </button>
          </div>
        )}
        <span className="sr-only">{num(filtered.length, lang)}</span>
      </div>
    </main>
  );
}
